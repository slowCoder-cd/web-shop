//头文件的js部分
        //1.点击顶部广告栏的 × 去掉父元素  .parent() .remove()
;(function (){

    const $clearX = $(".top_bar span");
    $clearX.on("click",function (){
        $(this).parent().remove();//移除当前对象的父元素；
    })

    const $bl_li = $(".bl_top .bl_right li" );
    

    
    //2.划过 (-更多精品-为您服务-利电工厂-)我的利电添加相应样式 .css();
    $bl_li.on("mouseover",function (){
        $(this).find("span").css("background","url(../img/hy-up.png)");
    });
    $bl_li.on("mouseout",function (){
        $(this).find("span").css("background","url(../img/hy-down.png)");
    });

    $me_li = $(".heade .h_nav .menu li");
    $me_li.hover(function (){
        $(this).addClass("active");
    }, function(){
        $(this).removeClass("active");
    })


})();