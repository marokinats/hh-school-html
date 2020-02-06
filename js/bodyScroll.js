let windowScrollTop;

export function hideBodyScroll() {

  document.body.classList.add('no-scroll');

  windowScrollTop = window.pageYOffset; // текущая прокрутка сверху
  document.body.style.position = 'fixed';

  if (hasScrollbar()) {
    // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
    document.body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
  } else {
    document.body.style.width = '100%';
  }
  document.body.style.top = -windowScrollTop + 'px';
}

function getScrollbarSize() { // получение ширины скролла
  let outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);

  let widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  let inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;

  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

function hasScrollbar() { // проверка на боковой скролл
  return document.body.scrollHeight > document.body.clientHeight;
}

export function showBodyScroll() {
  document.body.classList.remove('no-scroll');

  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  window.scroll(0, windowScrollTop);
}
