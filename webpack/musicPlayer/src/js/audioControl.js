//音乐控制
require('zepto-webpack'); //z代表zepto

(function(root) {

	function audioControl() {
		this.audio = new Audio();
		this.status = "pause";
	}

	audioControl.prototype = {
		//播放
		play: function(){
			this.audio.play();
			this.status = "play";
		},
		//暂停
		pause: function() {
            this.audio.pause();
			this.status = "pause";
		},
		//获取资源
		getAudio: function(src) {
			this.audio.src = src;
			this.audio.load();
		}
 	}
 	root.audioControl = audioControl;

})(window.player || (window.player = {}))