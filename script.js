// Header inclusion
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

// Footer inclusion
document.addEventListener('DOMContentLoaded', function () {
  const footerContainer = document.getElementById('footer-include');
  if (footerContainer) {
    fetch('footer.html')
      .then(response => response.text())
      .then(html => {
        footerContainer.innerHTML = html;
      });
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
    { label: "Photography", href: "photography.html", disabled: false},
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

// Free-drag hobby tags anywhere within the hobbies box
document.addEventListener('DOMContentLoaded', enableHobbyDrag);
document.addEventListener('DOMContentLoaded', initializeToolMarquee);
document.addEventListener('DOMContentLoaded', initializeAboutMoreToggle);
document.addEventListener('DOMContentLoaded', initializeContactFormFeedback);
document.addEventListener('DOMContentLoaded', initializeCvRequestPrefill);

function enableHobbyDrag() {
  const hobbiesBox = document.getElementById('hobbiesBox');
  if (!hobbiesBox) return;

  const playground = hobbiesBox.querySelector('.hobby-tags');
  if (!playground) return;

  const tags = Array.from(playground.querySelectorAll('.hobby-tag'));
  if (!tags.length) return;

  const EDGE_PADDING = 12;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const ensureWithinBounds = (tag) => {
    const maxLeft = Math.max(EDGE_PADDING, playground.clientWidth - tag.offsetWidth - EDGE_PADDING);
    const maxTop = Math.max(EDGE_PADDING, playground.clientHeight - tag.offsetHeight - EDGE_PADDING);
    const left = clamp(parseFloat(tag.style.left) || EDGE_PADDING, EDGE_PADDING, maxLeft);
    const top = clamp(parseFloat(tag.style.top) || EDGE_PADDING, EDGE_PADDING, maxTop);
    tag.style.left = `${left}px`;
    tag.style.top = `${top}px`;
  };

  const placeTags = () => {
    const innerWidth = Math.max(0, playground.clientWidth - EDGE_PADDING * 2);
    const innerHeight = Math.max(0, playground.clientHeight - EDGE_PADDING * 2);
    tags.forEach((tag, idx) => {
      const tagWidth = tag.offsetWidth || 100;
      const tagHeight = tag.offsetHeight || 40;
      const maxLeft = Math.max(0, innerWidth - tagWidth);
      const maxTop = Math.max(0, innerHeight - tagHeight);
      const seed = (Math.sin(idx + 1) + 1) / 2; // deterministic pseudo-random
      const jitter = (Math.cos((idx + 1) * 1.7) + 1) / 2;
      const left = EDGE_PADDING + seed * maxLeft;
      const top = EDGE_PADDING + jitter * maxTop;
      tag.style.left = `${left}px`;
      tag.style.top = `${top}px`;
    });
  };

  tags.forEach(tag => {
    tag.style.position = 'absolute';
    tag.style.left = tag.style.left || `${EDGE_PADDING}px`;
    tag.style.top = tag.style.top || `${EDGE_PADDING}px`;
    tag.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      tag.setPointerCapture(event.pointerId);
      tag.classList.add('dragging');

      const startX = event.clientX;
      const startY = event.clientY;
      const initialLeft = parseFloat(tag.style.left) || EDGE_PADDING;
      const initialTop = parseFloat(tag.style.top) || EDGE_PADDING;

      const handleMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        const maxLeft = Math.max(EDGE_PADDING, playground.clientWidth - tag.offsetWidth - EDGE_PADDING);
        const maxTop = Math.max(EDGE_PADDING, playground.clientHeight - tag.offsetHeight - EDGE_PADDING);
        const nextLeft = clamp(initialLeft + deltaX, EDGE_PADDING, maxLeft);
        const nextTop = clamp(initialTop + deltaY, EDGE_PADDING, maxTop);
        tag.style.left = `${nextLeft}px`;
        tag.style.top = `${nextTop}px`;
      };

      const handleRelease = () => {
        tag.classList.remove('dragging');
        tag.releasePointerCapture(event.pointerId);
        tag.removeEventListener('pointermove', handleMove);
        tag.removeEventListener('pointerup', handleRelease);
        tag.removeEventListener('pointercancel', handleRelease);
      };

      tag.addEventListener('pointermove', handleMove);
      tag.addEventListener('pointerup', handleRelease);
      tag.addEventListener('pointercancel', handleRelease);
    });
  });

  requestAnimationFrame(() => {
    placeTags();
    tags.forEach(ensureWithinBounds);
  });

  window.addEventListener('resize', () => {
    tags.forEach(ensureWithinBounds);
  });
}

function initializeToolMarquee() {
  const tracks = document.querySelectorAll('.tools-row .tools-track');
  tracks.forEach(track => {
    const initialize = () => {
      const isInitialized = track.dataset.marqueeInitialized === 'true';
      const icons = Array.from(track.children);
      if (!icons.length) return;

      if (!isInitialized) {
        const fragment = document.createDocumentFragment();
        icons.forEach(icon => {
          fragment.appendChild(icon.cloneNode(true));
        });

        track.appendChild(fragment);
      }

      const distance = track.scrollWidth / 2;
      track.style.setProperty('--tools-distance', `${distance}px`);
      track.dataset.marqueeInitialized = 'true';

      track.style.animation = 'none';
      track.offsetHeight;
      track.style.animation = '';
    };

    const images = Array.from(track.querySelectorAll('img'));
    const pending = images.filter(img => !img.complete);

    if (pending.length === 0) {
      requestAnimationFrame(initialize);
    } else {
      let loadedCount = 0;
      const handleLoad = () => {
        loadedCount += 1;
        if (loadedCount === pending.length) {
          requestAnimationFrame(initialize);
        }
      };
      pending.forEach(img => {
        img.addEventListener('load', handleLoad, { once: true });
        img.addEventListener('error', handleLoad, { once: true });
      });
    }
  });

  window.addEventListener('resize', () => {
    tracks.forEach(track => {
      if (track.dataset.marqueeInitialized !== 'true') return;
      const distance = track.scrollWidth / 2;
      track.style.setProperty('--tools-distance', `${distance}px`);
      track.style.animation = 'none';
      track.offsetHeight;
      track.style.animation = '';
    });
  });
}

function initializeAboutMoreToggle() {
  const toggleBtn = document.getElementById('showMoreToggle');
  const content = document.getElementById('aboutMoreContent');
  if (!toggleBtn || !content) return;

  const label = toggleBtn.querySelector('.showmore-text');

  const setExpanded = (expanded) => {
    toggleBtn.setAttribute('aria-expanded', String(expanded));
    content.classList.toggle('is-collapsed', !expanded);
    if (label) {
      label.textContent = expanded ? 'Less About Me' : 'More About Me';
    }
    if (expanded) {
      requestAnimationFrame(() => {
        initializeToolMarquee();
      });
    }
  };

  setExpanded(false);

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    setExpanded(!isExpanded);
  });
}

function initializeContactFormFeedback() {
  const forms = Array.from(document.querySelectorAll('.contact-form'));
  if (!forms.length) return;

  forms.forEach(form => {
    const submitBtn = form.querySelector('.contact-submit');
    if (!submitBtn) return;

    let status = form.querySelector('.contact-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'contact-status';
      submitBtn.insertAdjacentElement('afterend', status);
    }

    const showStatus = (message, stateClass) => {
      status.textContent = message;
      status.classList.remove('is-success', 'is-error');
      status.classList.add(stateClass);
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.remove('is-sent', 'is-sending');
        form.classList.add('is-failed');
        showStatus('Please fill out all fields correctly.', 'is-error');
        form.reportValidity();
        setTimeout(() => form.classList.remove('is-failed'), 600);
        return;
      }

      const endpoint = form.getAttribute('action');
      if (!endpoint) {
        form.classList.add('is-failed');
        showStatus('Missing form endpoint.', 'is-error');
        return;
      }

      form.classList.remove('is-failed', 'is-sent');
      form.classList.add('is-sending');
      showStatus('Sending message…', 'is-success');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          form.classList.remove('is-sending');
          form.classList.add('is-sent');
          showStatus('Message sent! Thank you!', 'is-success');
          setTimeout(() => form.classList.remove('is-sent'), 900);
        } else {
          const data = await response.json().catch(() => ({}));
          const errorText = data?.errors?.[0]?.message || 'Message failed to send. Please try again.';
          form.classList.remove('is-sending');
          form.classList.add('is-failed');
          showStatus(errorText, 'is-error');
          setTimeout(() => form.classList.remove('is-failed'), 900);
        }
      } catch (error) {
        form.classList.remove('is-sending');
        form.classList.add('is-failed');
        showStatus('Network error. Please try again.', 'is-error');
        setTimeout(() => form.classList.remove('is-failed'), 900);
      }
    });
  });
}

function initializeCvRequestPrefill() {
  const params = new URLSearchParams(window.location.search);
  const prefill = params.get('prefill');
  if (!prefill) return;

  const messageField = document.getElementById('contactMessage');
  if (!messageField) return;

  const toggleBtn = document.getElementById('showMoreToggle');
  const content = document.getElementById('aboutMoreContent');
  if (toggleBtn && content && content.classList.contains('is-collapsed')) {
    toggleBtn.click();
  }

  const messages = {
    cv: 'Hi Mark,\n\nI would like to request a copy of your resume/CV for review.\n\nThank you!',
    huffman: 'Hi Mark,\n\nI want to request the Huffman Coding source code.\n\nThank you.',
    atm: 'Hi Mark,\n\nI want to request the Automated Teller Machine source code.\n\nThank you.'
  };

  const message = messages[prefill];
  if (!message) return;

  messageField.value = message;
  messageField.dispatchEvent(new Event('input', { bubbles: true }));

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    requestAnimationFrame(() => {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}



