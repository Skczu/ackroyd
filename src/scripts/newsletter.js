const validateInput = (input, re, button) => {
  const value = input.value;

  if (re.test(value)) {
    button.removeAttribute('disabled');
    return;
  }

  !button.hasAttribute('disabled') && button.setAttribute('disabled', '');
};

const submitEmail = (input, button, toast) => {
  try {
    // try sending data to server

    toast.textContent = 'Thank you for subscribing!';
    toast.classList.remove('toast-error');
    toast.classList.add('toast-success');
  } catch (e) {
    toast.textContent = 'Oops! Something went wrong.';
    toast.classList.remove('toast-success');
    toast.classList.add('toast-error');
  }

  input.value = '';
  button.setAttribute('disabled', '');
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 5000);

  // since we dont POST to a server, there is no check and appropriate toast if you already subscribed before
};

const initNewsletterListeners = () => {
  const input = document.querySelector('.newsletter-input');
  const button = document.querySelector('.newsletter-button');
  const toast = document.querySelector('.newsletter-toast');
  const emailRe =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  window.addEventListener('load', () => {
    input.value = '';
    button.setAttribute('disabled', '');
  });

  input.addEventListener('input', () => {
    validateInput(input, emailRe, button);
  });

  button.addEventListener('click', () => {
    submitEmail(input, button, toast);
  });
};

initNewsletterListeners();
