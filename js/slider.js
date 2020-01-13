let active = document.querySelector('.js-slide.carousel-card_active');

document.querySelector('.js-slide-buttons').addEventListener('click', (e) => {
  const slideId = e.target.dataset.slideId;

  if (!slideId) {
    return;
  }

  if (active.dataset.slideId === slideId) {
    return;
  }

  const slide = document.querySelector(`.js-slide[data-slide-id="${slideId}"]`);

  slide.classList.add('carousel-card_show');
  active.classList.add('carousel-card_hide');
  active.classList.remove('carousel-card_active');

  const previous = active;

  active = slide;

  document
    .querySelector(`.js-slide-button[data-slide-id="${previous.dataset.slideId}"]`)
    .classList.remove('carousel-dots__item_active');
  document
    .querySelector(`.js-slide-button[data-slide-id="${slideId}"]`)
    .classList.add('carousel-dots__item_active');

  active.addEventListener('animationend', () => {
    active.classList.add('carousel-card_active');
    active.classList.remove('carousel-card_show');
    previous.classList.remove('carousel-card_hide');
    active.parentNode.insertBefore(active, previous); // чтобы слайды не уходили постоянно влево, для transition
  },
  {once: true}
  );

});