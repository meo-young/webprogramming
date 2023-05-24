export function stageStart1() {
	/* 플레이어 스킬 변수 */
	var qskill = 0;
	var qskill_timer = 30;
	var qskill_repeat;
	var qskill_cooltime = 0;

	/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
	var timer = 0;
	var time_repeat;

	var attack1 = 0;
	var bs_barrier = 0;

	var attack2 = 0;
	var yplus = 100;
	var attack_x;
	var attack2_repeat;
	var attack2_count = 0;


	/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
	var start_number = 0;

	/*canvas 너비, 높이 */
	var cvwd = 600;
	var cvht = 600;

	/* 벽돌의 x,y좌표 */
	var bricks = [0, 0, 0, 0, 0];
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
	var barx = cvwd / 2;
	var barwidth = 100;
	var barheight = 10;

	/* window 높이 ,너비 */
	var wdht;
	var wdwd;

	/* boss의 x,y좌표*/
	var bossx;
	var bossy;
	var bosswd = 80;
	var bossht = 80;

	/*플레이어, 보스 체력 */
	var p_hp = 0;
	var b_hp = 20;
	//플레이어 이미지

	var playerStandingsrc = "stage1/playerStanding_32x32.gif";

	pageLoad();
	windowsize();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();

	/* window size 변경 해주는 함수 */
	function windowsize() {
		var screen = document.getElementById("screen1");
		var button = document.getElementById("gamestart1");
		var bossui = document.getElementById("boss_UI1");
		var playerui = document.getElementById("player_UI1");
		wdht = (window.outerHeight - cvht) / 4;
		wdwd = (window.outerWidth - cvwd) / 2;
		//var buwd = ((window.outerWidth) / 2);
		screen.style.top = wdht + "px";
		screen.style.left = wdwd + "px";
		button.style.top = (wdht + cvht + 20) + "px";
		//button.style.left = buwd - 150 + "px";
		bossui.style.left = (wdwd - 200) + "px";
		bossui.style.top = wdht + "px";
		playerui.style.left = (wdwd + cvwd) + "px";
		playerui.style.top = (wdht) + "px";
	}

	function pageLoad() {
		var start_button = document.getElementById("gamestart1");
		start_button.onclick = wait;
	}

	/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/
	/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
	function wait() {
		$("#gamestart1").css({
			"display": "none"
		});
		repeat = setInterval(start, 1000);
	}

	function start() {
		context.clearRect(0, 0, cvwd, cvht);
		drawText(count);
		count--;
		if (count == -1) {
			clearInterval(repeat);
			count = 3;
			//repeat = setInterval(draw,10);
			draw();
			time_repeat = setInterval(timeAttack, 1000);
			addEventListener('mousemove', mousemove);
			addEventListener("keydown", keydown);
		}
	}

	/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/






	/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/
	/* 공의 x,y좌표 초기값을 설정 */
	function init() {
		screen = document.getElementById("screen1");
		context = screen.getContext("2d");
		x = barx;
		y = cvht - 20 - ballRadius;
		dx = 0;
		dy = 0;
	}

	function draw() {
		context.clearRect(0, 0, cvwd, cvht);
		/* 보스 공격 관련 조건문 */
		if (attack1 == 1) {
			bossAttack1();
		}
		else if (attack2 == 1) {
			bossAttack2();
		}
		/* drawPaddle 관련 위치 조건문 */
		if (barx > (cvwd - barwidth / 2)) {
			barx = cvwd - barwidth / 2;
		}
		else if (barx < barwidth / 2) {
			barx = barwidth / 2;
		}
		else {
		}

		/* 스페이스바 유무 관련 조건문 */
		if (start_number == 0) {
			x = barx;
		}

		/* 스킬 관련 조건문 */
		if (qskill == 1) {
			drawshield();
		}

		boss();
		drawBall();
		drawPaddle();
		collision();
	}

	/* 공 그리는 함수 */
	function drawBall() {
		context.beginPath();
		context.arc(x, y, ballRadius, 0, Math.PI * 2);
		context.fillStyle = "black";
		context.fill();
	}

	/* 바(bar) 그리는 함수 */
	function drawPaddle() {
		context.beginPath();
		context.rect((barx - barwidth / 2), cvht - 20, barwidth, barheight);
		context.fillStyle = "black";
		context.fill();
	}

	/* 글씨 기본 설정 해주는 함수 */
	function drawText(text) {
		context.font = 'bold 70px arial';
		context.fillStyle = 'dodgerblue';
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(text, cvwd / 2, cvht / 2);
	}

	/* 벽돌 그려주는 함수 */
	function drawbrick() {
		var brickx;
		var bricky;
		for (var i = 0; i < cvwd / 120; i++) {
			brickx = i * 120;
			for (var j = 1; j < 2; j++) {
				bricky = j * 220;
				if (bricks[i] == 1) {
					context.beginPath();
					context.rect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
					context.fillStyle = "blue";
					context.fill();
				}
			}
		}
	}


	function drawshield() {
		context.beginPath();
		context.arc(barx, cvht - 20, barwidth / 2, Math.PI, 0);
		context.strokeStyle = "yellow";
		context.stroke();
	}


	/* 보스를 그려주는 함수 */
	function boss() {
		bossx = (cvwd - bosswd) / 2;
		bossy = 10;
		context.beginPath();
		context.rect(bossx, bossy, bosswd, bossht);
		context.fillStyle = "red";
		context.fill();

	}

	function b_hp_decrease() {
		b_hp--;
		b_hp_decrease_Img();
		hp();
		var num = b_hp * 15;
		$("#container1").animate({
			"height": num + "px"
		});
		if (b_hp < 0 || b_hp == 0) {
			game_over(1);
		}

	}


	//보스 체력 감소시 플레이어 공격모션
function b_hp_decrease_Img(){
	var playerImg = $("#playerImg1");
	playerImg.attr("src","stage1/playerAttack1_32x32.gif");
	setTimeout(function(){
		playerImg.attr("src",playerStandingsrc);
	},1000);
}


	function p_hp_decrease() {
		var p_hp_array = $(".state1");
		p_hp_array[p_hp].src = "stage1/empty_hearted.png";
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
	var playImg = $("#playerImg1");
	var p_ImgBlankInterval = setInterval(function(){
		if(playImg.attr("src")===playerStandingsrc){
			playImg.attr("src","stage1/playerStanding_red_32x32.gif");}
		else{
			playImg.attr("src",playerStandingsrc);
		}
	}, 100);
	setTimeout(function(){
		clearInterval(p_ImgBlankInterval);
		playImg.attr("src",playerStandingsrc);

	}, 500);
}


	function game_over(who) {
		removeEventListener('keydown', keydown);
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		clearInterval(attack2_repeat);
		clearInterval(time_repeat);
		context.clearRect(0, 0, cvwd, cvht);
		if (who == 1) {
			drawText("You Win");
		}
		else if (who == 2) {
			drawText("You Lose");
		}
	}
	/* 플레이어, 보스 체력 출력해주는 함수 */
	function hp() {
		$("#bp_num1").text(b_hp);
	}


	function game_over_Img(){
	var playerImg = $("#playerImg1");
	playerImg.attr("src","stage1/playerLose_32x32.gif");
}
/* 플레이어, 보스 체력 출력해주는 함수 */
function hp(){
	$("#bp_num1").text(b_hp);
}
	/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/





	/* 충돌 감지 */
	function collision() {
		var brickx;
		var bricky;
		var dxf = dx;
		if (dxf < 0) {
			dxf = -dxf;
		}

		for (var i = 0; i < cvwd / 120; i++) {
			brickx = i * 120;
			for (var j = 1; j < 2; j++) {
				bricky = j * 220;
				if (bricks[i] == 1) {
					if (y > bricky + BRICKHEIGHT && y < bricky + BRICKHEIGHT + ballRadius && brickx + BRICKWIDTH > x && brickx < x) { //벽돌의 아래 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
					}
					if (x > brickx - ballRadius - dxf && x < brickx && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { //벽돌의 왼쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
					}
					if (x < brickx + BRICKWIDTH + ballRadius + dxf && x > brickx + BRICKWIDTH && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { // 벽돌의 오른쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
					}
					if (brickx + BRICKWIDTH > x && brickx < x && y > bricky - ballRadius && y < bricky) { // 벽돌의 윗 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
					}
				}
			}
		}
		if ((x < bossx & x > bossx - ballRadius - dxf & y < bossy + bossht + ballRadius & y > bossy - ballRadius) || (x < bossx + bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht + ballRadius & y > bossy - ballRadius)) { //보스의 왼쪽, 오른쪽에 충돌
			dx = -dx;
			if (bs_barrier == 1) {
				bs_barrier = 0;
				attack1 = 0;
			}
			else {
				b_hp_decrease();
			}
		}
		else if ((y > bossy + bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius) || (y < bossy & y > bossy - ballRadius - yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius)) { //보스의 위, 아래에 충돌
			dy = -dy;
			if (bs_barrier == 1) {
				bs_barrier = 0;
				attack1 = 0;
			}
			else {
				b_hp_decrease();
			}
		}

		if ((y > (cvht - 20 - ballRadius - yvelocity))) {
			if (x > barx + (barwidth / 2 + ballRadius) || x < barx - (barwidth / 2 + ballRadius)) { //바의 영역에서 벗어난 경우
				if (y > (cvht - 20 - yvelocity)) {
					clearInterval(repeat);
					//removeEventListener('mousemove', mousemove);
					ballRadius = 10;
					init();
					draw();
					p_hp_decrease();
					start_number = 0;
					addEventListener("keydown", keydown);
					//drawText("Game Over");
				}
			} else if (x > barx - (barwidth / 2 + ballRadius) && x < barx + (barwidth / 2 + ballRadius)) { //바의 영역에 있는 경우	
				dx = xvelocity * (x - barx) / (barwidth + ballRadius / 2);
				dy = -dy;
			} else { //바의 영역의 마지노선에 맞닿는 경우
				dy = -dy;
				dx = -dx;
			}
		}
		else if (y < ballRadius) { //위쪽 벽면에 부딪히는 경우
			dy = -dy;
		}

		if (x < ballRadius) { // 왼쪽 벽면에 부딪히는 경우
			dx = -dx;
		}
		else if (x > cvwd - ballRadius) { // 오른쪽 벽면에 부딪히는 경우
			dx = -dx;
		}
		y += dy;
		x += dx;

	}







	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

	/* 스페이스바를 누를 경우 공 발사
	스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
	function keydown(event) {
		if (start_number == 0) {
			//스페이스바를 누를경우
			if (event.keyCode == 32) {
				repeat = setInterval(draw, 1);
				start_number = 1;
				dy = yvelocity;
			}
		}
		else if (start_number == 1) {
			//q를 누를경우
			if (qskill_cooltime == 0 && qskill == 0 && event.keyCode == 81) { //쿨타임이 아니고, 보호막이 활성화되지 않을 때 사용 가능
				qskill = 1; //이 변수가 1일 때 보호막 활성화
				$("#qskill1").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
					"display": "none"
				});
				$("#qtimer1").css({
					"display": "block"
				});
				$("#qtimer1").text(qskill_timer); //쿨타임 글씨 활성화
				qskill_repeat = setInterval(skill_timer1, 1000);
				qskill_cooltime = 1;
			}
		}
	}

	function skill_timer1() {
		qskill_timer--;
		if (qskill_timer == 28) {
			qskill = 0;
		}
		else if (qskill_timer == -1) {
			qskill_timer = 30;
			clearInterval(qskill_repeat);
			$("#qskill1").css({
				"display": "block"
			});
			$("#qtimer1").css({
				"display": "none"
			});
			qskill_cooltime = 0;
		}
		$("#qtimer1").text(qskill_timer);
	}


	/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
	//영역 밖을 나갈시 최대 영역으로 바를 그림
	function mousemove(event) {
		barx = event.clientX - wdwd;
		draw();
	}

	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

	function timeAttack() {
		timer += 1;

		if (timer % 8 == 0) {
			var randnum = Math.floor(Math.random() * 4);
			if (randnum == 0) { //첫번째 보스 패턴 ( 보스 배리어 )
				attack1 = 1;
				bs_barrier = 1;
			}
			else if (randnum == 1) { //두번째 보스 패턴 ( 1개의 검이 바닥으로 떨어짐 )
				attack_x = Math.floor(Math.random() * 500); // 0 ~ 500 사이의 난수 생성하여 canvas의 x좌표가 50 ~ 550 사이에서 검이 떨어지도록
				attack2 = 1;
				attack2_repeat = setInterval(bossAttack2_timer, 1);
			}
			else if (randnum == 2) { // 세번째 보스 패턴 ( 패들 길이 -50 )
				barwidth = 50;
				setTimeout(bossAttack3, 3000);
			}
			else if (randnum == 3) { // 네번째 보스 패턴 ( 공 반지름 -5 )
				ballRadius = 5;
				setTimeout(bossAttack4, 3000);
			}

		}
		$("#timer1").text(timer);
	}


	/* 보스 보호막 패턴
	보스를 둘러싼 파란색 원이 생김 */
	function bossAttack1() {
		context.beginPath();
		context.arc(bossx + bosswd / 2, bossy + bossht / 2, bosswd / 2 + 10, 0, Math.PI * 2);
		context.strokeStyle = "blue"
		context.stroke();
	}

	/* 보스 밑으로 1개의 검이 떨어지면서
	검이 패들의 영역에 있다면 플레이어 데미지 */
	function bossAttack2() {
		context.beginPath();
		context.rect(attack_x + barwidth / 2 - 15, yplus, 30, 100); // 가로 30 세로 100의 검 생성
		context.fillStyle = "yellow";
		context.fill();
	}

	/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
	function bossAttack2_timer() {
		yplus = yplus + 2; // Y좌표는 2칸씩 이동
		if (attack2_count == 0 && yplus + 100 > cvht - 20 && attack_x + 30 > barx - barwidth / 2 && attack_x < barx + barwidth / 2) {
			if (qskill == 1) { //플레이어 보호막이 활성되어 있다면 보호막이 깨짐
				qskill = 0;
			}
			else {
				p_hp_decrease(); // 플레이어 보호막이 없다면 체력 1칸 감소
			}
			attack2_count = 1; //이 변수가 1인 동안은 검이 계속 떨어짐
		}
		if (yplus == cvht) { //검이 영역 밖으로 나갔을 경우 함수 종료
			attack2 = 0;
			yplus = 100;
			clearInterval(attack2_repeat);
			attack2_count = 0;
		}
	}

	/* 호출시 원래 패들 길이로 복구 */
	function bossAttack3() {
		barwidth = 100;
	}

	/* 호출시 원래 공 반지름 길이로 복구 */
	function bossAttack4() {
		ballRadius = 10;
	}


	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
}