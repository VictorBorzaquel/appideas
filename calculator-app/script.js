class Calculator {
    constructor(dataTextDisplayOutput, dataDisplayErrorOutput) {
        this.dataTextDisplayOutput = dataTextDisplayOutput
        this.dataDisplayErrorOutput = dataDisplayErrorOutput
        this.allClear()
        this.updateDisplay()
    }
    allClear() {
        this.currentNumber = ''
        this.previousNumber = 0
        this.resultHistory = ['']
        this.operator = undefined
        this.toggleInputDisplay = false
        this.dataDisplayErrorOutput.innerText = ''
    }
    clear() {
        if (this.currentNumber) {
            this.currentNumber = this.currentNumber.toString().slice(0, -1)
        } else {
            if (this.resultHistoryLength === this.resultHistory.length) this.resultHistory.pop()
            if (this.resultHistory.length === 1) return

            this.currentNumber = this.resultHistory.pop()
        }
        this.dataDisplayErrorOutput.innerText = ''
    }
    appendNumber(number) {
        if (this.currentNumber.length >= 8 ) {
            this.dataDisplayErrorOutput.innerText = 'Error, not insert more 8 digits'
            return
        } 

        if (number === '.' && this.currentNumber.includes('.')) return

        if (this.toggleInputDisplay) {
            this.currentNumber = this.currentNumber.toString() + number.toString()
        } else {
            this.currentNumber = number
            this.toggleInputDisplay = true
        }
        this.dataDisplayErrorOutput.innerText = ''
    }
    equals() {
        if (!this.currentNumber || !this.previousNumber) return

        this.compute()
    }
    choseOperator(operator) {
        if (this.currentNumber === '') return
        if (this.previousNumber !== '') this.compute()

        this.operator = operator
        this.previousNumber = this.currentNumber
        this.currentNumber  = ''
        this.toggleInputDisplay = false
    }
    changeSignal() {
        this.currentNumber = this.currentNumber * -1
    }
    compute() {
        const previousNumber = parseFloat(this.previousNumber)
        const currentNumber = parseFloat(this.currentNumber)
        let result

        switch (this.operator) {
            case '+': 
                result = previousNumber + currentNumber
                break
            case '-': 
                result = previousNumber - currentNumber
                break
            case '÷': 
                result = previousNumber / currentNumber
                break
            default:
                return
        }

        if (this.currentNumber.toString().length >= 8) {
            this.dataDisplayErrorOutput.innerText = 'Error, operation would exceed the 8 digit maximum'
            this.currentNumber = ''
            this.clear()
            return
        }

        this.resultHistory[this.resultHistory.length] = result
        this.currentNumber = this.resultHistory[this.resultHistory.length-1]
        this.previousNumber = ''
        this.operator = undefined
        this.resultHistoryLength = this.resultHistory.length
        
    }
    updateDisplay() {
        if (this.toggleInputDisplay) {
            this.dataTextDisplayOutput.innerText = this.currentNumber
        } else {
            this.dataTextDisplayOutput.innerText = this.previousNumber
        }
    }
}
const dataNumberButtons = document.querySelectorAll('[data-number]')
const dataOperatorButtons = document.querySelectorAll('[data-operator]')

const dataClearButton = document.querySelector('[data-clear]')
const dataAllClearButton = document.querySelector('[data-all-clear]')
const dataChangeSignalButton = document.querySelector('[data-change-signal]')
const dataEqualsButton = document.querySelector('[data-equals]')

const dataDisplayErrorOutput = document.querySelector('[data-display-error]')
const dataTextDisplayOutput = document.querySelector('[data-display-output]')

const calculator = new Calculator(dataTextDisplayOutput, dataDisplayErrorOutput)

dataNumberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
dataOperatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperator(button.innerText)
        calculator.updateDisplay()
        console.log(calculator.currentNumber);
        console.log(calculator.previousNumber);
    })
})

dataClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
dataAllClearButton.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()
})
dataChangeSignalButton.addEventListener('click', () => {
    calculator.changeSignal()
    calculator.updateDisplay()
})
dataEqualsButton.addEventListener('click', () => {
    calculator.equals()
    calculator.updateDisplay()
})
