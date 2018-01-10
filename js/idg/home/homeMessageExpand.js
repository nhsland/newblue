/**
Homepage Message expand / contract 	
**/
idg.homeMessageExpand = function(){
	
	if( $('.home-messages').length == 0 ) return;
	
	$('.js-expand-message').each(function(){
		
		var message = $(this).parent().parent().find('.message');
		var expander = new Expander( $(this),
									 message );
	});
	
	function Expander( $icon, $message){
		var expanded = false; 
		
		$icon.click( change );
		
		function change(){
			
			$icon.toggleClass('expand collapse');
			
			if(expanded){
				$message.removeClass('expand');
			} else {
				$message.addClass('expand');
			}
			
			expanded = !expanded;
		}
	}
}
