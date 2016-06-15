window.onload=function () {
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
}