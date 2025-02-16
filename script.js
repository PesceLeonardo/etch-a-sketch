// DOM Elements

const DOMContainer = document.querySelector(".container");
const gridCell = document.createElement("div");
const DOMColorNodeList = document.querySelectorAll(".color")

const DOMEraser = document.querySelector(".eraser");
const DOMClearAll = document.querySelector(".clear");

const DOMCustomButton = document.querySelector(".custom");
const DOMCustomInput = document.querySelector(".custom input");

const DOMOpacity = document.querySelector(".opacity");



// Global Variables

let isMousePressed;
let color;



// gridCell Styling

gridCell.style.width = "40px";
gridCell.style.height = "40px";
gridCell.style.border = "1px solid black";
gridCell.style.flex = "0 0 auto";
gridCell.style.backgroundColor = "rgba(0, 0, 0, 0)";

gridCell.classList.add("cell");



// Add gridCell to DOM

for (let i = 0; i < 16 ** 2; i++) {
  const clone = gridCell.cloneNode(true);
  DOMContainer.appendChild(clone);
}



// Select Color: Default

function selectColor(event) {
  const selectedColor = getComputedStyle(event.target).backgroundColor;
  color = selectedColor;
}

DOMColorNodeList.forEach(selector => selector.addEventListener(
  "click", selectColor
));



// Select Color: Custom

DOMCustomInput.addEventListener("input", function() {
  color = DOMCustomInput.value;
});

DOMCustomButton.addEventListener("click", function() {
  color = DOMCustomInput.value;
});



// Select Color: Change Opacity

DOMOpacity.addEventListener("click", function() {
  color = "change-mode-opacity";
});



// Check For Mouse

DOMContainer.addEventListener("mousedown", function(event) {
  isMousePressed = true;
  main(event);
});

document.addEventListener("mouseup", function() {
  isMousePressed = false;
});



// Main: Select & Apply Color

const gridCellNodeList = document.querySelectorAll(".cell");

gridCellNodeList.forEach(cell => cell.addEventListener(
  "mouseover", main
));

// Main: Eraser Mode

DOMEraser.addEventListener("click", function() {
  color = "";
});

// Main: Clear All

DOMClearAll.addEventListener("dblclick", function() {
  gridCellNodeList.forEach(cell => {
    cell.style.backgroundColor = ""
  })
});

// Main: Main Function

function main(event) {
  if (isMousePressed) {
    if (color === "change-mode-opacity") {

      const backgroundColorString = event.target.style.backgroundColor;

      const currentRGBA = backgroundColorString[3] !== "a" ?
      `${backgroundColorString.slice(0, 3)}a${backgroundColorString.slice(3, -1)}, 1.0)`
      : backgroundColorString;

      const isolateOpacityArray = currentRGBA.replace(")", "").split(" ");
      const currentOpacity = Number(isolateOpacityArray.at(-1));

      isolateOpacityArray[isolateOpacityArray.length - 1] = String(currentOpacity - 0.1);
      event.target.style.backgroundColor = isolateOpacityArray.join("") + ")";

    } else {
      event.target.style.backgroundColor = color;
    }
  }
}