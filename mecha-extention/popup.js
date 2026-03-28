const API_URL = "https://mechaforms-api.vercel.app";

const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');
const errorMsg = document.getElementById('error-msg');
const listDiv = document.getElementById('shortcut-list');

// 1. Check login state on open
chrome.storage.local.get(['isLoggedIn', 'username', 'email', 'shortcuts'], (res) => {
  if (res.isLoggedIn) {
    showDashboard(res.username);
    displayShortcuts(res.shortcuts || {});
  }
});

// 2. Login Logic
document.getElementById('login-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  errorMsg.innerText = "Authenticating...";

  try {
    // Auth Request
    const authResp = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const authData = await authResp.json();

    if (authResp.ok) {
      // Fetch user's real shortcuts from Vault
      fetchAndStoreShortcuts(authData.user.email, authData.user.username);
    } else {
      errorMsg.innerText = authData.detail || "Login failed";
    }
  } catch (err) {
    errorMsg.innerText = "Server error. Try again later.";
  }
});

// 3. Fetch Shortcuts Function
async function fetchAndStoreShortcuts(email, username) {
  try {
    const resp = await fetch(`${API_URL}/vault/list/${email}`);
    const vaultData = await resp.json();

    // Transform backend array [{key: 'name', val: 'John'}] 
    // to extension object {"@name": "John"}
    const shortcutMap = {};
    vaultData.forEach(item => {
      // We add @ prefix here so the user types @key
      shortcutMap[`@${item.key}`] = item.val;
    });

    // Save everything to storage
    chrome.storage.local.set({
      isLoggedIn: true,
      username: username,
      email: email,
      shortcuts: shortcutMap
    }, () => {
      showDashboard(username);
      displayShortcuts(shortcutMap);
    });
  } catch (err) {
    console.error("Failed to fetch vault:", err);
  }
}

// 4. UI Helper: Display list in popup
function displayShortcuts(shortcuts) {
  listDiv.innerHTML = "";
  const keys = Object.keys(shortcuts);
  
  if (keys.length === 0) {
    listDiv.innerHTML = "<p style='color:gray'>No shortcuts found in vault.</p>";
    return;
  }

  keys.forEach(key => {
    const div = document.createElement('div');
    div.className = 'shortcut-item';
    div.innerHTML = `<b>${key}</b>: ${shortcuts[key]}`;
    listDiv.appendChild(div);
  });
}

function showDashboard(name) {
  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  document.getElementById('welcome-user').innerText = `Hi, ${name}!`;
}

// 5. Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  chrome.storage.local.clear(() => {
    location.reload(); 
  });
});