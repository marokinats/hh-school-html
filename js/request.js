export function getData(url) {

  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.send();

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        let error = new Error(xhr.statusText);
        error.code = xhr.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      let error = new Error("Network Error");
        
      reject(error);
    };
  }).catch(error => handleError(error));
}

export function handleError(error) {
  console.log('handleError:', error);
}