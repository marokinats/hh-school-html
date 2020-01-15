import { getData } from './request.js';
import config from './config.js';

let suggestionsWrappers = document.querySelectorAll('.js-input-suggests-areas'),
  suggestionsWrapper,
  subString,
  suggestions,
  inputAreas;

document.addEventListener('input', (e) => {

  if (e.target.getAttribute('name') != 'city') return;

  inputAreas = e.target;
  suggestionsWrapper = inputAreas.parentNode.nextElementSibling.firstElementChild;

  let inputValue = inputAreas.value;

  if (inputValue.match(/[a-zA-Zа-яА-Я]/g)) {
    subString = inputValue;
  }

  if (subString.length > 1) {
    let url = config.areasUrl.replace('{}', subString);
    getData(url).then((response) => {
      try {
        let cities = JSON.parse(response);

        if (!cities['items']) {
          throw new SyntaxError("response содержит ошибку, отсутствует ключ item");
        }

        suggestions = cities['items'];

        showSuggestions(suggestions);
      }
      catch (e) {
        if (e.name == "SyntaxError") {
          console.log(e.message);
        } else {
          throw e;
        }
        
      }

    }).catch(error => console.log(error));
  }
  else {
    suggestionsWrapper.style.display = 'none';
  }
})

Array.from(suggestionsWrappers).forEach(element => {

  element.addEventListener('click', (e) => {

    let city = e.target.innerHTML;

    inputAreas.value = city;
    element.style.display = 'none';
  })
});


function showSuggestions(suggestions) {
  suggestionsWrapper.innerHTML = '';
  suggestionsWrapper.style.display = 'block';

  suggestions.forEach(element => {
    let item = document.createElement('div');

    item.classList.add('input-suggests__item');
    item.innerHTML = element['text'];
    suggestionsWrapper.appendChild(item);
  });
}