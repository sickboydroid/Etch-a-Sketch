function generateGrid(nCols) {
  let cellSize = GRID_WIDTH / nCols;
  const nRows = GRID_HEIGHT / cellSize;
  grid.querySelectorAll("div .row").forEach((row) => row.remove());
  for (let r = 0; r < nRows; r++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.height = cellSize + "px";
    for (let c = 0; c < nCols; c++) {
      row.appendChild(generateSquare(cellSize));
    }
    grid.appendChild(row);
  }
}

function generateSquare(cellSize) {
  const square = document.createElement("div");
  square.style["background"] = "lightgray";
  square.style["border"] = "1px solid gray";
  square.style.flexGrow = "1";
  square.addEventListener("mousemove", (event) => {
    if (event.ctrlKey) square.style.background = getDrawColor();
  });
  return square;
}

function getDrawColor() {
  if (curBrushType === BRUSH_TYPE_NORMAL) return "black";
  else if (curBrushType === BRUSH_TYPE_RAINBOW) return generateRandomRGB();
  else if (curBrushType === BRUSH_TYPE_ERASER) return "lightgray";
}

function generateRandomRGB() {
  let alpha = Math.ceil(Math.random() * 255);
  let red = Math.ceil(Math.random() * 255);
  let blue = Math.ceil(Math.random() * 255);
  let green = Math.ceil(Math.random() * 255);
  return `rgba(${red}, ${blue}, ${green}, ${alpha})`;
}

function switchBrush(brushType) {
  curBrushType = brushType;
  btnNormalBrush.classList.remove("selected-button");
  btnRainbowBrush.classList.remove("selected-button");
  btnEraserBrush.classList.remove("selected-button");
  if (brushType === BRUSH_TYPE_NORMAL) {
    btnNormalBrush.classList.add("selected-button");
  } else if (brushType === BRUSH_TYPE_RAINBOW) {
    btnRainbowBrush.classList.add("selected-button");
  } else if (brushType === BRUSH_TYPE_ERASER) {
    btnEraserBrush.classList.add("selected-button");
  }
}

///////////////////////////////////////////////////////////

const grid = document.querySelector(".grid");
const btnNormalBrush = document.querySelector("#normal");
const btnEraserBrush = document.querySelector("#eraser");
const btnRainbowBrush = document.querySelector("#rainbow");
const btnRegenerateGrid = document.querySelector("#regenerate");
const btnClearGrid = document.querySelector("#clear");
let num_cols = 30; // stores last entered value for number of columns
const GRID_WIDTH = Number.parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--grid-width")
);
const GRID_HEIGHT = Number.parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--grid-height")
);
const BRUSH_TYPE_NORMAL = 0;
const BRUSH_TYPE_ERASER = 1;
const BRUSH_TYPE_RAINBOW = 2;
let curBrushType = BRUSH_TYPE_NORMAL;
generateGrid(num_cols);

/* listener for generate button */
btnRegenerateGrid.addEventListener("click", () => {
  let input = Number.parseInt(prompt("Number of squares per row [5-150]:"));
  while (!Number.isInteger(input) || input > 150 || input < 5)
    input = Number.parseInt(prompt("Enter a valid number in range 5-150:"));
  num_cols = input;
  generateGrid(num_cols);
});

/* listener for clear button */
btnClearGrid.addEventListener("click", () => generateGrid(num_cols));

/* listener for different brushes */
btnNormalBrush.addEventListener("click", () => switchBrush(BRUSH_TYPE_NORMAL));
btnRainbowBrush.addEventListener("click", () =>
  switchBrush(BRUSH_TYPE_RAINBOW)
);
btnEraserBrush.addEventListener("click", () => switchBrush(BRUSH_TYPE_ERASER));
