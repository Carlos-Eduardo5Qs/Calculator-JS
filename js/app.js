const previousOperationText = document.querySelector('#previous_operations');
const currentOperationText = document.querySelector('.display');
const buttons = document.querySelectorAll('.calculator_body button');

class Calculator {
    constructor(previousOperationText,currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';
    };

    addDigit(digit) {
        if(digit === '.' && this.currentOperationText.value.includes('.')) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    };

    processOperation(operation) {
        if(this.currentOperationText.value === '') {
            if(this.previousOperationText !== '') {
                this.changeOperation(operation);
            }
            return;
        }
        
        let operationValue;
        const previous = +this.previousOperationText.value.split(' ')[0];
        const current = +this.currentOperationText.value;

        switch(operation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case '-':
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case '/':
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case '*':
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
                
            default:
                return;
        };
    };

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {

        if(operationValue === null) {
            this.currentOperationText.value += this.currentOperation;
        } else {
            if(previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.value = `${operationValue} ${operation}`;
            this.currentOperationText.value = "";
        }
    };

    changeOperation(operation) {
        const mathOperation = ['*', '/', '+', '-'];

        if(!mathOperation.includes(operation)) {
            return;
        };

        this.previousOperationText.value = this.previousOperationText.value.slice(0, -1) + operation;
    };

};

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});