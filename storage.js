'use strict';
// localStorage.clear();
console.log(localStorage);

// localStorage.clear();

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key, defaultVal) {
  console.log(key);
  console.log(localStorage.getItem(key));
  return localStorage.getItem(key) ?? JSON.stringify(defaultVal);
}
