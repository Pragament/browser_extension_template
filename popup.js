document.addEventListener('DOMContentLoaded', () => {
  const getTimeBtn = document.getElementById('getTime');
  const timeDiv = document.getElementById('time');
  const updateBannerBtn = document.getElementById('updateBanner');
  const storeValueBtn = document.getElementById('storeValue');
  const storedDiv = document.getElementById('stored');

  getTimeBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'GET_TIME' }, (response) => {
      timeDiv.innerText = response && response.time;
    });
  });

  updateBannerBtn.addEventListener('click', () => {
    // Send a message to the active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0]) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: 'UPDATE_BANNER', text: 'Banner updated from popup at ' + new Date().toLocaleTimeString() }, (resp) => {
        console.log('Banner update response', resp);
      });
    });
  });

  storeValueBtn.addEventListener('click', () => {
    const val = Math.random().toString(36).slice(2, 8);
    chrome.storage.local.set({ sampleValue: val }, () => {
      storedDiv.innerText = 'Stored: ' + val;
    });
  });

  // Load stored value on popup open
  chrome.storage.local.get(['sampleValue'], (result) => {
    storedDiv.innerText = 'Stored: ' + (result.sampleValue || '—');
  });
});