const slides = [
  {
    src: "assets/hero-hook-1.png",
    caption: "Solve. Learn. Level up.",
    alt: "TacticMax home screen with chess tactics training dashboard"
  },
  {
    src: "assets/hero-hook-2.png",
    caption: "From blunders to brilliance.",
    alt: "TacticMax puzzle training flow on Android"
  },
  {
    src: "assets/feature-puzzle-rush-3.png",
    caption: "Blitz your tactics.",
    alt: "TacticMax Puzzle Rush mode on Android"
  },
  {
    src: "assets/feature-daily-puzzles.png",
    caption: "New challenge every day.",
    alt: "TacticMax daily chess puzzle screen"
  },
  {
    src: "assets/feature-rated-mode-4.png",
    caption: "Climb the rating ladder.",
    alt: "TacticMax rated chess tactics mode"
  },
  {
    src: "assets/feature-custom-range-5.png",
    caption: "Train at your level.",
    alt: "TacticMax custom chess puzzle rating range controls"
  },
  {
    src: "assets/feature-analyse-6.png",
    caption: "Understand every move.",
    alt: "TacticMax analysis board for reviewing tactics"
  },
  {
    src: "assets/feature-stats-7.png",
    caption: "Track your growth.",
    alt: "TacticMax chess training progress statistics"
  },
  {
    src: "assets/feature-vision-trainer-tab-8.png",
    caption: "Sharpen your vision.",
    alt: "TacticMax vision trainer exercises"
  }
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
  heroImage.alt = slides[currentSlide].alt;
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
