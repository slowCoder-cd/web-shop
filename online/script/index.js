"use strict";!function(e){var t,a,l;t=e(".left_louti"),a=e(".left_louti .lt"),l=e(".main .section"),440<=e(window).scrollTop()?t.show():t.hide(),e(window).on("scroll",function(){var o=e(window).scrollTop();440<=o?t.show():t.hide(),l.each(function(t,i){var n=l.eq(t).offset().top+e(i).height()/2;if(o<n)return a.removeClass("act_louti"),a.eq(t).addClass("act_louti"),!1})}),a.on("click",function(){e(this).addClass("act_louti").siblings("li").removeClass("act_louti");var t=l.eq(e(this).index()).offset().top-200;e("html,body").animate({scrollTop:t})}),e(".backtop").on("click",function(){console.log(1),e("html,body").animate({scrollTop:0})}),e(window).scroll(function(){600<e(window).scrollTop()?e(".top_of").stop(!0).animate({top:"-20px"}):e(".top_of").stop(!0).animate({top:"-100px"})});var i=e(".btn_index ul li"),n=e(".ban_imgs_img"),o=0;function s(){for(var t=0;t<i.size();t++)i.removeClass("active_num"),n.css("opacity","0");i.eq(o).addClass("active_num"),n.eq(o).animate({opacity:"1"})}i.on("click",function(){o=e(this).parent("ul").children("li").index(this),s()}),e(".act_left").on("click",function(){--o<0&&(o=i.size()-1),s()}),e(".act_right").on("click",function(){++o>i.size()-1&&(o=0),s()});var c=setInterval(function(){++o>i.size()-1&&(o=0),s()},3e3);function r(i,t){e.ajax({data:{page:t},url:"http://localhost/web-shop/php/indexdata.php",dataType:"json"}).done(function(t){var n="<ul>";e.each(t.data,function(t,i){n+='\n\t\t\t\t<li>\n\t\t\t\t\t<a href="Detail Pages.html?sid='+i.sid+'">\n\t\t\t\t\t\t<img class="lazy" data-original="'+i.url+'" sid='+i.sid+"/>\n\t\t\t\t\t\t<p>"+i.title+'</p>\n\t\t\t\t\t\t<span class="price">￥'+i.price+"</span>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t"}),n+="</ul>",i.html(n),e("img.lazy").lazyload()})}e(".banner").on("mouseover",function(){clearInterval(c)}),e(".banner").on("mouseout",function(){c=setInterval(function(){++o>i.size()-1&&(o=0),s()},3e3)}),r(e(".section_img").eq(0),6),r(e(".section_img").eq(1),5),r(e(".section_img").eq(2),4),r(e(".section_img").eq(3),3),r(e(".section_img").eq(4),2),r(e(".section_img").eq(5),1),r(e(".section_img").eq(6),5),r(e(".section_img").eq(7),7)}(jQuery);