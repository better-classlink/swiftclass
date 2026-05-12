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

document.addEventListener("mousedown", (event) => {
    if(event.button == 2 && !window.controlKeyPressed){
        if(!openedStatus){

        document.getElementById('container').style.left = String(event.clientX - 100) + 'px'
        document.getElementById('container').style.top = String(event.clientY - 100) + 'px'

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
                    document.getElementById('baseContent').replaceChildren()
                    let testSetting = new Setting('Example Setting', 'off', 'bool', 'This is a test setting')
                    testSetting.render()
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
console.log(buttons)
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

updateMenus().then(() => {console.log("Menu loaded!")})