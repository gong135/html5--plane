//全局变量
var canvasWidth=480;//画布宽
var canvasHeight=650;//画布高
var  heroCount=3;
var heroScore=0;

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
//*************************8阶段2：就绪；
var sky; //天空对象
var logo
function startGame(){
	curPhase=PHASE_READY
	sky=new Sky(imgBackground)//创建天空对象
	logo=new Logo(imgStart)
	startEngine();//启动整个游戏的主引擎

//	当用户点击画布，进入下一个阶段
	canvas.onclick=function(){
		if(curPhase===PHASE_READY){
			curPhase=PHASE_LOADING
			loading=new Loading(imgsGameLoading)
		}
	}
}
//	天空的构造函数-------使用两张图片的轮换
function  Sky(img){
	this.x1=0;  //初始时第一张图片
	this.y1=0;
	this.x2=0; //初始时第二张图片
	this.y2=-img.height;
	this.draw=function(){
		ctx.drawImage(img,this.x1,this.y1)
		ctx.drawImage(img,this.x2,this.y2)
	}
	this.move=function(){
		this.y1++;
		this.y2++;
		if (this.y1>=canvasHeight)
		{
			this.y1=this.y2-img.height;
		}
		if (this.y2>=canvasHeight)
		{
			this.y2=this.y1-img.height;
		}

	}
}
// 游戏的主LOGO
function Logo(img){
	this.x=0;
	this.y=0;
	
	this.draw=function(){
		ctx.drawImage(img,this.x+40,this.y)
	}
}
//******************//阶段3：加载中
var loading
function Loading(imgs){
	
	this.x=0;
	this.y=canvasHeight-imgs[0].height;
	this.index=0;//当前要绘制的是数组的中的第几张
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.counter=0;//记录move调用次数
	this.move=function(){
		this.counter++;
		if (this.counter%8===0)
		{
				this.index++;
				if (this.index>=imgs.length)
			{
				curPhase=PHASE_PLAY
				//进入游戏创建我方机器
				hero=new Hero(imgsHero)
				bullet=new Bullet(imgBullet1)
				bulletList=new BulletList()
				enemyList=new EnemyList()
			}
		}
	
	}
}

//************************阶段4：游戏进行中；
//绘制当前分
function drawStat() {
    ctx.font = "25px Helvetica";
    ctx.fillStyle = '#333';
    //绘制当前的游戏得分
    var score = 'SCORE:'+heroScore;
	console.log(score)
    ctx.fillText(score,10,35);
	
    //绘制剩余英雄数量
    var heros = 'HEROS:' + heroCount;
    var w = ctx.measureText(heros).width;
    ctx.fillText(heros,canvasWidth-w-10,35);
}
var hero;//不能用new
//我方飞机
function Hero(imgs){
	this.x=canvasWidth/2-imgs[0].width/2
	this.y=canvasHeight-imgs[0].height
	this.width=imgs[0].width;
	this.height=imgs[0].height
	this.index=0;//待绘制的是数组中那张图片
	this.crashed=false;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.counter=0
	this.move=function(){
		this.counter++
		if (this.counter%3===0)
		{
			if (!this.crashed)
			{
				if (this.index===0)
				{this.index=1
				}else if(this.index===1){this.index=0}
			}else{//开始撞毁程序
				if (this.index===0||this.index===1)
				{
					this.index=2
				}else if (this.index<imgs.length-1)
				{
						this.index++;
				}else{//撞毁结束
				heroCount--;
				if (heroCount>0)
					{
						hero=new Hero(imgsHero)
					}else{curPhase=PHASE_GAMEOVER}
					
				}
			}
		}
		//边移动发发射子弹
		if (this.counter%4===0)//此处指定每秒子弹发射的间隔时间
		{
			this.fire();
		}
	}
	//发射子弹
	this.fire=function(){
		var b=new  Bullet(imgBullet1);
		bulletList.add(b);
	}
}
canvas.onmousemove=function(event){
	if (curPhase==PHASE_PLAY)
	{
		var x=event.offsetX;
		var y=event.offsetY;

		hero.x=x-imgsHero[0].width/2
		hero.y=y-imgsHero[0].height/2
		
	}
}
////子弹内容、、、、、
var bullet
function Bullet(img){
	//子弹初始坐标
	this.x=hero.x+(imgsHero[0].width/2-img.width/2)
	this.y=hero.y-img.height
	this.width=img.width;
	this.height=img.height
	this.removeable=false //当前子弹是否删除
	this.draw=function(){
		ctx.drawImage(img,this.x+20,this.y)
		ctx.drawImage(img,this.x,this.y)
		ctx.drawImage(img,this.x-20,this.y)
		
	}
	this.move=function(){
		this.y-=20;//此处数字指定子弹移动速度
		if (this.y<=-img.height)
		{
			this.removeable=true
		}
	}
}

//、、、、子弹列表对象，其中保存着当前所有子弹

var bulletList;
function BulletList(){
	this.arr=[];//画布上的子弹
	this.add=function(bullet){
		this.arr.push(bullet)
	}
	this.remove=function(i){
		this.arr.splice(i,1)
	}
	this.draw=function(){
		for (var i in this.arr )
		{
			this.arr[i].draw();
		}
	}
	this.move = function() {
        for(var i in this.arr) {
            this.arr[i].move();
            if(this.arr[i].removable) {
                this.remove(i);
            }
        }
    }
}
///////////版本增加/////////////////
//小号敌机
function Enemy1(imgs){
	this.x=Math.random()*(canvasWidth-imgs[0].width)
	this.y=-imgs[0].height
	this.width=imgs[0].width;
	this.height=imgs[0].height
	this.index=0;//当前绘制敌机在数组中的下标
	this.speed=10;
	this.blood=1;//小飞机1血
	this.removeable=false //可以删除？？
	this.crashed=false; //被撞毁了？？
	this.counter=0
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.move=function(){
		this.y+=this.speed;
		this.counter++;
		this.checkHit();//碰撞检查
//		若飞出下边界或者炸毁就可以删除
		if (this.crashed&&this.counter%4===0)
		{
			if (this.index===0){this.index=1
			}else if (this.inxde<imgs.length-1)
			{this.index++}else{
				this.removeable=true
			}
		}
		if (this.y>=canvasHeight)
		{
			this.removeable=true
		}
	}
	////碰撞检查
	this.checkHit=function(){
		//每个敌机和我方灭个子弹碰撞检验
		for (var i in bulletList.arr)
		{
			var b=bulletList.arr[i];
			if ((this.x+this.width>=b.x)&&(b.x+b.width>=this.x)&&(this.y+this.height>=b.y)&&(b.y+b.height>=this.y))
			{
				this.blood--;
				b.removeable=true;
				if (this.blood<=0)//没有血格格 
				{
					this.crashed=true;
					heroScore+=5
				}
				
			}
		}
		//灭个敌机必须和我方英雄碰撞
		if ((this.x+this.width>=hero.x)&&(hero.x+hero.width>=this.x)&&(this.y+this.height>=hero.y)&&(hero.y+hero.height>=this.y))
		{
			hero.crashed=true;
		}
	}
}
///中号
function Enemy2(imgs){
	this.x=Math.random()*(canvasWidth-imgs[0].width)
	this.y=-imgs[0].height
	this.width=imgs[0].width;
	this.height=imgs[0].height
	this.index=0;//当前绘制敌机在数组中的下标
	this.speed=6;
	this.removeable=false //可以删除？？
	this.blood=5;//zhong飞机5血

	this.crashed=false; //被撞毁了？？
	this.counter=0
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.move=function(){
		this.y+=this.speed;
		this.counter++;
		this.checkHit();//碰撞检查
//		若飞出下边界或者炸毁就可以删除
		if (this.crashed&&this.counter%3===0)
		{
			if (this.index===0){this.index=1
			}else if (this.inxde<imgs.length-1)
			{this.index++}else{
				this.removeable=true
			}
		}
		if (this.y>=canvasHeight)
		{
			this.removeable=true
		}
	}
	this.checkHit=function(){
		//每个敌机和我方灭个子弹碰撞检验
		for (var i in bulletList.arr)
		{
			var b=bulletList.arr[i];
			if ((this.x+this.width>=b.x)&&(b.x+b.width>=this.x)&&(this.y+this.height>=b.y)&&(b.y+b.height>=this.y))
			{
				this.blood--;
				
				if (this.blood<=0)//没有血格格 
				{
					this.crashed=true;
				
				}
				b.removeable=true;
			}
		}
		//灭个敌机必须和我方英雄碰撞
		if ((this.x+this.width>=hero.x)&&(hero.x+hero.width>=this.x)&&(this.y+this.height>=hero.y)&&(hero.y+hero.height>=this.y))
		{
			hero.crashed=true;
			heroScore+=10
		}
	}
}
///大号

function Enemy3(imgs){
	this.x=Math.random()*(canvasWidth-imgs[0].width)
	this.y=-imgs[0].height
	this.width=imgs[0].width;
	this.height=imgs[0].height
	this.index=0;//当前绘制敌机在数组中的下标
	this.speed=3;
	this.removeable=false //可以删除？？
	this.blood=20;//大飞机20血

	this.crashed=false; //被撞毁了？？
	this.counter=0
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.counter=0;//move函数被调用
	this.move=function(){
		this.counter++;
		this.checkHit();//碰撞检查
		this.y+=this.speed;
		if (this.counter%2===0){
			if (!this.crashed)
			{
				if (this.index===0){this.index=1}
			else if (this.index===1){this.index=0}
			}else{
				if (this.index===0||this.index===1){this.index=3
				}else if (this.index<imgs.length-1)
				{this.index++;
				}else{this.removeable=true;heroScore+=50}
			}
			
		}
//		若飞出下边界或者炸毁就可以删除
		if (this.y>=canvasHeight)
			{this.removeable=true}
	}
	this.checkHit=function(){
		//每个敌机和我方灭个子弹碰撞检验
		for (var i in bulletList.arr)
		{
			var b=bulletList.arr[i];
			if ((this.x+this.width>=b.x)&&(b.x+b.width>=this.x)&&(this.y+this.height>=b.y)&&(b.y+b.height>=this.y))
			{
				this.blood--;
				b.removeable=true;
				if (this.blood<=0)//没有血格格 
				{
					this.crashed=true;
				
				}
				
			}
		}
		//灭个敌机必须和我方英雄碰撞
		if ((this.x+this.width>=hero.x)&&(hero.x+hero.width>=this.x)&&(this.y+this.height>=hero.y)&&(hero.y+hero.height>=this.y))
		{
			hero.crashed=true;
		}
	}
}
//所有机器组成列表
var enemyList
function EnemyList(){
	this.arr=[] //保存所有敌机
	this.add=function (enemy){
		this.arr.push(enemy)
	}
	this.remove=function(i){
		this.arr.splice(i,1);
	}
	this.draw=function (){
		for (var  i in this.arr ){
			this.arr[i].draw()
		}
	}
	this.move=function(){//所有敌机移动
		this.generate();//生成新的敌人
		for (var i in this.arr ){
			var e=this.arr[i];
			e.move();
			if (e.removeable)
			{
				this.remove(i)
			}
		}
	}
//	随机生成一个敌机
	this.generate=function(){
//		敌机生成一个要求：
//什么时候生成， 不是定时的或者
//	小号生成概率最大  中号次之 大号最小
/*
	思路：生成1-100随机数，如生成 012345 生成小号敌机  中号 678   大号就是9  其它值不出敌机
*/	
	var num=Math.floor(Math.random()*500)
	if (num<6){
		this.add(new Enemy1(imgsEnemy1))
		}else if (num<9){
		this.add(new Enemy2(imgsEnemy2))
		}else if (num<10){
			this.add(new Enemy3(imgsEnemy3))
		}
	}
}
//************阶段5：游戏暂停
canvas.onmouseout = function() {//鼠标移出
    if(curPhase===PHASE_PLAY) {
        curPhase = PHASE_PAUSE;
    }
};
canvas.onmouseover = function () {//鼠标移入
    if(curPhase===PHASE_PAUSE) {
        curPhase = PHASE_PLAY;
    }
};
function drawPause(){
	var x=canvasWidth/2-imgGamePauseNor.width/2;
	console.log(x)
	var y=canvasHeight/2-imgGamePauseNor.height/2;
	ctx.drawImage(imgGamePauseNor,x,y)
}
//********************阶段6：结束
function drawGameover(){
	ctx.font='90px SemHei';
	ctx.fillStyle='#bbb';
	ctx.fillstroke='#666';
	var txt='GAME OVER';
	var w =ctx.measureText(txt).width;
	var x =canvasWidth/2-w/2;
	var y=canvasHeight/2+45
	ctx.fillText(txt,x,y);
	ctx.strokeText(txt,x,y)
}

/*************游戏主引擎----主定时器*****************/
function startEngine(){

	setInterval(function(){
		sky.draw();
		sky.move();
		switch(curPhase){
			case PHASE_READY:
			     logo.draw();
				 break;
			case PHASE_LOADING:
				loading.draw();
				loading.move()
				break;
			case PHASE_PLAY:
				hero.draw();
				hero.move()
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();

				drawStat()
				break;
			case PHASE_PAUSE:
				hero.draw();
				bulletList.draw();
				enemyList.draw();
				drawStat()
				drawPause()
				break;
			case PHASE_GAMEOVER:
				bulletList.draw();
				enemyList.draw();
				drawGameover()
				break;
		}
	},50)//每一秒20次
}

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