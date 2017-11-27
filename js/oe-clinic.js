/*

JS provided to demo & review UI design work on IDG idg.knowego.com

*/

var clinic = {
	
	init:function(){
		
		this.patientPathwayNum = 0;
		
		this.setDurationGraphics();
		
		/**
		set up interaction 	
		**/
		// + icon to add more pathways
		$('.js-add-pathway').click(function( e ){
			e.stopPropagation();
			// need to know where to insert new pathways
			clinic.patientPathwayNum = $(this).data('id')
			// position popup
			clinic.addPathway( $(this).position() );
		});
		
		/**
		next steps in the popup. this is in the DOM but hidden
		but when fired be sure to insert into the correct row. 
		**/
		$('#js-add-new-pathway .next-step-add').click(function( e ){
			e.stopPropagation();
			
			// clone DOM and insert into patient pathway
			var $newStep = $(this).clone().unbind( "click");
			$newStep
				.removeClass('next-step-add')
				.addClass('next-step')
				.click(function( e ){
					e.stopPropagation();
					$(this).remove();
				});

			
			var $patientPathway = $('#'+clinic.patientPathwayNum+' .pathway' );
			$patientPathway.append( $newStep );
		});
		
		/** 
		Allow any user to remove any next-steps	
		**/
		$('.next-step').click(function( e ){
			e.stopPropagation();
			$(this).remove();
		});
		

	},	
	
	/**
	Show popup containing all options for adding pathways
	This is pre-built in the DOM 
	**/
	addPathway:function( pos ){
		var left = pos.left, 
			top = pos.top - 15; 
		
		$('#js-add-new-pathway')
			.removeClass('hidden')
			.show()
			.css({'left':left, 'top':top })
			.mouseleave(function(){
				$(this).hide();
	  		});
  		
  		$('#js-add-new-pathway .js-close-btn').click(function( e ){
	  		e.stopPropagation();
	  		$('#js-add-new-pathway').hide();
  		});
  		
	}, 
	
	/** 
	set waiting light graphics based on the duration minutes
	**/
	setDurationGraphics:function(){
		
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
};


$(document).ready(function() {
	// init
	clinic.init();
});







