/*==================== MENU SHOW AND HIDDEN ====================*/
const navMenu = document.querySelector("#nav-menu"),
  navOpen = document.querySelector("#nav-open"),
  navClose = document.querySelector("#nav-close"),
  navLink = document.querySelectorAll(".nav__link");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navOpen) {
  navOpen.addEventListener("click", () => {
    navMenu.style.display = "flex";
    navMenu.style.bottom = "0";

    if (navLink) {
      navLink.forEach((link) => {
        link.addEventListener("click", () => {
          if (navMenu.style.bottom !== "-120%") {
            navMenu.style.bottom = "-120%";
          }
        });
        link.classList.remove("hide__link");
      });
    }
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.style.bottom = "-120%";
  });
}

/*==================== SEARCH SHOW AND HIDDEN ====================*/
const searchButton = document.querySelector("#search-button"),
  navLogo = document.querySelector(".nav__logo"),
  searchContainer = document.querySelector(".search__container");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    navLink.forEach((link) => {
      link.classList.toggle("hide__link");
    });

    searchContainer.classList.toggle("active");

    if (window.innerWidth <= 768) {
      navLogo.classList.toggle("hide__logo");
    }
  });
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun");

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
