const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const filtersPanel = document.querySelector(".filters-panel");
const filtersToggle = document.querySelector(".filters-toggle");
const yearTarget = document.querySelector("#current-year");
const revealElements = document.querySelectorAll(".reveal");
const filterChips = document.querySelectorAll(".filter-chip");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (filtersToggle && filtersPanel) {
  filtersToggle.addEventListener("click", () => {
    const isOpen = filtersPanel.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("filters-open", isOpen && window.innerWidth <= 640);
  });
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("is-selected");
  });
});

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 640) {
    document.body.classList.remove("filters-open");
  }
});
