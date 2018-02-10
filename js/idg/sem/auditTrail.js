/*
Tile Element - watch for data overflow
*/
idg.auditTrail = function(){
	
	if( $('#js-event-audit-trail-btn').length == 0 ) return;
		
	var show = false	
		
	// loop through the view tiles and check the data height
	$('#js-event-audit-trail-btn').click(function(){
		$('#js-event-audit-trail').toggle();
		$(this).toggleClass('active');
	});
	
}