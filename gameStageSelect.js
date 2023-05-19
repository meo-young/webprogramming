var stage1 = document.getElementById("stgbtn1");
var stage2 = document.getElementById("stgbtn2");
var stage3 = document.getElementById("stgbtn3");

stage1.addEventListener("mouseover", () => {
    stage1.style.transform = "scale(1.2)";
    stage1.innerText = "보스 이름";
});
stage1.addEventListener("mouseout", () => {
    stage1.style.transform = "scale(1)";
    stage1.innerText = "Stage 1";
});

stage2.addEventListener("mouseover", () => {
    stage2.style.transform = "scale(1.2)";
    stage2.innerText = "보스 이름";
});
stage2.addEventListener("mouseout", () => {
    stage2.style.transform = "scale(1)";
    stage2.innerText = "Stage 2";
});

stage3.addEventListener("mouseover", () => {
    stage3.style.transform = "scale(1.2)";
    stage3.innerText = "보스 이름";
});
stage3.addEventListener("mouseout", () => {
    stage3.style.transform = "scale(1)";
    stage3.innerText = "Stage 3";
});