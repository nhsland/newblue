/** 
set waiting light graphics based on the duration minutes
**/
clinic.setDurationGraphics = function(){
	
	$('.duration-mins').each(function(){
		var time = parseInt( $(this).text() );
		if( time > 0){	
			var $svg = $(this).parent().children('.duration-graphic'); 

			if (time > 90) { 
				$svg.children('.c4').css({ fill: "#f00" });
			} else if (time > 60) { 
				$svg.children('.c3').css({ fill: "#f60" });
			} else if (time > 40) { 
				$svg.children('.c2').css({ fill: "#ebcd00" });
			} else {
				$svg.children('.c1').css({ fill: "#0c0" });	
			}	
		}
	});		
}