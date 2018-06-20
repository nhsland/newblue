/*
Tile Collapse
*/
idg.collapseTiles = function(){
	// find and set up all
	$('.js-tiles-collapse-btn').each(function(){
		
		var groupID = $(this).data('group');
		var $wrap = $('#'+groupID);
		var initialState = $wrap.data('collapse');
		
		var tiles = new CollapseTiles( 	$(this), 
										$wrap, 
										initialState );
	});
	
	function CollapseTiles( $icon, $wrap, initialState ){
		/*
		Find all tiles. 	
		*/
		
		var $tiles = $wrap.children('.tile');
		var expanded = initialState == 'expanded' ? true : false;
		
		$icon.click(function(){
			change();
		});		
		
		function change(){
			if(expanded){
				$tiles.find('.element-data').hide();
				
				// is there an overflow flag?
				$tiles.find('.tile-more-data-flag').hide();
				
				/* 
				show collapsed icon in replace 
				of content (so user knows state...)
				*/
				var collapseIcon = $('<i class="oe-i expand small pad-right js-data-collapsed-icon"></i>');	
				var dataState = $('<span class="js-data-hidden-state"> [0]</span>');
					
				//$tiles.append( collapseIcon.click( change ) );
				
				$tiles.find('.element-title').append( dataState );
				
			} else {
				// $tiles.find('.js-data-collapsed-icon').remove();
				$tiles.find('.js-data-hidden-state').remove();
				$tiles.find('.element-data').show();
				// is there an overflow flag?
				$tiles.find('.tile-more-data-flag').show();
			}
			
			$icon.toggleClass('expand collapse');
			expanded = !expanded;
		}	
	}	
}