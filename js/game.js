;(function(){
				function Game(scoreSelector,timeSelector,timeNum){
				this.speed = 5;//默认速度
				this.score = 0;//默认分数
				this.scoreEl = document.querySelector(scoreSelector);//分数选择器
				this.time = document.querySelector(timeSelector);//倒计时
				this.monster = [{
			    	x: this.myRandom(35,160),
			    	y: -50,
			    	img: "img/aixin.png",
			    	speed: this.speed,
			    	type: 1
			    },{
			    	x: this.myRandom(260,420),
			    	y: -50,
			    	img: "img/boom.png",
			    	speed: this.speed,
			    	type: 0
			    },{
			    	x: this.myRandom(520,570),
			    	y: -150,
			    	img: "img/aixin.png",
			    	speed: this.speed,
			    	type: 1
			    },{
			    	x: this.myRandom(35,120),
			    	y: -300,
			    	img: "img/boom.png",
			    	speed: this.speed,
			    	type: 0
			    },{
			    	x: this.myRandom(220,380),
			    	y: -400,
			    	img: "img/aixin.png",
			    	speed: this.speed,
			    	type: 1
			    },{
			    	x: this.myRandom(480,570),
			    	y: -450,
			    	img: "img/boom.png",
			    	speed: this.speed,
			    	type: 0
			    },
			    
			    {
			    	x: this.myRandom(35,160),
			    	y: -600,
			    	img: "img/aixin.png",
			    	speed: this.speed,
			    	type: 1
			    },{
			    	x: this.myRandom(260,420),
			    	y: -700,
			    	img: "img/boom.png",
			    	speed: this.speed,
			    	type: 0
			    },{
			    	x: this.myRandom(520,570),
			    	y: -800,
			    	img: "img/aixin.png",
			    	speed: this.speed,
			    	type: 1
			    },{
			    	x: this.myRandom(35,120),
			    	y: -800,
			    	img: "img/boom.png",
			    	speed: this.speed,
			    	type: 0
			    }
			    ];//定义掉落物体品每次10个
			    this.canEle = document.getElementById("canEle");//canvas画布
			    this.canW = 640;
			    this.canH = 1040;
			    this.stage = new createjs.Stage("canEle");
			    this.mancontainer = new createjs.Container();
			    this.score10 = new createjs.Bitmap("img/socre10.png");
			    this.man = new createjs.Bitmap("img/lanzi_boy2.png");;
			    this.mon = [];
			    this.countdown = null;
			    this.timenum = timeNum || 30;
			}
			
			Game.prototype = {
				//初始化
				init: function(){
					this.canEle.width = this.canW;
					this.canEle.height = this.canH;

					createjs.Ticker.timingMode = createjs.Ticker.RAF;
					createjs.Touch.enable(this.stage);
					createjs.Ticker.paused = false;			
	    			this.scoreEl.innerText = 0;
	    			$(".againBtn").fadeOut();
	    			this.drawMan();
	    			this.drawScore10();
	    			this.drawMonster();
	    			this.countDown(this.timenum)
				},
				myRandom: function(min,max){
			    	var cho = max - min + 1;
			    	return Math.floor(Math.random() * cho + min)
			   	},
			   	drawMan: function(){
			   		
			   		this.mancontainer.setBounds(0,0,154,273);
			   		//这个是注册点，这里我是以容器的中心为注册点，便于计算碰撞
				    this.mancontainer.regX = 77;
				    this.mancontainer.regY = 136.5;
				    this.mancontainer.x = 320;
				    this.mancontainer.y = 900;
				    
				    this.man.x = 0;
				    this.man.y = 0;
				    
				    this.mancontainer.addChild(this.man)
			   		this.stage.addChild(this.mancontainer);
			   		this.bindMove();
			   		
			   	},
			   	drawScore10: function(){
			   		this.score10.x = 70;
			   		this.score10.y = 40;
			   		this.score10.alpha = 0;
			   		this.mancontainer.addChild(this.score10);
			   	},
			   	countDown: function(num){
			   		var that = this;
			   		num -= 1;
			   		if(num < 0){
			   			that.gameOver();
			   		}else{
			   			that.countdown = setTimeout(function () {
		                    that.countDown(num);
		                    that.time.innerText = num + '秒';
		                }, 1000);
			   		}
			   	},
			   	drawMonster: function(){
			   		var i, len = this.monster.length;
			   		var that = this;
			   		for (i = 0;i < len;i++) {
			   			if(that.monster[i].type == 0){
				    		that.mon[i] = new createjs.Bitmap(that.monster[i].img);
					    	that.mon[i].x = that.monster[i].x;
					    	that.mon[i].y = that.monster[i].y;
					    	//这里的注册点也是以每个图片的中心
					    	that.mon[i].regX = 35;
					    	that.mon[i].regY = 44;
				    	}else{
				    		that.mon[i] = new createjs.Bitmap(that.monster[i].img);
					    	that.mon[i].x = that.monster[i].x;
					    	that.mon[i].y = that.monster[i].y;
					    	that.mon[i].regX = 35;
					    	that.mon[i].regY = 30.5;
				    	}
				    	that.mon[i].prop = that.monster[i];
					    that.stage.addChild(that.mon[i]);
			   		}
			   		
			   		createjs.Ticker.addEventListener("tick", handleTick);
			   		
			   		function handleTick(event) {
				     	//圆圈将移动10个单位的权利。
				     	var i, len = that.monster.length;

				     	if(!event.paused){
				     		that.changeSpeed();
				     		for (i = 0;i < len;i++) {
				     			that.mon[i].y += that.speed;
						     	if(that.mon[i].y >= 1000){
						     		that.mon[i].x = that.mon[i].prop.x;
						     		that.mon[i].y = that.mon[i].prop.y;
						     	}
						     	
						     	//这里分为两种情况一个是炸弹一个是爱心
						     	if(that.mon[i].prop.type == 0){
						     		//这是炸弹
						     		//这里是计算是否碰撞，原理就是两个物体的x或y距离小于两个物体的宽之和的一半或高之和的一半；这里我并没有小于一半而是减少了，因为要掉到篮子里才算碰撞
						     		if(Math.abs(that.mancontainer.y - that.mon[i].y) <= 100.5 && Math.abs(that.mancontainer.x - that.mon[i].x) <= 105){
										
						     			that.mon[i].x = that.mon[i].prop.x;
						     			that.mon[i].y = that.mon[i].prop.y;
						     			that.gameOver()
						     		}
						     	}else{
						     		//这是爱心
						     		//原理同上
						     		if(Math.abs(that.mancontainer.y - that.mon[i].y) <= 67 && Math.abs(that.mancontainer.x - that.mon[i].x) <= 105){
				
										that.score = that.score + 10;
										createjs.Tween.get(that.score10).to({alpha:1}).wait(200).set({alpha:0})
										that.scoreEl.textContent = that.score;
						     			that.mon[i].x = that.mon[i].prop.x;
						     			that.mon[i].y = that.mon[i].prop.y;
				
						     		}
						     	}
				     		}
				     		
					        that.stage.update();
				     	}
			   		}
			   		this.handleTick = handleTick;
			   	},
			   	bindMove: function(){
			   			this.man.addEventListener("mousedown",function(e){
					    	console.log(e);
					    	var target = e.target;
					    	var parent = e.target.parent;
					    	target.first = {x: e.stageX - parent.x}
					    })
				     	this.man.addEventListener("pressmove",function(e){
							var target = e.target;
					    	var parent = e.target.parent;
					    	if(e.stageX - target.first.x - 80<=0){
				//				console.log('left')
							}else if(e.stageX - target.first.x + 60>=640){
				//				console.log('right')
							}else{
								parent.x = e.stageX - target.first.x; 
					    		target.first = {x: e.stageX - parent.x}
							}
					    	
						})
			   	},
			   	changeSpeed: function(){
			   		if(this.score > 50 && this.score <= 100){
						this.speed = 6;
					}else if(this.score > 100 && this.score <= 200){
						this.speed = 7;
					}else if(this.score > 200 && this.score <= 300){
						this.speed = 8;
					}else if(this.score > 300 && this.score <= 400){
						this.speed = 9;
					}else if(this.score > 400 && this.score <= 500){
						this.speed = 10;
					}else if(this.score > 500 && this.score <= 600){
						this.speed = 11;
					}else if(this.score > 600 && this.score <= 700){
						this.speed = 12;
					}else if(this.score > 700 && this.score <= 800){
						this.speed = 13;
					}else if(this.score > 800 && this.score <= 900){
						this.speed = 14;
					}else if(this.score > 900){
						this.speed = 16;
					}
			   	},
			   	gameOver: function(){
			   		createjs.Ticker.paused = true;
			   		this.stage.removeAllChildren();
			   		createjs.Ticker.removeEventListener("tick", this.handleTick);
	     			
	     			this.stage.update();
	     			$(".gameoverOutWrapper").fadeIn();
	     			$(".scoreNum").text(this.score);
	     			clearTimeout(this.countdown);
//	     			this.countdown = null;
	     			this.speed = 5;//默认速度
					this.score = 0;//默认分数

			   	}
			   	
			};
			window.Game = Game;
			})();
		