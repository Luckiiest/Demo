"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//全局作用域
//局部作用域
//闭包
// var arr = [];
// for (let i = 0; i < 10; i++) {
// 	arr[i] = function(){
// 		console.log(i);
// 	}
// }
// arr[0]();
// arr[4]();
// arr[7]();
// let
// let b = 10;
// {
// 	let b = 20;
// 	{
// 		console.log(b);
// 	}
// }
// if(true) {
// 	let a = 10;
// 	console.log(a);
// }
// console.log(a);
// let i = 0;
// while(i < 5) {
// 	i ++;
// 	let b = 10 + i;
// 	console.log(b);
// }
//console.log(b);
//const 常量
// const PI = 20;
//存储常量的里面的值不能发生改变

/* function sum() {
	let sumNumber = 0;
	// let arg = [].slice.call(arguments,0);
	// arg.sort pop shift
	for(var i = 0;i < arguments.length;i++ {
		sumNumber += arguments[i];
	};
	return sumNumber;

}
sum(1,2,3); */
//写场景
//... 收集 -> []数组

/* function sum(...arg) {
	let sumNumber = 0;
	arg.forEach(function(ele,index) {
		sumNumber += ele;
	})
	return sumNumber;
}

console.log(sum(1,2,3)); */
//去除最大值，最小值，求平均值

/* function avearge(...arg) {
	arg.sort(function(a,b){
		return a - b;
	})
	arg.pop();
	arg.shift();
	return computedScore(...arg)
}

function computedScore(...arg) {
	let sum = 0;
	arg.forEach(function(ele){
		sum += ele;
	})
	return sum / arg.length;
}
avearge(89,23,5,7,434,121,564,223); */
//读场景，展开

/* let arr = [1,2,3,4,5];
console.log(...arr);
//1 2 3 4 5
let arr1 = [1,2,3,4];
let arr2 = [6,7,8];
let newArr = [...arr1,...arr2]; */
var company = {
  name: 'long',
  age: 18
};
var leader = {
  name: 'cg',
  age: 20
};
var teachDepartment = {
  leader: _objectSpread({}, leader),
  personNum: 25,
  say: function say() {}
};
Object.assign({}, company, teachDepartment);

var obj = _objectSpread(_objectSpread(_objectSpread({}, company), teachDepartment), {}, {
  leader: _objectSpread({}, leader)
}); // obj.leader.name = 'stg';


var obj1 = JSON.parse(JSON.stringify(teachDepartment));
