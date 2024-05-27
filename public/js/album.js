// JavaScript code is used to implement the image carousel function

// selecting the slider container element
const slider = document.querySelector('.slider');

// selecting all the image elements inside the slider container
const images = document.querySelectorAll('.slider img');

// initializing the index to track the current image
let index = 0;

// move to the next slide
function nextSlide() {
    // incrementing the index and using modulo to loop back to the beginning if necessary
    index = (index + 1) % images.length;
    // updating the slider position
    updateSlider();
}

// move to the previous slide
function prevSlide() {
    // decrementing the index and using modulo to loop back to the end if necessary
    index = (index - 1 + images.length) % images.length;
    updateSlider();
}

// update the slider position based on the current index
function updateSlider() {
    // adjusting the slider's horizontal position to show the current image
    slider.style.transform = `translateX(-${index * 100}%)`;
}

// setting an interval to automatically switch to the next slide every 3 seconds (autoplay)
setInterval(nextSlide, 3000);
