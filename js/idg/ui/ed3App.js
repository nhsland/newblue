/*
ED3 App ... loads in a PHP file
*/
idg.ed3App = {
	
	/*
	init
	*/	
	init:function(){
	
		/*
		do we have elems?
		*/
		if( $('.js-idg-ed3-app-btn').length){
			
			$('.js-idg-ed3-app-btn').click(function(){
				// php content to load in...
				let php = $(this).data('php');	
			
				// build DOM wrapper
				let $ed3app = $('<div class="oe-eyedraw-app spinner-loader"></div>');
				
				
				// position y (top), x (left) is handled by the CSS.
				let elem = $(this)[ 0 ];
				let btnPos = elem.getBoundingClientRect();	
				
				// ed3 App height = 532px;
				// can not go above 60px
				let posH = btnPos.bottom - 532;
				if( posH < 60 ){
					$ed3app.css(	{"top": '60px'});
				} else {
					$ed3app.css(	{"top": posH + 'px'});
				}
				
				$('body').append( $ed3app );
				
				let $spinner = $('<div class="spinner-center"><i class="spinner"></i></div>');
				$ed3app.append( $spinner ); 
							
				// demo ed3 content: 
				$ed3app.load('/idg-php/v3.0/_load/ed3/'+php,function(){
					
					$('#js-idg-close-ed3-app').click(function(){
						// close and tidy up:
						$ed3app.html('').remove();				
					})
					
					// fake save and close:
					$('#js-idg-save-ed3-app').click(function(){
						// close and tidy up:
						$ed3app.html('').remove();				
					})
					
				});
			});			
		}
	}	
	
}