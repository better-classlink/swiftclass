class setting {
    constructor(name, value, type, description) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description

        // adding the setting to the baseContent Element

            // verifying types FIRST

            if (!['bool', 'dropdown', 'color', 'slider'].includes(this.type)) {
                throw new Error("Invalid type: " + this.type)
            }

            // verifying there are no duplicates

            if(document.getElementById(this.value) != null) throw new Error("Duplicate ID: " + this.value)
    try{
            if (this.type == 'bool') {
                let obj = /* html */ `
                <button id="${this.value}">
                    hola buenas
                </button>
            `
                document.getElementById('baseContent').innerHTML += obj

                document.getElementById(this.value).addEventListener('click', () => {
                   alert('This setting is not yet implemented!')
                })

                console.log(document.getElementById(this.value)?.onclick)
                console.log(this.value)
                console.log('hello?')
            }

    }catch(e){
        console.warn(e)
    }
    }
}

window.setting = setting

let testSetting = new setting('test', 'off', 'bool', 'This is a test setting')