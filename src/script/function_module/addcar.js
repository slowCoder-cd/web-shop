function addcar (){
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
		alert("加入购物车成功");
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
}
export {
	addcar
}