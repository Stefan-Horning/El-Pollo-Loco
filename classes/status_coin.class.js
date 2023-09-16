class CoinStatus extends StatusBar{
    setCoins = 0;
    y = 40
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    /**
     * Load Image
     */
    constructor(){
        super().loadImages(this.IMAGES_COIN);
        this.img = this.imageCache['img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png'];
    }

    /**
     * set the right Image
     */
    setPercentage() {
        if(this.setCoins <= 5){
            let ImagePath = this.IMAGES_COIN[this.setCoins];
            this.img = this.imageCache[ImagePath];
        }
    }
}