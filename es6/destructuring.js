/* (function(){
    

    let {name,age} = obj;
    console.log(name,age)
})() */
let obj = {
    name: 'cts',
    age: 18
};

// 默认赋值
/* {
    let {name:oName,age:oAge,sex = 'male'} = obj
    console.log(oName,oAge);
};


function sum(a = 10,b = 20) {
    return a + b;
}
sum(1);

let arr = [1,2,3];
let {0:x, 1:y, 2:z} = arr;
console.log(x,y,z);
let {length} = arr; */


/* let res = { 
    "ordernum": "234345353",
    "name": "李易峰",
    "spect":"有范的" ,
    "price": "99.9",
    "number": "1",
    "amount": "99.9",
    "imgurl": "/img/2.jpg",
    "adderss": {
        "name":"关艳",
        "mobile": "123456789",
        "orderAdderss": "学府路52号"
    }
};

let {name,spect,price,number,amount} = res;

console.log(name,spect,price,number,amount); */