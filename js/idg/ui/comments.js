/**
Comments
**/
idg.comments = function(){
	/**
	Comments icon is clicked on to reveal 
	commets input field. Either:
	1) Textarea switches places with icon button
	2) Textarea is shown in different DOM placement  
	**/
	
	$('.js-add-comments').click(function( e ){
		e.stopPropagation();
		
		var $btn = $(this);
		var $div = $('#'+ $btn.data('input') ); 
		
		$btn.hide();
		
		
		
		$div.show(0,function(){
			
			var textArea = $(this).find('textarea');
			var removeIcon = $(this).find('.js-remove-add-comments');
			
			textArea.focus();
			
			removeIcon.click(function(){
				$div.hide();
				$btn.show();	
			});
		});
		
	});
}