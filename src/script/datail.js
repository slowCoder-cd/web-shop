	
		;(function($){
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
					$sftop = ev.pageY - $(".page_small").offset().top-$sf.height()/2;
					$sfleft = ev.pageX -$(".page_small").offset().left -$sf.width()/2;
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
			
			//3.添加到购物车，cookie存贮，添加jquery.cookie
			//假设cookie里已经存储了商品信息，先取，取不出来说明没有再存.cookie里只存编号和数量
			let sidarr = [];
			let numarr = [];
			//读取cookie $.cookie('the_cookie');
			//console.log($.cookie('sid'))
			const $carbtn = $(".scar a");//取到按钮
			
			$carbtn.on("click" ,function (){
				let sid = $(this).parents(".page_news").find(".bg_img").attr("sid");
				let num =  $(this).parents(".scar").find("input").val();
				alert("按钮触发了")
				if( $.cookie('sid') &&  $.cookie('num')){//先判断是否有cookie
				
					if($.cookie('sid').length == 1){
						 sidarr.push($.cookie('sid')) ;
						 numarr.push(parseInt($.cookie('num'))) ;
						 // console.log(sidarr);
					}else{
						 sidarr = $.cookie('sid').split(",");
						 numarr = $.cookie('num').split(",");
					}
				}else{//没有就先创建cookie名字
					sidarr.push(sid);
					numarr.push(num);
					$.cookie('sid', sidarr, { expires: 7 });
					$.cookie('num', numarr, { expires: 7 });
					sidarr = [];
					numarr = [];
				}
				
				// console.log(sidarr);
				// console.log(sid);
				// console.log(sidarr.indexOf(sid));
				
				//再判断当前的sid是否存在cookie
				if( sidarr.indexOf(sid) !== -1 ){//存在就取出重新赋值
					//sid存在则只传num
					numarr[sidarr.indexOf(sid)] = num;
					$.cookie('num', numarr, { expires: 7 });
				}else{ //sid不存在就存入 sid和num
					sidarr.push(sid);
					numarr.push(num);
					$.cookie('sid', sidarr, { expires: 7 });
					$.cookie('num', numarr, { expires: 7 });
					sidarr = [];
					numarr = [];
				}
				
			})
			
			
			
		})(jQuery);