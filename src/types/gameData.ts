type Weapon = {
  src: string
  length: number
  width: number
  xOff: number
  yOff: number
  iPad?: number
  projectile?: boolean
  shield?: number
  aboveHand?: boolean
  armS?: number
  hndS?: number
  hndD?: number
  rec?: number
}

type Item = {
  scale: number
  holdOffset: number
  spritePadding?: number
  iconLineMult?: number
  colDiv?: number
}

type Hat = {
  name: string
  scale: number
  topSprite?: boolean
}

type Accessory = {
  name: string
  scale: number
  xOff?: number
}

type Animal = {
  scale: number
  spriteMlt?: number
  nameScale?: number
}

type Projectile = {
  scale: number
}

export type { Weapon, Item, Hat, Accessory, Animal, Projectile }
