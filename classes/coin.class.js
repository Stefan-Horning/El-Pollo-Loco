class Coin extends MovableObject{
    height = 100;
    width = 100;
    x = 200;
    y = 300;
    speed = 0;

    IMAGES_SPIN = [ 
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Load images
     * set variable x,y
     * Start animate function
     */
    constructor(){
        super().loadImage(this.IMAGES_SPIN[0]);
        this.loadImages(this.IMAGES_SPIN);
        this.x = 100 + Math.random() * 2200;
        this.y = 350 - Math.random() * 300;
        this.animate();

    }

    /**
     * Play animation Spin
     */
    animate(){
        let coin = setInterval(() =>{
            this.playAnimation(this.IMAGES_SPIN);
        }, 1000 / 3);

        this.pushInterval(coin)
    }
}