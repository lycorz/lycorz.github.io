//每个页面的元素效果



//公共部分
	//header
	$(function(){
		
		var _height = $(window).height();
		var H = $("#toper").height();
		$(".g_guang").css({
			"height":(_height-H)+"px"
		})
		
//		$(".g_guang1").css({
//			"height":(_height-H-83)+"px"
//		})
		
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
//	    autoplay : 3000,
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
	    	
	    onSlideChangeEnd: function(swiper){
	    	//滑动end判断当前页面 start
	    	if(mySwiper.activeIndex =="0"){
	    		$(".g_http").animate({
					left:"+584px",
				},500)
				//灯
				function deng(){
					$(".g_deng2").fadeIn(1000);
					$(".g_deng2").fadeOut(1000);
				}
				setInterval(deng,100);
				
				$(".g_wenzi1").animate({
					left:'+348px',
				},1000)
				
				$(".g_wenzi2").animate({
					top:'+440px',
				},1500)	

	    	}
	    	else{
	    		$(".g_http").animate({
	    			left:"0px"
	    		},0)
	    		$(".g_wenzi1").animate({
					left:'+0px',
				},0)
				
				$(".g_wenzi2").animate({
					top:'+20px',
				},0)	
	    	}
           //第二页
	     	if(mySwiper.activeIndex =="1"){	    			
			    $(".g_wei").animate({
					"left":"+310px",
					"top": "+30px"
						     
				},1000)
			    $(".g_wei").mouseenter(function(){
					$(".g_wei").css("color","brown");
				})
				setTimeout(
		    		function(){
		    			$(".g_wei1").animate({
							"top": "+60px",
							"left":"+250px"
			    		},1000)},1000
			    )
				setTimeout(
		    		function(){
		    			$(".g_z11").animate({
							"width":"664px"
							
			    		},2000)},2000
			    )
				setTimeout(
		    		function(){
		    			$(".g_z12").animate({
							"height":"18px"
							
			    		},2000)},2500
			    )
				setTimeout(
		    		function(){
		    			$(".g_z13").animate({
							"height":"32px"
							
			    		},2000)},2500
			    )
				setTimeout(
		    		function(){
		    			$(".g_z14").animate({
							"height":"32px"
							
			    		},2000)},3000
			    )
//			
   				$(".g_z21").fadeIn(10000);
   				$(".g_z22").delay(4000).fadeIn(10000);
   				$(".g_z4").delay(6000).fadeIn(10000);
   				$(".g_z5").delay(6500).fadeIn(10000);
   				setTimeout(
		    		function(){
		    			$(".g_z31,.g_z32,.g_z33").animate({
							"left":"+100px"	
			    		},2000)},3000
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z34,.g_z35,.g_z36,.g_z37").animate({
							"left":"+247px"	
			    		},2000)},4000
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z6").animate({
							"top": "+220px",
							"left":"+480px"
			    		},1000)},5000
			    )
   				function xiaozi(){
					$(".g_z7").fadeIn(1000);
					$(".g_z7").fadeOut(1000);
				}
				setInterval(xiaozi,100);
   				setTimeout(
		    		function(){
		    			$(".g_z81,.g_z82,.g_z83,.g_z84").animate({
							"left":"+734px"	
			    		},2000)},4000
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z85,.g_z86,.g_z87").animate({
							"left":"+886px"	
			    		},2000)},5000
			    )
	    	}else{
	    		$(".page2").find(function(){
				  	$(".page2").stop();
				});
	    		 $(".g_wei").animate({
					"left":"0px",
					"top": "-170px"
						     
				},0)
				setTimeout(
		    		function(){
		    			$(".g_wei1").animate({
							"top": "-200px",
							"left":"0px"
			    		},0)},0
			    )
				setTimeout(
		    		function(){
		    			$(".g_z11").animate({
							"width":"0px"
							
			    		},0)},0
			    )
				setTimeout(
		    		function(){
		    			$(".g_z12").animate({
							"height":"0px"
							
			    		},0)},0
			    )
				setTimeout(
		    		function(){
		    			$(".g_z13").animate({
							"height":"0px"
							
			    		},0)},0
			    )
				setTimeout(
		    		function(){
		    			$(".g_z14").animate({
							"height":"0px"
							
			    		},0)},0
			    )
				setTimeout(
		    		function(){
		    			$(".g_z31,.g_z32,.g_z33").animate({
							"left":"-270px"	
			    		},0)},0
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z34,.g_z35,.g_z36,.g_z37").animate({
							"left":"-270px"	
			    		},0)},0
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z6").animate({
							"top": "-483px",
							"left":"-219px"
			    		},0)},0
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z81,.g_z82,.g_z83,.g_z84").animate({
							"left":"+1500px"	
			    		},0)},0
			    )
   				setTimeout(
		    		function(){
		    			$(".g_z85,.g_z86,.g_z87").animate({
							"left":"+1500px"	
			    		},0)},0
			    )
   				$(".g_z21").fadeOut(0);
   				$(".g_z22").fadeOut(0);
   				$(".g_z4").fadeOut(0);
   				$(".g_z5").fadeOut(0);
   				
	    	}
//	    	第三页
	    	if(mySwiper.activeIndex =="2"){	
	    		  //手机一
				$(".g_pino1").animate({
					"left":"0px"
				},1000)
				$(".g_pino1").click(function(){
					$(".g_pino1").css("display","none");
					$(".g_pin11").animate({
						"left":"0px"
					},2500)
					$(".g_pin12").delay(2500).animate({
						"left":"13px"
					},2500)
					
				})
				$(".g_pin12").click(function(){
					$(".g_pino1").css("display","block");
					$(".g_pin11").animate({
						"left":"-451px"
					},0)
					$(".g_pin12").delay(0).animate({
						"left":"-451px"
					},0)
					
				})
				   //手机二
				$(".g_pino2").animate({
					"top":"0px"
				},1000)
				$(".g_pino2").click(function(){
					$(".g_pino2").css("display","none");
					$(".g_pin21").animate({
						"top":"0px"
					},2500)
					$(".g_pin22").delay(2500).animate({
						"top":"45px",
				    	"left": "13px"
					},2500)
					
				})
				$(".g_pin22").click(function(){
					$(".g_pino2").css("display","block");
					$(".g_pin21").animate({
						"top":"-470px"
					},0)
					$(".g_pin22").delay(0).animate({
						"top":"-470px",
				    	"left": "0px"
					},0)
					
				})
				 //手机三
				$(".g_pino3").animate({
					"left":"0px"
				},1000)
				$(".g_pino3").click(function(){
					$(".g_pino3").css("display","none");
					$(".g_pin31").animate({
						"left":"0px"
					},2500)
					$(".g_pin32").delay(2500).animate({
						"left":"13px"
					},2500)
					
				})
				$(".g_pin32").click(function(){
					$(".g_pino3").css("display","block");
					$(".g_pin31").animate({
						"left":"480px"
					},0)
					$(".g_pin32").delay(0).animate({
						"top":"45px",
				    	"left": "480px"
					},0)
					
				})
				//底部
//				function zzzz(){
//					$(".g_tt").fadeIn(1000);
//					$(".g_tt").fadeOut(1000);
//				}
//				setInterval(zzzz,100);
				
				//鼠标放到底部,背景颜色改变
				$(".g_di").mouseenter(function(){
				  $(".g_di").css("background-color","lightslategrey");
				});
				//离开后初始化
				$(".g_di").mouseleave(function(){
				  $(".g_di").css("background-color","#ba0013");
				})
	    	}else{
	    		$(".g_pino1").animate({
					"left":"-600px"
				},0)
				$(".g_pino1").click(function(){
					$(".g_pino1").css("display","block");
					$(".g_pin11").animate({
						"left":"-550px"
					},0)
					$(".g_pin12").delay(0).animate({
						"left":"-550px"
					},0)
					
				})
				   //手机二
				$(".g_pino2").animate({
					"top":"-470px"
				},0)
				$(".g_pino2").click(function(){
					$(".g_pino2").css("display","block");
					$(".g_pin21").animate({
						"top":"-470px"
					},0)
					$(".g_pin22").delay(0).animate({
						"top":"-470px",
				    	"left": "0px"
					},0)
					
				})
				 //手机三
				$(".g_pino3").animate({
					"left":"550px"
				},0)
				$(".g_pino3").click(function(){
					$(".g_pino3").css("display","block");
					$(".g_pin31").animate({
						"left":"550px"
					},0)
					$(".g_pin32").delay(0).animate({
						"left":"550px"
					},0)
					
				})
	    	}
	     }//滑动end判断当前页面  end
	})//swiper调用结束
    			

//第一页
$(".g_http").animate({
	left:"+584px",
},500)
//灯
function deng(){
	$(".g_deng2").fadeIn(1000);
	$(".g_deng2").fadeOut(1000);
}
setInterval(deng,100);

$(".g_wenzi1").animate({
	left:'+348px',
},1000)

$(".g_wenzi2").animate({
	top:'+440px',
},1500)	