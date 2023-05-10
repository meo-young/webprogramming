window.onload = function(){
	pageLoad();
}

/* 벽돌의 x,y좌표 */
var bricks = [[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1]] ;
var BRICKWIDTH = 99;
var BRICKHEIGHT = 29;

/* 게임시작 후 카운트 세주는 변수 */
var count = 3;

/* setinterval 입력받는 변수 */
var repeat;

/* canvas, context 선언 */
var screen;
var context;

/* 공의 반지름 */
var ballRadius = 10;

/* 공의 이동속도 */
var velocity = 5;
var dx;
var dy;

/* 공의 x,y좌표. */
var x;
var y;

/* 바(bar)의 x좌표 */
var barx = 300;

function pageLoad(){
	var start_button = document.getElementById("gamestart");
	start_button.onclick = wait;
}

/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
function wait(){
    repeat = setInterval(start, 1000);
}

function start(){
    context.clearRect(0,0,600,400);
    drawText(count);
    count--;
    if(count == -1){
        clearInterval(repeat);
        count = 3;
	    context.clearRect(0,0,600,400);
        repeat = setInterval(draw,10);
        drawPaddle();
        addEventListener('mousemove', mousemove);
    }
}

/* 공의 x,y좌표 초기값 */
function init(){
	screen = document.getElementById("screen");
	context = screen.getContext("2d");
	x = 300;
	y = 200;
    dx = 0;
    dy = 2;
	draw();
}

function draw(){
	collision();
	drawbrick();
	drawBall();
}

/* 공 그리는 함수 */
function drawBall(){
    context.clearRect(x-ballRadius-dx-0.25,y-ballRadius-dy-0.25,ballRadius*2+0.5,ballRadius*2+0.5);
	context.beginPath();
	context.arc(x,y,ballRadius,0,Math.PI*2);
	context.fillStyle = "black";
	context.fill();

	if(y > 368){
		if(x > barx+60 || x < barx-60){
			if(y > 378){
				clearInterval(repeat);
                removeEventListener('mousemove', mousemove);
                context.clearRect(0,0,600,400);
                drawText("Game Over");
			}
		}else if(x > barx -60 && x < barx){  //바의 중심을 기준으로 왼쪽 바에 맞는 경우
			dy = -dy;
            dx = velocity / 100 * (x-barx);
		}else if(x > barx && x < barx + 60){ //바의 중심을 기준으로 오른쪽 바에 맞는 경우
            dy = -dy;
            dx = velocity / 100 * (x-barx);
        }else{                              //바의 중심에 맞는 경우
            dy = -dy;
        }
	}
	else if(y < 10){
		dy = -dy;
	}
    
    if(x < 10){
        dx = -dx;
    }
    else if(x > 590){
        dx = -dx;
    }
	y += dy;
    x += dx;
}

/* 바(bar) 그리는 함수 */
function drawPaddle(){
	context.beginPath();
	context.rect(barx-50,380,100,10);
	context.fillStyle = "black";
	context.fill();
}

/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
//영역 밖을 나갈시 최대 영역으로 바를 그림
function mousemove(event){
	barx = event.clientX;
	if(barx > 550){
		barx = 550;
		context.clearRect(0,380,600,10);
		drawPaddle();
	}
	else if(barx < 50){
		barx = 50;
		context.clearRect(0,380,600,10);
		drawPaddle();
	}
	else{
		context.clearRect(0,380,600,10);
		drawPaddle();
	}
}

/* 글씨 기본 설정 해주는 함수 */
function drawText(text){
    context.font = 'bold 70px arial';
    context.fillStyle = 'dodgerblue';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 300, 200);
}

/* 충돌 감지 */
function collision(){
	var brickx;
	var bricky;
	var dxf = dx;
	if(dxf < 0){
		dxf = -dxf;
	}
    for(var i = 0; i<6; i++){
    	brickx = i*100+1;
        for(var j = 0; j<3; j++){
        	bricky = j*30+1;
        	if(bricks[i][j] == 1){
        		if(y == bricky+BRICKHEIGHT+10 && brickx+BRICKWIDTH> x && brickx < x){ //벽돌의 아래 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
        			dy = -dy;
        		}
        		else if(x > brickx - 10 - dxf &&  x < brickx && y < bricky+BRICKHEIGHT + 10 && y > bricky - 10){ //벽돌의 왼쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
        			dx = -dx;
        		}
        		else if(x < brickx + BRICKWIDTH + 10  + dxf&& x > brickx + BRICKWIDTH && y < bricky+BRICKHEIGHT + 10 && y > bricky - 10){ // 벽돌의 오른쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
        			dx = -dx;
        		}
        		else if(brickx+BRICKWIDTH> x && brickx < x && y == bricky- 10){ // 벽돌의 윗 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
					dy = -dy;
        		}
        	}
        }
    }
}


/* 벽돌 그려주는 함수 */
function drawbrick(){
	var brickx;
	var bricky;
    for(var i = 0; i<6; i++){
    	brickx = i*100+1;
        for(var j = 0; j<3; j++){
        	bricky = j*30+1;
			if(bricks[i][j] == 1){
        			context.beginPath();
            		context.rect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
            		context.fillStyle = "blue";
            		context.fill();
        	}
        }
    }
}
