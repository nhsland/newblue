
idg.addSelectInsert.Popup.prototype.onScrollClose = function(){
	/*
	Close popup on scroll.
	note: scroll event fires on assignment.
	so check against scroll position
	*/	
	let popup = this;	
	let scrollPos = $(".main-event").scrollTop();
	$(".main-event").on("scroll", function(){ 
		if( scrollPos !=  $(this).scrollTop() ){
			// Remove scroll event:	
			$(".main-event").off("scroll");
			popup.close();
		}
			
	});

}
