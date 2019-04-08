/**
Patient Mini Overview
This is click only. Big popup, could be irritating if 
it was popping up on rollover... 
**/
idg.patientMiniOverview = function(){
	
	// is the popup DOM available?
	if( $('.oe-patient-mini-overview').length == 0 ) return;
	
	/**
	IDG is only using 1 DOM as a demo for all interactions
	Martin Luther King
	**/

	var $mini = $('#patient-mini-overview');
	var $name = $('#patient-mini-overview .patient-name');
	var $id = $('#patient-mini-overview .patient-number');
	
	// wrapper for icons (covers warning triangle too)
	$('.js-patient-quick-overview').click(function( e ){
		e.stopPropagation();
		$name.text( $(this).data('name') );
		$id.text( $(this).data('id') );
		positionAndShow( $(this) );
	});
	
	$('#patient-mini-overview .close-icon-btn').click(function( e ){
		e.stopPropagation();
		$mini.hide();
	});
	
	function positionAndShow( $iconBtn ){
		
		/* 
			Popup is FIXED positioned
			work out offset position 
			setup events to close it on resize or scroll.
			*/
			
			var miniH = 350;
			var miniW = 465;
			
			var elem = $iconBtn[ 0 ];
			
			// js vanilla:
			var btnPos = elem.getBoundingClientRect();		
			var w = document.documentElement.clientWidth;
			var h = document.documentElement.clientHeight;
			
			var posTop = btnPos.top;
			var posLeft = btnPos.right - miniW;
		
			// check popup doesn't go off the top of the screen 
			if(h - posTop < miniH) posTop = h - miniH;
			if(posLeft < 0) posLeft = 0;
			
			// set CSS Fixed position
			$mini.css(	{	"top": posTop,
							"left": posLeft });			
							
			$mini.show();
		
		
	}
	
	
}