class DrawableObject {
    img;
    x;
    y;
    height;
    width;
    imageCache = {};
    currentImage = 0;

    /**
     * load all images
     * @param {path} path 
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Load Array of Images
     * @param {Array} arr 
     */
    loadImages(arr){
        arr.forEach((path) =>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Load Image to canvas
     * @param {Canvas} ctx 
     */
    draw(ctx){
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e){
        }
       
    }
}