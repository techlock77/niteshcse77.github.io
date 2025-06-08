document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('clients');
  if (!section) return;
  const tiles = section.querySelectorAll('.client-tile');
  section.addEventListener('mouseenter', () => {
    tiles.forEach(tile => tile.classList.add('flip'));
  }, { once: true });
});
