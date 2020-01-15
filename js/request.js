export function getData(url) {

  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.send();

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject(error);
    };
  })
}