// Scroll to the top when the button is clicked
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if(window.pageYOffset >100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})