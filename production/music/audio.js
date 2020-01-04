$(document).ready(function () {

    var json = [{
        path: "./music/许嵩 - 山水之间.flac",
        img: "./music/山水之间.jpg",
        sing: "山水之间",
        singer: "许嵩vae"
    }, {
        path: "./music/许嵩 - 幻听.flac",
        img: "./music/幻听.jpg",
        sing: "幻听",
        singer: "许嵩vae"
    }, {
        path: "./music/赵雷 - 理想.mp3",
        img: "./music/理想.jpg",
        sing: "理想",
        singer: "赵雷"
    }, {
        path: "./music/朴树 - 送别.mp3",
        img: "./music/送别.jpg",
        sing: "送别",
        singer: "朴树"
    }, {
        path: "./music/崔开潮 - 声声慢.flac",
        img: "./music/声声慢.png",
        sing: "声声慢",
        singer: "崔开潮"
    }, {
        path: "./music/宋冬野 - 安和桥.flac",
        img: "./music/安河桥.jpg",
        sing: "安河桥",
        singer: "宋冬野"
    }, ]

    $.each(json, function (i, v) {
        $(".music-box ul").append(`<li data-url="${v.path}">
         <h3><img src="${v.img}" alt=""></h3>
         <div class="music-message">
             <h4 class="music-name">${v.sing}</h2>
                 <h6 class="singer">${v.singer}</h6>
         </div>
     </li>`);

    });
    var begin = $("#outplay")
    var now = 0
    var time = 0
    var W = $(".arrow").width()
    var common = 2
    message = setInterval(function () {
        console.log("xxxx");

    }, 100000);

    // $(".toggle-btn .btn-option").click(function () {
    //     var ul = $(this).children().eq(0)
    //     var next = $(".btn-option i.active").next().index() < 0 ? ul : $(".btn-option i.active").next()
    //     $(next).addClass("active").siblings().removeClass("active")
    // })

    $(".toggle-music .pause i").on("click", function () {
        clearInterval(message)
        if ($(".music-list li").hasClass("active")) {
            $(this).removeClass("active").siblings().addClass("active")
            if ($(this).hasClass("off")) {
                begin.trigger("play")
                $(".music-list li.active").children("h3").css("animation-play-state", "running")
                message = setInterval(function () {
                    progress()
                }, 1000)

            } else {
                begin.trigger("pause")
                $(".music-list li.active").children("h3").css("animation-play-state", "paused")
            }
        } else {
            toggle($(".music-list ul").children().eq(0))
        }
    })
    $(".music-list ul li").click(function (e) {
        if ($(this).hasClass("active")) {
            begin.trigger("play")
            clearInterval(message)
            time = this.duration
            updata()
            message = setInterval(function () {
                progress()

            }, 1000)
            $(".toggle-music .pause i.off").removeClass("active").siblings().addClass("active")
        } else {
            toggle($(this))
            console.log(time);

        }
    });

    $(".next").click(function (e) {
        var ul = $(".music-list ul").children().eq(0)
        var next = $(".music-list ul li.active").next().index() < 0 ? ul : $(".music-list ul li.active").next()
        toggle(next)

    });
    $(".prev").click(function (e) {
        var ul = $(".music-list ul").children()

        var prev = $(".music-list ul li.active").prev().index() < 0 ? ul.eq(ul.length - 1) : $(".music-list ul li.active").prev()
        toggle(prev)
    });


    $(begin).on("playing", function () {
        clearInterval(message)

        time = this.duration
        var m = parseInt(time / 60)
        var m = m < 10 ? "0" + m : m
        var s = parseInt(time % 60)
        var s = s < 10 ? "0" + s : s
        $(".end").text(m + ":" + s)

        message = setInterval(function () {
            progress()
            // updata()

        }, 1000)
    })

    function progress() {
        now += 1
        updata()
        $(".arrow-progress").css({
            width: now / time * W + "px",
            transition: "all 0.5s"
        }).children("span").css({
            left: parseInt(now / time * W),
            transition: "all 0.5s"
        })

    }

    $("#inp").on("input", function () {
        clearInterval(message)
        var ul = $(".music-list ul").children().eq(0)
        var value = $(this).val()
        if  (value==100) {
           he()
        }
        var music = $(begin)[0]
        music.currentTime = value / 100 * time
        now = music.currentTime
        updata()
        $(".arrow-progress").css("width", $(this).val() / 100 * W)
        $(".arrow span.scroll").css("left", $(this).val() / 100 * W)
        $(".toggle-music .pause i.off").removeClass("active").siblings().addClass("active")
        begin.trigger("play")
        message = setInterval(function () {
            progress()
        }, 1000)

    })

    $(begin).on("ended", function () {
        he()
    })

    function toggle(obj) {
        $(".arrow-progress").css("width", 0).children("span").css("left", 0)
        $(".now").text("00:00")

        begin.attr("src", $(obj).attr("data-url")).trigger("play")
        $(obj).addClass("active").siblings().removeClass("active")
            .children("h3").css("animation-play-state", "running")
        $(".toggle-music .pause i.off").removeClass("active").siblings().addClass("active")
        $("header").css({
            background: "url(" + $($(obj)).find("img").attr("src") + ")no-repeat center",
            backgroundSize: "cover"
        }).find(".music-name").text($(obj).find(".music-name")
            .text()).parent().find(".singer").text($(obj).find(".singer").text())
        if (now >= 0) {
            clearInterval(message)
            now = 0
        }

    }

    function updata() {
        var m = parseInt(now / 60)
        var m = m < 10 ? "0" + m : m
        var s = parseInt(now % 60)
        var s = s < 10 ? "0" + s : s
        $(".now").text(m + ":" + s)
    }

    function he() {
        var ul = $(".music-list ul").children().eq(0)
        var next = $(".music-list ul li.active").next().index() < 0 ? ul : $(".music-list ul li.active").next()
        toggle(next)
    }
})