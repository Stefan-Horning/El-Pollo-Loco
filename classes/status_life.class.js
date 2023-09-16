class LifeStatus extends StatusBar{
    y = -10;
    percentage = 100;
    IMAGES_HP = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Load Images
     */
    constructor(){
        super().loadImages(this.IMAGES_HP);
        this.setPercentage(100);
    }

    /**
     * show the right HP
     * @param {Character life} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let ImagePath = this.IMAGES_HP[this.resolveImageIndex()];
        this.img = this.imageCache[ImagePath];
    }

    /**
     * 
     * @returns The Right amount of the image
     */
    resolveImageIndex() {
        for (let i = 0; i < this.IMAGES_HP.length; i++) {
          if (this.percentage < (i + 1) * 20 || this.percentage > 100) {
            this.percentage = i;
            return i;
          }
        }
      }
}

