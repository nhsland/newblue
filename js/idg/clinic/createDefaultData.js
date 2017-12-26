/**
Create a default data obj for a pathway step
@return step data obj
**/
clinic.createDefaultData = function( css ){
	return { 	eye:'Both',
				n:'Not Set',
				t:'Currently no data is being generated for this step',
				state:clinic.setState( css ) };
}