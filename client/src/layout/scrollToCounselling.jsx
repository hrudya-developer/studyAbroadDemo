export const ScrollToCounselling = () => {
  const section = document.getElementById("gfc_wrapper");

  if (!section) return;

  const navbarHeight = 80; // Adjust if your navbar height changes
  const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - navbarHeight,
    behavior: "smooth",
  });
};