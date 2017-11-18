/**
	
JS to demo & review UI design work on IDG idg.knowego.com

- OEscape JS

**/
var oes = {
	
	init:function(){
		// exit oescape and go back to previous page
		$('#js-exit-oescape').click( function(){
			window.location = document.referrer; // exit and return to previous page
		});
	},
	
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
	initStack:function(container,img_id_prefix,callBack = null){
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
				
			if(callBack !== null){
				callBack(num);
			}			
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
	},
		
	
	/**
	OEscape offers 4 resize states for the left hand chart area	
	@param 'callBack' (function)  	- callback optional
	**/
	setupResizeButtons:function(callBack = null){
		
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
			
			if(callBack !== null){
				callBack(size);
			}	
		});
	},		
	
	/**
	Tab buttons control what is shown on the right handside
	
	@param btnArray (Array) - Array of Objects: {btn:'btn_id',area:'area_id'}
	@param 'callBack' (function)  	- callback optional
	**/
	setupAreaTabButtons:function( btnArray, callBack = null){
		
		for(var i=0; i<btnArray.length; i++){
			
			var btn = btnArray[i].btn = $(btnArray[i].btn);  // turn into jQuery
			var area = btnArray[i].area = $(btnArray[i].area);
		
			(function(btn,area,i){
				btn.click( function( e ){
					e.stopPropagation();
					resetStacks();
					$(this).addClass('selected');
					area.removeClass('hidden').show();
					if(callBack !== null){
						callBack(i);
					}
				});
				
			})(btn,area,i); // Immediately Invoked to capture 'i'
		}
		
		// assuming first button is default
		btnArray[0].btn.addClass('selected');
		
		function resetStacks(){
			for(var i=0; i<btnArray.length; i++){
				btnArray[i].btn.removeClass('selected');
				btnArray[i].area.hide();
			}
		}
		
	}
		
};
