document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const toggleSlider = document.querySelector('.toggle-slider');
  let p = window.location.pathname.replace(/\/$/, ''); // strip trailing slash
  let page = 'home';
  if (p.includes('about')) page = 'about';
  // You could add more checks, but beware of false positives (e.g., ‘/projects/about.html’).
  toggleButtons.forEach((btn, idx) => {
    const href = btn.getAttribute('href');
    // Determine if this button corresponds to the page
    const isHomeBtn = href.includes('index');
    const isAboutBtn = href.includes('about');
    const active = (page === 'home' && isHomeBtn) || (page === 'about' && isAboutBtn);
    btn.classList.toggle('active', active);
    if (active && toggleSlider) {
      toggleSlider.style.transform = `translateX(${idx * 100}%)`;
    }
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


// Firefly Background Animation
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById("firefly-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  // Generate fireflies with some blurrier than others
  const fireflies = [];
    for (let i = 0; i < 80; i++) {
    const isSuperSmall = Math.random() < 0.2;
    fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: isSuperSmall ? Math.random() * 0.5 + 0.2 : Math.random() * 1.2 + 0.7,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.5,
        direction: Math.random() < 0.5 ? 1 : -1,
        blur: Math.random() < 0.5 ? 32 : Math.random() * 60 + 30 
    });
    }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireflies.forEach(f => {
      // Outer glow (very soft, dirty white)
      ctx.save();
      ctx.globalAlpha = f.opacity * 0.5;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 3.5, 0, Math.PI * 2);
      ctx.shadowColor = 'rgba(235,235,220,1)';
      ctx.shadowBlur = f.blur * 1.5;
      ctx.fillStyle = 'rgba(235,235,220,0.12)';
      ctx.fill();
      ctx.restore();

      // Core (small, bright, dirty white)
      ctx.save();
      ctx.globalAlpha = f.opacity * 0.9;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,245,230,1)';
      ctx.shadowColor = 'rgba(245,245,230,0.7)';
      ctx.shadowBlur = f.blur * 0.6;
      ctx.fill();
      ctx.restore();

      f.x += f.dx;
      f.y += f.dy;

      if (f.x < 0 || f.x > canvas.width) f.dx *= -1;
      if (f.y < 0 || f.y > canvas.height) f.dy *= -1;

      f.opacity += 0.005 * f.direction;
      if (f.opacity <= 0.3 || f.opacity >= 1) f.direction *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", resizeCanvas);
});

window.addEventListener('scroll', function() {
  const headerContainer = document.querySelector('.header-container');
  if (!headerContainer) return;
  if (window.scrollY > 30) {
    headerContainer.classList.add('hide-on-scroll');
  } else {
    headerContainer.classList.remove('hide-on-scroll');
  }
});