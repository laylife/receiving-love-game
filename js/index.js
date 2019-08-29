// JavaScript Document
//escape   unescape
$(window).load(function(e) {
	//缓存全局变量
	var win = window,
		doc = document;
		
		
		var hh = window.innerHeight;
		$("#main").attr('view-height',hh)
		$("#main").height(hh)
	//跳到第二页
	H5Init({
		pageAnimateType: 'fade',//fade 渐隐渐现翻页   translate 位移翻页 threeD  三d翻页
		//scale : window.innerHeight<1008?window.innerHeight/1008:1,  //此参数 作废

		//滑动翻页控制
		// 0 代表可上翻  也可以下翻   1 代表只可下翻    -1代表只可以上翻   false 代表不可以滑动翻页
		pageSwipeB : {
			'0':false,//
			'1':false,
			'2':false,
			'3':false,
			'4':false,
			'5':false,
			'6':false,
		},
	});
	
	//获取当期日期
	var dat = new Date();
	var m = dat.getMonth()+1;
	var d = dat.getDate();
	
	//添加背景音乐
	var audioEle = J.addMp4({
		src:'http://mat1.gtimg.com/hn/cp/lol/20190306haier/haier_music.mp3',
		autoplay:true,//音乐是否自动播放
		loop:true//是否循环播放
	});
//	
	var canLottery = false;
	
//	给背景音乐添加一个按钮
	J.setMp4Btn({
		audioBtn:document.getElementById('micBtn'),
		audioEle:audioEle,
		autoplay:true
	});
	//以下是为了兼容ios自动播放音乐
	document.addEventListener("WeixinJSBridgeReady", function () {  
		audioEle.play();
		$('#micBtn').addClass('show');
	}, false);  
	document.addEventListener('YixinJSBridgeReady', function() {  
		audioEle.play();
		$('#micBtn').addClass('show');
	}, false); 
//	
	audioEle.play();
	$('#micBtn').addClass('show');
	J.pageFunc(1);
//是否已经报名
var isSubmit = false;

	//关闭页面下拉露出网页来源
	JSeasy.setScroll(false)//
	
	var assets = {
		other : [
			{id : "1", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/cj_after.png",fl: 'other'},
			{id : "2", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/earth.png",fl: 'other'},
			{id : "3", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/kt_2.png",fl: 'other'},
			{id : "4", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/lottery_tc.png",fl: 'other'},
			{id : "5", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/p1bg.jpg",fl: 'other'},
			{id : "6", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/p2_room.png",fl: 'other'},
			{id : "7", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/p2bg.jpg",fl: 'other'},
			{id : "8", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/p3bg.jpg",fl: 'other'},
			{id : "9", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/share_tip.png",fl: 'other'},
			{id : "10", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/sm.png",fl: 'other'},
			{id : "11", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/sm_yz.png",fl: 'other'},
			{id : "12", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/sunshine.png",fl: 'other'},
			{id : "13", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/wumai.png",fl: 'other'},
			{id : "14", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/wzj_tc.png",fl: 'other'},
			{id : "15", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/zj_tc.png",fl: 'other'},
			{id : "16", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/zs_btn.png",fl: 'other'},
			{id : "17", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/jh_btn.png",fl: 'other'},
			{id : "18", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/kw_btn.png",fl: 'other'},
			{id : "19", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/cj_btn.png",fl: 'other'},
			{id : "20", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/djq.png",fl: 'other'},
			{id : "21", src : "http://mat1.gtimg.com/hn/cp/lol/20190306haier/P0BG.jpg",fl: 'other'}
			
		]
	},
	assets_ = {
		other : {},
		sprite : {}//所有序列帧
	};
	
	$("input").blur(function(){
		$('body').scrollTop(0);
	});
	var loader = new createjs.LoadQueue(false),
			loadSpeed = 100/assets.other.length,///每张图所占的进度
			loadNum = 1;
		loader.addEventListener("fileload", function(event){
			loadNum += loadSpeed;
			var item = event.item;
			assets_.other[event.item.id] = event.result;
			$(".loadBg").text(parseInt(loadNum)+"%");
		});
		loader.addEventListener("complete", function(event){

		});
		loader.loadManifest(assets.other);
		
		
			
		
		
		
		
		
		window.shareData = { // 微信分享词
				"imgUrl": "http://mat1.gtimg.com/hn/cp/lol/20190306haier/haier_share.jpg", //分享图片
				"tLink": "http://qqmf.daxiangw.com/h5/y19/haierTree20190305/index.html", //分享的链接, 不填默认是当前页面
				"tTitle": "点我，带你开始地球环保之旅！",
				"tContent": "新鲜空气，美好生活，海尔与你共守护",
				"tTimeline": "点我，带你开始地球环保之旅！",
				"wasShare": function() { /*alert('分享成功');*/
					
//					TweenMax.to(".sunshine", 1, {opacity:1,delay:1,onComplete:function(){
//						
//					}});
					
				
				}, //分享成功的回调函数
				// "disableShare": '1',  //禁用分享, 不填默认为false
			}


});


   





