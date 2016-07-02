//每个页面的元素效果



//公共部分
	//header
	$(function(){


		var _height = $(window).height();
		var H = $('#toper').height();

		$('.second-content').css({
			"height":(_height-H-1)+'px'
		})
		// alert((_height-H-1)+'px')
		
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
//第一页
			if(mySwiper.activeIndex =="0"){
//				function demo(){
//					$(".deng").fadeOut(1000);
//					$(".deng").fadeIn(1000);
//				}
//				setInterval(demo,100)
				$(".dashuju").animate({
					'left':'335px',
					'top':'344px',
				},1000);
				$(".shipin").animate({
					'left':'65px',
					'top':'415px',
				})
			}else{
				$(".dashuju").animate({
					'left':'-400px',
					'top':'-50px',
				},1000);
				$(".shipin").animate({
					'left':'-987px',
					'top':'-50px',
				})
			}
//第二页
			if(mySwiper.activeIndex =="1"){
				$(".first-polygon1").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},300)
				$(".first-polygon2").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},600)
				$(".first-polygon3").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},900)
				$(".first-polygon4").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},1200)
				$(".first-polygon5").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},1500)
				$(".first-polygon6").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},1800)
				$(".first-polygon7").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},2100)
				$(".first-polygon8").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},2400)
				$(".second-polygon1").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},2700)
				$(".second-polygon2").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},3000)
				$(".second-polygon3").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},3300)
				$(".second-polygon4").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},3600)
				$(".second-polygon5").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},3900)
				$(".second-polygon6").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},4200)
				$(".second-polygon7").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},4500)
				$(".second-polygon8").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},4800)
				$(".third-polygon1").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},5100)
				$(".third-polygon2").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},5400)
				$(".third-polygon3").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},5700)
				$(".third-polygon4").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},6000)
				$(".third-polygon5").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},6300)
				$(".third-polygon6").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},6600)
				$(".third-polygon7").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},6900)
				$(".third-polygon8").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},7200)
				$(".third-polygon9").animate({
					'margin-left':'8px',
					'margin-top':'0px',
				},7500)
			}else{
				$(".first-polygon li").animate({
					'margin-left':'-279px',
					'margin-top':'-330px',
				})
				$(".second-polygon li").animate({
					'margin-left':'-398px',
					'margin-top':'-388px',
				})
				$(".third-polygon li").animate({
					'margin-left':'-973px',
					'margin-top':'-447px',
				})
			}
			//第三页
			// if(mySwiper.activeIndex =="3"){
			// 	$('.yuanxingimg').bind('click',function(){
			// 		alert($('yuanxingzi').text())
			// 	})
			// }
			if(mySwiper.activeIndex=="2"){
				$('#page3').hover(function(){
					$('.jiantou img').animate({
						'width':'10px',
						'height':'500px',
					},3000)
				})
			}else{
				$('.jiantou img').animate({
					'width':'0px',
					'height':'0px',
				})
			}
			//第五页
			if(mySwiper.activeIndex=='4'){
				$('#page5').hover(function(){
					$('.xingming').animate({
						'top':'20px',
					},1000),$('.dianhua').animate({
						'top':'85px',
					}),$('.dizhi').animate({
						'top':'150px',
					}),$('.liuyan').animate({
						'top':'215px',
					})
				})
			}else{
				$('.xingming').animate({
					'top':'-300px',
				}),$('.dianhua').animate({
					'top':'-340px',
				}),$('.dizhi').animate({
					'top':'-400px',
				}),$('.liuyan').animate({
					'top':'-500px',
				})
			}

	     }//滑动end判断当前页面  end

	})//swiper调用结束
//	function demo(){  			
//	 	$(".deng").fadeOut(1000)
//		$(".deng").fadeIn(1000)
//	}
//	setInterval(demo,100)						
	$(".dashuju").animate({
		'left':'335px',
		'top':'344px',
	},1000);
	$(".shipin").animate({
		'left':'65px',
		'top':'415px',
	})
























