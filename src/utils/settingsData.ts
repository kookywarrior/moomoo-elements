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

const COLOURS = [
  '#bf8f54',
  '#cbb091',
  '#896c4b',
  '#fadadc',
  '#ececec',
  '#c37373',
  '#4c4c4c',
  '#ecaff7',
  '#738cc3',
  '#8bc373',
  '#91b2db',
]

export { CATEGORIES, CATEGORY_OPTIONS, COLOURS }
