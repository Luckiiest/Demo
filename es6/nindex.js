// let a = 10;
// console.log(a);

//
let fs = require('fs');
//readFile读取，参数：路径、编码集、回调
// fs.readFile('./number.txt','utf-8',(err,data) => {
//     if(data) {
//         fs.readFile(data,'utf-8',(err,data) => {
//             if(data) {
//                 fs.readFile(data,'utf-8',(err,data) => {
//                     console.log(data);
//                 })
//             }
//         })
//     }
// });

//并发异步操作，最后我们想得到所有的结果

//几个并发操作，获得几个结果
let oStudent = {};

function show(data) {
    console.log(data);
}
function show2(data) {
    console.log(data);
}

fs.readFile('./number.txt', 'utf-8', (err, data) => {
    if (data) oStudent.number = data;
    //Object.keys的length==3时，执行show()函数,第一种方法，非常的不简便
        // Object.keys(oStudent).length == 3 && show(oStudent);
    //第二种方法：after，不可以同时执行两种函数
        // newShow(oStudent);
    //第三种方法：发布订阅
    Store.fire(oStudent);
});
fs.readFile('./name.txt', 'utf-8', (err, data) => {
    if (data) oStudent.name = data;
    //Object.keys的length==3时，执行show()函数,第一种方法，非常的不简便
        // Object.keys(oStudent).length == 3 && show(oStudent);
    //第二种方法：after，不可以同时执行两种函数
        // newShow(oStudent);
    //第三种方法：发布订阅
    Store.fire(oStudent);
});
fs.readFile('./score.txt', 'utf-8', (err, data) => {
    if (data) oStudent.score = data;
    //Object.keys的length==3时，执行show()函数,第一种方法，非常的不简便
        // Object.keys(oStudent).length == 3 && show(oStudent);
    //第二种方法：after，不可以同时执行两种函数
        // newShow(oStudent);
    //第三种方法：发布订阅
    Store.fire(oStudent);
});

//after中有一个不好的地方，就是after只可以执行一个函数，如果执行第二个函数，则需要另外再执行一个after
// function after(times, cb) {
//     return function () {
//         --times == 0 && cb.apply(null, arguments);
//     };
// }
// let newShow = after(3, show);


//Promise 原理
//发布订阅
let Store = {
    list: [],
    //执行次数次数
    times:3,
    //将订阅的函数添加到list中
    subscribe(func) {
        this.list.push(func);
    },
    //times=0时，list遍历循环执行
    fire(...arg) {
        --this.times == 0 && this.list.forEach((ele) => {
            ele.apply(null,arg);
        })
    },
};

Store.subscribe(show);
Store.subscribe(show2);
