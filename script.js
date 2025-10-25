const container = document.getElementById('container');
const cubes = document.querySelectorAll('.item');

// ----- Container Scroll Drag -----
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  // Only start scrolling if clicking empty space, not cubes
  if (e.target.classList.contains('item')) return;

  isDown = true;
  container.classList.add('active');
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX;
  container.scrollLeft = scrollLeft - walk;
});

// ----- Individual Cube Drag -----
let selectedCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    e.stopPropagation(); // Prevent container drag
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.position = 'absolute';
    cube.style.zIndex = 1000;
    cube.style.transition = 'none';
  });
});

document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX + container.scrollLeft;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  const maxX = container.scrollWidth - selectedCube.offsetWidth;
  const maxY = container.clientHeight - selectedCube.offsetHeight;

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;

  selectedCube.style.left = `${x}px`;
  selectedCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.transition = 'transform 0.1s ease';
    selectedCube.style.zIndex = 1;
  }
  selectedCube = null;
});
