/** 
UI setup DEMO (based on DOM elements)
**/
clinic.setupDemoUI = function(){
	
	/**
	Update UI for Late and DNA
	**/
	$('.pathway').each(function(){
		var firstStep = $(this).children('.pathway-step').first();
		
		// late! 
/*
		if( firstStep.hasClass( 'late' ) ){
			var tr = $(this).parents('tr');
			tr.find('td').first().addClass('time-flag late'); -- turned off
		}
*/
		// DNA! 
		if( firstStep.hasClass( 'dna' ) ){
			var tr = $(this).parents('tr');
			tr.data('state','dna');
			tr.find('.clinic-assign-options').hide();
			tr.find('.js-add-pathway').hide();
			tr.find('.duration-graphic').css('opacity','0.3');
			tr.find('.duration-mins').hide();
			// tr.find('td').first().addClass('time-flag dna'); -- turned off
		}
	});
	
	/** 
	Show a completed pathway exmaple	
	**/	
	var tr = $( '#patient-'+1152572 );
	tr.data('state','complete');
	var duration = tr.find('.duration-graphic');
	var td = duration.parent();
	duration.hide();
	td.addClass('complete');
	td.children('.duration-mins').append(' mins');
	tr.find('.clinic-assign-options').hide();
	tr.find('.clinic-assign-options').parent().text('Dr Amit Baum (AB)');
	tr.find('.js-add-pathway').hide();
	$('#filter-AB .total').text(1);

	
}