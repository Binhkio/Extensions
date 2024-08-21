/**
 * Navbar controller
 */
let chosenNavbar = document.querySelector("nav ul li.chosen")
document.querySelectorAll("nav ul li").forEach((e, k, p) => {
  e.addEventListener('click', () => {
    if (e.classList.contains("chosen")) return

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
 * Switch
 */
document.querySelectorAll('.switch input').forEach((element, k, p) => {
  const key = element.getAttribute('data-allowed')

  chrome.storage.local.get([key]).then((result) => {
    element.checked = result[key]
  })

  element.addEventListener('change', async (event) => {
    await chrome.storage.local.set({ [key]: event.target.checked })
  })
})

/**
 * Open-Close Background Setup
 */
const bgSetup = document.getElementById('background-setup')
const overScreen = document.getElementById('over-screen')
document.getElementById('custom-background').addEventListener('click', function() {
  bgSetup.classList.remove('hidden')
  overScreen.classList.remove('hidden')
})
document.getElementById('background-back').addEventListener('click', function() {
  bgSetup.classList.add('hidden')
  overScreen.classList.add('hidden')
})
