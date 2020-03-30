;(function ($) {
	// ajax传输用户名，判断是否重名  表单提交值存入数据库
	let $user = $(".username");//找到用户名的input
	let $usersign =false;//定义一个标记 
	let $passsign = false;
	let $repass =false;
	let $read = false;
	//1.注册用户名
	$user.on("blur",function(){
		$.ajax({
			type:"post",
			url:"http://localhost/Web-Shop/php/register.php",
			data:{
					user: $user.val()
				}
		}).done(function (res){//后台去数据库判断，存在同名则返回1 否则为空
			//console.log(res);//测试成功
			console.log(res.indexOf("1"));
			let reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,10}/;//定义正则，匹配4-10个字符
			if(reg.test($user.val())){//判断是否满足格式
				if( res.indexOf("1") == -1){//判断是否重名 res.indexOf("1");无则返回-1 ，
					$(".fname").html(" √ ");
					$(".fname").css("color","green");
					$usersign = true;
				}else{
					$(".fname").html("用户名已被使用");
					$(".fname").css("color","red");
					$usersign = false;
				}
			}else{
				$(".fname").html("用户名为空或格式有误");
				$(".fname").css("color","red");
				$usersign = false;
			}
			
		});
	})
		//2.设置密码
		$(".password").eq(0).on("blur", function (){
			// ?:匹配前面的字符0或1个
			let reg = /(?=.*\d)(?=.*\D)^.{6,16}/;//必须包含数字和非数字（包括：数字字母，数字符号，数字字母符号）
			if(reg.test($(".password").val())){
				$(".pass").html(" √ ");
				$(".pass").css("color","green");
				$passsign = true;
			}else{
				$(".pass").html("密码格式错误，请重新设置");
				$(".pass").css("color","red");
				$passsign = false;
			}
		});
		//3.确认密码 
		$(".password").eq(1).on("blur", function (){
			// ?:匹配前面的字符0或1个
			let pass = $(".password").eq(0).val();
			
			if($(".password").eq(1).val() == pass){
				$(".repass").html("");
				$repass = true;
			}else{
				$(".repass").html("密码不一致，请重新输入");
				$(".repass").css("color","red");
				$repass = false;
			}
		});
	
	//4. 阅读同意协议
	$(".read input").on("change",function(){
		if($(".read input").prop("checked")){
			$read = true;
		}else{
			$read = false;
		}
	});
	
	
	$('form').on('submit', function () {
	    if (!$usersign || !$passsign || !$repass || !$read) {
	        return false;//阻止提交
	    }
	});
	
	
})(jQuery);

