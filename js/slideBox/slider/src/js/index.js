var ppt = {
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    len: $('.slider').length,
    nowIndex: 0, // 现在的索引
    lastIndex: undefined, // 上一页的索引
    flag:true,
    slider_timer: undefined,
    init: function() {
    	if(this.len > 1) {
        	this.createDom(this.len);
        	this.bindEvent();
        	this.slider_auto();
    	}
    },
    // 动态生成左右箭头和索引圆点Dom
    createDom: function(len) {
        var strLi = '';
        var strBtn = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                strLi += '<li class="active"></li>';
            } else {
                strLi += '<li></li>';
            }
        }
        strLi = '<div class="slider-order"><ul>' + strLi + '</ul></div>';
        strBtn = `<div class="slider-btn">
		            <button class="left-btn"></button>
		            <button class="right-btn"></button>
		        </div>`;
        this.$wrapper.append(strLi).append(strBtn);
    },
    bindEvent: function() {
    	var that = this;
    	$('.left-btn').add($('.right-btn')).add($('.slider-order li')).on('click',function() {

    		if($(this).attr('class') == 'left-btn') {
    			that.totalFun('left');

    		} else if($(this).attr('class') == 'right-btn') {
    			that.totalFun('right');

    		} else {
    			var value = $(this).index();
    			that.totalFun(value);
    		}
    	});

    	// 自定义go和come事件，go事件为消失，come事件为出现并且延迟300毫秒
    	this.$slider.on('go',function() {
    		$(this).fadeOut(300)
    			.find($('p')).animate({fontSize:"16px"}).end()
    			.find($('.img')).animate({width:'0%'});

    	});
    	this.$slider.on('come',function() {
    		$(this).delay(300).fadeIn(300)
    			.find($('p')).delay(300).animate({fontSize:"20px"}).end()
    			.find($('.img')).delay(300).animate({width:'40%'},function() {
    				// 等到执行完毕之后再将锁打开
    				that.flag = true;
    			});
    	});
    },
    // 找索引
    getIndex: function(direction) {
    	// 把上次nowIndex的那个值赋给lastIndex
    	this.lastIndex = this.nowIndex; 
    	if(direction == 'left' || direction == 'right') {
    		if(direction == 'left') {
    			this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
    		} else {
    			this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
    		}
    	} else {
    		this.nowIndex = direction;
    	}
    },
    // 小圆点改变样式
    changOrder: function(index) {
    	$('.active').removeClass('active');
    	$('li').eq(index).addClass('active');
    },
    // 把所有的点击事件封装
    totalFun: function(direction) {
    	if(this.flag) {
    		this.getIndex(direction);
			if(this.nowIndex != this.lastIndex) {
    			this.flag = false;
				this.$slider.eq(this.lastIndex).trigger('go');
				this.$slider.eq(this.nowIndex).trigger('come');
				this.changOrder(this.nowIndex);
				this.slider_auto();
			}
    	}
    },
    // 计时器，3s自动轮播
    slider_auto: function() {
    	var that = this;
		clearTimeout(this.slider_timer);
    	this.slider_timer = setTimeout(function() {
    		that.totalFun('right');
    	},3000);
    }
}
ppt.init();