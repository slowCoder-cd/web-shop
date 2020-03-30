;(function($){
	//1.顶部悬浮
	$(window).scroll(function(){
		//console.log($(window).scrollTop());//650 100 -20px
		if($(window).scrollTop() > 600){
			$(".top_of").stop(true);//清除队列
			$(".top_of").animate({top:"-20px"});
		}else{
			$(".top_of").stop(true);
			$(".top_of").animate({top:"-100px"});
		}
	})
	//2.轮播图 改变透明度 --先给所有的遍历去掉属性，再给一个加
	//给小源点加类
	function picswitch(){
		let $btns = $(".btn_index ul li");
		let $pics = $(".ban_imgs_img");
		let $picnum = 0;//声明一个变量来接收索引
		$btns.on("click",function(){
			//$(this).parent("ul").children("li").index(this) --获取当前元素在父元素的下的索引
			$picnum = $(this).parent("ul").children("li").index(this);
			lunbo();
		});
		//封装一个函数来变化，其余只需要找到索引
		function lunbo(){
			for(let i=0;i<$btns.size();i++){
				$btns.removeClass("active_num");
				$pics.css("opacity","0");
			}
			$btns.eq($picnum).addClass("active_num");
			$pics.eq($picnum).animate({opacity:"1"});
		}
		//左键头
		$(".act_left").on("click",function(){
			$picnum--;
			if($picnum < 0){
				$picnum=$btns.size()-1;
			}
			lunbo();
		})
		//右箭头
		$(".act_right").on("click",function(){
			$picnum++;
			if($picnum > $btns.size()-1){
				$picnum = 0;
			}
			lunbo();
		})
		//自动轮播
		let timer = setInterval(function(){
			$picnum++;
			if($picnum > $btns.size()-1){
				$picnum = 0;
			}
			lunbo();
		},3000);
		//清除定时器
		$(".banner").on("mouseover" ,function(){
			clearInterval(timer);
		})
		$(".banner").on("mouseout" ,function(){
			timer = setInterval(function(){
				$picnum++;
				if($picnum > $btns.size()-1){
					$picnum = 0;
				}
				lunbo();
			},3000);
		})
	};
	picswitch();
	
	
})(jQuery);