/**
set up ALL filter buttons, use init data
**/
clinic.setupFilters = function(){
	
	// All is selected by default
	$('#filter-all').addClass('selected');
	
	// set up assignment dropdowns for doctors & show count
	for(obj in clinic.data){
		var patients = clinic.data[obj];
		var id = obj.toString();
		// show count:
		$('#filter-'+ id + ' .current').text( patients.length );
		
		if(obj == 'dna' || obj == 'tasks') continue; // ignore dna and tasks
		
		for(var i=0; i<patients.length; i++){
			$('#patient-'+ patients[i] +' .clinic-assign-options').val( id ); // set up dropdowns
		}
	}
	
	/**
	build the data for unassigned from the DOM
	note: js has setup the DOM for IDG demo
	**/
	$('.clinic-assign-options').each( function(){
		if( $(this).val() == 'unassigned' && $(this).is(":visible") ){
			var trID = $(this).parents('tr').data('id')
			clinic.data['unassigned'].push( parseInt(trID) );
		}
	});
	$('#filter-unassigned .current').text( clinic.data['unassigned'].length );
}