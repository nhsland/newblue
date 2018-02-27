/*
Right Left Element searching in Examination Edit mode
All content in popup is static and the inputs only 
show the popup behaviour
*/
idg.examElementSearchPopup = function(){
	var el = document.getElementById('js-search-in-event-popup');
	if(el === null) return; 
	
	
	$('#js-search-in-event').click(function(){
		showPopup();
		$(this).addClass('selected');
	})

	
	// popup
	function showPopup(){
		$('#js-search-in-event-popup').show();
	
		$('.close-icon-btn').click(function(){
			$('#js-search-in-event-popup').hide();
			$('#js-search-in-event').removeClass('selected');
			$('#js-search-event-input-right').val('');
			$('#js-search-event-results').hide();
		});
		
		$('#js-search-event-input-right').keyup(function(){
			if($(this).val() == 'alph' || $(this).val() == 'alpha'){
				$('#js-search-event-results').show();
			} else {
				$('#js-search-event-results').hide();
			}
		});
		
	}		
}