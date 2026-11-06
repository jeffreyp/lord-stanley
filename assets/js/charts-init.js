// Renders charts declared as <script type="application/json" data-chart="canvas-id"> blocks.
var rootStyle = getComputedStyle(document.documentElement);
Chart.defaults.color = rootStyle.getPropertyValue('--text-color').trim();
// Set the grid color only: changing Chart.defaults.borderColor disables the automatic dataset palette.
Chart.defaults.scale.grid.color = rootStyle.getPropertyValue('--border-color-02').trim();

document.querySelectorAll('script[type="application/json"][data-chart]').forEach(function (block) {
  var canvas = document.getElementById(block.getAttribute('data-chart'));
  if (!canvas) return;
  try {
    new Chart(canvas, JSON.parse(block.textContent));
  } catch (error) {
    console.error('Could not render chart "' + canvas.id + '":', error);
  }
});
