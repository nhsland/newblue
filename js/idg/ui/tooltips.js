/*
Basic tooltip functionality. Quick for IDG demo
*/
idg.tooltips = function(){
	$('.js-has-tooltip').hover(
		function(){
			var text = $(this).data('tooltip-content');
			var offset = $(this).offset();
			var leftPos = offset.left - 94 // tooltip is 200px (and center on the icon)
			// add, calculate height then show (remove 'hidden')
			var tip = $( "<div></div>", {
								"class": "oe-tooltip",
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