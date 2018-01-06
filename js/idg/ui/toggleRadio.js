/**
Toggle Radio Checked
**/
idg.toggleRadio = function(){
	/**
	With the L / R option as radio
	we need to be able to toggle there
	checked state
	**/
	$('.js-toggle-radio-checked').each(function(){
		var checked = true;
		$(this).click( function(){
			$(this).prop('checked', checked);
			checked = !checked;
		});
	});
}