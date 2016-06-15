window.onload=function () {
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
}