/*
Enhance Touch.
1) Provide click (touch) mechanism. 
2) Enhance for mouse / trackpad
IDG demo, it assumes a DOM structure of:
<wrap>
	<btn />
	<popup />
</wrap>	
... and that there is an 'active' class on button ;)
*/
idg.enhancedTouch = function($wrap,$btn,$popup){
	var popupShow = false;
	
  	// handles touch
  	$btn.click( changePopup );
  	
  	// enchance with mouseevents through DOM wrapper
  	$wrap
  		.mouseenter( showPopup )
  		.mouseleave( hidePopup );
  	
  	// controller
  	function changePopup(){
	  	if(!popupShow){
		  	showPopup()
	  	} else {
		  	hidePopup()
	  	}		  	
  	}
  	
  	function showPopup(){
	  	$popup.show();
	  	$btn.addClass('active');
	  	popupShow = true;
  	}
  	
  	function hidePopup(){
	  	$popup.hide();
	  	$btn.removeClass('active');
	  	popupShow = false;
  	}
  	
  	// should be a close icon button in the popup
	var $closeBtn = $popup.find('.close-icon-btn');
	$closeBtn.click( hidePopup );
}