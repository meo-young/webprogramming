window.onload = function(){
	pageLoad();
	windowsize();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();
}
/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
var timer = 0;
var time_repeat;

var attack1 =0;
var coordinate; //attack1 수행시 필요한 플레이어의 직전의 좌표 변수
var attack1_timer =0;
var attack1_repeat;
var attack1_repeat2;
var check =0;

var attack2 =0;

var attack3 =0;
var xmemory;
var ymemory;
var attack3_timer =0;
var attack3_repeat;


var attack4 =0;
var attack_bricks=[0,0,0,0,0];
var rand;
var attack4_timer;
var attack4_timer2;
var attack4_count =0;
var yplus =0;
/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
var start_number = 0;

/*canvas 너비, 높이 */
var cvwd = 1000;
var cvht = 1000;

/* 벽돌의 x,y좌표 */
var bricks = [0,0,0,0,0] ;
var BRICKWIDTH = 199;
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
var barwidth = 150;
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

/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/
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
		time_repeat = setInterval(timeAttack,1000);
        addEventListener('mousemove', mousemove);
		addEventListener("keydown", keydown);
    }
}

/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/






/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/
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
	if(attack1 != 0 ){
		bossAttack1();
	}
	if(attack2 != 0){
		bossAttack2();
	}
	if(attack4 != 0){
		bossAttack4();
	}
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

/* 벽돌 그려주는 함수 */
function drawbrick(){
	var brickx;
	var bricky;
    for(var i = 0; i<cvwd/200; i++){
    	brickx = i*200;
        for(var j = 1; j<2; j++){
        	bricky = j*220;
			if(bricks[i] == 1){
        			context.beginPath();
            		context.rect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
            		context.fillStyle = "blue";
            		context.fill();
        	}
        }
    }
}

function drawbrick2(){
	var brickx;
	var bricky;
	var wd = 200;
	var ht = 30;
    for(var i = 0; i<cvwd/200; i++){
		if(i==rand){
			continue;
		}
    	brickx = i*200;
        for(var j = 1; j<2; j++){
        	bricky = j*300+yplus;
			if(bricky > cvht){
				if(rand == 0){
					if(barx+barwidth/2 < 200){
						$("#nice").text("nice");
					}
					else{
						p_hp--;
						hp();
					}
				}else if(rand==4){
					if(barx-barwidth/2 > 200*(rand-1)+wd){
						$("#nice").text("nice");
					}
					else{
						p_hp--;
						hp();
					}
				}
				else {
					if(barx-barwidth/2 > (rand-1)*200+wd && barx+barwidth/2 < (rand+1)*200){
						$("#nice").text("nice");
					}else{
						p_hp--
						hp();
					}
				}
				clearInterval(attack4_timer2);
				clearInterval(attack4_timer);
				attack4_count = 0;
				attack4 = 0;
				yplus = 0;
				for(var r =0; r<attack_bricks.length; r++){
					attack_bricks[r] = 0;
				}
				break;
			}
			if(attack_bricks[i] == 1){
        			context.beginPath();
            		context.rect(brickx,bricky,wd,ht);
            		context.fillStyle = "red";
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

/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/





/* 충돌 감지 */
function collision(){
	var brickx;
	var bricky;
	var dxf = dx;
	if(dxf < 0){
		dxf = -dxf;
	}
	
    for(var i = 0; i<cvwd/200; i++){
    	brickx = i*200;
        for(var j = 1; j<2; j++){
        	bricky = j*220;
        	if(bricks[i] == 1){
        		if(y > bricky+BRICKHEIGHT &&y < bricky+BRICKHEIGHT+ballRadius && brickx+BRICKWIDTH> x && brickx < x){ //벽돌의 아래 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
        			dy = -dy;
        		}
        		if(x > brickx - ballRadius - dxf &&  x < brickx && y < bricky+BRICKHEIGHT + ballRadius && y > bricky - ballRadius){ //벽돌의 왼쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
        			dx = -dx;
        		}
        		if(x < brickx + BRICKWIDTH + ballRadius  + dxf&& x > brickx + BRICKWIDTH && y < bricky+BRICKHEIGHT + ballRadius && y > bricky - ballRadius){ // 벽돌의 오른쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
        			dx = -dx;
        		}
        		if(brickx+BRICKWIDTH> x && brickx < x && y > bricky- ballRadius && y < bricky){ // 벽돌의 윗 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
					dy = -dy;
        		}
        	}
        }
    }
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







/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

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
	if(barx > (cvwd-barwidth/2)){
		barx = cvwd-barwidth/2;
		drawPaddle();
	}
	else if(barx < barwidth/2){
		barx = barwidth/2;
		drawPaddle();
	}
	else{
		drawPaddle();
	}
	if(start_number==0){
		x = barx;
	}
	if(attack1 != 0){
		bossAttack1();
	}
	if(attack2 != 0){
		bossAttack2();
	}
	if(attack4 != 0){
		bossAttack4();
	}
}

/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

function timeAttack(){
	timer += 1;
	/*
	if(timer == 2){
		for(var i =0; i<bricks.length; i++){
			bricks[i] = 1;
		}
		setInterval(bossAttack2, 10); //다 부수면 멈춰야하나 ?
		attack2 = 1;
	}
	*/
	/*
	if(timer == 3){
		attack1 = 1;
		setInterval(bossAttack1,10); //멈춰야함
	 	attack1_repeat = setInterval(bossAttack1_timer,1000);
	}
	*/

	/*
	if(timer == 2){
		attack3 = 1;
		bossAttack3();
		attack3_repeat = setInterval(bossAttack3_timer,1000);
	}
	*/
	/*
	if(timer % 4 ==0){
		attack4 = 1;
		rand = Math.floor(Math.random()*5);
		for(var i =0; i<attack_bricks.length; i++){
			attack_bricks[i] = 1;
		}
		attack4_timer2 = setInterval(bossAttack4,10);
		setTimeout(bossAttack4_timer,2000);
	}*/

	if(timer % 8 == 0){
		var randnum = Math.floor(Math.random()*4);
		if(randnum == 0){
			attack1 = 1;
			attack1_repeat2 = setInterval(bossAttack1,10); //멈춰야함
	 		attack1_repeat = setInterval(bossAttack1_timer,1000);
		}
		else if(randnum == 1){
			for(var i =0; i<bricks.length; i++){
				bricks[i] = 1;
			}
			if(attack2 == 0){
				setInterval(bossAttack2, 10); //다 부수면 멈춰야하나 ?
			}
			attack2 = 1;
		}
		else if(randnum == 2){
			attack3 = 1;
			bossAttack3();
			attack3_repeat = setInterval(bossAttack3_timer,1000);
		}
		else if(randnum == 3){
			attack4 = 1;
			rand = Math.floor(Math.random()*5);
			for(var i =0; i<attack_bricks.length; i++){
				attack_bricks[i] = 1;
			}
			attack4_timer2 = setInterval(bossAttack4,10);
			setTimeout(bossAttack4_timer,2000);
		}

	}
	$("#timer").text(timer);
}

function bossAttack1_timer(){
	attack1_timer += 1;
	if(attack1_timer == 3){
		attack1 += 1;
	}
	else if(attack1_timer == 4){
		attack1 +=1;
	}
	else if(attack1_timer==5){
		attack1+=1;
		attack1_timer=0;
		clearInterval(attack1_repeat);
	}
}

/* 레이저 공격 */
function bossAttack1(){ 
	if(attack1==1){ //3초동안 사용자의 패들의 x좌표를 따라감
		context.beginPath();
		context.rect(barx-10,0,20,cvht);
		context.fillStyle = "gray";
		context.fill();
		coordinate = barx;
	}
	else if(attack1 == 2){ //3초 후에 사용자의 직전의 x좌표에 1초동안 머무름.
		context.beginPath();
		context.rect(coordinate-10,0,20,cvht);
		context.fillStyle = "gray";
		context.fill();
	}
	else if(attack1 == 3){ //1초 경과시 패들이 위치에 존재하면 사용자의 hp --
		context.beginPath();
		context.rect(coordinate-10,0,20,cvht);
		context.fillStyle = "red";
		context.fill();
		if(check==0 && barx-barwidth/2 < coordinate && barx+barwidth > coordinate){
			p_hp--;
			check = 1;
			hp();
		}
	}
	else if(attack1 == 4){
		attack1 = 0;
		check = 0;
		clearInterval(attack1_repeat2);
	}
}

/* 벽돌 소환으로 방어 */
function bossAttack2(){
	drawbrick();
}

function bossAttack3_timer(){
	attack3_timer += 1;
	if(attack3_timer == 3){
		attack3 =2;
		attack3_timer =0;
		dx = xmemory;
		dy = ymemory;
		attack3 = 0;
		clearInterval(attack3_repeat);
	}
}

function bossAttack3(){
	xmemory = dx;
	ymemory = dy;
	dx =0;
	dy =0;
}

function bossAttack4_timer(){
	yplus += 10;
	if(attack4_count==0){
		attack4_timer = setInterval(bossAttack4_timer,10);
		attack4_count = 1;
	}
}

function bossAttack4(){
	context.clearRect(0,0,cvwd,cvht);
	if(attack2 == 1){
		bossAttack2();
	}
	drawBall();
	boss();
	drawPaddle();
	drawbrick2();
}
/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
