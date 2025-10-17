console.log('Background service worker loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message, 'from', sender);
  if (message && message.type === 'GET_TIME') {
    sendResponse({ time: new Date().toString() });
  }
  // indicate we'll respond asynchronously if needed
  return true;
});

// Example command: open a new tab
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'https://www.example.com' });
});