export function stageStart1(currentGold, effectOn,bgmOn, potion1Num, potion2Num, potion3Num) {
	/* 플레이어 스킬 변수 */
	var qskill = 0;
	var qskill_timer = 30;
	var qskill_repeat;
	var qskill_cooltime = 0;
	var shield_img = 1;
	var shield_img_count = 0;
	var shield_repeat;

	/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
	var timer = 0;
	var time_repeat;
	var attack_time_repeat;
	var attack_time_count = 0;
	var bs_attack = 0;
	var bs_attacked = 0;

	var attack1 = 0;
	var bs_barrier = 0;
	var attack1_img_count = 0;
	var attack1_img = 1;
	var attack1_repeat;

	var attack2 = 0;
	var yplus = 100;
	var attack_x;
	var attack2_repeat;
	var attack2_count = 0;
	var attack2_img_count = 0;
	var attack2_img = 1;


	var attack3 = 0;
	var attack3_img_count = 0;
	var attack3_img = 1;
	var attack3_count = 0;


	var attack4 = 0;
	var attack4_img = 1;
	var attack4_img_count = 0;
	var flowerx;
	var flowery;
	/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
	var start_number = 0;
	var keydown_count = 0;
	var esc_count = 0;
	var stop_pattern;
	var qstop_pattern;
	var gold = currentGold;
	var drawinterval;
	var damage_state = 0;
	var damage;
	var damage_count = 0;
	var damagex;
	var damagey;

	var attack_stat = 0;
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

	/* window 높이 ,너비 */
	var wdht;
	var wdwd;

	/* boss의 x,y좌표*/
	var bossx;
	var bossy;
	var bosswd = 140;
	var bossht = 140;
	var boss_img = 1;
	var boss_img_count = 0;
	var boss_state = 1;
	var boss_finish_repeat;

	/*플레이어, 보스 체력 */
	var p_hp = 0;
	var b_hp = 948;
	var potion_count = 0;
	var memory;

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


	var playerColor = "";
	var player = new Image();
	var player_num;
	var ball = new Image();
	var flower = new Image();
	flower.src = "./img/stage1/br1.png";

	// 착용중인 캐릭터 이미지로 변경
	if ($("#pDefault").hasClass("equip")) {
		$("#playerImg1").attr("src", pDefaultStdsrc);
		playerColor = "default";
		player.src = "./img/player/pd1.gif";
		attack_stat = 50;
		player_num = 1;
	}
	else if ($("#pRed").hasClass("equip")) {
		$("#playerImg1").attr("src", pRedStdsrc);
		playerColor = "red"; //도트데미지
		ball.src = "./img/player/br.png";
		firedot = 1;
		attack_stat = 50;
		player_num = 2;
	}
	else if ($("#pCyan").hasClass("equip")) {
		$("#playerImg1").attr("src", pCyanstdsrc);
		playerColor = "cyan"; //
		ball.src = "./img/player/bc.png";
		ballRadius = 20;
		attack_stat = 50;
		player_num = 3;
	}
	else if ($("#pWhite").hasClass("equip")) {
		$("#playerImg1").attr("src", pWhitestdsrc);
		playerColor = "white"; //공격력 2배, 입는 피해2배
		ball.src = "./img/player/bw.png";
		attack_stat = 100;
		white = 1;
		player_num = 4;
	}
	else if ($("#pYellow").hasClass("equip")) {
		$("#playerImg1").attr("src", pYellowstdsrc);
		playerColor = "yellow"; //공 즉시 회수
		ball.src = "./img/player/by.png";
		attack_stat = 50;
		yellow = 1;
		player_num = 5;
	}
	else if ($("#pPurple").hasClass("equip")) {
		$("#playerImg1").attr("src", pPurplestdsrc);
		playerColor = "purple"; //중독데미지 중첩 가능
		ball.src = "./img/player/bp.png";
		attack_stat = 50;
		purple = 1;
		player_num = 6;
	}
	var fireball = new Image();
	fireball.src = "./img/stage1/af1.png";
	var bossImg = new Image(); // in canvas
	bossImg.src = "./img/stage1/1_1.png";
	var bossshield_Img = new Image();
	bossshield_Img.src = "./img/stage1/s1.png";
	var sword_Img = new Image();
	sword_Img.src = "./img/stage1/a1.png";
	var player_sh = new Image();
	player_sh.src = "./img/player/s1.png";


	//오디오 소스
	const brickAudio = new Audio('./오디오/player/벽돌.wav');
	const swingAudio = new Audio('./오디오/player/칼휘두르는소리.mp3');
	const bossAudio = new Audio('./오디오/boss/bosshit.mp3');
	const bossAudio2 = new Audio('./오디오/boss/bosshit2.mp3');
	const bossAudio3 = new Audio('./오디오/boss/bosshit3.mp3');
	const playerhitAudio = new Audio('./오디오/player/플레이어 피격 (1).wav');
	const bossskillAudio = new Audio('./오디오/stage1/보스기합.wav');
	const bossskillAudio2 = new Audio('./오디오/stage1/폭발공격.mp3');
	const countdownAudio = new Audio('./오디오/Interface/카운트다운.mp3');
	const bossdieAudio = new Audio('./오디오/stage1/보스피격.wav');
	const bossdieAudio2 = new Audio('./오디오/stage1/보스사망.wav');
	const qskillonAudio = new Audio('./오디오/player/q스킬쉴드장착.mp3');
	const winAudio = new Audio('./audio/win_7s.mp3');
	const loseAudio = new Audio('./audio/lose_7s.mp3');
	var keyboardAudio = new Audio("./storyimg/키보드소리.mp3");
	var bgm = document.getElementById("myAudio1");
    var bgm2 = new Audio("./audio/stage2.mp3");   // 보스2 브금
    var bgm3 = new Audio("./audio/stage3.mp3");   // 보스3 브금
	var mbm = document.getElementById("myAudio0");

	pageLoad();
	wait();
	windowsize();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();
	$("#container1").animate({
		"width": b_hp + "px"
	});


	function pageLoad() {
		var play_button = document.getElementById("play1");
		play_button.onclick = play;
		var exit_button = document.getElementById("exit1");
		exit_button.onclick = exit;
		$("#canvas_screen1").css({
			"background": "url(./backimg/back2.gif)"
		});
	}

	function play() {
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
		addEventListener('mousemove', mousemove);
		repeat = setInterval(draw, 1);
		time_repeat = setInterval(timeAttack, 1000);
		if (stop_pattern == 2) {
			attack2_repeat = setInterval(bossAttack2_timer, 1);
		}
		else if (stop_pattern == 3) {
			attack3 = 1;
		}
		if (qstop_pattern == 1) {
			qskill_repeat = setInterval(skill_timer1, 1000);
			qstop_pattern = 0;
		}
		stop_pattern = 0;
	}

	function exit() {
		// if (effectOn) {
		// 	clickSound.play();   // 버튼 클릭 효과음
		// }
		bgm.pause();
		bgm.currentTime = 0;
		mbm.play();
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
		removeEventListener('keydown', keydown);
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		drawinterval = 0;
		if (attack1 == 1) {
			clearInterval(attack1_repeat);
			attack1 = 0;
			attack1_img_count = 0;
			attack1_img = 1;
			bossshield_Img.src = "./img/stage1/s" + attack1_img + ".png"
		}
		else if (attack2 == 1) {
			clearInterval(attack2_repeat);
			attack2 = 0;
			yplus = 100;
			attack2_img = 1;
			attack2_img_count = 0;
			attack2_count = 0;
			sword_Img.src = "./img/stage1/a" + attack2_img + ".png";
		}
		else if (attack3 == 1) {
			attack3_img = 1;
			attack3_img_count = 0;
			attack3 = 0;
			attack3_count = 0;
			fireball.src = "./img/stage1/af" + attack3_img + ".png";
		}
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
		b_hp = 948;
		bgm.pause();
		$("#container1").animate({
			"width": b_hp + "px"
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
	}

	/* window size 변경 해주는 함수 */
	function windowsize() {
		var screen = document.getElementById("screen1");
		var bossui = document.getElementById("boss_UI1");
		var playerui = document.getElementById("player_UI1");
		wdht = (window.outerHeight - cvht) / 4;
		wdwd = (window.innerWidth - cvwd) / 2;
		screen.style.top = wdht + "px";
		screen.style.left = wdwd + "px";
		bossui.style.left = (wdwd - 200) + "px";
		bossui.style.top = wdht + "px";
		playerui.style.left = (wdwd + cvwd) + "px";
		playerui.style.top = (wdht) + "px";
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
		y = cvht - 80 - ballRadius;
		dx = 0;
		dy = 0;
	}

	function draw() {
		context.clearRect(0, 0, cvwd, cvht);
		$("#gold1").text("gold : " + gold);
		$("#red1").text(potion1Num);
		$("#blue1").text(potion2Num);
		$("#green1").text(potion3Num);

		/* 보스 공격 관련 조건문 */

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
		if (boss_state == 1) {
			boss();
		}
		else if (boss_state == 2) {
			attackmotion();
		}

		drawBall();
		drawPaddle();
		collision();
		if (qskill == 1) {
			drawshield();
		}

		if (attack1 == 1) {
			bossAttack1();
			if (effectOn)
				bossskillAudio.play();

		}
		else if (attack2 == 1) {
			bossAttack2();
			if (effectOn)
				bossskillAudio.play();

		}
		else if (attack3 == 1) {
			bossAttack3();
			if (effectOn)
				bossskillAudio2.play();
		}
		else if(attack4 == 1){
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
					"width": b_hp + "px"
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
		context.font = "bold 70px arial";
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
				qskill = 0;
			}
			player_sh.src ="./img/player/s"+shield_img+".png";
		}
		context.drawImage(player_sh,(barx-60),cvht-100,120,120);
	}

	/* 보스를 그려주는 함수 */
	function boss() {
		bossx = (cvwd - bosswd) / 2;
		bossy = 0;
		boss_img_count++;
		if (boss_img_count % 50 == 0) {
			boss_img++;
			if (boss_img == 9) {
				boss_img = 1;
			}
			bossImg.src = "./img/stage1/1_" + boss_img + ".png";
		}
		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);
	}

	function b_hp_decrease(att) {
		damage = att - Math.floor(Math.random() * 20);
		b_hp -= damage;
		hp();
		$("#container1").animate({
			"width": b_hp + "px"
		});
		damage_state = 1;
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
		if (b_hp < 0 || b_hp == 0) {
			game_over(1);
		}
		else {
			b_hp_decrease_Img();
		}


	}





	function b_hp_decrease_Img() {
		var playerImg = $("#playerImg1");
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
		}, 1000);
	}

	function p_hp_decrease() {
		var p_hp_array = $(".state1");
		p_hp_array[p_hp].src = "./img/player/playerHeartEmpty_25x25.png";
		p_hp++;

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
				b_hp = 948;
				$("#container1").animate({
					"width": b_hp + "px"
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
		if (white == 1) {
			p_hp_array[p_hp].src = "./img/player/playerHeartEmpty_25x25.png";
			p_hp++;
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
					b_hp = 948;
					$("#container1").animate({
						"width": b_hp + "px"
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

	}

	function p_hp_decrease_Img() {
		var playerImg = $("#playerImg1");
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
		bgm.pause();
		keydown_count = 1;
		removeEventListener('mousemove', mousemove);
		removeEventListener("keydown",keydown);
		clearInterval(repeat);

		clearInterval(attack1_repeat);
		clearInterval(attack2_repeat);
		clearInterval(time_repeat);
		context.clearRect(0, 0, cvwd, cvht);
		if (who == 1) {
			$(".gold").html(gold);//골드 추가 부분
			if (effectOn)
				winAudio.play();
			game_over_win_Img();
			boss_img = 1;
			boss_img_count = 0;
			boss_finish_repeat = setInterval(deathmotion, 1);
			$("#stageStoryImg").attr("src", "./storyimg/stage1B.gif");
			$("#stage1").fadeOut(5500);
			setTimeout(() => {
				$("#stage-story").fadeIn(1000);
			}, 6000);
			setTimeout(() => {
				if (effectOn)
					keyboardAudio.play();
			}, 7000);
			setTimeout(() => {
				$("#stage-story").fadeOut(1000);
				if (effectOn)
					keyboardAudio.pause();
			}, 10000);
			setTimeout(() => {
				$("#stgbtn2").trigger('click');
			}, 12000);
		}
		else if (who == 2) {
			mbm.play();
			if (effectOn)
				loseAudio.play();
			boss_img = 1;
			boss_img_count = 0;
			game_over_Img();
			boss_finish_repeat = setInterval(winmotion, 1);
			$("#stage1").fadeOut(7000, () => {
				$(this).hide();
			});
		}

	}
	function game_over_Img() {
		var playerImg = $("#playerImg1");
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
		var playerImg = $("#playerImg1");
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

	}

	/* 플레이어, 보스 체력 출력해주는 함수 */
	function hp() {
		var percent = parseInt(b_hp / 948 * 100);
		$("#bp_num1").text(percent + "%");
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

		if(attack4 == 1){
			if(flowerx <= x+ballRadius && flowerx + 180 >= x-ballRadius && y-ballRadius <= flowery + 67 && y+ballRadius >= flowery){
				dy = -dy;
				attack4 = 0;
				attack4_img = 1;
				attack4_img_count =0;
			}
			else if(y+ballRadius >= flowery && y-ballRadius <= flowery + 67 && x+ballRadius >= flowerx && x-ballRadius <= flowerx+180){
				dx = -dx;
				attack4 = 0;
				attack4_img = 1;
				attack4_img_count =0;
			}	
		}
		


		for (var i = 0; i < cvwd / 120; i++) {
			brickx = i * 120;
			for (var j = 1; j < 2; j++) {
				bricky = j * 220;
				if (bricks[i] == 1) {
					if (y > bricky + BRICKHEIGHT && y < bricky + BRICKHEIGHT + ballRadius && brickx + BRICKWIDTH > x && brickx < x) { //벽돌의 아래 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						if (effectOn)
							brickAudio.play();
					}
					if (x > brickx - ballRadius - dxf && x < brickx && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { //벽돌의 왼쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
						if (effectOn)
							brickAudio.play();
					}
					if (x < brickx + BRICKWIDTH + ballRadius + dxf && x > brickx + BRICKWIDTH && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { // 벽돌의 오른쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
						if (effectOn)
							brickAudio.play();
					}
					if (brickx + BRICKWIDTH > x && brickx < x && y > bricky - ballRadius && y < bricky) { // 벽돌의 윗 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
						if (effectOn)
							brickAudio.play();
					}
				}
			}
		}
		if ((x < bossx & x > bossx - ballRadius - dxf & y < bossy + bossht + ballRadius & y > bossy - ballRadius) || (x < bossx + bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht + ballRadius & y > bossy - ballRadius)) { //보스의 왼쪽, 오른쪽에 충돌
			dx = -dx;
			if (bs_barrier == 1) {
				attack1_repeat = setInterval(bossAttack1_attacked, 1);
				bs_barrier = 0;
				attack1 = 0;
				attack1_img = 1;
				attack1_img_count = 0;
			}
			else {
				b_hp_decrease(attack_stat);
			}
		}
		else if ((y > bossy + bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius) || (y < bossy & y > bossy - ballRadius - yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius)) { //보스의 위, 아래에 충돌
			dy = -dy;
			if (bs_barrier == 1) {
				bs_barrier = 0;
				attack1_repeat = setInterval(bossAttack1_attacked, 1);
				attack1 = 0;
				attack1_img = 1;
				attack1_img_count = 0;
			}
			else {
				b_hp_decrease(attack_stat);
			}
		}

		if ((y > (cvht - 80 - ballRadius - yvelocity))) {
			if (x > barx + (barwidth / 2 + ballRadius) || x < barx - (barwidth / 2 + ballRadius)) { //바의 영역에서 벗어난 경우
				if (y > (cvht - 80 - yvelocity)) {
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







	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

	/* 스페이스바를 누를 경우 공 발사
	스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
	function keydown(event) {
		if (event.keyCode == 82) {
			attack_stat = 1000;
		}
		if (event.keyCode == 84) {
			p_hp = 4;
			p_hp_decrease();
		}
		if (event.keyCode == 27 && esc_count == 0) {
			$("#boss_UI1").css({
				display: "none"
			});
			$("#player_UI1").css({
				display: "none"
			});
			$("#screen1").css({
				display: "none"
			});
			$("#esc_menu1").css({
				display: "block"
			});
			esc_count = 1;
			keydown_count = 1;
			removeEventListener('mousemove', mousemove);
			clearInterval(repeat);
			if (attack2 == 1) {
				clearInterval(attack2_repeat);
				stop_pattern = 2;
			}
			else if (attack3 == 1) {
				attack3 = 0;
				stop_pattern = 3;
			}
			if (qskill_cooltime == 1) {
				clearInterval(qskill_repeat);
				qstop_pattern = 1;
			}
			clearInterval(time_repeat);
		}
		else if (event.keyCode == 27 && esc_count == 1) {
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
			addEventListener('mousemove', mousemove);
			repeat = setInterval(draw, 1);
			time_repeat = setInterval(timeAttack, 1000);
			if (stop_pattern == 2) {
				attack2_repeat = setInterval(bossAttack2_timer, 1);
			}
			else if (stop_pattern == 3) {
				attack3 = 1;
			}
			if (qstop_pattern == 1) {
				qskill_repeat = setInterval(skill_timer1, 1000);
				qstop_pattern = 0;
			}
			stop_pattern = 0;
		}
		else if(event.keyCode == 49 && potion1Num>= 1){//포션 1 먹을 때
			
			if(p_hp > 0 && p_hp < 5){
				potion1Num--;
				$("#p1Num").text(potion1Num);
				p_hp--;
				$("#p1Num").html(potion1Num); 
				var p_hp_array = $(".state1");
				p_hp_array[p_hp].src = "./img/player/playerHeartFull_25x25.png";
				if (effectOn)
					potion1Audio.play();
				
			}
		}
		else if(event.keyCode == 50 && potion2Num>= 1 && potion_count == 0){// 포션 2 먹을 때
			memory = attack_stat;
			potion_count = 1;
			potion2Num--;
			$("#p2Num").html(potion2Num);
			attack_stat += 20;
			setTimeout(function(){
				attack_stat = memory;
				potion_count = 0;
			},10000); 
			if (effectOn)
				potion2Audio.play();
		}
		else if(event.keyCode == 51 && potion3Num>= 1){// 포션 3 먹을 때
			if(qskill_cooltime == 1){
				qskill = 0;
				qskill_cooltime = 0;
				qskill_timer = 30;
				clearInterval(qskill_repeat);
				$("#qskill1").css({
					"display": "block"
				});
				$("#qtimer1").css({
					"display": "none"
				});
			}
			potion3Num--;
			$("#p3Num").html(potion3Num); 
			if (effectOn)
				potion3Audio.play();
		}
		if (keydown_count == 0) {
			if (start_number == 0) {
				//스페이스바를 누를경우
				if (event.keyCode == 32) {
					if (drawinterval == 0) {
						repeat = setInterval(draw, 1);
					}
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
					if (effectOn) {
						qskillonAudio.play();
					}
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
	}

	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

	function timeAttack() {
		timer += 1;
		if (timer % 6 == 4) {
			boss_img = 1;
			boss_img_count = 0;
			boss_state = 2;
		}

		if (timer % 6 == 0) {
			var randnum = Math.floor(Math.random()*4);
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
				attack_x = Math.floor(Math.random() * 480);
				attack3 = 1;
			}
			else if(randnum == 3){
				attack4 = 1;
			}

		}
	}



	function attackmotion() {
		boss_img_count++;
		if (boss_img_count % 40 == 0) {
			boss_img++;
			if (boss_img == 10) {
				boss_img = 1;
				boss_img_count = 0;
				boss_state = 1;
			}
			bossImg.src = "./img/stage1/2_" + boss_img + ".png";
		}
		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);
	}
	/*
		function attackedmotion(){
			bossStanding[0].src = "./img/stage1/bt.gif";
			setTimeout(function(){
				bossStanding[0].src = "./img/stage1/boss1.gif";
			},1600);
		}
		*/

	function deathmotion() {
		context.clearRect(0, 0, cvwd, cvht);
		boss_img_count++;
		if (boss_img_count % 80 == 0) {
			boss_img++;
			if (boss_img == 12) {
				boss_img = 11;
				boss_img_count = 0;
				clearInterval(boss_finish_repeat);
				drawText("You Win");
			}
			bossImg.src = "./img/stage1/4_" + boss_img + ".png";
		}
		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);
	}

	function winmotion() {
		context.clearRect(0, 0, cvwd, cvht);
		boss_img_count++;
		if (boss_img_count % 80 == 0) {
			boss_img++;
			if (boss_img == 9) {
				boss_img = 8;
				boss_img_count = 0;
				clearInterval(boss_finish_repeat);
				drawText("You Lose");
			}
			bossImg.src = "./img/stage1/5_" + boss_img + ".png";
		}
		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);
	}


	/* 보스 보호막 패턴
	보스를 둘러싼 파란색 원이 생김 */
	function bossAttack1() {
		attack1_img_count++;
		if (attack1_img_count % 50 == 0) {
			attack1_img++;
			if (attack1_img == 9) {
				attack1_img = 4;
			}
			bossshield_Img.src = "./img/stage1/s" + attack1_img + ".png"
		}
		context.drawImage(bossshield_Img, bossx - 15, bossy - 15, (bosswd + 10) * 1.3, (bosswd + 10) * 1.3);
	}

	function bossAttack1_attacked() {
		attack1_img_count++;
		if (attack1_img_count % 50 == 0) {
			attack1_img++;
			if (attack1_img == 4) {
				clearInterval(attack1_repeat);
				attack1_img_count = 0;
				attack1_img = 1;
			}
			bossshield_Img.src = "./img/stage1/ss" + attack1_img + ".png"
		}
		context.drawImage(bossshield_Img, bossx - 15, bossy - 15, (bosswd + 10) * 1.3, (bosswd + 10) * 1.3);
	}

	/* 보스 밑으로 파이어볼 공격 */
	function bossAttack2() {
		attack2_img_count++;
		if (attack2_img_count % 30 == 0) {
			attack2_img++;
			if (attack2_img == 13) {
				attack2_img = 1;
			}
			sword_Img.src = "./img/stage1/a" + attack2_img + ".png";
		}
		context.drawImage(sword_Img, attack_x + barwidth / 2 - 15, yplus, 80, 150); // 가로 45 세로 74의 검 생성
	}

	/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
	function bossAttack2_timer() {
		yplus = yplus + 2; // Y좌표는 2칸씩 이동
		if (attack2_count == 0 && yplus > cvht - 20 && attack_x + barwidth / 2 - 15 + 80 > barx - barwidth / 2 && attack_x + barwidth / 2 - 15 < barx + barwidth / 2) {
			if (qskill == 1) { //플레이어 보호막이 활성되어 있다면 보호막이 깨짐
				qskill = 0;
				shield_img =8;
				shield_img_count =0;
				shield_repeat = setInterval(attacked_shield, 1);
			}
			else {
				p_hp_decrease(); // 플레이어 보호막이 없다면 체력 1칸 감소
			}
			attack2_count = 1; //이 변수가 1인 동안은 검에 맞아도 데미지 0
		}
		if (yplus == cvht) { //검이 영역 밖으로 나갔을 경우 함수 종료
			attack2 = 0;
			yplus = 100;
			attack2_img = 1;
			attack2_img_count = 0;
			clearInterval(attack2_repeat);
			attack2_count = 0;
		}
	}

	/* 바닥에서 불꽃이 솟아나는 공격 */
	function bossAttack3() {
		attack3_img_count++;
		if (attack3_img_count % 50 == 0) {
			attack3_img++;
			if (attack3_img == 13) {
				attack3_img = 1;
				attack3_img_count = 0;
				attack3 = 0;
				attack3_count = 0;
			}
			fireball.src = "./img/stage1/af" + attack3_img + ".png";
		}
		context.drawImage(fireball, attack_x, cvht - 130, 120, 130);
		if (attack3_img_count >= 300) {
			if (attack_x <= barx + barwidth / 2 && attack_x + 120 >= barx - barwidth / 2) {
				if (qskill == 1) {
					qskill = 0;
					shield_img =8;
					shield_img_count =0;
					shield_repeat = setInterval(attacked_shield, 1);
				}
				else {
					if (attack3_count == 0) {
						attack3_count = 1;
						p_hp_decrease();
					}
				}
			}
		}
	}

	function bossAttack4(){
		flowerx = cvwd/2-90;
		flowery = bossy+bossht + 20
		attack4_img_count++;
		if(attack4_img_count % 50 == 0){
			attack4_img++;
			if(attack4_img == 5){
				attack4_img = 1;
			}
			flower.src = "./img/stage1/br"+attack4_img+".png";
		}
		context.drawImage(flower,flowerx,flowery,180,67);
	}

	/* 호출시 원래 공 반지름 길이로 복구 */



	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
}