// ajax('GET', 'http://localhost/me/major/Code/Web/demo/network/waterFall/src/js/data.txt', addDom, 'cpage=2', true);
// function addDom(data) {
//     console.log(JSON.parse(data));
// }


// 创建立即执行函数，使它成为一个封闭的域
(function() {
    var oLi = document.getElementsByClassName('box'),
        flag = false,
        num = 1,
        initWidth = 200;
    // init函数，请求ajax
    function getData() {
        // 给ajax加一个锁，如果请求了ajax就不可以再请求了，需要滚轮到页面底部再次请求
        if(!flag) {
            flag = true;
           ajax('GET', 'http://localhost/me/major/Code/Web/demo/network/waterFallFlow/src/js/dataList.txt', addDom, 'cpage=' + num, true);
           num ++;
        }
    }
    getData();
    // addDom 创建DOM元素
    function addDom(data) {
        // 把数据JSON格式化
        var dataList = JSON.parse(data);
        // forEach循环遍历一下数据
        dataList.forEach(function(ele, index) {
            // 最短的li
            var minIndex = getMinList(oLi);
            // console.log(minIndex);

            // 创建item标签以及里面需要的标签
            var oItem = document.createElement('div'),
                oImg = new Image(),
                oP = document.createElement('p');
                oCont = document.createElement('div');
            // 给他们的属性赋值
            oCont.className = 'cont';
            oItem.className = 'item';
            oImg.src = ele.cover.url;
            // 图片元素的实际等比例高度
            oImg.height = ele.cover.height*initWidth/ele.cover.width;
            oCont.style.height =  ele.cover.height*initWidth/ele.cover.width;
            oP.innerHTML = ele.title;

            // 如果加载失败的话，图片会有一个小border，所以判断如果图片没有加载出来，把图片外面的边框遮住
            oImg.oneror = function() {
                this.style.width = '202px';
                // oImg.height = ele.height*initWidth/ele.width + 2;
                this.style.margin = '-1px';
            }

            // 把img标签插入到cont标签里面
            oCont.appendChild(oImg);
            // 把cont和p标签插入到item标签里面
            oItem.appendChild(oCont);
            oItem.appendChild(oP);

            // 给最短的li插入item
            oLi[minIndex].appendChild(oItem);
        })
        flag = false;
    }
    // 判断oLi中那个li元素高度最短
    function getMinList(dom) {
        // 先定义第一个li最短，然后再逐一比较
        var minHeight = dom[0].offsetHeight,
            // i从1开始，可以少循环一步
            i = 1,
            // 存储高度最短那一列的索引
            index = 0;
        for (i; i < dom.length; i++) {
            // 因为offsetHeight等属性每次使用都会重新计算页面布局，所以会非常耗费性能，所以单独摘出来，只计算一次
            var minH = dom[i].offsetHeight;
            // 如果第i列比minHeight还要短
            if (minH < minHeight) {
                // 就让minHeight等于第i列的高度
                minHeight = minH;
                // 同时，index储存i
                index = i;
            }
        }
        // 返回index，表明这是第几列
        return index;
    }
    // 监听滚轮事件,看鼠标滚到最下面了没有，如果到下面重新请求ajax
    window.onscroll = function() {
        // 滚动条已经滚过去的距离
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        // 当前显示区域的一个高度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 拿到四个li中最短的那个li的高度
        var pageHeight = oLi[getMinList(oLi)].offsetHeight;
        // 如果滚动条滚过去的距离加上显示区域的一个高度大于li中对端的那个高度
        if(scrollHeight + clientHeight > pageHeight) {
            getData();
        }
        
    }
})()