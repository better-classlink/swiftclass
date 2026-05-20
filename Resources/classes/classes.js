class Class {
    constructor(name, teacher, num, block, link) {
        this.name = name
        this.teacher = teacher
        this.num = num
        this.block = block
        this.link = link
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
        i.textContent = this.teacher
        baseContent.appendChild(c)
    }
}