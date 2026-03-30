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
        const resp = await fetch(`${API_URL}/vault/list/${email}`);
        return resp.json();
    },
    async getUserData(email) {
        const resp = await fetch(`${API_URL}/users/${email}`);
        return resp.json();
    }
};