var bgCanvas = document.querySelector('#background')
var c = bgCanvas.getContext('2d');
let bg = new Image();
bg.src = "breakout_bg.avif";
bg.addEventListener('load', function () {
    c.drawImage(bg, 0, 0, bgCanvas.width, bgCanvas.height);
})

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'lightseagreen';

// bounce sfx
let bounce = new Audio("bounce.mp3");
function playbounce() {
    let a = bounce.cloneNode();
    a.play();
};

// eventst
let left = null;
let right = null;

let level = 1;
window.addEventListener('keydown', function (e) {
    if (e.code === "ArrowLeft") {
        left = true;
    }
    else if (e.code === "ArrowRight") {
        right = true;
    }
    else if (e.code === 'Space') {
        pause = !pause;
    }
    else if (e.code === 'KeyS') {
        //console.log('efsdf');
        if (go === false) {
            //console.log('2');
            ball.init();
            paddle.init();
            blocks = [];
            block.exist = true;
            createBlocks(rows, columns);
            block.exist = false;
            for (item in blocks) {
                blocks[item].init();
            }
            if (level > 3) {
                level = 1;
            }
            go = true;


        }
    }
});

window.addEventListener('keyup', function (e) {
    if (e.code === "ArrowLeft") {
        left = false;
    }
    else if (e.code === "ArrowRight") {
        right = false;
    }
});

function collisionOnEvery(circle, rect) {
    if (Math.sqrt((((rect.x - circle.x) * (rect.x - circle.x)) + ((rect.y - circle.y) * (rect.y - circle.y)))) < circle.r) { // top left vertex
        return true;
    } else if (Math.sqrt((((rect.x + rect.w - circle.x) * (rect.x + rect.w - circle.x)) + ((rect.y - circle.y) * (rect.y - circle.y)))) < circle.r) { // top right vertex
        return true;
    } else if (Math.sqrt((((rect.x + rect.w - circle.x) * (rect.x + rect.w - circle.x)) + ((rect.y + rect.h - circle.y) * (rect.y + rect.h - circle.y)))) < circle.r) { // bottom right vertex
        return true;
    } else if (Math.sqrt((((rect.x - circle.x) * (rect.x - circle.x)) + ((rect.y + rect.h - circle.y) * (rect.y + rect.h - circle.y)))) < circle.r) { // bottom left vertex
        return true;
    } else {
        return circle.x >= rect.x // left edge
            && circle.x <= rect.x + rect.w // right edge
            && circle.y + circle.r >= rect.y // hit on top
            && circle.x >= rect.x // left edge for bottom
            && circle.x <= rect.x + rect.w // right edge for bottom
            && circle.y - circle.r <= rect.y + rect.h // hit on bottom
            || circle.y >= rect.y // top edge for left
            && circle.y <= rect.y + rect.h // bottom edge for left
            && circle.x + circle.r >= rect.x // hit on left
            && circle.y >= rect.y // top edge for right
            && circle.y <= rect.y + rect.h // bottom edge for right
            && circle.x - circle.r < rect.x + rect.w; // hit on right
    }
}

function collisionOnTopBottom(circle, rect) {
    return circle.x >= rect.x
        && circle.x <= rect.x + rect.w
        && circle.y + circle.r >= rect.y
        && circle.y - circle.r <= rect.y + rect.h
        || Math.sqrt((((rect.x - circle.x) * (rect.x - circle.x)) + ((rect.y - circle.y) * (rect.y - circle.y)))) < circle.r
        || Math.sqrt((((rect.x + rect.w - circle.x) * (rect.x + rect.w - circle.x)) + ((rect.y + rect.h - circle.y) * (rect.y + rect.h - circle.y)))) < circle.r;
}
function collisionOnLeftRight(circle, rect) {
    return circle.y >= rect.y
        && circle.y <= rect.y + rect.h
        && circle.x + circle.r >= rect.x
        && circle.x - circle.r <= rect.x + rect.w
        || Math.sqrt((((rect.x + rect.w - circle.x) * (rect.x + rect.w - circle.x)) + ((rect.y - circle.y) * (rect.y - circle.y)))) < circle.r
        || Math.sqrt((((rect.x - circle.x) * (rect.x - circle.x)) + ((rect.y + rect.h - circle.y) * (rect.y + rect.h - circle.y)))) < circle.r;
}


//reformat code: shift-alt-f (win) shift option f (mac)

//block
export {ctx, collisionOnTopBottom, collisionOnLeftRight, collisionOnEvery, playbounce}
import {block} from "./objects.js"

// 3,10
let blocks = [];
let bLen = 0;
function createBlocks(rows, cols) {
    blocks = [];
    bLen = 0;
    for (let r = 0; r < rows; r++) {
        let newRow = [];
        for (let c = 0; c < cols; c++) {
            let obj = { ...block };
            /*
            obj.w = (canvas.width / cols) - 15;
            obj.x = ((canvas.width / cols) * c) + 0;
            obj.y = (r * 40) + 20;
            obj.h = 20
            */
            obj.x = c * (obj.w + 30) + 50;
            obj.y = r * (obj.h + 20) + 50;
            //obj.w=;
            //obj.h=;
            bLen++;


            newRow.push(obj);

        }
        blocks.push(...newRow);
        //console.log(blocks);
    }
}
//console.log(blocks);

//paddle
export {left, right}
import {paddle} from "./objects.js"

paddle.draw();

function doTopCollision(ball, rect) {
    return ball.y + ball.r > rect.y && ball.x >= rect.x && ball.x <= rect.x + rect.w;
};
let go = true;
function gameOver() {
    level = 1;
    go = false;
    ctx.font = "30px Sans-Serif";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
    ctx.fillText('gam over! press "s" to start', canvas.width / 2, canvas.height / 2);
};
//ball

export {gameOver}
import {ball} from "./objects.js"

//ball.update();
ball.draw();

// write text
function drawText(text, x, y, color) {
    ctx.beginPath();
    ctx.font = "20px monospace";
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}
// background


let score = 0;

let rows = 3;
let columns = 5;

createBlocks(rows, columns);
block.exist = false;
let pause = false;

let item = 0;
for (item in blocks) {
    blocks[item].init();
}
//game loop
function loop() {
    requestAnimationFrame(loop);
    if (pause) return;
    if (go === false) return;
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //draw
    block.draw();
    //console.log("what");
    for (item in blocks) {
        blocks[item].draw();
    }
    paddle.draw();
    ball.draw();
    score = (bLen - blocks.length) * 10;
    drawText(score, 20, 20, "lightseagreen")
    drawText("level "+level, 80, 20, "lightseagreen")

    //update

    block.update();
    for (item in blocks) {
        blocks[item].update();
        if (blocks[item].exist == false) {
            blocks.splice(item, 1);
            playbounce();
            //console.log(blocks);
            if (blocks.length === 0) {
                if (level > 2) {
                    go = false;
                    ctx.font = "30px Sans-Serif";
                    ctx.textAlign = "center";
                    ctx.textBaseLine = "middle";
                    ctx.fillText('you beat the game press "s" to restart', canvas.width / 2, canvas.height / 2);
                    level++;
                } else {
                    go = false;
                    ctx.font = "30px Sans-Serif";
                    ctx.textAlign = "center";
                    ctx.textBaseLine = "middle";
                    ctx.fillText('you won! press "s" to start next level', canvas.width / 2, canvas.height / 2);
                    level++;
                }
            }

        }
    }
    ball.update();
    paddle.update();





}

loop();

//paddle
///ctx.fillRect(250,580,100,20);
//ball
///ctx.beginPath();
///ctx.arc(300,570,10,0,Math.PI*2);
///ctx.fill();
