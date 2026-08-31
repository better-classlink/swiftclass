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

    for(let i = 0; i < periods; i++){
        let classPane = document.createElement('div')
        if(classes[i] = {}){
            classPane.classList.add('classPane')
            classPane.classList.add('contextMenuOpen')
            classPane.classList.add('addClass')
            classPane.style.backgroundColor = "#FFFFFF80"
            sub2.appendChild(classPane)

            classAligner = document.createElement('div')
            classAligner.classList.add('classChild')
            classPane.appendChild(classAligner)

            let plusSign = document.createElement('pre')
            plusSign.classList.add('plusSign')
            plusSign.textContent = '+'
            classAligner.appendChild(plusSign)

            let sideText = document.createElement('span')
            sideText.classList.add('sideText')
            sideText.textContent = "Add a class for Period " + String(i + 1)
            classPane.appendChild(sideText)

            classPane.dataset.period = i + 1

            classPane.addEventListener('click', (event) => {
                window.classToAdd = event.currentTarget.dataset.period

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
        }else{

        }
    }

    let classPanes = []
    //
    // classes.forEach( (c, index) => {
    //     let redvalue = EightBitHexToDecimal(c.color.slice(1, 3))
    //     let greenvalue = EightBitHexToDecimal(c.color.slice(3, 5))
    //     let bluevalue = EightBitHexToDecimal(c.color.slice(-2))
    //     let average = ((redvalue + greenvalue + bluevalue) / 3)
    //
    //     let textColor = '#FFFFFF'
    //
    //     if (average > 180) {
    //         textColor = '#000000'
    //     } else {
    //         textColor = '#FFFFFF'
    //     }
    //     console.log(textColor)
    // })
}