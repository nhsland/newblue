/*
Tile Element - watch for data overflow
*/
idg.auditTrail = function(){
	
	if( $('#js-event-audit-trail-btn').length == 0 ) return;
		
	let locked = false;
	let open = false;	
	let $btn = $('#js-event-audit-trail-btn');
		
	// loop through the view tiles and check the data height
	$btn.click(function(){
		if(open){
			if(locked){
				locked = false;
				open = false;
				changeState();
			} else {
				locked = true;
			}
		} else {
			open = true;
			locked = true;
			changeState();	
		}	
	});
	
	
	$btn.mouseover(function(){
		if(!locked){
			open = true;
			changeState();
		}	
	});
	
	$btn.mouseleave(function(){
		if(open && !locked){
			open = false;
			changeState();
		}
	});
	
	function changeState(){
		$('#js-event-audit-trail').toggle();
		$btn.toggleClass('active');
	}
	
	
	
	
	
	
}