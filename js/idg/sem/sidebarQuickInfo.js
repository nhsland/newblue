/*
Sidebar Events Quicklook & Quickview
- Quicklook: Event Title and Message
- Quickview: Popup with event Screenshot
*/
idg.sidebarQuickInfo = function(){
	
	if( $('.events').length == 0 ) return;
	
	$('.events .event').each(function(){	
		var quicklook = new Quicklook( $('.event-type', this),
									   $('.quicklook', this) );
	});
	
	function Quicklook( $icon, $quicklook ){
		
		$icon.hover(function(){
			$quicklook.removeClass('hidden').show();
			showQuickView( $(this).data('id'), $(this).data('date') );
		},function(){
			$quicklook.hide();
			hideQuickView();
		});
	}
	
	/**
	Demo the Quick View for Events
	Shows a scaled screen-shot of the event page
	**/
	
	// hide all QuickView screen shots
	$("[id^=quickview]").hide();

	var prevID = null;
	var $quickView = $('#js-event-quickview'); 
	
	function showQuickView( id, date ){
		$quickView.stop().fadeIn(50);
		$('#quickview-'+prevID).hide();
		$('#quickview-'+id).show();
		$('#js-quickview-date').text( date );
		prevID = id;
	}
	
	function hideQuickView(){
		$quickView.stop().fadeOut(150);	// Using fadeOut to stop a flicking effect
	}

}