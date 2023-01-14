// //Set Map Proxy
// //兼容性不是很好

// // 参数必须具有迭代接口，[] '' arguments NodeList
// let oS = new Set([1,2,3,[1,2],true,{name: 'yzl'},1,2]);

// let oS2 = new Set('abcabd');

// oS.add(1);
// oS.add([1,2]);
// oS.add(true);

// oS.forEach(val => {
//     console.log(val);
// })
// //ES6新增for循环 for of，循环条件需要有迭代接口
// for(let prop of oS) {
//     console.log(prop);
// }


// //Set -> []，Set转换数组
// let arr = [1,2,2,3,3];
// let oS = new Set(arr);
// //两种方法
// // ... ，可以拓展任何一个具有迭代接口的值
// // Array.from()，ES6新规定的数组静态方法，把类数组及具有迭代接口的数据转换为数组
// console.log(Array.from(oS))
// console.log([...oS]);





//去重，缺陷：对象并不会按照属性值去重
let o = {name:'cst'}
let arr = [1,2,3,4,o,5,1,o,2,3,{name:'cg'}];
let obj = {};
let newArr = []; //新数组
for(var i = 0;i < arr.length; i++) {
    if(!obj[arr[i]]) {
        newArr.push(arr[i]);
        obj[arr[i]] = true;
    }
}

// Set去重,弥补缺陷
let o = {name:'cst'}
let arr = [1,2,3,4,o,5,1,o,2,3,{name:'cg'}];
let oS = new Set(arr);//就会去重返回到oS中


// 并集 交集 差集
// 集合
// arr obj set map 都是集合，存储形式不一样
//并集
let arr1 = [1,2,3,4,2,3,9];
let arr2 = [3,2,3,2,5];
let oS = new Set([...arr1,...arr2]);
//交集
let arr1 = [1,2,3,4,2,3,9];
let arr2 = [3,2,3,2,5];
let oS1 = new Set(arr1);
let oS2 = new Set(arr2);
//当oS1的ele与oS2的ele相同时则，则返回当前ele
let newArr = [...oS1].filter(ele => oS2.has(ele))
//差集
let arr1 = [1,2,3,4,2,3];
let arr2 = [3,2,3,2,5];
let oS1 = new Set(arr1);
let oS2 = new Set(arr2);
let newArr = [...oS1].filter(ele => !oS2.has(ele))
let newArr1 = [...oS2].filter(ele => !oS1.has(ele))
let newArr2 = [...newArr,...newArr1];