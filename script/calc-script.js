console.log("js is running");

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(value)) {
    //if value is not a number:
    handleSymbol(value);
  } else {
    //if value is a number:
    handleNumber(value);
  }

  screen.innerText = buffer;
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function handleSymbol(symbol) {
 switch (symbol) {
   case 'C':
     buffer = '0';
     runningTotal = 0;
     previousOperator = null;
     break;
    case '=':
      if (previousOperator === null) {
        //don't have two numbers
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length-1);
      }
      break;
    case '/':
    case '*':
    case '-':
    case '+':
      handleMath(symbol);
      break;
 }
}

function handleMath(symbol) {
  //if symbol is +, -, *, / (NOT =)
  if (buffer === '0') {
    //if buffer equals string 0, do nothing
    return;
  }
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
      //function to do the math
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case '+':
      runningTotal += intBuffer;
      break;
    case '-':
      runningTotal -= intBuffer;
      break;
    case '*':
      runningTotal *= intBuffer;
      break;
    case '/':
      runningTotal /= intBuffer;
      break;
  }
}

function init () {
  console.log('init is running');
  document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
  })
};


init();