let canvas;
let world;
let Keyboard = new KeyboardForGame();
let audioSetting = true;
let goFullscreen = false;
let stopMusic = false;
let startAudio = new Audio('audio/EL-Backgroundmusic.mp3');
let mobileAction = true;

/**
 * Start Game Function
 */
function init(){
    if(audioSetting == true){
        startAudio.volume = 0.05;
        startAudio.loop = true; 
        startAudio.play();
    }
    startTouchMove();
    document.getElementById('firstscreen').classList.add('d-none');
    document.getElementById('ingameSettings').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, Keyboard);
}

/**
 * set music on or of
 */
function muteMusic(){
    if(audioSetting){
        audioSetting = false;
        document.getElementById('music').src = 'img/play-64.png';
    }else{
        audioSetting = true;
        document.getElementById('music').src = 'img/icons/stopMusic.png';
    }
}

/**
 * Open settings
 */
function OpenControl(){
    document.getElementById('steering').classList.remove('d-none')
}

/**
 * Close settings
 */
function CloseControl(){
    document.getElementById('steering').classList.add('d-none')
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        Keyboard.RIGHT = true;
    }
    if (e.key === "ArrowLeft") {
        Keyboard.LEFT = true;
    }
    if (e.key === "ArrowUp") {
        Keyboard.UP = true;
    }
    if (e.key === "ArrowDown") {
        Keyboard.DOWN = true;
    }
    if (e.key === " ") { 
        Keyboard.SPACE = true;
    }
    if (e.key === "d") {
        Keyboard.D = true;
    }
    if (e.key === "Enter") {
        Keyboard.D = true;
    }
    if(e.key === "b"){
        Keyboard.B = true;
        setTimeout(() =>{
            Keyboard.B = false;
        },250);
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        Keyboard.RIGHT = false;
    }
    if (e.key === "ArrowLeft") {
        Keyboard.LEFT = false;
    }
    if (e.key === "ArrowUp") {
        Keyboard.UP = false;
    }
    if (e.key === "ArrowDown") {
        Keyboard.DOWN = false;
    }
    if (e.key === " ") {
        Keyboard.SPACE = false;
    }
    if (e.key === "d") {
        Keyboard.D = false;
    }
    if (e.key === "Enter") {
        Keyboard.D = true;
    }
});

/**
 * Touch id for Mobile
 * @param {id of element} id 
 */
function handleImageTouchStart(id) {
    if (id === "left") {
        Keyboard.LEFT = true;
    }
    if (id === "right") {
        Keyboard.RIGHT = true;
    }
    if (id === "jump") {
        Keyboard.SPACE = true;
    }
    if (id === "trow"){
        Keyboard.D = true;
    }
    if(id === "buy"){
        Keyboard.B = true;
    }
}

/**
 * Touch id for Mobile
 * @param {id of element} id 
 */
function handleImageTouchEnd(id) {
    if (id === "left") {
        Keyboard.LEFT = false;
    }
    if (id === "right") {
        Keyboard.RIGHT = false;
    }
    if (id === "jump") {
        Keyboard.SPACE = false;
    }
    if (id === "trow"){
        Keyboard.D = false;
    }
    if(id === "buy"){
        Keyboard.B = false;
    }
}

/**
 * Start touch trigger
 */
function startTouchMove(){
    document.getElementById("left").addEventListener("touchstart", () => handleImageTouchStart("left"));
    document.getElementById("left").addEventListener("touchend", () => handleImageTouchEnd("left"));
    document.getElementById("right").addEventListener("touchstart", () => handleImageTouchStart("right"));
    document.getElementById("right").addEventListener("touchend", () => handleImageTouchEnd("right"));
    document.getElementById("jump").addEventListener("touchstart", () => handleImageTouchStart("jump"));
    document.getElementById("jump").addEventListener("touchend", () => handleImageTouchEnd("jump"));
    document.getElementById("trow").addEventListener("touchstart", () => handleImageTouchStart("trow"));
    document.getElementById("trow").addEventListener("touchend", () => handleImageTouchEnd("trow"));
    document.getElementById("buy").addEventListener("touchstart", () => handleImageTouchStart("buy"));
    document.getElementById("buy").addEventListener("touchend", () => handleImageTouchEnd("buy"));
}

/**
 * Set moveleft on
 * @param {id} id 
 */
function clickponMobile(id){
    if(id == 'left'){
        Keyboard.LEFT = true;
    }
}

/**
 * close fullscreen on mobile
 * @param {Key} e 
 */
function keyPress(e) {
    if (e.key === "Escape" && !goFullscreen) {
        fullscreen();
    }
}

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      Keyboard.ESC = true;
      setTimeout(() => {
        Keyboard.ESC = false;
      }, 500);
    }
});

/**
 * leave fullscreen function
 * @param {canvas} canvas 
 */
function leavefullscreenFunction(canvas){
    goFullscreen = true;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.getElementById('startscreen').classList.add('fullscreenStartScreen');
    document.getElementById('startButton').classList.add('fullscreenStartScreen');
    document.getElementById('lost').classList.add('fullscreenStartScreen');
    document.getElementById('won').classList.add('fullscreenStartScreen');
    document.getElementById('steering').classList.add('settingsFullscreen');
    document.getElementById('steering').classList.add('settingsFullscreen');
}

/**
 * start fullscreen function
 * @param {canvas} canvas 
 */
function gofullscreenFunction(canvas){
    goFullscreen = false;
    exitFullscreen();
    canvas.style.width = '720px';
    canvas.style.height = '480px';
    document.getElementById('startscreen').classList.remove('fullscreenStartScreen');
    document.getElementById('startButton').classList.remove('fullscreenStartScreen');
    document.getElementById('lost').classList.remove('fullscreenStartScreen');
    document.getElementById('won').classList.remove('fullscreenStartScreen');
    document.getElementById('steering').classList.remove('settingsFullscreen');
    document.getElementById('steering').classList.remove('settingsFullscreen');
}

/**
 * enter fullscreen
 * @param {element} element 
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {  
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) { 
      element.webkitRequestFullscreen();
    }
}

/**
 * exit fullscreen
 */
function exitFullscreen() {
    if(document.exitFullscreen && isFullScreen()) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

/**
 * 
 * @returns is is website fullscreen?
 */
function isFullScreen(){
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
}

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

/**
 * check esc fullscreen leave
 */
function handleFullscreenChange(){
    if (!isFullScreen()){
        goFullscreen = false;
        exitFullscreen();
    }
}

/**
 * fullscreen function
 */
function fullscreen(){
    let fullscreenElement = document.getElementById('fullscreen');
    let canvas = document.getElementById('canvas');
    if(goFullscreen){
        gofullscreenFunction(canvas);
    }else{
        leavefullscreenFunction(canvas);
        enterFullscreen(fullscreenElement)
    }
}

/**
 * open mobile Joystick
 */
function openMobileJoystick(){
    let div = document.getElementById('joystick');
    if(mobileAction){
        mobileAction = false;
        div.style.setProperty('display', 'flex', 'important');
    }else{
        mobileAction = true;
        div.style = '';
    }
}