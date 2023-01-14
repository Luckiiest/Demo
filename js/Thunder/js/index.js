
function Mine(tr, td, mineNum) {
    this.tr = tr; // 行数
    this.td = td; // 列数
    this.mineNum = mineNum; // 雷的数量

    this.squares = []; // 存储所有方块的信息，二维数组，行和列的方式排放，存取都是行列的形式
    this.tds = []; // 存储所有单元格的DOM对象，二维数组
    this.surplusMine = mineNum; // 剩余雷的数量 
    this.allRight = false; // 右击标的小红旗是否全是雷，用来判断用户是否游戏成功

    this.parent = document.getElementsByClassName('gameBox')[0];
}

// 生产 n 个不重复的数字
Mine.prototype.randomNum = function () {
    var square = new Array(this.tr * this.td); // 生成一个空数组，但是有长度，长度为格子的总数
    for (var i = 0; i < square.length; i++) {
        square[i] = i;
    }
    square.sort(function () { return 0.5 - Math.random() });
    return square.slice(0, this.mineNum);
}

// 初始化
Mine.prototype.init = function () {
    // this.randomNum();
    var rn = this.randomNum(); // 雷在格子里的位置
    var n = 0; // 用来找到对应的索引
    for (var i = 0; i < this.tr; i++) {
        this.squares[i] = [];
        for (var j = 0; j < this.td; j++) {
            // this.squares[i][j] = [];
            // n++; 
            // 取一个方块，在数组里的数据要使用行与列的形式去取。找方块周围方块的时候要用坐标的形式去取，行与列的形式和坐标的 x，y 轴的是相反的
            if (rn.indexOf(++n) != -1) {
                // 如果这个条件成立，说明现在再循环到的这个索引在雷的数组里找到了，那就表示这个索引对应的是个雷
                this.squares[i][j] = { type: 'mine', x: j, y: i };
            } else {
                this.squares[i][j] = { type: 'number', x: j, y: i, value: 0 };
            }
        }
    }

    this.parent.oncontextmenu = function () {
        return false;
    }
    // 剩余雷数
    this.mineNumDom = document.querySelector('.mineNum');
    this.mineNumDom.innerHTML = this.surplusMine;

    this.createDom();
    this.updateNum();
}


// 创建表格
Mine.prototype.createDom = function () {
    var This = this;
    var table = document.createElement('table');

    for (var i = 0; i < this.tr; i++) {// 创建行 tr
        var domTr = document.createElement('tr');
        this.tds[i] = [];

        for (var j = 0; j < this.td; j++) { // 创建列 td

            var domTd = document.createElement('td');

            domTd.pos = [i, j]; // 把格子对应的行与列存到格子上，为了下面通过这个值去数组里取到对应的数据
            domTd.onmousedown = function () {
                This.play(event, this); // This指的是实例对象，this指的是点击的那个td
            }

            this.tds[i][j] = domTd; // 把所有创建的 td 添加到数组当中

            // if (this.squares[i][j].type == 'mine') {
            //     domTd.className = 'mine';
            // }
            // if (this.squares[i][j].type == 'number') {
            //     domTd.innerHTML = this.squares[i][j].value;
            // }

            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    this.parent.innerHTML = '';
    this.parent.appendChild(table)
}

// 找某个放个周围的八个方格
Mine.prototype.getAround = function (square) {
    var x = square.x;
    var y = square.y;
    var result = []; // 把找到的格子的坐标返回出去（二维数组）

    /*
        x-1,y      x,y-1    x+1,y
        x-1,y      x,y      x+1,y
        x+1,y      x,y+1    x+1,y+1
    */
    // 通过坐标去循环到9宫格
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (
                i < 0 || // 格子超出了左边的范围
                j < 0 || // 格子超出了上边的范围
                i > this.td - 1 || // 格子超出了右边的范围
                j > this.tr - 1 || // 格子超出了下边的范围
                (i == x && j == y) || // 当前循环到的格子是自己
                this.squares[j][i].type == 'mine' // 周围是雷的格子
            ) {
                continue;
            }
        }
        result.push(j, i) // 要以行与列的形式返回出去，因为到时候需要用它去取数组里的数据

    }
    return result;
}

// console.log(mine.getAround(mine.squares[0][0]));

// 更新所有的数字
Mine.prototype.updateNum = function(){
    for(var i = 0;i < this.tr;i ++){
        for(j = 0;j < this.td;j ++){
            if(this.squares[i][j].type == 'number'){
                continue;
            }
            var num = this.getAround(this.squares[i][j]);

            for(var k = 0;k < num.length;k ++){
                // num[i] = [0,1];
                // num[i][0] = 0;
                // num[i][1] = 1;

                this.squares[num[k][0]][num[k][1]].value += 1;
            }
        }
    }
    // console.log(this.squares);
}

Mine.prototype.play = function (ev, obj) {
    var This = this;
    if (ev.which == 1 && obj.className != 'flag') {
        // 点击的是左键
        var curSquare = this.squares[obj.pos[0]][obj.pos[1]];
        var cl = ['zero', 'one', 'two', 'three', 'four', 'five'];
        if (curSquare.type == 'number') {
            // 用户点击数字
            // console.log('数字');
            obj.innerHTML = curSquare.value;
            obj.className = cl[curSquare.value];

            if (curSquare.value == 0) {
                /**
                 * 用户点到了 0，
                 *      1. 显示自己
                 *      2. 找四周
                 *          1. 显示四周，如果四周不为0，那就显示到这里，就不需要在找了
                 *          2. 如果值为0
                 *              1. 显示自己
                 *              2. 如果值为0（递归）
                 */
                obj.innerHTML = ''; //如果数字为0，就为空
                function getAllZero(square) {
                    var around = This.getAround(square); // 找到了周围 n 个格子

                    for (var i = 0; i < around.length; i++) {
                        var x = around[i][0];
                        var y = around[i][1];

                        This.tds[x][y].className = cl[This.squares[x][y].value]
                        if (This.squares[x][y].value == 0) {
                            // 如果以某个格子值为0，那就要接着调用函数
                            if (!This.tds[x][y].check) {
                                // 给对应的 td 添加一个属性，这条属性用于决定这个格子有没有被找过，如果找过的话，他的值就为 true,下一次就不会再找了
                                This.tds[x][y].check = true;
                                getAllZero(This.squares[x][y]);
                            }
                        } else {
                            // 如果以某个格子为中心找到的值不为0，那就把人家的数字显示出来
                            This.tds[x][y].innerHTML = This.squares[x][y].value;
                        }
                    }
                }
                getAllZero(curSquare);
            }

        } else {
            // 用户点到雷
            this.gameOver(obj);
        }
    }
    // 用户点击的是右键
    if (ev.which == 3) {
        // 如果右击的是数字，不能点击
        if (obj.className && obj.className != 'flag') {
            return;
        }
        obj.className = obj.className == 'flag' ? '' : 'flag';

        if (this.squares[obj.pos[0]][obj.pos[1]].type == 'mine') {
            this.allRight = true;// 用户标的小红旗都是雷
        } else {
            this.allRight = false;
        }

        if (obj.className = 'flag') {
            this.mineNumDom.innerHTML = --this.surplusMine;
        } else {
            this.mineNumDom.innerHTML = ++this.surplusMine;
        }

        if (this.surplusMine == 0) {
            // 剩余雷的数量为0，表示红旗标完了，这时候要判断游戏是成功还是结束
            if (this.allRight) {
                // 这个条件成立，说明全部标对了
                alert('恭喜你，游戏通过')
            } else {
                alert('游戏失败！')
                this.gameOver();
            }
        }
    }
}

// 游戏失败函数

Mine.prototype.gameOver = function (clickTd) {
    /**
     * 1. 显示的雷
     * 2. 取消所有格子的点击事件
     * 3. 给点中的那个鼠标上一个红
     */

    for (var i = 0; i < this.tr; i++) {
        for (var j = 0; j < this.td; j++) {
            if (this.squares[i][j].type == 'mine') {
                this.tds[i][j].className = 'mine';
            }
            this.tds[i][j].onmousedown = null;
        }
    }
    if (clickTd) {
        clickTd.style.backgroundColor = '#f00';
    }
}

// 上边 button 功能
var btns = document.querySelectorAll('.level button');
var mine = null; // 用来存储生产的实例
var ln = 0; // 用来处理当前选中的状态
var arr = [[9, 9, 10], [16, 16, 40], [28, 28, 99]]; // 不同级别的行数列数雷数

for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        btns[ln].className = '';
        this.className = 'active';

        ln = i;
        mine = new Mine(...arr[i]);
        mine.init();
    }
}
btns[0].onclick(); // 初始化一下

// var mine = new Mine(28, 28, 99);
// mine.init(); 

