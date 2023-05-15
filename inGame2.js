export function startGame2() {
	var canvas = document.getElementById("screen2");
	var ctx = canvas.getContext("2d");

	var ballRadius = 10;
	var x = canvas.width / 2;
	var y = canvas.height - 30;
	var dx = 5;
	var dy = -5;
	var ballBlur=false;
	setInterval(function(){ballBlur=!ballBlur}, 3000);

	var paddleHeight = 10;
	var paddleWidth = 100;
	var paddleX = (canvas.width - paddleWidth) / 2;

	var brickRowCount = 10;
	var brickColumnCount = 3;
	var brickWidth = 75;//벽돌 가로
	var brickHeight = 100;//벽돌 세로
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;

	var bossx = canvas.width / 2 - 100;
	var bossy = 0;
	var bossWidth = 100;
	var bossHeight = 100;
	var bossHP = 100;

	var score = 0;
	var lives = 3;



	var bricks = [];
	for (var c = 0; c < brickColumnCount; c++) {
		bricks[c] = [];
		for (var r = 0; r < brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}


	document.addEventListener("mousemove", mouseMoveHandler, false);
	function mouseMoveHandler(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		if (relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth / 2;
		}
	}

	// var qPressed = false;
	var wPressed = false;
	// var ePressed = false;
	// document.addEventListener("keyQ", qHandler, false);
	document.addEventListener("keydown", wHandler, false);
	// document.addEventListener("keyE", eHandler, false);

	function wHandler(e) {
		if (e.keyCode == 87) {//w키 눌렀을 때
			wPressed = true;//wPressed가 true가 됨
			setTimeout(function () { wPressed = false }, 100);
		}
	}

	function drawRazer() {
		if (wPressed) {
			ctx.beginPath();
			ctx.rect(paddleX, 0, paddleWidth, canvas.height - paddleHeight);
			ctx.fillStyle = "yellow";
			ctx.fill();
			ctx.closePath();
			for (var c = 0; c < brickColumnCount; c++) {
				for (var r = 0; r < brickRowCount; r++) {
					var b = bricks[c][r];
					if (b.status == 1) {
						if (paddleX + paddleWidth >= b.x && paddleX < b.x + brickWidth) {
							//공이 벽돌 좌우 끝에 닿으면 반대로 튕김
							b.status = 0;//벽돌이 사라짐
							score++;//점수 증가
						}
					}
				}
			}
		}
	}


	function collisionDetection() {//충돌 감지
		for (var c = 0; c < brickColumnCount; c++) {
			for (var r = 0; r < brickRowCount; r++) {
				var b = bricks[c][r];
				if (b.status == 1) {
					if (x > b.x && x < b.x + brickWidth && y >= b.y && y <= b.y + brickHeight) {
						//공이 벽돌 좌우 끝에 닿으면 반대로 튕김
						if (x <= b.x + ballRadius || x >= b.x + brickWidth - ballRadius) {
							dx = -dx;
						} else {
							dy = -dy;
						}
						b.status = 0;//벽돌이 사라짐
						score++;//점수 증가
						if (score == brickRowCount * brickColumnCount) {
							// 다음 단계로
						}
					}
				}
			}
		}
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
		if(ballBlur)
			ctx.globalAlpha = 0.1;
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
		ctx.globalAlpha = 1;
	}
	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	function drawBoss() {
		ctx.beginPath();
		ctx.rect(bossx, bossy, bossWidth, bossHeight);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}


	function bossCollisionDetection() {
		if (x >= bossx && x <= bossx + bossWidth && y >= bossy && y <= bossy + bossHeight) {
			if (x <= bossx + ballRadius || x >= bossx + bossWidth - ballRadius)
				dx = -dx;
			else
				dy = -dy;
			bossHP--;
			if (bossHP == 0) {
				alert("You Win, Congratulations!");
			}
		}
	}



	function drawBricks() {
		for (var c = 0; c < brickColumnCount; c++) {
			for (var r = 0; r < brickRowCount; r++) {
				if (bricks[c][r].status == 1) {
					var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
					var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = "#0095DD";
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	function drawScore() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + score, 8, 20);
	}
	function drawLives() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBricks();
		drawBall();
		drawBoss();
		drawPaddle();
		drawScore();
		drawLives();
		drawRazer();
		collisionDetection();
		bossCollisionDetection();
		if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {//공이 좌우 벽에 닿으면 반대로 튕김
			dx = -dx;
		}
		if (y + dy < ballRadius) {//공이 상단 벽에 닿으면 반대로 튕김
			dy = -dy;
		}
		else if (y + dy > canvas.height - ballRadius) {//공이 하단 벽에 닿으면 게임 종료
			if (x > paddleX && x < paddleX + paddleWidth) {//공이 패들에 닿으면 반대로 튕김
				dy = -dy;
			}
			else {//공이 패들에 닿지 않으면 게임 종료
				lives--;
				if (!lives) {//목숨이 0이면 게임 종료
					// 재시작
					document.location.reload();
				}
				else {//목숨이 0이 아니면 공과 패들 위치 초기화
					x = canvas.width / 2;
					y = canvas.height - 30;
					dx = 5;
					dy = -5;
					paddleX = (canvas.width - paddleWidth) / 2;
				}
			}
		}

		x += dx;
		y += dy;
		requestAnimationFrame(draw);
	}

	draw();
}
