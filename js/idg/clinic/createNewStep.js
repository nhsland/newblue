/**
Create new next-step
@return - Returns new next-step
**/
clinic.createNewStep = function( $step, dataObj, active ){
	
	if(active === undefined) active = false;
	
	var data = $.extend( {}, dataObj );
	var $new = $step.clone();
	$new.removeClass('next-step-add');
	clinic.makeDefaultStep( $new );
	$new.data( 'data',data );
	
	if(active){
		clinic.makeStepActive( $new );
	} 
	
	return $new;
}