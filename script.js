const bill = document.querySelector('#bill-input');
const tipBtn = document.querySelectorAll('.btn');
const tipCustom = document.querySelector('#tip-input');
const people = document.querySelector('#people-input');
const errorSpan = document.querySelector('.error-span');
const total = document.querySelectorAll('.total');
const resetBtn = document.querySelector('.reset');

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;
let tipPerson = 0;
let totalPerson = 0;

bill.addEventListener('input', setBillValue);
tipBtn.forEach(btn => {
  btn.addEventListener('click', handleClick)
});
tipCustom.addEventListener('input', setCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

function setBillValue() {
  billValue = parseFloat(bill.value).toFixed(2);
  calculateTip();
}

function handleClick(event) {
  tipBtn.forEach(btn => {
    btn.classList.remove('active');

    if(event.target.innerHTML == btn.innerHTML){
      btn.classList.add('active');
      tipValue = parseFloat(btn.innerHTML)/100;
    }
  });

  tipCustom.value = '';
  calculateTip();
}

function setCustomValue() {
  if(tipCustom.value) {
    tipBtn.forEach(btn => {
      btn.classList.remove('active');
    });
  }

  tipValue = parseFloat(tipCustom.value/100);
  calculateTip();
}

function setPeopleValue() {
  peopleValue = parseInt(people.value).toFixed(2);

  peopleValue <=0 ? errorSpan.style.display = "block" : errorSpan.style.display = "none";
  
  calculateTip();
}

function calculateTip() {
  if (peopleValue >=1 && billValue >=0) {
    tipPerson = billValue * tipValue / peopleValue;
    totalPerson = billValue * (tipValue + 1) / peopleValue;
  
    total[0].innerHTML = '$' + tipPerson.toFixed(2);
    total[1].innerHTML = '$' + totalPerson.toFixed(2);
  } else {
    resetResult();
  }
}

function reset() {
  bill.value = '';
  setBillValue();

  tipValue = 0;
  tipBtn.forEach(btn => {
    btn.classList.remove('active');
  });
  
  people.value = '';
  setPeopleValue();
}

function resetResult() {
  total[0].innerHTML = '$0.00';
  total[1].innerHTML = '$0.00';
}

