var snake = new Snake();
snake.head = null;
snake.tail = null;


// 方向枚举,记录四个方向移动的坐标
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}

snake.init = function (ground) {
    // 创建蛇身，蛇头，渲染出来
    var SnakeHead = SquareFactory.create("SnakeHead",3,1,'red');
    var SnakeBody1 = SquareFactory.create("SnakeBody",2,1,'blue');
    var SnakeBody2 = SquareFactory.create("SnakeBody",1,1,'blue');

    // 链表，为了将蛇头和蛇身是一个整体，而不是一个个单独的个体
    SnakeHead.next = SnakeBody1;
    SnakeHead.last = null;

    SnakeBody1.next = SnakeBody2;
    SnakeBody1.last = SnakeHead;

    SnakeBody2.next = null;
    SnakeBody2.last = SnakeBody1;

    // 记录
    this.head = SnakeHead;
    this.tail = SnakeBody2;

    // 渲染
    ground.remove(SnakeHead.x,SnakeHead.y);
    ground.append(SnakeHead);

    ground.remove(SnakeBody1.x,SnakeBody1.y);
    ground.append(SnakeBody1);

    ground.remove(SnakeBody2.x,SnakeBody2.y);
    ground.append(SnakeBody2);

    // 默认方向
    snake.direction = DIRECTIONENUM.RIGHT;
}

// 引入策略处理
snake.strategies = {
    // 移动处理
    MOVE: function (snake, square, ground) {
        // 实现move

        // 新建蛇身
        // 将新创建的蛇身替换到蛇头的位置
        var newBody = SquareFactory.create("SnakeBody",snake.head.x,snake.head.y,'blue');
        // 将新创建的蛇身的next = 蛇头的next 
        newBody.next = snake.head.next;
        // 将新创建蛇身的的next的last = 新创建的蛇身
        newBody.next.last = newBody;
        // 将新创建的蛇身的last设为null，last应该指向蛇头，但是因为蛇头还没有创建出来
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);


        // 新建蛇头
        var newHead = SquareFactory.create("SnakeHead", square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(newHead.x,newHead.y);
        ground.append(newHead);

        snake.head = newHead;


        // 删除蛇尾
        // 创建地板
        var floor = SquareFactory.create("Floor",snake.tail.x,snake.tail.y,'orange');
        ground.remove(snake.tail.x,snake.tail.y);
        ground.append(floor);
        // 将蛇尾更改成上一段蛇身的last
        snake.tail = snake.tail.last;
    },
    // 吃处理
    EAT: function () {
        // 吃
    },
    // 死亡处理
    DIE: function () {
        // game over
        game.over();
    }
}

// 做一个预判，预判蛇下一步移动到哪里
snake.move = function (ground) {
    // 根据坐标来预判下一步
    // this.head.x => this.head.x + this.direction.x
    // this.head.y => this.head.y + this.direction.y
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];

    if(typeof square.touch == 'function'){
        // this => snake
        this.strategies[square.touch()](this, square, ground);
    }
}


