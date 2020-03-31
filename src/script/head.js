		//头文件的js部分
        //1.点击顶部广告栏的 × 去掉父元素  .parent() .remove()
;(function ($){

    const $clearX = $(".top_bar span");
    $clearX.on("click",function (){
        $(this).parent().remove();//移除当前对象的父元素；
    })
    const $bl_li = $(".bl_top .bl_right li" );
	
    //2.划过 (-更多精品-为您服务-利电工厂-)我的利电添加相应样式 .css();
    $bl_li.on("mouseover",function (){
        $(this).find("span").css("background","url(../img/hy-up.png)");
    });
    $bl_li.on("mouseout",function (){
        $(this).find("span").css("background","url(../img/hy-down.png)");
    });

    $me_li = $(".heade .h_nav .menu li");
    $me_li.hover(function (){
        $(this).addClass("active");
    }, function(){
        $(this).removeClass("active");
    })
	
	//3 检查本地存储是否存在user ；存在则让登录注册隐藏，个人信息显示 购物车进入
	 if(localStorage.user){
		 $(".login").hide();
		 $(".user").show();
		 $(".u_name").html(localStorage.user);
		 //存在user，才能进入购物车，否则就进入登录页面
		$(".goods_car a").on("click", function(){
			location.href = "goodscar.html";
		})
		 
	 }else{
		 $(".user").hide();
		 $(".login").show();
		 //点击购物车，就进入登录页面
		 $(".goods_car a").on("click", function(){
			alert("请先登录");
		 	location.href = "login.html";
		 })
	 }
	$(".user a").on("click",function(){
		if(confirm("你确定退出当前账号吗")){
			localStorage.removeItem('user');
			$(".user").hide();
			$(".login").show();
		}
	})
	
	//4.二级菜单显示
	$(".good_list").on("mouseover",function(){
		$(".list_text").show();
		
		$(".list_text").on("mouseover",function(){
			$(".good_list").show();
			$(".list_text").show();
		});
		$(".list_text").on("mouseout",function(){
			$(".list_text").hide();
		});
	});
	$(".good_list li").on("mouseout",function(){
		$(".list_text").hide();
		
	});
	
	
})(jQuery);