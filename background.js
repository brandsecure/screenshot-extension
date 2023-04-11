chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'capture_screenshot') {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        sendResponse({ dataUrl: dataUrl });
      });
      return true; // Required for async sendResponse
    }
  });
  