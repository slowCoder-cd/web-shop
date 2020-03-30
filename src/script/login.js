;!function($){
    let $user = $(".username");
    let $pass = $(".password");
	let $vsign = false;
		//1.点击登录按钮的事件
		$("#login").on("click", function (){
			//判断验证码是否输入正确
			if($(".vcode input").val() ==$(".vcode .num").html()){
				$vsign = true;
			}else{
				$(".fnum").html("验证码错误，请重新输入");
				$(".fnum").css("color","red");
				return false;
			}
			//判断用户名和密码是否输入
			if($user.val()&&$pass.val()){
				$.ajax({
					type:"post",
					url:"http://localhost/web-shop/php/login.php",
					data:{
						user:$user.val(),
						pass:$pass.val()
					}
				}).done( function (data){
					console.log(data);
					if(!data){
						$(".fname").html("用户名或密码错误，请重新输入");
						$(".fname").css("color","red");
					}else{
						$(".fname").html("");
						window.localStorage.user = $user.val();
						location.href = "index.html";
					}
				})
				
			}else{
				$(".fname").html("用户名或密码不能为空，请输入");
				$(".fname").css("color","red");
			}
			
		});
		
		//2.当输入框内容改变时，应当清除错误提示
		$(".formlogin").on("input",[$user,$pass,$(".vcode input")],function(){
			$(".fname").html("");
			$(".fnum").html("");
		});
		
		//3.随机生成数字验证码
		function vcode(){
			let $vcode = [];
			for (let i = 0; i <= 4; i++) {
			  $vcode.push(parseInt(Math.random()*10));   
			}
			$(".vcode .num").html($vcode.join(""));	
			$vcode = [];
		}
		vcode();
		$(".vcode .num").on("click",function(){
			vcode();
		});
		
			
		
		
		
		
	   
	
}(jQuery);