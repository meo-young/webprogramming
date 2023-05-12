window.onload = function(){
	pageLoad();
	windowsize();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();
}

var start_number = 0;
/*canvas 너비, 높이 */
var cvwd = 1000;
var cvht = 1000;

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
var ballRadius = 20;

/* 공의 이동속도 */
var xvelocity = 6;
var yvelocity = 6;
var dx;
var dy;

/* 공의 x,y좌표. */
var x;
var y;

/* 바(bar)의 x좌표 */
var barx = cvwd/2;
var barwidth = 200;
var barheight = 10;

/* window 높이 ,너비 */
var wdht;
var wdwd;

/* boss의 x,y좌표*/
var bossx;
var bossy;
var bosswd= 200;
var bossht=200;

/*플레이어, 보스 체력 */
var p_hp = 100;
var b_hp = 100;

/* window size 변경 해주는 함수 */
function windowsize(){
	var screen = document.getElementById("screen");
	var button = document.getElementById("gamestart");
	wdht = (window.outerHeight-cvht)/4;
	wdwd = (window.outerWidth-cvwd)/2;
	buwd = ((window.outerWidth)/2);
	screen.style.top = wdht+"px";
	screen.style.left = wdwd+"px";
	button.style.top = (wdht + cvht + 20) + "px";
	button.style.left = buwd-150+"px";
}

function pageLoad(){
	var start_button = document.getElementById("gamestart");
	start_button.onclick = wait;
}

/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
function wait(){
	$("#gamestart").css({
		"display" : "none"
	});
    repeat = setInterval(start, 1000);
}

function start(){
    context.clearRect(0,0,cvwd,cvht);
    drawText(count);
    count--;
    if(count == -1){
        clearInterval(repeat);
        count = 3;
        //repeat = setInterval(draw,10);
		draw();
        addEventListener('mousemove', mousemove);
		addEventListener("keydown", keydown);
    }
}

/* 공의 x,y좌표 초기값을 설정 */
function init(){
	screen = document.getElementById("screen");
	context = screen.getContext("2d");
	x = barx;
	y = cvht-20-ballRadius;
    dx = 0;
    dy = 0;
}

function draw(){
	context.clearRect(0,0,cvwd,cvht);
	boss();
	drawBall();
	drawPaddle();
	collision();
}

/* 공 그리는 함수 */
function drawBall(){
	context.beginPath();
	context.arc(x,y,ballRadius,0,Math.PI*2);
	context.fillStyle = "black";
	context.fill();
}

/* 바(bar) 그리는 함수 */
function drawPaddle(){
	context.beginPath();
	context.rect((barx-barwidth/2),cvht-20,barwidth,barheight);
	context.fillStyle = "black";
	context.fill();
}

/* 글씨 기본 설정 해주는 함수 */
function drawText(text){
    context.font = 'bold 70px arial';
    context.fillStyle = 'dodgerblue';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, cvwd/2, cvht/2);
}

/* 충돌 감지 */
function collision(){
	var brickx;
	var bricky;
	var dxf = dx;
	if(dxf < 0){
		dxf = -dxf;
	}
	/*
    for(var i = 0; i<6; i++){
    	brickx = i*100+1;
        for(var j = 0; j<3; j++){
        	bricky = j*30+1;
        	if(bricks[i][j] == 1){
        		if(y > bricky+BRICKHEIGHT &&y < bricky+BRICKHEIGHT+ballRadius && brickx+BRICKWIDTH> x && brickx < x){ //벽돌의 아래 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
        			dy = -dy;
        		}
        		if(x > brickx - ballRadius - dxf &&  x < brickx && y < bricky+BRICKHEIGHT + ballRadius && y > bricky - ballRadius){ //벽돌의 왼쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
        			dx = -dx;
        		}
        		if(x < brickx + BRICKWIDTH + ballRadius  + dxf&& x > brickx + BRICKWIDTH && y < bricky+BRICKHEIGHT + ballRadius && y > bricky - ballRadius){ // 벽돌의 오른쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
        			dx = -dx;
        		}
        		if(brickx+BRICKWIDTH> x && brickx < x && y > bricky- ballRadius && y < bricky){ // 벽돌의 윗 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i][j] = 0;
					dy = -dy;
        		}
        	}
        }
    }*/
	if((x < bossx & x > bossx -ballRadius - dxf & y < bossy + bossht +ballRadius & y > bossy - ballRadius)||(x < bossx +bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht +ballRadius & y > bossy - ballRadius)){ //보스의 왼쪽, 오른쪽에 충돌
		dx = -dx;
		b_hp--;
		hp();
	}
	else if((y > bossy+bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx-ballRadius & x < bossx + bosswd + ballRadius)||(y < bossy & y > bossy-ballRadius - yvelocity& x > bossx-ballRadius & x < bossx + bosswd + ballRadius)){ //보스의 위, 아래에 충돌
		dy = -dy;
		b_hp--;
		hp();
	}

	if((y > (cvht-20-ballRadius-yvelocity))){
		if(x > barx+(barwidth/2+ballRadius) || x < barx-(barwidth/2+ballRadius)){ //바의 영역에서 벗어난 경우
			if(y > (cvht-20-yvelocity)){
				clearInterval(repeat);
                //removeEventListener('mousemove', mousemove);
				init();
				draw();
				p_hp--;
				start_number=0;
				hp();
				addEventListener("keydown", keydown);
                //drawText("Game Over");
			}
		}else if(x > barx -(barwidth/2+ballRadius) &&x < barx + (barwidth/2+ballRadius)){ //바의 영역에 있는 경우	
				dx = xvelocity * (x-barx)/(barwidth+ballRadius/2);
				dy = -dy;
		}else{ //바의 영역의 마지노선에 맞닿는 경우
			dy = -dy;
			dx = -dx;
		}
	}
	else if(y < ballRadius){ //위쪽 벽면에 부딪히는 경우
		dy = -dy;
	}
    
    if(x < ballRadius){ // 왼쪽 벽면에 부딪히는 경우
        dx = -dx;
    }
    else if(x > cvwd-ballRadius){ // 오른쪽 벽면에 부딪히는 경우
        dx = -dx;
    }
	y += dy;
    x += dx;
	
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

/* 보스를 그려주는 함수 */
function boss(){
	bossx = (cvwd-bosswd)/2;
	bossy = 10;
	context.beginPath();
	context.rect(bossx,bossy,bosswd,bossht);
	context.fillStyle = "red";
	context.fill();

}

/* 플레이어, 보스 체력 출력해주는 함수 */
function hp(){
	var t1 = "player의 체력 : "+p_hp;
	var t2 = "boss의 체력 : "+b_hp; 
	$("#ptext").text(t1);
	$("#btext").text(t2);
}

/* 스페이스바를 누를 경우 공 발사 */
function keydown(event){
	if(event.keyCode == 32){
		repeat = setInterval(draw,10);
		start_number=1;
		dy = yvelocity;
		removeEventListener('keydown', keydown);
	}
}

/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
//영역 밖을 나갈시 최대 영역으로 바를 그림
function mousemove(event){
	barx = event.clientX-wdwd;
	context.clearRect(0,0,cvwd,cvht);
	drawBall();
	boss();
	if(start_number==0){
		x = barx;
	}
	if(barx > (cvwd-barwidth/2)){
		barx = cvwd-barwidth/2;
		context.clearRect(0,cvht-20,cvwd,barheight);
		drawPaddle();
	}
	else if(barx < barwidth/2){
		barx = barwidth/2;
		context.clearRect(0,cvht-20,cvwd,barheight);
		drawPaddle();
	}
	else{
		context.clearRect(0,cvht-20,cvwd,barheight);
		drawPaddle();
	}
}
