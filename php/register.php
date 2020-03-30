<?php
include "conn.php";
//检测用户名是否重名
//接收前端的用户名进行判断
if (isset($_POST['user'])) {
    $xingming = $_POST['user'];
    //利用sql语句进行检测
    $result = $conn->query("select * from registry1903 where username = '$xingming'");

    //如果$result有值，存在
    if ($result->fetch_assoc()) { //存在
        echo true;  //1
    } else { //不存在
        echo false;  //空隙''
    }
}


//接收用户注册的信息
if (isset($_POST['submit'])) {
   $user = $_POST['username'];
   $pass = sha1($_POST['password']);
   //执行插入的sql语句。
   $conn->query("insert registry1903 values(null,'$user','$pass', NOW())");
    //如果注册成功，跳到登录页面
	$url = "location:http://localhost/Web-Shop/src/html/login.html";
	header("location:http://localhost/Web-Shop/src/html/login.html");
};
