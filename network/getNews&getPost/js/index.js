var oUsername = document.getElementsByClassName('username')[0],
	oAge = document.getElementsByClassName('age')[0],
 	oSub = document.getElementsByClassName('submit')[0],
 	oBtn = document.getElementsByClassName('btn')[0],
	oUl = document.getElementsByClassName('ul-list')[0];


oBtn.onclick = function() {
	ajaxFun('GET','./js/getNews.php','',news,true);
}

oSub.onclick = function(e) {
	e.preventDefault();
	var data = 'username=' + oUsername.value + '&age=' + oAge.value;
	ajaxFun('POST','./js/post.php',data,and,true);
}



function and(data) {
	alert(data);
}

function news(data) {
	var value = JSON.parse(data);
	console.log(value);
	var str = '';
	value.forEach(function(elem,index) {
		str += '<li>' + elem.title + ' ' + elem.date + '</li>';
	})
	oUl.innerHTML = str;
}

// ajax封装函数
function ajaxFun(method,url,data,Callback,flag) {
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject();
	}

	method.toUpperCase();
	if(method == 'GET') {
		xhr.open(method,url,flag);
		xhr.send();
	} else if(method == 'POST') {
		xhr.open(method,url,flag);
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				Callback(xhr.responseText);
			}
		}
	}
}