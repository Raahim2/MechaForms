document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    chrome.storage.local.get(['isLoggedIn', 'username', 'shortcuts', 'active_extensions'], (res) => {
        if (res.isLoggedIn) {
            UI.showView(true, res.username);
            UI.displayShortcuts(res.shortcuts || {});
            UI.updatePacks(res.active_extensions || []);
        }
    });

    // Back button logic
    document.getElementById('back-btn').addEventListener('click', () => {
        document.getElementById('extension-view').classList.add('hidden');
        document.getElementById('dashboard-view').classList.remove('hidden');
        document.getElementById('main-header').classList.remove('hidden');
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
            if (res.email) syncVault(res.email, res.username);
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
                Object.entries(res.shortcuts || {}).filter(([k, v]) => 
                    k.toLowerCase().includes(term) || v.toLowerCase().includes(term)
                )
            );
            UI.displayShortcuts(filtered);
        });
    });
});

async function syncVault(email, username) {
    const btn = document.getElementById('sync-btn');
    if (btn) btn.innerText = "Syncing...";
    try {
        const userData = await API.getUserData(email);
        const vaultData = await API.getVault(email);

        const shortcuts = Object.fromEntries(vaultData.map(i => [`@${i.key}`, i.val]));
        
        const slugs = userData.active_extensions || [];
        const detailedExtensions = await Promise.all(
            slugs.map(async (slug) => {
                try { return await API.getExtensionDetails(slug); } 
                catch (err) { return null; }
            })
        );

        const validExtensions = detailedExtensions.filter(ext => ext !== null);
        
        chrome.storage.local.set({
            isLoggedIn: true, username, email,
            shortcuts, active_extensions: validExtensions
        }, () => {
            UI.showView(true, username);
            UI.displayShortcuts(shortcuts);
            UI.updatePacks(validExtensions);
            if (btn) btn.innerText = "Sync Changes";
        });
    } catch (e) { 
        console.error(e);
        if (btn) btn.innerText = "Error Syncing"; 
    }
}