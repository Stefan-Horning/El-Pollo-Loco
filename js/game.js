let canvas;
let world;
let goFullscreen = false;

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

/**
 * close fullscreen on mobile
 * @param {Key} e 
 */
function keyPress(e) {
    if (e.key === "Escape" && !goFullscreen) {
        fullscreen();
    }
}

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

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      Keyboard.ESC = true;
      setTimeout(() => {
        Keyboard.ESC = false;
      }, 500);
    }
});

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