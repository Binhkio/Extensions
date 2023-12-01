const adsSkipKey = "ads-skipper-allowed"
let allowAdsSkipper = true

function statusLog() {
    console.log("AdsSkipper status: ", allowAdsSkipper === true ? "Running" : "Disabled")
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (adsSkipKey in changes) {
        allowAdsSkipper = changes[adsSkipKey].newValue
        statusLog()
        if (allowAdsSkipper === true) {
            handleSkipper()
        }
    }
})


function initialSkipper() {
    chrome.storage.local.get([adsSkipKey]).then((result) => {
        allowAdsSkipper = result[adsSkipKey]
        if (allowAdsSkipper === true) {
            handleSkipper()
        }
        statusLog()
    })
}

function handleSkipper() {
    const adsSkipper = setInterval(() => {
        try {
            if (!allowAdsSkipper) {
                clearInterval(adsSkipper)
                return;
            }

            // console.info("AdsSkipper is running...")
    
            const player = document.getElementById("movie_player")
            const video = document.querySelector("video")
        
            if (!player || !video) return;
        
            const isPlaying = !video.paused
            const hasAds = player.classList.contains("ad-showing")
        
            if (isPlaying && !hasAds) return;
        
            if (hasAds) {
                console.info("Skipped ads - ", video.src)
        
                // Play ads if it was paused
                if (!isPlaying) video.play()
                
                // Mute and speed up the ads
                video.muted = true
                video.playbackRate = 16
        
                // Skip ads
                const duration = video.duration
                if (duration) {
                    video.currentTime = duration - 0.001
                }
                
                const skipBtnInterval = setInterval(() => {
                    // Check if the button SkipAds exist
                    const skipBtns = document.querySelectorAll('div[class*="skip"][id*="ad-text"]')
                    if (skipBtns.length > 0) {
                        skipBtns.forEach(btn => btn.click())
                        clearInterval(skipBtnInterval)
                    }
                }, 100)
            }
        } catch (error) {
            clearInterval(adsSkipper)
            console.error("AdsSkipper Error", error)
        }
    }, 100)
}

initialSkipper()
