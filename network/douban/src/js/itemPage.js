(function() {
	$ajax({
		type:'get',
		url: 'https://api.douban.com/v2/music/',
		dataType: 'jsonp',
		success: cb
	})
	function cb(data) {
		console.log(data);
	}
})