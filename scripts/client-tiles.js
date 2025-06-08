document.addEventListener('DOMContentLoaded', () => {
  const setupFlip = (sectionId, tileSelector) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const tiles = section.querySelectorAll(tileSelector);
    section.addEventListener('mouseenter', () => {
      tiles.forEach(tile => tile.classList.add('flip'));
    }, { once: true });
  };

  setupFlip('clients', '.client-tile');
  setupFlip('projects', '.project-tile');
});
