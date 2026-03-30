const API_URL = "https://mechaforms-api.vercel.app";

const API = {
    async login(email, password) {
        const resp = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return resp;
    },
    async getVault(email) {
        const resp = await fetch(`${API_URL}/vault/list/${encodeURIComponent(email)}`);
        if (!resp.ok) return [];
        return resp.json();
    },
    async getUserData(email) {
        const resp = await fetch(`${API_URL}/users/${encodeURIComponent(email)}`);
        if (!resp.ok) throw new Error("User data fetch failed");
        return resp.json();
    },
    async getExtensionDetails(slug) {
        const resp = await fetch(`${API_URL}/extensions/details/${slug}`);
        if (!resp.ok) throw new Error("Extension details not found");
        return resp.json();
    }
};