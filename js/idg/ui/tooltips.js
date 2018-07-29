/*
Basic tooltip functionality. Quick for IDG demo
*/
idg.tooltips = function(){
	$('.js-has-tooltip').hover(
		function(){
			var text = $(this).data('tooltip-content');
			var offset = $(this).offset();
			var leftPos, toolCSS; 
			
			// check for the available space for tooltip:
			if ( ( $( window ).width() - offset.left) < 100 ){
				leftPos = offset.left - 174 // tooltip is 200px (left offset on the icon)
				toolCSS = "oe-tooltip offset-left";
			} else {
				leftPos = offset.left - 94 // tooltip is 200px (center on the icon)
				toolCSS = "oe-tooltip";
			}
			
			// add, calculate height then show (remove 'hidden')
			var tip = $( "<div></div>", {
								"class": toolCSS,
								"style":"position:fixed; left:"+leftPos+"px; top:0;"
								});
			// add the tip:
			tip.text(text);
			$('body').append(tip);
			// calc height:
			var h = $(".oe-tooltip").height();
			// update position and show
			var top = offset.top - h - 20;
			
			$(".oe-tooltip").css({"top":top+"px"});
			
		},
		function(){
			$(".oe-tooltip").remove();
		}
	);	
}