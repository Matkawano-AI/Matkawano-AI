/* ===========================
   MIDORINAMI — Script
   =========================== */

// --- Navbar scroll behavior ---
const navbar = document.getElementById('navbar');
function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// --- Mobile menu ---
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => observer.observe(el));

// --- Contact form ---
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate submission — replace with real endpoint
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// --- Smooth active nav highlighting ---
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

// Add active nav style
const style = document.createElement('style');
style.textContent = `
  #navbar.scrolled .nav-links a.active {
    color: var(--green-mid);
  }
`;
document.head.appendChild(style);

// --- Hero image fallback: if image fails to load, show green gradient ---
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  heroImg.addEventListener('error', () => {
    heroImg.style.display = 'none';
  });
}

// --- Product image fallbacks ---
document.querySelectorAll('.product-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
  // If image loaded before JS runs
  if (img.complete && img.naturalHeight === 0) {
    img.style.display = 'none';
  }
});

// --- Story image fallback ---
const storyImg = document.querySelector('.story-image img');
if (storyImg) {
  storyImg.addEventListener('error', () => {
    storyImg.style.display = 'none';
  });
  if (storyImg.complete && storyImg.naturalHeight === 0) {
    storyImg.style.display = 'none';
  }
}

// --- Parallax on hero (subtle) ---
const heroContent = document.querySelector('.hero-content');
const heroBg = document.querySelector('.hero-bg');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
