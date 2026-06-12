window.currentMenu = 'SwiftClass'

if(localStorage.getItem('swcFirstTime') == null) {
    localStorage.setItem('swcFirstTime', 'true')
    let welcomeSlides = new InfoSlides("resources/info/json/SwiftClass/slides.json")
    welcomeSlides.render()
}

document.addEventListener('click', closeMenu)
document.addEventListener('keydown', closeMenuOnEsc)

window.denySettingMovement = false

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    try{
    if(document.getElementById('contextMenu') == null) return
    if(document.querySelector('.contextMenuOpen').contains(event.target)) return
        document.getElementById('contextMenu').classList.add('close')
        await wait(300)
        document.getElementById('contextMenu').remove()
    }catch(e){
        console.warn(e)
    }
}

async function closeMenuOnEsc(event){
    if(event.key == 'Escape'){
        closeMenu(event)
    }
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

                        typeMenuName()

                        let liveChildNodes = document.getElementById('baseContent').childNodes
                        if (liveChildNodes && liveChildNodes.length > 1) {
                            while (liveChildNodes.length > 1) {
                                liveChildNodes[1].remove()
                            }

                        }

                        let slidesOpenButton = document.createElement('div')
                        slidesOpenButton.classList.add('openSlidesButton')
                        slidesOpenButton.textContent = 'i'

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
                        document.getElementById('baseContent').appendChild(slidesOpenButton)

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
                    })
                    headerCont.appendChild(header)
                }
            )
            break;
        case 'Classes':
            baseContent.classList.add('forceClassesGrid')

            let classesList = localStorage.getItem('swcClasses')

            if (classesList == null) {
                localStorage.setItem('swcClasses', '[{"name":"Example Class","teacher":"SwiftClass Developers","link":"","block":"1"}]')
            }

            classesList = localStorage.getItem('swcClasses')
            classesList = JSON.parse(classesList)

            let classesStack = document.createElement('div')
            classesStack.classList.add('classesStack')
            baseContent.appendChild(classesStack)

            let classesTitle = document.createElement('span')
            classesTitle.textContent = "Your Classes"
            classesTitle.classList.add('classesTitle')

            classesStack.appendChild(classesTitle)

            classesStack.appendChild(document.createElement('hr'))

            classesList.forEach((classObject, index) => {
                let savedObj = classObject
                let selectionButton = document.createElement('div')
                selectionButton.textContent = classObject.name
                selectionButton.classList.add('buttonStacker')
                selectionButton.addEventListener('click', (event) => {
                    if (savedObj.block == '') {
                        savedObj.block = '1'
                    }
                    console.log(savedObj.link)
                    let visualClass = new Class(savedObj.name, savedObj.teacher, savedObj.block, savedObj.link, index)
                    visualClass.render()
                })
                classesStack.appendChild(selectionButton)

                if(savedObj.link != ''){
                    let linkButton = document.createElement('div')
                    linkButton.classList.add('buttonStacker')
                    linkButton.classList.add('smallButton')
                    linkButton.textContent = 'Link'
                    classesStack.appendChild(linkButton)
                }
                // classesStack.appendChild(document.createElement('br'))
            })

            // Final Button After Full Stack

            let addClassButton = document.createElement('div')
            addClassButton.classList.add('contextMenuOpen')
            addClassButton.addEventListener('click', classButtonAdder)

            // Final Button After Full Stack

            addClassButton.classList.add('addButtonStacker')
            addClassButton.id = 'addClassButton'
            addClassButton.textContent = 'Add Class'
            classesStack.appendChild(addClassButton)

            let classesPane = document.createElement('div')
            classesPane.classList.add('classesPane')
            baseContent.appendChild(classesPane)
            classesPane.textContent = 'Click a class on the left to view it. Click the "Add Class" button to add a new class!'
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
    document.getElementById('baseContent').appendChild(slidesOpenButton)
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

async function classButtonAdder(event) {
    if (document.getElementById('contextMenu') != null) document.getElementById('contextMenu').remove()
    let contextMenu = document.createElement('div')
    contextMenu.classList.add('contextMenu')
    contextMenu.classList.add('small')
    contextMenu.id = 'contextMenu'
    document.body.appendChild(contextMenu)
    contextMenu.style.left = String(window.innerWidth / 2 - (contextMenu.clientWidth / 2)) + 'px'
    contextMenu.style.top = String(window.innerHeight / 2 - (contextMenu.clientHeight / 2)) + 'px'
    contextMenu.classList.remove('small')

    let shortTitle = document.createElement('span')
    shortTitle.textContent = 'Class Creator'
    shortTitle.classList.add('contextTitle')
    contextMenu.appendChild(shortTitle)

    contextMenu.appendChild(document.createElement('hr'))

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

    contextMenu.appendChild(document.createElement('hr'))

    let classLinkInput = document.createElement('input')
    classLinkInput.type = 'text'
    classLinkInput.id = 'classLinkInput'
    classLinkInput.placeholder = 'Type a link with the class (optional, but recommended)...'
    classLinkInput.classList.add('contextInput')
    contextMenu.appendChild(classLinkInput)

    contextMenu.appendChild(document.createElement('hr'))

    let submitButton = document.createElement('div')
    submitButton.classList.add('contextButton')
    submitButton.textContent = 'Submit and Reload'
    contextMenu.appendChild(submitButton)

    submitButton.addEventListener('click', async (event) => {
        let className = document.getElementById('classNameInput').value
        let classTeacher = document.getElementById('classTeacherInput').value
        let classLink = document.getElementById('classLinkInput').value
        if (className.length == 0 || classTeacher.length == 0) {
            alert('Please fill in at least the class name and teacher fields!')
            return
        }
        if (classLink.length > 0 && !classLink.startsWith('http')) {
            alert('Please enter a valid link that starts with http!')
            return
        }
        if (classLink.length == 0) {
            classLink = ''
        }

        let newClass = {
            name: className,
            teacher: classTeacher,
            link: classLink,
            block: "1"
        }

        let classesList = localStorage.getItem('swcClasses')
        if (classesList == '') classesList = '[]'
        classesList = JSON.parse(classesList)
        classesList.push(newClass)
        localStorage.setItem('swcClasses', JSON.stringify(classesList))
        document.getElementById('contextMenu').classList.add('small')
        await wait(100)
        document.getElementById('contextMenu').remove()
        updateMenus()
    })
}

async function linkButtonAdder(event, type) {
    if (document.getElementById('contextMenu') != null) document.getElementById('contextMenu').remove()
    let contextMenu = document.createElement('div')
    contextMenu.classList.add('contextMenu')
    contextMenu.classList.add('small')
    contextMenu.id = 'contextMenu'
    document.body.appendChild(contextMenu)
    contextMenu.style.left = String(window.innerWidth / 2 - (contextMenu.clientWidth / 2)) + 'px'
    contextMenu.style.top = String(window.innerHeight / 2 - (contextMenu.clientHeight / 2)) + 'px'
    contextMenu.classList.remove('small')

    let shortTitle = document.createElement('span')
    shortTitle.textContent = type + ' Creator'
    shortTitle.classList.add('contextTitle')
    contextMenu.appendChild(shortTitle)

    contextMenu.appendChild(document.createElement('hr'))

    let linkNameInput = document.createElement('input')
    linkNameInput.type = 'text'
    linkNameInput.id = 'linkNameInput'
    linkNameInput.placeholder = 'Type in the name of your ' + type
    linkNameInput.classList.add('contextInput')
    contextMenu.appendChild(linkNameInput)

    contextMenu.appendChild(document.createElement('hr'))
    if(type == 'link') {
        let linkTeacherInput = document.createElement('input')
        linkTeacherInput.type = 'text'
        linkTeacherInput.id = 'linkTypeInput'
        linkTeacherInput.placeholder = 'Type in the type of your ' + type
        linkTeacherInput.classList.add('contextInput')
        contextMenu.appendChild(linkTeacherInput)

        contextMenu.appendChild(document.createElement('hr'))
        let linkLinkInput = document.createElement('input')
        linkLinkInput.type = 'text'
        linkLinkInput.id = 'linkLinkInput'
        linkLinkInput.placeholder = 'Type in the actual link...'
        linkLinkInput.classList.add('contextInput')
        contextMenu.appendChild(linkLinkInput)
    }

    if(type == 'link'){
    contextMenu.appendChild(document.createElement('hr'))
        }

    let submitButton = document.createElement('div')
    submitButton.classList.add('contextButton')
    submitButton.textContent = 'Submit and Reload'
    contextMenu.appendChild(submitButton)


    submitButton.addEventListener('click', async (event) => {
        let linkName = document.getElementById('linkNameInput').value
        let linkType = document.getElementById('linkTypeInput').value
        let linkLink = document.getElementById('linkLinkInput').value
        if (linkName.length == 0 || linkType.length == 0 || linkLink.length == 0) {
            alert('Please fill in all fields!')
            return
        }
        if (linkLink.length > 0 && !linkLink.startsWith('http')) {
            alert('Please enter a valid link that starts with http!')
            return
        }
        if (linkLink.length == 0) {
            linkLink = ''
        }

        let newlink = {
            name: linkName,
            type: linkType,
            link: linkLink,
        }
        document.addEventListener('click', closeMenu)
        document.addEventListener('keydown', closeMenuOnEsc)

        let linksList = localStorage.getItem('swclinks')
        if (linksList == '') linksList = '[]'
        linksList = JSON.parse(linksList)
        linksList.push(newlink)
        localStorage.setItem('swclinks', JSON.stringify(linksList))
        document.getElementById('contextMenu').classList.add('small')
        await wait(100)
        document.getElementById('contextMenu').remove()
        updateMenus()
    })
}

let lastURL = location.href

setInterval(async () => {
    if(location.href != lastURL){
        lastURL = location.href
        console.log('URL changed: ' + lastURL)
    }
})

updateMenus()