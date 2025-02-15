// DOM Elements

const DOMContainer = document.querySelector(".container");
const gridCell = document.createElement("div");
const DOMColorNodeList = document.querySelectorAll(".color")



// Global Variables

let isMousePressed;
let color;



// gridCell Styling

gridCell.style.width = "40px";
gridCell.style.height = "40px";
gridCell.style.border = "1px solid black";
gridCell.style.flex = "0 0 auto";

gridCell.classList.add("cell");



// Add gridCell to DOM

for (let i = 0; i < 16 ** 2; i++) {
  const clone = gridCell.cloneNode(true);
  DOMContainer.appendChild(clone);
}



// Select Color

function selectColor(event) {
  const selectedColor = getComputedStyle(event.target).backgroundColor;
  color = selectedColor;
}

DOMColorNodeList.forEach(selector => selector.addEventListener(
  "click", selectColor
));



// Check For Mouse

DOMContainer.addEventListener("mousedown", function() {
  isMousePressed = true;
});

document.addEventListener("mouseup", function() {
  isMousePressed = false;
});



// Main

const gridCellNodeList = document.querySelectorAll(".cell");

gridCellNodeList.forEach(cell => cell.addEventListener(
  "mouseenter", function(event) {
    if (isMousePressed) {
      event.target.style.backgroundColor = color;
    }
  }
));

