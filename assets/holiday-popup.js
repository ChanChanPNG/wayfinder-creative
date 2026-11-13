(() => {
  const popup = document.querySelector('.holiday-popup');
  const launcher = document.querySelector('[data-holiday-open]');
  if (!popup || !launcher) return;
  let closeTimer;
  const open = () => {
    clearTimeout(closeTimer);
    popup.classList.remove('is-closing');
    if (!popup.open) popup.showModal();
  };
  const close = () => {
    if (!popup.open || popup.classList.contains('is-closing')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      popup.close();
      return;
    }
    popup.classList.add('is-closing');
    closeTimer = setTimeout(() => {
      popup.close();
      popup.classList.remove('is-closing');
    }, 220);
  };
  popup.addEventListener('cancel', event => {
    event.preventDefault();
    close();
  });
  launcher.addEventListener('click', open);
  popup.querySelector('.holiday-close').addEventListener('click', close);
  popup.addEventListener('click', event => {
    if (event.target !== popup) return;
    const box = popup.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
  });
  open();
})();
