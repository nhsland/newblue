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
		$(this).hide();
		
		var textAreaID = $(this).data('input');
		if(textAreaID == 'next'){
			$(this).next().removeClass('hidden').focus();
		} else {
			$(textAreaID).removeClass('hidden').focus();
		}
	});
}