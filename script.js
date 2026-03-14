const headshot = document.getElementById("headshot");
const photoFrame = headshot?.closest(".photo-frame");
const lastUpdated = document.getElementById("last-updated");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const revealTargets = document.querySelectorAll(".section-panel");

if (headshot && photoFrame) {
  headshot.addEventListener("load", () => {
    photoFrame.classList.remove("is-placeholder");
  });

  headshot.addEventListener("error", () => {
    photoFrame.classList.add("is-placeholder");
  });
}

if (lastUpdated) {
  lastUpdated.textContent = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(document.lastModified));
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.12,
  }
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  sectionObserver.observe(target);
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const matchingLink = navLinks.find(
        (link) => link.getAttribute("href") === `#${id}`
      );

      if (!matchingLink) {
        return;
      }

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("is-active"));
        matchingLink.classList.add("is-active");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  activeObserver.observe(section);
});
