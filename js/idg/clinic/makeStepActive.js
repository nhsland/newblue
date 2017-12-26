/** 
Complete a step (green)	
**/
clinic.makeStepActive = function( $step ){
	$step.data('data').state = 'active';
	$step
		.removeClass('next-step')
		.addClass('orange');
	
		
	clinic.updateTasks();
}