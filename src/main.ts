const calculatorDisplay = document.querySelector<HTMLDivElement>(
  ".calculator__display"
);
const calculatorNumbers = document.querySelectorAll<HTMLButtonElement>(
  ".calculator__number"
);
const calculatorOperators = document.querySelectorAll<HTMLButtonElement>(
  ".calculator__operator"
);
const ac = document.querySelector<HTMLButtonElement>(".calculator__ac");
const plus_minus = document.querySelector<HTMLButtonElement>(
  ".calculator__plus-minus"
);
const percentage = document.querySelector<HTMLButtonElement>(
  ".calculator__percentage"
);
const equals = document.querySelector<HTMLButtonElement>(".calculator__equals");
const decimal = document.querySelector<HTMLButtonElement>(
  ".calculator__decimal"
);

if (calculatorNumbers.length === 0) {
  throw new Error("Issue with calculator numbers");
}

if (calculatorOperators.length === 0) {
  throw new Error("Issue with calculator operators");
}

if (
  !calculatorDisplay ||
  !ac ||
  !plus_minus ||
  !percentage ||
  !equals ||
  !decimal
) {
  throw new Error("Issue with calculator function selectors");
}

calculatorDisplay.innerText = "0";
let previousNumber: string = "";
let currentNumber: string = "";
let selectedOperator: string = "";

const handleButtonClick = (event: Event) => {
  const isDecimal = isButtonADecimal(event);

  if (isDecimal) {
    if (currentNumber.includes(".")) return;
  }

  if (calculatorDisplay.innerText.length === 9) return;

  if (calculatorDisplay.innerText.length >= 6) {
    calculatorDisplay.classList.add("calculator__display--small");
  }

  updateDisplay(event);
};

const isButtonADecimal = (event: Event) => {
  const button = event.target as HTMLButtonElement;
  return button.innerText === ".";
};

const updateDisplay = (event: Event) => {
  const target = event.target as HTMLButtonElement;

  if (calculatorDisplay.innerText === "0") {
    calculatorDisplay.innerText = "";
  }
  currentNumber += target.innerText;
  calculatorDisplay.innerText = currentNumber;
};

const addToSelectedOperator = (event: Event) => {
  const target = event.target as HTMLButtonElement;

  if (
    target.innerText !== selectedOperator &&
    previousNumber &&
    currentNumber
  ) {
    calculate(selectedOperator);
    selectedOperator = target.innerText;
    return;
  }

  selectedOperator = target.innerText;

  if (previousNumber && currentNumber) {
    calculate(selectedOperator);
  } else {
    if (currentNumber) {
      previousNumber = currentNumber;
      currentNumber = "";
    }
  }
};

const formatResult = (result: number) => {
  if (result.toString().includes(".")) {
    const floatResultAsString = parseFloat(result.toFixed(8)).toString();
    if (floatResultAsString.length > 6) {
      calculatorDisplay.classList.add("calculator__display--small");
    }
    previousNumber = floatResultAsString;
    currentNumber = "";
    return previousNumber;
  }
  const resultAsString = result.toString();
  const resultLength = result.toString().length;

  if (resultLength > 6) {
    calculatorDisplay.classList.add("calculator__display--small");
    calculatorDisplay.innerText = resultAsString;
    previousNumber = resultAsString;
    currentNumber = "";
    return previousNumber;
  } else {
    calculatorDisplay.innerText = result.toString();
    previousNumber = result.toString();
    currentNumber = "";
    return previousNumber;
  }
};

const calculate = (operator: string) => {
  let result: number = 0;
  const current = parseFloat(currentNumber);
  const previous = parseFloat(previousNumber);
  if (isNaN(current) || isNaN(previous)) return;

  if (operator === "+") {
    result = previous + current;
  } else if (operator === "−") {
    result = previous - current;
  } else if (operator === "×") {
    result = previous * current;
  } else if (operator === "÷") {
    result = previous / current;
  }

  let formattedResult = formatResult(result);

  if (formattedResult.length > 10) {
    formattedResult = formattedResult.slice(0, 10);

    return formattedResult;
  } else {
    return formattedResult;
  }
};

const returnResult = () => {
  if (!previousNumber || !currentNumber) return;
  calculatorDisplay.innerText = calculate(selectedOperator) as string;
};

const clearCalculator = () => {
  calculatorDisplay.innerText = "0";
  previousNumber = "";
  currentNumber = "";
  selectedOperator = "";
  calculatorDisplay.classList.remove("calculator__display--small");
};

calculatorNumbers.forEach((number) => {
  number.addEventListener("click", handleButtonClick);
});

calculatorOperators.forEach((operator) => {
  operator.addEventListener("click", addToSelectedOperator);
});

equals.addEventListener("click", returnResult);
ac.addEventListener("click", clearCalculator);

decimal.addEventListener("click", handleButtonClick);
