/**
All, Doctors, Unassigned, DNA and Tasks
allows the user to filter the patient list	
**/
clinic.filterList = function( $filter ){
	var id = $filter.data( 'id' );
	// update UI
	$('.oe-clinic-filter').removeClass('selected');
	$('#filter-'+ id ).addClass('selected');
	
	/** 
	'All' and 'Tasks' are the exceptions to the standard filtering	
	**/
	if( id == 'all' ) {
		
		$('.oe-clinic-list tbody tr').show();
	
	} else {
		// Doctors, Unassigned and DNA
		// hide others...
		$('.oe-clinic-list tbody tr').hide();
		
		var patients = clinic.data[id];
		for(var i=0; i<patients.length; i++){
			$('#patient-' + patients[i]).show(); // show assigned patients 			
		}
	}
}