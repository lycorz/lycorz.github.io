window.onload=function () {
	//楼里的图片滚动
	var oFour_D2=document.getElementById('oFour_OnePw_Rli_D2');
	var Img=oFour_D2.getElementsByTagName('img'); 
	var oFour_D2_L=document.getElementById('oFour_OnePw_Rli_D2_DDL');
	var oFour_D2_R=document.getElementById('oFour_OnePw_Rli_D2_DDR');
	var num_D=0;
	var timer_D=null;
	var timer2_D=null;
	function gundong () {
		clearInterval(timer_D);
		qqq();
		var S=oFour_D2.scrollLeft;
		var E=Img[0].offsetWidth*num_D;
		var ST=0;
		var SM=10;
		var ES=(E-S)/SM;
		
		timer_D=setInterval(function () {
			ST++;
			if (ST==SM) {
				ST=0;
				clearInterval(timer_D);
				eee();
			}
			S+=ES;
			oFour_D2.scrollLeft=S;
		},15)
	}
	function autogundong () {
		num_D++;
		if (num_D>=Img.length) {
			num_D=2;
			oFour_D2.scrollLeft=Img[0].offsetWidth;
		}
		gundong();
	}

	timer2_D=setInterval(autogundong,3000);

	function eee () {
		oFour_D2_L.onclick=function () {
			num_D++;
			if (num_D>=Img.length) {
				num_D=2;
				oFour_D2.scrollLeft=Img[0].offsetWidth;
			}
			gundong();
		}

		oFour_D2_R.onclick=function () {
			num_D--;
			if (num_D<0) {
				num_D=Img.length-3;
				oFour_D2.scrollLeft=Img[0].offsetWidth*(num_D+1);
			}
			gundong();
		}
	}

	eee();

	function qqq () {
		oFour_D2_L.onclick=function () {
			return false;
		}
		oFour_D2_R.onclick=function () {
			return false;
		}
	}

	oFour_D2_L.onmouseover=function () {
		clearInterval(timer2_D);
		oFour_D2_L.style.display='block';
		oFour_D2_R.style.display='block';
	}
	oFour_D2_L.onmouseout=function () {
		timer2_D=setInterval(autogundong,3000);
		oFour_D2_L.style.display='none';
		oFour_D2_R.style.display='none';
	}
	oFour_D2_R.onmouseover=function () {
		clearInterval(timer2_D);
		oFour_D2_L.style.display='block';
		oFour_D2_R.style.display='block';
	}
	oFour_D2_R.onmouseout=function () {
		timer2_D=setInterval(autogundong,3000);
		oFour_D2_L.style.display='none';
		oFour_D2_R.style.display='none';
	}
	oFour_D2.onmouseover=function () {
		oFour_D2_L.style.display='block';
		oFour_D2_R.style.display='block';
	}
	oFour_D2.onmouseout=function () {
		oFour_D2_L.style.display='none';
		oFour_D2_R.style.display='none';
	}
}