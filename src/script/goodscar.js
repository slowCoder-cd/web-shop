		;(function ($){
			//2.设计函数来实现购物车
			function showlist(sid,num){
				$.ajax({
					url:"http://localhost/Web-Shop/php/listdata.php",
					dataType:"json",
				}).done(function (data){
					
					$.each(data, function (index,value){
						//克隆隐藏的盒子把购物车列表渲染出来
						if(sid == value.sid){
							//console.log(value);
							let sj =(parseFloat(value.price)*parseFloat(num)).toFixed(2);
							let $clonebox = $('.itemson .itemcar:hidden').clone(true, true);//克隆隐藏元素
							$clonebox.find(".t-goods").find("a").attr("href","Detail Pages.html?sid="+value.sid);
							$clonebox.find(".t-goods").find("a img").attr("src",value.url);
							$clonebox.find(".t-goods").find("a img").attr("sid",value.sid);//便于查找sid删除对应商品
							$clonebox.find(".t-props p").html(value.title);
							$clonebox.find(".t-prices i").html(value.price);
							$clonebox.find(".t-quantity span").html(num);
							$clonebox.find(".t-sum i").html(sj);
							$clonebox.css("display","flex");
							$('.itemson').append($clonebox);
							allprice ();
						}
					})
				});
				
			};
			
			//$.cookie('the_cookie');//读取cookie
			//1.读取the_cookie
			if($.cookie('sid') && $.cookie('num')){
				let sidarr = [];
				let numarr = [];
				if($.cookie('sid').length == 1){
					 sidarr.push($.cookie('sid')) ;
					 numarr.push(parseInt($.cookie('num'))) ;
					 // console.log(sidarr);
				}else{
					 sidarr = $.cookie('sid').split(",");
					 numarr = $.cookie('num').split(",");
				}
				
				$.each(sidarr ,function (index, value){//遍历sidarr
					//console.log(value);//检查
					showlist(sidarr[index] ,numarr[index] )
				})
			}
			
			// 2.计算总价 封装一个函数来多次使用  --注意查找元素
			function allprice (){
				let $sum = 0;
				let $count = 0;
				// 找到可见元素中的勾选栏
				 $(".itemson .goods-item:visible").each(function (index,ele){
					 if($(ele).find(".cart-checkbox input").prop("checked") ){
						 $sum += parseInt($(ele).find(".t-quantity .num").html());
						 $count += parseFloat($(ele).find(".t-sum i").html());
					 }
				 })
				 $(".Total").find(".t-quantity i").html($sum);
				 $(".Total").find(".t-sum span").html($count.toFixed(2));
				 $sum = 0;
				 $count = 0;
				 //计算完成后赋值为0，不影响下一次计算
			}
				
			//3.全选按钮和结算的逻辑	
			$('.allsel').on('change', function () {
				$('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));//找到所有的复选框添加属性
				$('.allsel').prop('checked', $(this).prop('checked'));
				allprice();//计算总价
			});
			
			//4.单个复选框用事件委托
			let $inputs = $('.goods-item:visible').find(':checkbox');
			$('.itemson').on('change', $inputs, function () {
				//$(this):被委托的元素，checkbox
				if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
					$('.allsel').prop('checked', true);
				} else {
					$('.allsel').prop('checked', false);
				}
				allprice();//计算总价
			});
			
			//5.点击 + - 封装一个自执行函数；
			!function addreduce () {
					$(".add").on("click", function (){
					
					// $(".Total .t-quantity i" ).html(snum);
					// $(".Total .t-sum span" ).html(sprice);
					let num = +$(this).parents(".itemcar").find(".num").html();
					num++;
					$(this).parents(".itemcar").find(".num").html(num);
					let aprice = +$(this).parents(".itemcar").find(".t-prices i").html()
					let price = (num*aprice).toFixed(2);
					$(this).parents(".itemcar").find(".price").html(price)
					allprice();//计算总价
					setcookie($(this));//更新cookie
				})
				
				$(".reduce").on("click", function (){
					
					let num = +$(this).parents(".itemcar").find(".num").html();
					num--;
					if(num > 0){
						$(this).parents(".itemcar").find(".num").html(num);
						let aprice = +$(this).parents(".itemcar").find(".t-prices i").html()
						let price = (num*aprice).toFixed(2);
						$(this).parents(".itemcar").find(".price").html(price)
					}
					allprice();
					setcookie($(this));
				})
			}();
			
			//6.更新cookie 
			let arrsid = [];//存储商品的编号。
			let arrnum = [];//存储商品的数量。
			function getcookie() {
			    if ($.cookie('sid') && $.cookie('num')) {
			        arrsid = $.cookie('sid').split(',');//获取cookie  sid同时转换成数组。
			        arrnum = $.cookie('num').split(',');//获取cookie  num同时转换成数组。
			    } else {
			        arrsid = [];
			        arrnum = [];
			    }
			}
			
			// $.inArray --返回数组中指定元素的索引值
			function setcookie(obj){//用来更新 + - 时的coolie
				getcookie();
				let $sid = obj.parents('.goods-item').find('img').attr('sid');
				console.log($.inArray($sid, arrsid));
				arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.t-quantity .num').html();
				$.cookie('num', arrnum, { expires: 7 });
			}
			
			function delcookie (sid ,arrsid){//传入sid 和sid的数组
				let $sign = -1;//声明一个变量来接收删除商品的索引
				$.each(arrsid, function (index,value){//遍历数组
					if(sid == value){ //找到相对应的数把索引赋值给标记
						$sign = index ;
					}
				})
				arrsid.splice($sign,1);//删除当前位置的数返回一个新数组
				arrnum.splice($sign,1);
				
				$.cookie('num', arrnum, { expires: 7 });
				$.cookie('sid', arrsid, { expires: 7 });
			}
			
			//7.删除操作
			//单个删除
			$(".itemson ").on("click" ,".t-action a", function (){
				getcookie();
				let $sign = $(this).parents(".goods-item").find(':checkbox').is(':checked');//定义一个标记，判断是否勾选
				if($sign){
					if (window.confirm('你确定要删除这件商品吗?')) {
						$(this).parents(".goods-item").remove();
						delcookie($(this).parents(".goods-item").find('img').attr('sid'), arrsid);
						allprice();//计算总价
					};
				}else{
					alert("请勾选后再操作");
				}
			});
			//所有删除
			$(".Total  .t-goods a").on("click", function (){
				getcookie();
				let sign = true;//定义一个标记，只有当有勾选的情况再出现删除提示
				$(".itemson .goods-item:visible").each(function (index,ele){
					 if($(ele).find(".cart-checkbox input").prop("checked") ){
						sign = false;
					 }
				})
				if(!sign){
					if (window.confirm('你确定要删除选中的商品吗?')) {
					    $('.goods-item:visible').each(function () {
					        if ($(this).find(':checkbox').is(':checked')) {//判断复选框是否选中
					            $(this).remove();
					            delcookie($(this).find('img').attr('sid'), arrsid);
					        }
					    });
					    allprice();//计算总价
					}
				}else{
					return false;
				}
				
			});
			
		})(jQuery);