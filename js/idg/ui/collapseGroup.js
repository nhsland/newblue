/**
Collapse Group
Uses the DOM and CSS hooks
**/
idg.collapseGroups = function(){
	// find and set up all collapse-groups
	$('.collapse-group').each(function(){
		var group = new CollapseGroup( 	$(this).find( '.collapse-group-icon .oe-i' ), 
										$(this).find( '.collapse-group-header' ), 
										$(this).find( '.collapse-group-content' ),
										$(this).data('collapse') );
	});
	
	function CollapseGroup( icon, header, content, initialState ){
		var $icon = icon, 
			$header = header, 
			$content = content,
			expanded = initialState == 'expanded' ? true : false;
			
		$icon.click(function(){
			change();
		});	
	
		$header.click(function(){
			change();
		});	
		
		function change(){
			if(expanded){
				$content.hide();
			} else {
				$content.removeClass('hidden').show();
			}
			
			$icon.toggleClass('minus plus');
			expanded = !expanded;
		}	
	}	
}