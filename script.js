const container = document.getElementById("container");
const cubes = document.querySelectorAll(".item");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  // Initial auto layout positions
  cube.style.left = cube.offsetLeft + "px";
  cube.style.top = cube.offsetTop + "px";

  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    cube.style.zIndex = 999; // bring to front

    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;

    document.addEventListener("mousemove", moveCube);
    document.addEventListener("mouseup", stopCube);
  });
});

function moveCube(e) {
  if (!selectedCube) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // BOUNDARY LIMITS
  const maxX = container.clientWidth - selectedCube.clientWidth;
  const maxY = container.clientHeight - selectedCube.clientHeight;

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;

  selectedCube.style.left = x + "px";
  selectedCube.style.top = y + "px";
}

function stopCube() {
  document.removeEventListener("mousemove", moveCube);
  document.removeEventListener("mouseup", stopCube);
  if (selectedCube) {
    selectedCube.style.zIndex = 1;
    selectedCube = null;
  }
}
