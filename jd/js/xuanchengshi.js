window.onload=function () {
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
}