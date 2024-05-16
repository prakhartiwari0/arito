let topbtn = document.getElementsByClassName("back-to-top")[0];

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        topbtn.classList.add("active");
    } else {
        topbtn.classList.remove("active");
    }
});

topbtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
