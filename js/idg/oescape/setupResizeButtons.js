/**
OEscape offers 4 resize states for the left hand chart area	
@param 'callBack' (function)  	- callback optional
**/
oes.setupResizeButtons = function( callBack ){
	
	var left = $('.oes-left-side'),
		right = $('.oes-right-side'),
		size;
	
	// setup resize buttons
	// buttons have data-area attribute: small, medium, large and full
	$('.js-oes-area-resize').click(function( e ){
		e.stopPropagation();
		
		var str = $(this).data('area');
		switch(str){
			case 'small': 	size = 500;
			break;
			case 'medium': 	size = 700;
			break;
			case 'large': 	size = 900;
			break;
			case 'full': 	size = null;  // null, when passed to highcharts makes chart fill container
			break;
		}
		
		// fullsize requires some tweaking
		if(size == null){
			left.css({"min-width":"500px", "width":"100%"});
			right.hide();
		} else {
			left.css({"min-width": size + "px", "width":""});
			right.show();	
		}
		
		if(callBack !== undefined ){
			callBack(size);
		}	
	});
}