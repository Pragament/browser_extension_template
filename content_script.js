(function () {
  console.log('Content script loaded');

  // Create a simple banner at the top of the page
  const banner = document.createElement('div');
  banner.id = 'sample-extension-banner';
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.right = '0';
  banner.style.background = 'rgba(0, 120, 215, 0.9)';
  banner.style.color = 'white';
  banner.style.padding = '8px 12px';
  banner.style.zIndex = '2147483647';
  banner.style.fontFamily = 'Arial, sans-serif';
  banner.style.fontSize = '14px';
  banner.innerText = 'Sample Extension is active on this page — click to get time from background';
  banner.style.cursor = 'pointer';

  banner.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'GET_TIME' }, (response) => {
      alert('Background time: ' + (response && response.time));
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(banner);
  });

  // Also append immediately if body already exists
  if (document.body) {
    document.body.appendChild(banner);
  }

  // Listen for messages to update banner text
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.type === 'UPDATE_BANNER') {
      banner.innerText = msg.text || banner.innerText;
      sendResponse({ ok: true });
    }
  });
})();