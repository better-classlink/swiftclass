class ContextMenu {

    constructor(menuItems, menuType, itemValues) {
        this.menuItems = menuItems
        this.menuType = menuType
        this.itemValues = itemValues
        this.data = []
    }

    async build() {
        let validTypes =
        [
            'link',
            'teacher',
            'name',
            'color',
            'block'
        ]

        this.menuItems.forEach(element => {
            if(!validTypes.includes(element)) throw new Error('Invalid type: ' + element)
        })

        if (document.getElementById('contextMenu') != null) document.getElementById('contextMenu').remove()
        let contextMenu = document.createElement('div')
        contextMenu.classList.add('contextMenu')
        contextMenu.classList.add('small')
        contextMenu.id = 'contextMenu'
        document.body.appendChild(contextMenu)

        let shortTitle = document.createElement('span')
        shortTitle.textContent = this.menuType
        shortTitle.classList.add('contextTitle')
        contextMenu.appendChild(shortTitle)

        contextMenu.appendChild(document.createElement('hr'))

        this.menuItems.forEach(element => {
            this.data.push(null)
        })

        this.data.push(false)

        this.linkIndices = []

        this.overrides = []

        // Start Generator

        this.menuItems.forEach((element, index) => {


            let e = document.createElement('input')
            let l = document.createElement('span')

            switch(element) {
                case 'link':
                    e.type = 'text'

                    if(this.menuType.toLowerCase() == 'class') {
                        e.placeholder = 'Type in the class\'s link here. This is optional.'
                        this.overrides.push(index)
                    }
                    else e.placeholder = 'Type in the link here.'

                    e.placeholder = 'Type in the associated link here.'
                    if(typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                    e.classList.add('contextInput')
                    e.classList.add('linkInput')
                    e.id = 'linkInput'

                    this.linkIndices.push(index)

                    e.addEventListener('input', (event) => {
                        this.data[index] = event.target.value
                    })

                    l.classList.add('contextTip')
                    l.textContent = "Link"

                    contextMenu.appendChild(l)
                    contextMenu.appendChild(document.createElement('br'))
                    contextMenu.appendChild(e)
                    contextMenu.appendChild(document.createElement('hr'))
                    break;
                case 'teacher':
                    e.type = 'text'
                    e.placeholder = 'Type in the class\'s teacher here.'
                    if(typeof this.itemValues[index] == 'string') e.value = this.itemValues[index];this.data[index] = e.value

                    e.classList.add('contextInput')
                    e.classList.add('teacherInput')
                    e.id = 'teacherInput'

                    e.addEventListener('input', (event) => {
                        this.data[index] = event.target.value
                    })

                    l.classList.add('contextTip')
                    l.textContent = "Teacher"

                    contextMenu.appendChild(l)
                    contextMenu.appendChild(document.createElement('br'))
                    contextMenu.appendChild(e)
                    contextMenu.appendChild(document.createElement('hr'))

                    break;
                case 'name':
                    e.type = 'text'
                    e.placeholder = 'Type in its name here.'
                    if(typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                    e.classList.add('contextInput')
                    e.classList.add('nameInput')
                    e.id = 'titleInput'

                    e.addEventListener('input', (event) => {
                        this.data[index] = event.target.value
                    })

                    l.classList.add('contextTip')
                    l.textContent = "Name"

                    contextMenu.appendChild(l)
                    contextMenu.appendChild(document.createElement('br'))
                    contextMenu.appendChild(e)
                    contextMenu.appendChild(document.createElement('hr'))

                    break;
                case 'color':
                    e.type = 'color'
                    e.classList.add('contextInput')
                    if(typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                    e.classList.add('contextColorInput')
                    e.id = 'colorInput'

                    let e2 = document.createElement('span')
                    e2.classList.add('contextTip')
                    e2.textContent = "Adjust the color using the picker above."
                    e2.style.color = 'rgb(var(--c3))'

                    let subE = document.createElement('section')
                    subE.classList.add("contextColorSector")

                    e.addEventListener('input', (event) => {
                        this.data[index] = event.target.value
                    })

                    l.classList.add('contextTip')
                    l.textContent = "Color"

                    contextMenu.appendChild(l)
                    contextMenu.appendChild(document.createElement('br'))
                    contextMenu.appendChild(subE)
                    subE.appendChild(e)
                    subE.appendChild(document.createElement('br'))
                    subE.appendChild(e2)
                    contextMenu.appendChild(document.createElement('hr'))

                    break;
                    case 'block':
                        let settings = JSON.parse(localStorage.getItem('swcsettings'))
                        if(settings.at(settings.indexOf('Number of Scheduled Blocks') + 1) != 1){
                        e.type = 'number'
                        e.placeholder = 'Number'
                        if(typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                        e.classList.add('contextInput')
                        e.min = 1
                        e.max = Number(extractSetting('Number of Scheduled Blocks'))
                        e.id = 'blockInput'
                        e.style.width = 'fit-content'
                        e.addEventListener('input', (event) => {
                            this.data[index] = event.target.value
                            if(event.target.value > Number(extractSetting('Number of Scheduled Blocks'))) event.target.value = event.target.value = Number(extractSetting('Number of Scheduled Blocks'))
                            if(event.target.value < 1) event.target.value = 1
                        })
                        l.classList.add('contextTip')
                        l.textContent = "Block"
                        contextMenu.appendChild(l)
                        contextMenu.appendChild(document.createElement('br'))
                        contextMenu.appendChild(e)
                        }else{
                            this.data[index] = "1"
                        }
                    break;
            }
        })

        // End Generator

        let submitButton = document.createElement('div')
        submitButton.classList.add('contextButton')
        submitButton.textContent = 'Submit'
        submitButton.addEventListener('click', (event) => {
            let invalid = false
            this.linkIndices.forEach((element, index) => {
                if(this.data[element] == null || this.data[element].slice(0, 4) != 'http'){
                    alert('Please ensure all links are valid. (http:// or https://)')
                    invalid = true
                }
            })

            if(this.data.includes(null)){
                alert("Please fill out all fields.")
                console.log(this.data)
                invalid = true
            }

            if(invalid) return
            this.data[this.data.length - 1] = true
        })
        contextMenu.appendChild(submitButton)

        await wait(300)
        contextMenu.classList.remove('small')

        contextMenu.style.left = String(window.innerWidth / 2 - (contextMenu.clientWidth / 2)) + 'px'
        contextMenu.style.top = String(window.innerHeight / 2 - (contextMenu.clientHeight / 2)) + 'px'
    }
}

async function getResultsFromContextMenu(menuItems, menuType, itemValues) {
    let contextMenu = new ContextMenu(menuItems, menuType, itemValues)
    contextMenu.build()

    await wait(300)

    document.addEventListener('click', closeMenuOnMouse)
    document.addEventListener('keydown', closeMenuOnEsc)

    while (contextMenu.data.at(-1) == false) {
        // This loop does nothing, it just waits for the user to fill out the context menu. :)

        await wait(100)
    }

    document.removeEventListener('click', closeMenuOnMouse)
    document.removeEventListener('keydown', closeMenuOnEsc)
    closeMenu(null)
    return contextMenu.data
}