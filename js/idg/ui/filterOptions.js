/*
OE Filter Options
*/

idg.filterOptions = function(){
	
	if( $('.oe-filter-options').length == 0 ) return;
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	
  	Loop through and set up (each filter group as unique IDs)
  	#oe-filter-options-{id}
  	#oe-filter-btn-{id}
	#filter-options-popup-{id}
	
	note: JS gets {id} from: data-filter-id="{id}"
  	*/
  	
  	$('.oe-filter-options').each(function(){
  		var id = $(this).data('filter-id');
  		/*
  		@param $wrap
  		@param $btn
  		@param $popup	
		*/
		idg.enhancedPopupFixed( 		$('#oe-filter-options-'+id), 
										$('#oe-filter-btn-'+id), 
										$('#filter-options-popup-'+id) );
												
		
		// workout fixed poition
		
		var $allOptionGroups =  $('#filter-options-popup-'+id).find('.options-group');
		$allOptionGroups.each( function(){
			// listen to filter changes in the groups
			updateUI( $(this) );
		});

	});

	
	// update UI to show how Filter works
	// this is pretty basic but only to demo on IDG
	function updateUI( $optionGroup ){
		// get the ID of the IDG demo text element
		var textID = $optionGroup.data('filter-ui-id');
		var $allListElements = $('.btn-list li',$optionGroup);
		
		$allListElements.click( function(){
			$('#'+textID).text( $(this).text() );
			$allListElements.removeClass('selected');
			$(this).addClass('selected');
			
			
			// $optionGroup.find('.btn-list li').
		});
	}
  	

}