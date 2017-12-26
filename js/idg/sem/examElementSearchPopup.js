/*
Right Left Element searching in Examination Edit mode
All content in popup is static and the inputs only 
show the popup behaviour
*/
idg.examElementSearchPopup = function(){
	var el = document.getElementById('elements-search-results');
	if(el === null) return; 
	
	// inputs
	$('#js-element-search-right').focus(function(){
		showPopup();
	}).focusout(function(){
		$(this).val('');
	});
	
	$('#js-element-search-left').focus(function(){
		showPopup();
	}).focusout(function(){
		$(this).val('');
	});

	
	// popup
	function showPopup(){
		$('#elements-search-results').show();
	
		$('.lvl1').click(function(){
			$('#elements-search-results').hide();
		})
		$('.close-icon-btn').click(function(){
			$('#elements-search-results').hide();
		});
	}		
}