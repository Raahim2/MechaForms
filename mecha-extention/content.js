document.addEventListener("keyup", (event) => {
  if (event.key === " " || event.code === "Space") {
    const activeElem = document.activeElement;
    if (!activeElem) return;

    // FETCH FROM STORAGE
    chrome.storage.local.get(['isLoggedIn', 'shortcuts'], (data) => {
      // Only work if user is logged in
      if (!data.isLoggedIn || !data.shortcuts) return;

      const snippets = data.shortcuts;
      const text = getElementText(activeElem);
      
      for (const [key, value] of Object.entries(snippets)) {
        if (text.includes(key)) {
          replaceText(activeElem, key, value);
        }
      }
    });
  }
});

function getElementText(el) {
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return el.value;
  return el.innerText || "";
}

function replaceText(el, key, value) {
  el.focus();
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    el.value = el.value.replace(key + " ", value + " ");
    el.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (el.isContentEditable) {
    // Basic replacement for contenteditable
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      document.execCommand("selectAll", false, null);
      let newText = el.innerText.replace(key, value);
      document.execCommand("insertText", false, newText);
    }
  }
}