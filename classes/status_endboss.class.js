class EndBossStatus extends StatusBar{
    setLife = 3;
    y = 20
    x = 500;
    IMAGES_ENDBOSSLIFE = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Load Image
     */
    constructor(){
      super().loadImages(this.IMAGES_ENDBOSSLIFE);
      this.img = this.imageCache['img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'];
    }

    /**
     * show the life of Endboss
     * @param {Life of EndBoss} percentage 
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let ImagePath = this.IMAGES_ENDBOSSLIFE[this.resolveImageIndex()];
      this.img = this.imageCache[ImagePath];
    }

    /**
     * 
     * @returns Which Picture will use
     */
    resolveImageIndex() {
        for (let i = 0; i < this.IMAGES_ENDBOSSLIFE.length; i++) {
          if (this.percentage == 0) {
            return 2
          }else if(this.percentage == 1){
            return 1
          }else if(this.percentage == 2){
            return 0
          }
        }
      }
}