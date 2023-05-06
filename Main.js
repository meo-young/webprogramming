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


function showSetting() {
  hideAllDivs();
  setting.style.display = "block";
}

function showSelectStage() {
  hideAllDivs();
  selectStage.style.display = "block";
}

function showVideo(event) {
  hideAllDivs();
  video.style.display = "block";
  whatbtn = event.target.id
  if (whatbtn == 'stgbtn1') {
    videoPlayer.src = 'videos/1.mp4';
  } else if (whatbtn == 'stgbtn2') {
    videoPlayer.src = 'videos/2.mp4';
  } else if (whatbtn == 'stgbtn3') {
    videoPlayer.src = 'videos/3.mp4';
  }
  videoPlayer.play();
  videoPlayer.addEventListener('ended', function () {
    showInGame(whatbtn);
  });
}

function hideVideo() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  showInGame();
}

function showInGame() {
  hideAllDivs();
  if (whatbtn == 'stgbtn1') {
    inGame1.style.display = "block";
  } else if (whatbtn == 'stgbtn2') {
    inGame2.style.display = "block";
  } else if (whatbtn == 'stgbtn3') {
    inGame3.style.display = "block";
  }
}




function goBack() {
  const currentDiv = getCurrentDiv();
  const previousDiv = getPreviousDiv(currentDiv);
  hideAllDivs();
  previousDiv.style.display = "block";
}


function getCurrentDiv() {
  // 현재 화면에 보이는 div를 반환
  if (mainMenu.style.display === "block") {
    return mainMenu;
  } else if (setting.style.display === "block") {
    return setting;
  } else if (selectStage.style.display === "block") {
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
  switch (currentDiv) {
    case setting:
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

function hideAllDivs() {
  // 모든 div를 숨김
  mainMenu.style.display = "none";
  setting.style.display = "none";
  selectStage.style.display = "none";
  video.style.display = "none";
  inGame1.style.display = "none";
  inGame2.style.display = "none";
  inGame3.style.display = "none";
}
