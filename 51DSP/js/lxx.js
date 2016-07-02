$(function(){
		
		$("#lxx-header").css("height",function(){
			var hg = $(".swiper-wrapper").height();
			return hg+"px";
		})
		$("#lxx-menu").css("top",function(){
			var hg = $(".swiper-wrapper").height();
			return (hg-67)+"px";
		})
		$(".swiper-container").css("width",function(){
			var wid = $("body").width() - $("#lxx-header").width()-2;
			return  wid+"px";
		})
		window.onresize=function(){
			$("#lxx-header").css("height",function(){
				var hg = $(".swiper-wrapper").height();
				return hg+"px";
			})
			$(".swiper-container").css("width",function(){
				var wid = $("body").width() - $("#lxx-header").width()-2;
				return  wid+"px";
			})
		}

		//获取当前日期
		function today(){
			var lxxDate = new Date();
			var dates = lxxDate.toLocaleDateString();
			// console.log(dates);	
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
			// console.log(Days);
			$(".lxx-date .lxxDate").empty().append(Days);
		}
		var time = setInterval(today,1000)
})

// 首页初始化状态
$(document).ready(function(){
	setInterval(function(){$(".lxx-light2").fadeToggle(3000)},30)

	$(".lxx-swp1-text1").animate({
		"left":"480px",
	},730);
	$(".lxx-swp1-text2").delay(450).animate({
		"left":"200px",
	},730);



//	$(".lxx-swp1-text1").hover(function(){
//		$(".lxx-swp1-img1").stop().fadeIn(300)
//	},function(){
//		$(".lxx-swp1-img1").stop().fadeOut(300)
//	});



//	$(".lxx-swp1-text2").hover(function(){
//		$(".lxx-swp1-img2").stop().fadeIn(300)
//	},function(){
//		$(".lxx-swp1-img2").stop().fadeOut(300)
//	});


//	$(".lxx-lighthover").hover(function(){
//		$(".lxx-light3").stop().fadeIn(800)
//		$(".lxx-light2").stop().fadeIn(800)
//	},function(){
//		$(".lxx-light3").stop().fadeOut(800)
//		$(".lxx-light2").stop().fadeOut(800)
//	})
})


var mySwiper = new Swiper('.swiper-container', {
		mousewheelControl : true,
		direction:'vertical',
		
		 onSlideChangeStart: function(swiper){  //滑动start判断当前页面  
	    		if(mySwiper.activeIndex =="1"){	    			
	    			$("#lxx-menu").animate({
	    				top:0
	    			},730);	 
	    			
	    		}
	    		if(mySwiper.activeIndex =="0"){
	    			var hg = $(".swiper-wrapper").height(); 
		    		$("#lxx-menu").animate({
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


	    		// page1---------------------------------------
	    		if(mySwiper.activeIndex =="0"){
	    			setInterval(function(){$(".lxx-light2").fadeToggle(3000)},30)
					
					$(".lxx-swp1-text1").animate({
						"left":"480px",
					},730);
					$(".lxx-swp1-text2").delay(400).animate({
						"left":"200px",
					},730);
	      		}else{
					$(".lxx-swp1-text1").animate({
						"left":"-200px",
					});
					$(".lxx-swp1-text2").animate({
						"left":"-1000px",
					})
	      		}

	      		// page2------------------------------------------

	      		if(mySwiper.activeIndex =="1"){
					setInterval(function(){$(".lxx-light2").fadeToggle(1000)},30)
	      			$(".lxx-swp2-icon").animate({
	      				"left":"100px"
	      			},500);
	      			
	      			$(".lxx-swp2-text1").delay(400).animate({
						"left":"0px",
					},500);
					$(".lxx-swp2-text2").delay(800).animate({
						"left":"-20px",
					},500);
					$(".lxx-swp2-cons-img1").delay(1300).animate({
						"margin-top":"0px",
					},300);
					$(".lxx-swp2-cons-img2").delay(1500).animate({
						"margin-top":"0px"
					},300);
					$(".lxx-swp2-cons-img3").delay(1700).animate({
						"margin-top":"0px"
					},300);
					$(".lxx-swp2-cons-img4").delay(1900).animate({
						"margin-top":"0px"
					},300);

					$(".lxx-swp2-icon1").delay(2800).fadeIn(300);
	      			$(".lxx-swp2-icon1").delay(100).fadeOut(200);
	      		}else{
	      			$(".lxx-swp2-icon").animate({
	      				"left":"-600px"
	      			});
	      			$(".lxx-swp2-icon1").fadeOut();
	      			$(".lxx-swp2-text1").animate({
						"left":"780px",
					});
					$(".lxx-swp2-text2").animate({
						"left":"-760px",
					});
					$(".lxx-swp2-cons-img1").animate({
						"margin-top":"-600px"
					});
					$(".lxx-swp2-cons-img2").animate({
						"margin-top":"-600px"
					});
					$(".lxx-swp2-cons-img3").animate({
						"margin-top":"-600px"
					});
					$(".lxx-swp2-cons-img4").animate({
						"margin-top":"-600px"
					});
	      		}




	      		// page3------------------------------------------
	      		if(mySwiper.activeIndex =="2"){
	      			$(".lxx-swp3-icon").animate({
	      				"left":"100px"
	      			},500);
	      			$(".lxx-swp3-text1").delay(400).animate({
						"left":"0px",
					},500);
					$(".lxx-swp3-text2").delay(800).animate({
						"left":"0px",
					},500);



					$(".lxx-swp3-txt1l").delay(1500).animate({
						"left":"138px",
						"top":"50px",
					},300);

					$(".lxx-swp3-txt1").delay(1700).animate({
						"left":"30px",
						"top":"20px",
					},300);

					$(".lxx-swp3-txt2l").delay(1800).animate({
						"left":"360px",
						"top":"40px",
					},300);

					$(".lxx-swp3-txt2").delay(2000).animate({
						"left":"380px",
						"top":"30px",
					},300);

					$(".lxx-swp3-txt3l").delay(2100).animate({
						"left":"70px",
						"top":"205px",
					},300);

					$(".lxx-swp3-txt3").delay(2300).animate({
						"left":"5px",
						"top":"177px",
					},300);


					$(".lxx-swp3-icon1").delay(3000).fadeIn(300);
	      			$(".lxx-swp3-icon1").delay(100).fadeOut(200);
	      		}else{
	      			$(".lxx-swp3-icon").animate({
	      				"left":"-600px"
	      			});
	      			$(".lxx-swp3-text1").animate({
						"left":"780px",
					});
					$(".lxx-swp3-text2").animate({
						"left":"-760px",
					});


					$(".lxx-swp3-txt1l").animate({
						"left":"-500px",
						"top":"-500px",
					});

					$(".lxx-swp3-txt1").animate({
						"left":"-500px",
						"top":"-500px",
					});

					$(".lxx-swp3-txt2l").animate({
						"left":"800px",
						"top":"-500px",
					});

					$(".lxx-swp3-txt2").animate({
						"left":"800px",
						"top":"-500px",
					});

					$(".lxx-swp3-txt3l").animate({
						"left":"-500px",
						"top":"500px",
					});

					$(".lxx-swp3-txt3").animate({
						"left":"-500px",
						"top":"500px",
					});
	      		}



	      		// page4------------------------------------------
	      		if(mySwiper.activeIndex =="3"){
	      			$(".lxx-swp4-icon").animate({
	      				"left":"100px"
	      			},500);
	      			$(".lxx-swp4-text1").delay(400).animate({
						"left":"0px",
					},500);
					$(".lxx-swp4-text2").delay(800).animate({
						"left":"0px",
					},500);


					$(".lxx-swp4-con-txt").delay(1500).fadeIn(100);
					$(".lxx-swp4-1").delay(1600).animate({
						"margin-top":"0px",
					},300);
					$(".lxx-swp4-con-jia").delay(1800).animate({
						"top":"75px",
					},300);
					$(".lxx-swp4-2").delay(2100).animate({
						"margin-top":"0px",
					},300);
					$(".lxx-swp4-con-deng").delay(2400).animate({
						"top":"75px",
					},300);
					$(".lxx-swp4-3").delay(2700).animate({
						"margin-top":"0px",
					},300);


					$(".lxx-swp4-icon1").delay(3500).fadeIn(300);
	      			$(".lxx-swp4-icon1").delay(100).fadeOut(200);
	      		}else{
	      			$(".lxx-swp4-icon").animate({
	      				"left":"-600px"
	      			});
	      			$(".lxx-swp4-text1").animate({
						"left":"780px",
					});
					$(".lxx-swp4-text2").animate({
						"left":"-760px",
					});


					$(".lxx-swp4-con-txt").fadeOut();
					$(".lxx-swp4-1").animate({
						"margin-top":"-600px",
					});
					$(".lxx-swp4-con-jia").animate({
						"top":"500px",
					});
					$(".lxx-swp4-2").animate({
						"margin-top":"-600px",
					});
					$(".lxx-swp4-con-deng").animate({
						"top":"500px",
					});
					$(".lxx-swp4-3").animate({
						"margin-top":"-600px",
					});
	      		}




	      		// page5------------------------------------------
	      		if(mySwiper.activeIndex =="4"){
	      			$(".lxx-swp5-icon").animate({
	      				"left":"100px"
	      			},500);
	      			$(".lxx-swp5-text1").delay(400).animate({
						"left":"0px",
					},500);
					$(".lxx-swp5-text2").delay(800).animate({
						"left":"0px",
					},500);
					

					$(".lxx-swp5-txt1").delay(1500).animate({
						"margin-left":"0px",
					},300);
					$(".lxx-swp5-txt2").delay(1700).animate({
						"margin-left":"0px",
					},300);





					$(".lxx-swp5-show").delay(2400).animate({
						"left":"-230px",
					},300);
					$(".lxx-swp5-show").animate({
						"left":"212px",
					},300);
					$(".lxx-swp5-showtxt").delay(2400).animate({
						"left":"-120px",
					},300);
					$(".lxx-swp5-showtxt").animate({
						"left":"330px",
					},300);
					$(".lxx-swp5-phone").delay(2700).animate({
						"left":"0px",
					},300);



					$(".lxx-swp5-icon1").delay(3500).fadeIn(300);
	      			$(".lxx-swp5-icon1").delay(100).fadeOut(200);
	      		}else{
	      			$(".lxx-swp5-icon").animate({
	      				"left":"-600px"
	      			});
	      			$(".lxx-swp5-text1").animate({
						"left":"780px",
					});
					$(".lxx-swp5-text2").animate({
						"left":"-800px",
					});


					$(".lxx-swp5-txt1").animate({
						"margin-left":"700px",
					});
					$(".lxx-swp5-txt2").animate({
						"margin-left":"700px",
					});

					$(".lxx-swp5-phone").animate({
						"left":"-600px",
					});
					$(".lxx-swp5-show").animate({
						"left":"1040px",
					});
					$(".lxx-swp5-showtxt").animate({
						"left":"1040px",
					});
					
	      		}






	      		//page6------------------------------------------
	      		if(mySwiper.activeIndex =="5"){
	      			$(".lxx-swp6-icon").animate({
	      				"left":"100px"
	      			},500);
	      			$(".lxx-swp6-text1").delay(400).animate({
						"left":"0px",
					},500);
					$(".lxx-swp6-text2").delay(800).animate({
						"left":"0px",
					},500);



					$(".lxx-swp6-con").delay(1500).animate({
						"bottom":"0px",
					},500);
					$(".lxx-swp6-pen").delay(1400).animate({
						"filter":"alpha(opacity=100)",
						"opacity":"1",
					},1000);


					$(".lxx-swp6-icon1").delay(3100).fadeIn(300);
	      			$(".lxx-swp6-icon1").delay(100).fadeOut(200);
	      		}else{
	      			$(".lxx-swp6-icon").animate({
	      				"left":"-600px"
	      			});
	      			$(".lxx-swp6-text1").animate({
						"left":"780px",
					});
					$(".lxx-swp6-text2").animate({
						"left":"-760px",
					});


					$(".lxx-swp6-con").animate({
						"bottom":"-400px",
					});
					$(".lxx-swp6-pen").animate({
						"filter":"alpha(opacity=0)",
						"opacity":"0",
					});
	      		}






	      		// page7------------------------------------------
	      		if(mySwiper.activeIndex =="6"){
	      			$(".lxx-swp7-icon").animate({
	      				"left":"100px"
	      			},500);
	      			$(".lxx-swp7-text1").delay(400).animate({
						"left":"0px",
					},500);
					$(".lxx-swp7-text2").delay(800).animate({
						"left":"0px",
					},500);




					$(".lxx-swp7-tel").delay(1500).animate({
						"left":"30px",
					},300);
					$(".lxx-tel1").delay(1800).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel2").delay(1900).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel3").delay(2000).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel4").delay(2100).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel5").delay(2200).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel6").delay(2300).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel7").delay(2400).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel8").delay(2500).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel9").delay(2600).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel10").delay(2700).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel11").delay(2800).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel12").delay(2900).animate({
						"margin-top":"48px",
					},300);
					$(".lxx-tel13").delay(3000).animate({
						"margin-top":"48px",
					},300);


					$(".lxx-swp7-tip").delay(3500).animate({
						"top":"5px",
						"left":"410px",
						"filter":"alpha(opacity=100)",
						"opacity":"1",
					},200);
					$(".lxx-swp7-tip2").delay(4200).animate({
						"left":"0px",
						"top":"0px",
						"filter":"alpha(opacity=100)",
						"opacity":"1",
					},100)


					$(".lxx-swp7-tip-txt").delay(3700).fadeIn(300);



					$(".lxx-swp7-icon1").delay(4800).fadeIn(300);
	      			$(".lxx-swp7-icon1").delay(100).fadeOut(200);
	      		}else{
	      			$(".lxx-swp7-icon").animate({
	      				"left":"-600px"
	      			});
	      			$(".lxx-swp7-text1").animate({
						"left":"780px",
					});
					$(".lxx-swp7-text2").animate({
						"left":"-760px",
					});




					$(".lxx-swp7-tel").animate({
						"left":"-400px",
					});
					$(".lxx-tel1").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel2").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel3").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel4").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel5").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel6").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel7").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel8").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel9").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel10").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel11").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel12").animate({
						"margin-top":"-100px",
					});
					$(".lxx-tel13").animate({
						"margin-top":"-100px",
					});


					$(".lxx-swp7-tip").animate({
						"top":"180px",
						"left":"650px",
						"filter":"alpha(opacity=0)",
						"opacity":"0",
					});
					$(".lxx-swp7-tip2").animate({
						"left":"150px",
						"top":"-150px",
						"filter":"alpha(opacity=0)",
						"opacity":"0",
					})


					$(".lxx-swp7-tip-txt").delay().fadeOut();
	      		}

	     }//滑动end判断当前页面  end
	     
	})