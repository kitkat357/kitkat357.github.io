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

const form = document.getElementById("contact-form");
if (form) {
  const status = document.getElementById("form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending…";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        status.textContent = "Thanks! Your message has been sent.";
        status.style.color = "green";
      } else {
        const err = await res.json().catch(() => ({}));
        status.textContent = err?.errors?.[0]?.message || "Oops—something went wrong. Please try again.";
        status.style.color = "crimson";
      }
    } catch (err) {
      status.textContent = "Network error—please try again.";
      status.style.color = "crimson";
    }
  });
}