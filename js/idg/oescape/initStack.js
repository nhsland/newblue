/**
Image Stack animations in OEscape	
pass in ID string for container and sting ID prefix for images
returns method to directly update the stack and sets up the Events

@method initStack
@param 'container' (String) 	- id for container DOM 
@param 'img_id' (String) 		- id prefix for <img>, assumes numbering 1 to n
@param 'callBack' (function)  	- callback optional
@return {object} with method to setImg()	
**/
oes.initStack = function(container,img_id_prefix,callBack){
	var container = $(container);
	var imgID = 1; 					// default image set in PHP, the rest are 'hidden'
	var imgTotal = container.children().length;
	
	// Mouse & Touch image stack animation
	$( container ).bind( "mousemove touchmove", function( e ) {
		e.stopPropagation();
		
		var offset = $(this).offset();		// these will update everytime browser is resized
		var xPos = e.pageX - offset.left;
		var w = $(this).width();			
		var num = Math.ceil( xPos / ( w / imgTotal ) );
		
		if(num === 0 || num > imgTotal) return; // out of range
		
		updateImageStack(num); 
			
		if(typeof callBack === "function") callBack(num);			
	});
	
	// update images
	function updateImageStack(n){
		$( img_id_prefix + imgID ).hide();
		$( img_id_prefix + n ).removeClass('hidden').show();
		imgID = n;
	}
	
	// provide access to update Image directly, e.g. from highCharts
	return {
		setImg:function(imgID){
			updateImageStack(imgID);
			imgID = imgID;
		}
	};
}