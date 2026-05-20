class Class {
    constructor(name, teacher, block, link, personalIndex) {
        this.name = name
        this.teacher = teacher
        this.block = block
        this.link = link
        this.personalIndex = personalIndex
    }
    render() {
        let c = document.createElement('div')
        c.classList.add('classInteract')
        c.id = this.name
        let t = document.createElement('span')
        t.classList.add('classHeader')
        t.textContent = this.name
        let i = document.createElement('span')
        i.classList.add('classTeacher')
        i.textContent = 'With ' + this.teacher + "."
        c.appendChild(t)
        c.appendChild(i)
        c.appendChild(document.createElement('hr'))
        let classesPane = document.querySelectorAll('.classesPane')[0]

        console.log(this.link + ' uh yeah')

        // if(this.link === undefined){
        //     let note = document.createElement('span')
        //     note.textContent = 'No link was provided for this class.'
        //     note.classList.add('noteHeaderText')
        //     c.appendChild(document.createElement('br'))
        //     c.appendChild(note)
        // }else{
        //     let clickable = document.createElement('a')
        //     clickable.classList.add('noteHeaderLink')
        //     clickable.textContent = 'Associated Link'
        //     clickable.addEventListener('click', () => {
        //         window.open(this.link)
        //     })
        //     c.appendChild(document.createElement('br'))
        //     c.appendChild(clickable)
        // }
        console.log(this.personalIndex)
        classesPane.innerHTML = ''
        classesPane.appendChild(c)
    }
}

window.Class = Class