<script>
(function(){
var btn = document.getElementById('login-btn');
var box = document.getElementById('login-box');
var timer = null;
box.onmouseover = btn.onmouseover = function(){
if(timer) clearTimeout(timer)
box.style.display = 'block';
}
box.onmouseout = btn.onmouseout = function(){
timer = setTimeout(function(){
box.style.display = 'none';
},400);
}
})();
</script>

window.onload = function () {
    var element = document.getElementById('video');
    element.muted = "muted";
}