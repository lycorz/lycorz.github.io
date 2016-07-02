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
			$(".lxy-date").empty().append(Days);
		}
		var time = setInterval(today,1000);
		



var mySwiper = new Swiper('.swiper-container',{
mousewheelControl : true,
direction : 'vertical',
 onSlideChangeStart: function(swiper){
 	if(mySwiper.activeIndex =="1"){	    
 		$(".lxy-sxyd").animate({
	    				top:"0px"
	    			},730);
 	


	    			
	    						}
	if(mySwiper.activeIndex =="0"){
					var hg = $(".swiper-wrapper").height(); 
		    		$(".lxy-sxyd").animate({
		    			top:(hg-67)+"px"
		    		},730);
	    			
		
		

								}

									},

 onSlideChangeEnd: function(swiper){

	if(mySwiper.activeIndex =="0"){
	// one
	$(".lxy-wenzi1").animate({
	    				left:"304px",
	    				top:"335px"
	    			},500);	
	$(".lxy-wenzi2").animate({
	    				top:"420px",
	    				right:"64px"
	    			},500);
	$(".lxy-one-top p").fadeIn(1000);
	//two
	$(".lxy-two-1").hide();
	$(".lxy-two-2").fadeOut();
	$(".lxy-bj").fadeOut();
		$(".lxy-1").animate({
						left:"0px",
						top:"0px"
	})
	$(".lxy-2").animate({
						left:"0px"
	})
	$(".lxy-3").animate({
						left:"0px",
						top:"0px"
	})
	$(".lxy-4").animate({
						top:"0px"
	})
	$(".lxy-5").animate({
						bottom:"0px"
	})
	$(".lxy-6").animate({top:"0px",
						right:"0px"

	})
	$(".lxy-7").animate({right:"0px"

	})
	$(".lxy-8").animate({right:"0px",
						bottom:"0px"

	})
	$(".lxy-9").hide();

	$(".lxy-10").fadeOut();
 	}  

 	if(mySwiper.activeIndex =="1"){
 	//one 
	$(".lxy-wenzi1").animate({
	    				left:"0px",
	    				top:"0px"
	    			},500);	
	$(".lxy-wenzi2").animate({
	    				top:"0px",
	    				right:"0px"
	    			},500);
	$(".lxy-one-top p").fadeOut(1000);
	//two
	$(".lxy-two-1").show(2000);
	$(".lxy-two-2").fadeIn(1000);
	$(".lxy-bj").fadeIn(1000);
	$(".lxy-1").animate({
						left:"402px",
						top:"247px"
	},1000)
	$(".lxy-2").animate({
						left:"450px"
	},500)
	$(".lxy-3").animate({
						left:"445px",
						top:"408px"
	},1000)
	$(".lxy-4").animate({
						top:"285px"
	},1000)
	$(".lxy-5").animate({
						bottom:"125px"
	},1000)
	$(".lxy-6").animate({top:"225px",
						right:"195px"

	},1000)
	$(".lxy-7").animate({right:"180px"

	},1000)
	$(".lxy-8").animate({right:"242px",
						bottom:"126px"

	},1000)
	$(".lxy-9").show(2000);

	$(".lxy-10").fadeIn(1500);
	// three
		// three
	// 1
	$(".lxy-11").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-12").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-13").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-14").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-15").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-16").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-17").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-18").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-19").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-20").animate({
					top: "0px",
					left:"0px"	
	})
	// 2
	$(".lxy-21").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-22").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-23").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-24").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-25").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-26").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-27").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-28").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-29").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-30").animate({
					top: "0px",
					right:"0px"	
	})
	// 3
	$(".lxy-31").animate({
					top: "0px",
					left:"151px"	
	})
	$(".lxy-32").animate({
					top:"0px",
					left:"251px"	
	})
	$(".lxy-33").animate({
					top: "0px",
					left:"356px"	
	})
	$(".lxy-34").animate({
					top: "0px",
					left:"461px"	
	})
	$(".lxy-35").animate({
					top:"0px",
					left:"561px"	
	})
	$(".lxy-36").animate({
					top: "0px",
					left:"671px"	
	})
	$(".lxy-three-1").animate({
		width:"0px"


	})
 	}
 	if(mySwiper.activeIndex =="2"){
	// two
 		$(".lxy-two-1").hide();
 		$(".lxy-two-2").fadeOut();
 		$(".lxy-bj").fadeOut();
 		$(".lxy-1").animate({
						left:"0px",
						top:"0px"
	})
	$(".lxy-2").animate({
						left:"0px"
	})
	$(".lxy-3").animate({
						left:"0px",
						top:"0px"
	})
	$(".lxy-4").animate({
						top:"0px"
	})
	$(".lxy-5").animate({
						bottom:"0px"
	})
	$(".lxy-6").animate({top:"0px",
						right:"0px"

	})
	$(".lxy-7").animate({right:"0px"

	})
	$(".lxy-8").animate({right:"0px",
						bottom:"0px"

	})
		$(".lxy-9").hide();

	$(".lxy-10").fadeOut();
	// three
	// 1
	$(".lxy-11").animate({
					top: "213px",
					left:"0px"	
	},150)
	$(".lxy-12").animate({
					top: "213px",
					left:"100px"	
	},300)
	$(".lxy-13").animate({
					top: "213px",
					left:"200px"	
	},450)
	$(".lxy-14").animate({
					top: "213px",
					left:"300px"	
	},600)
	$(".lxy-15").animate({
					top: "213px",
					left:"400px"	
	},750)
	$(".lxy-16").animate({
					top: "213px",
					left:"500px"	
	},900)
	$(".lxy-17").animate({
					top: "213px",
					left:"600px"	
	},1050)
	$(".lxy-18").animate({
					top: "213px",
					left:"700px"	
	},1200)
	$(".lxy-19").animate({
					top: "213px",
					left:"800px"	
	},1350)
	$(".lxy-20").animate({
					top: "213px",
					left:"900px"	
	},1500)
	// 2
	$(".lxy-21").animate({
					top: "306px",
					right:"930px"	
	},1500)
	$(".lxy-22").animate({
					top: "306px",
					right:"830px"	
	},1350)
	$(".lxy-23").animate({
					top: "306px",
					right:"730px"	
	},1200)
	$(".lxy-24").animate({
					top: "306px",
					right:"630px"	
	},1050)
	$(".lxy-25").animate({
					top: "306px",
					right:"530px"	
	},900)
	$(".lxy-26").animate({
					top: "306px",
					right:"430px"	
	},750)
	$(".lxy-27").animate({
					top: "306px",
					right:"330px"	
	},600)
	$(".lxy-28").animate({
					top: "306px",
					right:"230px"	
	},450)
	$(".lxy-29").animate({
					top: "306px",
					right:"130px"	
	},300)
	$(".lxy-30").animate({
					top: "306px",
					right:"30px"	
	},150)
	// 3
	$(".lxy-31").animate({
					top: "400px",
					left:"0px"	
	},1200)
	$(".lxy-32").animate({
					top:"400px",
					left:"100px"	
	},1000)
	$(".lxy-33").animate({
					top: "400px",
					left:"200px"	
	},800)
	$(".lxy-34").animate({
					top: "400px",
					left:"300px"	
	},600)
	$(".lxy-35").animate({
					top:"400px",
					left:"400px"	
	},400)
	$(".lxy-36").animate({
					top: "400px",
					left:"500px"	
	},200)
	$(".lxy-three-1").animate({
		width:"100%",


	},3000)
	//four
	$(".lxy-four-imgku img").animate({
					top:'0px',
					left:"0px"
	})
	$(".lxy-four-1").hide();
	$(".lxy-four-hengtiao1").animate({
					height:"0px",
						
	})
	$(".lxy-four-hengtiao2").animate({
					height:"0px"
						
	})
	$(".lxy-four-hengtiao2 p").hide();
	$(".lxy-four-hengtiao1 p").hide();

 }
 if(mySwiper.activeIndex =="3"){
	// three
	// 1
	$(".lxy-three-1").animate({
		width:"0px"


	})
	$(".lxy-11").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-12").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-13").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-14").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-15").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-16").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-17").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-18").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-19").animate({
					top: "0px",
					left:"0px"	
	})
	$(".lxy-20").animate({
					top: "0px",
					left:"0px"	
	})
	// 2
	$(".lxy-21").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-22").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-23").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-24").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-25").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-26").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-27").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-28").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-29").animate({
					top: "0px",
					right:"0px"	
	})
	$(".lxy-30").animate({
					top: "0px",
					right:"0px"	
	})
	// 3
	$(".lxy-31").animate({
					top: "0px",
					left:"151px"	
	})
	$(".lxy-32").animate({
					top:"0px",
					left:"251px"	
	})
	$(".lxy-33").animate({
					top: "0px",
					left:"356px"	
	})
	$(".lxy-34").animate({
					top: "0px",
					left:"461px"	
	})
	$(".lxy-35").animate({
					top:"0px",
					left:"561px"	
	})
	$(".lxy-36").animate({
					top: "0px",
					left:"671px"	
	})
	// four
	// 1
	$(".lxy-38").animate({
					top: "-95px",
					left:"-460px"	
	},300)
	$(".lxy-39").animate({
					top: "-95px",
					left:"-275px"	
	},500)
	$(".lxy-40").animate({
					top: "-95px",
					left:"-90px"	
	},700)
	$(".lxy-41").animate({
					top: "-95px",
					left:"92px"	
	},700)
	$(".lxy-42").animate({
					top: "-95px",
					left:"275px"	
	},500)
	$(".lxy-43").animate({
					top: "-95px",
					left:"460px"	
	},300)
	// 2
	$(".lxy-44").animate({
					top: "100px",
					left:"-460px"	
	},300)
	$(".lxy-45").animate({
					top: "100px",
					left:"-275px"	
	},500)
	$(".lxy-46").animate({
					top: "100px",
					left:"-90px"	
	},700)
	$(".lxy-47").animate({
					top: "100px",
					left:"92px"	
	},700)
	$(".lxy-48").animate({
					top: "100px",
					left:"275px"	
	},500)
	$(".lxy-49").animate({
					top: "100px",
					left:"460px"	
	},300)
	$(".lxy-four-1").show(1000);
	$(".lxy-four-hengtiao1").animate({
					height:"170px",
						
	},1000)
	$(".lxy-four-hengtiao2").animate({
					height:"170px"
						
	},1000)
	$(".lxy-four-hengtiao2 p").show(1000);
	$(".lxy-four-hengtiao1 p").show(1000);
	//five
	$("document").ready(function(){
		$(".lxy-five-ziyuan").animate({
					left:'490px',
					fontSize:"15px"		
					},function(){

		$(".lxy-five-ziyuan").animate({
					left:'400px',
					fontSize:"20px",
					color:"#38f"	
		},function(){
		$(".lxy-five-ziyuan").animate({
					left:'0px',
					fontSize:"30px",
					color:"#e94b59"
		})
		})				
					})
	})
	$("document").ready(function(){
		$(".lxy-five-weizi").animate({
					right:'490px',
					fontSize:"12px"		
					},function(){

		$(".lxy-five-weizi").animate({
					right:'400px',
					fontSize:"20px",
					color:"#38f"	
		},function(){
		$(".lxy-five-weizi").animate({
					right:'0px',
					fontSize:"30px",
					color:"#e94b59"
		})
		})				
					})
	})

	
	$("document").ready(function(){
		$(".lxy-dayuan1").animate({
					left:"185px",
					top:"0px",
					width:"281px",
					height:"281px"

		},function(){
			$(".lxy-dayuan1").animate({
					

					left:"0px",
					top:"100px",
					width:"70px",
					height:"70px"	
			})
		})

	})
	$("document").ready(function(){
		$(".lxy-dayuan2").animate({
					left:"0px",
					top:"0px",
					width:"281px",
					height:"281px"

		},function(){
			$(".lxy-dayuan2").animate({
					left:"0px",
					top:"100px",
					width:"70px",
					height:"70px"
			})
		})

	})
	$("document").ready(function(){
		$(".lxy-dayuan3").animate({
					left:"905px",
					top:"0px",
					width:"281px",
					height:"281px"
		},function(){
			$(".lxy-dayuan3").animate({
					

					left:"0px",
					top:"100px",
					width:"70px",
					height:"70px"

			})
		})

	})
	// banyuan
	$("document").ready(function(){
		$(".lxy-huikuang1").animate({
					top:"482px"
		},function(){
		$(".lxy-huikuang1").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang1").animate({
					
					top:"0px"
		},100)	
		})	
		})
	})
		$("document").ready(function(){
		$(".lxy-huikuang2").animate({
					top:"482px"
		},function(){
		$(".lxy-huikuang2").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang2").animate({
					top:"0px"
		},100)	
		})	
		})
	})
		$("document").ready(function(){
		$(".lxy-huikuang3").animate({
					top:"482px"
		},function(){
		$(".lxy-huikuang3").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang3").animate({
					
					top:"0px"
		},100)	
		})	
		})
	}) 



}
	if(mySwiper.activeIndex =="4"){
	//four
	$(".lxy-four-imgku img").animate({
					top:'0px',
					left:"0px"
	})
	$(".lxy-four-1").hide();
	$(".lxy-four-hengtiao1").animate({
					height:"0px",
						
	})
	$(".lxy-four-hengtiao2").animate({
					height:"0px"
						
	})
	$(".lxy-four-hengtiao2 p").hide();
	$(".lxy-four-hengtiao1 p").hide();

	//five
	
	$("document").ready(function(){
		$(".lxy-five-ziyuan").animate({
					left:'490px',
					fontSize:"15px"		
					},1000,function(){

		$(".lxy-five-ziyuan").animate({
					left:'400px',
					fontSize:"20px",
					color:"#38f"	
		},500,function(){
		$(".lxy-five-ziyuan").animate({
					left:'452px',
					fontSize:"30px",
					color:"#e94b59"
		})
		})				
					})
	})
	$("document").ready(function(){
		$(".lxy-five-weizi").animate({
					right:'490px',
					fontSize:"12px"		
					},1000,function(){

		$(".lxy-five-weizi").animate({
					right:'400px',
					fontSize:"20px",
					color:"#38f"	
		},500,function(){
		$(".lxy-five-weizi").animate({
					right:'452px',
					fontSize:"30px",
					color:"#e94b59"
		})
		})				
					})
	})

	
	$("document").ready(function(){
		$(".lxy-dayuan1").animate({
					left:"245px",
					top:"100px",
					width:"70px",
					height:"70px"

		},2000,function(){
			$(".lxy-dayuan1").animate({
					left:"185px",
					top:"0px",
					width:"281px",
					height:"281px"
			})
		})

	})
	$("document").ready(function(){
		$(".lxy-dayuan2").animate({
					left:"600px",
					top:"100px",
					width:"70px",
					height:"70px"

		},1500,function(){
			$(".lxy-dayuan2").animate({
					left:"540px",
					top:"0px",
					width:"281px",
					height:"281px"
			})
		})

	})
	$("document").ready(function(){
		$(".lxy-dayuan3").animate({
					left:"965px",
					top:"100px",
					width:"70px",
					height:"70px"

		},1000,function(){
			$(".lxy-dayuan3").animate({
					left:"905px",
					top:"0px",
					width:"281px",
					height:"281px"
			})
		})

	})
	// banyuan
	$("document").ready(function(){
		$(".lxy-huikuang1").animate({
					top:"502px"
		},2000,function(){
		$(".lxy-huikuang1").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang1").animate({
					top:"482px"
		},100)	
		})	
		})
	})
		$("document").ready(function(){
		$(".lxy-huikuang2").animate({
					top:"502px"
		},1500,function(){
		$(".lxy-huikuang2").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang2").animate({
					top:"482px"
		},100)	
		})	
		})
	})
		$("document").ready(function(){
		$(".lxy-huikuang3").animate({
					top:"502px"
		},1000,function(){
		$(".lxy-huikuang3").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang3").animate({
					top:"482px"
		},100)	
		})	
		})
	})
	
	// six
		$(".lxy-bbq").fadeOut();
		$(".lxy-six-1").hide();
		$(".lxy-six-2").fadeOut();
		$("document").ready(function(){
			$(".lxy-shouji").animate({
					left:"0px"
			},function(){
				$(".lxy-55").animate({
					height:"0px"
				},function(){
				$(".lxy-jiantou1").animate({
					top:"170px"
				},function(){
					$(".lxy-jiantou2").animate({
						top:"143px"
					},function(){
					$(".lxy-jiantou3").animate({
							top:"143px"
					},function(){
					$(".lxy-jiantou4").animate({
							top:"114px"
					},function(){
					$(".lxy-jiantou5").animate({
							top:"155px"
					},function(){
						$(".lxy-huiyuan1 img").animate({
							top:"-200px"})
						

						$(".lxy-huiyuan2 img").animate({
							top:"-400px"
						})


						$(".lxy-huiyuan3 img").animate({
							top:"-300px"
						})



						$(".lxy-huiyuan4 img").animate({
							top:"-300px"
						})


						$(".lxy-huiyuan5 img").animate({
							top:"-250px"
						})


						$(".lxy-huiyuan6 img").animate({
							top:"-600px"
						})

						$(".lxy-huiyuan7 img").animate({
							top:"-300px"
						})
						$(".lxy-huiyuan8 img").animate({
							top:"-400px"
						})
						$(".lxy-lujing1yuan").fadeOut()
						$(".lxy-lujing1xian1").animate({
							top:"105px"
						})
						$(".lxy-lujing1xian2").animate({
							left:"430px"
						})
						$(".lxy-lujing1xian3").animate({
							top:"-40px"
						})
						$(".lxy-sanjiaoxing").fadeOut()
						$(".lxy-duanluo").hide()




					})
					})
					})
					})
				})
				})
			})

		})



	}

	if(mySwiper.activeIndex =="5"){
			//five
	$("document").ready(function(){
		$(".lxy-five-ziyuan").animate({
					left:'490px',
					fontSize:"15px"		
					},function(){

		$(".lxy-five-ziyuan").animate({
					left:'400px',
					fontSize:"20px",
					color:"#38f"	
		},function(){
		$(".lxy-five-ziyuan").animate({
					left:'0px',
					fontSize:"30px",
					color:"#e94b59"
		})
		})				
					})
	})
	$("document").ready(function(){
		$(".lxy-five-weizi").animate({
					right:'490px',
					fontSize:"12px"		
					},function(){

		$(".lxy-five-weizi").animate({
					right:'400px',
					fontSize:"20px",
					color:"#38f"	
		},function(){
		$(".lxy-five-weizi").animate({
					right:'0px',
					fontSize:"30px",
					color:"#e94b59"
		})
		})				
					})
	})

	
	$("document").ready(function(){
		$(".lxy-dayuan1").animate({
					left:"185px",
					top:"0px",
					width:"281px",
					height:"281px"

		},function(){
			$(".lxy-dayuan1").animate({
					

					left:"0px",
					top:"100px",
					width:"70px",
					height:"70px"	
			})
		})

	})
	$("document").ready(function(){
		$(".lxy-dayuan2").animate({
					left:"540px",
					top:"0px",
					width:"281px",
					height:"281px"

		},function(){
			$(".lxy-dayuan2").animate({
					left:"0px",
					top:"100px",
					width:"70px",
					height:"70px"
			})
		})

	})
	$("document").ready(function(){
		$(".lxy-dayuan3").animate({
					left:"905px",
					top:"0px",
					width:"281px",
					height:"281px"
		},function(){
			$(".lxy-dayuan3").animate({
					

					left:"0px",
					top:"100px",
					width:"70px",
					height:"70px"

			})
		})

	})
	// banyuan
	$("document").ready(function(){
		$(".lxy-huikuang1").animate({
					top:"482px"
		},function(){
		$(".lxy-huikuang1").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang1").animate({
					
					top:"0px"
		},100)	
		})	
		})
	})
		$("document").ready(function(){
		$(".lxy-huikuang2").animate({
					top:"482px"
		},function(){
		$(".lxy-huikuang2").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang2").animate({
					top:"0px"
		},100)	
		})	
		})
	})
		$("document").ready(function(){
		$(".lxy-huikuang3").animate({
					top:"482px"
		},function(){
		$(".lxy-huikuang3").animate({
					top:"462px"
		},200,function(){
		$(".lxy-huikuang3").animate({
					
					top:"0px"
		},100)	
		})	
		})
	})



		// six
		$(".lxy-bbq").fadeIn(2000);
		$(".lxy-six-1").show(2500);
		$(".lxy-six-2").fadeIn(2500);
		$("document").ready(function(){
			$(".lxy-shouji").animate({
					left:"215px"
			},300,function(){
				$(".lxy-55").animate({
					height:"90px"
				},function(){
				$(".lxy-jiantou1").animate({
					top:"0px"
				},100,function(){
					$(".lxy-jiantou2").animate({
						top:"0px"
					},100,function(){
					$(".lxy-jiantou3").animate({
							top:"0px"
					},100,function(){
					$(".lxy-jiantou4").animate({
							top:"0px"
					},100,function(){
					$(".lxy-jiantou5").animate({
							top:"0px"
					},200,function(){
						$(".lxy-huiyuan1 img").animate({
							top:"60px"
						},200,function(){
						$(".lxy-huiyuan1 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan1 img").animate({
							top:"15px"
							},100,function(){
								$(".lxy-huiyuan1 img").animate({
									top:"45px"
								},100,function(){
								$(".lxy-huiyuan1 img").animate({
									top:"30px"
								})	
								})
							})
						})
						})

						$(".lxy-huiyuan2 img").animate({
							top:"60px"
						},300,function(){
						$(".lxy-huiyuan2 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan2 img").animate({
							top:"15px"
							},100,function(){
								$(".lxy-huiyuan2 img").animate({
									top:"45px"
								},100,function(){
								$(".lxy-huiyuan2 img").animate({
									top:"30px"
								})	
								})
							})
						})
						})


						$(".lxy-huiyuan3 img").animate({
							top:"60px"
						},100,function(){
						$(".lxy-huiyuan3 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan3 img").animate({
							top:"30px"
							},100,function(){
								$(".lxy-huiyuan3 img").animate({
									top:"40px"
								},100,function(){
								$(".lxy-huiyuan3 img").animate({
									top:"35px"
								})	
								})
							})
						})
						})



						$(".lxy-huiyuan4 img").animate({
							top:"60px"
						},400,function(){
						$(".lxy-huiyuan4 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan4 img").animate({
							top:"15px"
							},100,function(){
								$(".lxy-huiyuan4 img").animate({
									top:"45px"
								},100,function(){
								$(".lxy-huiyuan4 img").animate({
									top:"30px"
								})	
								})
							})
						})
						})


						$(".lxy-huiyuan5 img").animate({
							top:"60px"
						},500,function(){
						$(".lxy-huiyuan5 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan5 img").animate({
							top:"15px"
							},100,function(){
								$(".lxy-huiyuan5 img").animate({
									top:"45px"
								},100,function(){
								$(".lxy-huiyuan5 img").animate({
									top:"30px"
								})	
								})
							})
						})
						})


						$(".lxy-huiyuan6 img").animate({
							top:"60px"
						},400,function(){
						$(".lxy-huiyuan6 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan6 img").animate({
							top:"15px"
							},100,function(){
								$(".lxy-huiyuan6 img").animate({
									top:"45px"
								},100,function(){
								$(".lxy-huiyuan6 img").animate({
									top:"30px"
								})	
								})
							})
						})
						})

						$(".lxy-huiyuan7 img").animate({
							top:"60px"
						},600,function(){
						$(".lxy-huiyuan7 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan7 img").animate({
							top:"15px"
							},100,function(){
								$(".lxy-huiyuan7 img").animate({
									top:"45px"
								},100,function(){
								$(".lxy-huiyuan7 img").animate({
									top:"30px"
								})	
								})
							})
						})
						})
						$(".lxy-huiyuan8 img").animate({
							top:"100px"
						},600,function(){
						$(".lxy-huiyuan8 img").animate({
							top:"0px"
						},200,function(){
						$(".lxy-huiyuan8 img").animate({
							top:"25px"
							},100,function(){
								$(".lxy-huiyuan8 img").animate({
									top:"75px"
								},100,function(){
								$(".lxy-huiyuan8 img").animate({
									top:"50px",
									
								},200,function(){
									$(".lxy-lujing1yuan").fadeIn(200,function(){
										$(".lxy-lujing1xian1").animate({
											top:'0px'
										},400,function(){
											$(".lxy-lujing1xian2").animate({
												left:"0px"
											},200,function(){
												$(".lxy-lujing1xian3").animate({
														top:"0px"
												},100,function(){
													$(".lxy-sanjiaoxing").fadeIn(200,function(){
														$(".lxy-duanluo").show(200)
													})
												})
											})
										})
									})
								})	
								})
							})
						})
						})





					})
					})
					})
					})
				})
				})
			})

		})
	//seven
	$(".page5 .m-5-1").hide()
		$("document").ready(function(){
			$(".page5 .m-5-2").fadeOut();
			$(".page5 .m-5-3").fadeOut();
			$(".page5 .m-5-4").fadeOut();
			$(".page5 .m-5-5").fadeOut();
		})

	}
		if(mySwiper.activeIndex =="6"){
	
	// seven
		$(".page5 .m-5-1").show(2000)
		$("document").ready(function(){
			$(".page5 .m-5-2").fadeIn(3000);
			$(".page5 .m-5-3").fadeIn(4000);
			$(".page5 .m-5-4").fadeIn(5000);
			$(".page5 .m-5-5").fadeIn(6000);
		})
		
	// six
		$(".lxy-bbq").fadeOut();
		$(".lxy-six-1").hide();
		$(".lxy-six-2").fadeOut();
		$("document").ready(function(){
			$(".lxy-shouji").animate({
					left:"0px"
			},function(){
				$(".lxy-55").animate({
					height:"0px"
				},function(){
				$(".lxy-jiantou1").animate({
					top:"170px"
				},function(){
					$(".lxy-jiantou2").animate({
						top:"143px"
					},function(){
					$(".lxy-jiantou3").animate({
							top:"143px"
					},function(){
					$(".lxy-jiantou4").animate({
							top:"114px"
					},function(){
					$(".lxy-jiantou5").animate({
							top:"155px"
					},function(){
						$(".lxy-huiyuan1 img").animate({
							top:"-200px"})
						

						$(".lxy-huiyuan2 img").animate({
							top:"-400px"
						})


						$(".lxy-huiyuan3 img").animate({
							top:"-300px"
						})



						$(".lxy-huiyuan4 img").animate({
							top:"-300px"
						})


						$(".lxy-huiyuan5 img").animate({
							top:"-250px"
						})


						$(".lxy-huiyuan6 img").animate({
							top:"-600px"
						})

						$(".lxy-huiyuan7 img").animate({
							top:"-300px"
						})
						$(".lxy-huiyuan8 img").animate({
							top:"-400px"
						})
						$(".lxy-lujing1yuan").fadeOut()
						$(".lxy-lujing1xian1").animate({
							top:"105px"
						})
						$(".lxy-lujing1xian2").animate({
							left:"430px"
						})
						$(".lxy-lujing1xian3").animate({
							top:"-40px"
						})
						$(".lxy-sanjiaoxing").fadeOut()
						$(".lxy-duanluo").hide()




					})
					})
					})
					})
				})
				})
			})

		})



	}

 									
}
	})
// one
 function timer(){

			$(".lxy-liangd").fadeOut(1000);

			$(".lxy-liangd").fadeIn(1000);
		}
setInterval(timer,100);	

$(".lxy-wenzi1").animate({
	    				left:"304px",
	    				top:"335px"
	    			},500);	
$(".lxy-wenzi2").animate({
	    				top:"420px",
	    				right:"64px"
	    			},500);
$(".lxy-one-top p").fadeIn(1000);
// two
//three
$(".lxy-three-2 img").addClass("buzz");
