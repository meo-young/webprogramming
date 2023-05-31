export function stageStart2(mainGold, effectOn, potion1Num, potion2Num, potion3Num) {
	/* 플레이어 스킬 변수 */
	var qskill = 0;
	var qskill_timer = 30;
	var qskill_repeat;
	var qskill_cooltime = 0;
	var shield_img = 1;
	var shield_img_count = 0;
	var shield_repeat;

	var wskill = 0;
	var wskill_timer = 10;
	var wskill_repeat;
	var wskill_repeat2;
	var wskill_cooltime = 0;
	var yplus = 480;
	var wskill_count = 0;
	var attack_x;
	var wskill_img_count = 0;
	var wskill_img = 1;

	/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
	var timer = 0;
	var time_repeat;

	var attack1 = 0; //1이면 보스패턴 1이 시작된 상태
	var attack1_img = 1;
	var attack1_img_count = 0;

	var attack2 = 0;
	var attack2_timer = 0;
	var attack2_repeat;
	var attack_position;
	var attack2_count = 0;
	var attack2_img = 1;
	var attack2_img_count = 0;

	var attack4 = 0;
	var attack4_brick;
	var attack4_brick_x = 150;
	var attack4_brick_y = 110;
	var attack4_repeat;
	var fly_count = 1;
	var fly_repeat;

	/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
	var start_number = 0;
	var keydown_count = 0;
	var esc_count = 0;
	var stop_pattern;
	var qstop_pattern;
	var wstop_pattern;
	var gold = mainGold;
	var drawinterval;
	var damage_state = 0;
	var damage;
	var damage_count = 0;
	var damagex;
	var damagey;

	var attack_stat;
	var firedot = 0;
	var dot_count = 0;
	var white = 0;
	var yellow = 0;
	var purple = 0;
	var poison_damage = 0;
	var poison_count = 0;
	var ps_count = 0;

	var player_img = 1;
	var player_img_count = 0;

	/*canvas 너비, 높이 */
	var cvwd = 1000;
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
	var barwidth = 80;
	var barheight = 80;
	var bar_state = 0;

	/* window 높이 ,너비 */
	var wdht;
	var wdwd;

	/* boss의 x,y좌표*/
	var bossx;
	var bossy;
	var bosswd = 160;
	var bossht = 90;
	var bs_img_count = 0;
	var bs_img = 1;

	/*플레이어, 보스 체력 */
	var p_hp = 0;
	var b_hp = 1422;

	//플레이어 이미지
	var pDefaultStdsrc = "./img/player/playerStanding_32x32.gif";
	var pRedStdsrc = "./img/player/playerStanding_red_32x32.gif";
	var pCyanstdsrc = "./img/player/playerStanding_cyan_32x32.gif";
	var pWhitestdsrc = "./img/player/playerStanding_white_32x32.gif";
	var pYellowstdsrc = "./img/player/playerStanding_yellow_32x32.gif";
	var pPurplestdsrc = "./img/player/playerStanding_purple_32x32.gif";

	var pDefaultAttacksrc = "./img/player/playerAttack1_32x32.gif";
	var pRedAttacksrc = "./img/player/playerAttack1_red_32x32.gif";
	var pCyanAttacksrc = "./img/player/playerAttack1_cyan_32x32.gif";
	var pWhiteAttacksrc = "./img/player/playerAttack1_white_32x32.gif";
	var pYellowAttacksrc = "./img/player/playerAttack1_yellow_32x32.gif";
	var pPurpleAttacksrc = "./img/player/playerAttack1_purple_32x32.gif";

	var pDefaultHitsrc = "./img/player/playerHit_default.png";
	var pRedHItsrc = "./img/player/playerHit_red.png";
	var pCyanHitsrc = "./img/player/playerHit_cyan.png";
	var pWhiteHitsrc = "./img/player/playerHit_white.png";
	var pYellowHitsrc = "./img/player/playerHit_yellow.png";
	var pPurpleHitsrc = "./img/player/playerHit_purple.png";


	var player = new Image();
	var player_num;
	var playerColor = "";
	var ball = new Image();

	// 착용중인 캐릭터 이미지로 변경
	if ($("#pDefault").hasClass("equip")) {
		$("#playerImg2").attr("src", pDefaultStdsrc);
		playerColor = "default";
		attack_stat = 50;
		player_num = 1;
	}
	else if ($("#pRed").hasClass("equip")) {
		$("#playerImg2").attr("src", pRedStdsrc);
		playerColor = "red";
		firedot = 1;
		ball.src = "./img/player/br.png";
		attack_stat = 50;
		player_num = 2;
	}
	else if ($("#pCyan").hasClass("equip")) {
		$("#playerImg2").attr("src", pCyanstdsrc);
		playerColor = "cyan";
		attack_stat = 50;
		ball.src = "./img/player/bc.png";
		ballRadius = 20;
		player_num = 3;
	}
	else if ($("#pWhite").hasClass("equip")) {
		$("#playerImg2").attr("src", pWhitestdsrc);
		playerColor = "white";
		attack_stat = 100;
		ball.src = "./img/player/bw.png";
		white = 1;
		player_num = 4;
	}
	else if ($("#pYellow").hasClass("equip")) {
		$("#playerImg2").attr("src", pYellowstdsrc);
		playerColor = "yellow";
		yellow = 1;
		ball.src = "./img/player/by.png";
		attack_stat = 50;
		player_num = 5;
	}
	else if ($("#pPurple").hasClass("equip")) {
		$("#playerImg2").attr("src", pPurplestdsrc);
		playerColor = "purple";
		purple = 1;
		ball.src = "./img/player/bp.png";
		attack_stat = 50;
		player_num = 6;
	}




	var wskill_Img = new Image();
	wskill_Img.src = "./img/stage2/blast1.png";
	var bossImg = new Image(); // in canvas
	bossImg.src = "./img/stage2/b1.png";
	var barice_Img = new Image();
	barice_Img.src = "./img/stage2/boss2freezing1.png";
	var bossshield_Img = new Image();
	bossshield_Img.src = "./img/stage2/s1.png";
	var littlebrick_Img = new Image();
	littlebrick_Img.src = "./img/stage2/부적.png";
	var fishfly = new Image();
	fishfly.src = "./img/stage2/pf1.png";
	var bottom_attack_Img = new Image();
	bottom_attack_Img.src = "./img/stage2/a1.png";
	var warnImg = new Image();
	warnImg.src = "./img/stage2/warning.png"
	var paddleImg = new Image();
	paddleImg.src = "./img/player/paddle.png";
	var player_sh = new Image();
	player_sh.src = "./img/player/s1.png";

	//오디오 파일
	const brickAudio = new Audio('./오디오/boss/bosshit3.mp3');
	const swingAudio = new Audio('./오디오/player/칼휘두르는소리.mp3');
	const bossAudio = new Audio('./오디오/boss/bosshit.mp3');
	const bossAudio2 = new Audio('./오디오/boss/bosshit2.mp3');
	const bossAudio3 = new Audio('./오디오/boss/bosshit3.mp3');
	const playerhitAudio = new Audio('./오디오/player/플레이어 피격 (1).wav');
	const bossskillAudio = new Audio('./오디오/stage2/splash water.wav');
	const countdownAudio = new Audio('./오디오/Interface/카운트다운.mp3');
	const bossdieAudio2 = new Audio('./오디오/stage2/보스사망.wav');
	const bossdieAudio = new Audio('./오디오/stage2/보스피격.mp3');
	const qskillonAudio = new Audio('./오디오/player/q스킬쉴드장착.mp3');
	const wskillonAudio = new Audio('./오디오/player/w스킬.mp3');
	const winAudio = new Audio('./audio/win_7s.mp3');
	const loseAudio = new Audio('./audio/lose_7s.mp3');
	const fishAudio = new Audio('./오디오/stage2/물고기 나올때.mp3');
	var keyboardAudio = new Audio("./storyimg/키보드소리.mp3");





	windowsize();
	wait();
	pageLoad();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();

	function pageLoad() {
		if (effectOn)
			setTimeout(() => {
				countdownAudio.play();
			}, 1000);

		var play_button = document.getElementById("play2");
		play_button.onclick = play;
		var exit_button = document.getElementById("exit2");
		exit_button.onclick = exit;
		$("#canvas_screen2").css({
			"background": "url(./backimg/back4.gif)"
		});
	}

	function play() {
		$("#boss_UI2").css({
			display: "block"
		});
		$("#player_UI2").css({
			display: "block"
		});
		$("#screen2").css({
			display: "block"
		});
		$("#esc_menu2").css({
			display: "none"
		});
		esc_count = 0;
		keydown_count = 0;
		addEventListener('mousemove', mousemove);
		repeat = setInterval(draw, 1);
		time_repeat = setInterval(timeAttack, 1000);
		if (stop_pattern == 2) {
			attack2_repeat = setInterval(bossAttack2_timer, 1);
		}
		if (qstop_pattern == 1) {
			qskill_repeat = setInterval(skill_timer1, 1000);
			qstop_pattern = 0;
		}
		stop_pattern = 0;
	}
	/* window size 변경 해주는 함수 */
	function windowsize() {
		var screen = document.getElementById("screen2");
		var bossui = document.getElementById("boss_UI2");
		var playerui = document.getElementById("player_UI2");
		wdht = (window.outerHeight - cvht) / 4;
		wdwd = (window.innerWidth - cvwd) / 2;
		screen.style.top = wdht + "px";
		screen.style.left = wdwd + "px";
		bossui.style.left = (wdwd - 200) + "px";
		bossui.style.top = wdht + "px";
		playerui.style.left = (wdwd + cvwd) + "px";
		playerui.style.top = (wdht) + "px";
	}

	function exit() {
		// if (effectOn) {
		// 	clickSound.play();   // 버튼 클릭 효과음
		// }
		$("#boss_UI2").css({
			display: "block"
		});
		$("#player_UI2").css({
			display: "block"
		});
		$("#screen2").css({
			display: "block"
		});
		$("#esc_menu2").css({
			display: "none"
		});
		esc_count = 0;
		keydown_count = 0;
		removeEventListener('keydown', keydown);
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		if (attack2 == 1) {
			attack2_timer = 0;
			attack2 = 0;
			attack2_count = 0;
			attack2_img = 1;
			attack2_img_count = 0;
			bottom_attack_Img.src = "./img/stage2/a" + attack2_img + ".png";
		}
		else if (attack4 == 1) {
			attack4 = 0;
		}
		bar_state = 0;
		if (qskill_cooltime == 1) {
			clearInterval(qskill_repeat);
			qskill_cooltime = 0;
			qskill = 0;
			qskill_timer = 30;
			$("#qskill2").css({
				"display": "block"
			});
			$("#qtimer2").css({
				"display": "none"
			});
		}

		if (wskill_cooltime == 1) {
			clearInterval(wskill_repeat);
			clearInterval(wskill_repeat2);
			wskill_cooltime = 0;
			wskill = 0;
			wskill_count = 0;
			wskill_timer = 10;
			wskill_Img.src = "./img/stage2/blast1.png";
			wskill_img_count = 0;
			wskill_img = 1;
			$("#wskill2").css({
				"display": "block"
			});
			$("#wtimer2").css({
				"display": "none"
			});
		}
		clearInterval(time_repeat);
		init();
		p_hp = 0;
		b_hp = 1422;
		$("#container2").animate({
			"width": b_hp / 3 * 2 + "px"
		});
		var p_hp_array = $(".state2");
		for (var i = 0; i < 5; i++) {
			p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
		}

		$("#stage2").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
		setTimeout(function () {
			$("#stage2").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
			$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
			setTimeout(function () {
				$("#select-stage").removeClass("animateContent2");
			}, 1000);
		}, 500);
		$(".gold").html(gold);//골드 추가 부분
	}

	/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/
	/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
	function wait() {
		repeat = setInterval(start, 1000);
	}

	function start() {
		context.clearRect(0, 0, cvwd, cvht);
		drawText(count);
		count--;
		if (count == -1) {
			clearInterval(repeat);
			count = 3;
			repeat = setInterval(draw, 1);
			drawinterval = 1;
			time_repeat = setInterval(timeAttack, 1000);
			addEventListener('mousemove', mousemove);
			addEventListener("keydown", keydown);
		}
	}

	/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/






	/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/
	/* 공의 x,y좌표 초기값을 설정 */
	function init() {
		screen = document.getElementById("screen2");
		context = screen.getContext("2d");
		x = barx;
		y = cvht - 80 - ballRadius;
		dx = 0;
		dy = 0;
	}

	function draw() {
		context.clearRect(0, 0, cvwd, cvht);
		$("#gold2").text("gold : " + gold);
		$("#red2").text(potion1Num);
		$("#blue2").text(potion2Num);
		$("#green2").text(potion3Num);

		/* drawPaddle 관련 위치 조건문 */
		if (barx > (cvwd - barwidth / 2)) {
			barx = cvwd - barwidth / 2;
		}
		else if (barx < barwidth / 2) {
			barx = barwidth / 2;
		}

		/* 스페이스바 유무 관련 조건문 */
		if (start_number == 0) {
			x = barx;
		}

		/* 스킬 관련 조건문 */


		boss();
		drawBall();
		drawPaddle();
		collision();

		if (qskill == 1) {
			drawshield();
		}
		if (wskill == 1) {
			drawsword();
		}

		/* 보스 공격 관련 조건문 */
		if (attack1 == 1) {
			bossAttack1();
			if (effectOn)
				bossskillAudio.play();
		}
		if (attack2 == 1) {
			bossAttack2();
		}
		if (attack4 == 1) {
			bossAttack4();
		}
		if (damage_state >= 1) {
			if (damage_state == 1) {
				if (damage_count != 0) {
					damage_count = 0;
				}
				damagex = bossx + bosswd;
				damagey = bossy + bossht;
				damagex -= Math.floor(Math.random() * bosswd);
				damagey -= Math.floor(Math.random() * bossht);
				damage_state = 2;
			}
			else {
				damage_count++;
				if (damage_count % 80 == 0) {
					damage_state = 0;
					damage_count = 0;
					dot_count = 0;
				}
			}
			if (dot_count == 1) {
				drawDamage(30, bossx + 30, bossy + 30);
			}
			drawDamage(damage, damagex, damagey);
		}
		if (poison_count == 1) {
			ps_count++;
			if (ps_count % 200 >= 0 && ps_count % 200 <= 100) {
				poison();
			}
			if (ps_count % 200 == 0) {
				b_hp -= poison_damage;
				hp();
				$("#container1").animate({
					"width": b_hp / 3 * 2 + "px"
				});
				if (b_hp < 0 || b_hp == 0) {
					game_over(1);
				}
				else {
					b_hp_decrease_Img();
				}
			}
		}
	}

	/* 공 그리는 함수 */
	function drawBall() {
		if (player_num == 1) {
			context.beginPath();
			context.arc(x, y, ballRadius, 0, Math.PI * 2);
			context.fillStyle = "white";
			context.fill();
		}
		else {
			context.drawImage(ball, x, y, ballRadius + 10, ballRadius + 10);
		}
	}

	/* 바(bar) 그리는 함수 */
	function drawPaddle() {
		player_img_count++;
		if (player_img_count % 20 == 0) {
			player_img++;
			if (player_img == 5) {
				player_img = 1;
			}
			if (player_num == 1) {
				player.src = "./img/player/pd" + player_img + ".gif";
			}
			else if (player_num == 2) {
				player.src = "./img/player/pr" + player_img + ".gif";
			}
			else if (player_num == 3) {
				player.src = "./img/player/pc" + player_img + ".gif";
			}
			else if (player_num == 4) {
				player.src = "./img/player/pw" + player_img + ".gif";
			}
			else if (player_num == 5) {
				player.src = "./img/player/py" + player_img + ".gif";
			}
			else if (player_num == 6) {
				player.src = "./img/player/pp" + player_img + ".gif";
			}
		}
		context.drawImage(player, (barx - 40), cvht - 80, 80, 80);
	}

	/* 글씨 기본 설정 해주는 함수 */
	function drawText(text) {
		context.font = 'bold 70px arial';
		context.fillStyle = 'dodgerblue';
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(text, cvwd / 2, cvht / 2);
	}

	function drawDamage(dm, x, y) {
		var text = "-" + dm;
		context.font = "30px Chakra-Petch";
		context.fillStyle = 'red';
		context.fillText(text, x, y);
	}
	function poison() {
		var text2 = "-" + poison_damage;
		context.font = "bold 30px Chakra-Petch";
		context.fillStyle = 'purple';
		context.fillText(text2, bossx + 30, bossy + 30);
	}

	function drawshield() {
		shield_img_count++;
		if(shield_img_count % 30 == 0){
			shield_img++;
			if(shield_img == 14){
				shield_img = 8;
			}
			player_sh.src ="./img/player/s"+shield_img+".png";
		}
		context.drawImage(player_sh,(barx-60),cvht-100,120,120);
	}

	function attacked_shield(){
		shield_img_count++;
		if(shield_img_count % 30 == 0){
			shield_img--;
			if(shield_img == 0){
				shield_img = 1;
				shield_img_count = 0;
				clearInterval(shield_repeat);
			}
			player_sh.src ="./img/player/s"+shield_img+".png";
		}
		context.drawImage(player_sh,(barx-60),cvht-100,120,120);
	}


	/*w키를 누르면 검격이 나가게 보여주는 함수 */
	function drawsword() {
		context.drawImage(wskill_Img, attack_x - 15, yplus, 30, 100); // 가로 30 세로 100의 검 생성

	}

	/* 보스를 그려주는 함수 */
	function boss() {
		bossx = (cvwd - bosswd) / 2;
		bossy = 0;
		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);
	}

	//보스 체력 감소 해주는 함수
	function b_hp_decrease(att) {
		if (attack4 == 1) {
			return;
		} else {
			if (effectOn) {
				let randtemp = Math.floor(Math.random() * 4)
				if (randtemp == 0)
					bossAudio.play();
				else if (randtemp == 1)
					bossAudio2.play();
				else if (randtemp == 2)
					bossAudio3.play();
				else if (randtemp == 3)
					bossdieAudio.play();
				if (b_hp == 1)
					bossdieAudio2.play();
			}
			damage = att - Math.floor(Math.random() * 20);
			b_hp -= damage;
			damage_state = 1;
			hp();
			$("#container2").animate({
				"width": b_hp / 3 * 2 + "px"
			});
			if (firedot == 1) {
				setTimeout(function () {
					b_hp -= 30;
					dot_count = 1;
					if (effectOn) {
						let randtemp = Math.floor(Math.random() * 4)
						if (randtemp == 0)
							bossAudio.play();
						else if (randtemp == 1)
							bossAudio2.play();
						else if (randtemp == 2)
							bossAudio3.play();
						else
							bossdieAudio.play();
						if (b_hp == 1)
							bossdieAudio2.play();
					}
				}, 300);
			}
			if (purple == 1) {
				poison_damage++;
				poison_count = 1;
			}
			if (b_hp < 0 || b_hp == 0) {
				game_over(1);
				game_over_win_Img();
			}
			else {
				b_hp_decrease_Img();
			}
		}
	}





	//보스 체력 감소시 플레이어 공격모션
	function b_hp_decrease_Img() {
		var playerImg = $("#playerImg2");
		if (playerColor == "default") {
			playerImg.attr("src", pDefaultAttacksrc);
		}
		else if (playerColor == "red") {
			playerImg.attr("src", pRedAttacksrc);
		}
		else if (playerColor == "cyan") {
			playerImg.attr("src", pCyanAttacksrc);
		}
		else if (playerColor == "purple") {
			playerImg.attr("src", pPurpleAttacksrc);
		}
		else if (playerColor == "yellow") {
			playerImg.attr("src", pYellowAttacksrc);
		}
		else if (playerColor == "white") {
			playerImg.attr("src", pWhiteAttacksrc);
		}

		var boomImg = $("#boomImg2");
		boomImg.attr("src", "./img/stage2/b1.gif");
		setTimeout(function () {
			if (playerColor == "default") {
				playerImg.attr("src", pDefaultStdsrc);
			}
			else if (playerColor == "red") {
				playerImg.attr("src", pRedStdsrc);
			}
			else if (playerColor == "cyan") {
				playerImg.attr("src", pCyanstdsrc);
			}
			else if (playerColor == "purple") {
				playerImg.attr("src", pPurplestdsrc);
			}
			else if (playerColor == "yellow") {
				playerImg.attr("src", pYellowstdsrc);
			}
			else if (playerColor == "white") {
				playerImg.attr("src", pWhitestdsrc);
			}
			boomImg.attr("src", "");
		}, 1000);

	}


	//보스 체력 회복 해주는 함수
	function b_hp_increase() {
		if (b_hp == 1422) {
			return;
		}
		else {
			b_hp++;
			hp();
			$("#container2").animate({
				"width": b_hp / 3 * 2 + "px"
			});
		}
	}



	function p_hp_decrease() {
		if (qskill == 1) {
			qskill = 0;
			shield_img =8;
			shield_img_count =0;
			shield_repeat = setInterval(attacked_shield, 1);
		}
		else {
			var p_hp_array = $(".state2");
			p_hp_array[p_hp].src = "./img/player/playerHeartEmpty_25x25.png";
			p_hp++;
		}
		if (p_hp <= 4) {
			p_hp_decrease_Img();
			if (effectOn)
				playerhitAudio.play();
		}
		if (p_hp == 5) {
			game_over_Img();
			game_over(2);
			removeEventListener('keydown', keydown);
			removeEventListener('mousemove', mousemove);
			clearInterval(repeat);
			setTimeout(function () {
				$("#boss_UI2").css({
					display: "block"
				});
				$("#player_UI2").css({
					display: "block"
				});
				$("#screen2").css({
					display: "block"
				});
				$("#esc_menu2").css({
					display: "none"
				});
				esc_count = 0;
				keydown_count = 0;
				if (attack1 == 1) {
					attack1 = 0;
				}
				else if (attack2 == 1) {
					attack2_timer = 0;
					attack2 = 0;
					attack2_count = 0;
					attack2_img = 1;
					attack2_img_count = 0;
					bottom_attack_Img.src = "./img/stage2/a" + attack2_img + ".png";
				}
				else if (attack4 == 1) {
					attack4 = 0;
				}
				bar_state = 0;
				if (qskill_cooltime == 1) {
					clearInterval(qskill_repeat);
					qskill_cooltime = 0;
					qskill = 0;
					qskill_timer = 30;
					$("#qskill2").css({
						"display": "block"
					});
					$("#qtimer2").css({
						"display": "none"
					});
				}

				if (wskill_cooltime == 1) {
					clearInterval(wskill_repeat);
					clearInterval(wskill_repeat2);
					wskill_cooltime = 0;
					wskill = 0;
					wskill_count = 0;
					wskill_timer = 10;
					wskill_Img.src = "./img/stage2/blast1.png";
					wskill_img_count = 0;
					wskill_img = 1;
					$("#wskill2").css({
						"display": "block"
					});
					$("#wtimer2").css({
						"display": "none"
					});
				}
				clearInterval(time_repeat);
				init();
				p_hp = 0;
				b_hp = 1422;
				$("#container2").animate({
					"width": b_hp / 3 * 2 + "px"
				});
				var p_hp_array = $(".state2");
				for (var i = 0; i < 5; i++) {
					p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
				}

				$("#stage2").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
				setTimeout(function () {
					$("#stage2").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
					$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
					setTimeout(function () {
						$("#select-stage").removeClass("animateContent2");
					}, 1000);
				}, 500);
				$(".screen").css({
					"background": "url(./backimg/back1.gif)"
				});
			}, 4000);
		}
		if (white == 1) {
			p_hp_array[p_hp].src = "./img/player/playerHeartEmpty_25x25.png";
			p_hp++;
		}
		if (p_hp <= 4) {
			p_hp_decrease_Img();
			if (effectOn)
				playerhitAudio.play();

		}
		if (p_hp == 5) {
			if (effectOn)
				playerhitAudio.play();

			game_over_Img();
			game_over(2);
			removeEventListener('keydown', keydown);
			removeEventListener('mousemove', mousemove);
			setTimeout(function () {
				$("#boss_UI1").css({
					display: "block"
				});
				$("#player_UI1").css({
					display: "block"
				});
				$("#screen1").css({
					display: "block"
				});
				$("#esc_menu1").css({
					display: "none"
				});
				esc_count = 0;
				keydown_count = 0;
				clearInterval(repeat);
				if (attack1 == 1) {
					clearInterval(attack1_repeat);
					attack1 = 0;
					attack1_img_count = 0;
					attack1_img = 1;
				}
				else if (attack2 == 1) {
					attack2 = 0;
					yplus = 100;
					attack2_img = 1;
					attack2_img_count = 0;
					clearInterval(attack2_repeat);
					attack2_count = 0;
				}
				else if (attack3 == 1) {
					attack3_img = 1;
					attack3_img_count = 0;
					attack3 = 0;
					attack3_count = 0;
					fireball.src = "./img/stage1/af" + attack3_img + ".png";
				}
				ballRadius = 10;
				barwidth = 100;
				if (qskill_cooltime == 1) {
					clearInterval(qskill_repeat);
					qskill_cooltime = 0;
					qskill = 0;
					qskill_timer = 30;
					$("#qskill1").css({
						"display": "block"
					});
					$("#qtimer1").css({
						"display": "none"
					});
				}
				clearInterval(time_repeat);
				init();
				p_hp = 0;
				b_hp = 1422;
				$("#container1").animate({
					"width": b_hp / 3 * 2 + "px"
				});
				var p_hp_array = $(".state1");
				for (var i = 0; i < 5; i++) {
					p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
				}

				$("#stage1").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
				setTimeout(function () {
					$("#stage1").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
					$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
					setTimeout(function () {
						$("#select-stage").removeClass("animateContent2");
					}, 1000);
				}, 500);
			}, 4000);
		}
	}
	function p_hp_decrease_Img() {
		var playerImg = $("#playerImg2");
		var p_ImgBlankInterval = setInterval(function () {
			if (playerColor == "default") {
				if (playerImg.attr("src") === pDefaultStdsrc) {
					playerImg.attr("src", pDefaultHitsrc);
				}
				else {
					playerImg.attr("src", pDefaultStdsrc);
				}
			}
			else if (playerColor == "red") {
				if (playerImg.attr("src") === pRedStdsrc) {
					playerImg.attr("src", pRedHItsrc);
				}
				else {
					playerImg.attr("src", pRedStdsrc);
				}
			}
			else if (playerColor == "cyan") {
				if (playerImg.attr("src") === pCyanstdsrc) {
					playerImg.attr("src", pCyanHitsrc);
				}
				else {
					playerImg.attr("src", pCyanstdsrc);
				}
			}
			else if (playerColor == "purple") {
				if (playerImg.attr("src") === pPurplestdsrc) {
					playerImg.attr("src", pPurpleHitsrc);
				}
				else {
					playerImg.attr("src", pPurplestdsrc);
				}
			}
			else if (playerColor == "yellow") {
				if (playerImg.attr("src") === pYellowstdsrc) {
					playerImg.attr("src", pYellowHitsrc);
				}
				else {
					playerImg.attr("src", pYellowstdsrc);
				}
			}
			else if (playerColor == "white") {
				if (playerImg.attr("src") === pWhitestdsrc) {
					playerImg.attr("src", pWhiteHitsrc);
				}
				else {
					playerImg.attr("src", pWhitestdsrc);
				}
			}
		}, 100);
		setTimeout(function () {
			clearInterval(p_ImgBlankInterval);
			if (playerColor == "default") {
				playerImg.attr("src", pDefaultStdsrc);
			}
			else if (playerColor == "red") {
				playerImg.attr("src", pRedStdsrc);
			}
			else if (playerColor == "cyan") {
				playerImg.attr("src", pCyanstdsrc);
			}
			else if (playerColor == "purple") {
				playerImg.attr("src", pPurplestdsrc);
			}
			else if (playerColor == "yellow") {
				playerImg.attr("src", pYellowstdsrc);
			}
			else if (playerColor == "white") {
				playerImg.attr("src", pWhitestdsrc);
			}


		}, 500);
	}
	function game_over(who) {
		keydown_count = 1;
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		clearInterval(attack2_repeat);
		clearInterval(time_repeat);
		context.clearRect(0, 0, cvwd, cvht);
		if (who == 1) {
			if (effectOn)
				winAudio.play();
			drawText("You Win");
			$("#stageStoryImg").attr("src", "./storyimg/stage2B.gif");
			$("#stage2").fadeOut(6000);
			setTimeout(() => {
				$("#stage-story").fadeIn(1000);
			}, 6000);
			setTimeout(() => {
				keyboardAudio.play();
			}, 7000);
			setTimeout(() => {
				$("#stage-story").fadeOut(1000);
				keyboardAudio.pause();
			}, 10000);
			setTimeout(() => {
				$("#stgbtn3").trigger('click');
			}, 12000);
		}
		else if (who == 2) {
			if (effectOn)
				loseAudio.play();
			drawText("You Lose");
		}
	}
	/* 플레이어, 보스 체력 출력해주는 함수 */
	function hp() {
		var percent = parseInt(b_hp / 1422 * 100);
		$("#bp_num2").text(percent + "%");
	}

	function game_over_Img() {
		var playerImg = $("#playerImg2");
		if (playerColor == "default") {
			playerImg.attr("src", "./img/player/playerLose_32x32.gif");
		}
		else if (playerColor == "red") {
			playerImg.attr("src", "./img/player/playerLose_red_32x32.gif");
		}
		else if (playerColor == "cyan") {
			playerImg.attr("src", "./img/player/playerLose_cyan_32x32.gif");
		}
		else if (playerColor == "purple") {
			playerImg.attr("src", "./img/player/playerLose_purple_32x32.gif");
		}
		else if (playerColor == "yellow") {
			playerImg.attr("src", "./img/player/playerLose_yellow_32x32.gif");
		}
		else if (playerColor == "white") {
			playerImg.attr("src", "./img/player/playerLose_white_32x32.gif");
		}
	}

	function game_over_win_Img() {
		var playerImg = $("#playerImg2");
		if (playerColor == "default") {
			playerImg.attr("src", "./img/player/playerWin_default.gif");
		}
		else if (playerColor == "red") {
			playerImg.attr("src", "./img/player/playerWin_red.gif");
		}
		else if (playerColor == "cyan") {
			playerImg.attr("src", "./img/player/playerWin_cyan.gif");
		}
		else if (playerColor == "purple") {
			playerImg.attr("src", "./img/player/playerWin_purple.gif");
		}
		else if (playerColor == "yellow") {
			playerImg.attr("src", "./img/player/playerWin_yellow.gif");
		}
		else if (playerColor == "white") {
			playerImg.attr("src", "./img/player/playerWin_white.gif");
		}
		var bossImg = $("#bossImg2");
		bossImg.attr("src", "./img/stage2/end.png");
		bossImg.attr("width", "200px");
		bossImg.attr("height", "110px");
		bossImg.attr("top", "100px");
	}


	/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/



	/* 충돌 감지 */
	function collision() {
		var dxf = dx;
		if (dxf < 0) {
			dxf = -dxf;
		}
		if (attack4 == 1) {
			if (x > attack4_brick_x - ballRadius && x < attack4_brick_x + 20 + ballRadius && y < attack4_brick_y + 20 + ballRadius && y > attack4_brick_y + 20) {
				//공이 보스패턴4로 소환된 첫번째 벽의 밑면에 맞는 경우
				dy = -dy;
				attack4 = 0;
				if (effectOn)
					brickAudio.play();
				b_hp_decrease(attack_stat);
				fishdie();
			}
			else if (x > attack4_brick_x - ballRadius && x < attack4_brick_x + 20 + ballRadius && y > attack4_brick_y - ballRadius && y < attack4_brick_y) {
				//공이 윗면에 맞는경우
				dy = -dy;
				attack4 = 0;
				if (effectOn)
					brickAudio.play();
				b_hp_decrease(attack_stat);
				fishdie();
			}
			else if (x > attack4_brick_x - ballRadius && x < attack4_brick_x && y > attack4_brick_y - ballRadius && y < attack4_brick_y + 20 + ballRadius) {
				//공이 왼쪽 면에 맞는경우
				dx = -dx;
				attack4 = 0;
				if (effectOn)
					brickAudio.play();
				b_hp_decrease(attack_stat);
				fishdie();
			}
			else if (x < attack4_brick_x + 20 + ballRadius && x > attack4_brick_x + 20 && y > attack4_brick_y - ballRadius && y < attack4_brick_y + 20 + ballRadius) {
				//공이 오른쪽 면에 맞는 경우
				dx = -dx;
				attack4 = 0;
				if (effectOn)
					brickAudio.play();
				b_hp_decrease(attack_stat);
				fishdie();
			}
		}
		if ((x < bossx & x > bossx - ballRadius - dxf & y < bossy + bossht + ballRadius & y > bossy - ballRadius) || (x < bossx + bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht + ballRadius & y > bossy - ballRadius)) { //보스의 왼쪽, 오른쪽에 충돌
			if (attack1 == 1) { //보스가 회복 배리어를 친 상태면 체력 회복
				b_hp_increase();
			}
			else {
				b_hp_decrease(attack_stat);
			}
			dx = -dx;
		}
		else if ((y > bossy + bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius) || (y < bossy & y > bossy - ballRadius - yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius)) { //보스의 위, 아래에 충돌
			if (attack1 == 1) { //보스가 회복 배리어를 친 상태면 체력 회복
				b_hp_increase();
			}
			else {
				b_hp_decrease(attack_stat);
			}
			dy = -dy;
		}


		if ((y > (cvht - 80 - ballRadius - yvelocity))) {
			if (x > barx + (barwidth / 2 + ballRadius) || x < barx - (barwidth / 2 + ballRadius)) { //바의 영역에서 벗어난 경우
				if (y > (cvht - 80 - yvelocity)) {
					ballRadius = 10;
					init();
					draw();
					p_hp_decrease();
					start_number = 0;
					keydown_count = 0;
				}
			} else if (x > barx - (barwidth / 2 + ballRadius) && x < barx + (barwidth / 2 + ballRadius)) { //바의 영역에 있는 경우	
				if (dy > 0) {
					gold += 5;
					if (effectOn)
						swingAudio.play();
				}
				dx = xvelocity * (x - barx) / (barwidth + ballRadius / 2);
				dy = -dy;
			} else { //바의 영역의 마지노선에 맞닿는 경우
				if (dy > 0) {
					gold += 5;
					if (effectOn)
						swingAudio.play();
				}
				dy = -dy;
				dx = -dx;
			}
		}
		else if (y < ballRadius) { //위쪽 벽면에 부딪히는 경우
			dy = -dy;
			if (yellow == 1) {
				init();
				draw();
				keydown_count = 0;
				start_number = 0;
			}
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


	function fishdie() {
		littlebrick_Img.src = "./img/stage2/pd1.png";
		attack4_repeat = setInterval(function () {
			context.drawImage(littlebrick_Img, attack4_brick_x, attack4_brick_y, 45, 45);
		}, 1);
		littlebrick_Img.src = "./img/stage2/pd2.png";
		setTimeout(function () {
			littlebrick_Img.src = "./img/stage2/pd3.png";
			setTimeout(function () {
				littlebrick_Img.src = "./img/stage2/pd4.png";
				setTimeout(function () {
					littlebrick_Img.src = "./img/stage2/pd5.png";
					setTimeout(function () {
						littlebrick_Img.src = "./img/stage2/pd6.png";
						setTimeout(function () {
							littlebrick_Img.src = "./img/stage2/pd7.png";
							setTimeout(function () {
								littlebrick_Img.src = "./img/stage2/pd8.png";
								setTimeout(function () {
									littlebrick_Img.src = "./img/stage2/pd9.png";
									setTimeout(function () {
										littlebrick_Img.src = "./img/stage2/pd10.png";
										setTimeout(function () {
											littlebrick_Img.src = "./img/stage2/pd11.png";
											setTimeout(function () {
												littlebrick_Img.src = "./img/stage2/pd12.png";
												setTimeout(function () {
													littlebrick_Img.src = "./img/stage2/pd13.png";
													setTimeout(function () {
														littlebrick_Img.src = "./img/stage2/pd14.png";
														setTimeout(function () {
															littlebrick_Img.src = "./img/stage2/pd15.png";
															setTimeout(function () {
																littlebrick_Img.src = "./img/stage2/pd16.png";
																setTimeout(function () {
																	littlebrick_Img.src = "./img/stage2/pd17.png";
																	setTimeout(function () {
																		littlebrick_Img.src = "./img/stage2/pd1.png";
																		clearInterval(attack4_repeat)
																	}, 10);
																}, 10);
															}, 10);
														}, 10);
													}, 10);
												}, 10);
											}, 10);
										}, 10);
									}, 10);
								}, 10);
							}, 10);
						}, 10);
					}, 10);
				}, 10);
			}, 10);
		}, 10);
	}


	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

	/* 스페이스바를 누를 경우 공 발사
	스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
	function keydown(event) {
		if (event.keyCode == 82) {
			attack_stat = 1500;
		}
		if (event.keyCode == 84) {
			p_hp = 4;
			p_hp_decrease();
		}
		if (event.keyCode == 27 && esc_count == 0) {
			$("#boss_UI2").css({
				display: "none"
			});
			$("#player_UI2").css({
				display: "none"
			});
			$("#screen2").css({
				display: "none"
			});
			$("#esc_menu2").css({
				display: "block"
			});
			esc_count = 1;
			keydown_count = 1;
			removeEventListener('mousemove', mousemove);
			clearInterval(repeat);
			if (attack1 == 1) {
				attack1 = 0;
				stop_pattern = 1;
			}


			if (qskill_cooltime == 1) {
				clearInterval(qskill_repeat);
				qstop_pattern = 1;
			}

			if (wskill_cooltime == 1) {
				clearInterval(wskill_repeat);
				clearInterval(wskill_repeat2);
				wstop_pattern = 1;
			}
			clearInterval(time_repeat);
		}
		else if (event.keyCode == 27 && esc_count == 1) {
			$("#boss_UI2").css({
				display: "block"
			});
			$("#player_UI2").css({
				display: "block"
			});
			$("#screen2").css({
				display: "block"
			});
			$("#esc_menu2").css({
				display: "none"
			});
			esc_count = 0;
			keydown_count = 0;
			addEventListener('mousemove', mousemove);
			repeat = setInterval(draw, 1);
			time_repeat = setInterval(timeAttack, 1000);
			if (stop_pattern == 1) {
				attack1 = 1;
			}

			if (qstop_pattern == 1) {
				qskill_repeat = setInterval(skill_timer1, 1000);
				qstop_pattern = 0;
			}
			if (wstop_pattern == 1) {
				wskill_repeat = setInterval(skill_timer2, 1000);
				wskill_repeat2 = setInterval(wskill_time, 1);
				wstop_pattern = 0;
			}
			stop_pattern = 0;
		}
		if (keydown_count == 0) {
			if (start_number == 0) {
				//스페이스바를 누를경우
				if (event.keyCode == 32) {
					start_number = 1;
					dy = yvelocity;
					if (drawinterval == 0) {
						repeat = setInterval(draw, 1);
					}
				}
			}
			else if (start_number == 1) {
				//q를 누를경우
				if (qskill_cooltime == 0 && qskill == 0 && event.keyCode == 81) { //쿨타임이 아니고, 보호막이 활성화되지 않을 때 사용 가능
					qskill = 1; //이 변수가 1일 때 보호막 활성화
					if (effectOn)
						qskillonAudio.play();
					$("#qskill2").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
						"display": "none"
					});
					$("#qtimer2").css({
						"display": "block"
					});
					$("#qtimer2").text(qskill_timer); //쿨타임 글씨 활성화
					qskill_repeat = setInterval(skill_timer1, 1000);
					qskill_cooltime = 1;
					if (effectOn)
						qskillonAudio.play();
				}
				else if (wskill_cooltime == 0 && wskill == 0 && event.keyCode == 87) {
					wskill = 1; //이 변수가 1일 때 보호막 활성화
					wskill_count = 0;
					attack_x = barx;
					$("#wskill2").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
						"display": "none"
					});
					$("#wtimer2").css({
						"display": "block"
					});
					$("#wtimer2").text(wskill_timer); //쿨타임 글씨 활성화
					wskill_repeat = setInterval(skill_timer2, 1000);
					wskill_cooltime = 1;
					wskill_repeat2 = setInterval(wskill_time, 1);
					if (effectOn)
						wskillonAudio.play();
				}
			}
		}
	}

	function skill_timer1() {
		qskill_timer--;
		if (qskill_timer == 28) {
			qskill = 0;
			shield_img =8;
			shield_img_count =0;
			shield_repeat = setInterval(attacked_shield, 1);
		}
		else if (qskill_timer == -1) {
			qskill_timer = 30;
			clearInterval(qskill_repeat);
			$("#qskill2").css({
				"display": "block"
			});
			$("#qtimer2").css({
				"display": "none"
			});
			qskill_cooltime = 0;
		}
		$("#qtimer2").text(qskill_timer);
	}

	function skill_timer2() {
		wskill_timer--;
		if (wskill_timer == -1) {
			wskill_timer = 10;
			clearInterval(wskill_repeat);
			$("#wskill2").css({
				"display": "block"
			});
			$("#wtimer2").css({
				"display": "none"
			});
			wskill_cooltime = 0;
		}
		$("#wtimer2").text(wskill_timer);
	}

	/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
	function wskill_time() {
		yplus = yplus - 2; // Y좌표는 2칸씩 이동
		wskill_img_count++;
		if (wskill_img_count % 50 == 0) {
			wskill_img++;
			if (wskill_img > 3) {
				wskill_Img.src = "./img/stage3/blast3.png";
			}
			else {
				wskill_Img.src = "./img/stage3/blast" + wskill_img + ".png";
			}
		}
		if (wskill_count == 0 && yplus < bossy + bossht && attack_x + 30 >= bossx && attack_x <= bossx + bosswd) {
			if (attack1 == 1) {
				b_hp_increase(attack_stat * 2);
			}
			else {
				b_hp_decrease(attack_stat * 2);
			}
			wskill_count = 1;
			wskill = 0;
		}

		if (attack4 == 1) {
			if (attack_x > attack4_brick_x - 30 && attack_x < attack4_brick_x + 20 + 30 && yplus < attack4_brick_y + 20) {
				//공이 보스패턴4로 소환된 첫번째 벽의 밑면에 맞는 경우
				attack4 = 0;
				wskill = 0;
				wskill_count = 1;
				b_hp_decrease(attack_stat * 2);
				fishdie();
			}
		}
		if (yplus + 100 == 0) { //검이 영역 밖으로 나갔을 경우 함수 종료
			yplus = 480;
			clearInterval(wskill_repeat2);
			wskill_count = 0;
			wskill = 0;
		}
	}

	/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
	//영역 밖을 나갈시 최대 영역으로 바를 그림
	function mousemove(event) {
		barx = event.clientX - wdwd;
	}

	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

	function timeAttack() {
		timer += 1;

		if (timer % 6 == 0) {
			var randnum
			if (attack4 == 1) {
				randnum = Math.floor(Math.random() * 2);
			}
			else {
				randnum = Math.floor(Math.random() * 3);
			}
			if (randnum == 0) { //첫번째 보스 패턴 ( 보스 배리어 )
				attack1 = 1; //1로 값을 변경해줌으로써 draw에서 bossAttack1()을 반복적으로 호출
				bossAttack1();
			}
			else if (randnum == 1) {
				attack_position = Math.random() * 500;
				bossAttack2();
				if (effectOn)
					fishAudio.play();
				attack2 = 1;
			}
			else if (randnum == 2) {
				attack4 = 1;
				var num = Math.floor(Math.random() * 3);
				attack4_brick_x = 150 * (num + 1);
				//fly_repeat = setInterval(fishflying,1);
				bossAttack4();
			}

		}
	}

	//보스 캐릭터 주변에 초록색 원을 그려주는 함수
	function bossAttack1() {
		attack1_img_count++;
		if (attack1_img_count % 65 == 0) {
			attack1_img++;
			if (attack1_img == 9) {
				attack1_img = 1;
				attack1_img_count = 0;
				attack1 = 0;
			}
			bossshield_Img.src = "./img/stage2/s" + attack1_img + ".png";
		}
		context.drawImage(bossshield_Img, bossx - 20, bossy - 20, 200, 180);
	}


	function bossAttack2() {
		attack2_img_count++;
		if (attack2_img_count % 25 == 0) {
			attack2_img++;
			if (attack2_img == 20) {
				attack2_timer = 0;
				attack2 = 0;
				attack2_count = 0;
				attack2_img = 1;
				attack2_img_count = 0;
			}
			bottom_attack_Img.src = "./img/stage2/a" + attack2_img + ".png";
		}

		context.drawImage(bottom_attack_Img, attack_position, cvht - 100, 100, 100);

		if (attack2_img_count >= 300) {
			if (attack_position <= barx + barwidth / 2 && attack_position + 100 >= barx - barwidth / 2) {
				if (attack2_count == 0) {
					p_hp_decrease();
					attack2_count = 1;
				}
			}
		}
	}



	function bossAttack4() {
		context.drawImage(littlebrick_Img, attack4_brick_x, attack4_brick_y, 45, 45);
	}
	/*
		function fishflying(){
			fly += 1;
			if(fly % 10 == 0){
				fly_count++;
				if(fly_count == 13){
	
				}
				fishfly.src = "./img/stage2/pf"+fly_count+".png";
			}
			context.drawImage(fishfly,attack4_brick_x,fly,45,45);
		}
	*/

	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
}
