export function initFormFields() {

  let inputs = document.getElementsByTagName('input'),
    textareas = document.getElementsByTagName('textarea');

  inputs = Array.from(inputs);
  textareas = Array.from(textareas);

  inputs.forEach(element => {
    element.classList.remove('init');
    element.classList.add('init');
    
    if (element.previousElementSibling != null && element.previousElementSibling.classList.contains('form__note')) {
      element.parentNode.firstElementChild.remove();
    }
  });

  textareas.forEach(element => {
    element.classList.remove('init');
    element.classList.add('init');
  });
}

initFormFields();

document.addEventListener('focusin', (e) => {

  if (e.target.classList.contains('init')) {
    e.target.classList.remove('init');
  }
})


const regexpName = /^[А-Яа-яЁёA-Za-z]{1}[А-Яа-яЁёA-Za-z-]*[\s][А-Яа-яЁёA-Za-z]{1}[А-Яа-яЁёA-Za-z-]*([А-Яа-яЁёA-Za-z-\s])*$/,
  regexpEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
  regexpCode = /^[+]{1}\d{1,5}$/,
  regexpNumber = /^[\d]{3,7}$/;

function validateFormFields(field) {
  if (field.getAttribute('name') === 'name') {

    return [regexpName.test(field.value), 'Введите данные в формате Фамилия Имя Отчество'];
  }
  else if (field.getAttribute('name') === 'email') {

    return [regexpEmail.test(field.value), 'Введите эл.почту в формате email@domen'];
  }
  else if (field.getAttribute('name') === 'phone-pre') {

    return [regexpCode.test(field.value), 'Введите код страны в формате +7, не более 5 цифр'];
  }
  else if (field.getAttribute('name') === 'phone-code' || field.getAttribute('name') === 'phone-number') {

    return [regexpNumber.test(field.value), 'Введите от 3 до 7 цифр'];
  }
}

let onFocus,
  offFocus;

document.addEventListener("focusin", function (e) {
  let matchArr = validateFormFields(e.target);

  if (matchArr === undefined) return;

  onFocus = e.target;

});

document.addEventListener("focusout", function (e) {
  let matchArr;
  let flag = true;

  offFocus = e.target;

  if (offFocus != undefined || offFocus != null) {
    matchArr = validateFormFields(offFocus);
  }

  if (matchArr === undefined) return;

  if (!matchArr[0]) {
    let note = document.createElement('span');

    note.classList.add('form__note');
    note.innerHTML = matchArr[1];

    if (!offFocus.parentNode.classList.contains('form__item')) {
      for (let i = 0; i < offFocus.closest('.form__item').children.length; i++) {
        if (offFocus.closest('.form__item').children[i].firstElementChild.classList.contains('form__note')) {
          flag = false;
        }
      }
    }

    if (flag) {
      offFocus.parentNode.insertBefore(note, offFocus);
      offFocus.classList.add('error');
    }
  }
  else {
    if (offFocus.previousElementSibling && offFocus.previousElementSibling.classList.contains('form__note')) {
      offFocus.previousElementSibling.remove();
    }
  }
});

document.addEventListener("input", function (e) {
  let matchArr = validateFormFields(e.target);

  if (matchArr === undefined) return;

  onFocus = e.target;

  if (onFocus.previousElementSibling && onFocus.previousElementSibling.classList.contains('form__note')) {
    onFocus.previousElementSibling.remove();
    onFocus.classList.remove('error');
  }
});


document.addEventListener('click', function (e) {

  if (e.target.id != 'delivery-01' && e.target.id != 'delivery-02') return;

  let button = e.target,
    addressBlock = button.closest('.form__block').nextElementSibling;

  if (button.id === 'delivery-01') {
    addressBlock.classList.add('visuallyhidden');

    addressBlock.addEventListener('transitionend', function (e) {

      if (e.target != addressBlock) return;

      addressBlock.classList.add('hidden');
    });
    for (let i = 0; i < addressBlock.children.length; i++) {

      if (addressBlock.children[i].classList.contains('form__item')) {
        addressBlock.children[i].firstElementChild.removeAttribute('required');
      }
    }
  }
  else {
    addressBlock.classList.remove('hidden');

    setTimeout(() => {
      addressBlock.classList.remove('visuallyhidden');
    }, 100);

    for (let i = 0; i < addressBlock.children.length; i++) {

      if (addressBlock.children[i].classList.contains('form__item')) {
        addressBlock.children[i].firstElementChild.setAttribute('required', 'required');
      }
    }
  }
})