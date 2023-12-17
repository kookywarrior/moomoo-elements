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

const time = Date.now()
async function preload() {
	function loadImage(fileName) {
		return new Promise((resolve) => {
			var tmpSprite = new Image()
			tmpSprite.src = fileName
			tmpSprite.onload = function () {
				this.isLoaded = true
				resolve(tmpSprite)
			}
			tmpSprite.onerror = function () {
				resolve(null)
			}
		})
	}

	projectilesSrc.forEach(async (e) => {
		projectileSprites[e] = await loadImage("img/weapons/" + e + ".png")
	})

	for (const id in HATS) {
		var tmpSprite = await loadImage("img/hats/hat_" + id + ".png")
		skinSprites[id.toString()] = tmpSprite
		if (HATS[id].topSprite) {
			tmpSprite = await loadImage("img/hats/hat_" + id + "_top.png")
			skinSprites[`${id}_top`] = tmpSprite
			tmpSprite = await loadImage("img/hats/hat_" + id + "_p.png")
			skinSprites[`${id}_p`] = tmpSprite
		}
		const tmpElement = document.createElement("div")
		tmpElement.className = "selectHat"
		tmpElement.setAttribute("name", id)
		tmpElement.style.backgroundImage = `url(${tmpSprite.src})`
		document.getElementById("hatsContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectHat(this)")
	}

	for (const id in ACCESSORIES) {
		var tmpSprite = await loadImage("img/accessories/access_" + id + ".png")
		accessSprites[id.toString()] = tmpSprite
		const tmpElement = document.createElement("div")
		tmpElement.className = "selectAccess"
		tmpElement.setAttribute("name", id)
		tmpElement.style.backgroundImage = `url(${tmpSprite.src})`
		document.getElementById("accessContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectAccess(this)")
	}

	for (const name in ANIMALS) {
		aiSprites[name] = await loadImage(`img/animals/${name}.png`)
		const tmpElement = document.createElement("div")
		tmpElement.className = "selectAnimal"
		tmpElement.setAttribute("name", name)
		tmpElement.style.backgroundImage = `url(img/animals/${name}.png)`
		document.getElementById("animalsContainer").appendChild(tmpElement)
		tmpElement.setAttribute("onclick", "selectAnimal(this)")
	}
	console.log(Date.now() - time)

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
			document.getElementById("weaponsContainer").appendChild(tmpElement2)
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

	for (const name in WEAPONS) {
		Array.from(["", "_g", "_d", "_r"]).forEach(async (variant) => {
			const tmpSprite = await loadImage("img/weapons/" + WEAPONS[name].src + variant + ".png")
			toolSprites[WEAPONS[name].src + variant] = tmpSprite
			if (tmpSprite) {
				const tmpCanvas = document.createElement("canvas")
				tmpCanvas.width = tmpCanvas.height = 100
				const tmpContext = tmpCanvas.getContext("2d")
				tmpContext.imageSmoothingEnabled = false
				tmpContext.webkitImageSmoothingEnabled = false
				tmpContext.mozImageSmoothingEnabled = false

				const tmpPad = 1 / (tmpSprite.height / tmpSprite.width)
				const tmpMlt = WEAPONS[name].iPad || 1

				tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
				tmpContext.rotate(Math.PI / 4 + Math.PI)
				tmpContext.drawImage(
					tmpSprite,
					-(tmpCanvas.width * tmpMlt * 0.9 * tmpPad) / 2,
					-(tmpCanvas.height * tmpMlt * 0.9) / 2,
					tmpCanvas.width * tmpMlt * tmpPad * 0.9,
					tmpCanvas.height * tmpMlt * 0.9
				)
				tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)"
				tmpContext.globalCompositeOperation = "source-atop"
				tmpContext.fillRect(-tmpCanvas.width / 2, -tmpSprite.height / 2, tmpCanvas.width, tmpSprite.height)

				const tmpElement = document.createElement("div")
				tmpElement.className = "selectWeapon"
				tmpElement.setAttribute("name", name)
				tmpElement.setAttribute("variant", variant)
				tmpElement.style.backgroundImage = `url(${tmpCanvas.toDataURL()})`
				document.getElementById("weaponsContainer").appendChild(tmpElement)
				tmpElement.setAttribute("onclick", "selectWeapon(this)")
			}
		})
	}

	document.getElementById("loading").style.display = "none"
	document.getElementById("menu").style.display = "flex"
	console.log(Date.now() - time)
}
preload()
