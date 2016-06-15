window.onload=function () {
	//置顶
	var oFh=document.getElementById('oFh');
	var oFhLi1=oFh.getElementsByTagName('li')[0];
	var timer111=null;
	var timer333=null;
	var oXl=document.getElementById('oXl');
	var oXl_Ul=oXl.getElementsByTagName('ul')[0];
	var oXl_Li=oXl.getElementsByTagName('li');
	var oXl_A=oXl.getElementsByTagName('a');
	var oFour_One=document.getElementById('oFour_One');
	var oFour_H=oFour_One.getElementsByTagName('h2');
	var oFour_Tow=document.getElementById('oFour_Tow');
	var oFour_Tow_H=oFour_Tow.getElementsByTagName('h2');

	window.onscroll=function (ev) {
		var ev=ev||window.event;
		oFh.style.display='block';
		oXl_Ul.style.display='none';
		oFtop=document.documentElement.scrollTop||document.body.scrollTop;
		if (oFtop<=0) {
			oFh.style.display='none';
			
		}else{
			oFh.style.display='block';
		}
		
		if (oFtop>=1200&&oFtop<=9000) {
				oXl_Ul.style.display='block';
				if (oFtop>=1200&&oFtop<1900) {
					oXl_A[0].style.display='none';
					oXl_A[1].style.display='block';
					oXl_A[1].style.background='#fff';
					oXl_A[1].style.color='#c81623';
				}else{
					oXl_A[0].style.display='block';
					oXl_A[1].style.display='none';
					oXl_A[1].style.background='';
					oXl_A[1].style.color='';
				}
				if (oFtop>=1900&&oFtop<2600) {
					oXl_A[2].style.display='none';
					oXl_A[3].style.display='block';
					oXl_A[3].style.background='#fff';
					oXl_A[3].style.color='#c81623';
				}else{
					oXl_A[2].style.display='block';
					oXl_A[3].style.display='none';
					oXl_A[3].style.background='';
					oXl_A[3].style.color='';
				}
				if (oFtop>=2600&&oFtop<3300) {
					oXl_A[4].style.display='none';
					oXl_A[5].style.display='block';
					oXl_A[5].style.background='#fff';
					oXl_A[5].style.color='#c81623';
				}else{
					oXl_A[4].style.display='block';
					oXl_A[5].style.display='none';
					oXl_A[5].style.background='';
					oXl_A[5].style.color='';
				}
			}else{
				oXl_Ul.style.display='none';
		}

		oXl_Li[0].onclick=function () {
			clearInterval(timer333);
			if (oFtop<1737) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=1737) {
						oFtop=1737;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>1737) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=1737) {
						oFtop=1737;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[1].onclick=function () {
			clearInterval(timer333);
			if (oFtop<2504) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=2504) {
						oFtop=2504;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>2504) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=2504) {
						oFtop=2504;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[2].onclick=function () {
			clearInterval(timer333);
			if (oFtop<3251) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=3251) {
						oFtop=3251;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>3251) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=3251) {
						oFtop=3251;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[3].onclick=function () {
			clearInterval(timer333);
			if (oFtop<3859) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=3859) {
						oFtop=3859;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>3859) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=3859) {
						oFtop=3859;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[4].onclick=function () {
			clearInterval(timer333);
			if (oFtop<4467) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=4467) {
						oFtop=4467;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>4467) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=4467) {
						oFtop=4467;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[5].onclick=function () {
			clearInterval(timer333);
			if (oFtop<5215) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=5215) {
						oFtop=5215;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>5215) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=5215) {
						oFtop=5215;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[6].onclick=function () {
			clearInterval(timer333);
			if (oFtop<5823) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=5823) {
						oFtop=5823;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>5823) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=5823) {
						oFtop=5823;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[7].onclick=function () {
			clearInterval(timer333);
			if (oFtop<6430) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=6430) {
						oFtop=6430;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>6430) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=6430) {
						oFtop=6430;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[8].onclick=function () {
			clearInterval(timer333);
			if (oFtop<7039) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=7039) {
						oFtop=7039;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>7039) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=7039) {
						oFtop=7039;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[9].onclick=function () {
			clearInterval(timer333);
			if (oFtop<7786) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=7786) {
						oFtop=7786;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>7786) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=7786) {
						oFtop=7786;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oXl_Li[10].onclick=function () {
			clearInterval(timer333);
			if (oFtop<8393) {
				timer333=setInterval(function () {
					oFtop+=20;
					if (oFtop>=8393) {
						oFtop=8393;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
			if (oFtop>8393) {
				timer333=setInterval(function () {
					oFtop-=20;
					if (oFtop<=8393) {
						oFtop=8393;
						clearInterval(timer333);
					}
					document.documentElement.scrollTop=oFtop;
					document.body.scrollTop=oFtop;
				},1)
			}
		}

		oFhLi1.onclick=function () {
			document.documentElement.scrollTop=0;
			document.body.scrollTop=0;
			/*timer111=setInterval(function () {
				oFtop-=20;
				if (oFtop<=0) {
					clearInterval(timer111);
				}
				document.documentElement.scrollTop=oFtop;
				document.body.scrollTop=oFtop;
			},1)*/
		}
	}
}