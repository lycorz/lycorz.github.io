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
	    			$(".al-bt1").animate({top:'140px',fontSize:'12px'},1000,function(){
	    				$(".al-bt1").animate({top:'80px',fontSize:'24px'},1000)
	    			});
	    			$(".al-bt2").animate({left:'500px'},1000,function(){
	    				$(".al-bt2").animate({left:'450px'},1000)
	    			});
	    			$(".al-bt3").animate({left:'500px',top:'160px'},1000,function(){
	    				$(".al-bt3").animate({left:'450px'},1000)
	    			});
	    			$(".al-bt4").animate({left:'600px'},1000,function(){
	    				$(".al-bt4").animate({left:'450px'},1000)
	    			});
	    			$(".al-bt5").animate({left:'500px'},1000,function(){
	    				$(".al-bt5").animate({left:'450px'},1000)
	    			});
	    			$(".al-bt6").animate({left:'600px'},1000,function(){
	    				$(".al-bt6").animate({left:'445px'},1000)
	    			});
	    			$(".al-bt7").animate({left:'450px'},1000,function(){
	    				$(".al-bt7").animate({left:'550px'},1000)
	    			});
	    			$(".al-bt8").animate({left:'600px'},1000,function(){
	    				$(".al-bt8").animate({left:'445px'},1000)
	    			});
	    			$(".al-bt9").animate({left:'600px'},1000,function(){
	    				$(".al-bt9").animate({left:'445px'},1000)
	    			});
	    			$(".al-bt10").animate({top:'600px',fontSize:'12px'},1000,function(){
	    				$(".al-bt10").animate({top:'530px',fontSize:'18px'},1000)
	    			}
	    			);
	    			$(".m-page1 .m-img2").animate({left:'0'});
	    			$(".m-page1 .m-img3").animate({top:'0'});
	    	
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
	     	if(mySwiper.activeIndex =="0"){
	    			$(".m-page1 .m-img2").animate({left:'348px'},1000);
	    			$(".m-page1 .m-img3").animate({top:'440px'},1000);
	    			$(".al-bt1").animate({top:'0px'});
	    			$(".al-bt2").animate({left:'0px'});
	    			$(".al-bt3").animate({left:'1000px',top:'0px'});
	    			$(".al-bt4").animate({left:'0px'});
	    			$(".al-bt5").animate({left:'1000px'});
	    			$(".al-bt6").animate({left:'0px'});
	    			$(".al-bt7").animate({left:'1000px'});
	    			$(".al-bt8").animate({left:'0px'});
	    			$(".al-bt9").animate({left:'1000px'});
	    			$(".al-bt9").animate({left:'0px'});
	    			$(".al-bt10").animate({top:'0px'});
	    		    
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
	left:'348px',
},1000)

$(".m-page1 .m-img3").animate({
	top:'440px',
},1000)	
//第二页

$("#al-d1").click(function(){
    var val=$('input:radio[name="an"]:checked').val(); 
	if(val==null){
	    $("#al-d1").val("请选中一个");
	    $("#al-d1").css('color','red').css('font-size','14px')
	}
})

$("input[name=an]").click(function(){
	console.log($(this).val)
	if($(this).val()=="其他"&&$(this).is(":checked")){
		$("#al-d1").removeAttr('disabled')
	}else{
	$("#al-d1").attr('disabled','disabled')
	}
})
$("#al-d1").blur(function(){
	$("#al-d1").val("");
	$("#al-d1").css('color','black').css('font-size','14px')
})
$("#an-p").click(function(){
	$("#an-p").val("");
		$("#an-p").css('color','black').css('font-size','14px')
})
$("#an-p").blur(function(){
	var re=/^[\u4e00-\u9fa5]{2,5}$/;
	if(!re.test($("#an-p").val)){
		$("#an-p").val("姓名只能是2-5位的中文汉字");
		$("#an-p").css('color','red').css('font-size','14px')
	}
})
$("#an-p1").click(function(){
	$("#an-p1").val("");
		$("#an-p1").css('color','black').css('font-size','14px')
})
$("#an-p1").blur(function(){
	var re=/^[1][3|4|5|7|8][0-9]{9}$/;
	if(!re.test($("#an-p1").val)){
		$("#an-p1").val("请输入合法的手机号");
		$("#an-p1").css('color','red').css('font-size','14px')
	}
})
$("#an-p2").click(function(){
	$("#an-p2").val("");
		$("#an-p2").css('color','black').css('font-size','14px')
})
$("#an-p2").blur(function(){
	var re=/^\w+@[a-zA-Z0-9]+\.[a-z]+$/;
	if(!re.test($("#an-p2").val)){
		$("#an-p2").val("请输入合法的邮箱");
		$("#an-p2").css('color','red').css('font-size','14px')
	}
})

$("#an-dian").click(function(){
	var re=/^[\u4e00-\u9fa5]{2,5}$/;
	var re1=/^[1][3|4|5|7|8][0-9]{9}$/;
	var re2=/^\w+@[a-zA-Z0-9]+\.[a-z]+$/;
	if($("#an-p").val("")){
		$("#an-p").val("姓名不能为空");
		$("#an-p").css('color','red').css('font-size','14px')	
	}
	if($("#an-p1").val("")){
		$("#an-p1").val("手机号不能为空");
		$("#an-p1").css('color','red').css('font-size','14px')
	}
	if($("#an-p2").val("")){
		$("#an-p2").val("邮箱不能为空");
		$("#an-p2").css('color','red').css('font-size','14px')
	}
	$("#an-p1").blur(function(){
	var re=/^[1][3|4|5|7|8][0-9]{9}$/;
	if(!re.test($("#an-p1").val)){
		$("#an-p1").val("请输入合法的手机号");
		$("#an-p1").css('color','red').css('font-size','14px')
	}
	})
	$("#an-p").blur(function(){
	var re=/^[\u4e00-\u9fa5]{2,5}$/;
	if(!re.test($("#an-p").val)){
		$("#an-p").val("姓名只能是2-5位的中文汉字");
		$("#an-p").css('color','red').css('font-size','14px')
	}
	})
	$("#an-p2").blur(function(){
	var re=/^\w+@[a-zA-Z0-9]+\.[a-z]+$/;
	if(!re.test($("#an-p2").val)){
		$("#an-p2").val("请输入合法的邮箱");
		$("#an-p2").css('color','red').css('font-size','14px')
	}
    })
	var val=$('input:radio[name="liu"]:checked').val(); 
	if(val==null){
        alert("请选择预计花费")
	}
	var val=$('input:radio[name="an"]:checked').val(); 
	if(val==null){
        alert("请选择广告需求")
	}
    })
	
//第三页


//第四页




//第五页



//第六页




//第七页

 



//第八页





//第九页





//第十页