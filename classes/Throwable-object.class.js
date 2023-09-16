class ThrowableObject extends MovableObject{
    speedY = 30;
    x;
    y;
    isUse = false;
    speed = 7.5;
    isSplash = false;
    isTrow = false;

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    IMAGES_TROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * 
     * @param {x-coordinate} x 
     * @param {y-coordinate} y 
     * @param {other Diretion} otherDiretion 
     */
    constructor(x,y, otherDiretion){
        super().loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_TROW);
        this.x = x;
        this.y = y;
        this.otherDiretion = otherDiretion;
        this.height = 80;
        this.width = 60;
        this.trow();
        this.animate();
    }

    /**
     * Animate Trow
     */
    animate(){
        setInterval(() =>{
            if(this.isSplash){
                this.playAnimation(this.IMAGES_SPLASH);
            }else if(this.isTrow){
                this.playAnimation(this.IMAGES_TROW);
            }
        },1000 / 5);
    }

    /**
     * Trow function
     */
    trow(){
        this.applyGravaty();
        setInterval(() =>{
            if(!this.otherDiretion){
                this.x += this.speed;
            }else{
                this.x -= this.speed;
            }
        },25);
    }

    /**
     * 
     * @returns is on Ground?
     */
    spashOnGround(){
        return this.y < 500;
    }

    /**
     * Delete the Bottle
     * @param {Bottle} e 
     */
    deleteBottle(e){
        this.setVariable();
        setTimeout(() =>{
            world.bottle = '';
            world.throwableObject = world.throwableObject.filter(b => !b.isUse);;
            if(e != undefined){
                e.ishurt = false;
            }
        },500);
    }

    /**
     * set variable for delete Bottle
     */
    setVariable(){
        this.isSplash = true;
        this.speed = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.isUse = true;
    }
}