/*
Reduce Increase height
*/
idg.reduceElementHeight = function(){
	// find and set up all
	$('.js-reduce-element-height-btn').each(function(){
		
		var elementID = $(this).data('id');
		var tiles = new ReduceElementHeight ( 	$(this), elementID );
	});
	
	function ReduceElementHeight( $icon, elementID ){
		
		var reduced = false;
		var $element = $('#'+elementID);
		// var $header = $element.find('.element-title');
		
		$icon.click(function(){
			changeHeight();
		});		
		
		function changeHeight(){
			if(reduced){
				$element.removeClass('reduced-height');			
			} else {
				$element.addClass('reduced-height');
			}
			
			$icon.toggleClass('increase-height-orange reduce-height');
			reduced = !reduced;
		}	
	}	
}