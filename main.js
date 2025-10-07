const candidates = document.querySelectorAll(
  ".section, .entry, .about, .about-image img, .about-text p, .project-details, .page-title"
);
candidates.forEach(el => el.classList.add("reveal"));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Unobserve once revealed for performance
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

candidates.forEach(el => io.observe(el));
