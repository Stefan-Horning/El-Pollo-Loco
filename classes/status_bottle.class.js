class BottleStatus extends StatusBar{
    setBottle = 0;
    y = 90
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * load Image
     */
    constructor(){
        super().loadImages(this.IMAGES_BOTTLE);
        this.img = this.imageCache['img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png'];
    }

    /**
     * set the right Image
     */
    setPercentage() {
        if(this.setBottle <= 5){
            let ImagePath = this.IMAGES_BOTTLE[this.setBottle];
            this.img = this.imageCache[ImagePath];
        }
    }
}