window.onload=function () {
	//oThree图片滚动
	var oThree1RiUl=document.getElementById('oThree1RiUl');
	var oThree1RiLi=oThree1RiUl.getElementsByTagName('li');
	var oThree1Ri=document.getElementById('oThree1Ri');
	var oThree1RiUl1=document.getElementById('oThree1RiUl1');
	var oThree1RiUl1_N=oThree1RiUl1.getElementsByTagName('li');
	var timer4=null;
	var timer5=null;
	var num1=0;

	function move1 () {
		clearInterval(timer4);
		clearEvent11();
		var start=oThree1Ri.scrollLeft;
		var end=oThree1RiLi[0].offsetWidth*num1;
		var step=0;
		var stepmax=30;
		var everystep=(end-start)/stepmax;

		timer4=setInterval(function () {
			step++;
			if (step==stepmax) {
				step=0;
				bindEvent11();
				clearInterval(timer4);
			}
			start=start+everystep;
			oThree1Ri.scrollLeft=start;
		},15)
	}

	oThree1RiUl.onmouseover=function () {
		oThree1RiUl1.style.display='block';
	}
	oThree1RiUl.onmouseout=function () {
		oThree1RiUl1.style.display='none';
	}
	oThree1RiUl1.onmouseover=function () {
		oThree1RiUl1.style.display='block';
	}
	oThree1RiUl1.onmouseout=function () {
		oThree1RiUl1.style.display='none';
	}

	function bindEvent11 () {
	 	oThree1RiUl1_N[0].onclick=function () {
			num1--;
			if (num1<0) {
				num1=oThree1RiLi.length-3;
				oThree1Ri.scrollLeft=oThree1RiLi[0].offsetWidth*(num1+1);
			}
			move1();
		}

		oThree1RiUl1_N[1].onclick=function () {
			num1++;
			if (num1>=oThree1RiLi.length) {
				num1=2;
				oThree1Ri.scrollLeft=oThree1RiLi[0].offsetWidth;
			}
			move1();
		}
	}

	bindEvent11();

	function clearEvent11 () {
		oThree1RiUl1_N[0].onclick=function () {
			return false;
		}

		oThree1RiUl1_N[1].onclick=function () {
			return false;
		}
	}
}