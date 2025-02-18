// DOM Elements

const DOMContainer = document.querySelector(".container");
const gridCell = document.createElement("div");
const DOMColorNodeList = document.querySelectorAll(".color");

const DOMGridSizeButton = document.querySelector(".grid-size");

const DOMEraser = document.querySelector(".eraser");
const DOMClearAll = document.querySelector(".clear");

const DOMCustomButton = document.querySelector(".custom");
const DOMCustomInput = document.querySelector(".custom input");

const DOMOpacity = document.querySelector(".opacity");

const DOMRainbow = document.querySelector(".rainbow");

const DOMBackgroundColorChange = document.querySelector(".change-background");

const DOMToggleGridLines = document.querySelector(".toggle-grid");


// Global Constants

const containerSize = 640;



// Global Variables

let gridSize;
let gridCellNodeList;
let isMousePressed;
let isShiftPressed;
let color;




// Grid

// Grid: gridCell Styling

function styleGridCell(gridSize) {
  gridCell.style.width = `${containerSize / gridSize}px`;
  gridCell.style.height = `${containerSize / gridSize}px`;
  gridCell.style.flex = "0 0 auto";
  gridCell.style.backgroundColor = "rgba(0, 0, 0, 0)";

  gridCell.classList.add("cell");
  gridCell.classList.add("has-border");
}

// Grid: Get Grid Size

function getGridSize() {
  const gridSize = document.querySelector(".grid-size-input").value;
  return gridSize
}

// Grid: Add gridCell cells to DOM

function generateGrid(gridSize) {
  for (let i = 0; i < (gridSize ?? 16) ** 2; i++) {
    const clone = gridCell.cloneNode(true);
    DOMContainer.appendChild(clone);
  }
}



// Select Color

// Select Color: Default

function selectColor(event) {
  if (
    event.target.classList.contains("palette") &&
    (event.target.style.backgroundColor === "" || color === "")
  ) {
    event.target.style.backgroundColor = color;
  } else {
  const selectedColor = getComputedStyle(event.target).backgroundColor;
  color = selectedColor;
  }
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

// Select Color: Opacity Mode

DOMOpacity.addEventListener("click", function() {
  color = "change-mode-opacity";
});

// Select Color: Eraser Mode

DOMEraser.addEventListener("click", function() {
  color = "";
});

// Select Color: Clear All

DOMClearAll.addEventListener("dblclick", function() {
  gridCellNodeList.forEach(cell => {
    cell.style.backgroundColor = ""
  })
});

// Select Color: Rainbow Mode

DOMRainbow.addEventListener("click", function() {
  color = "change-mode-rainbow";
});



// Check For Key

// Check For Key: Mouse

DOMContainer.addEventListener("mousedown", function(event) {
  isMousePressed = true;
  main(event);
});

document.addEventListener("mouseup", function() {
  isMousePressed = false;
});

// Check For Key: Shift

document.addEventListener("keydown", function(event) {
  if (event.key === "Shift") isShiftPressed = true;
});

document.addEventListener("keyup", function(event) {
  if (event.key === "Shift") isShiftPressed = false;
});



// Background

DOMBackgroundColorChange.addEventListener("click", function() {
  DOMContainer.style.backgroundColor = color;
  DOMBackgroundColorChange.style.backgroundColor = color;
});



// Toggle Grid Lines

DOMToggleGridLines.addEventListener("click", function() {
  gridCellNodeList.forEach(cell => {
    cell.classList.toggle("has-border");
  })
});



// Main

// Main: Get RGBA Representation of Background Color

function getRGBAlphaArray(eventTarget) {
  const backgroundColorString = eventTarget.style.backgroundColor;

  const RGBArray = backgroundColorString.split(",").map(function (str) {
    let result = "";
    for (const char of str) if (char >= "0" && char <= "9" || char === ".") result += char;
    return result;
  });

  const RGBAlphaArray = RGBArray.length === 3 ? [...RGBArray, "1.0"] : RGBArray;
  const numberMapRGBAlphaArray = RGBAlphaArray.map(x => Number(x));

  return numberMapRGBAlphaArray;
}

// Main: opacityMode Function

function opacityMode(eventTarget) {
  const RGBAlphaArray = getRGBAlphaArray(eventTarget);

  const newOpacity = isShiftPressed ? RGBAlphaArray[3] + 0.1 : RGBAlphaArray[3] - 0.1;

  eventTarget.style.backgroundColor =
    `rgba(${RGBAlphaArray[0]}, ${RGBAlphaArray[1]}, ${RGBAlphaArray[2]}, ${newOpacity})`;
}

// Main: rainbowMode

function rainbowMode(eventTarget) {
  if (isShiftPressed) {
    const RGBAlphaArray = getRGBAlphaArray(eventTarget);

    const invertedRGBAValues = RGBAlphaArray.map(x => 255 - x);

    eventTarget.style.backgroundColor =
      `rgba(${invertedRGBAValues[0]}, ${invertedRGBAValues[1]}, ${invertedRGBAValues[2]}, ${RGBAlphaArray[3]})`;

  } else {
    const r = Math.trunc(256 * Math.random());
    const g = Math.trunc(256 * Math.random());
    const b = Math.trunc(256 * Math.random());

    const randomColor = `rgb(${r}, ${g}, ${b})`;
    eventTarget.style.backgroundColor = randomColor;
  }
}

// Main: Main Function

function main(event) {
  if (isMousePressed) {

    if (color === "change-mode-opacity") {
      opacityMode(event.target);      

    } else if (color === "change-mode-rainbow") {
      rainbowMode(event.target);      

    } else {
      event.target.style.backgroundColor = color;
    }
  }
}

// Main: Generate Grid, Select, and Apply Color

DOMGridSizeButton.addEventListener("click", function() {
  gridSize = getGridSize();
  DOMContainer.textContent = "";

  styleGridCell(gridSize);
  generateGrid(gridSize);

  gridCellNodeList = document.querySelectorAll(".cell");
  gridCellNodeList.forEach(cell => cell.addEventListener(
    "mouseover", main
  ));
});

// Main: rainbowMode All Grid

DOMRainbow.addEventListener("dblclick", function() {
  gridCellNodeList.forEach(rainbowMode);
});

// Main: opacityMode All Grid

DOMOpacity.addEventListener("dblclick", function() {
  gridCellNodeList.forEach(opacityMode);
});

