var FILTER = true
var RESOLUTION = 500
document.getElementById("filter").addEventListener("change", () => {
	FILTER = document.getElementById("filter").checked
	document.getElementById("canvasBackgroundFilter").hidden = !FILTER
	window.generate()
})
document.getElementById("resolution").addEventListener("change", () => {
	RESOLUTION = parseInt(document.getElementById("resolution").value)
	window.generate()
})

var CATEGORY = "buildings"
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
	window.generate()
}

var SELECTBUILDING = "none"
window.selectBuidling = (element) => {
	const selected = document.querySelector(".selectBuilding.selected")
	if (selected) {
		selected.classList.remove("selected")
	}
	element.classList.add("selected")
	SELECTBUILDING = element.getAttribute("name")
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
    document.getElementById('customColour').click()
}
document.getElementById('customColour').addEventListener("change", () => {
    SELECTCOLOUR = document.getElementById('customColour').value
    window.generate()
})

var SELECTHAT = null
window.selectHat = (element) => {
    const selected = document.querySelector(".selectHat.selected")
    if (selected) {
		selected.classList.remove("selected")
    }
    element.classList.add("selected")
    SELECTHAT = element.getAttribute("name")
    window.generate()
}

var SELECTACCESS = null
window.selectAccess = (element) => {
    const selected = document.querySelector(".selectAccess.selected")
    if (selected) {
		selected.classList.remove("selected")
    }
    element.classList.add("selected")
    SELECTACCESS = element.getAttribute("name")
    window.generate()
}

var SELECTWEAPON = null
var SELECTVARIANT = null
var SELECTBUILD = null
window.selectWeapon = (element) => {
    const selected = document.querySelector(".selectWeapon.selected")
    if (selected) {
		selected.classList.remove("selected")
    }
    element.classList.add("selected")
    SELECTWEAPON = element.getAttribute("name")
    SELECTVARIANT = element.getAttribute("variant")
    SELECTBUILD = element.getAttribute("build")
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
	if (RESOLUTION == null || !RESOLUTION) {
		onlyBuildings("none", 1, FILTER)
	} else if (CATEGORY === "buildings") {
		onlyBuildings(SELECTBUILDING, RESOLUTION, FILTER)
    } else if (CATEGORY === "resources") {
        onlyResources(SELECTRESOURCE, SELECTBIOME, RESOLUTION, FILTER)
    } else if (CATEGORY === "player") {
        onlyPlayer(SELECTCOLOUR, SELECTHAT, SELECTACCESS, SELECTWEAPON, SELECTVARIANT, SELECTBUILD, RESOLUTION, FILTER)
    } else if (CATEGORY === "animals") {
        onlyAnimals(SELECTANIMAL, RESOLUTION, FILTER)
    }
}

window.copy = () => {
	mainCanvas.toBlob((blob) => navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]))
}

window.save = () => {
	const link = document.getElementById("tmpDownload")
	link.setAttribute("download", `MooMooElement_${Date.now()}.png`)
	link.setAttribute("href", mainCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"))
	link.click()
}

const MENU = document.getElementById("menu")
function resize() {
	if (window.innerWidth < (window.innerHeight * 12.8) / 9) {
		MENU.style.width = "90%"
		MENU.style.height = null
	} else {
		MENU.style.width = null
		MENU.style.height = "80%"
	}
}
resize()
window.onresize = resize
