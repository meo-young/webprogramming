const bgSelect = document.getElementById("bg-select");
bgSelect.addEventListener("change", changeBackground);
const audioPlayer = document.getElementById("audio-player");
const musicSelect = document.getElementById("music-checkbox");
const characterSelect = document.getElementById("character-select");
musicSelect.addEventListener("change", changeMusic);
characterSelect.addEventListener("change", changeCharacter);


export function changeBackground() {
    // 배경 이미지 변경하는 함수
    const bgSrc = bgSelect.value;//bgSelect에서 선택한 value값을 bgSrc에 저장
    const body = document.querySelector("body");//body태그를 body에 저장
    body.style.backgroundImage = `url(${bgSrc})`;//body태그의 background-image를 bgSrc로 변경
  }
  
  export function changeMusic() {//음악 변경하는 함수
    const musicSrc = musicSelect.value;//musicSelect에서 선택한 value값을 musicSrc에 저장
    audioPlayer.src = musicSrc;//audioPlayer의 src를 musicSrc로 변경
    audioPlayer.play();//audioPlayer 재생
  }
  
  export function changeCharacter() {//캐릭터 변경하는 함수
    const character = characterSelect.value;//characterSelect에서 선택한 value값을 character에 저장
    const characterImg = document.querySelector(".character-img");//character-img 클래스를 가진 태그를 characterImg에 저장
    characterImg.src = character;//characterImg의 src를 character로 변경
  }
  