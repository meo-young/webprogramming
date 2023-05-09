window.addEventListener('mousemove', mousemove);
window.onload = function(){
	pageLoad();
}


var repeat;

/* canvas, context 선언 */
var screen;
var context;

/* 공의 반지름 */
var ballRadius = 10;

/* 공의 이동속도 */
var default = 5;
var dx = 0;
var dy = 2;

/* 공의 x,y좌표. */
var x;
var y;

/* 바(bar)의 x좌표 */
var barx = 250;

function pageLoad(){
	var start_button = document.getElementById("gamestart");
	start_button.onclick = start;
}

function start(){
	repeat = setInterval(drawBall,10);
}

/* 공의 x,y좌표 초기값 */
function init(){
	screen = document.getElementById("screen");
	context = screen.getContext("2d");
	x = 300;
	y = 200;
	drawBall();
}

/* 공 그리는 함수 */
function drawBall(){
	if(y > 368){
		if(x > barx+50 || x < barx-50){
			if(y > 378){
				clearInterval(repeat);
			}
		}else{
			if((barx - x)==0){
				dx = -dx;
				dy = -dy;
			}
			else {
				dx = (default*(barx-x)*5)/100;
			}
		}
	}
	else if(y < 10){
		dy = -dy;
		dx = -dx;
	}
	
	context.clearRect(0,0,600,380);
	context.beginPath();
	context.arc(x,y,ballRadius,0,Math.PI*2);
	context.fillStyle = "black";
	context.fill();
	
}

/* 바(bar) 그리는 함수 */
function drawPaddle(){
	context.beginPath();
	context.rect(barx-60,380,100,10);
	context.fillStyle = "black";
	context.fill();
}

/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
//영역 밖을 나갈시 최대 영역으로 바를 그림
function mousemove(event){
	barx = event.clientX;
	if(barx > 560){
		barx = 555;
		context.clearRect(0,380,600,10);
		drawPaddle();
	}
	else if(barx < 60){
		barx = 65;
		context.clearRect(0,380,600,10);
		drawPaddle();
	}
	else{
		context.clearRect(0,380,600,10);
		drawPaddle();
	}
}