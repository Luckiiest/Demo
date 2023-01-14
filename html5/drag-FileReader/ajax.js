function ajax(method,url,data,callback,flag){
	//创建XMLHttpRequest对象
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXobject('Microsoft.XMLHttp');
	}

	//小写变大写
	method.toUpperCase();
	if(method == 'GET') {
		var date = new Date(),
		    timer = date.getTime();

		xhr.open(method,url + '?' + data + '&timer' + timer,flag);
		xhr.send(); 
	} else if(method == 'POST') {
		xhr.open(method,url,flag) 
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	} else if(method == 'PUT') {
		xhr.open(method,url,flag);
		xhr.setRequestHeader('person','aimee');
		xhr.send();
	}

	xhr.onreaderstatechange = function() {
		if(xhr.readystate == 4) {
			if(xhr.status == 200) {
				callback(xhr.responseText);
			}
		}
	}
}