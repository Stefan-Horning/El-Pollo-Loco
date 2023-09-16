class MovableObject extends DrawableObject{
    sounds = true;
    speed = 0;
    otherDiretion = false;
    speedY = 0;
    acceleration = 2.5;
    character;
    energy = 100;
    lastHit = 0;
    OneAttact = false;
    delete = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    Interval = [];
    sounds = true;

    /**
     * set Sound
     */
    constructor(){
        super();
        if(audioSetting == true){
            this.sounds = true;
        }else{
            this.sounds = false;
        }
    }

    /**
     * Set all Intervals to one Array
     * @param {Interval} interval 
     */
    pushInterval(interval){
        this.Interval.push(interval);
    }

    /**
     * clear all Intervals
     */
    clearallInterval(){
        this.Interval.forEach(I => {
            clearInterval(I);
        });
    }

    /**
     * Artificially gravaty
     */
    applyGravaty(){
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.isInTheAir();
            }else{
                this.isNotInTheAir();
            }
        },1000/ 25)
    }

    /**
     * Object (ThrowableObject) on the Ground
     */
    isNotInTheAir(){
        this.speedY = 0;
        if(this instanceof Character){
            this.y = 110;
        }
        if(this instanceof ThrowableObject){
            if(!this.isUse){
                this.deleteBottle(); 
            }
        }
    }

    /**
     * Object is in Air 
     */
    isInTheAir(){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    /**
     * Object (Enemies/Character) on the Ground
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return this.y < 320;
        }else{
            return this.y < 110;
        }
    }

    /**
     * Go right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * go left
     */
    moveLeft(){
        this.x -= this.speed;      
    }

    /**
     * Animations
     * @param {All Images} image 
     */
    playAnimation(image){
        try{
            let i = this.currentImage % image.length;
            let path = image[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } catch(e){d
            console.warn(e);
            console.log(image);
        }
    }

    /**
     * Jump
     */
    jump(){
        if(!this.unableJump){
            this.speedY = 30;
        }
    }

    /**
     * 
     * @param {Object} obj 
     * @returns coordinates
     */
    isColliding (obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height -this.offset.bottom > obj.y + obj.offset.top&&
            this.x + this.offset.bottom < obj.x + obj.width - obj.offset.right &&
            this.y +this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Object isColliding
     */
    hit(){
        let Time =  new Date().getTime() + 2000
        if( Time > this.lastHit){
            this.energy -= 5;
            if(this.energy < 0){
                this.energy = 0;
            }else{
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * take a coin (character)
     */
    collectCoin(){
        this.setCoins += 1;
    }

    /**
     * take a bottle (character)
     */
    collectBottle(){
        this.setBottle += 1;
    }

    /**
     * 
     * @returns is Endboss dead
     */
    isdead(){
        return (this.energy === 0);
    }

    /**
     * 
     * @returns is Character/ Endboss hurt
     */
    ishurt(){
        let timespan = new Date().getTime() - this.lastHit;
        timespan = timespan / 500;
        return timespan < 1;
    }
}