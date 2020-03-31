;
(function($) {
	//1.默认渲染
	$.ajax({
		url: "http://localhost/web-shop/php/listpage.php",
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
			        <span class="sail">销量：${value.sailnumber}</span>
			    </a>
			</li>
			`
		});
		$str += "</ul>"
		$(".e_list").html($str);
		$("img.lazy").lazyload(); //添加懒加载

		paging(d.pageall); //调用分页函数

		array_default = []; //排序前的li数组
		array = []; //排序中的数组
		prev = null;
		next = null;
		//将页面的li元素加载到两个数组中
		$('.e_list ul li').each(function(index, element) {
			array[index] = $(this);
			array_default[index] = $(this);
		});
		sortli();
	});
	$(".e_list").on("mouseover", "li", function() {
		//console.log($(this));
		$(this).css("border", "1px solid red")
	})
	$(".e_list").on("mouseout", "li", function() {
		//console.log($(this));
		$(this).css("border", "1px solid #CCCCCC")
	})
	//2.分页
	//封装一个函数，参数为总页数，用来接收后台传入的页数，在ajax里调用
	function paging($pageall) {
		$('.page').pagination({
			pageCount: $pageall, //总的页数
			jump: true, //是否开启跳转到指定的页数，布尔值。
			coping: true, //是否开启首页和尾页，布尔值。
			prevContent: '上一页',
			nextContent: '下一页',
			homePage: '首页',
			endPage: '尾页',
			callback: function(api) {
				//console.log(api.getCurrent());
				$.ajax({
					url: "http://localhost/web-shop/php/listpage.php",
					dataType: 'json',
					data: {
						page: api.getCurrent()
					}
				}).done(function(d) {
					//console.log(d);//测试成功获取后端的数据
					let $str = "<ul>"
					$.each(d.data, function(index, value) {
						$str +=
							`
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
					$("img.lazy").lazyload(); //懒加载
					

					array_default = []; //排序前的li数组
					array = []; //排序中的数组
					prev = null;
					next = null;
					//将页面的li元素加载到两个数组中
					$('.e_list ul li').each(function(index, element) {
						array[index] = $(this);
						array_default[index] = $(this);
					});
					sortli();
				});
				
			}
		});
	};

	//3.排序 先把 li 元素加载出来，用数组接收；当前数组array_default  排序后数组array
	//利用冒泡排序，前后比较

	function sortli() {
		//3.1默认排序 无须比较
		$(".sort a").eq(0).on("click", function() {
			console.log(array_default);
			$.each(array_default, function(index, value) {
				$(".e_list ul").append(value);
			})
			return;
		});
		//3.2 升序排列
		$(".sort a").eq(1).on("click", function() {
			for (let i = 0; i < array.length; i++) {
				for (let j = 0; j < array.length - i - 1; j++) {
					prev = parseFloat(array[j].find(".price").html().substring(1));
					next = parseFloat(array[j+1].find(".price").html().substring(1));
					if(prev > next){//前大于后。则调换li元素位置
						let temp = array[j];
						array[j] = array[j + 1];
						array[j + 1] = temp;
					}
				}
			};
			$('.list ul').empty();//先清空原来的列表，再追加
			$.each(array,function(index,value){
				$(".e_list ul").append(value);
			})
		
		});
		//3.2降序排列
		$(".sort a").eq(2).on("click", function() {
			for (let i = 0; i < array.length; i++) {
				for (let j = 0; j < array.length - i - 1; j++) {
					prev = parseFloat(array[j].find(".price").html().substring(1));
					next = parseFloat(array[j+1].find(".price").html().substring(1));
					if(prev < next){//前小于后。则调换li元素位置
						let temp = array[j];
						array[j] = array[j + 1];
						array[j + 1] = temp;
					}
				}
			};
			$('.list ul').empty();//先清空原来的列表，再追加
			$.each(array,function(index,value){
				$(".e_list ul").append(value);
			})
		
		});
	}

	

})(jQuery);
