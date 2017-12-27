/**
update Tasks filter
Check all rows and updated filter
**/
clinic.updateTasks = function( ){
	// tbody id
	// tr data state can be complete, active, dna or inactive
	// only interested in active
	$('#js-clinic-list-patients tr').each(function(){
		var state = $(this).data('state');
		if( state == 'active'){
			
			var id = parseInt( $(this).data('id') );
			var index = clinic.data['tasks'].indexOf( id );
			var taskSteps = $('.pathway-step.orange', this);
			
			if( taskSteps.length ){
				// add id if not there...
				if (index == -1) clinic.data['tasks'].push( id );
			} else {
				// remove it
				if (index > -1) clinic.data['tasks'].splice( index, 1 );
			}
		}
	});
	
	$('#filter-tasks .current').text( clinic.data['tasks'].length );
}