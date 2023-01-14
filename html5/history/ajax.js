/* 
		method：发送的方式（GET，POST）
		url：发送的数据地址
		data：传入的参数
		callback：回调函数，通过回调函数展示在页面
		flag：同步(false)/异步(true)
	*/
function ajax(method, url, data, callback, flag) {
    // 创建XMLHttpRequest对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        // W3c 标准
        xhr = new XMLHttpRequest();
    } else {
        // IE兼容
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }

    // 小写变大写，toUpperCase
    method.toUpperCase();
    // GET请求会拼接在地址栏
    if (method == 'GET') {
        // 一个时间戳，为了不占用浏览器的缓存
        var date = new Date(),
            timer = date.getTime();
        // 让每一个url加一个无关紧要的参数，且唯一的不占用浏览器缓存
        xhr.open(method, url + '?' + data + '&timer' + timer, flag);
        xhr.send();
        // POST请求会通过send()方法传入参数拼接
    } else if (method == 'POST') {
        xhr.open(method, url, flag);
        // 使用POST需要有一个请求头，就是xhr.setRequstHeader('Content-type','application/x-www-form-urlencoded');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
        // PUT请求方法，非简单请求方法
    } else if (method == 'PUT') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('person', 'aimee');
        xhr.send();
    }

    // onreadystatechange 状态改变的事件触发器，就是改变一次触发一次
    xhr.onreadystatechange = function () {
        // readyState 是状态值，0 1 2 3 4 逐个推进状态，分别是 未初始化 读取中 已读取 交互中 完成
        if (xhr.readystate == 4) {
            // status 服务器返回的状态码，200（成功）、404（文件未找到）、500（服务器内部错误）、304（资源未被修改）
            if (xhr.status == 200) {
                // responseText 返回数据的字符串信息
                callback(xhr.responseText);
            }
        }
    }
}
