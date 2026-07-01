window.currentMenu = 'SwiftClass'

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function quickWrap() {
    if(localStorage.getItem('swcsettings') == null) localStorage.setItem('swcsettings',
        '[]'
    )
    let settingsList = await fetch('Resources/settings/list.json')
    let settingsJSON = await settingsList.json()
    let allHeaders = []

    let headerContainer = document.createElement('div')
    headerContainer.id = 'settingsHeaderContainer'
    headerContainer.classList.add('settingsHeaderContainer')
    document.getElementById('baseContent').appendChild(headerContainer)

    for (let setting of settingsJSON) {
        if (typeof setting.header != 'undefined' && !allHeaders.includes(setting.header)) {
            allHeaders.push(setting.header)
        }
    }

    let settingsLoad = localStorage.getItem('swcsettings')

    settingsLoad = JSON.parse(settingsLoad)
    // console.log('Loaded settings: ')
    // console.log(settingsLoad)

    console.log(settingsJSON)

    settingsJSON.forEach((element) => {
        // console.log(element)
        if (!settingsLoad.includes(element.name)) {
            settingsLoad.push(element.name)
            settingsLoad.push(element.value)
            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
        }
    })
}

quickWrap()

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



const root = document.documentElement;
root.style.setProperty('--c1', hexCodeToRGB(extractSetting('Dark Elements')));
root.style.setProperty('--c2', hexCodeToRGB(extractSetting('Somewhat Bright Elements')));
root.style.setProperty('--c3', hexCodeToRGB(extractSetting('Light Elements')));


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

const menu = new RadialMenu({
    parent: document.getElementById('container'),
    size: 200,
    closeOnClick: true,
    menuItems: [
      { id: 'Classes', title: 'Classes' },
      { id: 'Links', title: 'Links' },
      { id: 'Agendas', title: 'Agendas' },
      { id: 'Settings', title: 'Settings' },
      { id: 'SwiftClass', title: 'Home' },
    ],
    onClick: async function(item) {
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
                if(element.children[0].textContent == prettyHeader){
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

    if(visitedMenus == null){
        visitedMenus = []
        localStorage.setItem('visitedMenus', JSON.stringify(visitedMenus))
    }

    if(!visitedMenus.includes(window.currentMenu)){
        if(!window.currentMenu.includes('-')) {
            visitedMenus.push(window.currentMenu)
            localStorage.setItem('visitedMenus', JSON.stringify(visitedMenus))
            console.log("New menu visited: " + window.currentMenu)
            // play info slides
        }else{
            if(!window.currentMenu.includes('Settings')){
                visitedMenus.push('Settings')
                localStorage.setItem('visitedMenus', JSON.stringify(visitedMenus))
                console.log("New menu visited: Settings")
            }
        }
    }

    if(document.querySelector('.openSlidesButton') != null){
        document.querySelector('.openSlidesButton').remove()
    }

    if(document.getElementById('reloadButton') !== null){
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

    // document.getElementById('topHeader').textContent = ''

    document.getElementById('baseContent').innerHTML = ''

    switch (window.currentMenu) {
        case 'SwiftClass':
            document.getElementById('baseContent').innerHTML = window.SwiftClassPage
            try {
                let jsonRequest = await fetch("Resources/news/display.json")
                let newsJSON = await jsonRequest.json()

                // let newsJSON = {"title": "example"}

                // console.log(newsJSON)

                if ('body' in newsJSON) {
                    let p = document.getElementById('newsTickerText')
                    p.innerHTML = newsJSON.body.join('<br>')
                }

                if ('title' in newsJSON) {
                    document.getElementById('newsHeader').textContent = newsJSON.title
                }

                if (newsJSON.image) {
                    let newsImage = document.createElement('img')
                    newsImage.src = 'resources/news/display.png'
                    newsImage.classList.add('newsImage')
                    newsImage.id = 'newsImage'
                    let line = document.createElement('div')
                    line.classList.add('lineBreak')
                    document.getElementById('newsHeader').after(line)
                    document.getElementById('baseContent').appendChild(newsImage)
                }

            } catch (e) {
                console.warn("news fetch error: " + e.stack)
            }
            break;
        case 'Settings':
            // document.getElementById('baseContent').innerHTML = ''


            let settingsList = await fetch('Resources/settings/list.json')
            let settingsJSON = await settingsList.json()
            let allHeaders = []

            let headerContainer = document.createElement('div')
            headerContainer.id = 'settingsHeaderContainer'
            headerContainer.classList.add('settingsHeaderContainer')
            document.getElementById('baseContent').appendChild(headerContainer)

            for (let setting of settingsJSON) {
                if (typeof setting.header != 'undefined' && !allHeaders.includes(setting.header)) {
                    allHeaders.push(setting.header)
                }
            }

            window.settingHeaderType = allHeaders[0]

            window.currentMenu = 'Settings' + ' - ' + window.settingHeaderType

            let valueType = null

            let settingsLoad = localStorage.getItem('swcsettings')

            settingsLoad = JSON.parse(settingsLoad)
            // console.log('Loaded settings: ')
            // console.log(settingsLoad)

            settingsJSON.forEach((element) => {
                // console.log(element)
                if (!settingsLoad.includes(element.name)) {
                    settingsLoad.push(element.name)
                    settingsLoad.push(element.value)
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                }
                if (element.header == window.settingHeaderType) {
                    let setting = new Setting(element.name, settingsLoad[settingsLoad.indexOf(element.name) + 1], element.type, element.description, element.header, element.types, String(element.minval), String(element.maxval), element.selectors)
                    setting.render()
                } else {
                    // console.log('not of type')
                }
            })

            let headerCont = document.getElementById('settingsHeaderContainer')

            allHeaders.forEach((item) => {
                    let header = document.createElement('div')

                    header.classList.add('settingsHeader')
                    header.textContent = item
                    header.addEventListener('click', async (event) => {

                        if (window.denySettingMovement || event.currentTarget.classList.contains('deny')) {
                            return
                        }

                        window.settingHeaderType = event.currentTarget.textContent

                        window.currentMenu = 'Settings' + ' - ' + window.settingHeaderType

                        document.querySelectorAll('.footerButton').forEach(element => {
                            element.classList.add('deny')
                        })

                        typeMenuName(true)

                        let liveChildNodes = document.getElementById('baseContent').childNodes
                        if (liveChildNodes && liveChildNodes.length > 1) {
                            while (liveChildNodes.length > 1) {
                                liveChildNodes[1].remove()
                            }

                        }

                        try {

                            let test = await fetch("./Resources/info/json/" + window.currentMenu + "/slides.json").then(
                                () => {
                                    let testOther = test.json()
                                }
                            )

                        } catch (e) {
                            console.warn(e)

                            slidesOpenButton.classList.add('deny')
                        }

                        slidesOpenButton.addEventListener('click', (event) => {
                            if (event.currentTarget.classList.contains('deny')) return
                            infoSlides.render()
                        })
                        document.getElementById('main').appendChild(slidesOpenButton)

                        let valueType = null

                        let settingsLoad = localStorage.getItem('swcsettings')

                        settingsLoad = JSON.parse(settingsLoad)
                        // console.log('Loaded settings: ')
                        // console.log(settingsLoad)

                        settingsJSON.forEach(async (element) => {
                            if (!settingsLoad.includes(element.name)) {
                                settingsLoad.push(element.name)
                                settingsLoad.push(element.value)
                                localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                            }
                            if (element.header == window.settingHeaderType) {
                                let setting = new Setting(element.name, settingsLoad[settingsLoad.indexOf(element.name) + 1], element.type, element.description, element.header, element.types, element.minval, element.maxval, element.selectors)
                                setting.render()
                            }
                        })
                        let reloadButton = document.createElement('div')
                        reloadButton.classList.add('reloadButton')
                        reloadButton.textContent = 'Reload the Page'
                        reloadButton.addEventListener('click', () => {
                            location.reload()
                        })
                        document.getElementById('baseContent').appendChild(reloadButton)
                    })
                    headerCont.appendChild(header)
                }
            )
            let reloadButton = document.createElement('div')
            reloadButton.classList.add('reloadButton')
            reloadButton.textContent = 'Reload the Page'
            reloadButton.addEventListener('click', () => {
                location.reload()
            })
            document.getElementById('baseContent').appendChild(reloadButton)
            break;
        case 'Classes':
            classGen()
            // i put everything in the one js file. >:D
            break;
        case 'Links':
            if (localStorage.getItem('swclinks') == null) {
                localStorage.setItem('swclinks', JSON.stringify([]))
            }
            baseContent.classList.add('forceLinksGrid')

            let leftPane = document.createElement('div')
            leftPane.classList.add('linksPane')
            baseContent.appendChild(leftPane)

            let rightPane = document.createElement('div')
            rightPane.classList.add('linksPane')
            baseContent.appendChild(rightPane)

            // basic setup done, now headers

            let leftPaneHeader = document.createElement('h1')
            leftPaneHeader.textContent = "Types of Links"
            leftPaneHeader.classList.add('leftPaneHeader')
            leftPane.appendChild(leftPaneHeader)

            leftPane.appendChild(document.createElement('hr'))

            let rightPaneHeader = document.createElement('h1')
            rightPaneHeader.textContent = "Your Links"
            rightPaneHeader.classList.add('rightPaneHeader')
            rightPane.appendChild(rightPaneHeader)

            rightPane.appendChild(document.createElement('hr'))

            // now the links and buttons etc

            let types = []

            let linksJSON = JSON.parse(localStorage.getItem('swclinks'))
            linksJSON.forEach(async (element) => {
                if (!types.includes(element.type)) {
                    types.push(element.type)
                }
                console.log(types)
            })

            let addTypeButton = document.createElement('div')
            addTypeButton.classList.add('linkButtonStacker')
            addTypeButton.classList.add('contextMenuOpen')
            addTypeButton.textContent = 'Add new Type'
            leftPane.appendChild(addTypeButton)
            addTypeButton.addEventListener('click', (event) => {
                linkButtonAdder(event, 'Type')
            })
            break;
        default:
            document.getElementById('baseContent').innerHTML = `<h1>${window.currentMenu}</h1><p>Content for ${window.currentMenu} will be added soon!</p>`
            break;
    }



    window.denySettingMovement = true

    window.denySettingMovement = false

    await wait(300)

    baseContent.classList.remove('smallProp')

    console.log("Updated menus")

    let slidesOpenButton = document.createElement('div')
    slidesOpenButton.classList.add('openSlidesButton')
    slidesOpenButton.textContent = 'i'

    try {

        let test = await fetch("./Resources/info/json/" + window.currentMenu + "/slides.json").then(
            (test) => {
                let testOther = test.json()
            }
        )

    } catch (e) {
        console.warn(e)

        slidesOpenButton.classList.add('deny')
    }
    if (!slidesOpenButton.classList.contains(('deny'))) {
        slidesOpenButton.addEventListener('click', () => {
            let infoSlides = new InfoSlides("resources/info/json/" + window.currentMenu + "/slides.json")
            infoSlides.render()
        })
    }
    document.getElementById('main').appendChild(slidesOpenButton)

    // annoying webkit thing

    await wait(5)
    slidesOpenButton.style.transform = 'scale(0.7)'
    await wait(5)
    slidesOpenButton.style.transform = 'none'
}

window.addEventListener('contextmenu', (event) => {
    if(!window.controlKeyPressed){
    event.preventDefault()
    }

    document.querySelectorAll('button')
        .forEach((ele) => {
        console.log(ele.id)
    })
});


let buttons = document.querySelectorAll(".footerButton")

setInterval(() => {
    // console.log(window.denySettingMovement)
}, 100);

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

buttons.forEach((element) => {
    if(window.denySettingMovement) return
    element.addEventListener('click', (event) => {
        if(event.currentTarget.classList.contains('deny')) return
         let selfName = event.currentTarget.textContent.trim()
         if(selfName == 'Home')
         {
            window.currentMenu = 'SwiftClass'
            if(!window.denySettingMovement){
            window.denySettingMovement = true
            updateMenus()
            }
         }
         else{
            window.currentMenu = selfName
            if(!window.denySettingMovement){
            window.denySettingMovement = true
            updateMenus()
            }
         }
         resetAllFooters()
         event.currentTarget.classList.add('deny')
    })
})

// Time Ticker

setInterval(() => {
    let dateObj = new Date()
    let hrs = dateObj.getHours()
    let type = 'AM'
    if(hrs > 12){
        hrs -= 12
        type = 'PM'
    }
    if(hrs == 0){
        hrs = 12
        type = 'AM'
    }
    let mins = String(dateObj.getMinutes())
    if(mins.length == 1) mins = '0' + mins

    let secs = String(dateObj.getSeconds())
    if(secs.length == 1) secs = '0' + secs

    let completeTime = `${hrs}:${mins}:${secs} ${type}`

    document.getElementById('timeTicker').textContent = completeTime

    // document.title = 'SwiftClass - ' + completeTime
}, 100);


window.SwiftClassPage = document.getElementById('baseContent').innerHTML

// const baseContent = document.getElementById('baseContent')
    const mainParent = baseContent.parentElement
    setInterval(() => {
    try{

    // baseContent.style.height = String(mainParent.clientHeight / 1.15) + 'px'
    // baseContent.style.width = String(mainParent.clientWidth / 1.1) + 'px'
    //
    }catch(e){
        console.warn('dimensions err: ' + e)
    }
    }, 5);


let lastURL = location.href

setInterval(async () => {
    if(location.href != lastURL){
        lastURL = location.href
        console.log('URL changed: ' + lastURL)
    }
})

updateMenus()