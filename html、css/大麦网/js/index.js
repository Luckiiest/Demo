
var banner = document.getElementById('banner');
var is = banner.getElementsByTagName('img');
var ls = banner.getElementsByTagName('li');
var c = 0;
setInterval(function(){
//     alert('改换吐了')
     c ++;
    //  if(c == 4){
    //      c = 0;
    //  }
//  三元表达式
c = c==8?0:c;
//     让所有图片隐藏，所以的li都变成灰色
    for (var i=0;i<is.length;i++) {
        is[i].style.display = 'none';
        ls[i].style.background='#dddddd';
    }
     // document.title = c;  
     // 让c号图片显示
     is[c].style.display='block';
     // 让c号li变红
     ls[c].style.background='#a10000';
},1000);

// 轮播代码结束


// 切换
// function setTab(name,cursel,n,x){
//     for(var i = 1; i <= n; i++){
//         var menu=document.getElementById(name+i);
//         var con=document.getElementById("con_"+name+i);
//         menu.classNmae=i==cursel?"hover":"";
//         con.style.display=i==cursel?"block":"none";
//     }
// }
