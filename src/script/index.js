;(function($){
	//1.顶部悬浮
	function Top_of(){
		let $top = $(window).scrollTop();//通过jq方法获取滚动条的top值。
		$top > 600? $(".top_of").stop(true).animate({top:"-20px"}) : $(".top_of").stop(true).animate({top:"-100px"});//滚动条大于600则就使top值变化到-20px；每次先清除队列
	};
	//3.楼梯部分
	louti_switch();
	function louti_switch(){
		
		let $loutia = $(".left_louti .lt");//取到楼梯
		let $louceng = $(".main .section");//取到楼层
		
		let $top = $(window).scrollTop();//通过jq方法获取滚动条的top值。
		$top>440?$(".left_louti").show():$(".left_louti").hide();
		
		//对楼层进行遍历 楼层到哪，楼梯就到哪
		$.each($louceng, function(index, ele){
			//先获取每一个楼层的top值  现在想要在滚动条没有到当前位置就有动作，则是$top - x = $lctop；直接就加给$lctop；
			//楼层的top值不变，滚动条的会变
			let $lctop = $louceng.eq(index).offset().top + $(ele).height() / 2;
			if( $lctop > $top){//给楼梯加类名，先全部移除
				$loutia.removeClass("act_louti");
				$loutia.eq(index).addClass("act_louti");
				return false;//当找到第一个就停止遍历，拖动滚动条再次触发
			}
		})
		
		//楼梯的a进行点击，到达相应楼层，并增加类
		$loutia.on("click",function(){
			$("html,body").stop(true);
			$loutia.removeClass("act_louti");
			$(this).addClass("act_louti");
			$("html,body").animate({
				 scrollTop: $louceng.eq($(this).index()).offset().top 
			});
		});
		
		//点击回到顶部
		$(".backtop").on("click",function(){
			$("html,body").stop(true);
			$("html,body").animate({
				 scrollTop: 0
			});
		});
	}
	
	//滚轮滚动条事件
	$(window).scroll(function(){
		//console.log($(window).scrollTop());//650 100 -20px
		Top_of();
		louti_switch();
	});
	
	//2.轮播图 改变透明度 --先给所有的遍历去掉属性，再给一个加
	//给小源点加类
	picswitch();
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
	
	
})(jQuery);