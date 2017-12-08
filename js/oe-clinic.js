/*

JS provided to demo & review UI design work on IDG idg.knowego.com

currently the logic for the steps is:
Green - done (but may have extra info if required)
Orange - in progress. must have info (to remove at least)
Grey - future event can be directly removed

*/

var clinic = {
	
	/**
	The main function of JS is to provide
	ways to filter the clinic list view
	and to add new steps to a patient pathway.
	@para data - Object containing setup info: { id:[ patients Array ] }
	**/
	init:function( data ){
		
		this.data = data; // reference data Obj.
		this.activePathwayID = 0;
		this.activePathwayName = "";
		
		/**
		all '+' icons to add pathways to patient
		**/
		$('.js-add-pathway').click(function( e ){
			e.stopPropagation();
			clinic.activePathwayID = $(this).data('id'); 		// need to know where to insert new pathways
			clinic.activePathwayName = $(this).data('name'); 	// Patient name
			var pos = $(this).position();						// position addPathway popup
			clinic.addPathway.show( pos.left, pos.top - 15 );
		});
		
		/** 
		Allow users to remove any next-steps (grey ones)	
		that have been added to any pathway
		**/
		$('.next-step').on('click',function( e ){
			e.stopPropagation();
			$(this).remove();
		});  
			
		/**
		clinic list filters
		**/
		$('.oe-clinic-filter').click( function( e ){
			e.stopPropagation();
			clinic.filterList( $(this) );
		});
		
		/**
		ultimately this will be handled by backend
		for now easier to setup demo DOM in JS	
		**/
		this.setupDemoUI();	// ---- for IDG demo
		
		/**
		setup UI
		**/
		this.setupAddPathway();
		this.setupActiveInfo();
		this.setupAssignments();
		this.setupFilters(); 				
		this.setDurationGraphics();	
		this.showCurrentTime();
	},	
	
	/**
	All, Doctors, Unassigned, DNA and Tasks
	allows the user to filter the patient list	
	**/
	filterList:function( $filter ){
		var id = $filter.data( 'id' );
		// update UI
		$('.oe-clinic-filter').removeClass('selected');
		$('#filter-'+ id ).addClass('selected');
		
		/** 
		'All' and 'Tasks' are the exceptions to the standard filtering	
		**/
		if( id == 'all' ) {
			
			$('.oe-clinic-list tbody tr').show();
		
		} else if (id == 'tasks') {
			
		
		} else {
			// Doctors, Unassigned and DNA
			// hide others...
			$('.oe-clinic-list tbody tr').hide();
			
			var patients = clinic.data[id];
			for(var i=0; i<patients.length; i++){
				$('#patient-' + patients[i]).show(); // show assigned patients 			
			}
		}
	},
	
	
	/**
	set up ALL filter buttons, use init data
	**/
	setupFilters:function(){
		
		// All is selected by default
		$('#filter-all').addClass('selected');
		
		// set up assignment dropdowns for doctors & show count
		for(obj in clinic.data){
			var patients = clinic.data[obj];
			var id = obj.toString();
			for(var i=0; i<patients.length; i++){
				$('#patient-'+ patients[i] +' .clinic-assign-options').val( id );	
			}
			$('#filter-'+ id + ' .current').text( patients.length );
		}
		
		/**
		build the data for unassigned from the DOM
		note: js has setup the DOM for IDG demo
		**/
		$('.clinic-assign-options').each( function(){
			if( $(this).val() == 'unassigned' && $(this).is(":visible") ){
				var trID = $(this).parents('tr').data('id')
				clinic.data['unassigned'].push( parseInt(trID) );
			}
		});
		$('#filter-unassigned .current').text( clinic.data['unassigned'].length );
	},
	
	/**
	setup assignment dropdowns	
	**/
	setupAssignments:function(){
		
		// store inital value 
		$('.clinic-assign-options').each( function(){
			var value = $(this).val();
			$(this).data('previous',value);
		});
		
		// when changed update value and store new value
		$('.clinic-assign-options').change(function() {
			var patientID = $(this).data('id');
			clinic.changeAssignment( $(this).data('previous'), this.value, patientID );
			$(this).data('previous',this.value);
		});
	},
	
	/**
	users adds/removes assignment to doctor	
	**/
	changeAssignment:function( prevAssign, newAssign, patientID ){
		patientID = parseInt( patientID );
	
		// remove 
		var index = clinic.data[ prevAssign ].indexOf( patientID );
		if (index > -1) clinic.data[ prevAssign ].splice( index, 1 );

		// add
		clinic.data[ newAssign ].push( patientID );
		
		updateCount( prevAssign );
		updateCount( newAssign );
		
		function updateCount( code ){
			$('#filter-'+ code +' .current').text( clinic.data[ code ].length );
		}
	},
	
	/** 
	what is the last step state in pathway?
	if green then new step = active
	**/	
	isNewStepActive:function(){
		var last = $('#patient-'+clinic.activePathwayID+' .pathway-step' ).last();
		if( last.hasClass('green') ){
			return true;
		} else {
			return false;
		}
	},

	
	/** 
	Active (orange) step	
	**/
	makeActiveStep:function( $step ){
		$step.addClass('orange');
		$step.on('click', function( e ){
			e.stopPropagation();
			var pos = $(this).position();
			clinic.activeInfo.show( pos.left, pos.top, $(this) );
		});
	},
	
	makeCompleteStep:function( $step ){
		$step
			.off('click')
			.removeClass('orange')
			.addClass('green');	
		
		$step.children('.time').text('10:35');
	},
	
	/** 
	Step completed (PIN entered correctly)	
	**/
	stepComplete:function( $step ){
		clinic.makeCompleteStep( $step );
		
		var $next = $step.next();
		if( $next.length && $next.hasClass('next-step') ){
			
			$next
				.off('click')
				.removeClass('next-step');
			
			clinic.makeActiveStep( $next );
		}
	},
	
	
	/** 
	Inital setup for Active steps
	and also setups the info popup	
	**/
	setupActiveInfo:function(){
	
		/**
	  	Events
	  	**/
		$('#js-active-step-info .js-close-btn').click(function( e ){
	  		e.stopPropagation();
	  		clinic.activeInfo.hide();
  		});
  		
  		// tick icon
  		$('#js-submit-pin').click(function( e ){
	  		clinic.activeInfo.pin( $('#js-user-pin').val() );
  		});
  		
  		// trash icon 
  		$('#js-trash-active-step').click(function( e ){
	  		clinic.activeInfo.removeStep();
  		});
  		
 		
  		
  		/**
	  	Handle active-step-info application logic 
	  	**/
  		clinic.activeInfo = {
	  		
	  		activeStep:null,
	  		
	  		removeStep:function(){
		  		this.activeStep.remove();
		  		this.hide();
	  		},
	  		
	  		pin:function( code ){
		  		if( code === '1234'){
			  		
			  		clinic.stepComplete( this.activeStep );
			  		this.hide();
			  		
		  		} else {
			  		$('.input-confirmation').addClass('wrong-pin');
			  		$('#js-user-pin').focus();
		  		}
	  		},
	  		
	  		show:function( left, top, $step ){
		  		
		  		clinic.addPathway.hide() // hide addPathway options
		  		
		  		this.activeStep = $step;
		  		var data = $step.data('data');
		  		/**
		  		Set up text for all the data
		  		**/
		  		$('#js-active-step-info .title').text( data.n );
		  		$('#js-active-step-info .eye .side').text( data.eye );
		  		$('#js-active-step-info .data').html( data.t );
		  		
		  		// show and position correctly
				$('#js-active-step-info')
					.removeClass('hidden')
					.show()
					.css({'left':left, 'top':top });
			},
  			
  			hide:function(){
	  			this.activeStep = null
	  			$('.input-confirmation').removeClass('wrong-pin');
				$('#js-active-step-info').hide();
			}
  		};
  		
  		/**
	  	set up all loaded Active (orange) steps
	  	new active steps are setup as they are added 	
	  	**/
  		$('.pathway-step.orange').each( function(){
			clinic.makeActiveStep( $(this) );
		});
  		
	},
	
	/**
	popup containing all options for adding pathways
	This is pre-built and 'hidden' in the DOM 
	**/
	setupAddPathway:function(){
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
		
		/**
		Create new step by cloning to add it to pathway
		@return - Returns $new
		**/
		function createNewStep( $step, dataObj = false ){
			// user can push active, else depends on previous pathway step
			var active = clinic.addPathway.makeActive ? true : clinic.isNewStepActive();
			
			var $new = $step.clone();
			$new.removeClass('next-step-add');
			$new.data( 'data',dataObj );
			
			if(active){
				
				clinic.makeActiveStep( $new );
			
			} else {
				$new
					.addClass('next-step')
					.click(function( e ){
						e.stopPropagation();
						$(this).remove();
					});
			}
			return $new;
		}
		
		/**
		Add step to selected pathway
		**/
		function appendNewStep( $appendStep ){
			$('#patient-'+clinic.activePathwayID+' .pathway' ).append( $appendStep );
		}
		
		/**
		Dilate is a special case. 
		**/
		function addDilate(){
			// addPathway stores selected step
			var $step = clinic.addPathway.selectedStep; 
			var data = {};
			
			// check Dilate options and add data to step
			var eye = $('input[name=eye]:checked').val();
			data.eye = eye;
			
			// Fixed set of 3?
			var fixedSet = $('input[name=fixed]:checked').val();
			if( fixedSet !== undefined){
				data.n = "Fixed Dilate Set";
				data.t = fixedSet;
				appendNewStep( createNewStep( $step, data ) );
				data.n = "Fixed Dilate Set";
				appendNewStep( createNewStep( $step, data ) );
				data.n = "Fixed Dilate Set";
				appendNewStep( createNewStep( $step, data ) );
				
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
				
					appendNewStep( createNewStep( $step, data ) );	
					clinic.addPathway.reset();		
				}
			}
		}
		
		/**
		Handle addPathway application logic
		**/
		clinic.addPathway = {
			
			selectedStep:null,
			makeActive:false,  	// user has opiton to make step 'active' where ever it is in the pathway
	
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
					appendNewStep( createNewStep( $step, {eye:'Both',n:'No Data',t:'Currently no data is being generated for this step'} ) );
					this.selectedStep = null;
				}
			},
			
			showDilateOptions:function(){
				// hide pathway steps
				$('#js-add-new-pathway .new-pathway-steps').hide();
				// show dilate options
				$('#add-dilate-options').removeClass('hidden').show();
			},
			
			reset:function(){
				$('#add-dilate-options .option-list input').prop('checked',false);
				$('#add-dilate-options').hide();
				$('#js-add-new-pathway .new-pathway-steps').show();
			}, 
			
			hide:function(){
				this.reset();
				$('#js-add-new-pathway').hide();
			}
		};	
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
	},
	
	/** 
	show 'current' time in clinic patient list
	faked for demo purposes
	**/
	showCurrentTime:function(){
		var nowTime = "10:35";
		var future = false;
		$('.oe-clinic-list tbody tr').each( function(){
			var td = $(this).find('td').first();
			
			if(td.text() == "10:35"){
				future = true;
				
				var pos = td.position();
				$('.clinic-time').css( {'top':pos.top - 7 } );
			}
		
			if( future ){
				$(this).addClass('future');
			}
		});	
	},
	
	/** 
	UI setup DEMO (based on DOM elements)
	**/
	setupDemoUI:function(){
		
		/**
		Update UI for Late and DNA
		**/
		$('.pathway').each(function(){
			var firstStep = $(this).children('.pathway-step').first();
			
			// late! 
			if( firstStep.hasClass( 'late' ) ){
				var tr = $(this).parents('tr');
				// tr.find('td').first().addClass('time-flag late'); -- turned off
			}
			
			// DNA! 
			if( firstStep.hasClass( 'dna' ) ){
				var tr = $(this).parents('tr');
				tr.find('.clinic-assign-options').hide();
				tr.find('.js-add-pathway').hide();
				tr.find('.duration-graphic').css('opacity','0.3');
				tr.find('.duration-mins').hide();
				// tr.find('td').first().addClass('time-flag dna'); -- turned off
			}
		});
		
		/** 
		Show a completed pathway exmaple	
		**/	
		var tr = $( '#patient-'+1152572 );
		var duration = tr.find('.duration-graphic');
		var td = duration.parent();
		duration.hide();
		td.addClass('complete');
		td.children('.duration-mins').append(' mins');
		tr.find('.clinic-assign-options').hide();
		tr.find('.clinic-assign-options').parent().text('Dr Amit Baum (AB)');
		tr.find('.js-add-pathway').hide();
		$('#filter-AB .total').text(1);
		
		
	},
};





