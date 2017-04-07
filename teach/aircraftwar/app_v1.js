/**全局变量**/
var canvasWidth = 480;	//画布的宽
var canvasHeight = 650;	//画布的高

var canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

const PHASE_DOWNLOAD = 1;	//图片下载阶段
const PHASE_READY = 2;		//就绪阶段
const PHASE_LOADING = 3;	//游戏加载阶段
const PHASE_PLAY = 4;		//游戏进行阶段
const PHASE_PAUSE = 5;		//游戏暂停阶段
const PHASE_GAMEOVER = 6;	//游戏结束阶段

////所有的图片对象
var imgBackground;
var imgBullet1;
var imgEnemy1;
var imgEnemy1Down1;

var curPhase = PHASE_DOWNLOAD;	//当前所处的阶段
download();  //开始下载图片

function download(){
	var progress = 0;  //下载进度
	function drawProgress(){
		//ctx.clearRect
		ctx.fillText(progress, xxx, yyyy);
	}

	imgBackground = new Image();
	imgBackground.src = 'img/background.png';
	imgBackground.onload = function(){
		progress+=4;
		drawProgress();
	}
	imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress+=3;
		drawProgress();
	}
	//........
}