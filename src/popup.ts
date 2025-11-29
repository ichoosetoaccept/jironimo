const statusEl = document.getElementById("status")!;
const copyBtn = document.getElementById("copy") as HTMLButtonElement;

let sessionCookie: string | null = null;

async function init() {
  // Get the current tab's URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.url) {
    showStatus("No active tab", false);
    return;
  }

  const url = new URL(tab.url);

  // Try to get JSESSIONID cookie for this domain
  const cookie = await chrome.cookies.get({
    url: tab.url,
    name: "JSESSIONID",
  });

  if (cookie) {
    sessionCookie = cookie.value;
    // Auto-copy when cookie is found - true one-click!
    await navigator.clipboard.writeText(sessionCookie);
    showStatus(`Copied from ${url.hostname}`, true);
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    copyBtn.disabled = false;

    setTimeout(() => {
      copyBtn.textContent = "Copy JSESSIONID";
      copyBtn.classList.remove("copied");
    }, 2000);
  } else {
    showStatus(`No JSESSIONID found on ${url.hostname}`, false);
  }
}

function showStatus(message: string, found: boolean) {
  statusEl.textContent = message;
  statusEl.className = `status ${found ? "found" : "not-found"}`;
}

copyBtn.addEventListener("click", async () => {
  if (!sessionCookie) return;

  await navigator.clipboard.writeText(sessionCookie);

  copyBtn.textContent = "Copied!";
  copyBtn.classList.add("copied");

  setTimeout(() => {
    copyBtn.textContent = "Copy JSESSIONID";
    copyBtn.classList.remove("copied");
  }, 2000);
});

init();
