/**
OEscape 
**/
var oes = {
	
	init:function(){
		// exit oescape and go back to previous page
		$('#js-exit-oescape').click( function(){
			window.location = document.referrer; // exit and return to previous page
		});
	}
}