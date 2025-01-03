const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Define function to calculate based on button clicked or key pressed.
const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    // If output has '%', replace with '/100' before evaluating.
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // Remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty and button is specialChars then return.
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Add event listener for keyboard input.
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Prevent default behavior for Enter and Backspace to avoid double handling.
  if (key === "Enter" || key === "Backspace") {
    e.preventDefault();
  }

  if (!isNaN(key) || key === ".") {
    // If the key is a number or a dot, add it to the output.
    calculate(key);
  } else if (specialChars.includes(key)) {
    // If the key is a special character, handle it.
    calculate(key);
  } else if (key === "Enter") {
    // Treat Enter as '='.
    calculate("=");
  } else if (key === "Backspace") {
    // Treat Backspace as 'DEL'.
    calculate("DEL");
  } else if (key.toUpperCase() === "C") {
    // Treat 'C' or 'c' as 'AC'.
    calculate("AC");
  }
});
