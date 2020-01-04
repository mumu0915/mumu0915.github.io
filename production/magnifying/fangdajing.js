$(function () {

    var cons = $("ul img")

    for (var i = 0; i < cons.length; i++) {
        $(cons[i]).on("mouseover", function () {
            //选择放在大盒子里面的图片
            var lis = $("ul>li")
            var parent = $(this).parents("li")
            parent.addClass("active").siblings().removeClass("active")
            //获取修改大盒子图片的图片路径
            var images = parent.data("big")
            console.log(images)

            //同时切换大盒子里面的图片和，放大后的盒子里面的图片
            $(".box>img").attr("src", images)
            $(".magnify").css({
                "backgroundImage": "url(" + images + ")",
            })
        })
        $(".box").on("mouseover", function () {
            $(".magnify").css("display", "block")
            $(".slider").css("display", "block")
        })
        $(".box").on("mouseout", function () {
            $(".magnify").css("display", "none")
            $(".slider").css("display", "none")
        })

        $(".layer").on("mousemove", function (e) {
            var val = $("#multiple").val()
            console.log(val)
            var current = val
            var lWidth = $(".layer").width()
            var lHeight = $(".layer").height()
            $(".slider").css({
                width: lWidth / current,
                height: lHeight / current,
            })
            $(".magnify").css({
                backgroundSize: 100 * current + '%',
                backgroundSize: 100 * current + '%',
            })
            console.log(current)

            var x = e.offsetX
            var y = e.offsetY

            var lWidth = $(this).width()
            var lHeight = $(this).height()

            var slider = $(".slider")

            var w = slider.width()
            var h = slider.height()

            var minLeft = 0
            var maxLeft = lWidth - w

            var minTop = 0
            var maxTop = lHeight - h

            var left = x - w / 2
            var top = y - h / 2

            left = left <= minLeft ? minLeft : left >= maxLeft ? maxLeft : left
            top = top <= minTop ? minTop : top >= maxTop ? maxTop : top

            slider.css({
                left: left + "px",
                top: top + "px",
            })
            $(".magnify").css({
                backgroundPositionX: left * -current,
                backgroundPositionY: top * -current,
            })
        })

    }
})