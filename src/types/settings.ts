type PlayerSettings = {
  hat: number | null
  accessory: number | null
  weapon: string | null
  weaponVariant: string | null
  item: string | null
  projectile: string | null

  colour: string
  name: string
  tribe: string
  crown: boolean
  skull: boolean
  health: number
  hpBarColour: 'green' | 'red'
  direction: number
  topHatDirection: number
}

type AnimalSettings = {
  selected: string | null
  health: number
  name: string
  direction: number
}

export type { PlayerSettings, AnimalSettings }
