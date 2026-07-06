class Setting {
    constructor(name, value, type, description, header, types, minval, maxval, selectors) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description
        this.header = header
        this.types = types
        this.minval = minval
        this.maxval = maxval
        this.selectors = selectors

        // adding the setting to the "baseContent" element

        // verifying types FIRST

        if (!['bool', 'dropdown', 'color', 'slider', 'text'].includes(this.type)) {
            throw new Error("Invalid type: " + this.type)
        }

        // verifying there are no duplicates

        if (document.getElementById(this.name) != null) throw new Error("Duplicate ID: " + this.name)
    }

    render() {
        try {
            // console.log("Rendering setting: " + this.name)
            if (this.type == 'bool') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')

                t.classList.add('boolHeader')

                t.textContent = this.name

                let i = document.createElement('div')

                i.dataset.imgSource = 'resources/svg/setting/' + this.value + '.png'

                i.classList.add('boolImageContainer')

                let img = document.createElement('img')

                img.src = i.dataset.imgSource

                i.appendChild(img)

                img.classList.add('boolImage')


                i.addEventListener('click', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    if (this.value == 'off') {
                        this.value = 'on'
                    } else {
                        this.value = 'off'
                    }

                    let settingsLoad = localStorage.getItem('swcsettings')

                    settingsLoad = JSON.parse(settingsLoad)

                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = this.value

                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))

                    event.currentTarget.children[0].src = 'resources/svg/setting/' + this.value + '.png'
                });

                let d = document.createElement('span')

                d.textContent = this.description

                document.getElementById('baseContent').appendChild(b)

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(d)
            } else if (this.type == 'color') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name

                let i = document.createElement('input')
                i.type = 'color'
                i.value = this.value

                i.classList.add('colorInput')

                if(this.name == "Somewhat Bright Elements"){
                    i.style.backgroundColor = "rgb(var(--c1))"
                }

                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    this.value = event.currentTarget.value
                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = this.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                });

                let d = document.createElement('span')
                d.textContent = this.description

                document.getElementById('baseContent').appendChild(b)

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(document.createElement('br'))

                b.appendChild(d)

            } else if (this.type == 'slider') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name

                let v = document.createElement('span')
                v.classList.add('valueDisplay')
                v.textContent = this.value

                let i = document.createElement('input')
                i.type = 'range'
                i.value = this.value
                i.min = this.minval
                console.log(this.maxval)
                console.log(this.minval)
                i.max = this.maxval

                i.classList.add('sliderInput')

                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    this.value = event.currentTarget.value
                    v.textContent = this.value
                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = this.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                })

                let d = document.createElement('span')
                d.textContent = this.description

                b.appendChild(t)
                b.appendChild(document.createElement('br'))
                b.appendChild(v)
                b.appendChild(document.createElement('br'))
                b.appendChild(i)
                b.appendChild(document.createElement('br'))
                b.appendChild(d)

                document.getElementById('baseContent').appendChild(b)
            } else if (this.type == 'dropdown') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name

                let i = document.createElement('select')
                i.classList.add('dropdownInput')

                this.selectors.forEach((element) => {
                    let option = document.createElement('option')
                    option.value = element
                    option.textContent = element
                    i.appendChild(option)
                });

                i.value = this.value

                i.addEventListener('change', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = event.currentTarget.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                })

                let d = document.createElement('span')
                d.textContent = this.description

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(document.createElement('br'))

                b.appendChild(d)

                document.getElementById('baseContent').appendChild(b)
            }
            else if (this.type == 'text') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name
                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name
                let i = document.createElement('input')
                i.type = 'text'
                i.value = this.value
                i.classList.add('textInput')
                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){}
                })
                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }

                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = event.currentTarget.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                })
                let d = document.createElement('span')
                d.textContent = this.description
                b.appendChild(t)
                b.appendChild(document.createElement('br'))
                b.appendChild(i)
                b.appendChild(document.createElement('br'))
                b.appendChild(d)
                document.getElementById('baseContent').appendChild(b)
            }

        } catch (e) {
            console.warn(e)
        }

    }
}

window.Setting = Setting



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GENERATOR FUNCTION


async function settingsGen(){


    let settingsList = await fetch('Resources/settings/list.json')
    let settingsJSON = await settingsList.json()
    let allHeaders = []

    let headerContainer = document.createElement('div')
    headerContainer.id = 'settingsHeaderContainer'
    headerContainer.classList.add('settingsHeaderContainer')
    document.getElementById('baseContent').appendChild(headerContainer)

    const distCheck = setInterval((e) => {
        let cont = document.getElementById('settingsHeaderContainer')
        let rect = null
        try {
            rect = cont.getBoundingClientRect()
        }catch (e) {
            clearInterval(distCheck)
        }

        let y = rect.top + rect.height / 2

        let dy = y - window.mousePosition[1]

        dy = Math.abs(dy)
        if(dy > 100){
            if(!cont.classList.contains('shrinkVertically')){
                cont.classList.add('shrinkVertically')
            }
        }
        else{
            if(cont.classList.contains('shrinkVertically')){
                cont.classList.remove('shrinkVertically')
            }
        }
    }, 10)

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

                }

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

}