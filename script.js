// script.js — dipisahkan dari index.html

// 1. Navbar Toggle (Mobile)
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

// 2. Scroll Active Links & Sticky Navbar
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky Navbar
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Close Navbar when click (Mobile)
  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

// 3. Animation on Scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-animate");
    } else {
      // Optional: remove class to repeat animation when scrolling up
      // entry.target.classList.remove('show-animate');
    }
  });
});

const hiddenElements = document.querySelectorAll(".animate-scroll");
hiddenElements.forEach((el) => observer.observe(el));

// 4. Typing Text Effect
const textElement = document.getElementById("typing-text");
const texts = ["Frontend Developer", "UI/UX Designer", "Freelancer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 2000); // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 100 : 200);
  }
}

// Start typing
document.addEventListener("DOMContentLoaded", type);
