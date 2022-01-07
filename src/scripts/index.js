import * as R from 'ramda';

// Pure
const getScrollPos = () => window.pageYOffset;
const shouldToggle = (isHidden, prevPos, currPos) =>
  prevPos > currPos ? isHidden : !isHidden;

// Impure
const toggleClass = R.curry((sel, className) =>
  document.querySelector(sel).classList.toggle(className)
);

const addNavScrollListener = () => {
  let prevPos, isHidden;
  document.addEventListener('scroll', () => {
    let currPos = getScrollPos();
    shouldToggle(isHidden, prevPos, currPos) &&
      (isHidden = toggleClass('.nav', 'nav-hidden'));
    prevPos = currPos;
  });
};

// Setting the nav listener
addNavScrollListener();
