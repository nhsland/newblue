/*

JS provided to demo & review UI design work on IDG idg.knowego.com

*/

var clinic = {
	
	init:function(){
		
		this.patientPathwayID = 0;
		this.setDurationGraphics();
		
		/**
		+ icon to add more pathways to patient
		**/
		$('.js-add-pathway').click(function( e ){
			e.stopPropagation();
			// need to know where to insert new pathways
			clinic.patientPathwayID = $(this).data('id')
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

			var $patientPathway = $('#patient-'+clinic.patientPathwayID+' .pathway' );
			$patientPathway.append( $newStep );
		});
		
		/** 
		Allow user to remove any next-steps	
		**/
		$('.next-step').click(function( e ){
			e.stopPropagation();
			$(this).remove();
		});
		
		/** 
		Assignment init.
		All need initiating but for the purposes of IDG demo the 
		patients are also pre-assigned here too. 
		**/
		clinic.demoSetup('JEM',[]);
		clinic.demoSetup('CW',[]);
		clinic.demoSetup('AB',[ 1008002, 1008003 ]); 
		clinic.demoSetup('RB',[ 1008005 ]);
		clinic.demoSetup('AG',[ 1008001 ]);
		clinic.showUnassignedCount();
		
		/**
		Setup a late person example
		**/
		$('#patient-'+1009112+' td')
			.first()
			.addClass('late')
			.append( '<div class="late-time">09:52</div>' );
		
			
		
		/**
		When dropdown assignment is changed update assignments	
		**/
		var previous;
		$("select").on('focus', function () {
			previous = this.value; // get current value on focus
		}).change(function() {
			var patientID = $(this).data('id');
			clinic.changeAssignment( previous, this.value, patientID );
		});
		
		/**
		Doctor clinic list filters.
		Default set up is 'All'	
		**/
		$('#view-all-assigned').addClass('selected');
	
		$('.oe-clinic-assignment').click( function( e ){
			e.stopPropagation();
			clinic.filterList( $(this) );
		});
		
		
		
	},	
	
	/**
	Clicking on the doctors allows you to filter the list view	
	**/
	filterList:function( $dr ){
		var id = $dr.data( 'id' );
		var patients = $dr.data( 'patients' );
		var $el = $('#assign-'+ id );
		
		
		if( id == "all" ){
			
			$('.oe-clinic-list tbody tr').show();
			$el = $('#view-all-assigned');
			
		} else if( id == 'none' ){
			
			// this has to work a bit harder, check each <tr>:
			$('.oe-clinic-list tbody tr').each( function(){
				var $dropdown = $(this).find('.clinic-assign-options');
				if( $dropdown.val() == '0' ){
					$(this).show();
				} else {
					$(this).hide()
				}
			});
			$el = $('#unassigned');
			
		} else {
			
			$('.oe-clinic-list tbody tr').hide();
			
			for(var i=0; i<patients.length; i++){
				$('#patient-' + patients[i]).show();
			}
			
		}
		
		// update UI for doctors
		$('.oe-clinic-assignment').removeClass('selected');
		$el.addClass('selected');
	},
	
	
	/**
	idg demo setup
	@param who - id string
	@param patients - Array of patient numbers
	**/
	demoSetup:function(who,patients){
		$('#assign-'+who).data( "patients", patients ); 
		for(var i=0; i<patients.length; i++){
			$('#patient-'+ patients[i] +' .clinic-assign-options').val( who );	
		}
		// show assignment count
		$('#assign-'+ who + ' .current').text( patients.length );
	},
	
	
	/**
	count all the unassigned dropdowns
	**/
	showUnassignedCount:function(){
		var count = 0
		$('.clinic-assign-options').each( function(){
			if( $(this).val() == 0){
				count += 1;
			}
		});
		// show unassigned total count
		$('#unassigned .current').text( count );	
	},
	
	/**
	add / remove assignment to doctor	
	**/
	changeAssignment:function( prevDr, newDr, patientID ){
		
		patientID = parseInt( patientID )
		
		// remove previous assigned doctor if it wasn't unassigned
		if( prevDr != 0){
			var patients = getData( prevDr );
			var index = patients.indexOf( patientID );
			if (index > -1) {
				patients.splice(index, 1);
			}
			updateDrData( prevDr, patients  ) 
		}
		
		// add patient to new doctor, if not unassigned
		if( newDr != 0){
			var patients = $('#assign-'+newDr).data( "patients" );
			patients.push( patientID );
			// show assignment count
			updateDrData( newDr, patients  ) 	
		}
		
		clinic.showUnassignedCount();
		
		function getData( drCode ){
			return $( '#assign-' + drCode ).data( "patients" );
		}
		
		function updateDrData( drCode, patients ){
			$( '#assign-' + drCode ).data( "patients", patients )
			$( '#assign-' + drCode + ' .current').text( patients.length );
		}
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







