function downloadScreenshot(url, dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${new Date().toISOString().split('T')[0]}_${url
      .split('//')[1]
      .split('/')[0]}.png`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  document.getElementById('capture').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.runtime.sendMessage({ action: 'capture_screenshot', tabUrl: activeTab.url }, (response) => {
        if (response && response.dataUrl) {
          downloadScreenshot(activeTab.url, response.dataUrl);
        }
      });
    });
  });

document.getElementById('capture').addEventListener('click', async () => {
    const tabs = await new Promise((resolve) => {
      chrome.tabs.query({ currentWindow: true }, resolve);
    });
  
    await captureAllTabs(tabs);
  });
  
  // Display example output filename
  const today = new Date().toISOString().split('T')[0];
  const exampleDomain = 'domain.com';
  document.getElementById('exampleFilename').innerText = `${today}_${exampleDomain}.png`;
  