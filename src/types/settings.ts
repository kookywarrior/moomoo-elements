type PlayerSettings = {
  hat: number | null
  accessory: number | null
  holding:
    | {
        type: 'weapon'
        weapon: string
        weaponVariant: string
      }
    | {
        type: 'item'
        item: string
      }
    | null
  projectile: string | null

  colour: string
  name: string
  tribe: string
  crown: boolean
  skull: boolean
  health: number | null
  hpBarColour: 'green' | 'red'
  direction: number | null
  topHatDirection: number | null
}

type AnimalSettings = {
  selected: string | null
  health: number | null
  name: string
  direction: number | null
}

export type { PlayerSettings, AnimalSettings }
