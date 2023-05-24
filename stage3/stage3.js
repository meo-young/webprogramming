window.onload = function(){
	pageLoad();
	windowsize();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();
	
}

/* 플레이어 스킬 변수 */
var qskill = 0;
var qskill_timer = 30;
var qskill_repeat;
var qskill_cooltime = 0;

var wskill = 0;
var wskill_timer = 10;
var wskill_repeat;
var wskill_repeat2;
var wskill_cooltime = 0;
var ypl = 480;
var wskill_count = 0;
var attack_x;

var eskill = 0;
var eskill_cooltime = 15;
var eskill_timer;
var eskill_count = 0;
var eskill_repeat;

/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
var timer = 0;
var time_repeat;

var attack1 =0;
var coordinate; //attack1 수행시 필요한 플레이어의 직전의 좌표 변수
var attack1_timer =0;
var attack1_repeat;
var check =0;

var attack2 =0;

var attack3 =0;
var xmemory;
var ymemory;
var attack3_timer =0;
var attack3_repeat;
var attack3_count = 0;


var attack4 =0;
var attack_bricks=[0,0,0,0,0];
var rand;
var attack4_timer;
var attack4_count =0;
var yplus =0;
/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
var start_number = 0;

/*canvas 너비, 높이 */
var cvwd = 600;
var cvht = 600;

/* 벽돌의 x,y좌표 */
var bricks = [0,0,0,0,0] ;
var BRICKWIDTH = 119;
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
var xvelocity = 2;
var yvelocity = 2;
var dx;
var dy;

/* 공의 x,y좌표. */
var x;
var y;

/* 바(bar)의 x좌표 */
var barx = cvwd/2;
var barwidth = 100;
var barheight = 10;

/* window 높이 ,너비 */
var wdht;
var wdwd;

/* boss의 x,y좌표*/
var bossx;
var bossy;
var bosswd= 80;
var bossht= 80;

/*플레이어, 보스 체력 */
var p_hp = 0;
var b_hp = 20;

//플레이어 이미지

var playerStandingsrc = "playerStanding_32x32.gif"; // div
var bossImg = new Image(); // in canvas
	bossImg.src = "boss2.jpg";
var bossStandingsrc = "bossLast_101x80.gif"; // div



/* window size 변경 해주는 함수 */
function windowsize(){
	var screen = document.getElementById("screen");
	var button = document.getElementById("gamestart");
	var bossui = document.getElementById("boss_UI");
	var playerui = document.getElementById("player_UI");
	wdht = (window.outerHeight-cvht)/4;
	wdwd = (window.outerWidth-cvwd)/2;
	buwd = ((window.outerWidth)/2);
	screen.style.top = wdht+"px";
	screen.style.left = wdwd+"px";
	button.style.top = (wdht + cvht + 20) + "px";
	button.style.left = buwd-150+"px";
	bossui.style.left = (wdwd-200) + "px";
	bossui.style.top = wdht + "px";
	playerui.style.left = (wdwd + cvwd) + "px";
	playerui.style.top = (wdht) + "px";
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
        repeat = setInterval(draw,1);
        drawinterval = 1;
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
	/* 보스 공격 관련 조건문 */
	if(eskill == 0){
		if(attack1 != 0 ){
			bossAttack1();
		}
		if(attack2 != 0){
			bossAttack2();
		}
		if(attack4 != 0){
			bossAttack4();
		}
	}
	/* drawPaddle 관련 위치 조건문 */
	if(barx > (cvwd-barwidth/2)){
		barx = cvwd-barwidth/2;
	}
	else if(barx < barwidth/2){
		barx = barwidth/2;
	}
	else{
	}
	
	/* 스페이스바 유무 관련 조건문 */
	if(start_number==0){
		x = barx;
	}

	/* 스킬 관련 조건문 */
	if(qskill == 1){
		drawshield();
	}
	if(wskill == 1){
		drawsword();
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
	if(attack3_count == 1){
		context.fillStyle = "blue";

	}
	else {
		context.fillStyle = "black";
	}
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
    for(var i = 0; i<cvwd/120; i++){
    	brickx = i*120;
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
	var wd = 120;
	var ht = 30;
    for(var i = 0; i<cvwd/120; i++){
		if(i==rand){
			continue;
		}
    	brickx = i*120;
        for(var j = 1; j<2; j++){
        	bricky = j*300+yplus;
			if(bricky > cvht){
				if(rand == 0){
					if(barx+barwidth/2 < 120){
					}
					else{
						if(qskill == 1){
							qskill =0;
						}
						else {
							p_hp_decrease();
						}
					}
				}else if(rand==4){
					if(barx-barwidth/2 > 120*(rand-1)+wd){
					}
					else{
						if(qskill == 1){
							qskill = 0;
						}
						else {
							p_hp_decrease();
						}
					}
				}
				else {
					if(barx-barwidth/2 > (rand-1)*120+wd && barx+barwidth/2 < (rand+1)*120){
					}else{
						if(qskill == 1){
							qskill =0;
						}
						else {
							p_hp_decrease();
						}
					}
				}
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


function drawshield(){
	context.beginPath();
	context.arc(barx,cvht-20,barwidth/2,Math.PI,0);
	context.strokeStyle = "yellow";
	context.stroke();
}

/*w키를 누르면 검격이 나가게 보여주는 함수 */
function drawsword(){
	context.beginPath();
	context.rect(attack_x-15,ypl,30,100); // 가로 30 세로 100의 검 생성
	context.fillStyle = "yellow";
	context.fill();
}


/* 보스를 그려주는 함수 */
function boss(){
	bossx = (cvwd-bosswd)/2;
	bossy = 10;
	context.beginPath();
	context.rect(bossx,bossy,bosswd,bossht);
	if(eskill == 1){
		context.fillStyle = "blue";
	}
	else {
		context.fillStyle = "red";
	}
	context.fill();

	
	context.drawImage(bossImg,bossx,bossy,bosswd,bossht);

}

function b_hp_decrease(){
	var num = b_hp*15;
	$("#container").animate({
		"height" : num+"px"
	});
	b_hp_decrease_Img();
	if(b_hp < 0 || b_hp == 0){
		game_over(1);
	}
}

//보스 체력 감소시 플레이어 공격모션
function b_hp_decrease_Img(){
	var playerImg = $("#playerImg");
	playerImg.attr("src","playerAttack1_32x32.gif");
	setTimeout(function(){
		playerImg.attr("src",playerStandingsrc);
	},1000);
}

function p_hp_decrease(){
	var p_hp_array = $(".state");
	p_hp_array[p_hp].src = "empty_hearted.png";
	p_hp++;


	if(p_hp == 1 || p_hp == 2){
		p_hp_decrease_Img();
	}
	if(p_hp == 3){
		game_over_Img();
		game_over(2);

	}
}

function p_hp_decrease_Img(){
	var playImg = $("#playerImg");
	var p_ImgBlankInterval = setInterval(function(){
		if(playImg.attr("src")===playerStandingsrc){
			playImg.attr("src","playerStanding_red_32x32.gif");}
		else{
			playImg.attr("src",playerStandingsrc);
		}
	}, 100);
	setTimeout(function(){
		clearInterval(p_ImgBlankInterval);
		playImg.attr("src",playerStandingsrc);

	}, 500);
}

function game_over(who){
	removeEventListener('keydown', keydown);
	removeEventListener('mousemove', mousemove);
	clearInterval(repeat);
	clearInterval(attack1_repeat);
	clearInterval(attack3_repeat);
	clearInterval(attack4_timer);
	clearInterval(time_repeat);
	context.clearRect(0,0,cvwd,cvht);
	if(who == 1){
		drawText("You Win");
	}
	else if(who == 2){
		drawText("You Lose");
	}
}
/* 플레이어, 보스 체력 출력해주는 함수 */
function hp(){
	var t1 = "player의 체력 : "+p_hp;
	$("#ptext").text(t1);
	$("#bp_num").text(b_hp);
}

function game_over_Img(){
	var playerImg = $("#playerImg");
	playerImg.attr("src","playerLose_32x32.gif");
}
/* 플레이어, 보스 체력 출력해주는 함수 */
function hp(){
	$("#bp_num").text(b_hp);
}

//공격 모션
function b_Attack_Img(){
	var bossAttackImg = $("#bossImg");
	bossAttackImg.attr("src","bossLastAttack_101x106.gif");
	setTimeout(function(){
		bossAttackImg.attr("src",bossStandingsrc);
	},3500);
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
	
    for(var i = 0; i<cvwd/120; i++){
    	brickx = i*120;
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
		b_hp_decrease();
	}
	else if((y > bossy+bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx-ballRadius & x < bossx + bosswd + ballRadius)||(y < bossy & y > bossy-ballRadius - yvelocity& x > bossx-ballRadius & x < bossx + bosswd + ballRadius)){ //보스의 위, 아래에 충돌
		dy = -dy;
		b_hp--;
		hp();
		b_hp_decrease();

	}

	if((y > (cvht-20-ballRadius-yvelocity))){
		if(x > barx+(barwidth/2+ballRadius) || x < barx-(barwidth/2+ballRadius)){ //바의 영역에서 벗어난 경우
			if(y > (cvht-20-yvelocity)){
				ballRadius = 10;
				init();
				draw();
				p_hp_decrease();
				start_number=0;
				addEventListener("keydown", keydown);
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

/* 스페이스바를 누를 경우 공 발사
스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
function keydown(event){
	if(start_number == 0){
		//스페이스바를 누를경우
		if(event.keyCode == 32){
			start_number=1;
			dy = yvelocity;
            if(drawinterval == 0){
                repeat = setInterval(draw,1);
            }
		}
	}
	else if(start_number == 1){
		//q를 누를경우
		if (qskill_cooltime == 0 && qskill == 0 && event.keyCode == 81) { //쿨타임이 아니고, 보호막이 활성화되지 않을 때 사용 가능
			qskill = 1; //이 변수가 1일 때 보호막 활성화
			$("#qskill").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
				"display" : "none"
			});
			$("#qtimer").css({
				"display" : "block"
			});
			$("#qtimer").text(qskill_timer); //쿨타임 글씨 활성화
			qskill_repeat = setInterval(skill_timer1, 1000); 
			qskill_cooltime = 1;
		}
		else if (wskill_cooltime == 0 && wskill == 0 && event.keyCode == 87) { 
			wskill = 1; //이 변수가 1일 때 보호막 활성화
			wskill_count = 0;
			attack_x = barx;
			$("#wskill").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
				"display" : "none"
			});
			$("#wtimer").css({
				"display" : "block"
			});
			$("#wtimer").text(wskill_timer); //쿨타임 글씨 활성화
			wskill_repeat = setInterval(skill_timer2, 1000); 
			wskill_cooltime = 1;
			wskill_repeat2 = setInterval(wskill_time, 1);
		}
		else if (event.keyCode == 69 && eskill == 0 && eskill_cooltime == 15){
			eskill = 1;
			eskill_count = 0;
			eskill_timer = setInterval(eskill_time,1000);
			eskill_repeat = setInterval(skill_timer3, 1000);
			$("#eskill").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
				"display" : "none"
			});
			$("#etimer").css({
				"display" : "block"
			});
			$("#etimer").text(eskill_cooltime); //쿨타임 글씨 활성
		}
	}
}

function skill_timer1(){
	qskill_timer--;
	if(qskill_timer == 28){
		qskill = 0;
	}
	else if(qskill_timer == -1){
		qskill_timer = 30;
		clearInterval(qskill_repeat);
		$("#qskill").css({
			"display" : "block"
		});
		$("#qtimer").css({
			"display" : "none"
		});
		qskill_cooltime = 0;
	}
	$("#qtimer").text(qskill_timer);
}

function skill_timer2(){
	wskill_timer--;
	if(wskill_timer == -1){
		wskill_timer = 10;
		clearInterval(wskill_repeat);
		$("#wskill").css({
			"display" : "block"
		});
		$("#wtimer").css({
			"display" : "none"
		});
		wskill_cooltime = 0;
	}
	$("#wtimer").text(wskill_timer);
}

function skill_timer3(){
	eskill_cooltime--;
	if(eskill_cooltime == -1){
		eskill_cooltime = 15;
		$("#eskill").css({
			"display" : "block"
		});
		$("#etimer").css({
			"display" : "none"
		});
		clearInterval(eskill_repeat);
	}
	$("#etimer").text(eskill_cooltime);
}

/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
function wskill_time(){
	ypl = ypl - 2; // Y좌표는 2칸씩 이동
	if(wskill_count == 0 && ypl < bossy+bossht && attack_x + 30 >= bossx && attack_x <= bossx + bosswd){
        b_hp_decrease();
        wskill_count = 1;
		wskill = 0;
	}

	if(ypl + 100 == 0){ //검이 영역 밖으로 나갔을 경우 함수 종료
		ypl = 480;
		clearInterval(wskill_repeat2);
		wskill_count = 0;
		wskill = 0;
	}
}

function eskill_time(){
	eskill_count++;
	if(eskill_count == 4){
		eskill = 0;
		clearInterval(eskill_timer);
	}
}

/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
//영역 밖을 나갈시 최대 영역으로 바를 그림
function mousemove(event){
	barx = event.clientX-wdwd;
}

/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

function timeAttack(){
	if(eskill != 1){
		timer += 1;
		if(timer % 6 == 0){
			
		}
		if(timer % 8 == 0){
			var randnum = Math.floor(Math.random()*1+3);
			if(randnum == 0){
				attack1 = 1;
				 attack1_repeat = setInterval(bossAttack1_timer,1000);
			}
			else if(randnum == 1){
				for(var i =0; i<bricks.length; i++){
					bricks[i] = 1;
				}
				attack2 = 1;
			}
			else if(randnum == 2){
				attack3 = 1;
				bossAttack3();
				attack3_repeat = setInterval(bossAttack3_timer,1000);
				attack3_count = 1;
			}
			else if(randnum == 3){
				b_Attack_Img();
				attack4 = 1;
				attack4_count = 0;
				rand = Math.floor(Math.random()*5);
				for(var i =0; i<attack_bricks.length; i++){
					if(i==rand){
						continue;
					}
					attack_bricks[i] = 1;
				}
				drawbrick2();
				setTimeout(bossAttack4_timer,2000);
			}
	
		}
	}
	else{
		if(attack1 == 1){
			attack1 = 0;
			clearInterval(attack1_repeat);
			attack1_timer = 0;
		}
		else if(attack2 == 1){
			attack2 = 0;
		}
		else if(attack3 == 1){
			attack3 = 0;
			clearInterval(attack3_repeat);
			attack3_timer = 0;
		}
		else if(attack4 == 1){
			attack4 = 0;
			attack4_count = 0;
			clearInterval(attack4_timer);
			yplus = 0;
			for(var r =0; r<attack_bricks.length; r++){
				attack_bricks[r] = 0;
			}
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
	if(attack1 == 1){ //3초동안 사용자의 패들의 x좌표를 따라감
		b_Attack_Img();
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
		if(check==0 && barx-barwidth/2 < coordinate && barx+barwidth/2 > coordinate){
			if(qskill == 1){
				qskill =0;
			}
			else {
				p_hp_decrease();
			}
			check = 1;
		}
	}
	else if(attack1 == 4){
		attack1 = 0;
		check = 0;
	}
}

/* 벽돌 소환으로 방어 */
function bossAttack2(){
	drawbrick();
}

/* 공 정지 공격 */
function bossAttack3_timer(){
	attack3_timer += 1;
	if(attack3_timer == 3){
		attack3 = 1;
		attack3_timer =0;
		dx = xmemory;
		dy = ymemory;
		attack3 = 0;
		attack3_count = 0;
		clearInterval(attack3_repeat);
	}
}

function bossAttack3(){
	xmemory = dx;
	ymemory = dy;
	dx =0;
	dy =0;
}

/* 벽돌 내려오면서 공격 */
function bossAttack4_timer(){
	yplus += 10;
	if(attack4_count == 0){
		attack4_timer = setInterval(bossAttack4_timer,10);
		attack4_count = 1;
	}
}

function bossAttack4(){
	drawbrick2();
}
/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
