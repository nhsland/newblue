/** 
setup Add to All patients
**/
clinic.setupAddToAll = function(){
	/**
	Events
	**/
	$('#js-add-to-all-pathways .close-icon-btn').click(function( e ){
  		e.stopPropagation();
  		clinic.addToAll.hide();
	});
		
	// Add icon in Filters
	$('#js-add-to-all').on('click', function( e ){
  		e.stopPropagation();
  		clinic.addToAll.show();	
	});
		
		// set options
	$('#js-add-all-set-btn').click( function( e ){
		e.stopPropagation();
		addSet();					
	});
	
	// next steps (all)
	$('#js-add-to-all-pathways .next-step-add').click(function( e ){
		e.stopPropagation();
		addStep( $(this) );
	});
		
	// Select / Deselect all Patients
	$('#js-add-to-all-pathways .select-deselect-all input').change( function(){
  		$('.js-add-all-select').prop("checked", this.checked );
	});
		
		
	/**
  	Add a set of steps	
  	**/
  	function addSet(){
	  	var set = $('#js-add-to-all-pathways input[name=userset]:checked').val();
	  	if( set !== undefined){
			if( set == 1){
				
				var $step1 = clinic.createPathwayStep( 'VA' );
				clinic.makeDefaultStep( $step1 );
				$step1.data('data',{'eye':'left','n':'Visual Acuity','t':'In progress','state':'ready'} );
				
				var $step2 = clinic.createPathwayStep( 'Dilate' );
				clinic.makeDefaultStep( $step2 );
				$step2.data('data',{'eye':'left','n':'Dilate','t':'Tropicamide','state':'ready'} );
				
				var steps = $step1.add( $step2 );
				
				allPatients( appendStepToSelected, steps );
			}
			if( set == 2){
				
			}
		}
  	};
  	
  	/**
	Add a single step 
	**/
	function addStep( $step ){
		var $new = clinic.createNewStep( $step, clinic.createDefaultData( 'next-step') )
		allPatients( appendStepToSelected, $new );
	}
	
  	/**
  	ignore if pathway is completed or patient was DNA	
  	'active' = 'patient in clinic'
  	'inactive' = 'patient not yet arrived'
  	**/
  	function allPatients( callBack, arg ){
	  	$('.oe-clinic-list tbody tr').each( function(){
		  	var state = $(this).data('state');	
	  		if( state == 'active' || state == 'inactive' ){
		  		callBack( this, arg );
		  	}
		});
  	}
  	
  	/**
	Append new steps to selected rows 
	**/
	function appendStepToSelected( tr, $new ){
		var checked =  $('.js-add-all-select', tr ).is(':checked');
		var hidden = $(tr).is(':hidden');
		
		if( checked && ! hidden ){
			var active = $('.pathway-step',tr ).last().hasClass('green');
			var copy = $new.clone( true ); 		// clone events and data! 
			
			if( active ){
				var firstStep = copy.first();
				clinic.makeDefaultStep( firstStep );
				clinic.makeStepActive( firstStep );
			}
			
			$('.pathway', tr ).append( copy );
			
			clinic.updateTasks();				
		}
	}
	
	/**
  	Turn + icons to checkboxes
  	**/
	function showSelectPatients( tr ){
  		$('.js-add-pathway', tr ).hide();	
		  		
  		// show the check box
  		$('.js-add-all-select', tr )
  			.removeClass('hidden')
  			.prop( "checked", true ) 	// default to checked
  			.show();	  	
	}
		
	/**
  	Hide checkboxes and show + icon again
  	**/
	function hideSelectPatient( tr ){
  		$('.js-add-pathway', tr ).show();	 	// + icon
		$('.js-add-all-select', tr ).hide();	// checkbox
	}
		
	/**
  	add-to-all-pathways dom control
  	**/
	clinic.addToAll = {
  		
  		show:function(){
	  		
	  		clinic.addPathway.hide();
	  		
	  		$('#js-add-to-all-pathways')
	  			.removeClass('hidden')
	  			.show();
	  		
	  		// set up check boxes for patient selection
	  		$('#js-add-to-all-pathways .select-deselect-all input:checkbox').prop( "checked", true ); 
	  		allPatients( showSelectPatients );
  		},
  		
  		hide:function(){
	  		allPatients( hideSelectPatient );
	  		$('#js-add-to-all-pathways').hide();
  		}
	};
}