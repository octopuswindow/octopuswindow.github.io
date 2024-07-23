let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

import { tetriminos } from "./patterns.js"

let pause=false;
window.addEventListener('keydown',function(e){
  if (e.code==='ArrowLeft') {
    currTetromino.moveLeft();
  } else if (e.code==='ArrowRight') {
    currTetromino.moveRight();
  } else if (e.code==='ArrowDown') {
    currTetromino.moveDown();
  } else if (e.code==='KeyP') {
    pause=!pause;
  } else if (e.code==='KeyA') {
    currTetromino.rotateLeft();
  } else if (e.code==="KeyD") {
    currTetromino.rotateRight();
  }
});

//
let square = {
    x: 0,
    y: 0,
    w: 30,
    h: 30,
    color: 'white',
    strokeColor: 'black',
    draw: function() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.strokeStyle = this.strokeColor;
      ctx.stroke();

      ctx.fillStyle=this.color;
      ctx.fill();
    }
  }
  square.draw(1,0);

square.draw(1, 0);

let board = {
//    x: 0,
//    y: 0,
    rows: 20,
    cols: 10,
    squares: (function () {
        let squares = []
        for (let r = 0; r <= 20; r++) {
            let row=[]
            for (let c = 0; c <= 10; c++) {
                let s = { ...square };
                s.x = (c * s.w);
                s.y = (r * s.h);
                row.push(s);
            }
            squares.push(row);
        }
        console.log(squares);
        return squares;
    })(),
    draw: function () {
        let index=0
        this.squares.forEach(s => {
            let index=0
            this.squares[index].forEach (sq => {
                s[index].draw();
                index++;
            })
            
        });
    }
}
board.draw();

let Tetromino=function(aShape,row,col) {
    let tr=row;
    let tc=col;
    let shape=aShape;
    let currInd=0;
    let currPattern=shape.patterns[currInd];

    function draw() {
      for (let r=0; r<shape.size; r++) {
        for (let c=0; c<shape.size; c++) {
          // draw border
          let b={...square};
          b.x=tc*square.w;
          b.y=tr*square.h;
          b.w=square.w*shape.size;
          b.h=square.w*shape.size;
          b.color='transparent';
          b.strokeStyle='red';
          b.draw();

          // convert tr,tc,r,c -> x,y
          if (currPattern[r][c]!=0) {
            let s={...square};
            s.x=(tc+c)*square.w;
            s.y=(tr+r)*square.h;
            s.color=shape.color;
            s.draw();
          }
        }
      }
    }

    function update() {
      tr++;
    }
    function inBoundary(tetrominoRow,tetrominoCol) {
        for (let r=0; r<shape.size; r++) {
            for (let c=0; c<shape.size; c++) {

                let rr=tetrominoRow!=undefined?tetrominoRow:row+r;
                let cc=tetrominoCol!=undefined?tetrominoCol:col+c;
                if ((cc<0 || cc>9 || rr>19)&&currPattern[r][c]!=0) {
                    console.log('out of boundary');
                    return false;
                }
            }
        }
      }

    return {
      row:tr,
      col:tc,
      shape:shape,
      draw:draw,
      update:update,
      moveLeft: function() {
        if (inBoundary(col-1))
        ctx.clearRect(0,0,canvas.width,canvas.height);
        board.draw();
        tc--;
        draw();
      },
      moveRight: function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        board.draw();
        tc++;
        draw();
      },
      moveDown: function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        board.draw();
        tr++;
        draw();
      },
      rotateRight: function() {
        currInd++;
        if (currInd>3) {
            currInd=0;
        }
        currPattern=shape.patterns[currInd];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        board.draw();
        draw();
      },
      rotateLeft: function() {
        currInd--;
        if (currInd<0) {
            currInd=3;``
        }
        currPattern=shape.patterns[currInd];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        board.draw();
        draw();
      },
      inBoundary:inBoundary

    }
  }

  // test
  let currTetromino=Tetromino(tetriminos[6],0,0);
  // currTetromino.draw();

  //
  let pre=null;
  function loop() {
    requestAnimationFrame(loop);
    // set interval to 1 sec
    let curr=Date.now();
    if (curr-pre<1000) return; 
    pre=curr;
    
    // 1 clear
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 2 draw
    board.draw();
    currTetromino.draw();

    // 3 update
    currTetromino.update();
  }
  loop();
// function fillSquare(sx, sy, col) {
//     ctx.beginPath();
//     ctx.rect(sx * square.h, sy * square.w, square.w, square.h);
//     ctx.fillStyle = col;
//     ctx.fill();
// }

// function tertimino() {

//     function fillPiece(px, py, shape, color) {
//         shape.forEach(function (valA, y) {
//             valA.forEach(function (valB, x) {
//                 console.log(valA + ", " + valB + ", " + x);
//                 if (valB == 1) {
//                     fillSquare(x + px, y + py, color)
//                 }
//             });
//         });
//     }
// }
//console.log(tetriminos[6]["patterns"][0]);

// fillPiece(5, 10, tetriminos[6]["patterns"][0], "red");
//fillSquare(5,5,"blue");



// let pre=null;
// function loop() {
    
//     requestAnimationFrame(loop);

    

//     let curr=Date.now();
//     if (curr-pre<1000) return;
//     pre=curr;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     board.draw();
//     // fillPiece(5, 10, tetriminos[6]["patterns"][0], "red");
// }
loop();
