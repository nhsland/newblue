/**
popup containing all options for adding pathways
This is pre-built and 'hidden' in the DOM 
**/
clinic.setupAddPathway = function(){
	/**
	Events
	**/
	$('#js-add-new-pathway .js-close-btn').click(function( e ){
  		e.stopPropagation();
  		clinic.addPathway.hide();
		});
		
		// next steps (all)
	$('#js-add-new-pathway .next-step-add').click(function( e ){
		e.stopPropagation();
		clinic.addPathway.addStep( $(this) );
	});
	
	// dilate options ('hidden')
	$('#js-dilate-add-btn').click( function( e ){
		e.stopPropagation();
		addDilate();					
	});
	
	// If a step has options (such as Dilate) need to provide a
	// way of getting back to the steps
	$('#js-pathway-back').click( function( e ) {
		e.preventDefault();
		e.stopPropagation();
		clinic.addPathway.back();	
	});
	
	$('#js-pathway-back').hide(); // hide it 
	
	
	/**
	Add step to selected pathway
	**/
	function appendNewStep( $appendStep ){
		$('#patient-'+clinic.activePathwayID+' .pathway' ).append( $appendStep );
		clinic.updateTasks();
	}
	
	/**
	Dilate is a special case. 
	**/
	function addDilate(){
		// addPathway stores selected step
		var $step = clinic.addPathway.selectedStep; 
		var data = {};
		
		// user can push active or it depends on previous pathway step
		var active = clinic.addPathway.makeActive ? true : clinic.isNewStepActive();
		
		// check Dilate options and add data to step
		var eye = $('input[name=eye]:checked').val();
		data.eye = eye;
		
		// Fixed set of 3?
		var fixedSet = $('input[name=fixed]:checked').val();
		if( fixedSet !== undefined){
			data.n = "Fixed Dilate Set";
			data.t = fixedSet;
			
			var step2 = $step.clone();
			
			appendNewStep( clinic.createNewStep( $step, data, active ) );
			appendNewStep( clinic.createNewStep( $step, data, active ) );
			appendNewStep( clinic.createNewStep( $step, data, active ) );
			
			clinic.addPathway.reset();	
		
		} else {
			
			// single Dilate?
			var drugs = $('.option-list input:checkbox:checked');	
			if( drugs.length ){
				data.n = "Dilate";
				data.t = "";
				for( var i = 0; i < drugs.length; i++ ){
					data.t +=  drugs[i].value + "<br>";
				}
			
				appendNewStep( clinic.createNewStep( $step, data, active ) );	
				clinic.addPathway.reset();		
			}
		}
	}
	
	/**
	addPathway application logic
	**/
	clinic.addPathway = {
		
		selectedStep:null,
		makeActive:false,  	// opiton to make step 'active' -- NOT required but kept in case

		show:function( left, top ){
			
			clinic.activeInfo.hide(); // hide activeInfo popup
			
			$('#js-add-new-pathway')
				.removeClass('hidden')
				.show()
				.css({'left':left, 'top':top });
			
			/**
			show patient name to confirm pathway	
			**/
			$('#js-add-new-pathway .title').text( clinic.activePathwayName ); 		
		}, 
		
		addStep:function( $step ){
			// make active is a single checkbox
			this.makeActive = ( $('.make-active input:checkbox:checked').length == 1 );
			$('.make-active input').prop('checked',false); // reset 
			
			if( $step.data('id') == "dilate" ){
				this.selectedStep = $step;			// store until dilate options are set
				this.showDilateOptions();
			} else {
				// insert clone DOM straight into selected patient pathway	
				var active = this.makeActive ? true : clinic.isNewStepActive();
				var dataObj = clinic.createDefaultData( 'next-step' );
				var $newStep = clinic.createNewStep( $step, dataObj, active );	
				appendNewStep( $newStep );
				this.selectedStep = null;
			}
		},
		
		showDilateOptions:function(){
			// hide pathway steps
			$('#js-add-new-pathway .new-pathway-steps').hide();
			// show dilate options
			$('#add-dilate-options').removeClass('hidden').show();
			
			$('#js-pathway-events-title span').hide();
			$('#js-pathway-back').show();
		},
		
		back:function(){
			// reverse showDilateOptions
			$('#js-add-new-pathway .new-pathway-steps').show();
			$('#add-dilate-options').hide();
			$('#js-pathway-events-title span').show();
			$('#js-pathway-back').hide();
		},
		
		reset:function(){
			$('#add-dilate-options .option-list input').prop('checked',false);
			$('#add-dilate-options').hide();
			$('#js-add-new-pathway .new-pathway-steps').show();
			$('#js-pathway-events-title span').show();
			$('#js-pathway-back').hide();
		}, 
		
		hide:function(){
			this.reset();
			$('#js-add-new-pathway').hide();
		}
	};	
}