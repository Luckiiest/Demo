//面向对象
//张三
let oInput = document.getElementById('inp'),
    oBtn = document.getElementById('btn');

@Skin //修饰类
class Search {
    //静态属性
        //ES6规范 static num() {return 10;}
        //ES7规范 static num = 10;
    //私有属性
    constructor() {
        this.keyValue = '';
    }
    //装饰器
    // @名称
    @myReadOnly //修饰url属性，给url加了装饰器
    //私有属性
    url = 'urlA-';
    
    @dealData('张三') //修饰原型属性，给getContent加了装饰器
    //原型属性
    getContent (a, b) {
        console.log('向' + this.url + '发送网络请求，数据：' + this.keyValue,a,b);
        return 10;
    }
}

//target：类本身
function Skin(target) {
    target.aa = 10;
}

let oS = new Search();

oInput.oninput = function () {
    oS.keyValue = this.value;
};

oBtn.onclick = function () {
    oS.getContent();
};


//李四
//装饰器
//修饰私有属性的描述符属性
    //configurable
     //enumerable
     //initializer
     //writable
//装饰原型上的属性的描述符属性
    //configurable
    //enumerable
    //initializer
    //writable

//装饰私有属性
//参数：原型 修饰属性名称 描述符属性
function myReadOnly(proto,key,descriptor) {
    //
    // console.log(proto,key,descriptor);
    //可不可写
    descriptor.writable = false;
    //initializer()的返回值决定了属性url的值
    descriptor.initializer = function() {
        return "urlA-";
    };
     //描述符属性：
     //configurable
     //enumerable
     //initializer
     //writable
}
//修饰原型属性
function dealData (ms) {
    return function (proto,key,descriptor) {
        // console.log(proto,key,descriptor);
        let oldValue = descriptor.value;
        //代理思想
        descriptor.value = function() {
    
            var urlB = 'urlB-';
            console.log("向" + urlB + "发送网络请求，数据：" + this.keyValue + " 发送人 " + ms);
    
            //先把本来的getContent函数执行一遍，将arguments传给this（oS对象）
            return oldValue.apply(this,arguments);
        }
        //原型描述符属性：
         //configurable
         //enumerable
         //value
         //writable
    }
}





// //面向过程
// // 张三
// var keyValue = '';
// oInput.oninput = function () {
//     keyValue = this.value
// }
// oBtn.onclick = function () {
//     newGetContent(keyValue)
// }

// function getContent (data) {
//     //模拟发送网络请求
//     var url = 'urlA-';
//     console.log('向' + url + '发送网络请求，数据：' + data);
// }

// //代理
// var newGetContent = dealFunc(getContent);

// //李四
// function dealFunc(func) {
//     return function(data) {
//         //
//         var urlB = 'urlB-';
//         console.log('向' + urlB + '发送网络请求，数据：' + data)
//         return func.apply(this,arguments);
//     }
// }
