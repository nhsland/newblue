/** 
make default ('next-step') step
**/
clinic.makeDefaultStep = function( $step ){
	$step.addClass( 'next-step' );
	$step.click(function( e ){
		e.stopPropagation();
		var pos = clinic.getPosition( $(this) );
		clinic.activeInfo.show( pos.left, pos.top, $(this) );
	});
}