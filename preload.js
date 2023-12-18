var projectileSprites = {}
var projectilesSrc = ["arrow_1", "arrow_2", "arrow_3", "bullet_1"]
var skinSprites = {}
var accessSprites = {}
var toolSprites = {}
var toolsSrc = [
	"axe_1",
	"bat_1",
	"bow_1",
	"crossbow_1",
	"crossbow_2",
	"dagger_1",
	"grab_1",
	"great_axe_1",
	"great_hammer_1",
	"hammer_1",
	"samurai_1",
	"musket_1",
	"shield_1",
	"spear_1",
	"stick_1",
	"sword_1"
]
var aiSprites = {}
var iconSprites = {}

async function preload() {
	for (const id in HATS) {
		const tmpElement = document.createElement("div")
		tmpElement.className = "selectHat"
		tmpElement.setAttribute("name", id)
		tmpElement.style.backgroundImage = `url(https://moomoo.io/img/hats/hat_${id}${HATS[id].topSprite ? "_p" : ""}.png)`
		document.getElementById("hatsContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectHat(this)")

		const tmpElement2 = document.createElement("div")
		tmpElement2.className = "selectHat"
		tmpElement2.setAttribute("name", id)
		tmpElement2.style.backgroundImage = `url(https://moomoo.io/img/hats/hat_${id}${HATS[id].topSprite ? "_p" : ""}.png)`
		document.getElementById("playerHatsContainer").appendChild(tmpElement2)
		tmpElement2.setAttribute("onclick", "selectHat(this)")
	}

	for (const id in ACCESSORIES) {
		const tmpElement = document.createElement("div")
		tmpElement.className = "selectAccess"
		tmpElement.setAttribute("name", id)
		tmpElement.style.backgroundImage = `url(https://moomoo.io/img/accessories/access_${id}.png)`
		document.getElementById("accessContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectAccess(this)")

		const tmpElement2 = document.createElement("div")
		tmpElement2.className = "selectAccess"
		tmpElement2.setAttribute("name", id)
		tmpElement2.style.backgroundImage = `url(https://moomoo.io/img/accessories/access_${id}.png)`
		document.getElementById("playerAccessContainer").appendChild(tmpElement2)
		tmpElement2.setAttribute("onclick", "selectAccess(this)")
	}

	for (const name in ANIMALS) {
		const tmpElement = document.createElement("div")
		tmpElement.className = "selectAnimal"
		tmpElement.setAttribute("name", name)
		tmpElement.style.backgroundImage = `url(https://moomoo.io/img/animals/${name}.png)`
		document.getElementById("animalsContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectAnimal(this)")
	}

	const variants = ["", "_g", "_d", "_r"]
	for (const name in WEAPONS) {
		for (let i = 0; i < 4; i++) {
			const variant = variants[i]

			const tmpElement = document.createElement("div")
			tmpElement.className = "selectWeapon"
			tmpElement.setAttribute("name", name)
			tmpElement.setAttribute("variant", variant)
			tmpElement.style.backgroundImage = `url(${WEAPONS[name].src === "bow_1" && variant === "_d" ? "" : "https://moomoo.io/"}img/weapons/${
				WEAPONS[name].src + variant
			}.png)`
			document.getElementById("weaponsContainer").appendChild(tmpElement)
			tmpElement.setAttribute("onclick", "selectWeapon(this)")

			const tmpElement2 = document.createElement("div")
			tmpElement2.className = "selectWeapon"
			tmpElement2.setAttribute("name", name)
			tmpElement2.setAttribute("variant", variant)
			tmpElement2.style.backgroundImage = `url(${WEAPONS[name].src === "bow_1" && variant === "_d" ? "" : "https://moomoo.io/"}img/weapons/${
				WEAPONS[name].src + variant
			}.png)`
			document.getElementById("playerWeaponsContainer").appendChild(tmpElement2)
			tmpElement2.setAttribute("onclick", "selectWeapon(this)")
		}
	}

	for (const name in ITEMS) {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 100
		const tmpContext = tmpCanvas.getContext("2d")
		tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
		tmpContext.imageSmoothingEnabled = false
		tmpContext.webkitImageSmoothingEnabled = false
		tmpContext.mozImageSmoothingEnabled = false
		const tmpSprite = getItemSprite(name, false, true)
		const tmpScale = Math.min(tmpCanvas.width - 15, tmpSprite.width)
		tmpContext.globalAlpha = name == "invisiblepittrap" ? 0.6 : 1
		tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale)
		tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)"
		tmpContext.globalCompositeOperation = "source-atop"
		tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale)

		const tmpElement = document.createElement("div")
		tmpElement.className = "selectBuilding"
		tmpElement.setAttribute("name", name)
		tmpElement.style.backgroundImage = `url(${tmpCanvas.toDataURL()})`
		document.getElementById("buildingsContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectBuidling(this)")

		if (name !== "invisiblepittrap") {
			const tmpElement2 = document.createElement("div")
			tmpElement2.className = "selectWeapon"
			tmpElement2.setAttribute("build", name)
			tmpElement2.style.backgroundImage = `url(${tmpCanvas.toDataURL()})`
			document.getElementById("playerWeaponsContainer").appendChild(tmpElement2)
			tmpElement2.setAttribute("onclick", "selectWeapon(this)")
		}
	}

	for (const name in RESOURCES) {
		const res = RESOURCES[name]
		res.forEach((biome) => {
			const tmpCanvas = document.createElement("canvas")
			tmpCanvas.width = tmpCanvas.height = 100
			const tmpContext = tmpCanvas.getContext("2d")
			tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
			tmpContext.imageSmoothingEnabled = false
			tmpContext.webkitImageSmoothingEnabled = false
			tmpContext.mozImageSmoothingEnabled = false
			const tmpSprite = getResSprite(name, name == "rock" || name == "gold" || name == "bush" ? 80 : name == "volcano" ? 170 : 150, biome, true)
			const tmpScale = Math.min(tmpCanvas.width - 15, tmpSprite.width)
			tmpContext.globalAlpha = 1
			tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale)
			tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)"
			tmpContext.globalCompositeOperation = "source-atop"
			tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale)

			const tmpElement = document.createElement("div")
			tmpElement.className = "selectResource"
			tmpElement.setAttribute("name", name)
			tmpElement.setAttribute("biome", biome)
			tmpElement.style.backgroundImage = `url(${tmpCanvas.toDataURL()})`
			document.getElementById("resourcesContainer").appendChild(tmpElement)
			tmpElement.setAttribute("onclick", "selectResource(this)")
		})
	}

	document.getElementById("loading").style.display = "none"
	document.getElementById("menu").style.display = "flex"
}
preload()
