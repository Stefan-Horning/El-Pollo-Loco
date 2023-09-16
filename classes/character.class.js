class Character extends MovableObject{
    x = 280;
    y = 110;
    height = 320;
    width = 100;
    world;
    speed = 4;
    HowLongIdle = 0;
    EndTime = 10000; 
    setCoins = 0;
    setBottle = 0;
    isHurtCh = false;
    unableJump = false;
    isEnd = false;

    offset = {
        top: 120,
        bottom: 0,
        left: 5,
        right: 5
    }

    walking_sound = new Audio('audio/Walking.mp3');
    Jump_sound = new Audio('audio/Jump.mp3');
    GameOver_sound = new Audio('audio/GameOver.mp3');
    Hurtpepe_sound = new Audio('audio/hurtPepe.mp3');
    sleep_sound = new Audio('audio/sleepPepe.mp3');

    IMAGES_WALTKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * LoadImages
     * Start functions 
     */
    constructor(){
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALTKING);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.sleep_sound.volume = 0.02;
        this.applyGravaty();
        this.animate();
    }

    /**
     * Start interval for moving.
     * Start interval for animation.
     */
    animate() {
        let move = setInterval(() => {
            this.moveInterval();
        }, 1000 / 60);

        this.pushInterval(move);

        let animationInterval = setInterval(() => {
            this.animation();
            
        },150);     
        this.pushInterval(animationInterval);
    }

    /**
     * Where is the Character going?
     */
    moveInterval(){
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDiretion = false;
        } else if (this.world.keyboard.LEFT && this.x > -190) {
            this.moveLeft();
            this.otherDiretion = true;
        }else{
            this.walking_sound.pause();
        }
        if(this.world.keyboard.SPACE && !this.isAboveGround() && !this.ishurt()){
            this.walking_sound.pause();
            this.jump();
            this.playJumpSound();
        }
        this.world.camera_x = -this.x + 120;
    }


    /**
     * Jump Sound
     */
    playJumpSound(){
        if(this.sounds){
            this.Jump_sound.play();
        }
    }

    /**
     * All animations for character 
     */
    animation(){
        if(this.isdead() ){
            this.deadSound();
            this.dead();
        } else if(this.ishurt()){
            this.stopOtherSounds();
            this.hurt();
            this.hurtSound();
        }else if(this.isAboveGround()){
            this.jumpCHInterval()
            this.stopOtherSounds();
        }else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            this.walking();
            this.walkingSound();
        }else if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && this.HowLongIdle <= 7000){
            this.stand();
            this.stopOtherSounds();
        }else if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && this.HowLongIdle >= 7000){
            this.longstand();
            this.longSound();
        }
    }

    /**
     * sleep Sound
     */
    longSound(){
        if(this.sounds){
            this.sleep_sound.play();
        }
    }

    /**
     * sleep animation
     */
    longstand(){
        this.playAnimation(this.IMAGES_IDLE_LONG);
    }

    /**
     * Normal stand animation
     */
    stand(){
        this.HowLongIdle += 250; 
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Sound for Walk
     */
    walkingSound(){
        if(!this.isAboveGround() && this.sounds){
            this.walking_sound.play();
        }else{
            this.walking_sound.pause();
        }
    }

    /**
     * Animation for walk
     */
    walking(){
        this.HowLongIdle = 0;
        this.playAnimation(this.IMAGES_WALTKING);
    }
    
    /**
     * Jump animation
     */
    jumpCHInterval(){
        this.HowLongIdle = 0;
        this.playAnimation(this.IMAGES_JUMP);
    }

    /**
     * Hurt Sound
     */
    hurtSound(){
        if(this.sounds){
            this.Hurtpepe_sound.play();
        }
    }

    /**
     * Hurt animation
     */
    hurt(){
        this.HowLongIdle = 0;
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Stop other Sound
     */
    stopOtherSounds(){
        this.sleep_sound.pause();
        this.walking_sound.pause();
    }

    /**
     * Character dead
     */
    dead(){
        this.clearallInterval();
        this.HowLongIdle = 0;
        clearInterval(this.animationInterval);
        this.playAnimation(this.IMAGES_DEAD);
        document.getElementById('lost').classList.remove('d-none');
        document.getElementById('ingameSettings').classList.add('d-none');
        setTimeout(() => {
            document.getElementById('lost').classList.add('d-none');
            document.getElementById('firstscreen').classList.remove('d-none');
        }, 1900);
    }

    /** 
     * dead sound
     */
    deadSound(){
        if(this.sounds && !this.isEnd){
            this.GameOver_sound.play();
            this.isEnd = true;
            this.sounds = false;
            startAudio.pause();
            startAudio.loop = false;
        }
    } 
}