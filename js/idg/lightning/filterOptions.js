/*
Lightning
*/

lightning.filterOptions = function(){
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	*/
  	var options = false;
  	
  	// handles touch
  	$('.lightning-btn').click( changeOptions );
  	
  	// enchance with mouseevents through DOM wrapper
  	$('.js-lightning-options')
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
	  	$('.change-timeline').show();
	  	$('.lightning-btn').addClass('active');
	  	options = true;
  	}
  	
  	function hideOptions(){
	  	$('.change-timeline').hide();
	  	$('.lightning-btn').removeClass('active');
	  	options = false;
  	}

}