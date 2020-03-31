;(function ($){
	
	$.ajax({
		url:"http://localhost/web-shop/php/listpage.php",
		dataType: 'json',
	}).done(function (d){
		//console.log(d.pageall);//测试成功获取后端的数据;
		let $str = "<ul>"
		$.each(d.data, function (index, value) {
		    $str += `
			<li>
			    <a href="Detail Pages.html?sid=${value.sid}">
			        <img class="lazy" data-original="${value.url}" sid=${value.sid}/>
			        <p>${value.title}</p>
			        <span class="price">￥${value.price}</span>
			        <span class="sail">销量：${value.sailnumber}</span>
			    </a>
			</li>
			`
		});
		$str += "</ul>"
		$(".e_list").html($str);
		$("img.lazy").lazyload();
		$pageall = d.pageall;//接收后台传来的页数
		paging (d.pageall);
	});
	$(".e_list").on("mouseover","li",function(){
		//console.log($(this));
		$(this).css("border","1px solid red")
	})
	$(".e_list").on("mouseout","li",function(){
		//console.log($(this));
		$(this).css("border","1px solid #CCCCCC")
	})
	//封装一个函数，参数为总页数，用来接收后台传入的页数，在ajax里调用
	function paging ($pageall){
		$('.page').pagination({
		    pageCount: $pageall,//总的页数
		    jump: true,//是否开启跳转到指定的页数，布尔值。
		    coping: true,//是否开启首页和尾页，布尔值。
		    prevContent: '上一页',
		    nextContent: '下一页',
		    homePage: '首页',
		    endPage: '尾页',
			callback: function (api){
				//console.log(api.getCurrent());
				
				$.ajax({
					url:"http://localhost/web-shop/php/listpage.php",
					dataType: 'json',
					data:{
						page:api.getCurrent()
					}
				}).done(function (d){
					//console.log(d);//测试成功获取后端的数据
					let $str = "<ul>"
					$.each(d.data, function (index, value) {
					    $str += `
						<li>
						    <a href="Detail Pages.html?sid=${value.sid}">
						        <img class="lazy" data-original="${value.url}" sid=${value.sid}/>
						        <p>${value.title}</p>
						        <span class="price">￥${value.price}</span>
						        <span class="sail">销量：${value.sailnumber}</span>
						    </a>
						</li>
						`
					});
					$str += "</ul>"
					$(".e_list").html($str);
					$("img.lazy").lazyload();
				});
				
			}
		});
	};
	
})(jQuery);

