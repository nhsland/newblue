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
			var input = $(this).next().show().focus();
		} else {
			var input = $(textAreaID).show(0,function(){
				$(this).find('textarea').focus();
			});
		}
	});
}