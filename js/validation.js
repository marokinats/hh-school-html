export function initFormFields() {

  let inputs = document.getElementsByTagName('input'),
    textareas = document.getElementsByTagName('textarea');

  inputs = Array.from(inputs);
  textareas = Array.from(textareas);

  inputs.forEach(element => {
    element.classList.remove('init');
    element.classList.add('init');
  });

  textareas.forEach(element => {
    element.classList.remove('init');
    element.classList.add('init');
  });

  // inputs.forEach(element => {
  //   if (element.classList.contains('init')) {
  //     element.classList.remove('init');
  //   }
  //   else {
  //     element.classList.add('init');
  //   }

  // });

  // textareas.forEach(element => {
  //   if (element.classList.contains('init')) {
  //     element.classList.remove('init');
  //   }
  //   else {
  //     element.classList.add('init');
  //   }
  // });
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

    return [regexpCode.test(field.value), 'Введите код страны в формате +7'];
  }
  else if (field.getAttribute('name') === 'phone-code') {

    return [regexpNumber.test(field.value), 'Код должен содержать только цифры'];
  }
  else if (field.getAttribute('name') === 'phone-number') {

    return [regexpNumber.test(field.value), 'Номер телефона должен содержать только цифры'];
  }

}

document.addEventListener("input", function (e) {
  let matchArr = validateFormFields(e.target);
  if (matchArr === undefined) return;

  if (!matchArr[0]) {
    e.target.setCustomValidity(matchArr[1]);
  }
  else {
    e.target.setCustomValidity('');
  }
});
