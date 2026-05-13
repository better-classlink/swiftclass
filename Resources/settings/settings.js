class Setting {
    constructor(name, value, type, description, header, types) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description
        this.header = header
        this.types = types

        // adding the setting to the baseContent Element

            // verifying types FIRST

            if (!['bool', 'dropdown', 'color', 'slider'].includes(this.type)) {
                throw new Error("Invalid type: " + this.type)
            }

            // verifying there are no duplicates

            if(document.getElementById(this.name) != null) throw new Error("Duplicate ID: " + this.name)
    }
    render(){
            try{
            // console.log("Rendering setting: " + this.name)
            if (this.type == 'bool') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                
                t.classList.add('boolHeader')

                t.textContent = this.name

                let i = document.createElement('div')

                i.dataset.imgSource = 'Resources/svg/setting/' + this.value + '.png'

                i.classList.add('boolImageContainer')

                let img = document.createElement('img')

                img.src = i.dataset.imgSource

                i.appendChild(img)

                img.classList.add('boolImage')

                i.addEventListener('click', (event) => {
                    if (this.value == 'off') {
                        this.value = 'on'
                    }
                    else {
                        this.value = 'off'
                    }
                    event.currentTarget.children[0].src = 'Resources/svg/setting/' + this.value + '.png'
                });

                let d = document.createElement('span')

                d.textContent = this.description

                document.getElementById('baseContent').appendChild(b)

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(d)
            }

    }catch(e){
        console.warn(e)
    }

    }
}

window.Setting = Setting

// let testSetting = new Setting('Example Setting', 'off', 'bool', 'This is a test setting')