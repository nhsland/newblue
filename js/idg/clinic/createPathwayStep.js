/**
Create a pathway step
@return - new $obj
**/
clinic.createPathwayStep = function( name ){
	var $span = $("<span>", {"class": "pathway-step"});
	$span.text(name);
	$span.append('<span class="time"></span>');
	return $span;
}