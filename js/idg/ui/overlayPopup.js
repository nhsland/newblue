/**
Load content as Overlay
- Eyedraw App
- Add New Event	
@param {btn} - ID or Class of btn 
@param {phpToLoad} - PHP file name 
@param {closeBtnID} - ID of close button in overlay content
@param {callBack} - Optional Callback
**/
idg.overlayPopup = function( btn, phpToLoad, closeBtnID, callBack ){
	
	// check DOM exists
	if( $(btn).length ){
		
		$(btn).click(function( e ){
			e.stopPropagation();
			loadOverlay();
		});
	}
	
	// for testing and designing UI
	this.test = loadOverlay;
	return this;
	  	
	/**
	Create full screen cover using 'oe-popup-wrap'
	CSS handles the positioning of the loaded DOM
	**/  	
	function loadOverlay(){
		var $overlay = $('<div>');
  		$overlay.addClass('oe-popup-wrap');
  		$overlay.load('/php/v3.0/_load/' + phpToLoad,function(){
	  		closeOverlayBtn( $(closeBtnID, this ), $(this) );
	  		if(callBack) callBack( $overlay );
  		});
  		
  		$('body').prepend($overlay);
	}
	
	/**
	Set up a close button	
	**/
	function closeOverlayBtn( $closeBtn, $overlay ){
		$closeBtn.click(function(){
		  	$overlay.remove();
	  	});
	}
	
}