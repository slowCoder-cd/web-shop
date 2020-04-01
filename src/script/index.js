
(function($){
	
	function louti_switch(){
	  let $louti = $(".left_louti");//楼梯1个
	  let $loutili = $('.left_louti .lt');//楼梯内部的a .lt
	  let $louceng = $('.main .section');//楼层8个
	  
	  let $scrtop = $(window).scrollTop();
		//console.log($scrtop);//测试取值成功
		$scrtop >=440 ? $louti.show() : $louti.hide();
	  
	  $(window).on('scroll', function () {
		  //1.左侧楼梯在滚动条到大于一定位置显示，否则隐藏
		  let $scrtop = $(window).scrollTop();
		  $scrtop >=440 ? $louti.show() : $louti.hide();//1完成
		  
		 // 4.滚动条滚动到楼层相应位置楼梯选项也更着变化---根据楼层位置给楼梯添加类
		 $louceng.each(function(index,element){//index:遍历元素的索引 element:当前元素对象(原生对象)
			 //获取每个楼层top值  
			// $lonctop = $louceng.eq(index).offset().top //每个楼层的top值
			let $lonctop = $louceng.eq(index).offset().top + $(element).height() / 2;
			 //主要思路：楼层top值固定  但是滚轮的值是不断变化的 当滚轮值等于楼层top值时，刚好那个楼层到顶部
			 //那么就可以判断 当$scrtop 小于 楼层时可以且楼梯显示就可以看到楼层，当第一个满足此条件的就把索引取出来给楼梯查找变化的li；添加类
			 
			 if($lonctop > $scrtop){
				 $loutili.removeClass('act_louti');//去掉所有的li上面的active
				 $loutili.eq(index).addClass('act_louti');//当前满足条件的添加。
				 return false;//一旦满足，当前each结束。重新拖动滚轮，重新触发事件 ，重新继续比较。
			 }
		 })
			
	  })
	  
	   $loutili.on("click",function(){
		   //2.点击左侧楼梯中的选项，点中的加类(颜色变化)，其余的选项没有变化 点击回到顶部，滚动条top为0
		   $(this).addClass("act_louti").siblings("li").removeClass("act_louti");//增加类 注意参数
		   
		   //3.点击楼梯相应楼层出现在可视区
		   let $scrtop = $louceng.eq($(this).index()).offset().top - 200;//当前点击的a的索引和楼层中的索引一样 即把对应偏移量赋值给滚动条的top
		   $('html,body').animate({//动画 运动到对应top值
			   scrollTop: $scrtop
		   });
		   
	   })
	  
	 //顶部悬浮  
	  $(".backtop").on("click",function(){
		  console.log(1);
			$("html,body").animate({
				 scrollTop: 0
			});
		});
				  
	};
	 louti_switch();
	
	
	//滚轮滚动条事件 顶部悬浮
	function Top_of(){
			let $top = $(window).scrollTop();//通过jq方法获取滚动条的top值。
			$top > 600? $(".top_of").stop(true).animate({top:"-20px"}) : $(".top_of").stop(true).animate({top:"-100px"}			);//滚动条大于600则就使top值变化到-20px；每次先清除队列
	};
	$(window).scroll(function(){//顶部悬浮
		Top_of();
	});
	
	//2.轮播图 改变透明度 --先给所有的遍历去掉属性，再给一个加
		//给小源点加类
		
		
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
	
	function main_section(ele,page){
		$.ajax({
			data:{
				page,
			},
			url: "http://localhost/web-shop/php/indexdata.php",
			dataType: 'json',
		}).done(function(d) {
			//console.log(d.pageall);//测试成功获取后端的数据;
			let $str = "<ul>"
			$.each(d.data, function(index, value) {
				$str +=
					`
				<li>
					<a href="Detail Pages.html?sid=${value.sid}">
						<img class="lazy" data-original="${value.url}" sid=${value.sid}/>
						<p>${value.title}</p>
						<span class="price">￥${value.price}</span>
					</a>
				</li>
				`
			});
			$str += "</ul>"
			ele.html($str);
			$("img.lazy").lazyload(); //添加懒加载
			
		});
		
	};
	main_section($(".section_img").eq(0),6);
	main_section($(".section_img").eq(1),5);
	main_section($(".section_img").eq(2),4);
	main_section($(".section_img").eq(3),3);
	main_section($(".section_img").eq(4),2);
	main_section($(".section_img").eq(5),1);
	main_section($(".section_img").eq(6),5);
	main_section($(".section_img").eq(7),7);
})(jQuery)
	
	
	
	
	
	
	
	
