$(function() {
    // 案例分析，当滚动条滚动到一定位置时，去请求不同的数据，四个选项卡，每个选项卡请求不同的数据

    // 如果由于网络问题，比方 网速较慢 那么可能会出现 前一次的加载还没有完成 就出现了 另外一次加载。 所以说咱们需要避免这种问题

    // 当滚动条滚动到yi'ding'w 

    var load = false; // 判断当前是否可以请求数据 true不可以，false可以
    var indexNum = [0, 0, 0, 0]; // 四个div不同的请求次数
    $(window).scroll(function() {
        if (load) return
        // 滚动过的距离
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        // 当前屏幕高度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // tabBox的高度
        var pageHeight = $('.tabBox').outerHeight();

        // 当滚动过的距离+当前屏幕的高度>tabBox的高度，说明已经到达了底部
        if (scrollHeight + clientHeight > pageHeight) {
            load = true;
            // 四个选项卡，请求四个数据，四个api接口
            // 判断当前那个选项卡被选中
            var index = $('.tabBox .show').index();
            var url;
            switch (index) {
                case 0:
                    url = "http://localhost/me/major/Code/Web/project/jQueryJiguoMall/json/data.js"
                    break;
                case 1:
                    url = "http://localhost/me/major/Code/Web/project/jQueryJiguoMall/json/sq.js"
                    break;
                case 2:
                    url = "http://localhost/me/major/Code/Web/project/jQueryJiguoMall/json/sy.js"
                    break;
                case 3:
                    url = "http://localhost/me/major/Code/Web/project/jQueryJiguoMall/json/js.js"
                    break;
            }
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                success: function(data) {
                    // 如果当前页的请求次数，大于总数据，直接return
                    if (indexNum[index] >= data.length) {
                        load = false;
                        return ;
                    }
                    var dataList = data[indexNum[index]];
                    var param = '';
                    for (var i = 0; i < dataList.length; i++) {
                        param += `<a href="" class="con">
			                        <span class="top-tip sf">${dataList[i].text}</span>
			                        <img src="${dataList[i].img}" alt="">
			                        <h2 class="name">巴慕达 The Toaster 烤面包机</h2>
			                        <p class="label">
			                            <span class="green">${dataList[i].price}</span>
			                            <span class="green">20台</span>
			                        </p>
			                        <p class="sq"><span class="red">1392</span>申请</p>
			                        <p class="current red">剩余时间2天</p>
			                    </a>`
                    }
                    $('.tabBox .show').append(param);
                    indexNum[index]++;
                    if (indexNum[index] >= dataList.length) {
                        $('.tabBox .show').append('<span class="no-more">没有更多了</span>')
                    }
                    load = false;
                }
            })
        }

    })

})