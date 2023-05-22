$(document).ready(function () {
    
    // 배경음악, 배경음악 버튼, 배경음악 선택
    var audioFile = new Audio("./Battle.mp3");
    audioFile.play();
    audioFile.loop = true;
    $("#audioVol").click(function() {
        if(!audioFile.paused) {
            $("#audioVol").css({ "background": "url(volOff.png)" });
            audioFile.pause();
        }
        else {
            $("#audioVol").css({ "background": "url(volOn.png)" });
            audioFile.play();
        }
    })

    $(".main-btn").click(function() {
        $("#main-menu").addClass("animateContent1");
        setTimeout(function() {
            $("#main-menu").removeClass("animateContent1").hide();
        }, 1000);
    });

    // 시작버튼(스테이지 선택)
    $("#start-btn").click(function () {
        $("#select-stage").addClass("animateContent2").css({ "display": "inline-block" });
        $(".go-back-btn").click(function () {
            $("#select-stage").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function() {
                $("#select-stage").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function() {
                    $("#main-menu").removeClass("animateContent2");
                }, 2000);
            }, 1000);
        })
    })

    // 환경설정
    $("#settings-btn").click(function () {
        $("#settings-menu").addClass("animateContent2").css({ "display": "inline-block" });
        $(".go-back-btn").click(function () {
            $("#settings-menu").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function() {
                $("#settings-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function() {
                    $("#main-menu").removeClass("animateContent2");
                }, 2000);
            }, 1000);
        })
    })

    // 상점
    $("#shop-btn").click(function () {
        $("#shop-menu").addClass("animateContent2").css({ "display": "inline-block" });
        $(".go-back-btn").click(function () {
            $("#shop-menu").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function() {
                $("#shop-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function() {
                    $("#main-menu").removeClass("animateContent2");
                }, 2000);
            }, 1000);
        })
    })

    $("#stgbtn1").mouseenter(function () {
        $(this).css({ "background": "url(boss1.png)" });
    })
    $("#stgbtn1").mouseout(function () {
        $(this).css({ "background": "url(moon.png)" });
    })
    $("#stgbtn2").mouseenter(function () {
        $(this).css({ "background": "url(boss2.png)" });
    })
    $("#stgbtn2").mouseout(function () {
        $(this).css({ "background": "url(moon.png)" });
    })
    $("#stgbtn3").mouseenter(function () {
        $(this).css({ "background": "url(boss3.png)" });
    })
    $("#stgbtn3").mouseout(function () {
        $(this).css({ "background": "url(moon.png)" });
    })
    $(".go-back-btn").mouseenter(function () {
        $(this).css({ "background": "url(backIcon.png)" });
    })
    $(".go-back-btn").mouseout(function () {
        $(this).css({ "background": "url(backIcon2.png)" });
    })
});