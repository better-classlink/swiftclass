class setting {
    constructor(name, value, type, description) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description
    }

    addToDOM(name, value, type, description) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description

        // verifying types

        if(!this.type in ['bool', 'dropdown', 'color', 'slider']){
            throw new Error("Invalid type: " + this.type)
        }

        if(this.type == 'bool'){
            let obj = /* html */ `
            <div class="settingObj" id="${this.value}">
                
            </div>
            `
        }
    }
}

window.setting = setting