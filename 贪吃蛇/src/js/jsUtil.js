var tool = {
    inherit: function (target,origin) {
        // 原型的方式继承  圣杯模式
        var temp = function () {};
        temp.prototype = origin.prototype;  
        target.prototype = new temp();
        target.prototype.constructor = target;
    },

    // 混合继承，继承私有属性，并调用inherit继承原型
    // var Food = tool.extends(Square); //返回一个函数
    extends: function (origin) {
        var result= function () {
            origin.apply(this,arguments);
        }
        this.inherit(result,origin);
        return result;
    },

    // 单例函数，如果传入参数则继承origin，
    single: function (origin) {
        var singResult = (function () {
            var instance;
            return function () {
                if(typeof instance == 'object') {
                    return instance;
                }                
                instance = this;
                // 如果有origin时继承origin私有属性
                origin && origin.apply(this,arguments);
                return instance;
            }
        })()
        // 继承origin的原型原型
        origin && this.inherit(singResult,origin);
        return singResult;
    }
}



// 单例模式+原型+私有属性继承
// tool.single(origin);
// var Food = tool.single(Square);
// var oF1 = new Food(20,30,50,50);
// var oF2 = new Food();
// console.log(oF1 == oF2);

// 原型+私有属性继承
// var Food = tool.extends(Square);
// var oF = new Food(10,20,50,50);
// console.log(oF.x,oF.y,oF.width,oF.height);

// 原型继承
// function Food() {}
// tool.inherit(Food,Square);
// var oF = new Food(10,20,50,50);
// console.log(oF.touch);
