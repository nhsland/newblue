/*
Basic tooltip functionality. Quick for IDG demo
*/
idg.tooltips = function(){
	$('.js-has-tooltip').hover(
		function(){
			var text = $(this).data('tooltip-content');
			var offset = $(this).offset();
			var html = '<div class="oe-tooltip" style="position:fixed; left:'+(offset.left + 20)+'px; top:'+(offset.top + - 10)+'px;">'+ text +'</div>';
			$(this).data( "tooltip", html );
			$('body').append(html);
		},
		function(){
			$('body').find( ".oe-tooltip" ).remove();
		}
	);	
}