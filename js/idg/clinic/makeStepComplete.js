/** 
Complete a step (green)	
**/
clinic.makeStepComplete = function( $step ){
	$step.data('data').state = 'complete';
	$step
		.removeClass('orange')
		.addClass('green');	
	
	$step.children('.time').text('10:35');
	
	clinic.updateTasks();
}