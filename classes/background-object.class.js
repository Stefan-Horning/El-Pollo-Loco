class BackgroundObject extends MovableObject{
    height = 480;
    width = 720;

    /**
     * 
     * @param {imagePath} imagePath 
     * @param {x-coordinates} x 
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}