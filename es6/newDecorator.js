"use strict";

var _dec, _class, _class2, _descriptor;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//面向对象
//张三
var oInput = document.getElementById('inp'),
    oBtn = document.getElementById('btn');
var Search = (_dec = dealData('张三'), Skin(_class = (_class2 = /*#__PURE__*/function () {
  //静态属性
  //ES6规范 static num() {return 10;}
  //ES7规范 static num = 10;
  //私有属性
  function Search() {
    _classCallCheck(this, Search);

    _initializerDefineProperty(this, "url", _descriptor, this);

    this.keyValue = '';
  } //装饰器
  // @名称


  _createClass(Search, [{
    key: "getContent",
    value: function getContent(a, b) {
      console.log('向' + this.url + '发送网络请求，数据：' + this.keyValue, a, b);
      return 10;
    }
  }]);

  return Search;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "url", [myReadOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'urlA-';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "getContent", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "getContent"), _class2.prototype)), _class2)) || _class); //target：类本身

function Skin(target) {
  target.aa = 10;
}

var oS = new Search();

oInput.oninput = function () {
  oS.keyValue = this.value;
};

oBtn.onclick = function () {
  oS.getContent();
}; //李四
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


function myReadOnly(proto, key, descriptor) {
  //
  // console.log(proto,key,descriptor);
  //可不可写
  descriptor.writable = false; //initializer()的返回值决定了属性url的值

  descriptor.initializer = function () {
    return "urlA-";
  }; //描述符属性：
  //configurable
  //enumerable
  //initializer
  //writable

} //修饰原型属性


function dealData(ms) {
  return function (proto, key, descriptor) {
    // console.log(proto,key,descriptor);
    var oldValue = descriptor.value; //代理思想

    descriptor.value = function () {
      var urlB = 'urlB-';
      console.log("向" + urlB + "发送网络请求，数据：" + this.keyValue + " 发送人 " + ms); //先把本来的getContent函数执行一遍，将arguments传给this（oS对象）

      return oldValue.apply(this, arguments);
    }; //原型描述符属性：
    //configurable
    //enumerable
    //value
    //writable

  };
} // //面向过程
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
