const slides = [
  { src: "assets/hero-hook-1.png", caption: "Solve. Learn. Level Up." },
  { src: "assets/hero-hook-2.png", caption: "From blunders to brilliance." },
  { src: "assets/feature-puzzle-rush-3.png", caption: "Blitz your tactics." },
  { src: "assets/feature-daily-puzzles.png", caption: "New challenge every day." },
  { src: "assets/feature-rated-mode-4.png", caption: "Climb the rating ladder." },
  { src: "assets/feature-custom-range-5.png", caption: "Train at your level." },
  { src: "assets/feature-analyse-6.png", caption: "Understand every move." },
  { src: "assets/feature-stats-7.png", caption: "Track your growth." },
  { src: "assets/feature-vision-trainer-tab-8.png", caption: "Sharpen your vision." }
];

const heroImage = document.getElementById("hero-slide-image");
const heroCaption = document.getElementById("hero-slide-caption");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;
let autoplay = null;

function renderSlide(index) {
  if (!heroImage || !heroCaption) return;
  currentSlide = (index + slides.length) % slides.length;
  heroImage.src = slides[currentSlide].src;
  heroCaption.textContent = slides[currentSlide].caption;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

function nextSlide() {
  renderSlide(currentSlide + 1);
}

function prevSlide() {
  renderSlide(currentSlide - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplay = setInterval(nextSlide, 3200);
}

function stopAutoplay() {
  if (autoplay) clearInterval(autoplay);
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index || 0);
    renderSlide(index);
    startAutoplay();
  });
});

if (prevBtn) prevBtn.addEventListener("click", () => {
  prevSlide();
  startAutoplay();
});

if (nextBtn) nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoplay();
});

const showcase = document.querySelector(".hero-shot-card");
if (showcase) {
  let startX = 0;
  let endX = 0;

  showcase.addEventListener("touchstart", e => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  showcase.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
      startAutoplay();
    }
  }, { passive: true });
}

if (heroImage && heroCaption) {
  renderSlide(0);
  startAutoplay();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
