const burger = document.querySelector(".arvb-nav__menu-btn");
const sideBar = document.querySelector(".arvb-nav__sidebar");

burger.addEventListener("click", faireQC);

function faireQC(e) {
  console.log(e.currentTarget.children[0]);
  if (e.currentTarget.children[0].classList != "bi bi-x-lg")
    e.currentTarget.children[0].classList = "bi bi-x-lg";
  else e.currentTarget.children[0].classList = "bi bi-list";
  sideBar.classList.toggle("open");
}
