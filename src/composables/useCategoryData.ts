function useCategoryData() {
  const categoryOptions: { label: string; value: string }[] = [
    { label: 'Buildings', value: 'buildings' },
    { label: 'Resources', value: 'resources' },
    { label: 'Hats', value: 'hats' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Weapons', value: 'weapons' },
    { label: 'Projectiles', value: 'projectiles' },
    { label: 'Player', value: 'player' },
    { label: 'Animals', value: 'animals' },
    { label: 'Background', value: 'background' },
  ]

  return { categoryOptions }
}

export { useCategoryData }
