'use strict';
//DOM
const curArrDOM = document.querySelector('#cur-arr');
const addToArrBtnDOM = document.querySelector('.add-to-arr');
const addNumberInputDOM = document.querySelector('#addnumber');
const randomBtnDOM = document.querySelector('.random-btn');
const randomNumberDOM = document.querySelector('.random-number');
const resetDOM = document.querySelector('.reset');

//default array
const defaultArr = [
  53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
];
//current array

let curArr = JSON.parse(getFromStorage('CURRENT__ARRAY', []));
console.log(curArr);
//======================
//Random Function
// === Generate a random index within the range of the array length
function randomNumber(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Get the random number from the array using the random index
  const randomNumber = arr[randomIndex];
  return randomNumber;
}
//======================
//Init
curArrDOM.textContent = `${curArr}`;
//console.log(curArr);
//======================
//click randomBtn
randomBtnDOM.addEventListener('click', function () {
  const randomNum = randomNumber(curArr);
  randomNumberDOM.textContent = randomNum;
  const indexNum = curArr.indexOf(randomNum);
  curArr.splice(indexNum, 1);
  curArrDOM.textContent = `${curArr}`;
  saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
});
//======================
//Click Add to Array button
addToArrBtnDOM.addEventListener('click', function () {
  const duplicateNumber = curArr.indexOf(+addNumberInputDOM.value);
  if (
    +addNumberInputDOM.value !== 0 &&
    +addNumberInputDOM.value !== NaN &&
    duplicateNumber === -1
  ) {
    curArr.push(+addNumberInputDOM.value);
    curArrDOM.textContent = `${curArr}`;
    addNumberInputDOM.value = '';
    saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
  }
});
//======================
//Click resetBtn
resetDOM.addEventListener('click', function () {
  curArr = defaultArr;
  curArrDOM.textContent = `${curArr}`;
  saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
});
