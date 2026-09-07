function linksGen() {
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

    let linksJSON = JSON.parse(localStorage.getItem('swcLinks'))
    let classHeaders = JSON.parse(localStorage.getItem('swcClasses'))

    let classHeadersArray = []


}