(function() {
	var $search = $('.search'),
		$ul = $('ul','.nav-list');

	$search.on('input',function() {
		var value = $(this).val();
		getData(value,7);
	})
	// 请求数据的函数，value是输入框中的数据，num是显示几条数据
	function getData(value,num) {
		$.ajax({
			type: 'get',
			url:'https://api.douban.com/v2/music/',
			q: 'q' + value + '&count=' + num,
			dataType: 'jsonp',
			success: addItem
		})
	}
	// 回调函数，处理
	function addItem(data) {
		var list = data.musics;
		var str = '';
		list.forEach(function(ele,index) {
			str += '<li><a href="https://music.douban.com/subject/' + ele.id +'/"><img> src="'+ ele.image + '</a></li>';
		})
		$ul.html($(str));
	}
})()