class Snake {
    constructor(lines, rows, speed=50) {
        this.lines = lines;
        this.rows = rows;
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
                    this.body[0].x = this.rows-1;
                break;
                break;
            case "RIGHT" :
                this.body[0].x += 1;
                if (this.body[0].x >= this.rows)
                    this.body[0].x = 0;
                break;
                break;
        }
    }

    getLastPoint() {
        return new Point(this.body[this.body.length-1].x,this.body[this.body.length-1].y);
    }

    grow(point) {
        this.body.push(point);
    }

    changeDirection(direction) {
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
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let lines = 30;
let rows = 20;
let snake = new Snake(lines, rows, 50);
let counts = 0;
let timer = null;

$(document).ready(function() {
    generateGrid(lines,rows);
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
    placeSnakeIntoGrid(snake);
    timer = setInterval(()=> {
        executeGame();
    },snake.speed);
});

function executeGame() {
    if((++counts % 20) == 0 && $(".fruit").length == 0)
        generateFruit();
    let lastPoint = snake.getLastPoint();
    snake.move();
    if (snake.isAlive())
    {
        if (checkFruit(snake)) {
            snake.grow(lastPoint);
            $(".fruit").removeClass("fruit");
            $("span#score").text(++snake.score);
        }
        placeSnakeIntoGrid(snake);
    }
    else {
        clearInterval(timer)
        if (confirm('Perdu. Voulez-vous recommencer ?'))
            document.location.reload();
    }
}

function generateGrid(lines = 20, rows = 20) {
    for (let i = 0; i < lines ; i++) {
        let dom = '<tr>';
        for (let j = 0; j < rows ; j++)
            dom +='<td id="grid-'+i+'-'+j+'" data-x="'+j+'" data-y="'+i+'"></td>';
        dom += '</tr>';
        $("#grid").append(dom);
    }
}

function generateFruit() {
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * lines);
    let id = "#grid-"+y+"-"+x;
    if (!($(id).hasClass('body')) && !($(id).hasClass('head')))
        $(id).addClass('fruit');
}

function checkFruit(snake) {
    if (snake.body[0].x == parseInt($($(".fruit")).data("x")) && snake.body[0].y == parseInt($($(".fruit")).data("y")))
        return true;
    return false;
}

function placeSnakeIntoGrid(snake) {
    $("#grid tr td").removeClass('head').removeClass('body');
    for(let i = 0; i < snake.body.length ; i++) {
        let id = "#grid-"+snake.body[i].y+"-"+snake.body[i].x;
        $(id).addClass(i == 0 ? 'head' : 'body');
    }
}