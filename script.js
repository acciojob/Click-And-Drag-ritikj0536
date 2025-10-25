// Your code here.
const container = document.getElementById('container');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX, offsetY;

// When a cube is clicked
cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.transition = 'none';
  });
});

// Move the cube with the mouse
document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Keep cube inside the container boundaries
  const maxX = containerRect.width - selectedCube.offsetWidth;
  const maxY = containerRect.height - selectedCube.offsetHeight;

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;

  selectedCube.style.left = `${x}px`;
  selectedCube.style.top = `${y}px`;
});

// Stop moving when mouse is released
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.transition = 'transform 0.1s ease';
  }
  selectedCube = null;
});
