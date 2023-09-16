class Level{
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    level_end_x = 2250;

    /**
     * Amounts of Objects (Array/JSAON)
     * @param {Bottles} bottle 
     * @param {Coins} coin 
     * @param {enemies} enemies 
     * @param {Clouds} clouds 
     * @param {Background} backgroundObjects 
     */
    constructor(bottle,coin,enemies, clouds, backgroundObjects){
        this.bottle = bottle;
        this.coin = coin;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}