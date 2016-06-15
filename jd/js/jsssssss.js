window.onload=function(){
		//第一页
	var oT4ul=document.getElementById('oTowr4ul');
	var oT4ul_lll=oT4ul.getElementsByTagName('li');
	var oT4ul_sp=oT4ul.getElementsByTagName('span');
	var oT4ul_inn=document.getElementById('oTowr4ul_inn');
	var oT4ul_inni=oT4ul_inn.getElementsByTagName('i');
	var oT4ul_inna=oT4ul_inn.getElementsByTagName('a');
	var oT4ul_innlll=oT4ul_inn.getElementsByTagName('li');
	var oT4ul_innT=209;
	var oT4ulT=0;
	var oT4ul_inniTM=null;
	var oT4ul_lllTM=null;
	var aaaaa=null;

	function qxzz () {
		for (var i = 0; i < oT4ul_inni.length; i++) {
			oT4ul_lll[i].index=i;
			oT4ul_lll[i].onmouseover=function () {
				var k=this.index;
				for (var i = 0; i < oT4ul_inni.length; i++) {
					if(oT4ul_lll[i]==this) {
						clearTimeout(aaaaa);
						aaaaa=setTimeout(function (argument) {
							oT4ul_lllTM=setInterval(function () {
								oT4ul_innT-=3;
								if (oT4ul_innT<=72) {
									oT4ulT-=3;
									if (oT4ulT<=-42) {
										oT4ulT=-42;
										oT4ul_innT=30;
										oT4ul_inna[0].style.display='block';
										oT4ul_inna[1].style.display='block';
										oT4ul_inna[2].style.display='block';
										oT4ul_inna[3].style.display='block';
										clearInterval(oT4ul_lllTM);
										clearTimeout(aaaaa);
									};
								};
								oT4ul.style.top=oT4ulT+'px';
								oT4ul_inn.style.top=oT4ul_innT+'px';
							},1)
						},1000)
					}
					oT4ul_inna[i].style.borderTop='none';
					oT4ul_innlll[i].style.display='none';
					oT4ul_inna[i].style.paddingTop='2px';
				}
				oT4ul_inna[k].style.borderTop='2px solid red';
				oT4ul_innlll[k].style.display='block';
				oT4ul_inna[k].style.paddingTop='0';
			}
		}
	}

	qxzz();

	function zz () {
		for (var i = 0; i < oT4ul_inni.length; i++) {
			oT4ul_lll[i].onmouseover=function () {
				return false;
			}
		}
	}


	for (var i = 0; i < oT4ul_inni.length; i++) {
		oT4ul_inni[i].onclick=function () {
			zz();
			for (var i = 0; i < oT4ul_inni.length; i++) {
				if(oT4ul_inni[i]==this) {
					oT4ul_inna[0].style.display='none';
					oT4ul_inna[1].style.display='none';
					oT4ul_inna[2].style.display='none';
					oT4ul_inna[3].style.display='none';
					oT4ul_inniTM=setInterval(function () {
						oT4ul_innT+=3;
						oT4ulT+=3;
						if (oT4ulT>=0) {
							oT4ulT=0;
						}
						if (oT4ul_innT>=209) {
							oT4ul_innT=209;
							clearInterval(oT4ul_inniTM);
							qxzz();
						}
						oT4ul.style.top=oT4ulT+'px';
						oT4ul_inn.style.top=oT4ul_innT+'px';
					},1)
				}
			};
		}
	};

	for (var i = 0; i < oT4ul_inna.length; i++) {
		oT4ul_inna[i].onmouseover=function () {
			for (var i = 0; i < oT4ul_inna.length; i++) {
				if(oT4ul_inna[i]==this) {
					oT4ul_innlll[i].style.display='block';
					oT4ul_inna[i].style.borderTop='2px solid red';
					oT4ul_inna[i].style.paddingTop='0';
				}else{
					oT4ul_innlll[i].style.display='none';
					oT4ul_inna[i].style.borderTop='none';
					oT4ul_inna[i].style.paddingTop='2px';
				}
			};
		}
	};

  	//红线
	var In=document.getElementById('oTh2wap_In');
	var asd=document.getElementById('oTh2inn_asd');
	var asd_asd=asd.getElementsByTagName('i')[0];
	var ti=null;
	var tii=null;

	In.onmouseover=function (e) {
		var ll=-365;
		tii=setTimeout(function () {
			ti=setInterval(function () {
				ll+=10;
				if (ll>=845) {
					ll=845;
					clearInterval(ti);
				}
				asd_asd.style.left=ll+'px';
			},5)
		},1000)
	}
	In.onmouseout=function () {
		clearInterval(tii);
	}

	//小狗探头
	var oLog=document.getElementById('oLog');
	var oLogl=oLog.getElementsByTagName('em')[0];
	var oLogr=oLog.getElementsByTagName('em')[1];
	var timer=null;
	var timerr=null;
	var oLlw=31;
	var oLrop=0;
	

	oLogl.onmouseover=function () {
		clearInterval(timerr);
		timer=setInterval(function () {
			oLlw+=1;
			oLogr.style.display='block';
			oLrop+=(1/15);
			if (oLlw>=45) {
				oLlw=45;
				oLrop=1;
				clearInterval(timer);
			}
			oLogl.style.width=oLlw+'px';
			oLogr.style.opacity=oLrop;
		},20)
	}

	oLogl.onmouseout=function () {
		clearInterval(timer);
		timerr=setInterval(function () {
			oLlw-=1;
			oLrop-=(1/15);
			if (oLlw<=31) {
				oLlw=31;
				oLrop=0;
				clearInterval(timerr);
			}
			oLogl.style.width=oLlw+'px';
			oLogr.style.opacity=oLrop;
		},20)
	}
	



	//选择城市
	var oLiz=document.getElementById('oLiz');
	var oLizs=oLiz.getElementsByTagName('span')[0];
	var	oLhv=document.getElementById('oLhv');
	var oLhvr=oLhv.getElementsByTagName('div')[1];
	var as=oLhv.getElementsByTagName('a');
	oLiz.onmouseover=function () {
		oLhv.style.display='block';
	}
	oLiz.onmouseout=function () {
		oLhv.style.display='none';
	}
	oLhv.onmouseover=function () {
		oLhv.style.display='block';
	}
	oLhv.onmouseout=function () {
		oLhv.style.display='none';
	}
	for (var i=0; i<as.length; i++) {
		as[i].onclick=function () {
			for (var i=0; i<as.length; i++) {
				if (as[i]==this) {
					oLizs.innerHTML=as[i].innerHTML;
					as[i].className='oLhvrdbl';
					oLhv.style.display='none';
				}else {
					as[i].className='';
				}
			}
		}
		as[i].onmouseover=function () {
			for(var j=0; j<as.length; j++) {
				if (as[j]==this) {
					if (as[j].className=='oLhvrdbl') {
						return false;
					} else{
						as[j].style.color='#c81623';
						as[j].style.background='#f4f4f4';
					};
					
				}
			}
		}
		as[i].onmouseout=function () {
			for(var j=0; j<as.length; j++) {
				if (as[j]==this) {
					as[j].style.color='';
					as[j].style.background='';
				}
			}
		}
	}


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
				if (oFtop>=3300&&oFtop<3900) {
					oXl_A[6].style.display='none';
					oXl_A[7].style.display='block';
					oXl_A[7].style.background='#fff';
					oXl_A[7].style.color='#c81623';
				}else{
					oXl_A[6].style.display='block';
					oXl_A[7].style.display='none';
					oXl_A[7].style.background='';
					oXl_A[7].style.color='';
				}
				if (oFtop>=3900&&oFtop<4600) {
					oXl_A[8].style.display='none';
					oXl_A[9].style.display='block';
					oXl_A[9].style.background='#fff';
					oXl_A[9].style.color='#c81623';
				}else{
					oXl_A[8].style.display='block';
					oXl_A[9].style.display='none';
					oXl_A[9].style.background='';
					oXl_A[9].style.color='';
				}
				if (oFtop>=4600&&oFtop<5250) {
					oXl_A[10].style.display='none';
					oXl_A[11].style.display='block';
					oXl_A[11].style.background='#fff';
					oXl_A[11].style.color='#c81623';
				}else{
					oXl_A[10].style.display='block';
					oXl_A[11].style.display='none';
					oXl_A[11].style.background='';
					oXl_A[11].style.color='';
				}
				if (oFtop>=5250&&oFtop<5830) {
					oXl_A[12].style.display='none';
					oXl_A[13].style.display='block';
					oXl_A[13].style.background='#fff';
					oXl_A[13].style.color='#c81623';
				}else{
					oXl_A[12].style.display='block';
					oXl_A[13].style.display='none';
					oXl_A[13].style.background='';
					oXl_A[13].style.color='';
				}
				if (oFtop>=5830&&oFtop<6450) {
					oXl_A[14].style.display='none';
					oXl_A[15].style.display='block';
					oXl_A[15].style.background='#fff';
					oXl_A[15].style.color='#c81623';
				}else{
					oXl_A[14].style.display='block';
					oXl_A[15].style.display='none';
					oXl_A[15].style.background='';
					oXl_A[15].style.color='';
				}
				if (oFtop>=6450&&oFtop<7140) {
					oXl_A[16].style.display='none';
					oXl_A[17].style.display='block';
					oXl_A[17].style.background='#fff';
					oXl_A[17].style.color='#c81623';
				}else{
					oXl_A[16].style.display='block';
					oXl_A[17].style.display='none';
					oXl_A[17].style.background='';
					oXl_A[17].style.color='';
				}
				if (oFtop>=7140&&oFtop<7790) {
					oXl_A[18].style.display='none';
					oXl_A[19].style.display='block';
					oXl_A[19].style.background='#fff';
					oXl_A[19].style.color='#c81623';
				}else{
					oXl_A[18].style.display='block';
					oXl_A[19].style.display='none';
					oXl_A[19].style.background='';
					oXl_A[19].style.color='';
				}
				if (oFtop>=7790&&oFtop<9000) {
					oXl_A[20].style.display='none';
					oXl_A[21].style.display='block';
					oXl_A[21].style.background='#fff';
					oXl_A[21].style.color='#c81623';
				}else{
					oXl_A[20].style.display='block';
					oXl_A[21].style.display='none';
					oXl_A[21].style.background='';
					oXl_A[21].style.color='';
				}
			}else{
				oXl_Ul.style.display='none';
		}

		oXl_Li[0].onclick=function () {
			clearInterval(timer333);
			if (oFtop<1737) {
				timer333=setInterval(function () {
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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
					oFtop+=60;
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
					oFtop-=60;
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

	//换一批
	var oThree2=document.getElementById('oThree2');
	var oThree2a=oThree2.getElementsByTagName('a')[0];
	var oTh2wap=document.getElementById('oTh2wap');

	oThree2a.onclick=function () {
		oTh2wap.scrollLeft+=1206;
		if (oTh2wap.scrollLeft>=1206*4) {
			oTh2wap.scrollLeft=0;
		}
	}


	//面向对象Tab切换

	function Tab (phulId,PhA,pwulId,PwLi) {
		this.Ph_Ul=document.getElementById(phulId);
		this.Ph_Li1a=this.Ph_Ul.getElementsByTagName(PhA);
		this.Pw_Rul=document.getElementById(pwulId);
		this.Pw_Rli=this.Pw_Rul.getElementsByTagName(PwLi);
		for (var i = 0; i < this.Ph_Li1a.length; i++) {
			var _this=this;
			this.Ph_Li1a[i].onmouseover=function () {
				_this.fnClick(this);
			}
		}
	}

	Tab.prototype.fnClick=function (Target) {
		for (var i = 0; i < this.Ph_Li1a.length; i++) {
			if (this.Ph_Li1a[i]==Target) {
				this.Ph_Li1a[i].className='oFour_OnePh_Li1a';
				// this.Pw_Rli[i].className='oFour_OnePw_Rli';
				this.Pw_Rli[i].style.display='block';
			}else{
				this.Ph_Li1a[i].className='';
				this.Pw_Rli[i].style.display='none';
			}
		}
	}

	var tab1=new Tab('oFour_OnePh_Ul','a','oFour_OnePw_Rul','li');  //一楼
	var tab2=new Tab('oFour_OnePh_U2','a','oFour_TowPw_D4','ul');  //二楼
	var tab3=new Tab('oFour_OnePh_U3','a','oFour_TowPw_dd1','ul');  //三楼
	var tab4=new Tab('oFour_OnePh_U4','a','oFour_TowPw_dd2','ul');   //四楼
	var tab5=new Tab('oFour_OnePh_U5','a','oFour_TowPw_dd3','ul');   //五楼
	var tab6=new Tab('oFour_OnePh_U6','a','oFour_TowPw_D5','ul');    //六楼
	var tab7=new Tab('oFour_OnePh_U7','a','oFour_TowPw_D6','ul');    //七楼 
	var tab8=new Tab('oFour_OnePh_U8','a','oFour_TowPw_D7','ul');    //八楼 
	var tab9=new Tab('oFour_OnePh_U9','a','oFour_TowPw_D8','ul');    //九楼 
	var tab9=new Tab('oFour_OnePh_U10','a','oFour_TowPw_D9','ul');    //十楼 

   	
	//今日抄底
	var Jrcd_Ri=document.getElementById('oFour_Jrcd_Ri');
	var Jrcd_Riz=Jrcd_Ri.getElementsByTagName('div')[0];
	var Jrcd_Li=Jrcd_Ri.getElementsByTagName('li');
	var ttim=null;
	var ttim2=null;
	var num_J=1;

	Jrcd_Riz.scrollTop=num_J*120;
 	
	function gd () {
		clearInterval(ttim);
		var start=Jrcd_Riz.scrollTop;
		var end=120*num_J;
		var sbu=0;
		var mbu=20;
		var ebu=(end-start)/mbu;

		ttim=setInterval(function () {
			sbu++;
			if (sbu==mbu) {
				sbu=0;
				clearInterval(ttim);
			}
			start+=ebu;
			Jrcd_Riz.scrollTop=start;
		},20)
	}

	function zgd () {
		num_J++;
		if (num_J>=Jrcd_Li.length-1) {
			num_J=1;
			Jrcd_Riz.scrollTop=0;
			gd();
		}
		gd();
	}

	ttim2=setInterval(zgd,3000);

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
	function move (num) {
		clearInterval(timer3);
		clearEvent();
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.zIndex='0';
			intlis[i].className='';
		}
		intlis[num].className='oTowintli';
		lis[num].style.zIndex='1';
		lis[num].style.opacity='0';
		var ind=0;
		timer3=setInterval(function () {
			ind+=0.02;
			if (ind>=1) {
				ind=1;
				bindEvent();
				for (var i = 0; i < lis.length; i++) {
					lis[i].style.opacity='0';
				}	
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
				if (num==this.index) {
					return false;
				};
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
		// for (var i = 0; i < intlis.length; i++) {
		// 	intlis[i].index=i;
		// 	intlis[i].onmouseover=function () {
		// 		return false;
		// 	}

		// 	intlis[i].onmouseout=function () {
		// 		return false;
		// 	}
		// }

		oTowleft.onclick=function () {
			return false;
		}

		oTowright.onclick=function () {
			return false;
		}
	}


	oTowout_to.onmouseover=function () {
		oTowleft.style.display='block';
		oTowright.style.display='block';
	}
	oTowout_to.onmouseout=function () {
		oTowleft.style.display='none';
		oTowright.style.display='none';
	}
}



$(function () {
	//一楼里滚动
	function yigd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		$('#oFour_OnePw_Rli_D2_UU').append(firk);
		$('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2').scrollLeft(0);
				};
				numkg();
			},3000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d');
		}
		$('#oFour_OnePw_Rli_D2_out').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR').css('display','block');
			e.stopPropagation;
		})
		$('#oFour_OnePw_Rli_D2_out').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR').css('display','none');
		})
	}

	yigd();
		

	//二楼里滚动
	function ergd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_2 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_2').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_2').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_2').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_2').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_2').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_2 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_2').scrollLeft(0);
				};
				numkg();
			},2000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_2').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_2 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_2').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_2');
		}
		$('.oFour_TowPw_D4_U1_l2').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_2').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_2').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_D4_U1_l2').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_2').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_2').css('display','none');
		})
	}

	ergd();

	//三楼里滚动
	function sangd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_3 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_3').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_3').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_3').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_3').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_3').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_3 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_3').scrollLeft(0);
				};
				numkg();
			},2000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_3').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_3 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_3').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_3');
		}
		$('.oFour_TowPw_dd1_Ul1_Li1').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_3').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_3').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_dd1_Ul1_Li1').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_3').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_3').css('display','none');
		})
	}

	sangd();


	//四楼滚动
	function sigd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_4 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_4').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_4').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_4').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_4').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_4').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_4 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_4').scrollLeft(0);
				};
				numkg();
			},3000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_4').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_4 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_4').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_4');
		}
		$('.oFour_TowPw_dd1_Ul1_Li1').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_4').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_4').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_dd1_Ul1_Li1').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_4').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_4').css('display','none');
		})
	}

	sigd();
		

	//五楼滚动
	function wugd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_5 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_5').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_5').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_5').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_5').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_5').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_5 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_5').scrollLeft(0);
				};
				numkg();
			},4000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_5').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_5 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_5').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_5');
		}
		$('.oFour_TowPw_dd1_Ul1_Li1').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_5').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_5').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_dd1_Ul1_Li1').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_5').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_5').css('display','none');
		})
	}

	wugd();


	//六楼滚动
	function liugd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_6 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_6').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_6').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_6').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_6').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_6').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_6 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_6').scrollLeft(0);
				};
				numkg();
			},2000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_6').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_6 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_6').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_6');
		}
		$('.oFour_TowPw_D4_U1_l2').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_6').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_6').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_D4_U1_l2').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_6').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_6').css('display','none');
		})
	}

	liugd();

	//七楼滚动
	function qigd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_7 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_7').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_7').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_7').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_7').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_7').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_7 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_7').scrollLeft(0);
				};
				numkg();
			},3000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_7').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_7 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_7').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_7');
		}
		$('.oFour_TowPw_D4_U1_l2').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_7').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_7').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_D4_U1_l2').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_7').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_7').css('display','none');
		})
	}

	qigd();

		//八楼滚动
	function bagd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_8 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_8').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_8').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_8').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_8').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_8').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_8 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_8').scrollLeft(0);
				};
				numkg();
			},4000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_8').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_8 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_8').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_8');
		}
		$('.oFour_TowPw_D4_U1_l2').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_8').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_8').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_D4_U1_l2').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_8').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_8').css('display','none');
		})
	}

	bagd();

	//九楼滚动
	function jiugd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_9 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_9').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_9').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_9').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_9').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_9').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_9 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_9').scrollLeft(0);
				};
				numkg();
			},2000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_9').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_9 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_9').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_9');
		}
		$('.oFour_TowPw_D4_U1_l2').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_9').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_9').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_D4_U1_l2').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_9').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_9').css('display','none');
		})
	}

	jiugd();

	//十楼滚动
	function shigd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_10 div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_10').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_10').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_10').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_10').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_10').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_10 div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_10').scrollLeft(0);
				};
				numkg();
			},3000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_10').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_10 div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_10').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_10');
		}
		$('.oFour_TowPw_D4_U1_l1_a3').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_10').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_10').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw_D4_U1_l1_a3').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_10').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_10').css('display','none');
		})
	}

	shigd();

	//十一a楼滚动
	function shiyiagd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_11a div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_11a').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_11a').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_11a').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_11a').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_11a').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_11a div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_11a').scrollLeft(0);
				};
				numkg();
			},4000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_11a').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_11a div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_11a').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_11a');
		}
		$('.oFour_TowPw2_D1').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_11a').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_11a').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw2_D1').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_11a').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_11a').css('display','none');
		})
	}

	shiyiagd();

	//十一b楼滚动
	function shiyibgd () {
		var kk=$('#oFour_OnePw_Rli_D2_UU_11b div').eq(0).width();
		var numk=1;
		var zk=true;
		var tmk=null;
		// var firk=$('#oFour_OnePw_Rli_D2_UU div:first').clone();
		// var lask=$('#oFour_OnePw_Rli_D2_UU div:last').clone();
		// $('#oFour_OnePw_Rli_D2_UU').append(firk);
		// $('#oFour_OnePw_Rli_D2_UU').prepend(lask);
		$('#oFour_OnePw_Rli_D2_11b').scrollLeft(kk);

		$('#oFour_OnePw_Rli_D2_DDL_11b').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk--;
				if (numk<1) {
					numk=4;
					$('#oFour_OnePw_Rli_D2_11b').scrollLeft(kk*5);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDR_11b').click(function () {
			clearInterval(tmk);
			if (zk) {
				zk=false;
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_11b').scrollLeft(0);
				};
				numkg();
				numkt();
			};	
		})
		$('#oFour_OnePw_Rli_D2_DDXB_11b div').mouseover(function () {
			clearInterval(tmk);
			var i=$(this).index();
			numk=i+1;
			numkg();
			numkt();
		})
		function numkt () {
			tmk=setInterval(function(){
				numk++;
				if (numk>=5) {
					numk=1;
					$('#oFour_OnePw_Rli_D2_11b').scrollLeft(0);
				};
				numkg();
			},3000)
		}
		numkt();
		function numkg () {
			$('#oFour_OnePw_Rli_D2_11b').stop().animate({scrollLeft:numk*kk},function () {
				zk=true;
			});
			$('#oFour_OnePw_Rli_D2_DDXB_11b div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d_11b').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d_11b');
		}
		$('.oFour_TowPw2_D1D1').mouseover(function (e) {
			$('#oFour_OnePw_Rli_D2_DDL_11b').css('display','block');
			$('#oFour_OnePw_Rli_D2_DDR_11b').css('display','block');
			e.stopPropagation;
		})
		$('.oFour_TowPw2_D1D1').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL_11b').css('display','none');
			$('#oFour_OnePw_Rli_D2_DDR_11b').css('display','none');
		})
	}

	shiyibgd();
		


//透明图切换

	/*var tm=0;
	$('#oTowout li').eq(tm).fadeIn().siblings().hide();
	$('#oTowleft').click(function () {
		tm--;
		if (tm<0) {tm=$('#oTowout li').length-1;};
		tmg();
	})
	$('#oTowright').click(function () {
		tm++;
		if (tm>=$('#oTowout li').length) {tm=0;};
		tmg();
	})
	$('#oTowint li').mouseover(function () {
		var i=$(this).index();
		tm=i;
		tmg();
	})
	function tmg (){
		$('#oTowout li').eq(tm).fadeIn("slow").siblings().hide();
		$('#oTowint li').eq(tm).addClass('oTowintli').siblings().removeClass('oTowintli');
	}
	$('#oTowout_to').mouseover(function (e) {
		$('#oTowleft').css('display','block');
		$('#oTowright').css('display','block');
		e.stopPropagation();
	})
	$('#oTowout_to').mouseout(function () {
		$('#oTowleft').css('display','none');
		$('#oTowright').css('display','none');
	})*/


//今日抄底
$(function () {
	$('#oFour_Jrcd li').mouseover(function () {
		var i=$(this).index();
		$('#oFour_Jrcd img').eq(i+1).stop().animate({marginLeft:'-18px'},400);
	})
	$('#oFour_Jrcd li').mouseout(function () {
		var i=$(this).index();
		$('#oFour_Jrcd img').eq(i+1).stop().animate({marginLeft:'0'},400);
	})
})

//选楼
	var x = null;
	$('#oXl li').mouseover(function () {
		var i=$(this).index();
		if ($('#oXl .oXl_Li1_A2').eq(i).css('color') == 'rgb(200, 22, 35)') {
			$('#oXl .oXl_Li1_A2').eq(i).css({color:'#fff',background:'#c81623'});
			x=i;
		}else{
			$('#oXl .oXl_Li1_A2').eq(i).css('display','block');
			$('#oXl .oXl_Li1_A1').eq(i).css('display','none');
		}
	})
	$('#oXl li').mouseout(function () {
		var i=$(this).index();
		$('#oXl .oXl_Li1_A1').eq(i).css('display','block');
		$('#oXl .oXl_Li1_A2').eq(i).css('display','none');
		if(x!=null){
			$('#oXl .oXl_Li1_A2').eq(x).css({color:'#c81623',background:'#fff'}).show();
			x = null;
		}
	})



})

