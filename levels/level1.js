let allBackgroundObjects = [];

let backgroundLength = 5;
let backgroundlayer = 3;
let background_x_px = -719;
let backgroundpng = 2;

let level1;

/**
 * set Objects to level1
 */
function levelInit(){

}

/** set all background Objects
 * 
 * @returns backgroundObjects
 */
function renderBackground(){
    for (let i = 0; i < backgroundLength; i++) {
        let firstIMG = new BackgroundObject('img/5_background/layers/air.png', background_x_px);
        allBackgroundObjects.push(firstIMG);

        let SecoundIMG = new BackgroundObject(`img/5_background/layers/3_third_layer/${backgroundpng}.png`, background_x_px);
        allBackgroundObjects.push(SecoundIMG);

        let ThirdIMG = new BackgroundObject(`img/5_background/layers/2_second_layer/${backgroundpng}.png`, background_x_px);
        allBackgroundObjects.push(ThirdIMG);

        let fourdIMG = new BackgroundObject(`img/5_background/layers/1_first_layer/${backgroundpng}.png`, background_x_px);
        allBackgroundObjects.push(fourdIMG);
        background_x_px += 719;
        if(backgroundpng == 2){
            backgroundpng = 1;
        }else{
            backgroundpng = 2;
        }
    }
    return allBackgroundObjects;
}