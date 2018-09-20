/**
Patient Mini Overview
This is click only. Big popup, could be irritating if 
it was popping up on rollover... 
**/
idg.patientMiniOverview = function(){
	
	if( $('.oe-patient-mini-overview').length == 0 ) return;

	/**
	IDG is only using 1 DOM as a demo for all interactions
	**/

	var $mini = $('#patient-mini-overview');
	
	// wrapper for icons (covers warning triangle too)
	$('.js-patient-quick-overview').click(function( e ){
		e.stopPropagation();
		$mini.show();
	});
	
	$('#patient-mini-overview .close-icon-btn').click(function( e ){
		e.stopPropagation();
		$mini.hide();
	});
	
	function showQuicklook( $wrapper, top ){
		offsetTop = top + 30;
		$popup.find('.patient-details .name').text( $wrapper.data('name') );
		$popup.find('.patient-details .number').text( $wrapper.data('id') );
		
		// show alert?
		if( $wrapper.find('.triangle').length ){
			$popup.find('.alert-box').show();
		} else {
			$popup.find('.alert-box').hide();
		}
		
		$popup
			.removeClass('hidden')
			.css( {'top':offsetTop} )
			.show();
	}
	
	function hideQuicklook(){
		$popup.hide();
	}
	
}