class InfoSlides(sourceFile){
    constructor(sourceFile){
        this.sourceFile = sourceFile;
    }
    display(){
        this.slideNumber = 0
        this.slides = JSON.parse(this.sourceFile)
    }
}