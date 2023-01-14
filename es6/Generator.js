//node

// let fs = require('fs');
// function readFile(path) {
//     return new Promise((res,rej) => {
//         fs.readFile(path,'utf-8',(err,data) => {
//             if(data) {
//                 res(data);
//             } else {
//                 rej(err)
//             }
//         })
//     })
// }

/* readFile('./number.txt').then((val) => {
    return readFile(val);
}).then((val) => {
    return readFile(val);
}).then((val) => {
    console.log(val);
}) */



let fs = require('fs');
function readFile(path) {
    return new Promise((res,rej) => {
        fs.readFile(path,'utf-8',(err,data) => {
            if(data) {
                res(data);
            } else {
                rej(err);
            }
        })
    })
}

//Generator 函数
function * read() {
    let val1 = yield readFile('./number.txt');
    let val2 = yield readFile(val1);
    let val3 = yield readFile(val2);
    return val3;
}
let oG = read();

//第一种优化方法，但是使用这种方法还不如直接使用Promise
// let {value,done} = oG.next();
// value.then((val) => {
//     let {value,done} = oG.next(val);
//     value.then((val) => {
//         let {value,done} = oG.next(val);
//         value.then((val) => {
//            console.log(val);
//         })
//     })
// })

// 递归优化，第二种优化方法
// 其实是一个库，一个叫做TJ的大神写的库，可以是使用npm来下载
// TJ 写的库 express koa node
function Co(oIt) {
    return new Promise((res,rej) => {
        let next = (data) => {
            let {value,done} = oIt.next(data);
            if(done) {
                res(value);
            } else {
                value.then((val) => {
                    next(val)
                ,rej})
            }
        }
        next();
    })
}

Co(read()).then((val) => {
    console.log(val);
})