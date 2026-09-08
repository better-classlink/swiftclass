function linksGen() {

    let linksJSON = JSON.parse(localStorage.getItem('swcLinks'))
    let classHeaders = JSON.parse(localStorage.getItem('swcClasses'))


    if(localStorage.getItem('swcLinks') == null){
        localStorage.setItem('swcLinks', JSON.stringify([
            [],
            []
        ]))
    }

    linksJSON = JSON.parse(localStorage.getItem('swcLinks'))

    for(i=0; i < Number(extractSetting("Number of Available Periods"));i++){
        if(linksJSON[0][i*2] == undefined){
            linksJSON[0].push([
                i+1,
                []
            ])
        }
    }

    localStorage.setItem('swcLinks', JSON.stringify(linksJSON))

    linksJSON = JSON.parse(localStorage.getItem('swcLinks'))

    let baseContent = document.getElementById('baseContent')

    baseContent.classList.add('linksGrid')

    let headersTab = document.createElement('div')
    headersTab.classList.add('headersTab')
    headersTab.classList.add('linkPart')
    baseContent.appendChild(headersTab)

    let sectorB = document.createElement('div')
    sectorB.classList.add('sectorB')
    baseContent.appendChild(sectorB)

    let commonTab = document.createElement('div')
    commonTab.classList.add('commonTab')
    commonTab.classList.add('linkPart')
    sectorB.appendChild(commonTab)

    let linksTab = document.createElement('div')
    linksTab.classList.add('linksTab')
    linksTab.classList.add('linkPart')
    sectorB.appendChild(linksTab)

    // such a long setup. now I can do the juicy stuff

    let classSectorHeader = document.createElement('span')
    classSectorHeader.textContent = 'Class Sections'
    classSectorHeader.classList.add('classSectorHeader')
    headersTab.appendChild(classSectorHeader)

    let lineBreak = document.createElement('div')
    lineBreak.classList.add('lineBreak')
    lineBreak.style.marginLeft = '1%'
    lineBreak.style.marginRight = '2%'
    lineBreak.style.width = '96%'
    headersTab.appendChild(lineBreak)

    for(i=0; i < Number(extractSetting("Number of Available Periods"));i++){
        let element = classHeaders[i]

        let e = document.createElement('div')
        e.classList.add('linksHeader')

        if (element.color == undefined) {
            e.style.backgroundColor = '#FFFFFFAA'
            e.style.color = '#000000'
            e.style.cursor = 'not-allowed'
        } else {
            e.style.backgroundColor = element.color + 'AA'

        }

        if (element.name == undefined) {
            e.textContent = 'Unset Class'
        } else {
            e.textContent = element.name
            e.classList.add('usable')
            e.addEventListener('click', () => {
                // do stuff once link loader is online
            })
        }

        headersTab.appendChild(e)
    }

    let otherHeader = document.createElement('span')
    otherHeader.textContent = 'Other Sections'
    otherHeader.classList.add('classSectorHeader')
    headersTab.appendChild(otherHeader)

    let lineBreak2 = document.createElement('div')
    lineBreak2.classList.add('lineBreak')
    lineBreak2.style.marginLeft = '1%'
    lineBreak2.style.marginRight = '2%'
    lineBreak2.style.width = '96%'
    headersTab.appendChild(lineBreak2)

    linksJSON[1].forEach((section) => {
        let header = section[0]
        let links = section[1]
        console.log(header)

        let e = document.createElement('div')
        e.classList.add('linksHeader')
        e.classList.add('traditionalLinkHeader')
        e.textContent = header
        headersTab.appendChild(e)

        e.addEventListener('click', () => {
            // do stuff once link loader is online
            console.log('header clicked')
        })

        let removalButton = document.createElement('div')
        removalButton.classList.add('removalButton')
        removalButton.classList.add('contextMenuOpen')
        removalButton.textContent = "X"
        e.appendChild(removalButton)
        removalButton.addEventListener('click', () => {
            if(!confirm("Are you sure you want to remove this section?")) return
            let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
            jsonRead[1].forEach((element, index) => {
                if(element[0] == header){
                    jsonRead[1].splice(index, 1)
                    localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                }
            })
            updateMenus()
        })

    })

    let addHeaderButton = document.createElement('div')
    addHeaderButton.classList.add('addHeaderButton')
    addHeaderButton.classList.add('contextMenuOpen')
    addHeaderButton.textContent = "Add Section"
    headersTab.appendChild(addHeaderButton)
    addHeaderButton.addEventListener('click', () => {
        let newHeader = getResultsFromContextMenu(["name"], "Add Section", [])

        newHeader.then((newHeader) => {
            let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
            jsonRead[1].push([newHeader[0], []])
            localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
            updateMenus()
        })

    })

    let tempScroller = document.createElement('div')
    tempScroller.style.height = '150%'
    headersTab.appendChild(tempScroller)
}