chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.option === 'reading-time') {
        const key = message.key
        chrome.storage.session.get([key]).then((result) => {
            if (key in result)
                sendResponse(result[key])
            else {
                const currTime = new Date().toString()
                chrome.storage.session.set({ [key]: currTime })
                sendResponse(currTime)
            }
        })
        return true
    }
});