function mixGlass(){
	let sid = parseInt(location.search.split("=")[1]);//获取地址栏的?之后的内容，用"="分割成数组
	$.ajax({
		data:{
			sid,
		},
		dataType: 'json',
		url:"http://localhost/Web-Shop/php/getsid.php"
	}).done(function (d){
		
		//1.放大镜效果
		const $sf = $(".page .small_sf");//小放大镜
		const $sdiv = $(".page .page_small");//小盒子的尺寸，小图片和小盒子一样宽高
		const $df = $(".page .page_df");//大放大镜
		const $bpic = $(".page .bg_img");//大图
		const $bili = $bpic.height()/$sdiv.height();//求出比例。大于1
		
		$sdiv.find(".small_img").attr('src',d.url);
		$bpic.attr('sid',d.sid);//加入自定义属性好加入购物车
		$bpic.attr('src',d.url);//给图片地址
		$sdiv.hover(function (ev){//鼠标移入小盒子
			$sf.css("visibility","visible");
			$df.css("visibility","visible");
			$sf.css({
				width:$sdiv.width() / $bpic.width() * $df.width(),//求出小放大镜的宽高
				height:$sdiv.height() / $bpic.height() * $df.height(),
			});
		},function(){//鼠标移除小盒子					
			$sf.css("visibility","hidden");
			$df.css("visibility","hidden");
		});
		
		$sdiv.on("mousemove",function (ev){
			//当鼠标移动时将位置赋值给sf小放大镜；
			let $sftop = ev.pageY - $(".page_small").offset().top-$sf.height()/2;
			let $sfleft = ev.pageX -$(".page_small").offset().left -$sf.width()/2;
			if($sftop <0 ){
				$sftop =0;
			}else if($sftop >= $sdiv.height()-$sf.height()){
				$sftop = $sdiv.height()-$sf.height();	
			};//限制sf的范围
			if($sfleft <0 ){
				$sfleft =0;
			}else if($sfleft >= $sdiv.width()-$sf.width()){
				$sfleft = $sdiv.width()-$sf.width();	
			}
			$sf.css({
				top:$sftop,
				left:$sfleft
			})
			
			$bpic.css({
				top:-$sftop * $bili,
				left:-$sfleft * $bili
			});//赋值给大图的位置
		
		})
		//2.小图下面的图片栏
		
		let  $urllist = d.urllist.split(",");//用逗号分成数组
		if($urllist[0] !== ""){
			let $strurl = "<ul>";
			$.each($urllist, function (index,value){
				$strurl +=`
					<li>
						<img src="${value}"/>
					</li>
				`
				
			})
			$strurl += "</ul>"; 
			$(".urllist #imgs").html($strurl);
			//点击下面的小图栏图片，把src赋给上面的
			$(".urllist").on("click","li", function (){//事件委托
				let $smsrc = $(this).find("img").attr("src");
				$sdiv.find(".small_img").attr('src',$smsrc);
				$bpic.attr('src',$smsrc);//给图片地址
			})
		}
		
		
		//设置左右箭头事件
		let $num = 5;
		const $liwidth = $(".urllist #imgs").find("ul li").outerWidth(true);
		if(5 < $(".urllist").find("ul li").size()){//当图片大于五张才触发右箭头事件
			$(".right_a").css("color","#666666");
			$(".right_a").on("click", function (){
				
				$(".left_a").css("color","#666666");
				if($num == $(".urllist").find("ul li").size()){//当$num==<li></li>的长度，就不能点击右箭头
					$(".right_a").css("color","#cccccc");
					return false;
				}
				
				$num++;
				$(".urllist #imgs").find("ul").css("left",-$liwidth*($num-5)+"px");
			})
			
			$(".left_a").on("click", function (){
				$(".right_a").css("color","#666666");
				if($num>5){
					$num--;
					$(".urllist #imgs").find("ul").css("left",-$liwidth*($num-5)+"px");
				}else{
					$(".left_a").css("color","#cccccc");
				}
				
			})
		}
		
		//2.填充标题和价格
		 $("#title").html(d.title);
		 $("#price em").html(d.price);
		 $("#sail em").html(d.sailnumber);
		 
	});

}

export {
	mixGlass
}