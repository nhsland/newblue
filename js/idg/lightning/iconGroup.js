/*
Lightning
*/

lightning.iconGroup = function(){
	
	/*
  	Quick UX / UI JS demo	
  	Collapse and Expand the timeline
  	*/
  	$('.icon-group').each(function(){
	  	var count = $(this)[0].childElementCount;
		var $div = $('<div />').text('('+count+')').hide();
		$(this).parent().append( $div );
  	});
  	
  	$('.js-timeline-date').click(function( e ){
	  	var iconGroup = $(this).data('icons');
	  	
	  	if($(this).hasClass('collapse')){
		  	$('#js-icon-'+iconGroup).hide();
		  	$('#js-icon-'+iconGroup).next().show();
	  	} else {
		  	$('#js-icon-'+iconGroup).show();
		  	$('#js-icon-'+iconGroup).next().hide();
	  	}
	  
	  	$(this).toggleClass('collapse expand');
  	});
}