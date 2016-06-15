window.onload=function () {
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
}