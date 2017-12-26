/** 
show 'current' time in clinic patient list
faked for demo purposes
**/
clinic.showCurrentTime = function(){
	var nowTime = "10:35";
	var future = false;
	$('.oe-clinic-list tbody tr').each( function(){
		var td = $(this).find('td').first();
		
		if(td.text() == "10:35"){
			future = true;
			
			var pos = clinic.getPosition( td );
			$('.clinic-time').css( {'top':pos.top - 7 } );
		}
	
		if( future ){
			$(this).addClass('future');
		}
	});	
}