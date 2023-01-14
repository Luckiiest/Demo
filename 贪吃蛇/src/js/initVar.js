// 场景 == 广场 宽度系数 高度系数
var XLEN = 30;
var YLEN = 30;

// 方块 宽高
var SQUAREWIDTH = 20;

// 广场 位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

// 定义基类
function Square(x, y, width, height, viewContent) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = viewContent || document.createElement('div');
}

Square.prototype.touch = function () {};

// 更新属性
Square.prototype.update = function (x,y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + "px";
    this.viewContent.style.top = y * SQUAREWIDTH + "px";
}


// 定义子类
// 地板
var Floor = tool.extends(Square);
// 围墙 -> 围墙是由一个一个石头给组成的
var Stone = tool.extends(Square);
// 食物-->单例
var Food = tool.single(Square);
// 蛇 --> 单例
var Snake = tool.single();
// 蛇头-->单例
var SnakeHead = tool.single(Square);
// 蛇身
var SnakeBody = tool.extends(Square);
// 游戏场景-->单例
var Ground = tool.single(Square);
// 控制游戏的对象-->单例
var Game = tool.single();

// 集合所有的策略消息
var STRATEGYENUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE',
};
