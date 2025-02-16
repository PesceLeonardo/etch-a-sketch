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



// Check For Mouse

DOMContainer.addEventListener("mousedown", function(event) {
  isMousePressed = true;
  main(event);
});

document.addEventListener("mouseup", function() {
  isMousePressed = false;
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

    } else if (color === "change-mode-rainbow") {

      const r = Math.trunc(256 * Math.random());
      const g = Math.trunc(256 * Math.random());
      const b = Math.trunc(256 * Math.random());

      const randomColor = `rgb(${r}, ${g}, ${b})`;
      event.target.style.backgroundColor = randomColor;

    } else {
      event.target.style.backgroundColor = color;
    }
  }
}