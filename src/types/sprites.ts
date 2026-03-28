import type { Prettify } from './utils'

type UISpriteIdentity = {
  hats: { index: number }
  accessories: { index: number }
  animals: { name: string }
  projectiles: { name: string }
  weapons: { name: string; variant: string }
  items: { name: string }
  resources: { name: string; biome: number }
}
type UISprites = {
  [K in keyof UISpriteIdentity]: Array<Prettify<UISpriteIdentity[K] & { url: string }>>
}

type ImageSprites = Record<string, HTMLImageElement>

export type { UISprites, ImageSprites }
