import {closePopupOrder, chosenSize, productCard} from './order.js';
import {initFormFields} from './validation.js';

const orderForm = document.querySelector('.popup-order__form');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let phone = '';

  Array.from(e.target.elements).forEach(element => {
    if (element.getAttribute('type') === 'checkbox' && element.checked) {
      console.log(element.getAttribute('name'),':', element.value);
    }
    else if(element.getAttribute('type') === 'radio' && element.checked) {
      console.log(element.getAttribute('name'),':', element.value);
    }
    else if(element.getAttribute('name') === 'phone-pre' || element.getAttribute('name') === 'phone-code' || element.getAttribute('name') === 'phone-number') {
      phone += element.value;
    }
    else if(element.getAttribute('type') === 'text') {
      console.log(element.getAttribute('name'),':', element.value);
    }
    else if(element.getAttribute('name') === 'address') {
      console.log(element.getAttribute('name'),':', element.value);
    }
    
  })
  console.log('phone :', phone);
  console.log('product :', productCard.dataset.product);
  console.log('chosen size :', chosenSize.innerText);
  console.log('orderForm submited');

  closePopupOrder();
  
  initFormFields();
})