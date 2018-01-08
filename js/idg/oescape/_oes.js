/**
OEscape 
**/
var oes = {
	
	init:function(){
		// exit oescape and go back to last viewed (non-oes) page
		$('#js-exit-oescape').click( function(){
			window.location = localStorage.getItem("lastPage");
		});
	},
	
	oescapeExit:function(){
	
		var href = window.location.href;
		
		if(href.includes("oescape") == false ){
			localStorage.setItem( "lastPage",href ); 
		}
	}
}