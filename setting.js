const bgSelect = document.getElementById("bg-select");
bgSelect.addEventListener("change", changeBackground);
const audioPlayer = document.getElementById("audio-player");
const musicSelect = document.getElementById("music-checkbox");
const characterSelect = document.getElementById("character-select");
musicSelect.addEventListener("change", changeMusic);
characterSelect.addEventListener("change", changeCharacter);


export function changeBackground() {
    // 배경 이미지 변경하는 함수
    const bgSrc = bgSelect.value;
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${bgSrc})`;
  }
  
  export function changeMusic() {
    const musicSrc = musicSelect.value;
    audioPlayer.src = musicSrc;
    audioPlayer.play();
  }
  
  export function changeCharacter() {
    const character = characterSelect.value;
    const characterImg = document.querySelector(".character-img");
    characterImg.src = character;
  }
  