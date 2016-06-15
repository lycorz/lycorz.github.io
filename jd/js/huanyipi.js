window.onload=function () {
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
}