class InfoSlides{

    constructor(sourceFile){
        this.sourceFile = sourceFile;
    }

    display(){
        let slideNumber = 0
        let slides = fetch (this.sourceFile).then(() => {
            return fetch(this.sourceFile).then(response => response.json())
        })
        print('slides: ' + slides)
    }
}