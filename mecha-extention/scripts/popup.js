document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    chrome.storage.local.get(['isLoggedIn', 'username', 'shortcuts', 'active_extensions'], (res) => {
        if (res.isLoggedIn) {
            UI.showView(true, res.username);
            UI.displayShortcuts(res.shortcuts || {});
            UI.updatePacks(res.active_extensions || []);
        }
    });

    // Login Event
    document.getElementById('login-btn').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!email || !password) return;

        try {
            const resp = await API.login(email, password);
            const data = await resp.json();
            if (resp.ok) {
                syncVault(data.user.email, data.user.username);
            } else {
                document.getElementById('error-msg').innerText = data.detail || "Error logging in";
            }
        } catch (e) { console.error(e); }
    });

    // Sync Event
    document.getElementById('sync-btn').addEventListener('click', () => {
        chrome.storage.local.get(['email', 'username'], (res) => {
            syncVault(res.email, res.username);
        });
    });

    // Logout Event
    document.getElementById('logout-btn').addEventListener('click', () => {
        chrome.storage.local.clear(() => location.reload());
    });

    // Search Filter
    document.getElementById('search-input').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        chrome.storage.local.get(['shortcuts'], (res) => {
            const filtered = Object.fromEntries(
                Object.entries(res.shortcuts).filter(([k, v]) => 
                    k.toLowerCase().includes(term) || v.toLowerCase().includes(term)
                )
            );
            UI.displayShortcuts(filtered);
        });
    });
});

async function syncVault(email, username) {
    const btn = document.getElementById('sync-btn');
    btn.innerText = "Syncing...";
    try {
        const [vaultData, userData] = await Promise.all([
            API.getVault(email),
            API.getUserData(email)
        ]);

        const shortcuts = Object.fromEntries(vaultData.map(i => [`@${i.key}`, i.val]));
        
        // Fetch detailed info for each slug in active_extensions
        const slugs = userData.active_extensions || [];
        const detailedExtensions = await Promise.all(
            slugs.map(async (slug) => {
                try {
                    return await API.getExtensionDetails(slug);
                } catch (err) {
                    console.error(`Failed to fetch details for ${slug}`, err);
                    return null;
                }
            })
        );

        // Filter out any nulls from failed fetches
        const validExtensions = detailedExtensions.filter(ext => ext !== null);
        
        chrome.storage.local.set({
            isLoggedIn: true, 
            username, 
            email,
            shortcuts, 
            active_extensions: validExtensions
        }, () => {
            UI.showView(true, username);
            UI.displayShortcuts(shortcuts);
            UI.updatePacks(validExtensions);
            btn.innerText = "Sync Changes";
        });
    } catch (e) { 
        console.error(e);
        btn.innerText = "Error Syncing"; 
    }
}