function getData(url) {

  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.send();

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject([]);
    };
  })
}

const suggestionsWrapper = document.querySelector('#input-suggests-areas'),
  inputAreas = document.querySelector('#areas');

let subString,
  suggestions;

inputAreas.addEventListener('input', (e) => {

  let inputValue = e.target.value;

  if (inputValue.match(/[a-zA-Zа-яА-Я]/g)) {
    subString = inputValue;
  }

  let url = 'https://api.hh.ru/suggests/area_leaves?text=';
  let urlLength = url.length;

  if ((url + subString).length >= (urlLength + 2)) {
    url += subString;

    getData(url).then((response) => {

      let cities = JSON.parse(response);
  
      suggestions = cities['items'];
  
      showSuggestions(suggestions);
  
    })
  }
  else {
    suggestionsWrapper.style.display = 'none';
  }
})

suggestionsWrapper.addEventListener('click', (e) => {
  let city = e.target.innerHTML;

  inputAreas.value = city;
  suggestionsWrapper.style.display = 'none';
})

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