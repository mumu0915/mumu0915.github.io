$(window).ready(function(){
    $(".nav-box .logo-box").click(function(){
        $(".home-page").removeClass("active")
    }).siblings().click(function(){
        $(".home-page").addClass("active")
        $(this).addClass("on")
        .siblings().removeClass("on")
        var on=$(this).attr('data-id');
        console.log($(this));
        
        $('#'+on).addClass("active").siblings().removeClass("active")
    })
    
})