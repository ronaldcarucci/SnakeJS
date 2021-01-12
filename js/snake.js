class Snake {
    constructor(lines=10, columns=10, speed=50) {
        this.lines = lines;
        this.columns = columns;
        this.body = [new Point(3,3),new Point(2,3),new Point(1,3)];
        this.direction = "RIGHT";
        this.score = 0;
        this.speed = speed;
    }

    move() {
        for (let i = this.body.length-1 ; i > 0 ; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        switch (this.direction) {
            case "UP" :
                this.body[0].y -= 1;
                if (this.body[0].y < 0)
                    this.body[0].y = this.lines-1;
                break;
            case "DOWN" :
                this.body[0].y += 1;
                if (this.body[0].y >= this.lines)
                    this.body[0].y = 0;
                break;
            case "LEFT" :
                this.body[0].x -= 1;
                if (this.body[0].x < 0)
                    this.body[0].x = this.columns-1;
                break;
            case "RIGHT" :
                this.body[0].x += 1;
                if (this.body[0].x >= this.columns)
                    this.body[0].x = 0;
                break;
        }
    }

    getLastPoint() {
        return new Point(this.body[this.body.length-1].x,this.body[this.body.length-1].y);
    }

    grow(point = new Point()) {
        this.body.push(point);
    }

    changeDirection(direction = "") {
        this.direction = direction;
    }

    isAlive() {
        for(let i = 1; i < this.body.length; i++)
            if ((this.body[0].x == this.body[i].x) && (this.body[0].y == this.body[i].y))
                return false;
        return true;
    }
}

class Point {
    constructor(x=0,y=0) {
        this.x = x;
        this.y = y;
    }
}

let snake = new Snake(30, 20, 100);
let counts = 0;
let timer = null;

$(document).ready(function() {
    generateGrid(snake);
    generateBlocks(snake);
    placeSnakeIntoGrid(snake);
    $("span#score").text(snake.score);
    $(document).keypress(function(event) {
        switch(event.originalEvent.key) {
            case 'z' :
                if (snake.direction != "DOWN")
                    snake.changeDirection("UP");
                break;
            case 's' :
                if (snake.direction != "UP")
                    snake.changeDirection("DOWN");
                break;
            case 'q' :
                if (snake.direction != "RIGHT")
                    snake.changeDirection("LEFT");
                break;
            case 'd' :
                if (snake.direction != "LEFT")
                    snake.changeDirection("RIGHT");
                break;
        }
    });
    $("#controls span").click(function(){
        switch($(this).data('key')) {
            case 'z' :
                if (snake.direction != "DOWN")
                    snake.changeDirection("UP");
                break;
            case 's' :
                if (snake.direction != "UP")
                    snake.changeDirection("DOWN");
                break;
            case 'q' :
                if (snake.direction != "RIGHT")
                    snake.changeDirection("LEFT");
                break;
            case 'd' :
                if (snake.direction != "LEFT")
                    snake.changeDirection("RIGHT");
                break;
        }
    });
    timer = setInterval(()=> {
        executeGame();
    },snake.speed);
});

function executeGame() {
    if((++counts % 20) == 0 && document.querySelectorAll('.fruit').length == 0)
        generateFruit(snake);
    let lastPoint = snake.getLastPoint();
    snake.move();

    if (snake.isAlive() && !(checkblocks(snake)))
    {
        if (checkFruit(snake)) {
            snake.grow(lastPoint);
            document.querySelector('.fruit').classList.remove('fruit');
            document.querySelector('span#score').innerHTML = ++snake.score;
        }
        placeSnakeIntoGrid(snake);
    }
    else {
        clearInterval(timer)
        if (confirm('Perdu. Voulez-vous recommencer ?'))
            document.location.reload();
    }
}

function generateGrid(snake = new Snake()) {
    for (let i = 0; i < snake.lines ; i++) {
        let dom = '<tr>';
        for (let j = 0; j < snake.columns ; j++)
            dom +='<td id="grid-'+i+'-'+j+'" data-x="'+j+'" data-y="'+i+'"></td>';
        dom += '</tr>';
        $("#grid").append(dom);
    }
}

function generateFruit(snake = new Snake) {
    let x = Math.floor(Math.random() * snake.columns);
    let y = Math.floor(Math.random() * snake.lines);
    let id = "#grid-"+y+"-"+x;
    if (!($(id).hasClass('body')) && !($(id).hasClass('head')) && !($(id).hasClass('block')))
        $(id).addClass('fruit');
}

function generateBlocks(snake = new Snake()) {
    for (let i = 0 ; i < Math.floor(Math.random() * 7) + 3; i++) {
        let x = Math.floor(Math.random() * snake.columns);
        let y = Math.floor(Math.random() * snake.lines);  
        let id = "#grid-"+y+"-"+x;
        if (!($(id).hasClass('body')) && !($(id).hasClass('head')))
            $(id).addClass('block');
    }
}

function checkFruit(snake = new Snake()) {
    let fruit = document.querySelector('.fruit');
    if (!fruit) return false;
    if (snake.body[0].x == parseInt(fruit.dataset.x) && snake.body[0].y == parseInt(fruit.dataset.y)) return true;
    return false;
}

function checkblocks(snake = new Snake()) {
    let blocks = document.querySelectorAll('.block');
    if (!blocks) return false;
    for (let i = 0 ; i < blocks.length ; i++)
    if (snake.body[0].x == parseInt(blocks[i].dataset.x) && snake.body[0].y == parseInt(blocks[i].dataset.y)) return true;
    return false;
}

function placeSnakeIntoGrid(snake = new Snake()) {
    let elems = document.querySelectorAll('#grid tr td');
    elems.forEach(elem => {
        elem.classList.remove('head');
        elem.classList.remove('body');
    });
    for(let i = 0; i < snake.body.length ; i++) {
        let elem = document.querySelector(`#grid-${snake.body[i].y}-${snake.body[i].x}`);
        elem.classList.add(i == 0 ? 'head' : 'body');
    }
}
