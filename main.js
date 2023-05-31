import { stageStart1 } from "./stage1/stage1.js";
import { stageStart2 } from "./stage2/stage2.js";
import { stageStart3 } from "./stage3/stage3.js";
$(document).ready(function () {

    // 골드
    var currentGold = 200;
    $(".gold").html(currentGold);

    // 물약 개수 변수
    var potion1Num = 3;
    var potion2Num = 3;
    var potion3Num = 3;

    
    $("#p1Num").html(potion1Num);
    $("#p2Num").html(potion2Num);
    $("#p3Num").html(potion3Num);


    // 현재 배경 img
    var currentIMG = $("#b1").attr("src");

    // 효과음
    var effectOn = true;

    // 배경음악, 배경음악 버튼, 배경음악 선택
    var bgmOn = true;
    var mainBgm = new Audio("./audio/main.mp3");    // 메인브금
    var shopBgm = new Audio("./audio/shop.mp3");    // 상점브금
    var bgm1 = new Audio("./audio/boss1.mp3");   // 보스1 브금
    var bgm2 = new Audio("./audio/boss2.mp3");   // 보스2 브금
    var bgm3 = new Audio("./audio/boss3.mp3");   // 보스3 브금
    var clickSound = new Audio("./audio/clickEffect.mp3");   // 버튼 클릭시 효과음
    var winBgm = new Audio("./audio/win_7s.mp3");  // 승리브금
    var loseBgm = new Audio("./audio/lose_7s.mp3");  // 패배브금
    var pAttack = new Audio();  // 플레이어 공격 효과음
    var bAttack = new Audio();  // 보스 공격 효과음
    var pSkill = new Audio();  // 플레이어 스킬 효과음
    var keyboardAudio = new Audio("./storyimg/키보드소리.mp3");
    var keyboardAudio2 = new Audio("./storyimg/키보드소리.mp3");
    var thunderAudio = new Audio("./storyimg/펑소리.mp3");
    var buySkin = new Audio("./audio/구매성공.mp3");
    var buyCant = new Audio("./audio/구매실패.mp3");
    var buyPotion = new Audio("./audio/포션구매.mp3");
    var changeSkin = new Audio("./audio/스킨전환.mp3");

    var currentBGM = mainBgm;    // 현재 재생/중지 상태의 음악파일, 환경설정에서 변경 가능
    var storyimgflag = 0;
    currentBGM.play();
    currentBGM.loop = true;   // 반복재생

    // 좌측 상단 오디오 버튼 클릭 시
    $("#audioVol").off('click').on('click', function () {
        // if(!currentBGM.paused) {    // 재생 -> 정지
        if (bgmOn) {
            $(this).css({ "background": "url(./img/interface/volOff_50x50.png)" });
            $("#BGM").css({ "background": "url(./img/interface/volOff_50x50.png)" });
            currentBGM.pause();
            bgmOn = false;
        }
        else {  // 정지 -> 재생
            $(this).css({ "background": "url(./img/interface/volOn_50x50.png)" });
            $("#BGM").css({ "background": "url(./img/interface/volOn_50x50.png)" });
            currentBGM.play();
            bgmOn = true;
        }
    });

    // 시작(스테이지), 환경설정, 상점 버튼 클릭 시 메인메뉴 애니메이션
    // $(".main-btn").off('click').on('click', function() {
    //     if (effectOn) {
    //         clickSound.play();   // 버튼 클릭 효과음
    //     }
    //     $("#main-menu").addClass("animateContent1");    // 메인 메뉴 페이지 전환 효과 (작아지는)
    //     setTimeout(function() {
    //         $("#main-menu").removeClass("animateContent1").hide();  // 1초 후 메인 메뉴 디스플레이 none
    //     }, 500);
    // });

    // 각 스테이지 선택 시 스테이지 선택 화면 애니메이션
    // $(".stage-btn").off('click').on('click', function() {
    //     if (effectOn) {
    //         clickSound.play();   // 버튼 클릭 효과음
    //     }
    //     $("#select-stage").removeClass("animateContent2").addClass("animateContent1");    // 스테이지 선택 페이지 전환 효과 (작아지는)
    //     setTimeout(function() {
    //         $("#select-stage").removeClass("animateContent1").hide();
    //     }, 500);
    // });

    // 시작버튼(스테이지 선택) 클릭 시 스테이지 선택 화면 애니메이션
    $("#start-btn").off('click').on('click', function () {
        if (effectOn) {
            clickSound.play();   // 버튼 클릭 효과음
        }

        $("#main-menu").addClass("animateContent1");    // 메인 메뉴 페이지 전환 효과 (작아지는)
        setTimeout(function () {
            $("#main-menu").removeClass("animateContent1").hide();  // 1초 후 메인 메뉴 디스플레이 none
        }, 500);
        // 메인 메뉴가 사라지면서 스테이지 선택 페이지 등장
        setTimeout(function () {
            $("#select-stage").addClass("animateContent2").css({ "display": "inline-block" });
        }, 500);
        // 스테이지 화면 각 화면 마우스 오버 시 보스 이미지로 변환
        $("#stgbtn1").mouseenter(function () {
            $(this).css({
                "background": "url(./img/interface/stage1select2.png)",
                "background-repeat": "no-repeat"
            });
        })
        $("#stgbtn1").mouseout(function () {
            $(this).css({ "background": "url(./img/interface/stage1select1.png)" });
        })
        $("#stgbtn2").mouseenter(function () {
            $(this).css({
                "background": "url(./img/interface/stage2select2.png)",
                "background-repeat": "no-repeat"
            });
        })
        $("#stgbtn2").mouseout(function () {
            $(this).css({ "background": "url(./img/interface/stage2select1.png)" });
        })
        $("#stgbtn3").mouseenter(function () {
            $(this).css({
                "background": "url(./img/interface/stage3select2.png)",
                "background-repeat": "no-repeat"
            });
        })
        $("#stgbtn3").mouseout(function () {
            $(this).css({ "background": "url(./img/interface/stage3select1.png)" });
        })
        // 첫번째 보스 캔버스
        $("#stgbtn1").off('click').on('click', function () {
            if (effectOn) {
                clickSound.play();   // 버튼 클릭 효과음
            }
            currentBGM.pause();
            showGif('./storyimg/stage1A.gif');
            setTimeout(() => {
                $("#select-stage").removeClass("animateContent2").addClass("animateContent1");    // 스테이지 선택 페이지 전환 효과 (작아지는)
                setTimeout(function () {
                    $("#select-stage").removeClass("animateContent1").hide();
                }, 500);
                setTimeout(function () {
                    $("#stage1").addClass("animateContent2").css({ "display": "inline-block" });
                }, 500);
                currentGold = parseInt($(".gold").eq(0).text());
                potion1Num = parseInt($("#p1Num").eq(0).text()); 
                stageStart1(currentGold, effectOn, potion1Num, potion2Num, potion3Num);
            }, 5100)
        });
        // 두번째 보스 캔버스
        $("#stgbtn2").off('click').on('click', function () {
            if (effectOn) {
                clickSound.play();   // 버튼 클릭 효과음
            }
            currentBGM.pause();
            showGif('./storyimg/stage2A.gif');
            setTimeout(() => {
                $("#select-stage").removeClass("animateContent2").addClass("animateContent1");    // 스테이지 선택 페이지 전환 효과 (작아지는)
                setTimeout(function () {
                    $("#select-stage").removeClass("animateContent1").hide();
                }, 500);
                setTimeout(function () {
                    $("#stage2").addClass("animateContent2").css({ "display": "inline-block" });
                }, 500);
                currentGold = parseInt($(".gold").eq(0).text());
                potion2Num = parseInt($("#p2Num").eq(0).text()); 
                stageStart2(currentGold, effectOn, potion1Num, potion2Num, potion3Num);
            }, 5100);
        });
        // 세번째 보스 캔버스
        $("#stgbtn3").off('click').on('click', function () {
            if (effectOn) {
                clickSound.play();   // 버튼 클릭 효과음
            }
            currentBGM.pause();
            showGif('./storyimg/stage3A.gif');
            setTimeout(() => {
                $("#select-stage").removeClass("animateContent2").addClass("animateContent1");    // 스테이지 선택 페이지 전환 효과 (작아지는)
                setTimeout(function () {
                    $("#select-stage").removeClass("animateContent1").hide();
                }, 500);
                setTimeout(function () {
                    $("#stage3").addClass("animateContent2").css({ "display": "inline-block" });
                }, 500);
                currentGold = parseInt($(".gold").eq(0).text());
                potion3Num = parseInt($("#p3Num").eq(0).text()); 
                stageStart3(currentGold, effectOn, potion1Num, potion2Num, potion3Num);
            }, 5100);
        });
        // 뒤로가기 버튼 클릭 시 스테이지 화면과 메인 메뉴 애니메이션
        $("#stage-to-main").off('click').on('click', function () {
            if (effectOn) {
                clickSound.play();   // 버튼 클릭 효과음
            }
            $("#select-stage").removeClass("animateContent2").addClass("animateContent1");  // 스테이지 선택 페이지 줄어드는 애니메이션
            setTimeout(function () {
                $("#select-stage").removeClass("animateContent1").hide();   // 스테이지 선택 페이지 none해주고
                $("#main-menu").show().addClass("animateContent2");         // 다시 메인 메뉴 나타나게
                setTimeout(function () {
                    $("#main-menu").removeClass("animateContent2");
                }, 1000);
            }, 500);
        });
    });

    // 위와 애니메이션 동작 방식 동일
    // 환경설정버튼 클릭 시 환경설정 화면 애니메이션
    $("#settings-btn").off('click').on('click', function () {
        if (effectOn) {
            clickSound.play();   // 버튼 클릭 효과음
        }
        $("#main-menu").addClass("animateContent1");    // 메인 메뉴 페이지 전환 효과 (작아지는)
        setTimeout(function () {
            $("#main-menu").removeClass("animateContent1").hide();  // 1초 후 메인 메뉴 디스플레이 none
        }, 500);
        // 메인 메뉴가 사라지면서 환경설정 페이지 등장
        setTimeout(function () {
            $("#settings-menu").addClass("animateContent2").css({ "display": "inline-block" });
        }, 500);
        // 배경음악
        if (bgmOn) { // 온오프버튼 이미지 초기화
            $("#BGM").css({ "background": "url(./img/interface/volOn_50x50.png)" });
        }
        else {
            $("#BGM").css({ "background": "url(./img/interface/volOff_50x50.png)" });
        }
        $("#BGM").off("click").on("click", function () {
            if (bgmOn) { // 재생 -> 정지
                $(this).css({ "background": "url(./img/interface/volOff_50x50.png)" });
                $("#audioVol").css({ "background": "url(./img/interface/volOff_50x50.png)" });
                currentBGM.pause();
                bgmOn = false;
            }
            else {  // 정지 -> 재생
                $(this).css({ "background": "url(./img/interface/volOn_50x50.png)" });
                $("#audioVol").css({ "background": "url(./img/interface/volOn_50x50.png)" });
                currentBGM.play();
                bgmOn = true;
            }
        });
        // 효과음
        if (effectOn) { // 온오프버튼 이미지 초기화
            $("#effectSound").css({ "background": "url(./img/interface/volOn_50x50.png)" });
        }
        else {
            $("#effectSound").css({ "background": "url(./img/interface/volOff_50x50.png)" });
        }
        $("#effectSound").off("click").on("click", function () {
            if (effectOn) { // 재생 -> 정지
                $(this).css({ "background": "url(./img/interface/volOff_50x50.png)" });
                effectOn = false;
            }
            else {  // 정지 -> 재생
                $(this).css({ "background": "url(./img/interface/volOn_50x50.png)" });
                effectOn = true;
            }
        });
        // 뒤로가기
        $("#settings-to-main").off('click').on('click', function () {
            if (effectOn) {
                clickSound.play();   // 버튼 클릭 효과음
            }
            $("#settings-menu").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function () {
                $("#settings-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function () {
                    $("#main-menu").removeClass("animateContent2");
                }, 1000);
            }, 500);
        });
    });

    // 상점버튼 클릭 시 상점 화면 애니메이션
    $("#shop-btn").off('click').on('click', function () {
        if (effectOn) {
            clickSound.play();   // 버튼 클릭 효과음
        }
        // 상점 브금
        if (bgmOn) {
            currentBGM.pause();
            currentBGM = shopBgm;
            currentBGM.currentTime = 0;
            currentBGM.play();
            currentBGM.loop = true;
        }
        $("#main-menu").addClass("animateContent1");    // 메인 메뉴 페이지 전환 효과 (작아지는)
        setTimeout(function () {
            $("#main-menu").removeClass("animateContent1").hide();  // 1초 후 메인 메뉴 디스플레이 none
        }, 500);
        // 메인 메뉴가 사라지면서 상점 페이지 등장
        setTimeout(function () {
            $("#shop-menu").addClass("animateContent2").css({ "display": "inline-block" });
        }, 500);
        // 각 플레이어 캐릭터 마우스 오버 시
        $("#pDefault").mouseenter(function () {  // 기본 캐릭터
            $(this).attr("src", "./img/player/playerRunDown_32x32.gif");
        });
        $("#pDefault").mouseout(function () {
            $(this).attr("src", "./img/player/playerStanding_32x32.gif");
        });
        $("#pRed").mouseenter(function () {  // 빨강
            $(this).attr("src", "./img/player/playerRunDown_red_32x32.gif");
        });
        $("#pRed").mouseout(function () {
            $(this).attr("src", "./img/player/playerStanding_red_32x32.gif");
        });
        $("#pCyan").mouseenter(function () {  // 파랑
            $(this).attr("src", "./img/player/playerRunDown_cyan_32x32.gif");
        });
        $("#pCyan").mouseout(function () {
            $(this).attr("src", "./img/player/playerStanding_cyan_32x32.gif");
        });
        $("#pWhite").mouseenter(function () {  // 하양
            $(this).attr("src", "./img/player/playerRunDown_white_32x32.gif");
        });
        $("#pWhite").mouseout(function () {
            $(this).attr("src", "./img/player/playerStanding_white_32x32.gif");
        });
        $("#pYellow").mouseenter(function () {  // 금색
            $(this).attr("src", "./img/player/playerRunDown_yellow_32x32.gif");
        });
        $("#pYellow").mouseout(function () {
            $(this).attr("src", "./img/player/playerStanding_yellow_32x32.gif");
        });
        $("#pPurple").mouseenter(function () {  // 보라
            $(this).attr("src", "./img/player/playerRunDown_purple_32x32.gif");
        });
        $("#pPurple").mouseout(function () {
            $(this).attr("src", "./img/player/playerStanding_purple_32x32.gif");
        });

        // 각 플레이어 캐릭터 클릭 시
        $(".pChar").off('click').on('click', function () {
            currentGold = parseInt($(".gold").eq(0).text());
            if ($(this).hasClass("owned")) { // 보유중인 캐릭터 클릭시
                if ($(".pChar").hasClass("equip"))
                    $(".pChar").removeClass("equip");
                $(this).addClass("equip"); // 착용중으로 변경
                if (effectOn)
                    changeSkin.play();
            }
            else if ($(this).hasClass("equip")) {
                $(this).removeClass("equip");
            }
            else {  // 보유중이지 않은 캐릭터 클릭시
                if (confirm("100 gold로 구매하시겠습니까?")) {
                    if (currentGold >= 100) {
                        currentGold -= 100;
                        $(".gold").html(currentGold);
                        $(this).addClass("owned");
                        if (effectOn)
                            buySkin.play();
                    }
                    else {
                        alert("골드가 부족합니다!");
                        if (effectOn)
                            buyCant.play();
                    }
                }
            }
        });


        // 1번 물약 클릭시
        $("#potion1").off('click').on('click', function () {
            currentGold = parseInt($(".gold").eq(0).text());
            potion1Num = parseInt($("#p1Num").eq(0).text()); 
            if (currentGold >= 10) {
                potion1Num++;
                currentGold -= 10;
                $("#p1Num").html(potion1Num);
                $(".gold").html(currentGold);
                if (effectOn)
                    buyPotion.play();
            }
            else {
                alert("골드가 부족합니다!");
                if (effectOn)
                    buyCant.play();
            }
        });
        // 2번 물약 클릭시
        $("#potion2").off('click').on('click', function () {
            currentGold = parseInt($(".gold").eq(0).text());
            potion2Num = parseInt($("#p2Num").eq(0).text());
            if (currentGold >= 20) {
                potion2Num++;
                currentGold -= 20;
                $("#p2Num").html(potion2Num);
                $(".gold").html(currentGold);
                if (effectOn)
                    buyPotion.play();
            }
            else {
                alert("골드가 부족합니다!");
                if (effectOn)
                    buyCant.play();
            }
        });
        // 3번 물약 클릭시
        $("#potion3").off('click').on('click', function () {
            currentGold = parseInt($(".gold").eq(0).text());
            potion3Num = parseInt($("#p3Num").eq(0).text());
            if (currentGold >= 30) {
                potion3Num++;
                currentGold -= 30;
                $("#p3Num").html(potion3Num);
                $(".gold").html(currentGold);
                if (effectOn)
                    buyPotion.play();
            }
            else {
                alert("골드가 부족합니다!");
                if (effectOn)
                    buyCant.play();
            }
        });

        // 뒤로가기
        $("#shop-to-main").off('click').on('click', function () {
            if (effectOn) {
                clickSound.play();   // 버튼 클릭 효과음
            }
            $("#shop-menu").removeClass("animateContent2").addClass("animateContent1");
            setTimeout(function () {
                $("#shop-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function () {
                    $("#main-menu").removeClass("animateContent2");
                }, 1000);
            }, 500);
            if (bgmOn) {
                currentBGM.pause();
                currentBGM = mainBgm;
                currentBGM.currentTime = 0;
                currentBGM.play();
                currentBGM.loop = true;
            }
        });
    });


    // 뒤로가기 버튼 오버 시
    $(".go-back-btn").mouseenter(function () {
        $(this).css({ "background": "url(./img/interface/backHover_50x50.png)" });
    })
    $(".go-back-btn").mouseout(function () {
        $(this).css({ "background": "url(./img/interface/back_50x50.png)" });
    })
    // 메인 메뉴 버튼들 마우스오버 시
    $("#start-btn").mouseenter(function () { // 시작
        $(this).css({ "transform": "scale(1.2)" });
    })
    $("#start-btn").mouseout(function () {
        $(this).css({ "transform": "scale(1)" });
    })
    $("#settings-btn").mouseenter(function () { // 환경설정
        $(this).css({ "transform": "scale(1.2)" });
    })
    $("#settings-btn").mouseout(function () {
        $(this).css({ "transform": "scale(1)" });
    })
    $("#shop-btn").mouseenter(function () { // 상점
        $(this).css({ "transform": "scale(1.2)" });
    })
    $("#shop-btn").mouseout(function () {
        $(this).css({ "transform": "scale(1)" });
    })

    // 게임 시작시 등장하는 스토리
    $("#storyImg").off('click').on('click', function () {
        storyimgflag++;
        if (storyimgflag == 2) {//두번째 클릭
            //오디오 종료
            keyboardAudio.pause();
            thunderAudio.pause();
            //메인메뉴 브금 넣기
            $("#story-menu").addClass("animateContent1");
            setTimeout(function () {
                $("#story-menu").removeClass("animateContent1").hide();
                $("#main-menu").show().addClass("animateContent2");
                setTimeout(function () {
                    $("#main-menu").removeClass("animateContent2");
                }, 1000);
                currentBGM = mainBgm;    // 현재 재생/중지 상태의 음악파일, 환경설정에서 변경 가능
                var storyimgflag = 0;
                currentBGM.play();
                currentBGM.loop = true;
            }, 500);
        }
        else if (storyimgflag == 1) {//처음 화면 클릭
            currentBGM.pause();
            setTimeout(() => {
                if(storyimgflag == 1)
                keyboardAudio.play();
            }, 1000);
            setTimeout(() => {
                if(storyimgflag == 1)
                keyboardAudio.pause();
            }, 4000);
            setTimeout(() => {
                if(storyimgflag == 1)
                thunderAudio.play();
            }, 5500);
            setTimeout(() => {
                thunderAudio.pause();
            }, 8000);
            setTimeout(() => {
                if(storyimgflag == 1)
                keyboardAudio.play();
            }, 10000);
            setTimeout(() => {
                if(storyimgflag == 1)
                keyboardAudio.play();
            }, 16000);

            $(this).fadeOut(500, function () {
                // fadeOut() 메서드로 천천히 사라지고, 애니메이션 완료 후 콜백 함수 실행
                $(this).attr("src", "./storyimg/prologe.gif").fadeIn(500); // fadeIn() 메서드로 천천히 나타남
                setTimeout(() => {
                    $(this).trigger('click');
                }, 20000);
                //오디오 재생
            });
        }
    });



    
    function showGif(gifsrc) {
        $("#select-stage").hide();
        $("#stageStoryImg").attr("src", gifsrc);
        $("#stage-story").fadeIn(1, () => {
            keyboardAudio.play();
            setTimeout(() => {
                keyboardAudio.pause();
            }, 4000);
        })
        setTimeout(() => { $("#stage-story").fadeOut(2000); }, 3000);
    }
});