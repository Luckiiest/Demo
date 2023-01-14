// 抽象工厂模式

function SquareFactory() {
    
}

SquareFactory.create = function (type,x,y,color) {
    if(typeof SquareFactory.prototype[type] == undefined) {
        throw "no this type";
    }
    if(SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    var newSquare = new SquareFactory.prototype[type](x,y,color);

    return newSquare;   
}

// 初始化颜色,坐标
SquareFactory.prototype.init = function (square,color,message) {
    // console.log(square,color);
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.viewContent.style.backgroundColor = color;

    square.touch = function () {
        return message;
    }
}

SquareFactory.prototype.Floor = function (x,y,color) {
    // this
    var floor = new Floor(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(floor,color,STRATEGYENUM.move);
    return floor;
}

SquareFactory.prototype.Food = function (x,y,color) {
    var food = new Food(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(food,color,STRATEGYENUM.eat);
    return food;
}

SquareFactory.prototype.Stone = function (x,y,color) {
    var stone = new Stone(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(stone,color,STRATEGYENUM.die);
    return stone;
}

SquareFactory.prototype.SnakeHead = function (x,y,color) {
    var snakeHead = new SnakeHead(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(snakeHead,color,STRATEGYENUM.die);
    
    snakeHead.update(x,y);
    return snakeHead;
}

SquareFactory.prototype.SnakeBody = function (x,y,color) {
    var snakeBody = new SnakeBody(x,y,SQUAREWIDTH,SQUAREWIDTH);
    this.init(snakeBody,color,STRATEGYENUM.die);
    return snakeBody;
}
