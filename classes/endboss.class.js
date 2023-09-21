class EndBoss extends MovableObject{
    x = 2100;
    height = 440;
    width = 300;
    y = 20;
    delete = false;
    BottleStatushit = 0;
    hit = false;
    fight = true;
    speed = 30;
    otherDiretion = false;
    isEnd = false;

    offset = {
        top: 120,
        bottom: 0,
        left: 30,
        right: 40
    }

    isdead = false;
    ishurt = false;
    isWalking = false;
    attack = false;


    Start_Sound = new Audio('audio/endboss.mp3');
    Hurt_sound = new Audio('audio/endbossHurt_sound.mp3');
    fight_sound = new Audio('audio/windEndboss.mp3');

    IMAGES_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Load Images
     * Start animate function
     */
    constructor(){
        super().loadImage(this.IMAGES_ANGRY[0]);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.animate(this.IMAGES_ANGRY);
    }

    /**
     * set variable ishurt to false
     */
    ishurtEndBoss(){
        this.ishurt = false;
    }

    /**
     * Fight function for Endboss
     */
    fightWihtCharacter(){
        setInterval(() => {
            if ((world.character.x + 60) > this.x ) {
                if((world.character.x - 160) > this.x){
                    this.otherDiretion = true;
                    this.moveRight();
                }else{
                    this.attack = true;
                }
            }else{
                this.otherDiretion = false;
                this.attack = false;
                this.isWalking = true;
                this.moveLeft();
            }
        }, 250);
    }

    /**
     * animate Endboss
     */
    animate(){
        let startAnimation = setInterval(() =>{
            if(this.isdead){
                this.chickenDead();
            }else if(this.ishurt){
                this.chickenHurt();
            }else if(this.attack){
                this.chickenAttack();
            } else if(this.isWalking){
                this.chickenIsWalking();
            }else{
                this.chickenAngry();
            }
            this.startEndboss();
        }, 1000 / 5)
        this.pushInterval(startAnimation)
    }

    /**
     * Start Endboss (firstContact)
     */
    startEndboss(){
        if (world.character.x > 1650 && !this.firstContact) {
            this.isEnd = false;
            if(this.sounds){
                this.Start_Sound.play();
            }
            
            this.firstContact = true;
            this.fightWihtCharacter();

        }
    }

    /**
     * Play angry animation
     */
    chickenAngry(){
        this.playAnimation(this.IMAGES_ANGRY);
    }

    /**
     * Play walk animation
     */
    chickenIsWalking(){
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Dead of Endboss
     */
    chickenDead(){
        if(this.sounds && !this.isEnd){
            this.isEnd = true;
            this.sounds = false;
            startAudio.pause();
            startAudio.loop = false;
        }
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(this.startAnimation);
    }

    /**
     * Hurt of Endboss
     */
    chickenHurt(){
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() =>{
            this.ishurtEndBoss();
        },500)
       
        if(this.sounds){
            this.Hurt_sound.play();
        }
    }

    /**
     * Attack of Endboss
     */
    chickenAttack(){
        this.playAnimation(this.IMAGES_ATTACK);
        if(this.sounds && !world.character.isdead()){
            this.fight_sound.play();
        }
    }
}