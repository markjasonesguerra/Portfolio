document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const toggleSlider = document.querySelector('.toggle-slider');
    
    // Determine the current page using URL
    const currentPage = window.location.pathname.includes('about.html') ? 'about' : 'home';

    // Highlight the correct button and update slider
    const updateActiveButton = () => {
        toggleButtons.forEach(button => {
            const isActive = button.getAttribute('href').includes(currentPage);
            button.classList.toggle('active', isActive); // Add/remove active class based on page
        });
    };

    const updateSliderPosition = () => {
        const activeButton = document.querySelector('.toggle-btn.active');
        if (activeButton) {
            const activeIndex = Array.from(toggleButtons).indexOf(activeButton);
            if (toggleSlider && activeIndex !== -1) {
                toggleSlider.style.transform = `translateX(${activeIndex * 100}%)`;
            }
        }
    };

    // Update UI on load
    updateActiveButton();
    updateSliderPosition();

    // Update UI when a toggle button is clicked
    toggleButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default navigation

            // Navigate to the clicked tab
            window.location.href = this.getAttribute('href');
        });
    });
});



window.addEventListener('scroll', function() {
    const particles = document.querySelector('.tsparticles');
    const scrollPosition = window.scrollY;

    // Zoom-out factor as you scroll, capping at a maximum zoom level
    const zoomOutFactor = Math.min(1 + scrollPosition / 600, 1.5);

    // Apply zoom effect on particles
    particles.style.backgroundSize = `${40 * zoomOutFactor}%`;
});

window.addEventListener('mousemove', function(e) {
    const particles = document.querySelector('.tsparticles');

    // Get center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate how far the cursor is from the center of the screen
    const offsetX = (e.clientX - centerX) / centerX;
    const offsetY = (e.clientY - centerY) / centerY;

    // Adjust horizontal and vertical movement based on cursor
    const moveX = offsetX * 15;
    const moveY = offsetY * 15;

    // Apply particle movement with cursor
    particles.style.backgroundPosition = `calc(50% + ${moveX}px) calc(0% + ${moveY}px)`;
});

window.addEventListener('scroll', function() {
    const particles = document.querySelector('.tsparticles');
    const scrollPosition = window.scrollY;

    // Zoom-out factor as you scroll, capping at a maximum zoom level
    const zoomOutFactor = Math.min(1 + scrollPosition / 600, 1.5);

    // Apply zoom effect on particles
    particles.style.backgroundSize = `${40 * zoomOutFactor}%`;
});

window.addEventListener('mousemove', function(e) {
    const particles = document.querySelector('.tsparticles');

    // Get center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate how far the cursor is from the center of the screen
    const offsetX = (e.clientX - centerX) / centerX;
    const offsetY = (e.clientY - centerY) / centerY;

    // Adjust horizontal and vertical movement based on cursor
    const moveX = offsetX * 15;
    const moveY = offsetY * 15;

    // Apply particle movement with cursor
    particles.style.backgroundPosition = `calc(50% + ${moveX}px) calc(0% + ${moveY}px)`;
});

document.addEventListener('DOMContentLoaded', function () {
    const avatar = document.querySelector('.avatar');
    const avatarMessage = document.getElementById('avatarMessage');

    avatar.addEventListener('click', function () {
        avatarMessage.style.display = 'block';
        avatarMessage.classList.add('show-message');

        // Remove the message after the animation ends
        setTimeout(() => {
            avatarMessage.style.display = 'none';
            avatarMessage.classList.remove('show-message');
        }, 3500); // Adjust the timing to match the animation duration
    });
});
