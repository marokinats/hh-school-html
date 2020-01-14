import { hideBodyScroll, showBodyScroll } from './bodyScroll.js';
import { initFormFields } from './validation.js';

const popupOrder = document.querySelector('#popup-order'),
  popupPreOrder = document.querySelector('#popup-preorder'),
  popupOrderProductCard = document.querySelector('.popup-order__card'),
  popupPreOrderProductCard = document.querySelector('.popup-preorder__card');

export let productCard;

// init popup-preorder
let productCards = document.querySelectorAll('.product-card');
productCards = Array.from(productCards);

productCards.forEach(element => {

  element.addEventListener('click', function (e) {

    productCard = element;
    popupPreOrderProductCard.innerHTML = productCard.innerHTML;
    popupPreOrderProductCard.dataset.product = productCard.dataset.product;
    productCard.innerHTML = '';

    let active = false;

    Array.from(popupPreOrderProductCard.lastElementChild.previousElementSibling.children)
      .forEach(element => {
        if (element.firstElementChild.lastElementChild.classList.contains('active')) {
          active = true;
        }
      });

    if (popupPreOrderProductCard.lastElementChild.previousElementSibling.classList.contains('product-card__sizing-container') && !active) {
      popupPreOrderProductCard.lastElementChild.classList.add('disabled');
    }

    popupPreOrder.style.display = 'block';

    hideBodyScroll();
  })
})

// init popup-order
export let chosenSize;
popupPreOrder.addEventListener('click', function (e) {

  if (e.target.classList.contains('product-card__order-button') && !e.target.classList.contains('disabled')) {

    popupOrderProductCard.innerHTML = popupPreOrderProductCard.innerHTML;
    popupOrderProductCard.dataset.product = popupPreOrderProductCard.dataset.product;
    popupPreOrderProductCard.innerHTML = '';

    popupPreOrder.style.display = 'none';
    popupOrder.style.display = 'block';
  }
  else if (e.target.classList.contains('product-card__sizing-button')) {
    chosenSize = e.target;
    setSize(chosenSize);

    // const buttons = document.querySelectorAll('.product-card__sizing-button');

    // buttons.forEach(item => {
    //   item.classList.remove('active');
    //   item.previousElementSibling.removeAttribute('checked');
    // })

    // chosenSize.classList.add('active');
    // chosenSize.previousElementSibling.setAttribute('checked', 'checked');
    activateButtonPreOrder(popupPreOrderProductCard);
  }
  else {
    return;
  }
})

popupOrder.addEventListener('click', function (e) {

  if (!e.target.classList.contains('product-card__sizing-button')) return;

  chosenSize = e.target;
  setSize(chosenSize);

})

// close popup
document.addEventListener('click', (e) => {

  if (!e.target.classList.contains('popup__close')) return;

  closePopupOrder();

})

function setSize(element) {
  const buttons = document.querySelectorAll('.product-card__sizing-button');

  buttons.forEach(item => {
    item.classList.remove('active');
    item.previousElementSibling.removeAttribute('checked');
  })

  element.classList.add('active');
  element.previousElementSibling.setAttribute('checked', 'checked');
}

function activateButtonPreOrder(parentNode) {

  let sizingContainers = document.querySelectorAll('.product-card__sizing-container');
  sizingContainers = Array.from(sizingContainers);

  let currentSizingContainer;

  sizingContainers.forEach(element => {
    if (element.parentElement == parentNode) {

      currentSizingContainer = element;
    }
  });

  currentSizingContainer.nextElementSibling.classList.remove('disabled');
}

export function closePopupOrder() {
  popupPreOrder.style.display = 'none';
  popupOrder.style.display = 'none';

  initFormFields();

  showBodyScroll();

  productCard.innerHTML = popupPreOrderProductCard.innerHTML ? popupPreOrderProductCard.innerHTML : popupOrderProductCard.innerHTML;
  popupPreOrderProductCard.innerHTML = '';
  popupOrderProductCard.innerHTML = '';
}
