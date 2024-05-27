// JavaScript 代码用于实现图片轮播功能
const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider img');

let index = 0;

function nextSlide() {
    index = (index + 1) % images.length;
    updateSlider();
}

function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextSlide, 3000); // 自动播放，每隔3秒切换到下一张图片