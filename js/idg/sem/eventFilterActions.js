/*
Event Filter Actions
*/
idg.eventFilterActions = function(){
	
	if( $('#js-sidebar-filter-btn').length == 0 ) return;
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	
	@param $wrap
	@param $btn
	@param $popup	
	*/
	idg.enhancedTouch( 		$('#js-sidebar-filter'), 
							$('#js-sidebar-filter-btn'), 
							$('#js-sidebar-filter-options') );
	
}
