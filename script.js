'use strict';
//DOM
const curArrDOM = document.querySelector('#cur-arr');
const passedArrDOM = document.querySelector('#passed-arr');

const addToArrBtnDOM = document.querySelector('.add-to-arr');
const removeToArrBtnDOM = document.querySelector('.remove-to-arr');
const addNumberInputDOM = document.querySelector('#add-number');
const removeNumberInputDOM = document.querySelector('#remove-number');
const randomBtnDOM = document.querySelector('.random-btn');
const randomNumberDOM = document.querySelector('.random-number');
const resetDOM = document.querySelector('.reset');

//default array
const defaultArr = [
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
];

let passedArr = JSON.parse(getFromStorage('PASSED__ARRAY', [])).flat();
console.log(passedArr);
let curArr = JSON.parse(getFromStorage('CURRENT__ARRAY', []));

if (curArr.length < 1) {
  curArr = [...defaultArr];
  curArrDOM.textContent = curArr.join(' ');
  saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
} else {
  //Init
  curArrDOM.textContent = curArr.join(' ');
  passedArrDOM.textContent = passedArr.join(' ');
}

//======================
//Random Function
// === Generate a random index within the range of the array length
function randomNumber(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Get the random number from the array using the random index
  const randomNumber = arr[randomIndex];
  console.log(randomNumber);
  return randomNumber;
}
//======================

//======================
//click randomBtn
randomBtnDOM.addEventListener('click', function () {
  const randomNum = randomNumber(curArr);
  randomNumberDOM.textContent = randomNum;
  const indexNum = curArr.indexOf(randomNum);
  const [passedNum] = curArr.splice(indexNum, 1);
  passedArr.push(passedNum);
  passedArrDOM.textContent = passedArr.join(' ');
  saveToStorage('PASSED__ARRAY', JSON.stringify(passedArr));
  curArrDOM.textContent = curArr.join(' ');
  saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
  addNumberInputDOM.value = '';
  removeNumberInputDOM.value = '';
});
//======================
//Click Add to Array button
addToArrBtnDOM.addEventListener('click', function () {
  const addInputValue = +addNumberInputDOM.value;
  console.log(addInputValue);
  const addValueInCurArr = curArr.indexOf(addInputValue);
  const addValueInPassedArr = passedArr.indexOf(addInputValue);
  if (!addInputValue) {
    alert(`Wrong input!`);
    addNumberInputDOM.value = '';
  } else if (addValueInCurArr !== -1 || addValueInPassedArr !== -1) {
    alert(`Number has Existed or Passed!`);
    addNumberInputDOM.value = '';
  } else if (addValueInCurArr === -1) {
    curArr.push(addInputValue);
    curArrDOM.textContent = curArr.join(' ');
    saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
    alert(`Added ${addInputValue}`);
  }
});
//======================
//Click resetBtn
resetDOM.addEventListener('click', function () {
  const ask = confirm(`Do you want to reset ?`);
  if (ask) {
    curArr = [...defaultArr];
    passedArr = [];
    curArrDOM.textContent = curArr.join(' ');
    passedArrDOM.textContent = passedArr.join(' ');

    saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
    saveToStorage('PASSED__ARRAY', JSON.stringify(passedArr));
    randomNumberDOM.textContent = '';
    addNumberInputDOM.value = '';
  }
});
//======================
//Click remove btn
removeToArrBtnDOM.addEventListener('click', function () {
  const removeInputValue = removeNumberInputDOM.value;
  if (removeInputValue === '') {
    alert(`Wrong Input!`);
  } else {
    //if length < => lesson removed
    const lengthCurArrBefore = curArr.length;
    const removeInputArr = removeInputValue.split(',').map((el) => Number(el));
    //if element exist in curArr, it does not add.
    for (let removeItem of removeInputArr) {
      const removeIndex = curArr.indexOf(removeItem);
      if (removeIndex !== -1) {
        const [lostCur] = curArr.splice(removeIndex, 1);
        passedArr.push(lostCur);
      }
    }
    const lengthCurArrAfter = curArr.length;
    if (lengthCurArrAfter < lengthCurArrBefore) {
      saveToStorage('CURRENT__ARRAY', JSON.stringify(curArr));
      saveToStorage('PASSED__ARRAY', JSON.stringify(passedArr));
      console.log(passedArr);
      removeNumberInputDOM.value = '';
      alert(`Removed ${removeInputArr}`);
      curArrDOM.textContent = curArr.join(' ');
      passedArrDOM.textContent = passedArr.join(' ');
    } else {
      alert(`No current lesson removed!`);
      removeNumberInputDOM.value = '';
    }
  }
});
