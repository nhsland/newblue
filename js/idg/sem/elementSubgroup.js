/*
Subgroup Collapse/expand
*/
idg.elementSubgroup = function(){
	
	if( $('.js-element-subgroup-viewstate-btn').length == 0 ) return;
	
	$('.js-element-subgroup-viewstate-btn').each( function(){
		var subgroup = new Viewstate( $(this) );
	});
	
	function Viewstate( $icon ){
		var me = this;
		var $content = $('#' + $icon.data('subgroup') );

		$icon.click( function( e ){
			e.preventDefault();
			me.changeState();
		});
		
		this.changeState = function(){
			$content.toggle();	
			$icon.toggleClass('collapse expand');
		}
		
	}

}