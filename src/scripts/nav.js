function throttle(func, duration) {
  let shouldWait = false;

  return function (...args) {
    if (!shouldWait) {
      func.apply(this, args);
      shouldWait = true;

      setTimeout(function () {
        shouldWait = false;
      }, duration);
    }
  };
}

const initCallback = () => {
  const nav = document.querySelector('.nav');
  let prevScrollY = 0;

  return throttle(function () {
    let scrollY = window.scrollY;

    if (nav.classList.contains('nav-hidden')) {
      if (prevScrollY > scrollY) {
        nav.classList.toggle('nav-hidden');
      }
    } else {
      if (prevScrollY < scrollY) {
        nav.classList.toggle('nav-hidden');
      }
    }
    prevScrollY = scrollY;
  }, 100);
};

document.addEventListener('scroll', initCallback());
