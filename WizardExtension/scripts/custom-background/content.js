/**
 * Background Setup
 */


/**
 * Background Add Event
 */
document.getElementById('background-input').addEventListener('change', function previewImage(event) {
    const input = event.target
    const maxFileSize = 1048576 // 1MB in bytes
  
    const errorLog = document.getElementById('background-input-error')
    if (input.files && input.files[0]) {
        if (input.files[0].size > maxFileSize) {
            errorLog.innerText = "File size must be less than 1 MB."
            input.value = ""
            return
        } else {
            errorLog.innerText = ""
        }
    
        const reader = new FileReader()
    
        reader.onload = function() {
            const image = new Image()
            image.src = reader.result
            image.onload = function() {
            // You can now do something with the image, e.g. upload it to a server
            console.log("Image loaded:", image.src)
            }
        }
    
        reader.readAsDataURL(input.files[0])
    }
})
