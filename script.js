// script.js — dipisahkan dari index.html

// 1. Navbar Toggle (Mobile)
// Mengambil elemen icon menu dan navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

// Fungsi ketika icon menu diklik
menuIcon.onclick = () => {
  // Mengubah icon menjadi tanda silang (X)
  menuIcon.classList.toggle("fa-xmark");
  // Menampilkan atau menyembunyikan navbar
  navbar.classList.toggle("active");
};

// 2. Scroll Active Links & Sticky Navbar
// Mengambil semua section dan link navigasi
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150; // Offset agar highlight aktif sebelum mencapai garis atas
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    // Logika untuk menentukan section mana yang sedang aktif di viewport
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
  // Menambahkan class 'sticky' ke header jika scroll lebih dari 100px
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Close Navbar when click (Mobile)
  // Menutup menu mobile secara otomatis ketika user scroll
  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

// 3. Animation on Scroll (Intersection Observer)
// Observer untuk mendeteksi elemen yang masuk ke viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Tambahkan class animasi jika elemen terlihat
      entry.target.classList.add("show-animate");
    } else {
      // Optional: remove class to repeat animation when scrolling up
      // entry.target.classList.remove('show-animate');
    }
  });
});

// Mengambil semua elemen yang ingin dianimasikan saat scroll
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

  // Logika mengetik atau menghapus karakter
  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  // Mengatur kecepatan dan pergantian kata
  if (!isDeleting && charIndex === currentText.length) {
    // Selesai mengetik satu kata, tunggu sebentar lalu hapus
    isDeleting = true;
    setTimeout(type, 2000); // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    // Selesai menghapus, pindah ke kata berikutnya
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  } else {
    // Kecepatan mengetik vs menghapus
    setTimeout(type, isDeleting ? 100 : 200);
  }
}

// Start typing saat halaman dimuat
document.addEventListener("DOMContentLoaded", type);
