class setting {
    constructor(name, value, type, description) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description
    }

    selfAdd(name, value, type, description) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description

        // verifying types

        if(!this.type in ['bool', 'dropdown', 'color', 'slider']){
            throw new Error("Invalid type: " + this.type)
        }



    }
}