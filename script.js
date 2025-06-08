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


document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  const observerOptions = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  projectCards.forEach(card => {
    observer.observe(card);
  });
});


// 

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById("firefly-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const fireflies = [];
  for (let i = 0; i < 80; i++) {
    fireflies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
      direction: Math.random() < 0.5 ? 1 : -1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireflies.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 200, ${f.opacity})`;
      ctx.shadowColor = `rgba(255, 255, 200, ${f.opacity})`;
      ctx.shadowBlur = 12;
      ctx.fill();

      f.x += f.dx;
      f.y += f.dy;

      if (f.x < 0 || f.x > canvas.width) f.dx *= -1;
      if (f.y < 0 || f.y > canvas.height) f.dy *= -1;

      f.opacity += 0.005 * f.direction;
      if (f.opacity <= 0 || f.opacity >= 1) f.direction *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", resizeCanvas);
});