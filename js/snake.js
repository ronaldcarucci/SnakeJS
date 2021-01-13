class SnakeGame {
    constructor(snake = new Snake(), keys = {'UP' : 'z', 'DOWN' : 's', 'LEFT' : 'q', 'RIGHT' : 'd'}, timer = 0) {
        this.snake = snake;
        this.timer = timer;
        this.count = 0;
        this.keys = keys;
    }

    prepareGrid() {
        let game = this;
        let score = document.querySelector('span#score');
        document.addEventListener("DOMContentLoaded", function() {
            game.snake.generateGrid();
            game.snake.generateBlocks();
            game.snake.placeSnakeIntoGrid();
            if (score != null) score.innerHTML = game.snake.score;
            document.addEventListener("keypress",function(event) {
                switch(event.key) {
                    case game.keys.UP :
                        if (game.snake.direction != "DOWN")
                            game.snake.changeDirection("UP");
                        break;
                    case game.keys.DOWN :
                        if (game.snake.direction != "UP")
                            game.snake.changeDirection("DOWN");
                        break;
                    case game.keys.LEFT :
                        if (game.snake.direction != "RIGHT")
                            game.snake.changeDirection("LEFT");
                        break;
                    case game.keys.RIGHT :
                        if (game.snake.direction != "LEFT")
                            game.snake.changeDirection("RIGHT");
                        break;
                }
            });
            document.querySelectorAll("#controls-container span").forEach(control => {
                control.addEventListener('click',function(){
                    switch(control.dataset.key) {
                        case game.keys.UP :
                            if (game.snake.direction != "DOWN")
                                game.snake.changeDirection("UP");
                            break;
                        case game.keys.DOWN :
                            if (game.snake.direction != "UP")
                                game.snake.changeDirection("DOWN");
                            break;
                        case game.keys.LEFT :
                            if (game.snake.direction != "RIGHT")
                                game.snake.changeDirection("LEFT");
                            break;
                        case game.keys.RIGHT :
                            if (game.snake.direction != "LEFT")
                                game.snake.changeDirection("RIGHT");
                            break;
                    }
                }, 'false');
            });
            game.timer = setInterval(()=> {
                game.executeGame();
            },game.snake.speed);
        });
    }

    executeGame() {
        let score = document.querySelector('span#score');
        if((++this.count % 20) == 0 && document.querySelectorAll('.fruit').length == 0)
            this.snake.generateFruit();
        let lastPoint = this.snake.getLastPoint();
        this.snake.move();
    
        if (this.snake.isAlive() && !this.snake.checkblocks())
        {
            if (this.snake.checkFruit()) {
                this.snake.grow(lastPoint);
                document.querySelector('.fruit').classList.remove('fruit');
                if (score != null) score.innerHTML = ++this.snake.score;
            }
            this.snake.placeSnakeIntoGrid();
        }
        else {
            clearInterval(this.timer)
            if (confirm('Perdu. Voulez-vous recommencer ?'))
                document.location.reload();
        }
    }
}
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

    generateGrid() {
        for (let i = 0; i < this.lines ; i++) {
            let dom = '<tr>';
            for (let j = 0; j < this.columns ; j++)
                dom +='<td id="grid-'+i+'-'+j+'" data-x="'+j+'" data-y="'+i+'"></td>';
            dom += '</tr>';
            document.querySelector("#grid").innerHTML += dom;
        }
    }
    
    generateFruit() {
        let x = Math.floor(Math.random() * this.columns);
        let y = Math.floor(Math.random() * this.lines);
        let id = "#grid-"+y+"-"+x;
        if (!document.querySelector(id).classList.contains('body') && 
            !document.querySelector(id).classList.contains('head') && 
            !document.querySelector(id).classList.contains('block') )
            document.querySelector(id).classList.add('fruit');
    }
    
    generateBlocks() {
        for (let i = 0 ; i < Math.floor(Math.random() * 10) + 10; i++) {
            let x = Math.floor(Math.random() * this.columns);
            let y = 0;  
            do {
                y = Math.floor(Math.random() * this.lines);  
            } while (y == 3)
            let id = "#grid-"+y+"-"+x;
            if (!document.querySelector(id).classList.contains('body') && 
                !document.querySelector(id).classList.contains('head'))
                document.querySelector(id).classList.add('block');
        }
    }
    
    checkFruit() {
        let fruit = document.querySelector('.fruit');
        if (!fruit) return false;
        if (this.body[0].x == parseInt(fruit.dataset.x) && this.body[0].y == parseInt(fruit.dataset.y)) return true;
        return false;
    }
    
    checkblocks() {
        let blocks = document.querySelectorAll('.block');
        if (!blocks) return false;
        for (let i = 0 ; i < blocks.length ; i++)
        if (this.body[0].x == parseInt(blocks[i].dataset.x) && this.body[0].y == parseInt(blocks[i].dataset.y)) return true;
        return false;
    }
    
    placeSnakeIntoGrid() {
        let elems = document.querySelectorAll('#grid tr td');
        elems.forEach(elem => {
            elem.classList.remove('head');
            elem.classList.remove('body');
        });
        for(let i = 0; i < this.body.length ; i++) {
            let elem = document.querySelector(`#grid-${this.body[i].y}-${this.body[i].x}`);
            if (elem != null) elem.classList.add(i == 0 ? 'head' : 'body');
        }
    }
}

class Point {
    constructor(x=0,y=0) {
        this.x = x;
        this.y = y;
    }
}
