/*
Lightening Letter Viewer
Icon in the Patient banner area links to the 
Letter Viewer page for the patint
*/
idg.lightningViewer = function(){
	
	// if on the letter viewing page  
	// set icon to active 
	if(window.location.pathname == '/v3.0/lightning-letter-viewer'){
		$('#js-lightning-viewer-btn').addClass('active');
		return;	
	};
	
	// Events
	$('#js-lightning-viewer-btn').click(function( e ){
		e.stopPropagation();
		window.location = '/v3.0/lightning-letter-viewer';
	})
	.mouseenter(function(){
		$(this).addClass( 'active' ); 
	})
	.mouseleave(function(){
		$(this).removeClass( 'active' ); 
	});	
}