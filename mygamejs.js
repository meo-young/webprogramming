window.onload = function(){
	pageLoad();
}

/* 벽돌의 x,y좌표 */
var brickx = 1;
var bricky = 1;

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

function pageLoad(){//페이지 로드시 실행되는 함수
	var start_button = document.getElementById("gamestart");//게임시작 버튼
	start_button.onclick = wait;//게임시작 버튼 눌렀을 때 wait함수 실행
}

/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
function wait(){//게임시작 버튼 눌렀을 때 동작하는 함수
    repeat = setInterval(start, 1000);//1초마다 start함수 실행
}

function start(){//1초마다 실행되는 함수
    context.clearRect(0,0,600,400);//canvas 초기화
    drawText(count);//count값을 drawText함수에 넣어 실행
    count--;//count값 1씩 감소
    if(count == -1){//count가 -1일 경우
        clearInterval(repeat);//setInterval 종료
        count = 3;//count값 초기화
	    context.clearRect(0,0,600,400);//canvas 초기화
        init();//init함수 실행
        drawbrick();//drawbrick함수 실행
        repeat = setInterval(drawBall,10);//10ms마다 drawBall함수 실행
        drawPaddle();//drawPaddle함수 실행
        addEventListener('mousemove', mousemove);//mousemove 이벤트 발생시 mousemove함수 실행
    }
}

/* 공의 x,y좌표 초기값 */
function init(){//공의 x,y좌표 초기값
	screen = document.getElementById("screen");//screen태그를 screen에 저장
	context = screen.getContext("2d");//screen의 context를 context에 저장
	x = 300;
	y = 200;
    dx = 0;
    dy = 2;
	drawBall();//drawBall함수 실행
}

/* 공 그리는 함수 */
function drawBall(){
    context.clearRect(x-ballRadius-dx-0.25,y-ballRadius-dy-0.25,ballRadius*2+0.5,ballRadius*2+0.5);//공의 이전 위치를 지움
	context.beginPath();//공 그리기 시작
	context.arc(x,y,ballRadius,0,Math.PI*2);//공 그리기
	context.fillStyle = "black";//공 색깔
	context.fill();//공 색깔 채우기

	if(y > 368){//공이 바에 맞는 경우
		if(x > barx+60 || x < barx-60){//바의 양 끝에 맞는 경우
			if(y > 378){//바의 양 끝에 맞고 바닥에 닿은 경우
				clearInterval(repeat);//setInterval 종료
                removeEventListener('mousemove', mousemove);//mousemove 이벤트 제거
                context.clearRect(0,0,600,400);//canvas 초기화
                drawText("Game Over");//"Game Over"를 drawText함수에 넣어 실행
			}
		}else if(x > barx -60 && x < barx){  //바의 중심을 기준으로 왼쪽 바에 맞는 경우
			dy = -dy;//공의 y축 속도를 반대로
            dx = velocity / 100 * (x-barx);//공의 x축 속도를 바의 중심과의 거리에 비례하게 설정
		}else if(x > barx && x < barx + 60){ //바의 중심을 기준으로 오른쪽 바에 맞는 경우
            dy = -dy;//공의 y축 속도를 반대로
            dx = velocity / 100 * (x-barx);//공의 x축 속도를 바의 중심과의 거리에 비례하게 설정
        }else{                              //바의 중심에 맞는 경우
            dy = -dy;//공의 y축 속도를 반대로
        }
	}
	else if(y < 10){//공이 천장에 맞는 경우
		dy = -dy;//공의 y축 속도를 반대로
	}
    
    if(x < 10){//공이 왼쪽 벽에 맞는 경우
        dx = -dx;
    }
    else if(x > 590){//공이 오른쪽 벽에 맞는 경우
        dx = -dx;
    }
	y += dy;//공의 y좌표에 dy만큼 더함
    x += dx;//공의 x좌표에 dx만큼 더함
}

/* 바(bar) 그리는 함수 */
function drawPaddle(){//바 그리는 함수
	context.beginPath();//바 그리기 시작
	context.rect(barx-50,380,100,10);//바 그리기
	context.fillStyle = "black";//바 색깔
	context.fill();//바 색깔 채우기
}

/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
//영역 밖을 나갈시 최대 영역으로 바를 그림
function mousemove(event){//마우스 움직임에 따라 바를 다시 그리는 함수
	barx = event.clientX;//마우스의 x좌표를 barx에 저장
	if(barx > 550){//마우스의 x좌표가 550보다 클 경우
		barx = 550;//barx값을 550으로 설정
		context.clearRect(0,380,600,10);//canvas 초기화
		drawPaddle();//drawPaddle함수 실행
	}
	else if(barx < 50){//마우스의 x좌표가 50보다 작을 경우
		barx = 50;//barx값을 50으로 설정
		context.clearRect(0,380,600,10);//canvas 초기화
		drawPaddle();//drawPaddle함수 실행
	}
	else{//마우스의 x좌표가 50~550일 경우
		context.clearRect(0,380,600,10);//canvas 초기화
		drawPaddle();//drawPaddle함수 실행
	}
}

/* 글씨 기본 설정 해주는 함수 */
function drawText(text){//글씨 기본 설정 해주는 함수
    context.font = 'bold 70px arial';//글씨 크기, 글씨체 설정
    context.fillStyle = 'dodgerblue';//글씨 색깔 설정
    context.textAlign = "center";//글씨 정렬 설정
    context.textBaseline = "middle";//글씨 정렬 설정
    context.fillText(text, 300, 200);//글씨 그리기
}

/* 벽돌 그려주는 함수 */
function drawbrick(){//벽돌 그려주는 함수
    for(var i = 0; i<6; i++){//6*3의 벽돌 그리기
        for(var j = 0; j<3; j++){//6*3의 벽돌 그리기
            context.beginPath();//벽돌 그리기 시작
            context.rect(i*100+1,j*30+1,98,28);//벽돌 그리기
            context.fillStyle = "blue";//벽돌 색깔
            context.fill();// 벽돌 색깔 채우기
        }
    }
}