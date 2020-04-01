//ES6模块化开发
import{loadhf} from "./function_module/loadhf.js";//加载头尾公共部分
import{louti_switch,Top_of} from "./function_module/louti.js";//调用模块里的 楼梯和顶部悬浮方法
import{picswitch} from "./function_module/lunbo.js";//调用轮播图的模块
import{main_section} from "./function_module/section.js";//调用楼层各块的数据渲染模块

loadhf();
picswitch(); //执行轮播图
louti_switch(); //楼梯
$(window).scroll(function(){//顶部悬浮
	Top_of();
});

main_section($(".section_img").eq(0),6);
main_section($(".section_img").eq(1),5);
main_section($(".section_img").eq(2),4);
main_section($(".section_img").eq(3),3);
main_section($(".section_img").eq(4),2);
main_section($(".section_img").eq(5),1);
main_section($(".section_img").eq(6),5);
main_section($(".section_img").eq(7),7);

	
	
	
	
	
	
	
	
