import changeTheme from "./utils/changeTheme.js";
import cloths from "./cloths.js";

document.addEventListener("DOMContentLoaded", cloths);

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

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-Up class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.querySelector("#theme-button");

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", changeTheme);
