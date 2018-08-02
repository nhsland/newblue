/*
Event Filter Actions
*/
idg.eventFilterActions = function(){
	
	if( $('#js-sidebar-filter-btn').length == 0 ) return;
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	*/
  	var options = false;
  	
  	// handles touch
  	$('#js-sidebar-filter-btn').click( changeOptions );
  	
  	// enchance with mouseevents through DOM wrapper
  	$('#js-sidebar-filter')
  		.mouseenter( showOptions )
  		.mouseleave( hideOptions );
  	
  	// controller
  	function changeOptions(){
	  	if(!options){
		  	showOptions()
	  	} else {
		  	hideOptions()
	  	}		  	
  	}
  	
  	function showOptions(){
	  	$('#js-sidebar-filter-options').show();
	  	$('#js-sidebar-filter-btn').addClass('active');
	  	options = true;
  	}
  	
  	function hideOptions(){
	  	$('#js-sidebar-filter-options').hide();
	  	$('#js-sidebar-filter-btn').removeClass('active');
	  	options = false;
  	}

	
}