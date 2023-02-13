// NAVBAR
const navElements = document.querySelectorAll(".topnav span")
navElements.forEach((ele, idx) => {
    ele.addEventListener("click", () => {
        if(!ele.classList.contains("active")){
            document.querySelector(".topnav span.active").classList.remove("active")
            ele.classList.add("active")
        }
    })
})