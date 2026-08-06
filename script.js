const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");
const currentYear = document.getElementById("currentYear");
let lastScrollY = window.scrollY;

currentYear.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 90) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }
  lastScrollY = currentScrollY;
});

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const openModal = () => {
  privacyModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  privacyClose.focus();
};

const closeModal = () => {
  privacyModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  privacyOpen.focus();
};

privacyOpen.addEventListener("click", openModal);
privacyClose.addEventListener("click", closeModal);

privacyModal.addEventListener("click", (event) => {
  if (event.target === privacyModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !privacyModal.classList.contains("hidden")) {
    closeModal();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
