// Get DOM elements
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let sliderlist = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');

// Move the first thumbnail item to the end
thumbnail.appendChild(thumbnailItems[0]);

// Event listeners for next and previous buttons
nextBtn.onclick = function() {
    moveSlider('next');
};

prevBtn.onclick = function() {
    moveSlider('prev');
};

// Function to move the slider in the specified direction
function moveSlider(direction) {
    let sliderItems = sliderlist.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');

    if (direction === 'next') {
        // Move the first slider item to the end
        sliderlist.appendChild(sliderItems[0]);
        // Move the first thumbnail item to the end
        thumbnail.appendChild(thumbnailItems[0]);
        // Add 'next' class to initiate animation
        slider.classList.add('next');
    } else {
        // Move the last slider item to the beginning
        sliderlist.prepend(sliderItems[sliderItems.length - 1]);
        // Move the last thumbnail item to the beginning
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        // Add 'prev' class to initiate animation
        slider.classList.add('prev');
    }

    // Remove the 'next' or 'prev' class after animation ends
    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, {once: true});
}
