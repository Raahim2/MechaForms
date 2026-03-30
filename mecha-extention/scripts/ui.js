console.log("--- UI LOADED ---");

const UI = {
    displayShortcuts(shortcuts) {
        const listDiv = document.getElementById('shortcut-list');
        if (!listDiv) return;
        listDiv.innerHTML = "";
        
        const entries = Object.entries(shortcuts);
        if (entries.length === 0) {
            listDiv.innerHTML = "<div style='text-align:center; padding:20px; color:#94a3b8; font-size:12px;'>No vault shortcuts found</div>";
            return;
        }

        entries.forEach(([key, val]) => {
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
                badge.innerText = "COPIED";
                setTimeout(() => badge.innerText = key, 800);
            };
            listDiv.appendChild(card);
        });
    },

    updatePacks(extensions) {
        const packsList = document.getElementById('active-packs-list');
        if (!packsList) return;
        
        if (!extensions || extensions.length === 0) {
            packsList.innerHTML = "<span style='font-size:11px; color:#94a3b8;'>No active packs</span>";
            return;
        }

        packsList.innerHTML = "";
        extensions.forEach(ext => {
            const chip = document.createElement('div');
            chip.className = 'pack-chip';
            chip.style.cursor = "pointer";
            chip.innerHTML = `
                <div class="pack-dot"></div>
                <span>${ext.name}</span>
            `;
            chip.onclick = () => UI.showExtensionPage(ext);
            packsList.appendChild(chip);
        });
    },

    showExtensionPage(ext) {
        // Switch Views
        document.getElementById('dashboard-view').classList.add('hidden');
        document.getElementById('main-header').classList.add('hidden');
        document.getElementById('extension-view').classList.remove('hidden');

        // Header
        document.getElementById('ext-title').innerText = ext.name;

        // Meta Info (Mapping installs and category)
        const metaDiv = document.getElementById('ext-meta');
        metaDiv.innerHTML = `
            <div class="meta-item">Version: <span class="meta-value">${ext.version || 'N/A'}</span></div>
            <div class="meta-item">Author: <span class="meta-value">${ext.author || 'Unknown'}</span></div>
            <div class="meta-item">Installs: <span class="meta-value">${ext.installs || '0'}</span></div>
            <div class="meta-item">Category: <span class="meta-value">${ext.category || 'General'}</span></div>
            <div class="meta-item" style="grid-column: span 2;">Reliability: <span class="meta-value">${ext.reliability || '100%'}</span></div>
            <div class="meta-item" style="grid-column: span 2; margin-top:8px; line-height:1.4;">${ext.description || ext.tagline}</div>
        `;

        // Manifest Shortcuts (Mapping trigger and output)
        const listDiv = document.getElementById('ext-manifest-list');
        listDiv.innerHTML = "<div class='section-label' style='margin-bottom:12px; margin-top:10px;'>Pack Shortcuts</div>";
        
        if (ext.manifest && ext.manifest.length > 0) {
            ext.manifest.forEach(item => {
                const row = document.createElement('div');
                row.className = 'shortcut-card'; // Reuse shortcut-card style
                row.style.marginBottom = "8px";
                row.style.cursor = "pointer";
                
                // Using trigger and output from your schema
                row.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center">
                        <span class="card-key">${item.trigger}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </div>
                    <div class="card-body" style="white-space: pre-wrap; font-family: monospace; background: #f8fafc; padding: 6px; border-radius: 4px; margin-top: 5px;">${item.output}</div>
                `;
                
                row.onclick = () => {
                    navigator.clipboard.writeText(item.output);
                    const badge = row.querySelector('.card-key');
                    const originalTrigger = item.trigger;
                    badge.innerText = "COPIED";
                    setTimeout(() => badge.innerText = originalTrigger, 800);
                };
                listDiv.appendChild(row);
            });
        } else {
            listDiv.innerHTML += "<div style='font-size:12px; color:#94a3b8; text-align:center; padding:20px;'>No shortcuts found in this pack.</div>";
        }
    },

    showView(isLoggedIn, name = "") {
        const loginView = document.getElementById('login-view');
        const dashView = document.getElementById('dashboard-view');
        const mainHeader = document.getElementById('main-header');
        const extView = document.getElementById('extension-view');
        
        if (loginView) loginView.classList.toggle('hidden', isLoggedIn);
        if (dashView) dashView.classList.toggle('hidden', !isLoggedIn);
        if (mainHeader) mainHeader.classList.toggle('hidden', !isLoggedIn);
        if (extView) extView.classList.add('hidden');
        
        if (isLoggedIn) console.log("Dashboard Active for:", name);
    }
};