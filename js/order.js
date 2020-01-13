import {hideBodyScroll, showBodyScroll} from './bodyScroll.js';

const popupOrder = document.querySelector('#popup-order'),
  popupProductCard = document.querySelector('.popup-order__card'),
  closeBtn = document.querySelector('#popup-close');

let productCard;

document.addEventListener('click', function (e) {

  if (!e.target.classList.contains('product-card__order-button')) return;

  const button = e.target;

  productCard = button.parentNode.parentNode;

  const cardContent = productCard.innerHTML;

  popupProductCard.innerHTML = cardContent;
  productCard.innerHTML = '';

  popupOrder.style.display = 'block';

  hideBodyScroll();
})


closeBtn.addEventListener('click', () => {

  closePopupOrder();

})


// Sizing
document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('product-card__sizing-button')) return;

  const button = e.target;
  const buttons = document.querySelectorAll('.product-card__sizing-button');
  buttons.forEach((item) => {
    item.classList.remove('active');
    item.previousSibling.removeAttribute('checked');
  })

  button.classList.add('active');
  button.previousSibling.setAttribute('checked', 'checked');
})

export function closePopupOrder() {
  popupOrder.style.display = 'none';

  showBodyScroll();

  productCard.innerHTML = popupProductCard.innerHTML;
  popupProductCard.innerHTML = '';
}
