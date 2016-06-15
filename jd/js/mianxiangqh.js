window.onload=function () {
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
}