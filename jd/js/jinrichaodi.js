window.onload=function () {
	//今日抄底
	var Jrcd_Ri=document.getElementById('oFour_Jrcd_Ri');
	var Jrcd_Riz=Jrcd_Ri.getElementsByTagName('div')[0];
	var Jrcd_Li=Jrcd_Ri.getElementsByTagName('li');
	var ttim=null;
	var ttim2=null;
	var num_J=0;

	function gd () {
		clearInterval(ttim);
		var start=Jrcd_Riz.scrollTop;
		var end=120*num_J;
		var sbu=0;
		var mbu=10;
		var ebu=(end-start)/mbu;
		
		ttim=setInterval(function () {
			sbu++;
			if (sbu==mbu) {
				sbu=0;
				clearInterval(ttim);
			}
			start+=ebu;
			Jrcd_Riz.scrollTop=start;
		},15)
	}

	function zgd () {
		num_J++;
		if (num_J>=Jrcd_Li.length-1) {
			num_J=0;
			Jrcd_Riz.scrollTop=0;
			gd();
		}
		gd();
	}

	ttim2=setInterval(zgd,3000);
}