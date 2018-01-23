/*
Element Expand (collapse) data list
*/
idg.expandElementList = function(){
	
	console.log('hi');
	
	// check for view elementss
	if( $('.element-data').length == 0 ) return;
	
	$('.js-listview-expand-btn').each(function(){	
		// id= js-listview-[data-list]-full | quick
		console.log(this);
		
		var listid = $(this).data('list');
		var listview = new ListView( $(this),
									 $('#js-listview-'+listid+'-pro'),
									 $('#js-listview-'+listid+'-full') );
	});
	
	function ListView( $iconBtn, $quick, $full ){
		var quick = false;
		
		
		$iconBtn.click(function(){
			$(this).toggleClass('collapse expand');
			quick = !quick;
			
			if(quick){
				$quick.show();
				$full.hide();
			} else {
				$quick.hide();
				$full.show();
			}
		});
	}


}