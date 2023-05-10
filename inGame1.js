var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;//공의 반지름
var x = canvas.width/2;//공의 x좌표
var y = canvas.height-30;//공의 y좌표
var dx = 2;//공의 x축 이동속도
var dy = -2;//공의 y축 이동속도

var paddleHeight = 10;//바의 높이
var paddleWidth = 75;//바의 너비
var paddleX = (canvas.width-paddleWidth)/2;//바의 x좌표

var brickRowCount = 5;//벽돌 행의 개수
var brickColumnCount = 3;//벽돌 열의 개수
var brickWidth = 75;//벽돌 너비
var brickHeight = 20;//벽돌 높이
var brickPadding = 10;//벽돌 사이의 간격
var brickOffsetTop = 30;//벽돌의 상단 여백
var brickOffsetLeft = 30;//벽돌의 좌측 여백

var score = 0;//점수
var lives = 3;//목숨

var bricks = [];//벽돌 배열
for(var c=0; c<brickColumnCount; c++) {//벽돌 배열 초기화
  bricks[c] = [];//벽돌 배열의 각 요소는 배열
  for(var r=0; r<brickRowCount; r++) {//각 요소의 배열은 행의 개수만큼의 요소를 가진다.
    bricks[c][r] = { x: 0, y: 0, status: 1 };//각 요소의 배열의 요소는 x,y좌표와 상태를 가진다.
  }
}


document.addEventListener("mousemove", mouseMoveHandler, false);//마우스 움직임 감지
function mouseMoveHandler(e) {//마우스 움직임 감지 함수
  var relativeX = e.clientX - canvas.offsetLeft;//마우스의 x좌표
  if(relativeX > 0 && relativeX < canvas.width) {//마우스가 캔버스 안에 있으면
    paddleX = relativeX - paddleWidth/2;//바의 x좌표를 마우스의 x좌표로 설정
  }
}

// var qPressed = false;
// var wPressed = false;
// var ePressed = false;
// document.addEventListener("keyQ", qHandler, false);
// document.addEventListener("keyW", wHandler, false);
// document.addEventListener("keyE", eHandler, false);

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {//벽돌 배열의 각 요소에 대해
    for(var r=0; r<brickRowCount; r++) {//각 요소의 배열에 대해
      var b = bricks[c][r];//b에 각 요소의 배열을 대입
      if(b.status == 1) {//b의 상태가 1이면
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {//공이 벽돌과 충돌하면
          dy = -dy;//공의 y축 이동속도를 반대로
          b.status = 0;//벽돌의 상태를 0으로
          score++;//점수 증가
          if(score == brickRowCount*brickColumnCount) {//점수가 벽돌의 개수와 같으면
            // 다음 단계로
            document.location.reload();//새로고침
          }
        }
      }
    }
  }
}

function drawBall() {//공 그리기
  ctx.beginPath();//그리기 시작
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);//원 그리기
  ctx.fillStyle = "#0095DD";//채우기 색상
  ctx.fill();//채우기
  ctx.closePath();//그리기 종료
}
function drawPaddle() {//바 그리기
  ctx.beginPath();//그리기 시작
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);//사각형 그리기
  ctx.fillStyle = "#0095DD";//채우기 색상
  ctx.fill();//채우기
  ctx.closePath();//그리기 종료
}
function drawBricks() {//벽돌 그리기
  for(var c=0; c<brickColumnCount; c++) {//벽돌 배열의 각 요소에 대해
    for(var r=0; r<brickRowCount; r++) {//각 요소의 배열에 대해
      if(bricks[c][r].status == 1) {//벽돌의 상태가 1이면
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;//벽돌의 x좌표
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;//벽돌의 y좌표
        bricks[c][r].x = brickX;//벽돌의 x좌표를 배열에 저장
        bricks[c][r].y = brickY;//벽돌의 y좌표를 배열에 저장
        ctx.beginPath();//그리기 시작
        ctx.rect(brickX, brickY, brickWidth, brickHeight);//사각형 그리기
        ctx.fillStyle = "#0095DD";//채우기 색상
        ctx.fill();//채우기
        ctx.closePath();//그리기 종료
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";//폰트
  ctx.fillStyle = "#0095DD";//색상
  ctx.fillText("Score: "+score, 8, 20);//텍스트
}
function drawLives() {//목숨 그리기
  ctx.font = "16px Arial";//폰트
  ctx.fillStyle = "#0095DD";//색상
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);//텍스트
}

function draw() {//그리기 함수
  ctx.clearRect(0, 0, canvas.width, canvas.height);//캔버스 지우기
  drawBricks();//벽돌 그리기
  drawBall();//공 그리기
  drawPaddle();//바 그리기
  drawScore();//점수 그리기
  drawLives();//목숨 그리기
  collisionDetection();//충돌 감지

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {//공이 캔버스의 좌우에 닿으면
    dx = -dx;//공의 x축 이동속도를 반대로
  }
  if(y + dy < ballRadius) {//공이 캔버스의 위에 닿으면
    dy = -dy;//공의 y축 이동속도를 반대로
  }
  else if(y + dy > canvas.height-ballRadius) {//공이 캔버스의 아래에 닿으면
    if(x > paddleX && x < paddleX + paddleWidth) {// 공이 바와 닿으면
      dy = -dy;//공의 y축 이동속도를 반대로
    }
    else {// 공이 바와 닿지 않으면
      lives--;
      if(!lives) {//목숨이 0이면
        // 재시작
        document.location.reload();//새로고침
      }
      else {//목숨이 0이 아니면
        x = canvas.width/2;//공의 x좌표
        y = canvas.height-30;//공의 y좌표
        dx = 3;//공의 x축 이동속도
        dy = -3;//공의 y축 이동속도
        paddleX = (canvas.width-paddleWidth)/2;//바의 x좌표
      }
    }
  }

  x += dx;//  공의 x좌표에 x축 이동속도를 더함
  y += dy;//  공의 y좌표에 y축 이동속도를 더함
  requestAnimationFrame(draw);//그리기 함수 반복
}

draw();//그리기 함수 호출