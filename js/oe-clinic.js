/*

JS provided to demo & review UI design work on IDG idg.knowego.com

*/

var clinic = {
	
	init:function(){
		
		this.patientPathwayNum = 0;

		var source = document.getElementById( 'js-clinic-template' ).innerHTML, 
			tbody =  document.getElementById( 'js-clinic-list-patients' ), 
			template = Handlebars.compile( source );
	
		this.clinicData = [
			{ id:'1008005', t:'9:00', n:'TOMKIN, Robert', a:52, g:'Male', d:123, 
				path:[	{n:'VA', t:'9.15', css:'green'},
						{n:'RB', t:'9.35', css:'green dr'},
						{n:'ORTH', t:'9.45', css:'green'},
						{n:'Dilate', t:'11.02', css:'orange'} ]},
						
			{ id:'1008002', t:'9:10', n:'REESE, Charlene', a:52, g:'Female', d:105, 
				path:[	{n:'VA',t:'9.15', css:'green'}] },
		];	
		
		// build clinic list
		for(var i = 0, len = this.clinicData.length; i < len; i++){
			var data = this.clinicData[i];
			
			// handleBars template
			var html = template({
				time: 		data.t,
				number:		data.id,
				age:		data.a,
				gender:		data.g,
				name:		data.n,
				duration: 	data.d,
			});	
			
			// build <tr> for patient
			$('#js-clinic-list-patients').append( html );

			// set duration graphic wait lights
			(function( id, duration ){
				var $svg = $('#'+id+' .duration-graphic' );
				if (duration > 90) { 
					$svg.children('.c4').css({ fill: "#f00" });
				} else if (val > 60) { 
					$svg.children('.c3').css({ fill: "#f60" });
				} else if (val > 40) { 
					$svg.children('.c2').css({ fill: "#ebcd00" });
				} else {
					$svg.children('.c1').css({ fill: "#0c0" });	
				}
			})( data.id, data.d );
			
			// build the pathway from data
			(function( id, path ){
				var $container = $('#'+id+' .pathway' ); 			
				for( var i = 0, len = path.length; i < len; i++){
					var $step = $("<span>", {'class':'pathway-step ' + path[i].css} );
					$step.html( path[i].n + '<span class="time">' + path[i].t + '</span>' );
					$container.append( $step ); 	
				}
			})( data.id, data.path );
		};
		
		/**
		set up interaction 	
		**/
		// + icon to add more pathways
		$('.js-add-pathway').click(function( e ){
			e.stopPropagation();
			// need to know where to insert new pathways:
			clinic.patientPathwayNum = $(this).data('id')
			clinic.addPathway( $(this).position() );
		});
		
		/**
		next steps in the popup. this is in the DOM but hidden
		but when fired be sure to insert into the correct row. 
		**/
		$('#js-add-new-pathway .next-step').click(function( e ){
			e.stopPropagation();
			
			// clone DOM and insert into patient pathway
			var $newStep = $(this).clone().unbind( "click");
			var $patientPathway = $('#'+clinic.patientPathwayNum+' .pathway' );
			$patientPathway.append( $newStep );
			 
			// shift over
			var pathPos = $patientPathway.position();
			var left = pathPos.left + $patientPathway.width();
			$('#js-add-new-pathway').css({'left':left});
			
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
  		
	}
	
	
};


$(document).ready(function() {
	// init
	clinic.init();
});







