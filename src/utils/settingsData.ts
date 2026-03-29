const CATEGORIES = {
  buildings: 'Buildings',
  resources: 'Resources',
  hats: 'Hats',
  accessories: 'Accessories',
  weapons: 'Weapons',
  projectiles: 'Projectiles',
  player: 'Player',
  animals: 'Animals',
  background: 'Background',
}

const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(([value, label]) => ({
  value,
  label,
}))

export { CATEGORIES, CATEGORY_OPTIONS }
