// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/grid.js":[function(require,module,exports) {
var grid = document.createElement('div');
grid.className = 'grid';
document.body.appendChild(grid);
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.code === 'KeyG') {
    grid.classList.toggle('grid_visible');
  }
});
},{}],"js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  areasUrl: 'https://api.hh.ru/suggests/area_leaves?text={}'
};
exports.default = _default;
},{}],"js/slider.js":[function(require,module,exports) {
var active = document.querySelector('.js-slide.carousel-card_active');
document.querySelector('.js-slide-buttons').addEventListener('click', function (e) {
  var slideId = e.target.dataset.slideId;

  if (!slideId) {
    return;
  }

  if (active.dataset.slideId === slideId) {
    return;
  }

  var slide = document.querySelector(".js-slide[data-slide-id=\"".concat(slideId, "\"]"));
  slide.classList.add('carousel-card_show');
  active.classList.add('carousel-card_hide');
  active.classList.remove('carousel-card_active');
  var previous = active;
  active = slide;
  document.querySelector(".js-slide-button[data-slide-id=\"".concat(previous.dataset.slideId, "\"]")).classList.remove('carousel-dots__item_active');
  document.querySelector(".js-slide-button[data-slide-id=\"".concat(slideId, "\"]")).classList.add('carousel-dots__item_active');
  active.addEventListener('animationend', function () {
    active.classList.add('carousel-card_active');
    active.classList.remove('carousel-card_show');
    previous.classList.remove('carousel-card_hide');
    active.parentNode.insertBefore(active, previous); // чтобы слайды не уходили постоянно влево, для transition
  }, {
    once: true
  });
});
},{}],"js/bodyScroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideBodyScroll = hideBodyScroll;
exports.showBodyScroll = showBodyScroll;
var windowScrollTop;

function hideBodyScroll() {
  document.body.classList.add('no-scroll');
  windowScrollTop = window.pageYOffset; // текущая прокрутка сверху

  document.body.style.position = 'fixed';

  if (hasScrollbar()) {
    // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
    document.body.style.width = "calc(100% - ".concat(getScrollbarSize(), "px)");
  } else {
    document.body.style.width = '100%';
  }

  document.body.style.top = -windowScrollTop + 'px';
}

function getScrollbarSize() {
  // получение ширины скролла
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);
  var widthNoScroll = outer.offsetWidth; // force scrollbars

  outer.style.overflow = 'scroll';
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  var widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return widthNoScroll - widthWithScroll;
}

function hasScrollbar() {
  // проверка на боковой скролл
  return document.body.scrollHeight > document.body.clientHeight;
}

function showBodyScroll() {
  document.body.classList.remove('no-scroll');
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  window.scroll(0, windowScrollTop);
}
},{}],"js/request.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = getData;

function getData(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(error);
    };
  });
}
},{}],"js/validation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFormFields = initFormFields;

function initFormFields() {
  var inputs = document.getElementsByTagName('input'),
      textareas = document.getElementsByTagName('textarea');
  inputs = Array.from(inputs);
  textareas = Array.from(textareas);
  inputs.forEach(function (element) {
    element.classList.remove('init');
    element.classList.add('init');

    if (element.previousElementSibling != null && element.previousElementSibling.classList.contains('form__note')) {
      element.parentNode.firstElementChild.remove();
    }
  });
  textareas.forEach(function (element) {
    element.classList.remove('init');
    element.classList.add('init');
  });
}

initFormFields();
document.addEventListener('focusin', function (e) {
  if (e.target.classList.contains('init')) {
    e.target.classList.remove('init');
  }
});
var regexpName = /^[А-Яа-яЁёA-Za-z]{1}[А-Яа-яЁёA-Za-z-]*[\s][А-Яа-яЁёA-Za-z]{1}[А-Яа-яЁёA-Za-z-]*([А-Яа-яЁёA-Za-z-\s])*$/,
    regexpEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    regexpCode = /^[+]{1}\d{1,5}$/,
    regexpNumber = /^[\d]{3,7}$/;

function validateFormFields(field) {
  if (field.getAttribute('name') === 'name') {
    return [regexpName.test(field.value), 'Введите данные в формате Фамилия Имя Отчество'];
  } else if (field.getAttribute('name') === 'email') {
    return [regexpEmail.test(field.value), 'Введите эл.почту в формате email@domen'];
  } else if (field.getAttribute('name') === 'phone-pre') {
    return [regexpCode.test(field.value), 'Введите код страны в формате +7, не более 5 цифр'];
  } else if (field.getAttribute('name') === 'phone-code' || field.getAttribute('name') === 'phone-number') {
    return [regexpNumber.test(field.value), 'Введите от 3 до 7 цифр'];
  }
}

var onFocus, offFocus;
document.addEventListener("focusin", function (e) {
  var matchArr = validateFormFields(e.target);
  if (matchArr === undefined) return;
  onFocus = e.target;
});
document.addEventListener("focusout", function (e) {
  var matchArr;
  var flag = true;
  offFocus = e.target;

  if (offFocus != undefined || offFocus != null) {
    matchArr = validateFormFields(offFocus);
  }

  if (matchArr === undefined) return;

  if (!matchArr[0]) {
    var note = document.createElement('span');
    note.classList.add('form__note');
    note.innerHTML = matchArr[1];

    if (!offFocus.parentNode.classList.contains('form__item')) {
      for (var i = 0; i < offFocus.closest('.form__item').children.length; i++) {
        if (offFocus.closest('.form__item').children[i].firstElementChild.classList.contains('form__note')) {
          flag = false;
        }
      }
    }

    if (flag) {
      offFocus.parentNode.insertBefore(note, offFocus);
      offFocus.classList.add('error');
    }
  } else {
    if (offFocus.previousElementSibling && offFocus.previousElementSibling.classList.contains('form__note')) {
      offFocus.previousElementSibling.remove();
    }
  }
});
document.addEventListener("input", function (e) {
  var matchArr = validateFormFields(e.target);
  if (matchArr === undefined) return;
  onFocus = e.target;

  if (onFocus.previousElementSibling && onFocus.previousElementSibling.classList.contains('form__note')) {
    onFocus.previousElementSibling.remove();
    onFocus.classList.remove('error');
  }
});
document.addEventListener('click', function (e) {
  if (e.target.id != 'delivery-01' && e.target.id != 'delivery-02') return;
  var button = e.target,
      addressBlock = button.closest('.form__block').nextElementSibling;

  if (button.id === 'delivery-01') {
    addressBlock.classList.add('visuallyhidden');
    addressBlock.addEventListener('transitionend', function (e) {
      if (e.target != addressBlock) return;
      addressBlock.classList.add('hidden');
    });

    for (var i = 0; i < addressBlock.children.length; i++) {
      if (addressBlock.children[i].classList.contains('form__item')) {
        addressBlock.children[i].firstElementChild.removeAttribute('required');
      }
    }
  } else {
    addressBlock.classList.remove('hidden');
    setTimeout(function () {
      addressBlock.classList.remove('visuallyhidden');
    }, 100);

    for (var _i = 0; _i < addressBlock.children.length; _i++) {
      if (addressBlock.children[_i].classList.contains('form__item')) {
        addressBlock.children[_i].firstElementChild.setAttribute('required', 'required');
      }
    }
  }
});
},{}],"js/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closePopupOrder = closePopupOrder;
exports.chosenSize = exports.productCard = void 0;

var _bodyScroll = require("./bodyScroll.js");

var _validation = require("./validation.js");

var popupOrder = document.querySelector('.js-popup-order'),
    popupPreOrder = document.querySelector('.js-popup-preorder'),
    popupOrderProductCard = document.querySelector('.js-popup-order__card'),
    popupPreOrderProductCard = document.querySelector('.js-popup-preorder__card');
var productCard; // init popup-preorder

exports.productCard = productCard;
var productCards = document.querySelectorAll('.js-product-card');
productCards = Array.from(productCards);
productCards.forEach(function (element) {
  element.addEventListener('click', function (e) {
    exports.productCard = productCard = element;
    popupPreOrderProductCard.innerHTML = productCard.innerHTML;
    popupPreOrderProductCard.dataset.product = productCard.dataset.product;
    productCard.innerHTML = '';
    var active = false;
    Array.from(popupPreOrderProductCard.lastElementChild.previousElementSibling.children).forEach(function (element) {
      if (element.firstElementChild.lastElementChild.classList.contains('active')) {
        active = true;
      }
    });

    if (popupPreOrderProductCard.lastElementChild.previousElementSibling.classList.contains('product-card__sizing-container') && !active) {
      popupPreOrderProductCard.lastElementChild.classList.add('disabled');
    }

    popupPreOrder.style.display = 'block';
    (0, _bodyScroll.hideBodyScroll)();
  });
}); // init popup-order

var chosenSize;
exports.chosenSize = chosenSize;
popupPreOrder.addEventListener('click', function (e) {
  if (e.target.classList.contains('product-card__order-button') && !e.target.classList.contains('disabled')) {
    popupOrderProductCard.innerHTML = popupPreOrderProductCard.innerHTML;
    popupOrderProductCard.dataset.product = popupPreOrderProductCard.dataset.product;
    popupPreOrderProductCard.innerHTML = '';
    popupPreOrder.style.display = 'none';
    popupOrder.style.display = 'block';
  } else if (e.target.classList.contains('product-card__sizing-button')) {
    exports.chosenSize = chosenSize = e.target;
    setSize(chosenSize);
    activateButtonPreOrder(popupPreOrderProductCard);
  } else if (e.target === popupPreOrder) {
    closePopupOrder();
  } else {
    return;
  }
});
popupOrder.addEventListener('click', function (e) {
  if (!e.target.classList.contains('product-card__sizing-button')) return;
  exports.chosenSize = chosenSize = e.target;
  setSize(chosenSize);
}); // close popup

document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('popup__close')) return;
  closePopupOrder();
});

function setSize(element) {
  var buttons = document.querySelectorAll('.js-sizing-button');
  buttons.forEach(function (item) {
    item.classList.remove('active');
    item.previousElementSibling.removeAttribute('checked');
  });
  element.classList.add('active');
  element.previousElementSibling.setAttribute('checked', 'checked');
}

function activateButtonPreOrder(parentNode) {
  var sizingContainers = document.querySelectorAll('.js-sizing-container');
  sizingContainers = Array.from(sizingContainers);
  var currentSizingContainer;
  sizingContainers.forEach(function (element) {
    if (element.parentElement == parentNode) {
      currentSizingContainer = element;
    }
  });
  currentSizingContainer.nextElementSibling.classList.remove('disabled');
}

function closePopupOrder() {
  popupPreOrder.style.display = 'none';
  popupOrder.style.display = 'none';
  (0, _validation.initFormFields)();
  (0, _bodyScroll.showBodyScroll)();
  productCard.innerHTML = popupPreOrderProductCard.innerHTML ? popupPreOrderProductCard.innerHTML : popupOrderProductCard.innerHTML;
  popupPreOrderProductCard.innerHTML = '';
  popupOrderProductCard.innerHTML = '';
}
},{"./bodyScroll.js":"js/bodyScroll.js","./validation.js":"js/validation.js"}],"js/areas.js":[function(require,module,exports) {
"use strict";

var _request = require("./request.js");

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var suggestionsWrappers = document.querySelectorAll('.js-input-suggests-areas'),
    suggestionsWrapper,
    subString,
    suggestions,
    inputAreas;
document.addEventListener('input', function (e) {
  if (e.target.getAttribute('name') != 'city') return;
  inputAreas = e.target;
  suggestionsWrapper = inputAreas.parentNode.nextElementSibling.firstElementChild;
  var inputValue = inputAreas.value;

  if (inputValue.match(/[a-zA-Zа-яА-Я]/g)) {
    subString = inputValue;
  }

  if (subString.length > 1) {
    var url = _config.default.areasUrl.replace('{}', subString);

    (0, _request.getData)(url).then(function (response) {
      try {
        var cities = JSON.parse(response);

        if (!cities['items']) {
          throw new SyntaxError("response содержит ошибку, отсутствует ключ item");
        }

        suggestions = cities['items'];
        showSuggestions(suggestions);
      } catch (e) {
        if (e.name == "SyntaxError") {
          console.log(e.message);
        } else {
          throw e;
        }
      }
    }).catch(function (error) {
      return console.log(error);
    });
  } else {
    suggestionsWrapper.style.display = 'none';
  }
});
Array.from(suggestionsWrappers).forEach(function (element) {
  element.addEventListener('click', function (e) {
    var city = e.target.innerHTML;
    inputAreas.value = city;
    element.style.display = 'none';
  });
});

function showSuggestions(suggestions) {
  suggestionsWrapper.innerHTML = '';
  suggestionsWrapper.style.display = 'block';
  suggestions.forEach(function (element) {
    var item = document.createElement('div');
    item.classList.add('input-suggests__item');
    item.innerHTML = element['text'];
    suggestionsWrapper.appendChild(item);
  });
}
},{"./request.js":"js/request.js","./config.js":"js/config.js"}],"js/formSubmit.js":[function(require,module,exports) {
"use strict";

var _order = require("./order.js");

var _validation = require("./validation.js");

var orderForm = document.querySelector('.js-order-form');
orderForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var phone = '';
  Array.from(e.target.elements).forEach(function (element) {
    if (element.getAttribute('type') === 'checkbox' && element.checked) {
      console.log(element.getAttribute('name'), ':', element.value);
    } else if (element.getAttribute('type') === 'radio' && element.checked) {
      console.log(element.getAttribute('name'), ':', element.value);
    } else if (element.getAttribute('name') === 'phone-pre' || element.getAttribute('name') === 'phone-code' || element.getAttribute('name') === 'phone-number') {
      phone += element.value;
    } else if (element.getAttribute('type') === 'text' && element.value.length > 0) {
      console.log(element.getAttribute('name'), ':', element.value);
    } else if (element.getAttribute('name') === 'address' && element.value.length > 0) {
      console.log(element.getAttribute('name'), ':', element.value);
    }
  });
  console.log('phone :', phone);
  console.log('product :', _order.productCard.dataset.product);

  if (_order.chosenSize) {
    console.log('chosen size :', _order.chosenSize.innerText);
  }

  console.log('orderForm submited');
  (0, _order.closePopupOrder)();
  (0, _validation.initFormFields)();
});
},{"./order.js":"js/order.js","./validation.js":"js/validation.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("./grid");

require("./config");

require("./slider");

require("./bodyScroll");

require("./request");

require("./validation");

require("./order");

require("./areas");

require("./formSubmit");
},{"./grid":"js/grid.js","./config":"js/config.js","./slider":"js/slider.js","./bodyScroll":"js/bodyScroll.js","./request":"js/request.js","./validation":"js/validation.js","./order":"js/order.js","./areas":"js/areas.js","./formSubmit":"js/formSubmit.js"}],"../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51325" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map