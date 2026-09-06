function classGen(){
    // baseContent.classList.add('classesGrid')

    let sub1 = document.createElement('div')
    let sub2 = document.createElement('div')

    sub1.id = 'sub1'
    sub2.id = 'sub2'

    // baseContent.appendChild(sub1)
    baseContent.appendChild(sub2)

    //////////////////


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

    let periods = Number(extractSetting('Number of Available Periods'))

    for(i=0; i<3; i++){
        let track = document.createElement('div')
        track.classList.add("classTrack")
        track.id = 'track' + String(i+1)
        sub2.appendChild(track)
    }

    for(let i = 0; i < periods; i++) {
        let classPane = document.createElement('div')
        if (JSON.stringify(classes[i]) === '{}') {
            classPane.classList.add('classPane')
            classPane.classList.add('contextMenuOpen')
            classPane.classList.add('addClass')
            classPane.style.backgroundColor = "#FFFFFFCA"
            if (i < 4) {
                document.getElementById('track1').appendChild(classPane)
            } else if (i < 8) {
                document.getElementById('track2').appendChild(classPane)
            } else {
                document.getElementById('track3').appendChild(classPane)
            }

            let plusSign = document.createElement('span')
            plusSign.classList.add('classPlusSign')
            plusSign.classList.add('contextMenuOpen')
            plusSign.textContent = "+"
            classPane.appendChild(plusSign)

            let sideText = document.createElement('span')
            sideText.classList.add('addClassText')
            sideText.classList.add('contextMenuOpen')
            sideText.textContent = "Add a class for Period " + String(i + 1)
            classPane.appendChild(sideText)

            classPane.dataset.period = i + 1

            classPane.addEventListener('click', (event) => {
                window.classToAdd = event.currentTarget.dataset.period - 1

                let newClass = getResultsFromContextMenu([
                        'name',
                        'teacher',
                        'link',
                        'color'
                    ],
                    'Class Creator',
                    ['', '', '', '#FFFFFF'], '1')
                newClass.then((newClass) => {
                    let jsonRead = localStorage.getItem('swcClasses')
                    console.log(window.classToAdd)
                    jsonRead = JSON.parse(jsonRead)
                    jsonRead[window.classToAdd] = {
                        "name": newClass[0],
                        "teacher": newClass[1],
                        "link": newClass[2],
                        "color": newClass[3]
                    }
                    localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
                    updateMenus()
                })
            })
        } else {
            let classPane = document.createElement('div')
            classPane.classList.add('classPane')
            let c = classes[i]
            classPane.style.backgroundColor = c.color + 'CA'

            let redvalue = EightBitHexToDecimal(c.color.slice(1, 3))
            let greenvalue = EightBitHexToDecimal(c.color.slice(3, 5))
            let bluevalue = EightBitHexToDecimal(c.color.slice(-2))
            let average = ((redvalue + greenvalue + bluevalue) / 3)

            let textColor = '#FFFFFF'

            if (average > 180) {
                textColor = '#000000'
            }
            else {
                textColor = '#FFFFFF'
            }
            console.log(textColor)

            let classHeader = document.createElement('span')
            classHeader.classList.add('classHeader')
            classHeader.textContent = "Period " + String((i+1)) + ': ' + c.name
            classHeader.style.color = textColor
            classPane.appendChild(classHeader)

            classPane.appendChild(document.createElement('br'))

            let classTeacher = document.createElement('span')
            classTeacher.classList.add('classSubHeader')
            classTeacher.textContent = "Taught by " + c.teacher
            classTeacher.style.color = textColor
            classPane.appendChild(classTeacher)

            // Actual Buttons

            let subTrack = document.createElement('div')
            subTrack.classList.add('subTrack')
            classPane.appendChild(subTrack)

            let buttonsTrack = document.createElement('div')
            buttonsTrack.classList.add('buttonsTrack')
            subTrack.appendChild(buttonsTrack)

            let jumpToLinkButton = document.createElement('div')
            jumpToLinkButton.classList.add('trackButton')
            jumpToLinkButton.textContent = "Class Page"
            buttonsTrack.appendChild(jumpToLinkButton)
            jumpToLinkButton.addEventListener('click', (event) => {
                window.open(c.link)
            })

            let editButton = document.createElement('div')
            editButton.classList.add('trackButton')
            editButton.textContent = "Edit Class"
            buttonsTrack.appendChild(editButton)
            editButton.addEventListener('click', (event) => {
                let classToAdd = getResultsFromContextMenu([
                    'name',
                    'teacher',
                    'link',
                    'color'
                ])

            })

            if (i < 4) {
                document.getElementById('track1').appendChild(classPane)
            } else if (i < 8) {
                document.getElementById('track2').appendChild(classPane)
            } else {
                document.getElementById('track3').appendChild(classPane)
            }
        }
    }
}