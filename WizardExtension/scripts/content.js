// 1. Send a message to the service worker requesting the user's data
chrome.runtime.sendMessage('service', (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.info('Service: ', response);
})