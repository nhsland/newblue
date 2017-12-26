/**
setup assignment dropdowns	
**/
clinic.setupAssignments = function(){
	
	// store inital value 
	$('.clinic-assign-options').each( function(){
		var value = $(this).val();
		$(this).data('previous',value);
	});
	
	// when changed update value and store new value
	$('.clinic-assign-options').change(function() {
		var patientID = $(this).data('id');
		clinic.changeAssignment( $(this).data('previous'), this.value, patientID );
		$(this).data('previous',this.value);
	});
}