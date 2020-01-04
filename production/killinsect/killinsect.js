$(document).ready(function () {
    $(".nav-box .nav-btn").on("click", function (event) {
        $(".nav-box .storage-box").addClass("unlock")
        $(".nav-box .mask").css("cursor", "help").css({
            display: "block",
        })
        $(".storage-fixed").css("visibility", "visible")
    })
    $(".nav-box .storage-box .mask,.close-btn").on("click", function () {
        console.log("xxx");
        
        // $(".nav-box .mask").css()
        $(".nav-box .storage-box").removeClass("unlock")
        $(".storage-fixed").css("visibility", "hidden")
        $(".nav-box .mask").css({
            display: "none",
            cursor:"auto",
        })
    })
    //浮动定位的导航条
$(document).on("scroll", function () {
    var top = $(this).scrollTop()
    if (top >= 220) {
        $(".head-nav-box").css({
            position: "fixed",
            top: "0px",
            zIndex: "999",
        })
    } else {
        $(".head-nav-box").css({
            position: "static",
        })
    }
})
//表单里面的下拉列表
$(".inner-list .list li").on("mouseover",function(){
    var odd=$(".inner-list .list li.active")
    $(this).css("background","#f6f6f6").siblings().css("background","white")
    $(".inner-list .list").on("mouseout",function(){
        odd.css("background","#f6f6f6").siblings().css("background","white")
    })
    $(".inner-list .list li").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active")
    })
})
$(".inner-content .first").on("click",function(){
    event.stopPropagation()
    if( $(this).children(".inner-list").hasClass("on")){
        $(this).children(".on").addClass("off").removeClass("on")
        $(this).find(".select-btn i").css("transform","rotateZ("+-180+"deg)")
    }else{
        $(this).children(".off").addClass("on").removeClass("off")
        $(this).find(".select-btn i").css("transform","rotateZ("+0+"deg)")
    }
})
$(".inner-list .list li").on("click",function(){
})
$(".selc et-content p").text($(this).text())
$(document).on("click",function(event){
    if($(".inner-list").hasClass("off")){
        $(".inner-list").addClass("on").removeClass("off")
    $(".select-btn i").css("transform","rotateZ("+0+"deg)")
    }
})
})
//无缝轮播的文本
$(".silder-txt-box ul").on("mousedown",function(event){
    var x=event.clientX
    var now=$(this).attr("translate")
    console.log(now);
    
    $(this).on("mousemove",function(event){
        var ulx=event.clientX
        
    })
    $(this).on("mouseup",function(){
        $(this).off("mousemove")
    })
})