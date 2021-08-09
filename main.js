"use strict";

let bill = document.getElementById("bill-value"),
  People = document.getElementById("people-number"),
  tipPercBtns = document.querySelectorAll(".tip-percentage ul li button"),
  customTip = document.querySelector(".custom-tip"),
  tipAmount = document.getElementById("tip-amount"),
  total = document.getElementById("total-value"),
  btnReset = document.querySelector(".reset"),
  billValue = 0.0,
  tipPrc = 0.15,
  peopleNumber = 1;

/* All controls events */
bill.addEventListener("input", handleInputBill);
tipPercBtns.forEach((btn) => {
  btn.addEventListener("click", handleClickPerc);
});
customTip.addEventListener("input", handleInputCustomTip);
People.addEventListener("input", handleInputPeople);
btnReset.addEventListener("click", handleResetBtn);
/***************************************** */

function handleInputBill() {
  if (!validateInputs("float", bill)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }
  billValue = parseFloat(bill.value) || 0.0;
  calculateTip();
}

function handleClickPerc() {
  tipPercBtns.forEach((btns) => {
    btns.parentNode.classList.remove("selected");
  });
  this.parentNode.classList.add("selected");
  customTip.value = "";
  tipPrc = parseInt(this.textContent) / 100;
  calculateTip();
}

function handleInputCustomTip() {
  if (!validateInputs("int", customTip)) {
    customTip.value = customTip.value.substring(0, customTip.value.length - 1);
  }
  tipPercBtns.forEach((btns) => {
    btns.parentNode.classList.remove("selected");
  });
  tipPrc = parseInt(customTip.value) / 100 || 0;
  calculateTip();
}

function handleInputPeople(e) {
  if (!validateInputs("int", People)) {
    People.value = People.value.substring(0, People.value.length - 1);
  }
  if (People.value <= 0) {
    People.parentNode.classList.add("error");
  } else {
    People.parentNode.classList.remove("error");
  }
  peopleNumber = parseInt(People.value) || 1;
  calculateTip();
}

/* validate input text numbers */
function validateInputs(inputType, inp) {
  let regx;
  inputType === "float" ? (regx = /^[0-9]*\.?[0-9]*$/) : (regx = /^[0-9]*$/);

  return inp.value.match(regx);
}

/* Calculate Tip */

function calculateTip() {
  if (peopleNumber > 0) {
    tipAmount.textContent =
      "$" + ((billValue * tipPrc) / peopleNumber).toFixed(2);
    total.textContent =
      "$" + ((billValue * (tipPrc + 1)) / peopleNumber).toFixed(2);
    btnReset.classList.remove("disabled");
  }
}

/* Reset all values */
function handleResetBtn() {
  bill.value = "";
  billValue = 0.0;
  tipPercBtns[2].click();
  People.value = "";
  peopleNumber = 1;
  People.parentNode.classList.remove("error");
  btnReset.classList.add("disabled");
}
