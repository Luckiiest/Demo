var arr = [1,2,3];
//for
//Array.prototype.forEach



//外部迭代器
/* function outerIterator(o) {
    let curIndex = 0;
    let next = () => {
        return {
            value: o[curIndex],
            done: o.length == ++curIndex,
        }
    }

    return {
        next
    }
}

let oIt = outerIterator(arr); */

// next (value: '',done: bool)
// 当执行next方法时，返回一个对象，对象中有一个value，一个done，value代表对象的值，done的值为布尔值，向外界传递是否迭代完成(true/false)



/* let os = Symbol('abc');
console.log(typeof os);

let os2 = Symbol({
    name: 'cst',
    // 当Symbol中没有toString方法时，Symbol会按着原型链寻找，找到toString方法，返回toString方法的值，如果写了toString方法，代表重写了toString方法
    toString: function() {
        return 'yd';
    }
})
console.log(os2);

//
let os3 = Symbol('abc');
console.log(os==os3); //false，具有唯一性


let obj = {
    [os3]: 'cst',
    [os]:'cst1'
} */

// arrr set map argument nodelist都有Symbol.iterator这样一个属性
// 静态属性
// Symbol.iterator就相当于Symbol('Symbol.iterator')

// ES6规范：interator

/* let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length:3,
    [Symbol.iterator]: function() {
        let curIndex = 0;
        let next = () => {
            return {
                value: curIndex,
                done: this.length = curIndex++
            }
        }
        return {
            next
        }
    }
}
 */

//生成器函数
/* function * test() {
    // yield，当执行到yield时，会停止执行，直到再执行next时，再继续下一步
    yield 'a';
    console.log('1');
    yield 'b';
    console.log('2');
    yield 'c';
    console.log('3');
    return 'd';
}

let oG = test();
// {value: 'a',done: false}
// oG.next(); */


/* function * test() {
    // 执行方式：蛇形方式，每次先执行yield，然后停止，再给value赋值，直到再遇到yield停止
    // value的值不是在于yield中的值，而是在于下一次执行next中传入的值

    // 先执行yield 'a'，停止，下一次时再给value赋值(传参)
    let value1 = yield 'a';
    console.log(value1);

    let value2 = yield 'b';
    console.log(value2);

    let value3 = yield 'c';
    console.log(value3);
    return 'd';
}

let oG = test();

console.log(oG.next());
// 传入的A，那么value1就是A
console.log(oG.next('A'));
console.log(oG.next('B'));
console.log(oG.next('C')); */


// Generator改写
/* let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length:3,
    [Symbol.iterator]: function *() {
        let currIndex = 0;
        while(currIndex != this.length) {
            yield this[currIndex];
            currIndex ++;
        }
    }
}

console.log([...obj]) */