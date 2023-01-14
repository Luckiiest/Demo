var personArr = [
    { name: '沈浩', src: './img/1.png', des: '我好英俊！', sex: 'm' },
    { name: '张磊', src: './img/2.png', des: '我是沙雕吗？ 是的。', sex: 'm' },
    { name: '王宇博', src: './img/3.jpg', des: '我好帅！', sex: 'm' },
    { name: '赵亮', src: './img/4.jpg', des: '瓜皮赵', sex: 'm' },
    { name: '刘秀莹', src: './img/5.jpg', des: '呜哇呜哇', sex: 'f' },
    { name: '张蒙召', src: './img/6.jpg', des: '我好自恋！', sex: 'm' },
    { name: '刘飞翔', src: './img/6.jpg', des: '！！！！', sex: 'm' },
    { name: '刘莹', src: './img/7.jpg', des: '呜哇呜哇', sex: 'f' },
]

var oUl = document.getElementsByClassName('list-box')[0];
var oSearchInput = document.getElementsByClassName('search-input')[0];
var oSearchBtn = document.getElementsByClassName('search-btn')[0];

function renderList(arr) {
    var str = '';
    arr.forEach(function (ele,index) {
        str += `<li>
                    <img src="${ele.src}" alt="">
                    <p class="username">${ele.name}</p>
                    <p class="des">${ele.des}</p>
                </li>`
    })
    oUl.innerHTML = str;
}
renderList(personArr);

var state = {
    text: '',
    sex: 'a'
}

oSearchInput.oninput = function(e) {
    state.text = this.value;

    renderList(filterText(state.text,personArr));
}

function filterText(text,arr) {
    return arr.filter(function(ele,index) {
        return ele.name.indexOf(state.text) != -1 ? true : false;
    })
}

oSearchBtn.addEventListener('click',function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(e.target.nodeName == 'SPAN') {
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        state.sex = e.target.getAttribute('sex');

        renderList(lastFilterFunc(personArr));
    }
})

function filterSex(sex,arr) {
    return sex == 'a' ? arr : arr.filter(function(ele,index) {
        return ele.sex == sex;
    })
}


function  unionFilterFunc(obj) {
    return function(arr) {
        var lastArr = arr;
        for(var prop in obj) {
            lastArr = obj[prop](state[prop],lastArr);
        }
        return lastArr;
    }
}

var lastFilterFunc = unionFilterFunc({text: filterText,sex: filterSex});

