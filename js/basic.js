const loader = document.querySelector(".loader");
var scrollVal = window.scrollY;
loader.style.top = `${scrollVal}px`;

setTimeout(() => {
  scrollVal = window.scrollY;
  loader.style.top = "-110rem";
  // loader.style.display = "none";
}, 2000);

setTimeout(() => {
  scrollVal = window.scrollY;
  loader.style.top = `${scrollVal}px`;
  // loader.style.display = "none";
}, 2);

// setTimeout(() => {
//   window.scrollTo({
//     top: scrollVal,
//     left: 0,
//     behavior: "smooth",
//   });
// }, 2100);
