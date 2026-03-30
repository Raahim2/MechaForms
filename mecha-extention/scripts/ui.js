const UI = {
    displayShortcuts(shortcuts) {
        const listDiv = document.getElementById('shortcut-list');
        listDiv.innerHTML = "";
        
        Object.entries(shortcuts).forEach(([key, val]) => {
            const card = document.createElement('div');
            card.className = 'shortcut-card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center">
                    <span class="card-key">${key}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
                <div class="card-body">${val}</div>
            `;
            card.onclick = () => {
                navigator.clipboard.writeText(val);
                const badge = card.querySelector('.card-key');
                const oldText = badge.innerText;
                badge.innerText = "COPIED";
                setTimeout(() => badge.innerText = oldText, 800);
            };
            listDiv.appendChild(card);
        });
    },

    updatePacks(extensions) {
        const packsList = document.getElementById('active-packs-list');
        
        if (!extensions || extensions.length === 0) {
            packsList.innerHTML = "<span style='font-size:11px; color:#94a3b8; padding: 4px 0;'>No active packs</span>";
            return;
        }

        packsList.innerHTML = "";
        
        extensions.forEach(ext => {
            const chip = document.createElement('div');
            chip.className = 'pack-chip';
            // We use ext.name directly from the backend object
            chip.innerHTML = `
                <div class="pack-dot"></div>
                <span title="${ext.tagline || ''}">${ext.name}</span>
            `;
            packsList.appendChild(chip);
        });
    },

    showView(isLoggedIn, name = "") {
        document.getElementById('login-view').classList.toggle('hidden', isLoggedIn);
        document.getElementById('dashboard-view').classList.toggle('hidden', !isLoggedIn);
        if(isLoggedIn) console.log("Welcome", name);
    }
};