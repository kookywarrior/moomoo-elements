const WEAPONS = {
	toolhammer: {
		src: "hammer_1",
		length: 140,
		width: 140,
		xOff: -3,
		yOff: 18
	},
	handaxe: {
		src: "axe_1",
		length: 140,
		width: 140,
		xOff: 3,
		yOff: 24
	},
	greataxe: {
		src: "great_axe_1",
		length: 140,
		width: 140,
		xOff: -8,
		yOff: 25
	},
	shortsword: {
		src: "sword_1",
		iPad: 1.3,
		length: 130,
		width: 210,
		xOff: -8,
		yOff: 46
	},
	katana: {
		src: "samurai_1",
		iPad: 1.3,
		length: 130,
		width: 210,
		xOff: -8,
		yOff: 59
	},
	polearm: {
		src: "spear_1",
		iPad: 1.3,
		length: 130,
		width: 210,
		xOff: -8,
		yOff: 53
	},
	bat: {
		src: "bat_1",
		iPad: 1.3,
		length: 110,
		width: 180,
		xOff: -8,
		yOff: 53
	},
	daggers: {
		src: "dagger_1",
		iPad: 0.8,
		length: 110,
		width: 110,
		xOff: 18,
		yOff: 0
	},
	stick: {
		src: "stick_1",
		length: 140,
		width: 140,
		xOff: 3,
		yOff: 24
	},
	huntingbow: {
		src: "bow_1",
		length: 120,
		width: 120,
		xOff: -6,
		yOff: 0,
		projectile: "arrow"
	},
	greathammer: {
		src: "great_hammer_1",
		length: 140,
		width: 140,
		xOff: -9,
		yOff: 25
	},
	woodenshield: {
		src: "shield_1",
		length: 120,
		width: 120,
		shield: 0.2,
		xOff: 6,
		yOff: 0
	},
	crossbow: {
		src: "crossbow_1",
		aboveHand: true,
		armS: 0.75,
		length: 120,
		width: 120,
		xOff: -4,
		yOff: 0,
		projectile: "arrow"
	},
	reapetercrossbow: {
		src: "crossbow_2",
		aboveHand: true,
		armS: 0.75,
		length: 120,
		width: 120,
		xOff: -4,
		yOff: 0,
		projectile: "arrow"
	},
	mcgrabby: {
		src: "grab_1",
		length: 130,
		width: 210,
		xOff: -8,
		yOff: 53
	},
	musket: {
		src: "musket_1",
		aboveHand: true,
		rec: 0.35,
		armS: 0.6,
		hndS: 0.3,
		hndD: 1.6,
		length: 205,
		width: 205,
		xOff: 25,
		yOff: 0
	}
}
const PROJECTILES = {
	arrow: {
		scale: 103,
		src: "arrow_1"
	},
	musket: {
		scale: 160,
		src: "bullet_1"
	},
	turret: {
		scale: 20
	}
}

const ITEMS = {
	apple: {
		scale: 22,
		holdOffset: 15
	},
	cookie: {
		scale: 27,
		holdOffset: 15
	},
	cheese: {
		scale: 27,
		holdOffset: 15
	},
	woodwall: {
		scale: 50,
		holdOffset: 20
	},
	stonewall: {
		scale: 50,
		holdOffset: 20
	},
	castlewall: {
		scale: 52,
		holdOffset: 20
	},
	spikes: {
		scale: 49,
		holdOffset: 8,
		spritePadding: -23
	},
	greaterspikes: {
		scale: 52,
		holdOffset: 8,
		spritePadding: -23
	},
	poisonspikes: {
		scale: 52,
		holdOffset: 8,
		spritePadding: -23
	},
	windmill: {
		spritePadding: 25,
		iconLineMult: 12,
		scale: 45,
		holdOffset: 20
	},
	fasterwindmill: {
		spritePadding: 25,
		iconLineMult: 12,
		scale: 47,
		holdOffset: 20
	},
	mine: {
		iconLineMult: 12,
		scale: 65,
		holdOffset: 20
	},
	sapling: {
		iconLineMult: 12,
		colDiv: 0.5,
		scale: 110,
		holdOffset: 50
	},
	pittrap: {
		colDiv: 0.2,
		scale: 50,
		holdOffset: 20
	},
	invisiblepittrap: {
		colDiv: 0.2,
		scale: 50,
		holdOffset: 20
	},
	boostpad: {
		colDiv: 0.7,
		scale: 45,
		holdOffset: 20
	},
	turret: {
		scale: 43,
		holdOffset: 20
	},
	platform: {
		scale: 43,
		holdOffset: 20
	},
	healingpad: {
		colDiv: 0.7,
		scale: 45,
		holdOffset: 20
	},
	spawnpad: {
		scale: 45,
		holdOffset: 20
	},
	blocker: {
		blocker: 300,
		colDiv: 0.7,
		scale: 45,
		holdOffset: 20
	},
	teleporter: {
		colDiv: 0.7,
		scale: 45,
		holdOffset: 20
	}
}
const HATS = {
	1: {
		name: "Marksman Cap",
		scale: 120
	},
	2: {
		name: "Straw Hat",
		scale: 120
	},
	4: {
		name: "Ranger Hat",
		scale: 120
	},
	5: {
		name: "Cowboy Hat",
		scale: 120
	},
	6: {
		name: "Soldier Helmet",
		scale: 120
	},
	7: {
		name: "Bull Helmet",
		scale: 120
	},
	8: {
		name: "Bummle Hat",
		scale: 120
	},
	9: {
		name: "Miners Helmet",
		scale: 120
	},
	10: {
		name: "Bush Gear",
		scale: 160
	},
	11: {
		name: "Spike Gear",
		scale: 120,
		topSprite: true
	},
	12: {
		name: "Booster Hat",
		scale: 120
	},
	13: {
		name: "Medic Gear",
		scale: 110
	},
	14: {
		name: "Windmill Hat",
		scale: 120,
		topSprite: true
	},
	15: {
		name: "Winter Cap",
		scale: 120
	},
	18: {
		name: "Explorer Hat",
		scale: 120
	},
	20: {
		name: "Samurai Armor",
		scale: 120
	},
	21: {
		name: "Plague Mask",
		scale: 120
	},
	22: {
		name: "Emp Helmet",
		scale: 120
	},
	23: {
		name: "Anti Venom Gear",
		scale: 120
	},
	26: {
		name: "Barbarian Armor",
		scale: 120
	},
	27: {
		name: "Scavenger Gear",
		scale: 120
	},
	28: {
		name: "Moo Head",
		scale: 120
	},
	29: {
		name: "Pig Head",
		scale: 120
	},
	30: {
		name: "Fluff Head",
		scale: 120
	},
	31: {
		name: "Flipper Hat",
		scale: 120
	},
	32: {
		name: "Musketeer Hat",
		scale: 120
	},
	35: {
		name: "Fez Hat",
		scale: 120
	},
	36: {
		name: "Pandou Head",
		scale: 120
	},
	37: {
		name: "Bear Head",
		scale: 120
	},
	38: {
		name: "Monkey Head",
		scale: 120
	},
	40: {
		name: "Tank Gear",
		scale: 120
	},
	42: {
		name: "Enigma Hat",
		scale: 120
	},
	43: {
		name: "Blitz Hat",
		scale: 120
	},
	44: {
		name: "Polar Head",
		scale: 120
	},
	45: {
		name: "Shame!",
		scale: 120
	},
	46: {
		name: "Bull Mask",
		scale: 120
	},
	48: {
		name: "Halo",
		scale: 120
	},
	49: {
		name: "Bob XIII Hat",
		scale: 120
	},
	50: {
		name: "Apple Cap",
		scale: 120
	},
	51: {
		name: "Moo Cap",
		scale: 120
	},
	52: {
		name: "Thief Gear",
		scale: 120
	},
	53: {
		name: "Turret Gear",
		scale: 120,
		topSprite: true
	},
	55: {
		name: "Bloodthirster",
		scale: 120
	},
	56: {
		name: "Assassin Gear",
		scale: 120
	},
	57: {
		name: "Pumpkin",
		scale: 120
	},
	58: {
		name: "Dark Knight",
		scale: 120
	}
}

const ACCESSORIES = {
	1: {
		name: "Super Cape",
		scale: 90
	},
	2: {
		name: "Dragon Cape",
		scale: 90
	},
	3: {
		name: "Cookie Cape",
		scale: 90
	},
	4: {
		name: "Skull Cape",
		scale: 90
	},
	5: {
		name: "Dash Cape",
		scale: 90
	},
	6: {
		name: "Winter Cape",
		scale: 90
	},
	7: {
		name: "Troll Cape",
		scale: 90
	},
	8: {
		name: "Cow Cape",
		scale: 90
	},
	9: {
		name: "Tree Cape",
		scale: 90
	},
	10: {
		name: "Stone Cape",
		scale: 90
	},
	11: {
		name: "Monkey Tail",
		scale: 97,
		xOff: 25
	},
	12: {
		name: "Snowball",
		scale: 105,
		xOff: 18
	},
	13: {
		name: "Angel Wings",
		scale: 138,
		xOff: 22
	},
	14: {
		name: "Thorns",
		scale: 115,
		xOff: 20
	},
	15: {
		name: "Blockades",
		scale: 95,
		xOff: 15
	},
	16: {
		name: "Sawblade",
		scale: 90,
		xOff: 0
	},
	17: {
		name: "Apple Basket",
		scale: 80,
		xOff: 12
	},
	18: {
		name: "Blood Wings",
		scale: 178,
		xOff: 26
	},
	19: {
		name: "Shadow Wings",
		scale: 138,
		xOff: 22
	},
	20: {
		name: "Devils Tail",
		scale: 95,
		xOff: 20
	},
	21: {
		name: "Corrupt X Wings",
		scale: 178,
		xOff: 26
	}
}

const treeScales = [150, 160, 165, 175]
const bushScales = [80, 85, 95]
const rockScales = [80, 85, 90]
const RESOURCES = {
	fivestartree: [0, 1],
	sevenstartree: [0, 1],
	bush: [0, 1, 2],
	rock: [0, 2],
	gold: [0],
	volcano: [0]
}

const ANIMALS = {
	cow_1: { scale: 72 },
	pig_1: { scale: 72 },
	bull_2: { scale: 78 },
	bull_1: { scale: 90 },
	wolf_1: { scale: 84 },
	chicken_1: { scale: 70 },
	enemy: { scale: 80, spriteMlt: 1.8, nameScale: 50 },
	crate_1: { scale: 70, spriteMlt: 1.0, nameScale: 35 },
	wolf_2: { scale: 90, nameScale: 35 }
}
