"use strict";

/* function sum(a,b) {
    return a + b;
}

var sum = function(a,b) {
    return a + b;
} */
// let sum = (a,b) => ({a:a,b:b});
// console.log(sum(10,20))

/* function sum(x) {
    return function(y) {
        return function(z) {
            return x + y + z;
        }
    }
};

var sum1 = sum(1);
var sum2 = sum1(2);
console.log(sum2(3)); */

/* let sum = x => y => z => x + y + z;

let sum = (x) => (y) => (z) => x + y + z;
    
let sum = () => {
    this.a = 10;
}

new sum(); */

/* function outer() {
    //arguments
    //9 10 11
    let sum = (a,b) => {
        console.log(arguments,a,b);
    };
    sum(1,2);
}
outer(9,10,11); */

/* function Curry() {
    
    var arg = arguments;
    return function() {

    }
} */
// this特点
// let sum = () => {
//     //this => window
//     console.log(this.a); //outerObj
// }

/* var a = 'outerObj';
let obj = {
    a:"innserObj",
    fn: () => {
        // this => window
        console.log(this.a);
    }
}
obj.fn(); */

/* var a = 'outerObj';
let obj = {
    a: 'innerObj',
    fn() {
        let sum = () => {
            //this => obj
            console.log(this.a);
        }
        return sum;
    }
}
let outerSum = obj.fn();
outerSum(); */

/* var obj = {
  ms: 'abc',
  fn: function fn() {
    var _this = this;

    // var self = this;
    setTimeout(function () {
      console.log(_this.ms);
    }, 500);
  }
};
obj.fn(); */

// Object.defineProperty

