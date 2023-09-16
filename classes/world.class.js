class World{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle;
    reload = 0;
    statusBar = [
        new LifeStatus(),
        new CoinStatus(),
        new BottleStatus(),
        new EndBossStatus(),
    ]
    throwableObject = [];
    TrowAir;
    Interval = [];
    canBuy = true;

    chickenHurt_sound = new Audio('audio/Chicken.mp3');
    unable_sound = new Audio('audio/wrong.mp3');
    able_sound = new Audio('audio/buy.mp3');

    /**
     * push Interval to Array
     * @param {Interval} interval 
     */
    pushInterval(interval){
        if(!this.Interval.includes(interval)){
            this.Interval.push(interval);
        }
    }

    /**
     * Clear Intervals
     */
    clearallInterval(){
        this.Interval.forEach(I => {
            clearInterval(I);
        });
    }

    /**
     * Start other functions
     * @param {canvas} canvas 
     * @param {Keyboard} keyboard 
     */
    constructor(canvas,keyboard){
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.canvas = canvas;
        this.draw();
        this.setworld();
        this.run();
    }

    /**
     * let draw Objects to Canvas
     */
    draw(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x,0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x,0);
        this.addObjectsToMap(this.statusBar);
        this.ctx.translate(this.camera_x,0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x,0);

        self = this;
        requestAnimationFrame(function(){
            self.draw();
        })
    }

    /**
     * Start the first functions
     */
    run(){
        let run = setInterval(() =>{
            this.checkCollision();
            this.checkTrow();
        },50);
        this.pushInterval(run);
    }

    /**
     * check if the Character trow
     */
    checkTrow(){
        let checkReloteTime = new Date().getTime();
        if(this.keyboard.D && this.character.setBottle > 0 && checkReloteTime > this.reload){
            this.setVariableTrow();
        }
    }

    /**
     * Set the background variable when the character trow
     */
    setVariableTrow(){
        this.reload = new Date().getTime() + 1700;
        this.character.setBottle -= 1;
        this.bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50, this.character.otherDiretion);
        this.bottle.isTrow = true;
        this.throwableObject.push(this.bottle);
        this.statusBar[2].setBottle -= 1;
        this.statusBar[2].setPercentage();
    }

    /**
     * Buy a bottle
     */
    buyBottle(){
        if(this.character.setBottle < 5 && this.character.setCoins >= 1){
            if(this.character.sounds){
                this.able_sound.play();
            }
            this.buy();
        }else{
            if(this.character.sounds){
                this.unable_sound.play();
            }
        }
    }

    /**
     * Set the background variable for buying a bottle
     */
    buy(){
        this.character.setBottle += 1;
        this.character.setCoins -= 1;
        this.statusBar[1].setCoins -= 1;
        this.statusBar[1].setPercentage();
        this.statusBar[2].setBottle += 1;
        this.statusBar[2].setPercentage();
    }

    /**
     * set Enemy dead
     * @param {enemy} enemy 
     */
    enemyDead(enemy){
        if(!enemy.isdead){
            this.character.jump();
            if(this.character.sounds){
                this.chickenHurt_sound.play();
            }
            enemy.isdead = true;
            enemy.speed = 0;
            setTimeout(() =>{
                enemy.delete = true;
            },1500);
        }
    }

    /**
     * set damage to character
     */
    inflictdamage(){
        if(!this.character.ishurt()){
            this.character.unableJump = true;
            this.character.hit();
            this.statusBar[0].setPercentage(this.character.energy);
            setTimeout(() =>{
                this.character.unableJump = false;
            },500)
        }
    }

    /**
     * check if enemy iscolliding to character
     */
    checkEnemy() {
        this.level.enemies = this.level.enemies.filter(e => !e.delete);
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    this.enemyDead(enemy);
                }else if(enemy instanceof EndBoss){
                    this.inflictdamage();
                }
            } else if(this.character.isColliding(enemy) && !enemy.isdead){
                this.inflictdamage(); 
            }
        });
    }

    /**
     * check if Ccin isColliding to character
     */
    checkCoin(){
        this.level.coin.forEach((c, index) =>{
            if( this.character.isColliding(c) ){
                this.character.collectCoin();
                this.level.coin.splice(index, 1);
                this.statusBar[1].setCoins += 1;
                this.statusBar[1].setPercentage();
            }
        });
    }

    /**
     * check if bottle isColliding to character
     */
    checkBottle(){
        this.level.bottle.forEach((b,index) =>{
            if( this.character.isColliding(b)){
                this.character.collectBottle();
                this.level.bottle.splice(index, 1);
                this.statusBar[2].setBottle += 1;
                this.statusBar[2].setPercentage();
            }
        })
    }

    /**
     * Endboss is hit
     * @param {endboss} e 
     */
    endbossHit(e){
        e.ishurt = true;
        setTimeout(() =>{
            e.ishurt = false;
        },1000)
    }

    /**
     * Endboss is Dead
     * @param {Endboss} e 
     */
    endbossDead(e) {
        this.bottle.deleteBottle(e);
        e.isdead = true;
        this.bottle.isUse = true;
        this.cleareverInterval();
        setTimeout(() =>{
            e.delete = true;
            document.getElementById('won').classList.remove('d-none');
            setTimeout(() => {
                document.getElementById('won').classList.add('d-none');
                document.getElementById('firstscreen').classList.remove('d-none');
                document.getElementById('ingameSettings').classList.add('d-none');
            }, 1900);
        },750)
    }

    /**
     * clear Intervals
     */
    cleareverInterval(){
        this.character.clearallInterval();
        setTimeout(() =>{
            this.level.enemies.forEach(enemy => {
                enemy.clearallInterval();
            });
        },500); 
    }
    
    /**
     * Endboss isColliding bottle (Background)
     * @param {Enboss} e 
     */
    endbossCollidingBottle(e){
        this.statusBar[3].setPercentage(e.BottleStatushit);
        this.bottle.deleteBottle(e);
        this.endbossHit(e);
        e.BottleStatushit++
    }

    /**
     * Enemie isColliding bottle (Background)
     */
    checkEnemyWithBottle(){
        this.level.enemies.forEach((e) =>{
            if(this.bottle && this.bottle.isColliding(e)){
                if(e instanceof EndBoss && e.OneAttact == false && !this.bottle.delete){
                    this.BottleStrikeEndboss(e);
                }
                if(e instanceof Chicken || e instanceof SmallChicken && !e.isDead){
                    this.BottleStrikeChicken(e);
                }
            }
        });
    }

    /**
     * Bottle strike Endboss
     * @param {Endboss} e 
     */
    BottleStrikeEndboss(e){
        if(e.BottleStatushit < 3 && !this.bottle.delete && !this.bottle.isUse){
            if(!e.ishurt){
                e.ishurt = true;
                this.endbossCollidingBottle(e);
            }
        }else if(e.BottleStatushit >= 3){
            this.endbossDead(e);
        }
    }

    /**
     * Bottle strike enemie
     * @param {Enemies} e 
     */
    BottleStrikeChicken(e){
        if(this.character.sounds){
            this.chickenHurt_sound.play();
        }
        e.isdead = true;
        this.bottle.deleteBottle(e);
        setTimeout(() => {
            e.delete = true;
        }, 500);
    }

    /**
     * check Collisions of any Object
     */
    checkCollision(){
        this.checkEnemy();
        this.checkCoin();
        this.checkBottle();
        this.checkEnemyWithBottle();
        this.checkBuy();
    }

    /**
     * check if character is buying
     */
    checkBuy(){
        setInterval(() =>{
            if(Keyboard.B == true && this.canBuy){
                this.canBuy = false
                this.buyBottle();
                setTimeout(() =>{
                    this.canBuy = true;
                },500)
            }
        },250);
    }

    /**
     * set character to world
     */
    setworld(){
        this.character.world = this;
    }
    
    /**
     * set Objects to Canvas
     * @param {Objects} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * set one Object to Canvas
     * @param {one Object} mo 
     */
    addToMap(mo){
        if(mo.otherDiretion){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDiretion){
            this.resetFlip(mo);
        }
    }

    /**
     * Reset flip 
     * @param {Object} mo 
     */
    resetFlip(mo){
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }
    
    /**
     * flip Image
     * @param {Object} mo 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * - 1;
        this.ctx.scale(-1,1);
    }
}