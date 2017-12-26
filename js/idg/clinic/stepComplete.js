/** 
Step completed (PIN entered correctly)	
**/
clinic.stepComplete = function( $step ){
	clinic.makeStepComplete( $step );
	
	// next sibling?
	var $next = $step.next();
	if( $next.length && $next.hasClass('next-step') ){
		clinic.makeStepActive( $next );
	}
}