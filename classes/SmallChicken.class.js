class SmallChicken extends MovableObject{
    y = 340;
    height = 80;
    width = 80;
    StartImageInterval;
    isdead = false;
    delete = false;
    
    offset = {
        top: 10,
        bottom: 0,
        left: 5,
        right: 5
    }
    
    IMAGES_WALTKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    /**
     * Load Images
     * Set variable x,speed
     * Start animate function
     */
    constructor(){
        super().loadImage(this.IMAGES_WALTKING[0]);
        this.loadImages(this.IMAGES_WALTKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 1.6;
        this.animate();
    }

    /**
     * Play animations
     */
    animate(){
        let move = setInterval(() =>{
            this.moveLeft();
        }, 1000/ 60);
        this.pushInterval(move);
        let speed = setInterval(() =>{
            if(this.isdead){
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            }else{
                this.playAnimation(this.IMAGES_WALTKING);
            }
        },1000 / 5);
        this.pushInterval(speed);
    }
}