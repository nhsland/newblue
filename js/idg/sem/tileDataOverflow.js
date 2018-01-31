/*
Tile Element - watch for data overflow
*/
idg.tileDataOverflow = function(){
	
	if( $('.element.tile').length == 0 ) return;
		
	// loop through the view tiles and check the data height
	$('.element.tile').each(function(){
		var h = $(this).find('.data-value').height();

		// CSS is set to max-height:180px;
		if(h > 179){
			// it's scrolling, so flag it
			var flag = $('<div/>',{ class:"tile-more-data-flag"});
			var icon = $('<i/>',{ class:"oe-i arrow-down-bold medium selected" });
			flag.append(icon);
			$(this).prepend(flag);	

			$('.tile-data-overflow', this).on('scroll',function(){
				flag.fadeOut();
			});
			
			// Assuming it's a table!...
			var trCount = $(this).find('tbody').get(0).childElementCount;
			// and then set the title to show total data count
			
			var title = $('.element-title',this);
			title.html( title.text() + ' <small>('+trCount+')</small>' );			
			
		}	
	});
	
	
	
}