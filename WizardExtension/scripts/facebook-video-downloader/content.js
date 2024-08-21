const storageKey = "vid-downloader-allowed"
let isAllowed = true

var listURLs = [];
var currentVideoCount = 0;

function getCurrentVideoCount() {
    const videos = document.getElementsByTagName("video");
    return videos.length;
}

function updateListURLs() {
    const resource = performance.getEntriesByType("resource");
    const videoResource = resource.filter(res => 
        res.name.includes(".mp4"));
    
    const videoURLs = videoResource.map(res => {
        const url = res.name.split("&bytestart")[0];
        const key = res.name.split(".mp4")[0].split("/").pop();

        return {
            url,
            key
        }
    })

    let lastKey = null;
    videoURLs.forEach(data => {
        if (data.key !== lastKey) {
            if (listURLs.findIndex(url => url === data.url) < 0) {
                listURLs.push(data.url);
            }
            lastKey = data.key;
        }
    })

    console.log("Current list urls: ", listURLs);
}

window.addEventListener('scroll', function() {
    if (!isAllowed) return;

    // const curVidCount = getCurrentVideoCount();
    // if (curVidCount !== currentVideoCount) {
    //     currentVideoCount = curVidCount;
    //     console.log("Current video count: ", currentVideoCount);

    //     updateListURLs();
    // }
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (storageKey in changes) {
        isAllowed = changes[storageKey].newValue;
    }
})

function initial() {
    chrome.storage.local.get([storageKey]).then((result) => {
        isAllowed = result[storageKey];
    })
}

initial()

globalThis.window.URL.newCreateObjectURL = globalThis.window.URL.createObjectURL;
globalThis.window.URL.createObjectURL = function(obj) {
    console.log(obj)
    globalThis.window.URL.newCreateObjectURL(obj)
}

