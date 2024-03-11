// 1. query selectors to access elements from the DOM
const calculatorDisplay = document.querySelector<HTMLDivElement>(
  ".calculator__display"
);
const calculatorNumbers = document.querySelectorAll<HTMLButtonElement>(
  ".calculator__number"
);
const calculatorOperators = document.querySelectorAll<HTMLButtonElement>(
  ".calculator__operator"
);
const AC = document.querySelector<HTMLButtonElement>(".calculator__ac");
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

// 2. Validate elements

if (calculatorNumbers.length === 0) {
  throw new Error("Issue with calculator numbers");
}

if (calculatorOperators.length === 0) {
  throw new Error("Issue with calculator operators");
}

if (
  !calculatorDisplay ||
  !AC ||
  !plus_minus ||
  !percentage ||
  !equals ||
  !decimal
) {
  throw new Error("Issue with calculator function selectors");
}

// Calculator screen
calculatorDisplay.innerText = "0";

// Event handlers
const updateDisplay = (event: Event) => {
  if (calculatorDisplay.innerText.length === 9) return;

  const target = event.target as HTMLElement;

  if (calculatorDisplay.innerText === "0") {
    calculatorDisplay.innerText = "";
  }

  calculatorDisplay.innerText += target.innerText;
};

// }

// 3. create forEach loop to attach event handlers to number buttons

calculatorNumbers.forEach((number) => {
  number.addEventListener("click", updateDisplay);
});
