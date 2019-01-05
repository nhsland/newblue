/*
Set up Btn click events
*/
idg.addSelectInsert.btnEvent = function ( popup, $btn, callback ){
  	$btn.click(function(e) {
  		e.stopPropagation();
  		callback.call(popup);
	});	  					
}
