document.addEventListener('DOMContentLoaded', function () {
  const headerContainer = document.getElementById('header-include');
  if (headerContainer) {
    fetch('header.html')
      .then(response => response.text())
      .then(html => {
        headerContainer.innerHTML = html;
        initializeHeaderScripts();
      });
  } else {
    initializeHeaderScripts();
  }
});

function initializeHeaderScripts() {
  // Toggle navigation slider logic
  const toggleButtons = Array.from(document.querySelectorAll('.toggle-btn'));
  const toggleSlider = document.querySelector('.toggle-slider');

  function normalizePath(pathname) {
    return pathname.replace(/\/$/, '');
  }

  const currentPathNorm = normalizePath(window.location.pathname);

  let newIndex = 0;
  toggleButtons.forEach((btn, idx) => {
    const href = btn.getAttribute('href');
    const resolvedURL = new URL(href, window.location.href);
    const linkPathNorm = normalizePath(resolvedURL.pathname);
    if (linkPathNorm === currentPathNorm) {
      newIndex = idx;
    }
  });

  toggleButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const activeBtn = document.querySelector('.toggle-btn.active');
      let activeIdx = toggleButtons.indexOf(activeBtn);
      if (activeIdx === -1) {
        activeIdx = newIndex;
      }
      sessionStorage.setItem('togglePrevIndex', activeIdx.toString());
    });
  });

  const prevIndexRaw = sessionStorage.getItem('togglePrevIndex');
  const prevIndex = prevIndexRaw !== null ? parseInt(prevIndexRaw, 10) : null;

  if (toggleSlider) {
    if (prevIndex !== null && prevIndex !== newIndex) {
      toggleSlider.style.transition = 'none';
      toggleSlider.style.transform = `translateX(${prevIndex * 100}%)`;
      toggleSlider.offsetHeight;
      toggleSlider.style.transition = '';
      requestAnimationFrame(() => {
        toggleSlider.style.transform = `translateX(${newIndex * 100}%)`;
      });
    } else {
      toggleSlider.style.transition = 'none';
      toggleSlider.style.transform = `translateX(${newIndex * 100}%)`;
      requestAnimationFrame(() => {
        toggleSlider.style.transition = '';
      });
    }
  }

  toggleButtons.forEach((btn, idx) => {
    const href = btn.getAttribute('href');
    const resolvedURL = new URL(href, window.location.href);
    const linkPathNorm = normalizePath(resolvedURL.pathname);
    const isActive = (linkPathNorm === currentPathNorm);
    btn.classList.toggle('active', isActive);
  });

  sessionStorage.removeItem('togglePrevIndex');

  // Menu toggle logic
  const menuToggle = document.getElementById('menuToggle');
  const menuPopup = document.getElementById('menuPopup');
  const menuList = document.getElementById('menu-list');

  const menuItems = [
    { label: "Photography", href: "photography.html", disabled: false },
    { label: "Journey", href: "journey.html", disabled: true },
    { label: "Awards", href: "awards.html", disabled: true },
    { label: "Coming Soon", href: "#", disabled: true }
  ];

  menuList.innerHTML = menuItems.map(item => `
    <li class="${item.disabled ? 'disabled' : ''}" ${item.disabled ? 'title="This feature is not available yet"' : ''}>
      ${item.disabled ? `<span>${item.label}</span>` : `<a href="${item.href}">${item.label}</a>`}
    </li>
  `).join('');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menuPopup.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !menuPopup.contains(e.target)) {
      menuToggle.classList.remove('active');
      menuPopup.classList.remove('show');
    }
  });

  // Mobile header hide on scroll
  let lastScrollY = window.scrollY;
  const header = document.querySelector('header');
  const threshold = 50;

  window.addEventListener('scroll', function () {
    if (window.innerWidth <= 480) {
      if (window.scrollY < threshold) {
        header.classList.remove('hide-on-scroll');
      } else if (window.scrollY > lastScrollY) {
        header.classList.add('hide-on-scroll');
      } else {
        header.classList.remove('hide-on-scroll');
      }
      lastScrollY = window.scrollY;
    }
  });

  // Show header when user moves mouse to top edge
  document.addEventListener('mousemove', function (e) {
    if (e.clientY <= 20) {
      headerContainer.classList.add('show-on-hover');
      headerContainer.classList.remove('hide-on-scroll');
    } else if (!headerContainer.matches(':hover')) {
      headerContainer.classList.remove('show-on-hover');
    }
  });

  // Back button logic
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.location.href = "./";
    });
  }

  // Avatar message logic
  const avatar = document.querySelector('.avatar');
  const avatarMessage = document.getElementById('avatarMessage');
  let timeoutId = null;

  if (avatar && avatarMessage) {
    avatar.addEventListener('click', function () {
      avatarMessage.classList.add('show-message');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        avatarMessage.classList.remove('show-message');
      }, 3000);
    });
  }
}

// Particle background effect & movement
window.addEventListener('scroll', function () {
  const particles = document.querySelector('.tsparticles');
  if (!particles) return;
  const scrollPosition = window.scrollY;
  const zoomOutFactor = Math.min(1 + scrollPosition / 600, 1.5);
  particles.style.backgroundSize = `${40 * zoomOutFactor}%`;
});

window.addEventListener('mousemove', function (e) {
  const particles = document.querySelector('.tsparticles');
  if (!particles) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsetX = (e.clientX - centerX) / centerX;
  const offsetY = (e.clientY - centerY) / centerY;
  const moveX = offsetX * 15;
  const moveY = offsetY * 15;
  particles.style.backgroundPosition = `calc(50% + ${moveX}px) calc(0% + ${moveY}px)`;
});

// Project Card Animation on Scroll
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const observerOptions = { threshold: 0.3 };
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
      // Outer glow
      ctx.save();
      ctx.globalAlpha = f.opacity * 0.5;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 3.5, 0, Math.PI * 2);
      ctx.shadowColor = 'rgba(235,235,220,1)';
      ctx.shadowBlur = f.blur * 1.5;
      ctx.fillStyle = 'rgba(235,235,220,0.12)';
      ctx.fill();
      ctx.restore();

      // Core
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