// x = BASE_X_POINT
// y = BASE_Y_PONT
// width = XLEN * SQUAREWIDTH 30*20
// height = YLEN * SQUAREWIDTH 30*20
var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

// 初始化
ground.init = function () {
    // 渲染广场
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.backgroundColor = '#0ff';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';

    document.body.appendChild(this.viewContent);

    // 存储管理广场中所有方块对象
    this.SquareTable = [];
    // 循环列，将数组中的每一排都知道有多少列了
    for (var i = 0; i < YLEN; i++) {
        // 将每一排有多少列赋给SquareTable
        this.SquareTable[i] = new Array(XLEN);
        // x,y => j,i
        // j 为 列，i 为 排，和坐标轴一样，x,y轴
        for (var j = 0; j < XLEN; j++) {
            /* 
                需要加上判断条件来产生墙
                // 排
                // y = 0, i = 0    下标为0，也就是第一排，也是墙
                // y = 29, i = 29，总共30排，到达下标29时就是第30排，就是墙
                // 列
                // x = 0, j = 0     下标为0，也就是第一列，是墙
                // x = 29, j = 29   总共30列，到达下标29时就是第30列，就是墙
            */
            if ((j == 0 || i == 0 || j == XLEN - 1 || i == YLEN - 1)) {
                // 创建石头
                var newSquare = SquareFactory.create('Stone',j,i,'black');
            } else {
                // 创建地板
                var newSquare = SquareFactory.create("Floor",j,i,'orange');
            }
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
};

// 拆除方块方法
ground.remove = function (x,y) {
    // 根据坐标来定位方块，真正的找到那个方块
    // y是列，x是排
    var square = this.SquareTable[y][x];
    // 从视觉上抹去,从html结构上抹去
    this.viewContent.removeChild(square.viewContent);
    // 从数据上抹去
    this.SquareTable[y][x] = null;
} 

// 安装方块方法
ground.append = function (square) {
    // 从视觉上进行添加方块，从html结构上添加方块
    this.viewContent.appendChild(square.viewContent);
    // 从数据上进行添加方块
    this.SquareTable[square.y][square.x] = square;
}

