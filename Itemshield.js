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

var check =0;

var attack2 =0;

var rand;

var yplus =0;
/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
var start_number = 0;

/*canvas 너비, 높이 */
var cvwd = 1000;
var cvht = 1000;

/* 벽돌의 x,y좌표 */
var bricks = [0,0] ;
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
var maxbarWidth = 220;

/* window 높이 ,너비 */
var wdht;
var wdwd;

/* boss의 x,y좌표*/
var bossx;
var bossy;
var bosswd= cvwd - BRICKWIDTH*2;
var bossht=100;

/*플레이어, 보스 체력 */
var p_hp = 100;
var max_p_hp = 100;
var b_hp = 100;

/*아이템 관련 */
var itemwidth = 20;
var itemheight = 20;
var itemspeed = 3; // 아이템의 속도

/*쉴드 스킬 관련 */
var shield = 0;
var pressedQ = false;
var canPressQ = true;


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
	if(attack2 != 0){
		bossAttack2();
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
    for(var i = 0; i<2; i++){
    	brickx = i*(cvwd-200);
   		bricky = bossy+bossht;
   		if(bricks[i]==1){
   			context.beginPath();
            context.rect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
            context.fillStyle = "blue";
            context.fill();
   		}
    }

}


/* 보스를 그려주는 함수 */
function boss(){
	bossx = (cvwd-bosswd)/2;
	bossy = 100;
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
	var rand; //아이템 신규 확률 
	if(dxf < 0){
		dxf = -dxf;
	}
	
     for(var i = 0; i<2; i++){
    		brickx = i*(cvwd-200);
   			bricky = bossy+bossht;
        	if(bricks[i] == 1){
        		if(y > bricky+BRICKHEIGHT &&y < bricky+BRICKHEIGHT+ballRadius && brickx+BRICKWIDTH> x && brickx < x){ //벽돌의 아래 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
        			dy = -dy;
        			//여기부터 아이템 생성 
        			rand = Math.random();
		            if(rand <= 0.5){
		              handleBrickBreak(brickx,bricky+BRICKHEIGHT);
		            }
        		}
        		if(x > brickx - ballRadius - dxf &&  x < brickx && y < bricky+BRICKHEIGHT + ballRadius && y > bricky - ballRadius){ //벽돌의 왼쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
        			dx = -dx;
        			//여기부터 아이템 생성 
        			rand = Math.random();
		            if(rand <= 0.5){
		              handleBrickBreak(brickx,bricky+BRICKHEIGHT);
		            }
        		}
        		if(x < brickx + BRICKWIDTH + ballRadius  + dxf&& x > brickx + BRICKWIDTH && y < bricky+BRICKHEIGHT + ballRadius && y > bricky - ballRadius){ // 벽돌의 오른쪽 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
        			dx = -dx;
        			//여기부터 아이템 생성 
        			rand = Math.random();
		            if(rand <= 0.5){
		              handleBrickBreak(brickx,bricky+BRICKHEIGHT);
		            }
        		}
        		if(brickx+BRICKWIDTH> x && brickx < x && y > bricky- ballRadius && y < bricky){ // 벽돌의 윗 부분과 충돌
        			context.clearRect(brickx,bricky,BRICKWIDTH,BRICKHEIGHT);
        			bricks[i] = 0;
					dy = -dy;
					//여기부터 아이템 생성 
        			rand = Math.random();
		            if(rand <= 0.5){
		              handleBrickBreak(brickx,bricky+BRICKHEIGHT);
		            }
        		}
        	}
        }
    
	if((x < bossx & x > bossx -ballRadius - dxf & y < bossy + bossht +ballRadius & y > bossy - ballRadius)||(x < bossx +bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht +ballRadius & y > bossy - ballRadius)){ //보스의 왼쪽, 오른쪽에 충돌
		dx = -dx;
		b_hp--;
		hp();
	}
	else if(y > bossy+bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx-ballRadius & x < bossx + bosswd + ballRadius){ //보스의 아래에 충돌
		dy = -dy;
		b_hp--;
		hp();
	}
	else if(y < bossy & y > bossy-ballRadius - yvelocity& x > bossx-ballRadius & x < bossx + bosswd + ballRadius){ // 보스의 위에 충돌 2데미지
		dy = -dy;
		b_hp-= 2;
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

// 벽돌을 깨는 로직이 발생한 후 호출되는 함수
function handleBrickBreak(x, y) {
  // 아이템 생성
  createItem(x, y);
}
// 벽돌을 깼을 때 아이템이 생성되고 아래로 떨어지는 함수
function createItem(x, y) {

  var itemWhat = Math.floor(Math.random()*5)+1; 

  // 아이템 그리기
  context.beginPath();
  context.rect(x, y, itemwidth, itemheight);
  switch(itemWhat){
      case 1:
        context.fillStyle = 'red';
        break;
      case 2:
        context.fillStyle = 'orange';
        break;
      case 3:
        context.fillStyle = 'yellow';
        break;
      case 4:
        context.fillStyle = 'green';
        break;
      case 5:
        context.fillStyle = 'blue';
        break;
    }
  context.fill();

  // 아이템 이동

  function moveItem() {
    // Canvas 지우기
    context.clearRect(x, y, itemwidth, itemheight);

    // 아이템의 위치 업데이트
    y += itemspeed;

    // 아이템 그리기
    context.beginPath();
    context.rect(x, y, itemwidth, itemheight);
    switch(itemWhat){
      case 1:
        context.fillStyle = 'red';
        break;
      case 2:
        context.fillStyle = 'orange';
        break;
      case 3:
        context.fillStyle = 'yellow';
        break;
      case 4:
        context.fillStyle = 'green';
        break;
      case 5:
        context.fillStyle = 'blue';
        break;
    }
    context.fill();

    // 아이템이 화면 아래로 벗어났을 때 제거 or 아이템을 먹었을 때

    if((y > (cvht-20-itemheight))){
          if(x > barx+(barwidth/2+itemwidth) || x < barx-(barwidth/2+itemwidth)){ //바의 영역에서 벗어난 경우
                clearInterval(intervalId);
                context.clearRect(x,y,itemwidth,itemheight);
          }else{ //바의 영역의 마지노선에 맞닿는 경우
              clearInterval(intervalId);
              context.clearRect(x,y,itemwidth,itemheight);
              getItem(itemWhat);
          }
  }
  }

  var intervalId = setInterval(moveItem, 10);
}

function getItem(x){
  switch(x){
    case 1:
      item1();
      break;
    case 2:
      item2();
      break;
    case 3:
      item3();
      break;
    case 4:
      item4();
      break;
    case 5:
      item5();
      break;
    
  }
}
function item1(){//패들 길이 증가
  

  context.clearRect((barx-barwidth/2),cvht-20,barwidth, barheight);
  barwidth+=30;
  if(barwidth>maxbarWidth){
    barwidth=maxbarWidth;
  }


  drawPaddle();

}
function item2(){//체력 회복
  if(p_hp<max_p_hp){
  	p_hp++;
  }
  hp();
}
function item3(){//골드증가
  
}
function item4(){//보스 행동정지
  
}
function item5(){//보스 공격
  	b_hp--;
	hp();
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

	if(attack2 != 0){
		bossAttack2();
	}

}

//q를 누르면 보호막이 2초간 생성됩니다 보호막이 생성되면 전역변수인 shield가 1로 맞춰집니다. 보호막이 생성된 후 10초 동안은 다시 보호막을 생성할 수 없습니다. 
function qPress(event) {
  if (canPressQ && event.key === 'q') {
  	var getsh = document.getElementById("shield");
    pressedQ = true; //q를 눌렀는지의 여부
    canPressQ = false; //q를 누를 수 있는 지의 여부 쿨타임
    shield = 1; //쉴드 적용 여부
   
    getsh.innerText = "쉴드적용";
    setTimeout(() => {
      pressedQ = false;
      shield = 0;
      getsh.innerText = "쉴드안적용";
      setTimeout(enablePressQ, 10000);
    }, 2000);
  }
  
  
}

function enablePressQ() {
  canPressQ = true;
}

document.addEventListener('keypress', qPress);


/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

function timeAttack(){
	timer += 1;
	if(timer % 7 == 0){
		
		for(var i =0; i<bricks.length; i++){
				bricks[i] = 1;
			}
			if(attack2 == 0){
				setInterval(bossAttack2, 10); //다 부수면 멈춰야하나 ?
			}
			attack2 = 1;
		}
		
	
	$("#timer").text(timer);

}


/* 벽돌 소환으로 방어 */
function bossAttack2(){
	drawbrick();
}


/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/



/*쉴드 스킬

var shield = 0;
var pressedQ = false;
var canPressQ = true;

function resetShield() {
  shield = 0;
}

function qPress(event) {
  if (canPressQ && event.key === 'q') {
    pressedQ = true;
    canPressQ = false;
    setTimeout(() => {
      pressedQ = false;
      resetShield();
      canPressQ = true;
    }, 2000);
  }
  
  setTimeout(enablePressQ, 10000);
}

function enablePressQ() {
  canPressQ = true;
}

document.addEventListener('keypress', qPress);

*/


/*아이템 



// 벽돌을 깨는 로직이 발생한 후 호출되는 함수
function handleBrickBreak(x, y) {
  // 아이템 생성
  createItem(x, y);
}
// 벽돌을 깼을 때 아이템이 생성되고 아래로 떨어지는 함수
function createItem(x, y) {

  var itemWhat = Math.floor(Math.random()*5)+1; 

  // 아이템 그리기
  context.beginPath();
  context.rect(x, y, itemwidth, itemheight);
  switch(itemWhat){
      case 1:
        context.fillStyle = 'red';
        break;
      case 2:
        context.fillStyle = 'orange';
        break;
      case 3:
        context.fillStyle = 'yellow';
        break;
      case 4:
        context.fillStyle = 'green';
        break;
      case 5:
        context.fillStyle = 'blue';
        break;
    }
  context.fill();

  // 아이템 이동

  function moveItem() {
    // Canvas 지우기
    context.clearRect(x, y, itemwidth, itemheight);

    // 아이템의 위치 업데이트
    y += itemspeed;

    // 아이템 그리기
    context.beginPath();
    context.rect(x, y, itemwidth, itemheight);
    switch(itemWhat){
      case 1:
        context.fillStyle = 'red';
        break;
      case 2:
        context.fillStyle = 'orange';
        break;
      case 3:
        context.fillStyle = 'yellow';
        break;
      case 4:
        context.fillStyle = 'green';
        break;
      case 5:
        context.fillStyle = 'blue';
        break;
    }
    context.fill();

    // 아이템이 화면 아래로 벗어났을 때 제거 or 아이템을 먹었을 때

    if((y > (cvht-20-itemheight))){
          if(x > barx+(barwidth/2+itemwidth) || x < barx-(barwidth/2+itemwidth)){ //바의 영역에서 벗어난 경우
                clearInterval(intervalId);
                context.clearRect(x,y,itemwidth,itemheight);
          }else{ //바의 영역의 마지노선에 맞닿는 경우
              clearInterval(intervalId);
              context.clearRect(x,y,itemwidth,itemheight);
              getItem(itemWhat);
          }
  }
  }

  var intervalId = setInterval(moveItem, 5);
}

function getItem(x){
  switch(x){
    case 1:
      item1();
      break;
    case 2:
      item2();
      break;
    case 3:
      item3();
      break;
    case 4:
      item4();
      break;
    case 5:
      item5();
      break;
    
  }
}
function item1(){//패들 길이 증가
  

  context.clearRect((barx-barwidth/2),cvht-20,barwidth, barheight);
  barwidth+=30;
  if(barwidth>maxbarWidth){
    barwidth=maxbarWidth;
  }


  drawPaddle();

}
function item2(){//체력 회복
  if(p_hp<max_p_hp){
  	p_hp++;
  }
  hp();
}
function item3(){//골드증가
  
}
function item4(){//보스 행동정지
  
}
function item5(){//보스 공격
  	b_hp--;
	hp();
}




*/