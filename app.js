// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El
];


// variables and constants
let valueStrInMemory = null;
let operatorInMemory = null;
const KEYDOWN_KEYS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '.', 'Enter', 'Escape', '+', '-', '=', '*', '/'
];


// Functions
const getNumOfDigits = (valueStr) => [...valueStr].filter(char => /\d/.test(char)).length;

const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  const digitCount = getNumOfDigits(valueStr);

  if (digitCount < 6) {
    valueEl.style.fontSize = '130px';
  } else if (digitCount === 6) {
    valueEl.style.fontSize = '120px';
  } else if (digitCount === 7) {
    valueEl.style.fontSize = '110px';
  } else if (digitCount === 8) {
    valueEl.style.fontSize = '100px';
  } else if (digitCount >= 9) {
    valueEl.style.fontSize = '90px';
  }

  if (valueStr[valueStr.length - 1] === '.') {
    valueEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};


// Event Handler Functions
const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  const currentValueCount = getNumOfDigits(currentValueStr);

  if (currentValueCount >= 9) return;

  if (currentValueStr === '0') {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};

const handleDecimalClick = () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
};

const handleAcClick = () => {
  setStrAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
};

const handlePmClick = () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
};

const handlePercentClick = () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
};

const handleEqualClick = () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
};

// Add Event Listeners to functions
acEl.addEventListener('click', handleAcClick);
pmEl.addEventListener('click', handlePmClick);
percentEl.addEventListener('click', handlePercentClick);

// add event listeners to operators
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
});
equalEl.addEventListener('click', handleEqualClick);


// Add Event Listeners to numbers and decimal
for (let i=0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener('click', handleDecimalClick);


// Add Event Listeners for keydown
document.addEventListener('keydown', (e) => {
  if (!KEYDOWN_KEYS.includes(e.key)) {
    return;
  }

  e.preventDefault();

  switch (e.key) {
    case '0':
      handleNumberClick('0');
      break;
    case '1':
      handleNumberClick('1');
      break;
    case '2':
      handleNumberClick('2');
      break;
    case '3':
      handleNumberClick('3');
      break;
    case '4':
      handleNumberClick('4');
      break;
    case '5':
      handleNumberClick('5');
      break;
    case '6':
      handleNumberClick('6');
      break;
    case '7':
      handleNumberClick('7');
      break;
    case '8':
      handleNumberClick('8');
      break;
    case '9':
      handleNumberClick('9');
      break;
    case '.':
      handleDecimalClick();
      break;
    case 'Enter':
      handleEqualClick();
      break;
    case '=':
      handleEqualClick();
      break;
    case 'Escape':
      handleAcClick();
      break;
    case '+':
      handleOperatorClick('addition');
      break;
    case '-':
      handleOperatorClick('subtraction');
      break;
    case '*':
      handleOperatorClick('multiplication');
      break;
    case '/':
      handleOperatorClick('division');
      break;
  }
});


// Set up the time
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }
  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();
