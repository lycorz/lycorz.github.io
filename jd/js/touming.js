window.onload=function () {
	// 透明图切换
	var oTow=document.getElementById('oTow');
	var oTowout=document.getElementById('oTowout');
	var lis=oTowout.getElementsByTagName('li');
	var oTowint=document.getElementById('oTowint');
	var intlis=oTowint.getElementsByTagName('li');
	var oTowleft=document.getElementById('oTowleft');
	var oTowright=document.getElementById('oTowright');
	var timer3=null;
	var timer2=null;
	var num=0;
	var var1 = 0;
	var varTag = false;
	function move (num) {
		clearInterval(timer3);
		clearEvent();
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.zIndex='8';
			intlis[i].className='';
		}
		lis[num].style.zIndex='9';
		intlis[num].className='oTowintli';
		var ind=0;
		timer3=setInterval(function () {
			ind+=0.02;
			if (ind>=1) {
				ind=1;
				bindEvent();
				clearInterval(timer3);
			}
			lis[num].style.opacity=ind;
		},10)
	}

	function automove () {
		num++;
		if (num>=lis.length) {
			num=0;
			move(num);
		}
		move(num);
	}

	timer2=setInterval(automove,3000);

	for (var i = 0; i < intlis.length; i++) {
		intlis[i].index=i;
		intlis[i].onmouseover=function () {
			clearInterval(timer2);
			preNum = num;
			num=this.index;
			move(num);
		}
		intlis[i].onmouseout=function () {
			timer2=setInterval(automove,3000);
		}
	}

	function bindEvent () {
		/*for (var i = 0; i < intlis.length; i++) {
			intlis[i].index=i;
			intlis[i].onmouseover=function () {
				clearInterval(timer2);
				num=this.index;
				move(num);
			}

			intlis[i].onmouseout=function () {
				timer2=setInterval(automove,3000);
			}
		}*/

		oTowleft.onclick=function () {
			clearInterval(timer2);
			num--;
			if (num<0) {
			num=lis.length-1;
			}
			move(num);
			timer2=setInterval(automove,3000);
		}

		oTowright.onclick=function () {
			clearInterval(timer2);
			num++;
			if (num>=lis.length) {
			num=0;
			}
			move(num);
			timer2=setInterval(automove,3000);
		}
	}

	
	bindEvent();

	function clearEvent () {
		/*for (var i = 0; i < intlis.length; i++) {
			intlis[i].index=i;
			intlis[i].onmouseover=function () {
				varTag = true;
				var1 = this.index;
				if(num==var1){
					return false;
				}
				return false;
			}

			intlis[i].onmouseout=function () {
				return false;
			}
		}*/

		oTowleft.onclick=function () {
			return false;
		}

		oTowright.onclick=function () {
			return false;
		}
	}


	oTowout.onmouseover=function () {
		oTowleft.style.display='block';
		oTowright.style.display='block';
	}
	oTowout.onmouseout=function () {
		oTowleft.style.display='none';
		oTowright.style.display='none';
	}
	oTowleft.onmouseover=function () {
		oTowleft.style.display='block';
		oTowright.style.display='block';
	}
	oTowleft.onmouseout=function () {
		oTowleft.style.display='none';
		oTowright.style.display='none';
	}
	oTowright.onmouseover=function () {
		oTowleft.style.display='block';
		oTowright.style.display='block';
	}
	oTowright.onmouseout=function () {
		oTowleft.style.display='none';
		oTowright.style.display='none';
	}
}