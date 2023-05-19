// 변수 선언
const mainMenu = document.getElementById("main-menu");
const setting = document.getElementById("setting");
const selectStage = document.getElementById("select-stage");
const video = document.getElementById("video");
const inGame1 = document.getElementById("in-game1");
const inGame2 = document.getElementById("in-game2");
const inGame3 = document.getElementById("in-game3");
const goBackBtns = document.querySelectorAll(".go-back-btn");
const stagebuttons = document.querySelectorAll('.stage-btn');
const skipBtn = document.getElementById("skip-btn");
const videoPlayer = document.querySelector("video");



// 메뉴 숨기기
setting.style.display = "none";
selectStage.style.display = "none";
video.style.display = "none";
inGame1.style.display = "none";
inGame2.style.display = "none";
inGame3.style.display = "none";

// 이벤트 등록
document.getElementById("start-btn").addEventListener("click", showSelectStage);
document.getElementById("setting-btn").addEventListener("click", showSetting);
skipBtn.addEventListener("click", hideVideo);
goBackBtns.forEach(btn => btn.addEventListener("click", goBack));
stagebuttons.forEach(button => {
  button.addEventListener('click', showVideo);
});

var whatbtn;
// Setting form event listeners


function showSetting() {//설정창 보여주는 함수
  hideAllDivs();//모든 div 숨기기
  setting.style.display = "block";//설정창 보여주기
}

function showSelectStage() {//스테이지 선택창 보여주는 함수
  hideAllDivs();//모든 div 숨기기
  selectStage.style.display = "block";//스테이지 선택창 보여주기
}

function showVideo(event) {//비디오 보여주는 함수
  hideAllDivs();//모든 div 숨기기
  video.style.display = "block";//비디오 보여주기
  whatbtn = event.target.id//클릭한 버튼의 id값을 whatbtn에 저장
  if (whatbtn == 'stgbtn1') {//whatbtn이 stgbtn1일 경우
    videoPlayer.src = 'videos/1.mp4';
  } else if (whatbtn == 'stgbtn2') {
    videoPlayer.src = 'videos/2.mp4';
  } else if (whatbtn == 'stgbtn3') {
    videoPlayer.src = 'videos/3.mp4';
  }
  videoPlayer.play();//비디오 재생
  videoPlayer.addEventListener('ended', function () {//비디오가 끝났을 때
    showInGame(whatbtn);//showInGame함수 실행
  });
}

function hideVideo() {//비디오 숨기는 함수
  videoPlayer.pause();//비디오 일시정지
  videoPlayer.currentTime = 0;//비디오 처음으로 돌아가기
  showInGame();//showInGame함수 실행
}

function showInGame() {//게임 화면 보여주는 함수
  hideAllDivs();//모든 div 숨기기
  if (whatbtn == 'stgbtn1') {//whatbtn이 stgbtn1일 경우
    inGame1.style.display = "block";//게임 화면 보여주기
  } else if (whatbtn == 'stgbtn2') {//whatbtn이 stgbtn2일 경우
    inGame2.style.display = "block";//게임 화면 보여주기
  } else if (whatbtn == 'stgbtn3') {
    inGame3.style.display = "block";
  }
}




function goBack() {//뒤로가기 버튼 눌렀을 때
  const currentDiv = getCurrentDiv();//현재 화면에 보이는 div를 반환
  const previousDiv = getPreviousDiv(currentDiv);//현재 화면에 보이는 div의 이전 div를 반환
  hideAllDivs();//모든 div 숨기기
  previousDiv.style.display = "block";
}


function getCurrentDiv() {
  // 현재 화면에 보이는 div를 반환
  if (mainMenu.style.display === "block") {//mainMenu가 보이는 상태일 경우
    return mainMenu;
  } else if (setting.style.display === "block") {//setting이 보이는 상태일 경우
    return setting;
  } else if (selectStage.style.display === "block") {//selectStage가 보이는 상태일 경우
    return selectStage;
  } else if (video.style.display === "block") {
    return video;
  } else if (inGame1.style.display === "block") {
    return inGame1;
  } else if (inGame2.style.display === "block") {
    return inGame2;
  } else if (inGame3.style.display === "block") {
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
    case video:
      return selectStage;
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

function hideAllDivs() {//모든 div 숨기는 함수
  // 모든 div를 숨김
  mainMenu.style.display = "none";
  setting.style.display = "none";
  selectStage.style.display = "none";
  video.style.display = "none";
  inGame1.style.display = "none";
  inGame2.style.display = "none";
  inGame3.style.display = "none";
}
