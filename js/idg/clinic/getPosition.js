/**
Find top and left position of obj
@return pos obj
**/
clinic.getPosition = function( $obj ){
	var pos = $obj.position();
	var clinic = $('.oe-clinic-list').position(); // table
	// adjust for scroll position:
	pos.top = pos.top - clinic.top;
	return pos;
}