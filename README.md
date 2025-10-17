# Sample Chrome Extension

This is a minimal Chrome extension (Manifest V3) sample.

Files added:
- manifest.json - extension manifest (MV3)
- background.js - service worker background script
- content_script.js - content script injected into pages
- popup.html / popup.js - extension popup UI and logic
- icons/ - placeholder icons (replace with real PNGs)

How to load in Chrome:
1. Open chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked" and select this folder

Then click the extension icon to open the popup, or visit any page to see the injected banner.