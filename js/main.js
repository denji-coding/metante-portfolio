/* ============================================================
   MAE P. METANTE — PORTFOLIO SCRIPTS
   js/main.js
   ============================================================

   TABLE OF CONTENTS
   ---------------------------------------------------------
   01. AOS (Animate On Scroll) — init
   02. Particles Background
   03. Typing Animation (Hero)
   04. Navbar — Scroll Behavior
   05. Skill Bars — Intersection Observer
   06. Mobile Navigation
   07. Achievement Gallery Carousel
   08. Lightbox Modal
   09. Contact Form — Submit Handler
   ============================================================ */


/* ============================================================
   01. AOS — ANIMATE ON SCROLL
   Waits for full page load so the CDN script is ready.
   ============================================================ */
window.addEventListener('load', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }
});


/* ============================================================
   02. PARTICLES BACKGROUND
   Renders pink & purple floating dots on a fixed canvas.
   ============================================================ */
(function () {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 2 + 0.5;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#FF4FA3' : '#8B5CF6';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Reset if particle drifts off-screen
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle  = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();


/* ============================================================
   03. TYPING ANIMATION (HERO)
   Cycles through an array of role titles with a typewriter
   effect — typing forward, pausing, then deleting.
   ============================================================ */
(function () {
  const titles = [
    'IS Student',
    'System Developer',
    'Film Director',
    'Problem Solver',
    'Creative Thinker',
  ];

  let titleIndex  = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  const el        = document.getElementById('typed');

  function type() {
    const current = titles[titleIndex];

    if (!isDeleting) {
      // Type forward
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1800); // pause before deleting
        return;
      }
    } else {
      // Delete backward
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting   = false;
        titleIndex   = (titleIndex + 1) % titles.length;
      }
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }

  setTimeout(type, 800); // initial delay before starting
})();


/* ============================================================
   04. NAVBAR — SCROLL BEHAVIOR
   Adds a .scrolled class when the user scrolls past 60px,
   which triggers the solid background and border styles.
   Also shows / hides the Back to Top button.
   ============================================================ */
window.addEventListener('scroll', function () {
  const nav     = document.getElementById('navbar');
  const backTop = document.getElementById('back-top');
  const scrolled = window.scrollY > 60;

  nav.classList.toggle('scrolled', scrolled);
  backTop.classList.toggle('visible', scrolled);
});


/* ============================================================
   05. SKILL BARS — INTERSECTION OBSERVER
   Animates each skill bar to its target width when the
   skill card enters the viewport.
   ============================================================ */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = targetWidth + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));


/* ============================================================
   06. MOBILE NAVIGATION
   Handles open / close of the slide-in mobile nav drawer,
   the overlay backdrop, and closing when a link is tapped.
   Runs on load so all DOM elements are guaranteed to exist.
   ============================================================ */
window.addEventListener('load', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navClose  = document.getElementById('navClose');
  const overlay   = document.getElementById('mobileNavOverlay');

  if (!hamburger || !mobileNav || !navClose || !overlay) return;

  function openMenu() {
    mobileNav.classList.add('open');
    overlay.style.display = 'block';
    requestAnimationFrame(() => overlay.classList.add('open'));
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  navClose.addEventListener('click', (e) => { e.stopPropagation(); closeMenu(); });
  overlay.addEventListener('click', closeMenu);

  // Close when any nav link inside the drawer is tapped
  document.querySelectorAll('.nav-close-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});


/* ============================================================
   07. ACHIEVEMENT GALLERY CAROUSEL
   Single card with image carousel inside. Each image has
   its own description that updates when sliding.
   ============================================================ */
(function () {
  const slides = [
    {
      src: 'assets/images/CERTIFICATE.jpg',
      type: 'image',
      badge: 'Certificate',
      title: 'Certificate of Achievement',
      desc: 'Official certificate recognizing academic achievements and professional development milestones during the college journey.'
    },
    {
      src: 'assets/images/CERTIFICATE(1).jpg',
      type: 'image',
      badge: 'Certificate',
      title: 'Certificate of Recognition',
      desc: 'A certificate of recognition for outstanding participation and contributions during academic programs and events.'
    },
    {
      src: 'assets/images/CERTIFICATE(2).jpg',
      type: 'image',
      badge: 'Certificate',
      title: 'Certificate of Completion',
      desc: 'Certificate recognizing the successful completion of professional development training and academic requirements.'
    },
    {
      src: 'assets/images/CERTIFICATE.jfif',
      type: 'image',
      badge: 'Certificate',
      title: 'Professional Development Certificate',
      desc: 'Certificate acknowledging professional development and skills enhancement through specialized training programs.'
    },
    {
      src: 'assets/images/CERTIFICATE(1).jfif',
      type: 'image',
      badge: 'Certificate',
      title: 'Training Certificate',
      desc: 'Certificate of participation in professional training sessions designed to enhance technical and workplace competencies.'
    },
    {
      src: 'assets/images/CERTIFICATE(2).jfif',
      type: 'image',
      badge: 'Certificate',
      title: 'Academic Excellence Certificate',
      desc: 'Recognition for demonstrating excellence in academic performance and commitment to continuous learning.'
    },
    {
      src: 'assets/images/OJT Certificate.jpg',
      type: 'image',
      badge: 'OJT Certificate',
      title: 'OJT Certificate of Completion',
      desc: 'Official certificate confirming the successful completion of On-the-Job Training, with commendation for professional conduct and dedication.'
    },
    {
      src: 'assets/images/FILM DIRECTOR.png',
      type: 'image',
      badge: 'Film Award',
      title: 'Film Director — Top 20 Best Films',
      desc: 'Served as the Director of our team\'s film project in a classroom film competition. Our film was recognized among the Top 20 Best Films.'
    },
    {
      src: 'assets/images/OJT PICTURE.jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Group Photo',
      desc: 'A memorable group photo from the On-the-Job Training experience, capturing the camaraderie and professional bonds formed during the internship.'
    },
    {
      src: 'assets/images/OJT PICTURES.jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Team Moments',
      desc: 'Candid moments captured during the OJT experience, showcasing teamwork and the collaborative spirit of working with professionals.'
    },
    {
      src: 'assets/images/OJT PICTURE(1).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Workplace Learning',
      desc: 'Learning in action during the On-the-Job Training, gaining hands-on experience with experienced mentors and professionals.'
    },
    {
      src: 'assets/images/OJT PICTURE(2).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Professional Development',
      desc: 'Engaging in professional development activities during OJT, building skills that bridge the gap between academic knowledge and real-world application.'
    },
    {
      src: 'assets/images/OJT PICTURE(3).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Collaborative Work',
      desc: 'Working collaboratively with team members during OJT, contributing to meaningful projects and system-related tasks.'
    },
    {
      src: 'assets/images/OJT PICTURE(4).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Office Environment',
      desc: 'Experiencing the professional office environment during the internship, learning workplace etiquette and organizational skills.'
    },
    {
      src: 'assets/images/OJT PICTURE(5).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Skills Application',
      desc: 'Applying technical skills learned in the classroom to real-world scenarios during the On-the-Job Training program.'
    },
    {
      src: 'assets/images/OJT PICTURE(6).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Mentorship',
      desc: 'Learning from experienced mentors who provided guidance, support, and professional insights throughout the internship period.'
    },
    {
      src: 'assets/images/OJT PICTURE(7).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Team Building',
      desc: 'Participating in team-building activities that strengthened relationships and fostered a positive working environment during OJT.'
    },
    {
      src: 'assets/images/OJT PICTURE(8).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Cross-Cultural Exchange',
      desc: 'Interacting with students from Tsukuba during OJT, gaining insights into different cultures and perspectives.'
    },
    {
      src: 'assets/images/OJT PICTURE(9).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — System Meeting',
      desc: 'Participating in a system meeting with the Vice President of the school, gaining firsthand experience in professional discussions.'
    },
    {
      src: 'assets/images/OJT PICTURE(10).jfif',
      type: 'image',
      badge: 'OJT Memory',
      title: 'OJT Experience — Completion Day',
      desc: 'Celebrating the successful completion of the On-the-Job Training program, marking a significant milestone in the academic journey.'
    }
  ];

  let current = 0;
  let autoTimer;

  const mainImg     = document.getElementById('achMainImg');
  const imgWrap     = document.getElementById('achImgWrap');
  const overlay     = document.getElementById('achViewerOverlay');
  const prevBtn     = document.getElementById('achPrev');
  const nextBtn     = document.getElementById('achNext');
  const counter     = document.getElementById('achCounter');
  const badge       = document.getElementById('achBadge');
  const titleEl     = document.getElementById('achTitle');
  const descEl      = document.getElementById('achDesc');

  const thumbsWrap  = document.getElementById('achThumbs');
  const dotsWrap    = document.getElementById('achDots');

  if (!mainImg || !imgWrap) return;

  // Build thumbnails
  slides.forEach((slide, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'ach-thumb' + (i === 0 ? ' active' : '');
    thumb.innerHTML = `<img src="${slide.src}" alt="${slide.title}" loading="lazy" />`;
    thumb.addEventListener('click', () => { goTo(i); resetAutoPlay(); });
    thumbsWrap.appendChild(thumb);
  });

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'ach-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAutoPlay(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    current = ((idx % slides.length) + slides.length) % slides.length;
    const slide = slides[current];

    // Animate out
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
      mainImg.src = slide.src;
      mainImg.alt = slide.title;
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 200);

    // Update info with animation
    const infoEl = document.getElementById('achInfo');
    infoEl.style.opacity = '0';
    infoEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
      counter.textContent  = `${current + 1} / ${slides.length}`;
      badge.textContent    = slide.badge;
      titleEl.textContent  = slide.title;
      descEl.textContent   = slide.desc;

      infoEl.style.opacity = '1';
      infoEl.style.transform = 'translateY(0)';
    }, 200);

    // Update thumbnails
    thumbsWrap.querySelectorAll('.ach-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === current);
    });

    // Scroll active thumbnail into view (without moving the page)
    const activeThumb = thumbsWrap.children[current];
    if (activeThumb) {
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const wrapWidth = thumbsWrap.offsetWidth;
      const scrollPos = thumbLeft - (wrapWidth / 2) + (thumbWidth / 2);
      thumbsWrap.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }

    // Update dots
    dotsWrap.querySelectorAll('.ach-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    // Update nav buttons
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoPlay(); });

  // Touch swipe on the image viewer
  let touchStartX = 0;
  imgWrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  imgWrap.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      delta < 0 ? goTo(current + 1) : goTo(current - 1);
      resetAutoPlay();
    }
  }, { passive: true });

  // Click on image to open lightbox
  imgWrap.addEventListener('click', () => {
    openLightbox(current);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox.classList.contains('open')) return; // lightbox handles its own keys
    if (e.key === 'ArrowLeft') { goTo(current - 1); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoPlay(); }
  });

  // Auto-play
  function resetAutoPlay() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goTo(current + 1);
    }, 5000);
  }

  // Pause autoplay on hover
  const card = document.querySelector('.ach-showcase-card');
  if (card) {
    card.addEventListener('mouseenter', () => clearInterval(autoTimer));
    card.addEventListener('mouseleave', resetAutoPlay);
  }

  // Initialize
  goTo(0);
  resetAutoPlay();

  // ── Lightbox ──
  window.openLightbox = function(idx) {
    current = idx;
    const slide = slides[current];
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImg.src = slide.src;
    lightboxImg.alt = slide.title;
    lightboxCaption.textContent = slide.title;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox-modal');
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.lightboxPrev = function() {
    current = ((current - 1) + slides.length) % slides.length;
    const slide = slides[current];
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
      lightboxImg.src = slide.src;
      lightboxImg.alt = slide.title;
      lightboxCaption.textContent = slide.title;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 150);
    goTo(current);
  };

  window.lightboxNext = function() {
    current = (current + 1) % slides.length;
    const slide = slides[current];
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
      lightboxImg.src = slide.src;
      lightboxImg.alt = slide.title;
      lightboxCaption.textContent = slide.title;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 150);
    goTo(current);
  };

  // Lightbox event listeners
  document.getElementById('lightboxBackdrop').addEventListener('click', closeLightbox);
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', lightboxPrev);
  document.getElementById('lightboxNext').addEventListener('click', lightboxNext);

  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox-modal');
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  });
})();


/* ============================================================
   10. CONTACT FORM — WEB3FORMS HANDLER
   Sends form data to Web3Forms API and shows status feedback.
   ============================================================ */
const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const contactFormStatus = document.getElementById("contactFormStatus");

function showContactStatus(message, type = "success") {
  contactFormStatus.style.display = "block";
  contactFormStatus.textContent = message;

  if (type === "success") {
    contactFormStatus.style.color = "#22c55e";
  } else {
    contactFormStatus.style.color = "#ef4444";
  }
}

function hideContactStatus() {
  contactFormStatus.style.display = "none";
  contactFormStatus.textContent = "";
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    hideContactStatus();

    const formData = new FormData(contactForm);

    contactSubmitBtn.disabled = true;
    contactSubmitBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i> Sending...`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      contactForm.reset();

      contactSubmitBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i> Message Sent`;
      contactSubmitBtn.style.background = "#16A34A";

      showContactStatus("Thank you! Your message has been sent successfully.", "success");

      setTimeout(() => {
        contactSubmitBtn.innerHTML = `<i class="bi bi-send-fill"></i> Send Message`;
        contactSubmitBtn.style.background = "";
        contactSubmitBtn.disabled = false;
        hideContactStatus();
      }, 4000);

    } catch (error) {
      console.error(error);

      showContactStatus("Failed to send message. Please try again.", "error");

      contactSubmitBtn.innerHTML = `<i class="bi bi-send-fill"></i> Send Message`;
      contactSubmitBtn.disabled = false;
    }
  });
}

