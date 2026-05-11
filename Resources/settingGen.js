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

            if (this.type == 'bool') {
                let obj = /* html */ `
            <div class="settingObj" id="${this.value}">
                <img src="Resources/svg/setting/${this.value}.svg" class="settingIcon">
            </div>
            `
                document.getElementById('baseContent').innerHTML += obj

            }

    }
}

window.setting = setting