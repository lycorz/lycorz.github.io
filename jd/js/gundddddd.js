		var kk=$('#oFour_OnePw_Rli_D2_UU div').eq(0).width();
		var numk=1;
		$('#oFour_OnePw_Rli_D2').scrollLeft(kk);
		$('#oFour_OnePw_Rli_D2_DDL').click(function () {
			numk--;
			if (numk<1) {
				numk=4;
				$('#oFour_OnePw_Rli_D2').scrollLeft(kk*5);
			};
			$('#oFour_OnePw_Rli_D2').stop().animate({scrollLeft:numk*kk},400);
			$('#oFour_OnePw_Rli_D2_DDXB div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d');
		})
		$('#oFour_OnePw_Rli_D2_DDR').click(function () {
			numk++;
			if (numk>=5) {
				numk=1;
				$('#oFour_OnePw_Rli_D2').scrollLeft(0);
			};
			$('#oFour_OnePw_Rli_D2').stop().animate({scrollLeft:numk*kk},400);
			$('#oFour_OnePw_Rli_D2_DDXB div').eq(numk-1).addClass('oFour_OnePw_Rli_D2_DDXB_d').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d');
		})
		$('#oFour_OnePw_Rli_D2_DDXB div').mouseover(function () {
			var i=$(this).index();
			numk=i+1;
			$('#oFour_OnePw_Rli_D2_DDXB div').eq(i).addClass('oFour_OnePw_Rli_D2_DDXB_d').siblings().removeClass('oFour_OnePw_Rli_D2_DDXB_d');
			$('#oFour_OnePw_Rli_D2').stop().animate({scrollLeft:numk*kk},400);
		})
		$('#oFour_OnePw_Rli_D2').mouseover(function () {
			$('#oFour_OnePw_Rli_D2_DDL').show();
			$('#oFour_OnePw_Rli_D2_DDR').show();
		})
		$('#oFour_OnePw_Rli_D2').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL').hide();
			$('#oFour_OnePw_Rli_D2_DDR').hide();
		})
		$('#oFour_OnePw_Rli_D2_DDL').mouseover(function () {
			$('#oFour_OnePw_Rli_D2_DDL').show();
			$('#oFour_OnePw_Rli_D2_DDR').show();
		})
		$('#oFour_OnePw_Rli_D2_DDL').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL').hide();
			$('#oFour_OnePw_Rli_D2_DDR').hide();
		})
		$('#oFour_OnePw_Rli_D2_DDR').mouseover(function () {
			$('#oFour_OnePw_Rli_D2_DDL').show();
			$('#oFour_OnePw_Rli_D2_DDR').show();
		})
		$('#oFour_OnePw_Rli_D2_DDR').mouseout(function () {
			$('#oFour_OnePw_Rli_D2_DDL').hide();
			$('#oFour_OnePw_Rli_D2_DDR').hide();
		})