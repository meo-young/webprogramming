import {startGame2} from './inGame2.js';

$(document).ready(function () {
  // 변수 선언
const mainMenu = document.getElementById("main-menu");
const setting = document.getElementById("setting");
const selectStage = document.getElementById("select-stage");
const inGame1 = document.getElementById("in-game1");
const inGame2 = document.getElementById("in-game2");
const inGame3 = document.getElementById("in-game3");
const goBackBtns = document.querySelectorAll(".go-back-btn");
const stagebuttons = document.querySelectorAll('.stage-btn');

// 메뉴 숨기기
hideAllDivs();
mainMenu.style.display = "block";


function hideAllDivs() {//모든 div 숨기는 함수
  // 모든 div를 숨김
  mainMenu.style.display = "none";
  setting.style.display = "none";
  selectStage.style.display = "none";
  inGame1.style.display = "none";
  inGame2.style.display = "none";
  inGame3.style.display = "none";
}

// 이벤트 등록
document.getElementById("start-btn").addEventListener("click", showSelectStage);
document.getElementById("setting-btn").addEventListener("click", showSetting);
goBackBtns.forEach(btn => btn.addEventListener("click", goBack));
$(stagebuttons).each(function() {
  $(this).on("click", showInGame);
});

function showInGame(event) {
  hideAllDivs();
  if (event.target.id == 'stgbtn1') {
    inGame1.style.display = "block"; 
  } else if (event.target.id == 'stgbtn2') {
    inGame2.style.display = "block";
        //inGame2.js 실행
        startGame2();
  } else if (event.target.id == 'stgbtn3') {
    inGame3.style.display = "block";
  }
}


function showSetting() {//설정창 보여주는 함수
  hideAllDivs();//모든 div 숨기기
  setting.style.display = "block";//설정창 보여주기
}

function showSelectStage() {//스테이지 선택창 보여주는 함수
  hideAllDivs();//모든 div 숨기기
  selectStage.style.display = "block";//스테이지 선택창 보여주기
}



function goBack() {//뒤로가기 버튼 눌렀을 때
  const currentDiv = getCurrentDiv();//현재 화면에 보이는 div를 반환
  const previousDiv = getPreviousDiv(currentDiv);//현재 화면에 보이는 div의 이전 div를 반환
  hideAllDivs();//모든 div 숨기기
  previousDiv.style.display="block";//이전 div 보여주기
}


function getCurrentDiv() {
  // 현재 화면에 보이는 div를 반환
  if (mainMenu.style.display == "block") {//mainMenu가 보이는 상태일 경우
    return mainMenu;
  } else if (setting.style.display == "block") {//setting이 보이는 상태일 경우
    return setting;
  } else if (selectStage.style.display == "block") {//selectStage가 보이는 상태일 경우
    return selectStage;
  } else if (inGame1.style.display == "block") {
    return inGame1;
  } else if (inGame2.style.display == "block") {
    return inGame2;
  } else if (inGame3.style.display == "block") {
    return inGame3;
  }
}

function getPreviousDiv(currentDiv) {
  // 현재 화면에 보이는 div의 이전 div를 반환(값의 고정)
  switch (currentDiv) {//현재 화면에 보이는 div에 따라
    case setting://현재 화면에 보이는 div가 setting일 경우
      return mainMenu;
    case selectStage:
      return mainMenu;
    case inGame1:
      return selectStage;
    case inGame2:
      return selectStage;
    case inGame3:
      return selectStage;
    default:
      return null;
  }
}

});



