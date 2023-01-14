var game = new Game();

// 定时器
game.timer = null;
// 速度
game.iSpeedInterval = 400;
// 分数
game.score = 0;


game.init = function () {

    ground.init();
    snake.init(ground);

    // 绑定事件 监控控制方向
    document.onkeydown = function (e) {
        // e.which
        // 左37 上38 右49 下40
        // e.key
        // 左 => ArrowLeft
        // 上 => ArrowUp
        // 右 => ArrowRight
        // 下 => ArrowDown
        if((e.key == 'ArrowLeft' || e.which==37) && snake.direction != DIRECTIONENUM.RIGHT) {
            snake.direction = DIRECTIONENUM.LEFT;
            // console.log('left',e.key);
        } else if((e.key == 'ArrowUp' || e.which == 38) && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.UP;
            // console.log('up',e.key);
        } else if((e.key == 'ArrowRight' || e.which == 49) && snake.direction != DIRECTIONENUM.LEFT) {
            snake.direction = DIRECTIONENUM.RIGHT;
            // console.log('right',e.key);
        } else if((e.key == 'ArrowDown' || e.which == 40) && snake.direction != DIRECTIONENUM.UP) {
            snake.direction = DIRECTIONENUM.DOWN;
            // console.log('down',e.key);
        }
    }
}

game.start = function () {
    clearInterval(game.timer);
    game.timer = setInterval(function () {
        snake.move(ground);
    },game.iSpeedInterval);
}

game.over = function () {
    clearInterval(game.timer);
    alert("得分：" + game.score);
}

game.init();


// 创建食物
function createFood(ground) {
    var x = null;
    var y = null;
    var flag = true;
    while(flag) {
        // x != 0 29
        // x = [1,28]之间
        x = 1 + parseInt(Math.random() * 28); //[0, 28);
        y = 1 + parseInt(Math.random() * 28);
        var ok = true;
        for(var node = snake.head; node; node = node.next) {
            if(x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }
        if(ok) {
            flag = false;
        }
    }
    var food = SquareFactory.create("Food",x,y,'green');
    ground.remove(food.x,food.y);
    ground.append(food);
}

createFood(ground);