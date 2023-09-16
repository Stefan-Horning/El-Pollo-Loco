class Cloud extends MovableObject{
    y = 30; 
    height = 200;
    width = 400;
    speed = 0.125;

    /**
     * Load Images
     * Set variable x
     * start animate function
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 2200;
        this.animate();
    }

    /**
     * Moveleft for clouds
     */
    animate(){
        let cloud = setInterval(() =>{
            this.moveLeft();
        }, 1000/ 60);

        this.pushInterval(cloud);
    }
}