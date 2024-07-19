import {ctx, collisionOnTopBottom, collisionOnLeftRight, collisionOnEvery, playbounce, left, right, gameOver} from "./main.js"
let block = {
    x: 200,
    y: 100,
    w: 80,
    h: 20,
    exist: true,
    g: null,
    init: function () {
        //console.log('j');
        this.g = ctx.createLinearGradient(this.x, this.y, this.x + this.w, this.y + this.h);
        this.g.addColorStop(0, 'lightseagreen');
        this.g.addColorStop(1, 'white');
        //console.log(this.g);
    },
    draw: function () {
        if (!this.exist) { return };
        ctx.beginPath();

        ctx.fillStyle = this.g;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    },
    update: function () {
        if (collisionOnTopBottom(ball, this)) {
            if (this.exist == true) {
                ball.vy = ball.vy * -1;
                this.exist = false
                //score += 10;
                ball.update();
            }
        }
        if (collisionOnLeftRight(ball, this)) {
            if (this.exist == true) {
                ball.vx = ball.vx * -1;
                this.exist = false
                //score += 10;
                ball.update();
            }
        }
    }
}

let paddle = {
    x: canvas.width / 2 - 80,
    y: canvas.height - 20,
    w: 160,
    h: 20,
    vx: 5,
    init: function () {
        this.x = canvas.width / 2 - 80;
        this.y = canvas.height - 20;
        this.w = 160;
        this.h = 20;
        this.vx = 5;
    },
    draw: function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = 'black';
        ctx.fill();
    },
    update: function () {
        if (left === true && this.x > 0) {
            this.x -= this.vx;
        }
        if (right === true && this.x < canvas.width - this.w) {
            this.x += this.vx;
        }
    }
}


let maxAngle = 160;
let minAngle = 20;
let ball = {
    x: canvas.width / 2,
    y: canvas.height - 15 - paddle.h,
    r: 15,
    vx: 5,
    vy: -2,
    rg: null,
    init: function () {
        this.x = canvas.width / 2;
        this.y = canvas.height - 15 - paddle.h;
        this.r = 15;
        this.vx = 5;
        this.vy = -2;

    },
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.rg = ctx.createRadialGradient(this.x + 5, this.y - 5, 0, this.x, this.y, this.r);
        this.rg.addColorStop(0, 'lightblue');
        this.rg.addColorStop(1, "blue");
        ctx.fillStyle = this.rg;
        ctx.fill();
    },
    update: function () {





        //this.y+this.r>paddle.y && this.x>=paddle.x && this.x<=paddle.x+paddle.w
        if (collisionOnEvery(this, paddle)) {
            //console.log('ball hit paddle');

            let hitX = ball.x - paddle.x;
            //console.log(hitX);
            let angle = maxAngle - Math.floor((maxAngle - minAngle) / paddle.w * hitX);
            //console.log(angle);
            let energy = (this.vx ** 2 + this.vy ** 2) ** 0.5;
            //console.log(energy);
            this.vx = energy * Math.cos(angle * Math.PI / 180);
            this.vy = -energy * Math.sin(angle * Math.PI / 180);
            //console.log(this.vx,this.vy);
            playbounce();


            //this. vy*=-1;
        }
        /*
        for (item in blocks) {
            if (blocks[item]["exist"] === true) {
            if (ball.x >= blocks[item].x
                && ball.x <= blocks[item].x + blocks[item].w
                && ball.y + ball.r >= blocks[item].y
                && ball.y - ball.r <= blocks[item].y + blocks[item].h
                || Math.sqrt((((blocks[item].x - ball.x) * (blocks[item].x - ball.x)) + ((blocks[item].y - ball.y) * (blocks[item].y - ball.y)))) < ball.r
                || Math.sqrt((((blocks[item].x + blocks[item].w - ball.x) * (blocks[item].x + blocks[item].w - ball.x)) + ((blocks[item].y + blocks[item].h - ball.y) * (blocks[item].y + blocks[item].h - ball.y)))) < ball.r) {
                    this.vy = this.vy * -1
            }
        }
        }
        */



        if (this.x < this.r) {
            this.vx = Math.abs(this.vx);
            playbounce();
        }
        if (this.x > canvas.width - this.r) {
            this.vx = Math.abs(this.vx) * -1;
            playbounce();
        }
        if (this.y < 15) {
            this.vy = Math.abs(this.vy);
            playbounce();
        }
        if (this.y - this.r > canvas.height) {
            gameOver();
        }

        this.x += this.vx;
        this.y += this.vy;
    }
}
export {block, paddle, ball}