window.currentMenu = 'SwiftClass'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

if(localStorage.getItem('swcsettings') == null) localStorage.setItem('swcsettings'
    , JSON.stringify({
        'classesEnableNotif': true
    })
)

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


window.openedStatus = false

window.mousePosition = [0, 0]

document.addEventListener('mousemove', (event) => {
    window.mousePosition = [event.clientX, event.clientY]
    if(!window.openedStatus){
    document.getElementById('container').style.left = String(window.mousePosition[0] - 1100) + 'px'
    document.getElementById('container').style.top = String(window.mousePosition[1] - 1100) + 'px'
    }
});

window.addEventListener("keydown", (event) => {
    if(event.keyCode === 32 && event.target == document.body){
        if(!openedStatus){
        event.preventDefault()
        console.log("Opening menu")
        console.log(window.mousePosition)

        document.getElementById('container').style.left = String(window.mousePosition[0] - 100) + 'px'
        document.getElementById('container').style.top = String(window.mousePosition[1] - 100) + 'px'

        menu.open()

        window.openedStatus = true
    }
    else
    {
        menu.close()
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

    let len = window.currentMenu.length;
    
    let name = ''

    switch (window.currentMenu) {
        case 'SwiftClass':
            document.getElementById('baseContent').innerHTML = ''
            document.getElementById('baseContent').innerHTML = window.SwiftClassPage
            try{
                let jsonRequest = await fetch("Resources/News/display.json")
                let newsJSON = await jsonRequest.json()
                console.log(newsJSON)

                if('body' in newsJSON)
                {
                    newsJSON.body.forEach(element => {
                        let p = document.getElementById('newsTickerText')
                        let t = document.createElement('span')
                        t.textContent = element
                        p.appendChild(t)
                        p.appendChild(document.createElement('br'))
                    });
                }

                if('title' in newsJSON)
                {
                    document.getElementById('newsHeader').textContent = newsJSON.title
                }

                if(newsJSON.image){
                    let newsImage = document.createElement('img')
                    newsImage.src = 'Resources/News/display.png'
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
                case 'Settings':
                    document.getElementById('baseContent').innerHTML = ''

                    let settingsList = await fetch('Resources/settings/list.json')
                    let settingsJSON = await settingsList.json()
                    let allHeaders = []
                    
                    let headerContainer = document.createElement('div')
                    headerContainer.id = 'settingHeaderContainer'
                    headerContainer.classList.add('settingsHeaderContainer')
                    document.getElementById('baseContent').appendChild(headerContainer)

                    for(let item of settingsJSON){
                        let setting = new Setting(item.name, item.value, item.type, item.description, item.header, item.types)
                        setting.render()
                        console.log(setting) 
                        console.log(item)
                        if(typeof setting.header != 'undefined' && !allHeaders.includes(setting.header)){
                            allHeaders.push(setting.header)
                        }
                    }
                    break;
                default:
                    document.getElementById('baseContent').innerHTML = `<h1>${window.currentMenu}</h1><p>Content for ${window.currentMenu} will be added soon!</p>`
                break;
    }

    for(let i = 0; i < len;i++){
        name += window.currentMenu[i]
        
        await wait(45)

        document.getElementById('topHeader').textContent = name
    }
                    
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

    baseContent.style.height = String(mainParent.clientHeight / 1.15) + 'px'
    baseContent.style.width = String(mainParent.clientWidth / 1.1) + 'px'

    }catch(e){
        console.warn('dimensions err: ' + e)
    }
    }, 50);


    console.log("HI")

    try{
    let jsonRequest = await fetch("Resources/News/display.json")
    let newsJSON = await jsonRequest.json()
    console.log(newsJSON)

    if('body' in newsJSON)
    {
        newsJSON.body.forEach(element => {
            let p = document.getElementById('newsTickerText')
            let t = document.createElement('span')
            t.textContent = element
            p.appendChild(t)
            p.appendChild(document.createElement('br'))
        });
    }

    if('title' in newsJSON)
    {
        document.getElementById('newsHeader').textContent = newsJSON.title
    }

    if(newsJSON.image){
        let newsImage = document.createElement('img')
        newsImage.src = 'Resources/News/display.png'
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

buttons.forEach((element) => {
    element.addEventListener('click', (event) => {
         selfName = event.currentTarget.textContent.trim()
         if(selfName == 'Home') 
         {
            window.currentMenu = 'SwiftClass'
            updateMenus()
         }else{
            window.currentMenu = selfName
            updateMenus()
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

    baseContent.style.height = String(mainParent.clientHeight / 1.15) + 'px'
    baseContent.style.width = String(mainParent.clientWidth / 1.1) + 'px'
    
    }catch(e){
        console.warn('dimensions err: ' + e)
    }
    }, 50);

updateMenus()