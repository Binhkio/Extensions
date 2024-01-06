/**
 * Navbar controller
 */
let chosenNavbar = document.querySelector("nav ul li.chosen")
document.querySelectorAll("nav ul li").forEach((e, k, p) => {
  e.addEventListener('click', () => {
    if (e.classList.contains("chosen")) return;

    // Remove old attr
    chosenNavbar.classList.remove("chosen")
    const currContentId = chosenNavbar.getAttribute("data-nav")
    document.getElementById(currContentId).style.display = "none"
    // Add new attr
    chosenNavbar = e
    chosenNavbar.classList.add("chosen")
    const newContentId = chosenNavbar.getAttribute("data-nav")
    document.getElementById(newContentId).style.display = "block"
  })
})


/**
 * Ads Skipper Switch Controll
 */
const adsSkipKey = "ads-skipper-allowed"
const adsSkipSwitch = document.getElementById('ads-skip');

chrome.storage.local.get([adsSkipKey]).then((result) => {
  adsSkipSwitch.checked = result[adsSkipKey]
})
adsSkipSwitch.addEventListener('change', async function() {
  await chrome.storage.local.set({ [adsSkipKey]: adsSkipSwitch.checked })
});


/**
 * Time counter Switch Controll
 */
const timeCountKey = "time-counter-allowed"
const timeCountSwitch = document.getElementById('time-count');

chrome.storage.local.get([timeCountKey]).then((result) => {
  timeCountSwitch.checked = result[timeCountKey]
})
timeCountSwitch.addEventListener('change', async function() {
  await chrome.storage.local.set({ [timeCountKey]: timeCountSwitch.checked })
});