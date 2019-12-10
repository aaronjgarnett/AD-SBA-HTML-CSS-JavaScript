var calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

function performCalculation(operator, firstOperand, secondOperand) {
    'use strict';
    if (operator === '/') {
        return (firstOperand / secondOperand);
    }
    if (operator === '*') {
        return (firstOperand * secondOperand);
    }
    if (operator === '+') {
        return (firstOperand + secondOperand);
    }
    if (operator === '-') {
        return (firstOperand - secondOperand);
    }
    if (operator === '=') {
        return secondOperand;
    }
}

function inputDigit(digit) {
    'use strict';
    var displayValue = calculator.displayValue, waitingForSecondOperand = calculator.waitingForSecondOperand;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        /*This will overwrite `displayValue` if the current value is '0'
        otherwise append to `displayValue`*/
        if (displayValue === '0') {
            calculator.displayValue = digit;
        } else {
            calculator.displayValue = displayValue + digit;
        }
    }
}
function inputDecimal(dot) {
    'use strict';
    if (calculator.waitingForSecondOperand === true) {
        return;
    }
    /*Appends a decimal point to `displayValue` if it doesn't already
    contain one */
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}
function handleOperator(nextOperator) {
    'use strict';
    var firstOperand = calculator.firstOperand, displayValue = calculator.displayValue, operator = calculator.operator, inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    
    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    }
    if (operator) {
        var currentValue = firstOperand || 0, result = performCalculation(operator, firstOperand, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
function resetCalculator() {
    'use strict';
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    'use strict';
    var display = document.querySelector('.calculatorScreen');
    display.value = calculator.displayValue;
}

updateDisplay();

var keys = document.querySelector('.calculatorBtns');
keys.addEventListener('click', function (event) {
    'use strict';
    var target = event.target;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('allClear')) {
        resetCalculator();
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});