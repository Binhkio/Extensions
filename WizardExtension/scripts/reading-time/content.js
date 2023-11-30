const timeCountKey = "time-counter-allowed"

let timeReading = 0;

const badge = document.createElement("div");
    badge.id = 'time-counter'
    badge.style.position = 'fixed'
    badge.style.bottom = '10px'
    badge.style.left = '10px'
    badge.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
    badge.style.color = '#ffffff'
    badge.style.borderRadius = '12px'
    badge.style.textAlign = 'center'
    badge.style.fontSize = '16px'
    badge.style.padding = '4px 16px'
    badge.style.pointerEvents = 'none'
    badge.textContent = formatTime(0)

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const timeString = hours.toString().padStart(2, '0') + ':' +
                     minutes.toString().padStart(2, '0') + ':' +
                     remainingSeconds.toString().padStart(2, '0');
  
    return timeString;
}

function initTimeCounter() {
    const body = document.querySelector("body");
    if (body) {
        setInterval(() => {
            timeReading++;
            const timeContent = formatTime(timeReading)
            badge.textContent = timeContent
        }, 1000)
        body.append(badge)
    }

    chrome.storage.local.get([timeCountKey]).then((result) => {
        document.getElementById("time-counter").style.display = result[timeCountKey] === true ? "block" : "none"
    })
}

initTimeCounter()

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (timeCountKey in changes) {
        document.getElementById("time-counter").style.display = changes[timeCountKey].newValue === true ? "block" : "none"
    }
})
