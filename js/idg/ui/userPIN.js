/*
Clinic steps and Patient actions steps in WS
*/
idg.userPIN = {

	/*
	init
	*/	
	init:function(){
		/*
		do we have elems?
		*/
		if( $('.oe-user-pin').length){
			/*
			Use $ for DOM work
			*/
			$('.oe-user-pin').each(function( ){
				idg.userPIN.demoInput( $(this) );
			});
		}
	}, 
	
	demoInput:function( $div ){
		let $input = $('.user-pin-entry', $div);
				
		$input.on('input',function(){
			let pin = $(this).val();
			$div.removeClass('accepted-pin wrong-pin');
			
			if(pin.length == 4){
				if (pin == '1234'){
					$div.addClass('accepted-pin');
				} else {
					$div.addClass('wrong-pin');
				}
			}
			
		});
		
	}	
	
}