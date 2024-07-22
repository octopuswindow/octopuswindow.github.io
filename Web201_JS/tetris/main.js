let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

import {tetriminos} from "./patterns.js"

//
let square = {
    x: 0,
    y: 0,
    w: 30,
    h: 30,
    draw: function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

}

square.draw(1, 0);

let board = {
    x:0,
    y:0,
    rows: 20,
    cols: 10,
    squares: (function() {
        let squares=[]
        for (let r = 0; r <= 20; r++) {
            for (let c = 0; c <= 10; c++) {
                let s={...square};
                s.x=(c*s.w);
                s.y=(r*s.h);
                squares.push(s);
            }
        }
        return squares;   
    })(),
    draw: function () {
        this.squares.forEach(s=> {
            s.draw();
        });
    }
}
board.draw();

function fillSquare(sx, sy, col) {
    ctx.beginPath();
    ctx.rect(sx*square.h, sy*square.w, square.w, square.h);
    ctx.fillStyle = col;
    ctx.fill();
}
function fillPiece(px, py, shape, color) {
    shape.forEach(function (valA, y) {
        valA.forEach(function (valB, x) {
            console.log(valA+", "+valB+", "+x);
            if (valB==1) {
                fillSquare(x+px,y+py,color)
            }
        });
    });
}
//console.log(tetriminos[6]["patterns"][0]);
fillPiece(5, 10, tetriminos[6]["patterns"][0], "red");
//fillSquare(5,5,"blue");
