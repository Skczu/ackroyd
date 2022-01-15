const shouldToggle = (isHidden, prevScrollY, scrollY) =>
  scrollY < prevScrollY ? isHidden : !isHidden;

const toggleNav = () => {
  let scrollY = window.scrollY;

  if (shouldToggle(isHidden, prevScrollY, scrollY)) {
    nav.classList.toggle('nav-hidden');
    isHidden = !isHidden;
  }
  prevScrollY = scrollY;
};

const nav = document.querySelector('.nav');
let isHidden = false,
  prevScrollY = 0;
document.addEventListener('scroll', toggleNav);
