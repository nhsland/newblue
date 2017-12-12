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
			var pos = clinic.getPosition( $(this) );						// position addPathway popup
			clinic.addPathway.show( pos.left, pos.top - 15 );
		});
		
		/** 
		Setup all the pathway steps that are pre-loaded in the DOM
		**/
		$('.oe-clinic-list .pathway-step').each(function(){
			clinic.makeDefaultStep( $(this) );
			var css = $(this).attr("class").split(' ');	

			if( $(this).data('data') == undefined ){
				$(this).data( 'data', clinic.createDefaultData( css[1] ) ); // if no specifc data setup default data
			} else {
				$(this).data('data').state = clinic.setState( css[1] );
			}
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
		this.setupAddToAll();
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
			// show count:
			$('#filter-'+ id + ' .current').text( patients.length );
			
			if(obj == 'dna' || obj == 'tasks') continue; // ignore dna and tasks
			
			for(var i=0; i<patients.length; i++){
				$('#patient-'+ patients[i] +' .clinic-assign-options').val( id ); // set up dropdowns
			}
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
	update Tasks filter
	Check all rows and updated filter
	**/
	updateTasks:function( ){
		// tbody id
		// tr data state can be complete, active, dna or inactive
		// only interested in active
		$('#js-clinic-list-patients tr').each(function(){
			var state = $(this).data('state');
			if( state == 'active'){
				
				var id = parseInt( $(this).data('id') );
				var index = clinic.data['tasks'].indexOf( id );
				var taskSteps = $('.pathway-step.orange', this);
				
				console.log('id = '+ id + 'taskSteps = '+taskSteps.length  );
				
				if( taskSteps.length ){
					// add id if not there...
					if (index == -1) clinic.data['tasks'].push( id );
				} else {
					// remove it
					if (index > -1) clinic.data['tasks'].splice( index, 1 );
				}
			}
		});
		
		$('#filter-tasks .current').text( clinic.data['tasks'].length );
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
	Create a pathway step
	@return - new $obj
	**/
	createPathwayStep:function( name ){
		var $span = $("<span>", {"class": "pathway-step"});
		$span.text(name);
		$span.append('<span class="time"></span>');
		return $span;
	},
	
	/**
	Create a default data obj for a pathway step
	@return step data obj
	**/
	createDefaultData:function( css ){
		return { 	eye:'Both',
					n:'Not Set',
					t:'Currently no data is being generated for this step',
					state:clinic.setState( css ) };
	},
	
	
	/**
	Set state based on CSS classes	
	@return string
	**/
	setState:function( css ){
		var state; 
		switch(css){
			case 'next-step':	state = "ready";
			break;
			case 'orange': 		state = "active";
			break;
			case 'green': 
			case 'blue': 		state = "complete";
			break;		
			case 'dna':			state = "dna";
			break;
		}
		return state;
	},
	
	
	/**
	Create new next-step
	@return - Returns new next-step
	**/
	createNewStep:function( $step, dataObj, active = false ){
		
		var data = $.extend( {}, dataObj );
		var $new = $step.clone();
		$new.removeClass('next-step-add');
		clinic.makeDefaultStep( $new );
		$new.data( 'data',data );
		
		if(active){
			clinic.makeStepActive( $new );
		} 
		
		return $new;
	},
	
	/** 
	make default ('next-step') step
	**/
	makeDefaultStep:function( $step ){
		$step.addClass( 'next-step' );
		$step.click(function( e ){
			e.stopPropagation();
			var pos = clinic.getPosition( $(this) );
			clinic.activeInfo.show( pos.left, pos.top, $(this) );
		});
	},
	
	/** 
	Complete a step (green)	
	**/
	makeStepActive:function( $step ){
		$step.data('data').state = 'active';
		$step
			.removeClass('next-step')
			.addClass('orange');
		
			
		clinic.updateTasks();
	},
	
	/** 
	Complete a step (green)	
	**/
	makeStepComplete:function( $step ){
		$step.data('data').state = 'complete';
		$step
			.removeClass('orange')
			.addClass('green');	
		
		$step.children('.time').text('10:35');
		
		clinic.updateTasks();
	},
	
	/** 
	Step completed (PIN entered correctly)	
	**/
	stepComplete:function( $step ){
		clinic.makeStepComplete( $step );
		
		// next sibling?
		var $next = $step.next();
		if( $next.length && $next.hasClass('next-step') ){
			clinic.makeStepActive( $next );
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
  		
  		// activate this task
  		$('#js-activate-task').click(function( e ){
	  		clinic.activeInfo.activate();
  		});
  		
  		// tick icon Right | Left
  		// a successful pin in either one will work
  		$('#js-submit-pin-right').click(function( e ){
	  		clinic.activeInfo.pin( $('#js-user-pin-right').val(), 'right' );
  		});
  		$('#js-submit-pin-left').click(function( e ){
	  		clinic.activeInfo.pin( $('#js-user-pin-left').val(), 'left' );
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
	  		
	  		activate:function(){
		  		clinic.makeStepActive( this.activeStep );
		  		this.hide();	
	  		},
	  		
	  		pin:function( code, side ){
		  		if( code === '1234'){
			  		
			  		clinic.stepComplete( this.activeStep );
			  		this.hide();
			  		
		  		} else {
			  		$('.eye-confirmation.'+side).addClass('wrong-pin');
			  		$('#js-user-pin-'+side).focus();
		  		}
	  		},
	  		
	  		show:function( left, top, $step ){
		  		
		  		clinic.addPathway.hide() // hide addPathway options
		  		
		  		$('.eye-confirmation').removeClass('wrong-pin');
		  		
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
					
				// setup depending on 'state'	
				$('#js-activate-task').hide();
				$('#js-pin-confirmation').hide();
				$('#js-who-completed').hide();
				$('#js-trash-active-step').show(); // trash 
				
				function showEyeInput( eye ){
					eye = eye.toLowerCase();
					switch( eye ){
						case 'right':
							$('#js-pin-confirmation .eye-confirmation.left').hide();
							$('#js-pin-confirmation .eye-confirmation.right').show();
						break;
						case 'left':
							$('#js-pin-confirmation .eye-confirmation.left').show();
							$('#js-pin-confirmation .eye-confirmation.right').hide();
						break;
						default:
							$('#js-pin-confirmation .eye-confirmation.left').show();
							$('#js-pin-confirmation .eye-confirmation.right').show();
					}
				}
				
				switch(data.state){
					case 'ready': 		$('#js-activate-task').show();
					break;
					case 'active': 		$('#js-pin-confirmation').show();
										showEyeInput( data.eye );
					break;
					case 'complete': 	$('#js-who-completed').show();
										$('#js-trash-active-step').hide();		
					break;
				}
			},
  			
  			hide:function(){
	  			this.activeStep = null
	  			$('.input-confirmation').removeClass('wrong-pin');
				$('#js-active-step-info').hide();
			}
  		};  		
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
	setup Add to All patients
	**/
	setupAddToAll:function(){
		/**
		Events
		**/
		$('#js-add-to-all-pathways .js-close-btn').click(function( e ){
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
  	},
  	
  	/**
	Find top and left position of obj
	@return pos obj
	**/
  	getPosition:function( $obj ){
	  	var pos = $obj.position();
	  	var clinic = $('.oe-clinic-list').position(); // table
	  	// adjust for scroll position:
	  	pos.top = pos.top - clinic.top;
	  	return pos;
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
				
				var pos = clinic.getPosition( td );
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
/*
			if( firstStep.hasClass( 'late' ) ){
				var tr = $(this).parents('tr');
				tr.find('td').first().addClass('time-flag late'); -- turned off
			}
*/
			// DNA! 
			if( firstStep.hasClass( 'dna' ) ){
				var tr = $(this).parents('tr');
				tr.data('state','dna');
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
		tr.data('state','complete');
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





