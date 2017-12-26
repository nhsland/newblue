/**
users adds/removes assignment to doctor	
**/
clinic.changeAssignment = function( prevAssign, newAssign, patientID ){
	patientID = parseInt( patientID );

	// remove 
	var index = clinic.data[ prevAssign ].indexOf( patientID );
	if (index > -1) clinic.data[ prevAssign ].splice( index, 1 );

	// add
	clinic.data[ newAssign ].push( patientID );
	
	updateCount( prevAssign );
	updateCount( newAssign );
	
	function updateCount( code ){
		$('#filter-'+ code +' .current').text( clinic.data[ code ].length );
	}
}