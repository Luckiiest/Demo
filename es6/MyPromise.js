// 原生Promise特性
//new
// 参数：executor 同步执行，executor中要有两个参数(resolve,reject)
// 触发Fulfilled Rejected状态（成功，失败），没有触发之前是pending等待状态

// 异步操作
// 链式操作
// then异步执行，抛出错误
// 空then
// 返回值是对象时

function MyPromise(executor) {
    // 将self事先等于window
    var self = this;

    // 状态：一开始为进行中pending
    self.status = 'pending';

    // 为了then可以调用函数的参数，为self声明两个参数来接收两个函数的参数
    self.resolveValue = null;
    self.rejectReason = null;

    // 回调数组，当注册函数时不执行，先存入数组，当真正执行函数时，在执行
    self.ResolveCallBackList = [];
    self.RejectCallBackList = [];

    // 成功函数
    function resolve(value) {
        //只有状态===pending时才可以转换状态
        if (self.status === 'pending') {
            self.status = 'Fulfilled'; //成功
            //将value赋值给self的resolveValue，以便then使用
            self.resolveValue = value;
            // 执行回调函数中的函数
            self.ResolveCallBackList.forEach(function (ele) {
                ele();
            });
        }
    }

    //失败函数
    function reject(reason) {
        //只有状态===pending时才可以转换状态
        if (self.status === 'pending') {
            self.status = 'Rejected'; //失败
            // 将reason赋值给self的rejectReason，以便then使用
            self.rejectReason = reason;
            // 执行回调函数中的函数
            self.RejectCallBackList.forEach(function (ele) {
                ele();
            });
        }
    }

    // 使用try{}catch{}判断错误，当executor抛出错误时，执行reject()来打印错误
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// 处理返回值函数
function ResolutionReturnPromise(nextPromise, returnValue, res, rej) {
    // 如果返回值是Promise对象时
    if (returnValue instanceof MyPromise) {
        //Promise 对象
        returnValue.then(
            function (val) {
                res(val);
            },
            function (reason) {
                rej(reason);
            }
        );

        // 如果返回值不是Promise对象时，执行res
    } else {
        res(returnValue);
    }
}

// then函数，参数：onFulfilled,onRejected两个函数参数，分别代表完成、拒绝
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    // 空then处理方法：
    //若没有onFulfilled时则返回参数val
    //若onRejected则抛出参数reason错误
    if (!onFulfilled) {
        onFulfilled = function (val) {
            return val;
        };
    }
    if (!onRejected) {
        onRejected = function (reason) {
            throw new Error(reason);
        };
    }

    // 将self事先等于window
    var self = this;

    // 链式操作
    // 拿到上一次函数返回结果，用于下一次then的参数
    var nextPromise = new MyPromise(function (res, rej) {
        // 当状态为Fulfilled时，执行onFulfilled完成
        if (self.status === 'Fulfilled') {
            //异步方式执行操作：setTimeout
            setTimeout(function () {
                // 在then中抛出错误时，在下一个then中的reject函数中打印
                try {
                    //拿到此次函数的返回结果，用于下一次then的参数
                    var nextResolveValue = onFulfilled(self.resolveValue);

                    // 处理返回值函数
                    ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);

                    /* 
                    //拿到此次函数的返回结果，用于下一次then的参数
                    var nextResolveValue = onFulfilled(self.resolveValue);
                    
                    //执行下一次函数时，使用上一次函数返回结果作为参数
                    res(nextResolveValue); */
                } catch (e) {
                    rej(e);
                }
            }, 0);
        }

        // 当状态为Rjected时，执行onRejected拒绝
        if (self.status === 'Rejected') {
            setTimeout(function () {
                try {
                    var nextRejectValue = onRejected(self.rejectReason);
                    ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
                } catch (e) {
                    rej(e);
                }
            }, 0);
        }

        // 异步操作实现
        if (self.status === 'pending') {
            // 将函数推入回调函数
            self.ResolveCallBackList.push(function () {
                setTimeout(function () {
                    try {
                        var nextResolveValue = onFulfilled(self.resolveValue);
                        ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
                    } catch (e) {
                        rej(e);
                    }
                }, 0);
            });

            self.RejectCallBackList.push(function () {
                setTimeout(function () {
                    try {
                        var nextRejectValue = onRejected(self.rejectReason);
                        ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
                    } catch (e) {
                        rej(e);
                    }
                }, 0);
            });
        }
    });

    return nextPromise;
};

// 静态方法 race
MyPromise.race = function (promiseArr) {
    return new MyPromise(function (resolve, reject) {
        if (promiseArr.length == 0) return;
        promiseArr.forEach(function (ele, index) {
            resolve(ele).then(
                function (res) {
                    resolve(res);
                    return;
                },
                function (err) {
                    reject(err);
                    return;
                }
            );
        });
    });
};

// 静态方法 all
MyPromise.all = function (promiseArr) {
    let results = [], //执行数组
        promiseArrCount = 0, //计算函数总执行次数
        promiseArrLength = promiseArr.length; //函数参数总长度
    return new MyPromise(function (resolve, reject) {
        promiseArr.forEach(function (ele, index) {
            resolve(ele).then(
                function (res) {
                    promiseArrCount++;
                    results.push(res);
                    //当所有函数都正确执行了，resolve执行输出所有结果
                    if (promiseArrCount === promiseArrLength) {
                        return resolve(results);
                    }
                },
                function (err) {
                    return reject(err);
                }
            );
        });
    });
};
