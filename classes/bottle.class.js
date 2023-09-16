class Bottle extends MovableObject{
    height = 80;
    width = 70;
    speed = 0;

    IMAGE_SPIN = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Place Random Bottles
     */
    constructor(){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGE_SPIN);
        this.x = 150 + Math.random() * 1900;
        this.y = 340;
        this.animate();
    }

    /**
     * Animat Bottle;
     */
    animate(){
        let intervall = setInterval(() =>{
            this.playAnimation(this.IMAGE_SPIN);
        },1000 / 3)
        this.pushInterval(intervall);
    }

}