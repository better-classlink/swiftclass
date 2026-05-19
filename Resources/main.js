window.currentMenu = 'SwiftClass'

if(localStorage.getItem('swcFirstTime') == null) {
    localStorage.setItem('swcFirstTime', 'true')
    let welcomeSlides = new InfoSlides("Resources/info/json/welcome/slides.json")
    welcomeSlides.render()
}

window.denySettingMovement = false

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

if(localStorage.getItem('swcsettings') == null) localStorage.setItem('swcsettings',
    '[]'
)

window.loadingTips = [
    "Tip: Use Ctrl + and Ctrl - to zoom and scale!",
    "Tip: Themes are coming soon!",
    "Tip: Stay focused. You'll be thankful later!",
    "Tip: Feel free to report any bugs you find to krienskam@gmail.com!",
    "Tip: Besides the using buttons at the bottom to move, you can also press Space to open the quick-move menu!",
]

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

      window.currentMenu = item.id
      updateMenus()
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

document.addEventListener('click', (event) => {
    if(window.openedStatus && !document.getElementById('container').contains(event.target)){
        menu.close()
        window.openedStatus = false
    }
});

window.addEventListener("keyup", async (event) => {
    if(event.keyCode === 32 && event.target == document.body){
        if(!openedStatus){
        event.preventDefault()
        // console.log("Opening menu")
        // console.log(window.mousePosition)

        document.getElementById('container').style.left = String(window.mousePosition[0] - 110) + 'px'
        document.getElementById('container').style.top = String(window.mousePosition[1] - 105) + 'px'

        menu.open()

        window.openedStatus = true
    }
    else
    {
        menu.close()
        await wait(300)
        window.openedStatus = false
    }
}
})

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
});

async function updateMenus(){
    console.log("Updating menus")
    let baseContent = document.getElementById('baseContent')
    baseContent.classList.add('smallProp')
    typeMenuName()

    await wait(300)

    // document.getElementById('topHeader').textContent = ''

    document.getElementById('baseContent').innerHTML = ''

    let tipText = document.createElement('span')
    tipText.classList.add('tipText')
    tipText.id = 'tipText'

    tipText.textContent = window.loadingTips[Math.floor(Math.random() * window.loadingTips.length)]

    // document.getElementById('main').appendChild(tipText)
    // document.getElementById('baseContent').style.display = 'none'

    // await wait(500)

    switch (window.currentMenu) {
        case 'SwiftClass':
            document.getElementById('baseContent').innerHTML = window.SwiftClassPage
            try{
                let jsonRequest = await fetch("Resources/news/display.json")
                let newsJSON = await jsonRequest.json()

                // let newsJSON = {"title": "example"}

                // console.log(newsJSON)

                if('body' in newsJSON)
                {
                    newsJSON.body.forEach(element => {
                        let p = document.getElementById('newsTickerText')
                        p.innerHTML += element + '<br>'
                    });
                }

                if('title' in newsJSON)
                {
                    document.getElementById('newsHeader').textContent = newsJSON.title
                }

                if(newsJSON.image){
                    let newsImage = document.createElement('img')
                    newsImage.src = 'Resources/news/display.png'
                    newsImage.classList.add('newsImage')
                    newsImage.id = 'newsImage'
                    let line = document.createElement('div')
                    line.classList.add('lineBreak')
                    document.getElementById('newsHeader').after(line)
                    document.getElementById('baseContent').appendChild(newsImage)
                }

                }catch(e){
                    console.warn("News fetch error: " + e.stack)
                }
                    break;

                // Settings menu is a bit more complex, it has to fetch the settings list, then create the header buttons based on the unique headers in the settings list, then render the settings of the selected header.

                case 'Settings':
                    // document.getElementById('baseContent').innerHTML = ''

                    let settingsList = await fetch('Resources/settings/list.json')
                    let settingsJSON = await settingsList.json()
                    let allHeaders = []
                    
                    let headerContainer = document.createElement('div')
                    headerContainer.id = 'settingsHeaderContainer'
                    headerContainer.classList.add('settingsHeaderContainer')
                    document.getElementById('baseContent').appendChild(headerContainer)

                    for(let setting of settingsJSON){
                        if(typeof setting.header != 'undefined' && !allHeaders.includes(setting.header)){
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
                        if(!settingsLoad.includes(element.name)){
                            settingsLoad.push(element.name)
                            settingsLoad.push(element.value)
                            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                        }
                        if(element.header == window.settingHeaderType){
                            let setting = new Setting(element.name, settingsLoad[settingsLoad.indexOf(element.name) + 1], element.type, element.description, element.header, element.types, String(element.minval), String(element.maxval), element.selectors)
                            setting.render()
                        }else{
                            // console.log('not of type')
                        }
                    })

                    let headerCont = document.getElementById('settingsHeaderContainer')

                    allHeaders.forEach((item) => {
                        let header = document.createElement('div')

                        header.classList.add('settingsHeader')
                        header.textContent = item
                        header.addEventListener('click', async (event)=> {
                            if(window.denySettingMovement)
                                {return}
                

                            window.settingHeaderType = event.currentTarget.textContent

                            window.currentMenu = 'Settings' + ' - ' + window.settingHeaderType

                            typeMenuName()
                            // window.denySettingMovement = true

                            // console.log(window.settingHeaderType)
                            // console.log(settingsJSON)

                            let liveChildNodes = document.getElementById('baseContent').childNodes
                            // console.log(liveChildNodes.length)
                            if(liveChildNodes && liveChildNodes.length > 1) {
                                while (liveChildNodes.length > 1) {
                                    liveChildNodes[1].remove()
                                }
                            }

                                
                        let valueType = null

                        let settingsLoad = localStorage.getItem('swcsettings')

                        settingsLoad = JSON.parse(settingsLoad)
                        // console.log('Loaded settings: ')
                        // console.log(settingsLoad)

                        settingsJSON.forEach(async (element) => {
                            if(!settingsLoad.includes(element.name)){
                                settingsLoad.push(element.name)
                                settingsLoad.push(element.value)
                                localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                            }
                            if(element.header == window.settingHeaderType){
                                let setting = new Setting(element.name, settingsLoad[settingsLoad.indexOf(element.name) + 1], element.type, element.description, element.header, element.types, element.minval, element.maxval, element.selectors)
                                setting.render()
                            }else{
                                // console.log('not of type')
                            }


                        // document.getElementById('topHeader').textContent = ''
                        // for(let i = 0;i < window.currentMenu.length;i++){
                        //     name += window.currentMenu[i]

                        //     await wait(45)

                        //     document.getElementById('topHeader').textContent = name
                        // }

                        // window.denySettingMovement = false

                        })
                        })
                        headerCont.appendChild(header)
                        }
                    )
                    break;
                    case 'Classes':
                        let classesList = localStorage.getItem('swcClasses')
                        if(classesList == null) classesList = '[]'
                        classesList = JSON.parse(classesList)

                        let classesHeaderContainer = document.createElement('div')
                        classesHeaderContainer.id = 'classesHeaderContainer'
                        classesHeaderContainer.classList.add('settingsHeaderContainer')
                        document.getElementById('baseContent').appendChild(classesHeaderContainer)

                        if(classesList.length == 0){
                            let noteText = document.createElement('span')
                            noteText.classList.add('settingsNoteText')
                            noteText.textContent = 'You have no classes added yet. Click the Add Class button to add one!'
                            document.getElementById('baseContent').appendChild(noteText)
                        }

                        let addClassButton = document.createElement('div')
                        addClassButton.classList.add('classButton')
                        addClassButton.textContent = 'Add Class'
                        addClassButton.id = 'addClassButton'
                        classesHeaderContainer.appendChild(addClassButton)

                        addClassButton.addEventListener('click', async (event) => {
                            if(document.getElementById('addClassContextMenu') != null) document.getElementById('addClassContextMenu').remove()
                            let contextMenu = document.createElement('div')
                            contextMenu.setAttribute('class', 'contextMenu small')
                            contextMenu.id = 'addClassContextMenu'
                            document.body.appendChild(contextMenu)
                            contextMenu.style.left = String(window.mousePosition[0] - contextMenu.clientWidth / 2) + 'px'
                            contextMenu.style.top = String(window.mousePosition[1] + contextMenu.clientHeight / 10) + 'px'
                            contextMenu.classList.remove('small')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                            let shortTitle = document.createElement('span')
                            shortTitle.textContent = 'Class Creator'
                            shortTitle.classList.add('contextTitle')
                            contextMenu.appendChild(shortTitle)

                            let classNameInput = document.createElement('input')
                            classNameInput.type = 'text'
                            classNameInput.id = 'classNameInput'
                            classNameInput.placeholder = 'Type in the name of your class...'
                            classNameInput.classList.add('contextInput')
                            contextMenu.appendChild(classNameInput)

                            contextMenu.appendChild(document.createElement('hr'))

                            let classTeacherInput = document.createElement('input')
                            classTeacherInput.type = 'text'
                            classTeacherInput.id = 'classTeacherInput'
                            classTeacherInput.placeholder = 'Type in the name of your teacher...'
                            classTeacherInput.classList.add('contextInput')
                            contextMenu.appendChild(classTeacherInput)  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                        document.addEventListener('click', async (event) => {
                            try{
                            if(!document.getElementById('addClassContextMenu').contains(event.target) && !document.getElementById('addClassButton').contains(event.target)){
                                document.getElementById('addClassContextMenu').classList.add('small')
                                await wait(250)
                                document.getElementById('addClassContextMenu').remove()
                                }
                            }catch(e){
                                console.warn(e)
                            }
                        })
                    })
                    break;
                default:
                    document.getElementById('baseContent').innerHTML = `<h1>${window.currentMenu}</h1><p>Content for ${window.currentMenu} will be added soon!</p>`
                break;
    }














    // document.getElementById('tipText')?.remove()
    // document.getElementById('baseContent').style.display = 'block'

    window.denySettingMovement = true

    // for(let i = 0; i < window.currentMenu.length;i++){
    //     name += window.currentMenu[i]
    //
    //     await wait(45)
    //
    //     // document.getElementById('topHeader').textContent = name
    // }

    window.denySettingMovement = false

    await wait(300)

    baseContent.classList.remove('smallProp')

    console.log("Updated menus")
}

window.addEventListener('contextmenu', (event) => {
    if(!window.controlKeyPressed){
    event.preventDefault()
    }
});

async function loadMenu(){
    const baseContent = document.getElementById('baseContent')
    const mainParent = baseContent.parentElement
    const newsImage = document.getElementById("newsImage")
    setInterval(() => {
    try{

    // baseContent.style.height = String(mainParent.clientHeight / 1.15) + 'px'
    // baseContent.style.width = String(mainParent.clientWidth / 1.1) + 'px'

    }catch(e){
        console.warn('dimensions err: ' + e)
    }
    }, 5);


    // console.log("HI")

    try{
    let jsonRequest = await fetch("Resources/news/display.json")
    let newsJSON = await jsonRequest.json()
    // console.log(newsJSON)

    if('body' in newsJSON)
    {
        newsJSON.body.forEach(element => {
            let p = document.getElementById('newsTickerText')
            p.textCotent += element
        });
    }

    if('title' in newsJSON)
    {
        document.getElementById('newsHeader').textContent = newsJSON.title
    }

    if(newsJSON.image){
        let newsImage = document.createElement('img')
        newsImage.src = 'Resources/news/display.png'
        newsImage.classList.add('newsImage')
        newsImage.id = 'newsImage'
        let line = document.createElement('div')
        line.classList.add('lineBreak')
        document.getElementById('newsHeader').after(line)
        document.getElementById('baseContent').appendChild(newsImage)
    }

    }catch(e){
        console.warn("News fetch error: " + e.stack)
    }
}

let buttons = document.querySelectorAll(".footerButton")

setInterval(() => {
    console.log(window.denySettingMovement)
}, 100);

async function typeMenuName(){
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
}

buttons.forEach((element) => {
    if(window.denySettingMovement) return
    element.addEventListener('click', (event) => {
         selfName = event.currentTarget.textContent.trim()
         if(selfName == 'Home') 
         {
            window.currentMenu = 'SwiftClass'
            if(!window.denySettingMovement){
            window.denySettingMovement = true
            updateMenus()
            }
         }else{
            window.currentMenu = selfName
            if(!window.denySettingMovement){
            window.denySettingMovement = true
            updateMenus()
            }
         }
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

    document.title = 'SwiftClass - ' + completeTime
}, 100);


window.SwiftClassPage = document.getElementById('baseContent').innerHTML

const baseContent = document.getElementById('baseContent')
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

updateMenus()