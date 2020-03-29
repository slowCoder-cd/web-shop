;(function ($){
	$.ajax({
		url:"http://localhost/Web-Shop/php/listdata.php",
		dataType: 'json'
	}).done(function (data){
		
		//console.log(data);//测试成功获取后端的数据
		
		let $str = "<ul>"
		$.each(data, function (index, value) {
		    $str += `
			<li>
			    <a href="Detail Pages.html?sid=${value.sid}">
			        <img src="${value.url}" sid=${value.sid}/>
			        <p>${value.title}</p>
			        <span class="price">￥${value.price}</span>
			        <span class="sail">销量：${value.sailnumber}</span>
			    </a>
			</li>
			`
		});
		$str += "</ul>"
		$(".e_list").html($str);
	});
	$(".e_list").on("mouseover","li",function(){
		//console.log($(this));
		$(this).css("border","1px solid red")
	})
	$(".e_list").on("mouseout","li",function(){
		//console.log($(this));
		$(this).css("border","1px solid #CCCCCC")
	})
	
})(jQuery);

