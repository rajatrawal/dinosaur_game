const dino = document.querySelector(".dino");
var score = 0;
cross = true;
isGameOver=false;
audioGameOver=new Audio("gameover.mp3")
music=new Audio("music.mp3")
setTimeout(() => {
    music.play();
}, 1000);
document.onkeydown = (e) => {
    console.log(e);
    if ([13, 38, 32].includes(e.keyCode)) {
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700);

    }

    else if (e.keyCode === 37) {
        dino.style.removeProperty('right');   
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        if(dx-112 < 0){
                
                dino.style.left="0";
           
        }
        else{
            dino.style.left = dx - 112 + 'px';
            dino.style.transform="rotateY(180deg)";        
        }

    }
    else if (e.keyCode === 39) {
        dxr = parseInt(window.getComputedStyle(dino, null).getPropertyValue("right"));
        dxl = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));

        if(dxr-112<0){
            dino.style.right="0";

        }
        else{
            dino.style.left = dxl + 112 + 'px';
            dino.style.transform="rotateY(0deg)";        

        }
    }
}
setInterval(() => {
    gameOver = document.querySelector(".gameOver");
    obstacle = document.querySelector(".obstacle");
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {

        gameOver.style.visibility = 'visible';
        obstacle.classList.remove("drgonObstcle");
        isGameOver=true;
        music.pause();
        audioGameOver.play();
        setTimeout(() => {
            audioGameOver.pause();
            
        }, 1000);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 2000);
    }
    else if (offsetX < 200 && cross && !(isGameOver)) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {

            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            obstacle.style.animationDuration = aniDur - 0.01 + "s";
        }, 1000);
    }


}, 10);

var scoreCont = document.querySelector(".scoreCont");
updateScore = (score) => {
    scoreCont.innerText = "Your score is " + score;
}
