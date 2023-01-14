//实现渲染
//
//
require('zepto-webpack'); //z代表zepto
require('./gaussBlur.js'); //高斯模糊函数

(function(root) {

    //body
    var $scope = z(document.body);
    //渲染歌曲信息
    function renderInfo(info) {
        var html = `<div class="song-name">${info.song}</div>
			<div class="singer-name">${info.singer}</div>
			<div class="album-name">${info.album}</div>`;
        $scope.find('.song-info').html(html);
    }

    //渲染图片
    function renderImg(src) {
    	var img = new Image();
    	img.src = src;
    	img.onload = function() {
    	    root.blurImg(img,$scope) //背景图片,两个参数，图片、盒子
    	    $scope.find('.song-img img').attr('src',src) //头像
    	}
    }

    //渲染islike
    function renderIsLike(islike) {
    	if(islike) {
    		$scope.find('.like-btn').addClass('liking');
    	} else {
    		$scope.find('.like-btn').removeClass('liking');
    	}
    }

    //总渲染
    root.render = function(data) {
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }

})(window.player || (window.player={}))
//通过window.player暴露函数