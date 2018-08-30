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
		this.$icon = $icon;
		this.expanded = true; // default
		this.$content = $('#' + $icon.data('subgroup') );
		
		$icon.click( function( e ){
			e.preventDefault();
			me.changeState();
		});
		
		this.changeState = function(){
			this.$content.toggle();	
			this.$icon.toggleClass('collapse expand');
		}
		
	}

}