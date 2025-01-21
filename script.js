document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const toggleSlider = document.querySelector('.toggle-slider');

    // Get the active tab from localStorage or default to 'home'
    const activeTab = localStorage.getItem('activeTab') || 'home';

    // Highlight the active button based on stored activeTab and apply the correct color
    toggleButtons.forEach(button => {
        // Determine if button is active
        const buttonTab = button.getAttribute('href').includes(activeTab) ? activeTab : '';
        if (buttonTab) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Update slider position AFTER active class is applied
    const activeButton = document.querySelector('.toggle-btn.active');
    if (activeButton) {
        const activeIndex = Array.from(toggleButtons).indexOf(activeButton);
        if (toggleSlider && activeIndex !== -1) {
            toggleSlider.style.transform = `translateX(${activeIndex * 100}%)`;  // Position slider
        }
    }

    // Save the active tab and update the slider when a button is clicked
    toggleButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent default anchor behavior
            
            // Determine the tab name based on the button clicked
            const targetHref = this.getAttribute('href');
            const tabName = targetHref.includes('about') ? 'about' : 'home';

            // Store the active tab in localStorage
            localStorage.setItem('activeTab', tabName);

            // Highlight the active button and update the slider
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Reposition slider immediately based on active tab
            const index = Array.from(toggleButtons).indexOf(this);
            toggleSlider.style.transform = `translateX(${index * 100}%)`;

            // Add a slight delay before navigating to allow transition
            setTimeout(() => {
                window.location.href = targetHref;
            }, 300);  // Adjust as needed for smooth transition
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