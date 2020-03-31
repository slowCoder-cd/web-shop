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
export{
	main_section
}