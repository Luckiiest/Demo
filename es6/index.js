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

let company = {
	name: 'long',
	age: 18
};

let leader= {
	name: 'cg',
	age:20
}

let teachDepartment = {
	leader: {
		...leader,
	},
	personNum: 25,
	say: function() {

	}
}


Object.assign({},company,teachDepartment)

let obj = {
	...company,
	...teachDepartment,
	leader: {
		...leader
	}
}

// obj.leader.name = 'stg';
let obj1 = JSON.parse(JSON.stringify(teachDepartment));
