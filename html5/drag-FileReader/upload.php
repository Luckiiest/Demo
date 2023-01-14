<?php
$mypic = $_FILES["mypic"];
if(!empty($mypic)){
    $picname = $_FILES['mypic']['name'];
    $picsize = $_FILES['mypic']['size'];
    if ($picsize > 512000) {
        echo '文件大小不能超过500k';
        exit;
    }
    $type = strstr($picname, '.');
    $pics = 'helloweba' . $type;
    //上传路径
    $pic_path = "pics/". $pics;
    FileLoader($mypic["tmp_name"],$pic_path);
}
?>
<!-- <meta charset="utf-8">
<form action="" method="post" enctype="multipart/form-data">
<input type="file" name="mypic">
<input type="submit" value="上传">
</form> -->