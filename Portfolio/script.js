// ---------- 1. Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close the menu after choosing a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ---------- 2. Highlight the current section in the navbar ----------
const sections = document.querySelectorAll("main section[id]");
const links = navLinks.querySelectorAll("a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((section) => observer.observe(section));

// ---------- 3. Expandable project cards ----------
document.querySelectorAll(".project").forEach((card) => {
  const head = card.querySelector(".project-head");
  const body = card.querySelector(".project-body");

  head.addEventListener("click", () => {
    const isOpen = card.classList.toggle("open");
    head.setAttribute("aria-expanded", isOpen);
    body.style.maxHeight = isOpen ? body.scrollHeight + 24 + "px" : "0";
  });
});

// ---------- 4. Typed C snippet in the hero ----------
const snippet = `#include <stdio.h>

int main(void) {
    char name[] = "Kanhaiya";
    char uni[]  = "GLA University";

    printf("%s, B.Tech CSE\\n", name);
    printf("Studying at %s\\n", uni);
    printf("Learning: C, HTML, CSS\\n");
    printf("Next: DSA + projects\\n");

    return 0;
}`;

const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typed.textContent = snippet;
} else {
  let i = 0;
  const type = () => {
    typed.textContent = snippet.slice(0, i++);
    if (i <= snippet.length) setTimeout(type, 28);
  };
  type();
}

// ---------- 5. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();