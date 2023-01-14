var timer = null;
var sliderPage = document.getElementsByClassName('sliderPage')[0];
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
var moveWidth = sliderPage.children[0].offsetWidth;
var num = sliderPage.children.length - 1;
var lock = true;
var index = 0;
var oSpanArray = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');

leftBtn.onclick = function () {
    autoMove('right->left');
}
rightBtn.onclick = function () {
    autoMove('left->right');
}

for (var i = 0; i < oSpanArray.length; i++) {
    (function (myIndex) {
        oSpanArray[i].onclick = function () {
            lock = false;
            clearTimeout(timer);
            index = myIndex;
            startMove(sliderPage, { left: -index * moveWidth }, function () {
                lock = true;
                timer = setTimeout(autoMove, 1500);
                changIndex(index);
            })
        }
    }(i))
}

// direction 方向
// 'left->right'  默认轮播方向 / 点击right按钮 / undefined
// 'right->left' 点击左侧按钮改变运动方向
function autoMove(direction) {
    if (lock) {
        lock = false;
        clearTimeout(timer);
        if (!direction || direction == 'left->right') {
            index++;
            startMove(sliderPage, { left: sliderPage.offsetLeft - moveWidth }, function () {
                if (sliderPage.offsetLeft == -(num * moveWidth)) {
                    index = 0;
                    sliderPage.style.left = '0px';
                }
                timer = setTimeout(autoMove, 1500);
                lock = true;
                changIndex(index);
            })
        } else if (direction == 'right->left') {
            if (sliderPage.offsetLeft == 0) {
                index = num;
                sliderPage.style.left = -num * moveWidth + 'px';
            }
            index--;
            startMove(sliderPage, { left: sliderPage.offsetLeft + moveWidth }, function () {
                timer = setTimeout(autoMove, 1500);
                lock = true;
                changIndex(index);
            })
        }
    }
}

function changIndex(index) {
    for (var i = 0; i < oSpanArray.length; i++) {
        oSpanArray[i].className = '';
    }
    oSpanArray[index].className = 'active';
}

timer = setTimeout(autoMove, 1500);

function getStyle(obj, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[prop];
    } else {
        return obj.currentStyle[prop]
    }
}

function startMove(obj, json, callback) {
    clearInterval(obj.timer);
    var iSpeed, iCur;
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            iCur = parseInt(getStyle(obj, attr));
            iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            obj.style[attr] = iCur + iSpeed + 'px';
            if (iCur != json[attr]) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            typeof callback == 'function' ? callback() : '';
        }
    }, 30)
}
