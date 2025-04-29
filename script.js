
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.id;

        if (value === 'clear') {
            currentInput = '';
            display.textContent = '0';
        } else if (value === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (value === '=') {
            try {
                // Evaluate expression using Function for better security than eval
                currentInput = Function('"use strict";return (' + currentInput + ')')().toString();
                display.textContent = currentInput;
                resultDisplayed = true;
            } catch (e) {
                display.textContent = 'Error';
                currentInput = '';
            }
        } else if (value === '%') {
            try {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
            } catch {
                display.textContent = 'Error';
                currentInput = '';
            }
        } else {
            if (resultDisplayed && !isNaN(value)) {
                // If a number is clicked after result, start new input
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        }
    });
});
