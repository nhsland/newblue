/*
Sidebar Events Quicklook & Quickview
- Quicklook: Event Title and Message
- Quickview: Popup with event Screenshot
*/
idg.tileDataOverflow = function(){
	
	if( $('.tile-data-overflow').length == 0 ) return;
	
	$('.tile-data-overflow').on('scroll',function(){
		$(this).parent().find('.tile-more-data-flag').fadeOut();
	});
	

}