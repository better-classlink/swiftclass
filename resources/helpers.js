function convertHexValueToDecimal(hexValue) {
    return parseInt(hexValue, 16)
}

function hexCodeToRGB(hexCode) {
    let r = convertHexValueToDecimal(hexCode.substring(1, 3))
    let g = convertHexValueToDecimal(hexCode.substring(3, 5))
    let b = convertHexValueToDecimal(hexCode.substring(5, 7))
    return `${r}, ${g}, ${b}`
}

function extractSetting(settingName) {
    let settingsLoad = localStorage.getItem('swcsettings')
    settingsLoad = JSON.parse(settingsLoad)
    return settingsLoad[settingsLoad.indexOf(settingName) + 1]
}

function resetAllFooters(){
    document.querySelectorAll('.footerButton')
        .forEach(element => {
            if(element.classList.contains('deny')){
                element.classList.remove('deny');
            }
        })
}

async function closeMenu(event){
    console.log("Closing menu")
    console.log(event)
    document.getElementById('contextMenu').classList.add('small')
    await wait(300)
    document.getElementById('contextMenu').remove()
}

async function closeMenuOnEsc(event){
    if(event.key == 'Escape'){
        closeMenu(event)
    }
}

async function closeMenuOnMouse(event){
    let contextMenu = document.getElementById('contextMenu')
    let openers = document.querySelectorAll('.contextMenuOpen')

    if(contextMenu == null) return
    if(contextMenu.contains(event.target)) return

    if(event.target.classList.contains('contextMenuOpen')){
        return
    }

    closeMenu(event)
}

async function typeMenuName(...args){
    window.denySettingMovement = true
    let name = ''
    document.getElementById('topHeader').textContent = '...'
    let nameCache = window.currentMenu
    for(let i = 0;i < nameCache.length;i++){
        name += nameCache[i]
        await wait(45)
        document.getElementById('topHeader').textContent = name
    }
    window.denySettingMovement = false
    console.log(args)
    if(args[0]){
        document.querySelectorAll('.footerButton').forEach(element => {
            element.classList.remove('deny')
        })
    }
}

function showInfoSlides() {
    console.log(window.currentMenu)
    let sourcename = window.currentMenu
    if(window.curentMenu.includes("Settings")){
        sourcename = "Settings"
    }
    let infoSlides = new InfoSlides("resources/info/json/" + sourcename + "/slides.json")
    infoSlides.render()
}

function resetTheme(){
    if(!confirm("Are you sure you want to reset the theme? This will reset all settings to their default values.")){
        return
    }
    let settingsLoad = localStorage.getItem('swcsettings')
    settingsLoad = JSON.parse(settingsLoad)

    settingsLoad.splice([settingsLoad.indexOf("Dark Elements")], 2)

    settingsLoad.splice([settingsLoad.indexOf("Light Elements")], 2)

    settingsLoad.splice([settingsLoad.indexOf("Somewhat Bright Elements")], 2)

    settingsLoad.splice([settingsLoad.indexOf("Background Image")], 2)

    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
    location.reload()
}

function resetAllFooters(){
    document.querySelectorAll('.footerButton')
        .forEach(element => {
            if(element.classList.contains('deny')){
                element.classList.remove('deny');
            }
        })
}

async function closeMenu(event){
    console.log("Closing menu")
    console.log(event)
    document.getElementById('contextMenu').classList.add('small')
    await wait(300)
    document.getElementById('contextMenu').remove()
}

async function closeMenuOnEsc(event){
    if(event.key == 'Escape'){
        closeMenu(event)
    }
}

async function closeMenuOnMouse(event){
    let contextMenu = document.getElementById('contextMenu')

    if(contextMenu == null) return
    if(contextMenu.contains(event.target)) return

    if(event.target.classList.contains('contextMenuOpen')){
        return
    }

    closeMenu(event)
}

async function typeMenuName(...args){
    document.querySelectorAll('.footerButton').forEach(element => {
        element.classList.add('deny')
    })
    window.denySettingMovement = true
    let name = ''
    document.getElementById('topHeader').textContent = '...'
    let nameCache = window.currentMenu
    for(let i = 0;i < nameCache.length;i++){
        name += nameCache[i]
        await wait(45)
        document.getElementById('topHeader').textContent = name
    }
    window.denySettingMovement = false
    console.log(args)
        document.querySelectorAll('.footerButton').forEach(element => {
            element.classList.remove('deny')
        })
}

function showInfoSlides() {
    let sourcename = window.currentMenu
    if(sourcename.includes("Settings")){
        sourcename = "Settings"
    }else if(sourcename == 'Classes'){
        sourcename = window.caSubMenu
    }
    let infoSlides = new InfoSlides("resources/info/json/" + sourcename + "/slides.json")
    infoSlides.render()
}

function resetTheme(){
    if(!confirm("Are you sure you want to reset the theme? This will reset all settings to their default values.")){
        return
    }
    let settingsLoad = localStorage.getItem('swcsettings')
    settingsLoad = JSON.parse(settingsLoad)

    settingsLoad.splice([settingsLoad.indexOf("Dark Elements")], 2)

    settingsLoad.splice([settingsLoad.indexOf("Light Elements")], 2)

    settingsLoad.splice([settingsLoad.indexOf("Somewhat Bright Elements")], 2)

    settingsLoad.splice([settingsLoad.indexOf("Background Image")], 2)

    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
    location.reload()
}

