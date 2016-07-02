//每个页面的元素效果



//公共部分
	//header
	$(function(){
		
		$("#header").css("height",function(){
			var hg = $(".swiper-wrapper").height();
			return hg+"px";
		})
		$(".toper").css("top",function(){
			var hg = $(".swiper-wrapper").height();
			return (hg-67)+"px";
		})
		$(".swiper-container").css("width",function(){
			var wid = $("body").width() - $("#header").width()-2;
			return  wid+"px";
		})
		window.onresize=function(){
			$("#header").css("height",function(){
				var hg = $(".swiper-wrapper").height();
				return hg+"px";
			})
			$(".swiper-container").css("width",function(){
				var wid = $("body").width() - $("#header").width()-2;
				return  wid+"px";
			})
		}
		
		//获取当前日期
		function today(){
			var myDate = new Date();
			var dates = myDate.toLocaleDateString();
	//		console.log(dates);	
			if(dates.lastIndexOf("/") == 6){
					var Year = dates.slice(0,4);
					var Month = dates.slice(5,6)
					var Day = dates.slice(7);
			}else if(dates.lastIndexOf("/") == 7){
					var Year = dates.slice(0,4);
					var Month = dates.slice(5,7)
					var Day = dates.slice(8);
			}
			var Days = Year+"年"+Month+"月"+Day+"日";
	//		console.log(Days);
			$(".calendar .myDate").empty().append(Days);
		}
		var time = setInterval(today,1000)
		
		
	})
   
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
 	   	effect : 'fade',
		fade: {
		  crossFade: false,
		},
	    // autoplay : 3000,
		//speed:1000,
        paginationClickable: true,
        spaceBetween: 0,
        keyboardControl: true,
        mousewheelControl : true,
        direction: 'vertical',     
        onSlideChangeStart: function(swiper){  //滑动start判断当前页面  
    		if(mySwiper.activeIndex =="1"){	    			
    			$("#toper").animate({
    				top:0
    			},730);	 
    			
    		}
    		if(mySwiper.activeIndex =="0"){
    			var hg = $(".swiper-wrapper").height(); 
	    		$("#toper").animate({
	    			top:(hg-67)+"px"
	    		},730);

    		}

    	},//滑动start判断当前页面  end
	    onSlideChangeEnd: function(swiper){ //滑动end判断当前页面 start
	     	if(mySwiper.activeIndex =="1"){		 
    			$(".intro b").animate({
    				"margin-left":"0",
    				"opacity":"1",
    				"margin":"0 auto"
    			},500)
    			setTimeout(
    				function(){
	    				$(".intro h2").animate({
	    					"margin-left":"0",
		    				"margin":"0 auto"
		    			},900)},500
		    	)
	    		setTimeout(
	    			function(){
	    				$(".intro p").animate({
	    					"margin-left":"0",
		    				"margin":"0 auto"
		    			},1000)},1000
		    	)
	    		setTimeout(
	    			function(){
	    				$(".intro a").animate({
		    				"margin-left":"0",
			    			"margin":"0 auto"
		    			},1000)},1500
			    )
			    setTimeout(
	    			function(){
	    				$(".intro-cfy").animate({
	    					"opacity":"1"
		    			},1500)},3000
			    )
    		}
	     	//第一	
	     	if(mySwiper.activeIndex =="0"){
	     		function deng(){
					$(".m-page1 .m-img11").fadeIn(1000);
					$(".m-page1 .m-img11").fadeOut(1000);
				}
				setInterval(deng,100);
				
				$(".m-page1 .m-img2").animate({
					left:'+348px',
				},1000);
				$(".m-page1 .m-img3").animate({
					top:'+440px',
				},1000);
	     	}else{
	     		$(".m-page1 .m-img2").animate({
					left:'-500px',
				},0);
				$(".m-page1 .m-img3").delay(100).animate({
					top:'-200px',
				},0);
	     	}
	     	//第二
	     	if(mySwiper.activeIndex =="1"){
     		    $('.m-2-icon4').fadeIn(1000);
     		    $('.m-2-icon2').delay(1000).fadeIn(1000);
     		    $('.m-2-icon5').delay(1000).fadeIn(1000);
     		    $('.m-2-icon8').delay(1000).fadeIn(1000);
     		    $('.m-2-icon11').delay(1000).fadeIn(1000);
     		    $('.m-2-icon14').delay(1000).fadeIn(1000);
     		    $('.m-2-icon17').delay(1000).fadeIn(1000);
     		    $('.m-2-icon1').delay(2000).fadeIn(1000);
     		    $('.m-2-icon6').delay(2000).fadeIn(1000);
     		    $('.m-2-icon9').delay(2000).fadeIn(1000);
     		    $('.m-2-icon12').delay(2000).fadeIn(1000);
     		    $('.m-2-icon15').delay(2000).fadeIn(1000);
     		    $('.m-2-icon18').delay(2000).fadeIn(1000);
     		    $('.m-2-icon3').delay(3000).fadeIn(1000);
     		    $('.m-2-icon7').delay(3000).fadeIn(1000);
     		    $('.m-2-icon10').delay(3000).fadeIn(1000);
     		    $('.m-2-icon13').delay(3000).fadeIn(1000);
     		    $('.m-2-icon16').delay(3000).fadeIn(1000);
     		    $('.m-2-icon19').delay(3000).fadeIn(1000);  
	     	}else{
	     		$('.m-2-icon div').fadeOut('fast');
	     		$('.m-2-icon20').fadeIn('fast');
	     	}
	     	//第三
	     	if(mySwiper.activeIndex =="2"){
	     		$('.m-3-1').fadeIn(1000);
	     		$('.m-3-2 h2').delay(1000).animate({
	     			'margin-top':'10px',
	     		},1000);
	     		$('.m-3-icon15').delay(2000).animate({
	     			'top':'272px',
	     			'left':'426px',
	     		},1000);
	     		$('.m-3-icon1').delay(3000).animate({
	     			'top':'444px',
	     			'left':'120px',			
	     		},1000);
	     		$('.m-3-icon3').delay(3000).animate({
	     			'top':'320px',
	     			'left':'40px',	
	     		},1000);
	     		$('.m-3-icon5').delay(3000).animate({
	     			'top':'179px',
	     			'left':'116px',	
	     		},1000);
	     		$('.m-3-icon7').delay(3000).animate({
	     			'top':'62px',
	     			'left':'441px',	
	     		},1000);
	     		$('.m-3-icon9').delay(3000).animate({
	     			'top':'183px',
	     			'left':'765px',	
	     		},1000);
	     		$('.m-3-icon11').delay(3000).animate({
	     			'top':'328px',
	     			'left':'874px',	
	     		},1000);
	     		$('.m-3-icon13').delay(3000).animate({
	     			'top':'446px',
	     			'left':'762px',	
	     		},1000);
	     		$('.m-3-icon2').delay(4000).animate({
	     			'top':'470px',
	     			'left':'250px',			
	     		},1000);
	     		$('.m-3-icon4').delay(4000).animate({
	     			'top':'373px',
	     			'left':'164px',			
	     		},1000);
	     		$('.m-3-icon6').delay(4000).animate({
	     			'top':'240px',
	     			'left':'244px',			
	     		},1000);
	     		$('.m-3-icon8').delay(4000).animate({
	     			'top':'186px',
	     			'left':'490px',			
	     		},1000);
	     		$('.m-3-icon10').delay(4000).animate({
	     			'top':'243px',
	     			'left':'588px',			
	     		},1000);
	     		$('.m-3-icon12').delay(4000).animate({
	     			'top':'383px',
	     			'left':'606px',			
	     		},1000);
	     		$('.m-3-icon14').delay(4000).animate({
	     			'top':'473px',
	     			'left':'571px',			
	     		},1000);
	     	}else{
	     		$('.m-3-1').fadeOut('fast');
	     		$('.m-3-2 h2').animate({
	     			'margin-top':'-50px',
	     		},0);
	     		$('.m-3-icon15').animate({
	     			'top':'-300px',
	     			'left':'-100px',
	     		},0);
	     		$('.m-3-2 div').animate({
	     			'top':'-300px',
	     			'left':'-100px',
	     		},0);
	     		$('.m-3-r').animate({
	     			'left':'1100px',
	     		},0);
	     	}
	     	//第四
	     	if(mySwiper.activeIndex =="3"){
	     		$('.m-4-1').animate({
	     			'top':'24px',
	     			'left':'254px',
	     		},1000);
	     		$('.m-4-2').animate({
	     			'top':'24px',
	     			'left':'516px',
	     		},1000);
	     		$('.m-4-3').animate({
	     			'top':'168px',
	     			'left':'254px',
	     		},1000);
	     		$('.m-4-4').animate({
	     			'top':'168px',
	     			'left':'516px',
	     		},1000);
	     		$('.page4 a').delay(1000).fadeIn(2000);
	     		$('.m-4-5').delay(3000).fadeIn(2000);
	     		$('.m-4-6').delay(5000).show(500);
	     		$('.m-4-7').delay(5500).show(1000);
	     		$('.m-4-8').delay(6500).show(500);
	     		$('.m-4-9').delay(7000).show(1000);
	     		$('.m-4-10').delay(8000).show(500);
	     	}else{
	     		$('.m-4-1,.m-4-3').animate({
	     			'top':'-100px',
	     			'left':'1220px',
	     		},0);
	     		$('.m-4-2,.m-4-4').animate({
	     			'top':'-100px',
	     			'left':'-300px',
	     		},0);
	     		$('.page4 a').fadeOut('fast');
	     		$('.m-4-5').fadeOut('fast');
	     		$('.m-4-6,.m-4-7,.m-4-8,.m-4-9,.m-4-10').hide('fast');
	     	}
	     	//第五
	     	if(mySwiper.activeIndex =="4"){
	     		$('.page5 h2').animate({
	     			'margin-top':'30px',
	     		},1000);
	     		$('.m-5-1').delay(1000).show(1000);
	     		$('.m-5-2').delay(2000).fadeIn(1000);
	     		$('.m-5-3').delay(3000).fadeIn(1000);
	     		$('.m-5-4').delay(4000).fadeIn(1000);
	     		$('.m-5-5').delay(5000).fadeIn(1000);
	     	}else{
	     		$('.m-5-1').hide('fast');
	     		$('.page5 h2').animate({
	     			'margin-top':'800px',
	     		},0);
	     		$('.m-5-2,.m-5-3,.m-5-4,.m-5-5').fadeOut('fast');
	     	}
	     	//第六
	     	if(mySwiper.activeIndex =="5"){
	     		$('.page6 h2').animate({
	     			'margin-left':'900px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0'
	     			},500);
	     		});
	     		$('.page6 h3').animate({
	     			'margin-left':'-800px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0'
	     			},500);
	     		});
	     		
	     		$('.m6-li1').delay(1000).fadeIn(500);
	     		$('.m6-li1 .m-div1').delay(1500).animate({
	     			'top':'118px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'18px'
	     			},200);
	     		});
	     		$('.m6-li1 .m-div2').delay(2200).animate({
	     			'top':'183px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'83px'
	     			},200);
	     		});
	     		$('.m6-li1 .m-div3').delay(2900).animate({
	     			'top':'280px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'180px'
	     			},200);
	     		});
	     		$('.m6-li1 .m-div4').delay(3600).animate({
	     			'top':'348px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'248px'
	     			},200);
	     		});
	     		$('.m6-li2').delay(4300).fadeIn(500);
	     		$('.m6-li2 .m-div1').delay(4800).animate({
	     			'top':'118px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'18px'
	     			},200);
	     		});
	     		$('.m6-li2 .m-div2').delay(5500).animate({
	     			'top':'183px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'83px'
	     			},200);
	     		});
	     		$('.m6-li2 .m-div3').delay(6200).animate({
	     			'top':'280px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'180px'
	     			},200);
	     		});
	     		$('.m6-li2 .m-div4').delay(6900).animate({
	     			'top':'348px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'248px'
	     			},200);
	     		});
	     		$('.m6-li3').delay(7600).fadeIn(500);
	     		$('.m6-li3 .m-div1').delay(8100).animate({
	     			'top':'118px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'18px'
	     			},200);
	     		});
	     		$('.m6-li3 .m-div2').delay(8800).animate({
	     			'top':'183px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'83px'
	     			},200);
	     		});
	     		$('.m6-li3 .m-div3').delay(9500).animate({
	     			'top':'280px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'180px'
	     			},200);
	     		});
	     		$('.m6-li3 .m-div4').delay(10200).animate({
	     			'top':'348px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'248px'
	     			},200);
	     		});
	     	}else{
	     		$('.page6 h2').animate({
	     			'margin-left':'-1300px',
	     		});
	     		$('.page6 h3').animate({
	     			'margin-left':'1300px',
	     		});
	     		$('.m-6-1 li').fadeOut('fast');
	     		$('.m-6-1 .m-div1,.m-6-1 .m-div2,.m-6-1 .m-div3,.m-6-1 .m-div4').animate({
	     			'top':'-500px',
	     		},0);
	     	}
	     	//第7
	     	if(mySwiper.activeIndex =="6"){
	     		$('.page7 h2').animate({
	     			'margin-left':'800px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0'
	     			},500);
	     		});
	     		$('.page7 h3').animate({
	     			'margin-left':'-800px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0'
	     			},500);
	     		});
	     		
	     		$('.m7-li1').delay(1000).animate({
	     			'top':'249px',
	     			'left':'222px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'149px',
	     				'left':'122px',
	     			},300);
	     		});
	     		$('.m7-li2').delay(1000).animate({
	     			'top':'249px',
	     			'left':'284px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'149px',
	     				'left':'284px',
	     			},300);
	     		});
	     		$('.m7-li3').delay(1000).animate({
	     			'top':'249px',
	     			'left':'550px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'149px',
	     				'left':'450px',
	     			},300);
	     		});
	     		$('.m7-li4').delay(1000).animate({
	     			'top':'249px',
	     			'left':'712px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'149px',
	     				'left':'612px',
	     			},300);
	     		});
	     		$('.m7-li5').delay(1000).animate({
	     			'top':'249px',
	     			'left':'876px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'149px',
	     				'left':'776px',
	     			},300);
	     		});
	     		$('.m7-li6').delay(1000).animate({
	     			'left':'934px',
	     		},500,function(){
	     			$(this).animate({
	     				'left':'834px',
	     			},300);
	     		});
	     		$('.m7-li7').delay(1000).animate({
	     			'top':'248px',
	     			'left':'104px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'348px',
	     				'left':'204px',
	     			},300);
	     		});
	     		$('.m7-li8').delay(1000).animate({
	     			'top':'248px',
	     			'left':'266px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'348px',
	     				'left':'366px',
	     			},300);
	     		});
	     		$('.m7-li9').delay(1000).animate({
	     			'top':'248px',
	     			'left':'430px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'348px',
	     				'left':'530px',
	     			},300);
	     		});
	     		$('.m7-li10').delay(1000).animate({
	     			'top':'248px',
	     			'left':'596px',
	     		},500,function(){
	     			$(this).animate({
	     				'top':'348px',
	     				'left':'696px',
	     			},300);
	     		});
	     		$('.m-7-1').delay(1000).fadeIn(1500);
	     	}else{
	     		$('.page7 h2').animate({
	     			'margin-left':'-1300px',
	     		},0);
	     		$('.page7 h3').animate({
	     			'margin-left':'1300px',
	     		},0);
	     		
	     		$('.m7-li1,.m7-li2,.m7-li3,.m7-li4,.m7-li5').animate({
	     			'top':'-300px',
	     			'left':'-100px',
	     		},0);
	     		$('.m7-li7,.m7-li8,.m7-li9,.m7-li10').animate({
	     			'top':'-300px',
	     			'left':'700px',
	     		},0);
	     		$('.m7-li6').animate({
	     			'left':'-300px',
	     		},0);
	     		$('.m-7-1').fadeOut('fast');
	     	}
	     	//第八
	     	if(mySwiper.activeIndex =="7"){
	     		$('.page8 h2').animate({
	     			'margin-left':'800px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0',
	     			},500);
	     		});
	     		$('.page8 h3').animate({
	     			'margin-left':'-800px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0',
	     			},500);
	     		});
	     		$('.page8 h4').animate({
	     			'margin-left':'-20000px',
	     		},300,function(){
	     			$(this).animate({
	     				'margin-left':'0',
	     			},300);
	     		});
//	     		console.log($('.m8-ul1 li').length)
	     		$('.m8-ul1 li').delay(1000).animate({
	     			'margin-top':'0px',
	     		},800);
	     		$('.m8-ul2 li').delay(1800).animate({
	     			'margin-top':'0px',
	     		},800);
	     		$('.m8-ul3 li').delay(2600).animate({
	     			'margin-top':'0px',
	     		},800);
	     		
	     		
	     		var pieData = [
					{
						value: 18,
						color:"#6b439c"
					},
					{
						value : 8,
						color : "#ae4097"
					},
					{
						value : 8,
						color : "#e44298"
					},
					{
						value : 7,
						color : "#ee1b24"
					},
					{
						value : 6,
						color : "#f57025"
					},
					{
						value : 5,
						color : "#f78e23"
					},
					{
						value : 2,
						color : "#ffc010"
					},
					{
						value : 5,
						color : "#ffc010"
					},
					{
						value : 4,
						color : "#d0c700"
					},
					{
						value : 4,
						color : "#6bc100"
					},
					{
						value : 3,
						color : "#01a88e"
					},
					{
						value : 3,
						color : "#008ecc"
					},
					{
						value : 3,
						color : "#0655a4"
					},
					{
						value : 3,
						color : "#83cb12"
					},
					{
						value : 3,
						color : "#5ebff6"
					},
					{
						value : 3,
						color : "#7d0022"
					},
					{
						value : 3,
						color : "#a40035"
					},
					{
						value : 2,
						color : "#00736d"
					},
					{
						value : 2,
						color : "#81511c"
					},
					{
						value : 2,
						color : "#007130"
					},
					{
						value : 1,
						color : "#a84200"
					},
					{
						value : 2,
						color : "#b7aa00"
					},
					{
						value : 1,
						color : "#eb6100"
					},
					{
						value : 2,
						color : "#ac6a00"
					}
				];
				var ctx = document.getElementById("myChart").getContext("2d");
				window.myPie = new Chart(ctx).Pie(pieData);

	     	}else{
     			$('.page8 h2').animate({
     				'margin-left':'-1300px',
	     		},0);
	     		$('.page8 h3').animate({
	     			'margin-left':'1300px',
	     		},0);
	     		$('.page8 h4').animate({
	     			'margin-left':'-1600px',
	     		},0);

	     		$('.m8-ul1 li').animate({
	     			'margin-top':'-400px',
	     		},0);
	     		$('.m8-ul2 li').animate({
	     			'margin-top':'-4000px',
	     		},0);
	     		$('.m8-ul3 li').animate({
	     			'margin-top':'-4000px',
	     		},0);
	     	}
	     	//第九
	     	if(mySwiper.activeIndex =="8"){
	     		$('.page9 h2').animate({
	     			'margin-left':'0px',
	     		},500);
	     		$('.m-9-1 div h3').delay(500).animate({
	     			'margin-left':'0px',
	     		},500);
	     		$('.m-9-1 div p').delay(1000).animate({
	     			'margin-left':'0px',
	     		});
	     		
	     		$('.m9-div1').animate({
	     			'margin-left':'0px',
	     			'margin-top':'0px',
	     		},500);
	     		$('.m9-div2').delay(500).animate({
	     			'margin-left':'52px',
	     			'margin-top':'0px',
	     		},500);
	     		$('.m9-div3').delay(1000).animate({
	     			'margin-left':'204px',
	     			'margin-top':'0px',
	     		},500);
	     		$('.m9-div2').delay(1500).animate({
	     			'margin-top':'0px',
	     		},500);
	     	}else{
	     		$('.page9 h2').animate({
	     			'margin-left':'-1500px',
	     		},0);
	     		$('.m-9-1 div h3').animate({
	     			'margin-left':'-400px'
	     		},0);
	     		$('.m-9-1 div p').animate({
	     			'margin-left':'-1300px',
	     		});
	     		
	     		$('.m9-div1').animate({
	     			'margin-left':'-600px',
	     			'margin-top':'-600px',
	     		},0);
	     		$('.m9-div2').animate({
	     			'margin-left':'-1300px',
	     			'margin-top':'-600px',
	     		},0);
	     		$('.m9-div3').animate({
	     			'margin-left':'800px',
	     			'margin-top':'-600px',
	     		},0);
	     		$('.m9-div2').animate({
	     			'margin-top':'-600px',
	     		},0);
	     	}
	     	//第十
	     	if(mySwiper.activeIndex =="9"){
	     		$('.m-10-1 h2').animate({
	     			'margin-left':'-400px',
	     		},500,function(){
	     			$(this).animate({
	     				'margin-left':'0px',
	     			},200);
	     		});
	     		$('.m10-li1').delay(700).fadeIn(500);
	     		$('.m10-li1 span').delay(1200).fadeIn(500);
	     		$('.m10-li1 img').delay(1200).fadeIn(500);
	     		$('.m10-li2').delay(1200).fadeIn(500);
	     		$('.m10-li2 span').delay(1700).fadeIn(500);
	     		$('.m10-li2 img').delay(1700).fadeIn(500);
	     		$('.m10-li3').delay(1700).fadeIn(500);
	     		$('.m10-li3 span').delay(2200).fadeIn(500);
	     		$('.m10-li3 img').delay(2200).fadeIn(500);
	     		$('.m10-li4').delay(2200).fadeIn(500);
	     		$('.m10-li4 span').delay(2700).fadeIn(500);
	     		$('.m10-li4 img').delay(2700).fadeIn(500);
	     		$('.m10-li5').delay(2700).fadeIn(500);
	     		$('.m10-li5 span').delay(3200).fadeIn(500);
	     		$('.m10-li5 img').delay(3200).fadeIn(500);
	     		$('.m10-li6').delay(3200).fadeIn(500);
	     		$('.m10-li6 span').delay(3700).fadeIn(500);
	     		$('.m10-li6 img').delay(3700).fadeIn(500);
	     	}else{
	     		$('.m-10-1 h2').animate({
	     			'margin-left':'1300px',
	     		},0);
	     		$('.m-10-1 li').fadeOut('fast');
	     		$('.m-10-1 li span').fadeOut('fast');
	     		$('.m-10-1 li img').fadeOut('fast');
	     	}
	     	


	     }//滑动end判断当前页面  end
	})//swiper调用结束



//第一页
function deng(){
	$(".m-page1 .m-img11").fadeIn(1000);
	$(".m-page1 .m-img11").fadeOut(1000);
}
setInterval(deng,100);

$(".m-page1 .m-img2").animate({
	left:'+348px',
},1000);
$(".m-page1 .m-img3").animate({
	top:'+440px',
},1000);	


//第二页




//第三页


//第四页




//第五页



//第六页




//第七页

 



//第八页





//第九页





//第十页