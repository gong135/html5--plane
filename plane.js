//全局变量
var canvasWidth=480;//画布宽
var canvasHeight=650;//画布高


var canvas=document.getElementById('canvas');
canvas.width=canvasWidth;
canvas.height=canvasHeight;
var ctx =canvas.getContext('2d');


const PHASE_DOWNLOAD=1 //游戏下载阶段
const PHASE_READY=2 //游戏准备阶段
const PHASE_LOADING=3 //游戏加载
const PHASE_PLAY=4 //游戏进行阶段
const PHASE_PAUSE=5 //游戏暂停阶段
const PHASE_GAMEOVER=6 //游戏结束阶段

var  curPhase=PHASE_DOWNLOAD;  ///当前所处的阶段
/////////////******************所有图片对象
var imgBackground;
var imgBullet1;
var imgsEnemy1=[]; //小号敌机
var imgsEnemy2=[]; //中号敌机
var imgsEnemy3=[]; //大号敌机
var imgsGameLoading=[];
var imgGamePauseNor;
var imgsHero=[];
var imgStart;

//阶段1：下载图片
download();//开始下载
function download(){
	var progress=0;//下载进度
	ctx.font='80px SimHei'
	function drawProgress(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		var txt=progress+'%'
		var w=ctx.measureText(txt).width;
		ctx.fillStyle='#eee;'
		ctx.strokeText(txt,canvas.width/2-w/2,canvas.height/2+40)
		ctx.fillText(txt,canvas.width/2-w/2,canvas.height/2+40)
		if (progress>=100)
		{
			startGame()
		}
	}
//		加载每一个图片然后清除，
	imgBackground=new Image();
	imgBackground.src='img/background.png'
	imgBackground.onload=function(){
		progress+=4;
		drawProgress()
	}
	imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress+=3;
		drawProgress();
	}
	
	//敌机1
	imgsEnemy1[0] = new Image();
	imgsEnemy1[0].src = 'img/enemy1.png';
	imgsEnemy1[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[1] = new Image();
	imgsEnemy1[1].src = 'img/enemy1_down1.png';
	imgsEnemy1[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[2] = new Image();
	imgsEnemy1[2].src = 'img/enemy1_down2.png';
	imgsEnemy1[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[3] = new Image();
	imgsEnemy1[3].src = 'img/enemy1_down3.png';
	imgsEnemy1[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[4] = new Image();
	imgsEnemy1[4].src = 'img/enemy1_down4.png';
	imgsEnemy1[4].onload = function(){
		progress+=3;
		drawProgress();
	}

	//敌机2
	imgsEnemy2[0] = new Image();
	imgsEnemy2[0].src = 'img/enemy2.png';
	imgsEnemy2[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[1] = new Image();
	imgsEnemy2[1].src = 'img/enemy2_down1.png';
	imgsEnemy2[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[2] = new Image();
	imgsEnemy2[2].src = 'img/enemy2_down2.png';
	imgsEnemy2[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[3] = new Image();
	imgsEnemy2[3].src = 'img/enemy2_down3.png';
	imgsEnemy2[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[4] = new Image();
	imgsEnemy2[4].src = 'img/enemy2_down4.png';
	imgsEnemy2[4].onload = function(){
		progress+=3;
		drawProgress();
	}

	//敌机3
	
	imgsEnemy3[3] = new Image();
	imgsEnemy3[3].src = 'img/enemy3_down1.png';
	imgsEnemy3[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[4] = new Image();
	imgsEnemy3[4].src = 'img/enemy3_down2.png';
	imgsEnemy3[4].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[5] = new Image();
	imgsEnemy3[5].src = 'img/enemy3_down3.png';
	imgsEnemy3[5].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[6] = new Image();
	imgsEnemy3[6].src = 'img/enemy3_down4.png';
	imgsEnemy3[6].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[7] = new Image();
	imgsEnemy3[7].src = 'img/enemy3_down5.png';
	imgsEnemy3[7].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[5] = new Image();
	imgsEnemy3[5].src = 'img/enemy3_down6.png';
	imgsEnemy3[5].onload = function(){
		progress+=3;
		drawProgress();
	}

	//boos机器被打 图  和 1 号  2号
	imgsEnemy3[2] = new Image();
	imgsEnemy3[2].src = 'img/enemy3_hit.png';
	imgsEnemy3[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[0] = new Image();
	imgsEnemy3[0].src = 'img/enemy3_n1.png';
	imgsEnemy3[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[1] = new Image();
	imgsEnemy3[1].src = 'img/enemy3_n2.png';
	imgsEnemy3[1].onload = function(){
		progress+=3;
		drawProgress();
	}

	//gameloading图片加载
	 imgsGameLoading[0]= new Image();
	 imgsGameLoading[0].src = 'img/game_loading1.png';
	 imgsGameLoading[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[1] = new Image();
	imgsGameLoading[1].src = 'img/game_loading2.png';
	imgsGameLoading[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[2] = new Image();
	 imgsGameLoading[2].src = 'img/game_loading3.png';
	 imgsGameLoading[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[3] = new Image();
	 imgsGameLoading[3].src = 'img/game_loading4.png';
	 imgsGameLoading[3].onload = function(){
		progress+=3;
		drawProgress();
	}

	//	暂停
	imgGamePauseNor = new Image();
	imgGamePauseNor.src = 'img/game_pause_nor.png';
	imgGamePauseNor.onload = function(){
		progress+=3;
		drawProgress();
	}

	//游戏开始图
	imgStart = new Image();
	imgStart.src = 'img/start.png';
	imgStart.onload = function(){
		progress+=3;
		drawProgress();
	}

	

	//英雄机器爆炸
	imgsHero[2] = new Image();
	imgsHero[2].src = 'img/hero_blowup_n1.png';
	imgsHero[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[3] = new Image();
	imgsHero[3].src = 'img/hero_blowup_n2.png';
	imgsHero[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[4] = new Image();
	imgsHero[4].src = 'img/hero_blowup_n3.png';
	imgsHero[4].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[5] = new Image();
	imgsHero[5].src = 'img/hero_blowup_n4.png';
	imgsHero[5].onload = function(){
		progress+=3;
		drawProgress();
	}
//	英雄级2个
	imgsHero[0] = new Image();
	imgsHero[0].src = 'img/hero1.png';
	imgsHero[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[1] = new Image();
	imgsHero[1].src = 'img/hero2.png';
	imgsHero[1].onload = function(){
		progress+=3;
		drawProgress();
	}
}
//阶段2：就绪；
function startGame(){
	
}
//阶段3：加载中

//阶段4：游戏进行中；

//阶段5：游戏暂停


/*
/////////////******************所有图片对象

var imgBackground;
var imgBullet1;
var imgEnemy1;
var imgEnemy1Down1;
var imgEnemy1Down2;
var imgEnemy1Down3;
var imgEnemy1Down4;
var imgEnemy2;
var imgEnemy2Down1;
var imgEnemy2Down2
var imgEnemy2Down3
var imgEnemy2Down4;
var imgEnemy3Down1;
var imgEnemy3Down2;
var imgEnemy3Down3;
var imgEnemy3Down4;
var imgEnemy3Down5;
var imgEnemy3Down6;
var imgEnemy3Hit;
var imgEnemy3N1
var imgEnemy3N2
var imgGameLoading1;
var imgGameLoading2;
var imgGameLoading3;
var imgGameLoading4;
var imgGamePauseNor;
var imgHeroBlowupN1;
var imgHeroBlowupN2;
var imgHeroBlowupN3;
var imgHeroBlowupN4;
var imgHero1;
var imgHero2;
var imgStart;



var  curPhase=PHASE_DOWNLOAD;  ///当前所处的阶段
download();//开始下载

function download(){
	var progress=0;//下载进度

	function drawProgress(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font='50px SimHei'
		ctx.fillText(progress+'%',200,300   )
	}
//		加载每一个图片然后清除，
	imgBackground=new Image();
	imgBackground.src='img/background.png'
	imgBackground.onload=function(){
		progress+=4;
		drawProgress()
	}
	imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress+=3;
		drawProgress();
	}

	//敌机1
	imgEnemy1 = new Image();
	imgEnemy1.src = 'img/enemy1.png';
	imgEnemy1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy1Down1 = new Image();
	imgEnemy1Down1.src = 'img/enemy1_down1.png';
	imgEnemy1Down1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy1Down2 = new Image();
	imgEnemy1Down2.src = 'img/enemy1_down2.png';
	imgEnemy1Down2.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy1Down3 = new Image();
	imgEnemy1Down3.src = 'img/enemy1_down3.png';
	imgEnemy1Down3.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy1Down4 = new Image();
	imgEnemy1Down4.src = 'img/enemy1_down4.png';
	imgEnemy1Down4.onload = function(){
		progress+=3;
		drawProgress();
	}

	//敌机2
	imgEnemy2 = new Image();
	imgEnemy2.src = 'img/enemy2.png';
	imgEnemy2.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy2Down1 = new Image();
	imgEnemy2Down1.src = 'img/enemy2_down1.png';
	imgEnemy2Down1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy2Down2 = new Image();
	imgEnemy2Down2.src = 'img/enemy2_down2.png';
	imgEnemy2Down2.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy2Down3 = new Image();
	imgEnemy2Down3.src = 'img/enemy2_down3.png';
	imgEnemy2Down3.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy2Down4 = new Image();
	imgEnemy2Down4.src = 'img/enemy2_down4.png';
	imgEnemy2Down4.onload = function(){
		progress+=3;
		drawProgress();
	}

	//敌机3
	
	imgEnemy3Down1 = new Image();
	imgEnemy3Down1.src = 'img/enemy3_down1.png';
	imgEnemy3Down1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3Down2 = new Image();
	imgEnemy3Down2.src = 'img/enemy3_down2.png';
	imgEnemy3Down2.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3Down3 = new Image();
	imgEnemy3Down3.src = 'img/enemy3_down3.png';
	imgEnemy3Down3.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3Down4 = new Image();
	imgEnemy3Down4.src = 'img/enemy3_down4.png';
	imgEnemy3Down4.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3Down5 = new Image();
	imgEnemy3Down5.src = 'img/enemy3_down5.png';
	imgEnemy3Down5.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3Down6 = new Image();
	imgEnemy3Down6.src = 'img/enemy3_down6.png';
	imgEnemy3Down6.onload = function(){
		progress+=3;
		drawProgress();
	}
	
	//boos机器被打 图  和 1 号  2号
	imgEnemy3Hit = new Image();
	imgEnemy3Hit.src = 'img/enemy3_hit.png';
	imgEnemy3Hit.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3N1 = new Image();
	imgEnemy3N1.src = 'img/enemy3_n1.png';
	imgEnemy3N1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgEnemy3N2 = new Image();
	imgEnemy3N2.src = 'img/enemy3_n2.png';
	imgEnemy3N2.onload = function(){
		progress+=3;
		drawProgress();
	}

	//gameloading图片加载
	 imgGameLoading1 = new Image();
	 imgGameLoading1.src = 'img/game_loading1.png';
	 imgGameLoading1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgGameLoading2 = new Image();
	 imgGameLoading2.src = 'img/game_loading2.png';
	 imgGameLoading2.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgGameLoading3 = new Image();
	 imgGameLoading3.src = 'img/game_loading3.png';
	 imgGameLoading3.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgGameLoading4 = new Image();
	 imgGameLoading4.src = 'img/game_loading4.png';
	 imgGameLoading4.onload = function(){
		progress+=3;
		drawProgress();
	}

//	暂停
	imgGamePauseNor = new Image();
	imgGamePauseNor.src = 'img/game_pause_nor.png';
	imgGamePauseNor.onload = function(){
		progress+=3;
		drawProgress();
	}

	//游戏开始图
	imgStart = new Image();
	imgStart.src = 'img/start.png';
	imgStart.onload = function(){
		progress+=3;
		drawProgress();
	}
//英雄机器爆炸
	imgHeroBlowupN1 = new Image();
	imgHeroBlowupN1.src = 'img/hero_blowup_n1.png';
	imgHeroBlowupN1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgHeroBlowupN2 = new Image();
	imgHeroBlowupN2.src = 'img/hero_blowup_n2.png';
	imgHeroBlowupN2.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgHeroBlowupN3 = new Image();
	imgHeroBlowupN3.src = 'img/hero_blowup_n3.png';
	imgHeroBlowupN3.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgHeroBlowupN4 = new Image();
	imgHeroBlowupN4.src = 'img/hero_blowup_n4.png';
	imgHeroBlowupN4.onload = function(){
		progress+=3;
		drawProgress();
	}
//	英雄级2个
	imgHero1 = new Image();
	imgHero1.src = 'img/hero1.png';
	imgHero1.onload = function(){
		progress+=3;
		drawProgress();
	}
	imgHero2 = new Image();
	imgHero2.src = 'img/hero2.png';
	imgHero2.onload = function(){
		progress+=3;
		drawProgress();
	}


}
*/