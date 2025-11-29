const statusEl = document.getElementById("status")!;
const copyBtn = document.getElementById("copy") as HTMLButtonElement;

let sessionCookie: string | null = null;

async function init() {
  try {
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
      showStatus(`Found cookie for ${url.hostname}`, true);
      copyBtn.disabled = false;

      // Auto-copy after a small delay to ensure popup is focused
      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(sessionCookie!);
          showStatus(`Copied from ${url.hostname}`, true);
          copyBtn.textContent = "Copied!";
          copyBtn.classList.add("copied");

          setTimeout(() => {
            copyBtn.textContent = "Copy JSESSIONID";
            copyBtn.classList.remove("copied");
          }, 2000);
        } catch {
          // Auto-copy failed, user can still click the button
        }
      }, 100);
    } else {
      showStatus(`No JSESSIONID found on ${url.hostname}`, false);
    }
  } catch {
    showStatus("Unable to access tab", false);
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
