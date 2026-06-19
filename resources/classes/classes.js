function classGen(){
    if(localStorage.getItem('swcClasses') == null){
        localStorage.setItem('swcClasses', JSON.stringify([
            {
                "name": "Example Class",
                "teacher": "SwiftClass Developers",
                "color": "#FFFFFF",
                "link": "https://swiftclass.app",
                "block": "1"
            }
        ]))
    }

    let classes = JSON.parse(localStorage.getItem('swcClasses'))

    let classPanes = []

    classes.forEach( (c, index) => {
        let pane = document.createElement('div')
        pane.classList.add('classPane')
        classPanes.push(pane)

        pane.style.maxHeight = String(32) + '%'
        pane.style.maxWidth = String(35) + '%'

        pane.style.backgroundColor = c.color + "5A"

        let classHeader = document.createElement('h1')
        classHeader.classList.add('classHeader')
        classHeader.textContent = c.name
        pane.appendChild(classHeader)

        pane.appendChild(document.createElement('br'))

        let teacher = document.createElement('h2')
        teacher.classList.add('classSubHeader')
        teacher.textContent = "Taught by " + c.teacher
        pane.appendChild(teacher)

        let hr = document.createElement('hr')
        hr.classList.add('breakerBar')
        pane.appendChild(hr)

        let classLink = document.createElement('div')
        classLink.classList.add('classButton')
        classLink.textContent = 'Jump to Link'
        classLink.addEventListener('click', (event) => {
            window.open(c.link)
        })
        pane.appendChild(classLink)


        let classSettings = document.createElement('div')
        classSettings.classList.add('classButton')
        classSettings.classList.add('contextMenuOpen')
        classSettings.textContent = 'Settings'
        classSettings.addEventListener('click', (event) => {
            let grabbedSettings = getResultsFromContextMenu([
                    'name',
                    'teacher',
                    'link',
                    'color',
                    'block'
                ],
                'Class Settings',
                [
                    c.name,
                    c.teacher,
                    c.link,
                    c.color,
                    c.block
                ])

            grabbedSettings.then( (settings) => {
                let jsonRead = localStorage.getItem('swcClasses')
                jsonRead = JSON.parse(jsonRead)
                jsonRead[index].name = settings[0]
                jsonRead[index].teacher = settings[1]
                jsonRead[index].link = settings[2]
                jsonRead[index].color = settings[3]
                localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
                updateMenus()
            })
        })
        pane.appendChild(classSettings)

        let classDelete = document.createElement('div')
        classDelete.classList.add('classButton')
        classDelete.textContent = 'Delete'
        classDelete.addEventListener('click', (event) => {
            let confirmDelete = confirm("Are you sure you want to delete this class?")
            if(confirmDelete){
                let jsonRead = localStorage.getItem('swcClasses')
                jsonRead = JSON.parse(jsonRead)
                jsonRead.splice(index, 1)
                localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
            }
            updateMenus()
        })
        pane.appendChild(document.createElement('br'))
        pane.appendChild(classDelete)
    })

    classPanes.forEach( (pane, index) => {
        document.getElementById('baseContent').appendChild(pane)
    })

    let addNewClassButton = document.createElement('div')
    addNewClassButton.classList.add('classPane')
    addNewClassButton.classList.add('addClass')
    addNewClassButton.textContent = 'Add new Class'
    addNewClassButton.addEventListener('click', (event) => {
        let newClass = getResultsFromContextMenu([
                'name',
                'teacher',
                'link',
                'color'
            ],
            'Class Creator',
            ['', '', '', '#FFFFFF'], '1')
        newClass.then( (newClass) => {
            let jsonRead = localStorage.getItem('swcClasses')
            jsonRead = JSON.parse(jsonRead)
            jsonRead.push({
                "name": newClass[0],
                "teacher": newClass[1],
                "link": newClass[2],
                "color": newClass[3]
            })
            localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
            updateMenus()
        })
    })

    document.getElementById('baseContent').appendChild(document.createElement('br'))
    document.getElementById('baseContent').appendChild(addNewClassButton)
}