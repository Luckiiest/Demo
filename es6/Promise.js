let fs = require('fs');

let oStudent = {};
function readFile(path) {
    return new Promise((resolve,reject) => {
        fs.readFile(path,'utf-8',(err,data) => {
            if(data){
                resolve(data);
            }
        })
    })
}

// 返回值：promise对象
// 同步并发结果
Promise.all([readFile('./number.txt'),readFile('./name.txt'),readFile('./score.txt')]).then((val) => {
    console.log(val)
})

// race 赛跑，谁先成功就用谁的，只要有一个触发失败就会触发失败
//Promise.race()
Promise.race([readFile('./number.txt'),readFile('./name.txt'),readFile('./score.txt')]).then((val) => {
    console.log(val)
})


// Promise.all可以将多个Promise实例包装成一个新的Promise实例
// 同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组
// 而失败的时候则返回最先被reject失败状态的值

function test(x) {
    return new Promise((reason,reject) => {
        setTimeout(() => {
            Math.random() * 100 > 50 ? reason(x) : reject(x)
        },100)
    })
}

let oP = Promise.all([test('a'),test('b'),test('c')]);
oP.then((val) => {
    console.log(val);
},(reason) => {
    console.log(reason);
});


// 顾名思义：Promise.race就是赛跑的意思，意思就是说
// Promise.race([p1,p2,p3])里那个结果获得的快，就返回那个结果
// 不管结果本身是成功状态还是失败状态
Promise.race([test('a'),test('b'),test('c')]).then((val) =>{
    console.log(val,'ok')
},(reason) => {
    console.log(reason,'no');
});

// readFile('./number.txt').then((data) => {
//     return readFile(data);
// }).then((data) => {
//     return readFile(data);
// }).then((data) => {
//     console.log(data);
// })
// 
// 
// 
// 
// 
// 
// 




