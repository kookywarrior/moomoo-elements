var CATEGORY = "buildings"
var FILTER = true
var RESOLUTION = 500
const ZOOMFACTOR = {
	buildings: 25,
	resources: 35,
	hats: 30,
	access: 30,
	weapons: 30,
	projectiles: 30,
	player: 45,
	animals: 40,
	background: 100,
	volcano: 125,
	blockerwithcircle: 60
}
var xOffset, yOffset

window.changeCategory = (element) => {
	const selected = document.querySelector(".selectCategory.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	const section = document.querySelector("section:not([hidden])")
	if (section) {
		section.hidden = true
	}
	document.getElementById(element.getAttribute("name")).hidden = false
	CATEGORY = element.getAttribute("name")

	document.getElementById("zoom").value =
		ZOOMFACTOR[
			CATEGORY === "resources" && SELECTRESOURCE === "volcano"
				? "volcano"
				: CATEGORY === "buildings" && SELECTBUILDING === "blockerwithcircle"
				? "blockerwithcircle"
				: CATEGORY
		]
	window.generate()
}

document.getElementById("filter").addEventListener("change", () => {
	FILTER = document.getElementById("filter").checked
	document.getElementById("canvasBackgroundFilter").hidden = !FILTER
	window.generate()
})
document.getElementById("resolution").addEventListener("change", () => {
	RESOLUTION = parseFloat(document.getElementById("resolution").value) || 500
	document.getElementById("resolution").value = RESOLUTION
	window.generate()
})
document.getElementById("zoom").addEventListener("change", () => {
	ZOOMFACTOR[
		CATEGORY === "resources" && SELECTRESOURCE === "volcano"
			? "volcano"
			: CATEGORY === "buildings" && SELECTBUILDING === "blockerwithcircle"
			? "blockerwithcircle"
			: CATEGORY
	] = parseFloat(document.getElementById("zoom").value) || 100
	document.getElementById("zoom").value =
		ZOOMFACTOR[
			CATEGORY === "resources" && SELECTRESOURCE === "volcano"
				? "volcano"
				: CATEGORY === "buildings" && SELECTBUILDING === "blockerwithcircle"
				? "blockerwithcircle"
				: CATEGORY
		]
	window.generate()
})

function backgroundScaler(square = true) {
	maxScreenWidth = (1920 * parseFloat(document.getElementById("zoom").value)) / 100
	maxScreenHeight = (1080 * parseFloat(document.getElementById("zoom").value)) / 100
	const width = square ? RESOLUTION : (16 * RESOLUTION) / 9
	scaleFillNative = Math.max(width / maxScreenWidth, RESOLUTION / maxScreenHeight)
	mainCanvas.width = spriteCanvas.width = filterCanvas.width = width
	mainCanvas.height = spriteCanvas.height = filterCanvas.height = RESOLUTION
	spriteContext.setTransform(
		square ? 1 : scaleFillNative,
		0,
		0,
		square ? 1 : scaleFillNative,
		square ? width / 2 : (width - maxScreenWidth * scaleFillNative) / 2,
		square ? RESOLUTION / 2 : (RESOLUTION - maxScreenHeight * scaleFillNative) / 2
	)
	mainContext.clearRect(0, 0, width, RESOLUTION)
	spriteContext.clearRect(0, 0, width, RESOLUTION)
	filterContext.clearRect(0, 0, width, RESOLUTION)
}

var PLAYER = {
	CROWN: false,
	SKULL: false,
	HEALTH: "0",
	NAME: "",
	TRIBENAME: "",
	HPCOLOUR: "green",
	DIRECTION: "0",
	TOPHATDIRECTION: "0"
}
window.changePlayerValue = (key, value) => {
	PLAYER[key] = value
	window.generate()
}

var AI = {
	HEALTH: "0",
	NAME: "",
	DIRECTION: "0"
}
window.changeAIValue = (key, value) => {
	AI[key] = value
	window.generate()
}

var GRID = true
document.getElementById("grid").addEventListener("change", () => {
	GRID = document.getElementById("grid").checked
	window.generate()
})

var SELECTBUILDING = "none"
window.selectBuidling = (element) => {
	const selected = document.querySelector(".selectBuilding.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	SELECTBUILDING = element.getAttribute("name")
	document.getElementById("zoom").value =
		ZOOMFACTOR[
			CATEGORY === "resources" && SELECTRESOURCE === "volcano"
				? "volcano"
				: CATEGORY === "buildings" && SELECTBUILDING === "blockerwithcircle"
				? "blockerwithcircle"
				: CATEGORY
		]
	window.generate()
}

var SELECTRESOURCE = "none"
var SELECTBIOME = 0
window.selectResource = (element) => {
	const selected = document.querySelector(".selectResource.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	SELECTRESOURCE = element.getAttribute("name")
	SELECTBIOME = parseInt(element.getAttribute("biome"))
	document.getElementById("zoom").value =
		ZOOMFACTOR[
			CATEGORY === "resources" && SELECTRESOURCE === "volcano"
				? "volcano"
				: CATEGORY === "buildings" && SELECTBUILDING === "blockerwithcircle"
				? "blockerwithcircle"
				: CATEGORY
		]
	window.generate()
}

var SELECTCOLOURNUMBER = "1"
var SELECTCOLOUR = "#bf8f54"
window.selectColour = (element) => {
	const selected = document.querySelector(".selectColour.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	SELECTCOLOURNUMBER = element.getAttribute("name")
	SELECTCOLOUR = element.style.backgroundColor
	window.generate()
}
window.selectCustomColour = (element) => {
	const selected = document.querySelector(".selectColour.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	SELECTCOLOURNUMBER = element.getAttribute("name")
	document.getElementById("customColour").click()
}
document.getElementById("customColour").addEventListener("click", () => {
	SELECTCOLOUR = document.getElementById("customColour").value
	window.generate()
})
document.getElementById("customColour").addEventListener("input", () => {
	SELECTCOLOUR = document.getElementById("customColour").value
	window.generate()
})

var SELECTHAT = null
var SELECTPLAYERHAT = null
window.selectHat = (element) => {
	const selected = document.querySelector((CATEGORY === "player" ? "#player > .container > " : "") + ".selectHat.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	if (CATEGORY === "player") {
		SELECTPLAYERHAT = element.getAttribute("name")
	} else {
		SELECTHAT = element.getAttribute("name")
	}
	window.generate()
}

var SELECTACCESS = null
var SELECTPLAYERACCESS = null
window.selectAccess = (element) => {
	const selected = document.querySelector((CATEGORY === "player" ? "#player > .container > " : "") + ".selectAccess.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	if (CATEGORY === "player") {
		SELECTPLAYERACCESS = element.getAttribute("name")
	} else {
		SELECTACCESS = element.getAttribute("name")
	}
	window.generate()
}

var SELECTWEAPON = null
var SELECTVARIANT = null
var SELECTPLAYERWEAPON = null
var SELECTPLAYERVARIANT = null
var SELECTPLAYERBUILDING = null
window.selectWeapon = (element) => {
	const selected = document.querySelector((CATEGORY === "player" ? "#player > .container > " : "") + ".selectWeapon.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	if (CATEGORY === "player") {
		SELECTPLAYERWEAPON = element.getAttribute("name")
		SELECTPLAYERVARIANT = element.getAttribute("variant")
		SELECTPLAYERBUILDING = element.getAttribute("build")
	} else {
		SELECTWEAPON = element.getAttribute("name")
		SELECTVARIANT = element.getAttribute("variant")
	}
	window.generate()
}

var SELECTPROJECTILE = null
var SELECTPLAYERPROJECTILE = null
window.selectProjectile = (element) => {
	const selected = document.querySelector((CATEGORY === "player" ? "#player > .container > " : "") + ".selectProjectile.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	if (CATEGORY === "player") {
		SELECTPLAYERPROJECTILE = element.getAttribute("name")
	} else {
		SELECTPROJECTILE = element.getAttribute("name")
	}
	window.generate()
}

var SELECTANIMAL = "none"
window.selectAnimal = (element) => {
	const selected = document.querySelector(".selectAnimal.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	SELECTANIMAL = element.getAttribute("name")
	window.generate()
}

window.generate = () => {
	resize()
	if (CATEGORY === "buildings") {
		onlyBuildings(SELECTBUILDING, FILTER)
	} else if (CATEGORY === "resources") {
		onlyResources(SELECTRESOURCE, SELECTBIOME, FILTER)
	} else if (CATEGORY === "hats") {
		onlyHats(SELECTHAT, FILTER)
	} else if (CATEGORY === "access") {
		onlyAccess(SELECTACCESS, FILTER)
	} else if (CATEGORY === "weapons") {
		onlyWeapons(SELECTWEAPON, SELECTVARIANT, FILTER)
	} else if (CATEGORY === "projectiles") {
		onlyProjectiles(SELECTPROJECTILE, FILTER)
	} else if (CATEGORY === "player") {
		onlyPlayer(
			SELECTCOLOUR,
			SELECTPLAYERHAT,
			SELECTPLAYERACCESS,
			SELECTPLAYERWEAPON,
			SELECTPLAYERVARIANT,
			SELECTPLAYERBUILDING,
			SELECTPLAYERPROJECTILE,
			PLAYER,
			FILTER
		)
	} else if (CATEGORY === "animals") {
		onlyAnimals(SELECTANIMAL, AI, FILTER)
	} else if (CATEGORY === "background") {
		onlyBackground(GRID, FILTER)
	}
}

var COPYCOUNT = 0
window.copy = async () => {
	var noerror = true
	try {
		mainCanvas.toBlob((blob) => navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]))
	} catch (error) {
		noerror = false
		console.error(error)
		window.alert("Error! Please try to copy it manually by right-clicking the canvas.")
	} finally {
		if (noerror) {
			document.getElementById("copy").innerText = "Copied"
			COPYCOUNT++
			setTimeout(() => {
				COPYCOUNT--
				if (COPYCOUNT <= 0) {
					COPYCOUNT = 0
					document.getElementById("copy").innerText = "Copy"
				}
			}, 1000)
		}
	}
}

window.save = async () => {
	try {
		const blob = await new Promise((resolve) => mainCanvas.toBlob(resolve))
		const link = document.getElementById("tmpDownload")
		link.setAttribute("download", `MooMooElement_${Date.now()}.png`)
		link.setAttribute("href", window.URL.createObjectURL(blob))
		link.click()
	} catch (error) {
		window.alert("Error! Please try to save it manually by right-clicking the canvas.")
	}
}

const MAP = document.getElementById("map")
const POSITION = document.getElementById("position")
var POSITIONX = 14400 / 2
var POSITIONY = 14400 / 2
var mouseDown = false
MAP.addEventListener("mousedown", (event) => {
	POSITION.style.left = `${(event.offsetX * 100) / MAP.getBoundingClientRect().width - 2}%`
	POSITION.style.top = `${(event.offsetY * 100) / MAP.getBoundingClientRect().height - 2}%`
	POSITIONX = (event.offsetX * 14400) / MAP.getBoundingClientRect().width
	POSITIONY = (event.offsetY * 14400) / MAP.getBoundingClientRect().height
	mouseDown = true
	window.generate()
})
document.addEventListener("mouseup", () => {
	mouseDown = false
})
MAP.addEventListener("mousemove", (event) => {
	if (mouseDown) {
		POSITION.style.left = `${(event.offsetX * 100) / MAP.getBoundingClientRect().width - 2}%`
		POSITION.style.top = `${(event.offsetY * 100) / MAP.getBoundingClientRect().height - 2}%`
		POSITIONX = (event.offsetX * 14400) / MAP.getBoundingClientRect().width
		POSITIONY = (event.offsetY * 14400) / MAP.getBoundingClientRect().height
		window.generate()
	}
})

const MENU = document.getElementById("menu")
const CANVASCONTAINER = document.getElementById("canvasContainer")
function resize() {
	if (window.innerWidth < (window.innerHeight * 12.8) / 9) {
		MENU.style.width = "90%"
		MENU.style.height = null
	} else {
		MENU.style.width = null
		MENU.style.height = "80%"
	}
	if (CATEGORY === "background") {
		CANVASCONTAINER.style.aspectRatio = 16 / 9
		backgroundScaler(false)
		xOffset = POSITIONX - maxScreenWidth / 2
		yOffset = POSITIONY - maxScreenHeight / 2
	} else {
		CANVASCONTAINER.style.aspectRatio = 1
		backgroundScaler(true)
	}
}
resize()
window.generate()
window.onresize = () => {
	resize()
	window.generate()
}
