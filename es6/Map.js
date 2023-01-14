
// //
// //初始化
// //数组，每个元素都是一个数组,key,value
// //对象
// let oMp = new Map([['name','cst'],['age',18],['sex',true],[{},'----']]);


// //api
// let oMp1 = new Map();
// // 添加值 oMp1.set(key,value);
// oMp1.set('name','cst');
// oMp1.set('age',18);
// var obj = {};
// oMp1.set(obj,'---');
// oMp1.set({},'+++');
// // 获取值 oMp1.get(key)
// oMp1.get(obj);
// // 删除值 oMp1.delete(key)
// oMp1.delete('name');
// // keys(),属性值单独提取了出来
// oMp1.keys();
// // entries() 属性名对属性值，和开始基本一样
// oMp1.entries();
// // has(key)


// // oMp1.forEach((ele,key,self) => {
// //     console.log(ele,key,self);
// // })

// // for(let val of oMp1) {
// //     console.log(val);
// // }



// //Map原理存储分析 实现

// //链表，将每一个对象关联起来
// // {} {} {} {} {}
// let node3 = {
//     key: 'name3',
//     value: '2',
//     next: null
// };

// let node2 = {
//     key: 'name2',
//     value: '2',
//     next: node3
// };

// let node1 = {
//     key: 'name',
//     value: '1',
//     next: node2
// }


// let oMp = new Map([['name1','1'],['name2','2']]);

// // hash算法 -> 将一个不定范围的值转换成一个特定范围的值来输出
// // 在存值的时候，key值是不一定的，可能是对象，数组，字符串，数组，NaN
// // hash 特定范围的值

// //桶有8个位置，0 - 8
// [
//     {
//         key:'name1',
//         value:'1',
//         next: {
//             key:'name2',
//             value:'2'
//         }
//     },
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {}
// ]

//原生Map特性
//1.不重复
//2.属性不只是字符串，还可以是 {} null [] function number
//3.实现方法 delete set get has clear 

function myMap() {
    //桶长度 = 8
    this.bucketLength = 8;
    this.init();
}

//初始化
myMap.prototype.init = function() {
    //初始化 桶 长度8
    this.bucket = new Array( this.bucketLength );
    //循环遍历桶添加初始化值
    for(var i = 0;i < this.bucket.length; i++) {
        this.bucket[i] = {
            type: 'bucket' + i,
            next: null
        }
    }
}

//hash算法
//1. [0,8]
//2. 重复算值固定
myMap.prototype.makeHash = function(key) {
    let hash = 0;
    // key 可能是 string number boolean null  NaN [] {} function(){} undefine
    if(typeof key !== 'string') {
        //如果为数字，hash直接等于key
        if(typeof key == 'number') {
            //number NaN
            //判断key是否等于NaN
            hash = Object.is(key,NaN) ? 0 : key;
        } else if(typeof key == 'object') {
            //null {} [] 
            hash = 1;
        } else if(typeof key == 'boolean') {
            //true 1  |  false 0
            hash += key;
        } else {
            //undefine function() {}
            hash = 2;
        }
    } else {
        //string
        //'a' 'ab' '....很多个字符'
        //长度大于等于3，取字符串前三个字符的ascii，累加 取余 变为0-8（规则由自己定义）
        //长度不大于3时，就取长度位数进行计算
        for(let i = 0;i < 3; i++) {
            //判断如果字符没有第三位时返回0，有时就返回该位的ascii码
            hash += key[i] ? key[i].charCodeAt(0) : 0;
        }
    }
    return hash % 8; //生成0-8范围
}

//set方法
myMap.prototype.set = function(key,value) {
    //获取hash
    let hash = this.makeHash(key);
    //获取桶的序号
    let oTempBucket = this.bucket[hash];
    //循环条件，oTempBucket.next是否有值
    while(oTempBucket.next) {
        //如果next中的值与传入的值相同，那么就让next的value等于传入的value
        if (oTempBucket.next.key == key) {
            oTempBucket.next.value = value;
        //如果在key不等于next.key，就让oTempBucket自己等于自己的下一个，再次循环比较
        } else {
            oTempBucket = oTempBucket.next;
        }
    };
    //给最后一个oTempBucket添加值
    oTempBucket.next = {
        key: key,
        value: value,
        next: null
    }
}

//get方法
myMap.prototype.get = function(key) {
    //获取hash
    let hash = this.makeHash(key);
    //获取桶的序号
    let oTempBucket = this.bucket[hash];
    //循环条件，oTempBucket.next是否有值
    while(oTempBucket.next) {
        //如果next中的值与传入的值相同，那么就返回next中的value
        if(oTempBucket.next.key == key) {
            return oTempBucket.next.value;
        //如果在key不等于next.key，就让oTempBucket自己等于自己的下一个，再次循环比较
        } else {
            oTempBucket = oTempBucket.next;
        }
    }

    //如果oTempBucket.next没有值，直接返回undefine
    return undefined;
}

//delete方法
myMap.prototype.delete = function(key) {
    //获取hash
    let hash = this.makeHash(key);
    //获取桶的序号
    let oTempBucket = this.bucket[hash];
    //循环条件，oTempBucket.next是否有值
    while (oTempBucket.next) {
        //如果next中的值与传入的值相同，那么就将next的指向改变为next.next
        if(oTempBucket.next.key == key) {
            oTempBucket.next = oTempBucket.next.next;
            return true;
        //如果传入的key不等于next.key，就让oTempBucket自己等于自己的下一个，再次循环比较
        } else {
            oTempBucket = oTempBucket.next;
        }
    }

    return false;
}

//has方法
myMap.prototype.has = function(key) {
    //获取hash
    let hash = this.makeHash(key);
    //获取桶的序号
    let oTempBucket = this.bucket[hash];

    while(oTempBucket.next) {
        if(oTempBucket.next.key == key) {
            return true
        } else {
            oTempBucket = oTempBucket.next;
        }
    }

    return false;
}

//clear方法
myMap.prototype.clear = function(key) {
    this.init();
}

let oMp = new myMap();
let obj = {};
oMp.set('name','yzl');
oMp.set('name1','yzl');
oMp.set(obj,'----');
oMp.get('name');
oMp.get('name1');