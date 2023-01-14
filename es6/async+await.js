/* 


let fs = require('fs');

function promisify(func) {
	return function(...arg) {
		return new Promise((res,rej) => {
			// 在node中参数基本上都是error-first形式，所以基本可以写成(err,data)形式
			func(...arg, (err,data) => {
				if(err) {
					rej(err);
				} else {
					res(data);
				}
			})
		})
	}
}

// let readFile = promisify(fs.readFile);

// readFile('./number.txt','utf-8').then((val) => {
// 	console.log(val);
// })


function promisifyAll(obj) {
	for (let key in obj) {
		let fn = obj[key];
		if(typeof fn === 'function') {
			obj[key + 'Async'] = promisify(fn)
		}
	}
}

promisifyAll(fs);
// fs.readFile -> readFileAsync
// fs.writeFile -> readFileAsync

fs.readFileAsync('./number.txt','utf-8').then((val) => {
	console.log(val);
}) */


// 异步编程
// 回调地狱
// try catch
// 同步并发异步的结果

// 回调地狱
// try catch
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

// 以同步的形式运行，以异步的结果返回
// async 代表异步，async只是一个Generator语法糖
async function read(url) {
	try {
		// await 代表等待
		let val1 = await readFile(url);
		let val2 = await readFile(val1);
		let val3 = await readFile(val2);
		return val3;
	}catch(e) {
		console.log(e); //使用async可以解决try catch打印错误的问题
	}
}

read('./numbe.txt').then((val) => {
	console.log(val);
})


//同步并发的异步结果
async function read1() {
	let val1 = null;
	try {
		val1 = await readFile('./number.txt');
		console.log(val1);
	} catch(e) {
		console.log(e,1);
	}
}

async function read2() {
	let val2 = null;
	try {
		val2 = await readFile('./number.txt');
		console.log(val2);
	} catch(e) {
		console.log(e,2);
	}
}

async function read3() {
	let val3 = null;
	try {
		val3 = await readFile('./number.txt');
		console.log(val3);
	} catch(e) {
		console.log(e,3);
	}
}

function readAll(...args) {
	args.forEach((ele) => {
		ele();
	})
}

readAll(read1,read2,read3); 