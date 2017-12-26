/**
quicklook popup
**/
clinic.quicklook = function(){
	var $popup = $('#patient-clinic-quicklook');

	/**
	Events	
	**/
	// quicklook and warning triangle are wrapped
	// unclick to close
	$('.js-clinic-quicklook').click(function( e ){
		e.stopPropagation();
		var pos = clinic.getPosition( $(this) );
		showQuicklook( $(this), pos.top );
	});
	
	$popup.click(function( e ){
		e.stopPropagation();
		hideQuicklook();
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