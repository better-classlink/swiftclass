window.currentMenu = 'SwiftClass'

if(localStorage.getItem('swcsettings') == null) localStorage.setItem('swcsettings',
    '[]'
)

window.SwiftClassPage = document.getElementById('baseContent').innerHTML


async function quickWrap() {

    let settingsList = await fetch('Resources/settings/list.json')
    let settingsJSON = await settingsList.json()
    let allHeaders = []


    for (let setting of settingsJSON) {
        if (typeof setting.header != 'undefined' && !allHeaders.includes(setting.header)) {
            allHeaders.push(setting.header)
        }
    }

    let settingsLoad = localStorage.getItem('swcsettings')

    settingsLoad = JSON.parse(settingsLoad)

    console.log(settingsJSON)

    settingsJSON.forEach((element) => {

        if (!settingsLoad.includes(element.name)) {
            settingsLoad.push(element.name)
            settingsLoad.push(element.value)
            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
        }
    })
}

quickWrap().then(() => {
    try{
        const root = document.documentElement;
        console.log("dark setting" + extractSetting('Dark Elements'))
        root.style.setProperty('--c1', hexCodeToRGB(extractSetting('Dark Elements')));
        root.style.setProperty('--c2', hexCodeToRGB(extractSetting('Somewhat Bright Elements')));
        root.style.setProperty('--c3', hexCodeToRGB(extractSetting('Light Elements')));
    }catch(e){
        console.warn(e)
    }

    let backgroundImageURL = extractSetting('Background Image')
    if(backgroundImageURL != ""){
        document.getElementById('content').style.backgroundImage = "url('" + backgroundImageURL + "')"
    }else{
        document.getElementById('content').style.backgroundImage = 'url("./resources/defaultbg.png")'
    }
})

console.log(localStorage.getItem('swcsettings'))

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

if(localStorage.getItem('swcFirstTime') == null) {
    localStorage.setItem('swcFirstTime', 'true')
    let welcomeSlides = new InfoSlides("resources/info/json/SwiftClass/slides.json")
    welcomeSlides.render()
}

window.denySettingMovement = false

if(localStorage.getItem('swcsettings') == null) localStorage.setItem('swcsettings',
    '[]'
)

document.querySelector('.footerButton').classList.add('deny')

const menu = new RadialMenu({
    parent: document.getElementById('container'),
    size: 200,
    closeOnClick: true,
    menuItems: [
        { id: 'Classes & Agendas', title: 'CA' },
        { id: 'Links', title: 'Links' },
        { id: 'Settings', title: 'Settings' },
        { id: 'SwiftClass', title: 'Home' },
        { id: 'About this Page', title: 'About'}
    ],
    onClick: async function(item) {
        if(item.id == 'About this Page'){
            showInfoSlides()
            return
        }
    if(window.denySettingMovement) return
      window.currentMenu = item.id
        if(!window.denySettingMovement){
            window.denySettingMovement = true
            updateMenus()
            resetAllFooters()
            let prettyHeader = ''
            if(window.currentMenu == 'SwiftClass'){
                prettyHeader = 'Home'
            }else if(window.currentMenu.includes('Settings')){
                prettyHeader = 'Settings'
            }
            else{
                prettyHeader = window.currentMenu
            }
            document.querySelectorAll('.footerButton').forEach(element => {
                if(element.textContent == prettyHeader){
                    element.classList.add('deny')
                }
            })
        }
    }
  });

window.settingHeaderType = ""

window.openedStatus = false

window.mousePosition = [window.innerWidth / 2, window.innerHeight / 2];

document.addEventListener('mousemove', (event) => {
    window.mousePosition = [event.clientX, event.clientY]
    if(!window.openedStatus){
    document.getElementById('container').style.left = String(window.mousePosition[0] - 1100) + 'px'
    document.getElementById('container').style.top = String(window.mousePosition[1] - 1100) + 'px'
    }
});

document.addEventListener('click', async (event) => {
    if(window.openedStatus && !document.getElementById('container').contains(event.target)){
        menu.close()
    }
});


window.addEventListener("keyup", async (event) => {
    if(event.keyCode === 32 && event.target == document.body){
        if(!openedStatus){
        event.preventDefault()
        // console.log("Opening menu")
        // console.log(window.mousePosition)

        window.openedStatus = true

        document.getElementById('container').style.left = String(window.mousePosition[0] - 110) + 'px'
        document.getElementById('container').style.top = String(window.mousePosition[1] - 105) + 'px'

        menu.open()

        await wait(300)

    }
    else
    {
        menu.close()
    }
}
})

window.addEventListener("mouseup", async (event) => {
    if(event.button == 2){
        if(!openedStatus){
            // event.preventDefault()
            // console.log("Opening menu")
            // console.log(window.mousePosition)

            window.openedStatus = true

            document.getElementById('container').style.left = String(window.mousePosition[0] - 110) + 'px'
            document.getElementById('container').style.top = String(window.mousePosition[1] - 105) + 'px'

            menu.open()

            await wait(300)

        }
        else
        {
            menu.close()
        }
    }
})

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
});

async function updateMenus() {
    let visitedMenus = JSON.parse(localStorage.getItem('visitedMenus'))

    if (visitedMenus == null) {
        visitedMenus = []
        localStorage.setItem('visitedMenus', JSON.stringify(visitedMenus))
    }

    if (!visitedMenus.includes(window.currentMenu)) {
        if (!window.currentMenu.includes('-')) {
            visitedMenus.push(window.currentMenu)
            localStorage.setItem('visitedMenus', JSON.stringify(visitedMenus))
            console.log("New menu visited: " + window.currentMenu)
            // play info slides
        } else {
            if (!window.currentMenu.includes('Settings')) {
                visitedMenus.push('Settings')
                localStorage.setItem('visitedMenus', JSON.stringify(visitedMenus))
                console.log("New menu visited: Settings")
            }
        }
    }

    if (document.querySelector('.openSlidesButton') != null) {
        document.querySelector('.openSlidesButton').remove()
    }

    if (document.getElementById('reloadButton') !== null) {
        document.getElementById('reloadButton').remove()
    }

    let prettyHeader = ''
    if (window.currentMenu == 'SwiftClass') {
        prettyHeader = 'Home'
    } else if (window.currentMenu.includes('Settings')) {
        prettyHeader = 'Settings'
    } else {
        prettyHeader = window.currentMenu
    }

    document.title = 'SwiftClass - ' + prettyHeader

    let baseContent = document.getElementById('baseContent')
    console.log("Updating menus")
    baseContent.classList.add('smallProp')
    typeMenuName()

    await wait(300)

    if (baseContent.classList.contains('forceClassesGrid')) {
        baseContent.classList.remove('forceClassesGrid')
    } else if (baseContent.classList.contains('forceLinksGrid')) {
        baseContent.classList.remove('forceLinksGrid')
    }


    document.getElementById('baseContent').innerHTML = ''

    // Central Switch Case

    switch (window.currentMenu) {
        case 'SwiftClass':
            homeGen()
            break;
        case 'Settings':
            settingsGen()
            break;
        case 'Classes & Agendas':
            classGen()
            break;
        case 'Links':
            break;
    }

    baseContent.classList.remove('smallProp')
}

updateMenus()