/**
IDG Demo JS
Provided to demo & review UI design concept work on idg.knowego.com
Loaded on all pages, js activates depending on the DOM setup
**/
var idg = idg || {};

idg.init = function(){	

	/**
	- OpenEyes logo, info and theme switcher
	- Shortcuts Nav in <header> 
	- Activity panel
	**/ 
	var openeyes 	= new idg.NavBtnPopup( 'logo', $('#js-openeyes-btn'), $('#js-openeyes-info') );
	var shortcuts 	= new idg.NavBtnPopup( 'shortcuts', $('#js-nav-shortcuts-btn'), $('#js-nav-shortcuts-subnav') ).useWrapper( $('#js-nav-shortcuts') );
	var activity 	= new idg.NavBtnPopup( 'activity', $('#js-nav-activity-btn'), $('#js-activity-panel') );
	
	// Fix Activity Panel if device width is wide enough (but don't fix in OEscape)
	if( ! $('#oescape-layout').length ){
		checkBrowserSize();
		
		$( window ).resize(function() {
			checkBrowserSize();
		});
		
		function checkBrowserSize(){	
	  		if( $( window ).width() > 1800){ // min width for fixing Activity Panel (allows some resizing)
				activity.fixed( true );
			} else {
				activity.fixed( false );
			}
		}  
	}
	
	// Patient Banner
	idg.patientPopups.init();
	
	// Collapse Groups: e.g. Management Summaries in Popup and Edit Element groups in sidebar
	idg.collapseGroups();
	
	// lightening viewer
	idg.lighteningViewer();
	
	// Tooltips on info icons
	idg.tooltips();
	
	// full overlay popup content (Eyedraw App, Add New Event)
	idg.overlayPopup( 	'.js-demo-open-eyedraw-app',  	// 2x + icons in Examination Edit
						'eyedraw-edit-app.php', 		// Demo content
						'#js-demo-eyedraw-app-close' );	// Eyedraw App uses the 'canel' button to close
						
	// Add New Event in SEM view mode
	idg.overlayPopup(	'#js-add-new-event',			// SEM header button
						'add-new-event.php',			// PHP
						'.close-icon-btn',				// wraps remove icon
						fakeAddNewEvent );				// callBack				
	
	// IDG demo some interaction
	function fakeAddNewEvent( $overlay ){
		// fake the links on Events
		 $overlay.find('.step-3').click(function(){
			  window.location = $(this).data('url');
		 });
	}
	
	// Exam Edit Right Left Search popup demo
	idg.examElementSearchPopup();
	
	// SEM View sidebar: Quicklook and QuickView
	idg.sidebarQuickInfo();
	
	// Comments
	idg.comments();
	
	// Add Search and Autocomplete
	idg.elementAddSearchType();
	
										
};


/*
Clinic JS

The logic for the pathway steps is:
Green 	- done 
Orange 	- in progress/active
Grey 	- to do
*/

var clinic = clinic || {};

/**
The main function of JS is to provide
ways to filter the clinic list view
and to add new steps to a patient pathway.
@para data - Object containing setup info: { id:[ patients Array ] }
**/
clinic.init = function( data ){
		
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
		var pos = clinic.getPosition( $(this) );			// position 
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
	this.quicklook();
}
/** 
Inital setup for Active steps
and also setups the info popup	
**/
clinic.setupActiveInfo = function(){

	/**
  	Events
  	**/
	$('#js-active-step-info .close-icon-btn').click(function( e ){
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
}
/**
popup containing all options for adding pathways
This is pre-built and 'hidden' in the DOM 
**/
clinic.setupAddPathway = function(){
	/**
	Events
	**/
	$('#js-add-new-pathway .close-icon-btn').click(function( e ){
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
			$('#js-add-new-pathway .oec-new-pathway-steps').hide();
			// show dilate options
			$('#add-dilate-options').removeClass('hidden').show();
			
			$('#js-pathway-events-title span').hide();
			$('#js-pathway-back').show();
		},
		
		back:function(){
			// reverse showDilateOptions
			$('#js-add-new-pathway .oec-new-pathway-steps').show();
			$('#add-dilate-options').hide();
			$('#js-pathway-events-title span').show();
			$('#js-pathway-back').hide();
		},
		
		reset:function(){
			$('#add-dilate-options .option-list input').prop('checked',false);
			$('#add-dilate-options').hide();
			$('#js-add-new-pathway .oec-new-pathway-steps').show();
			$('#js-pathway-events-title span').show();
			$('#js-pathway-back').hide();
		}, 
		
		hide:function(){
			this.reset();
			$('#js-add-new-pathway').hide();
		}
	};	
}
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
/**
users adds/removes assignment to doctor	
**/
clinic.changeAssignment = function( prevAssign, newAssign, patientID ){
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
}
/**
Create a default data obj for a pathway step
@return step data obj
**/
clinic.createDefaultData = function( css ){
	return { 	eye:'Both',
				n:'Not Set',
				t:'Currently no data is being generated for this step',
				state:clinic.setState( css ) };
}
/**
Create new next-step
@return - Returns new next-step
**/
clinic.createNewStep = function( $step, dataObj, active ){
	
	if(typeof active === "undefined") active = false;
	
	var data = $.extend( {}, dataObj );
	var $new = $step.clone();
	$new.removeClass('next-step-add');
	clinic.makeDefaultStep( $new );
	$new.data( 'data',data );
	
	if(active){
		clinic.makeStepActive( $new );
	} 
	
	return $new;
}
/**
Create a pathway step
@return - new $obj
**/
clinic.createPathwayStep = function( name ){
	var $span = $("<span>", {"class": "pathway-step"});
	$span.text(name);
	$span.append('<span class="time"></span>');
	return $span;
}
/**
All, Doctors, Unassigned, DNA and Tasks
allows the user to filter the patient list	
**/
clinic.filterList = function( $filter ){
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
}
/**
Find top and left position of obj
@return pos obj
**/
clinic.getPosition = function( $obj ){
	var pos = $obj.position();
	var clinic = $('.oe-clinic-list').position(); // table
	// adjust for scroll position:
	pos.top = pos.top - clinic.top;
	return pos;
}
/** 
what is the last step state in pathway?
if green then new step = active
**/	
clinic.isNewStepActive = function(){
	var last = $('#patient-'+clinic.activePathwayID+' .pathway-step' ).last();
	if( last.hasClass('green') ){
		return true;
	} else {
		return false;
	}
}
/** 
make default ('next-step') step
**/
clinic.makeDefaultStep = function( $step ){
	$step.addClass( 'next-step' );
	$step.click(function( e ){
		e.stopPropagation();
		var pos = clinic.getPosition( $(this) );
		clinic.activeInfo.show( pos.left, pos.top, $(this) );
	});
}
/** 
Complete a step (green)	
**/
clinic.makeStepActive = function( $step ){
	$step.data('data').state = 'active';
	$step
		.removeClass('next-step')
		.addClass('orange');
	
		
	clinic.updateTasks();
}
/** 
Complete a step (green)	
**/
clinic.makeStepComplete = function( $step ){
	$step.data('data').state = 'complete';
	$step
		.removeClass('orange')
		.addClass('green');	
	
	$step.children('.time').text('10:35');
	
	clinic.updateTasks();
}
/**
quicklook popup
**/
clinic.quicklook = function(){
	var $popup = $('#patient-clinic-quicklook');

	/**
	Events	
	**/
	// quicklook and warning triangle are wrapped
	// unclick to close
	$('.js-clinic-quicklook').click(function( e ){
		e.stopPropagation();
		var pos = clinic.getPosition( $(this) );
		showQuicklook( $(this), pos.top );
	});
	
	$popup.click(function( e ){
		e.stopPropagation();
		hideQuicklook();
	});
	
	function showQuicklook( $wrapper, top ){
		offsetTop = top + 30;
		$popup.find('.patient-details .name').text( $wrapper.data('name') );
		$popup.find('.patient-details .number').text( $wrapper.data('id') );
		
		// show alert?
		if( $wrapper.find('.triangle').length ){
			$popup.find('.alert-box').show();
		} else {
			$popup.find('.alert-box').hide();
		}
		
		$popup
			.removeClass('hidden')
			.css( {'top':offsetTop} )
			.show();
	}
	
	function hideQuicklook(){
		$popup.hide();
	}
	
}
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
/**
Set state based on CSS classes	
@return string
**/
clinic.setState = function( css ){
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
}
/**
setup assignment dropdowns	
**/
clinic.setupAssignments = function(){
	
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
}
/** 
UI setup DEMO (based on DOM elements)
**/
clinic.setupDemoUI = function(){
	
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
	
	/**
	Flag some Risks / Allergies	
	**/
	var tr = $( '#patient-'+1008002 );
	tr.find('.js-clinic-quicklook').append('<i class="oe-i triangle active inline small">');
	var tr = $( '#patient-'+ 1897143 );
	tr.find('.js-clinic-quicklook').append('<i class="oe-i triangle active inline small">');
	
}
/**
set up ALL filter buttons, use init data
**/
clinic.setupFilters = function(){
	
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
}
/** 
show 'current' time in clinic patient list
faked for demo purposes
**/
clinic.showCurrentTime = function(){
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
}
/** 
Step completed (PIN entered correctly)	
**/
clinic.stepComplete = function( $step ){
	clinic.makeStepComplete( $step );
	
	// next sibling?
	var $next = $step.next();
	if( $next.length && $next.hasClass('next-step') ){
		clinic.makeStepActive( $next );
	}
}
/**
update Tasks filter
Check all rows and updated filter
**/
clinic.updateTasks = function( ){
	// tbody id
	// tr data state can be complete, active, dna or inactive
	// only interested in active
	$('#js-clinic-list-patients tr').each(function(){
		var state = $(this).data('state');
		if( state == 'active'){
			
			var id = parseInt( $(this).data('id') );
			var index = clinic.data['tasks'].indexOf( id );
			var taskSteps = $('.pathway-step.orange', this);
			
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
}
/**
OEscape 
**/
var oes = {
	
	init:function(){
		// exit oescape and go back to previous page
		$('#js-exit-oescape').click( function(){
			window.location = document.referrer; // exit and return to previous page
		});
	}
}
/**
Image Stack animations in OEscape	
pass in ID string for container and sting ID prefix for images
returns method to directly update the stack and sets up the Events

@method initStack
@param 'container' (String) 	- id for container DOM 
@param 'img_id' (String) 		- id prefix for <img>, assumes numbering 1 to n
@param 'callBack' (function)  	- callback optional
@return {object} with method to setImg()	
**/
oes.initStack = function(container,img_id_prefix,callBack){
	var container = $(container);
	var imgID = 1; 					// default image set in PHP, the rest are 'hidden'
	var imgTotal = container.children().length;
	
	// Mouse & Touch image stack animation
	$( container ).bind( "mousemove touchmove", function( e ) {
		e.stopPropagation();
		
		var offset = $(this).offset();		// these will update everytime browser is resized
		var xPos = e.pageX - offset.left;
		var w = $(this).width();			
		var num = Math.ceil( xPos / ( w / imgTotal ) );
		
		if(num === 0 || num > imgTotal) return; // out of range
		
		updateImageStack(num); 
			
		if(typeof callBack === "function") callBack(num);			
	});
	
	// update images
	function updateImageStack(n){
		$( img_id_prefix + imgID ).hide();
		$( img_id_prefix + n ).removeClass('hidden').show();
		imgID = n;
	}
	
	// provide access to update Image directly, e.g. from highCharts
	return {
		setImg:function(imgID){
			updateImageStack(imgID);
			imgID = imgID;
		}
	};
}
/**
Tab buttons control what is shown on the right handside

@param tabBtnInfo (Array) - Array of Objects: {btn:'btn_id',area:'area_id'}
@param 'callBack' (function)  	- callback optional
**/
oes.setupAreaTabButtons = function( tabBtnInfo, callBack ){
	
	for( var i=0; i<tabBtnInfo.length; i++ ){
		
		var btn = tabBtnInfo[i].btn = $(tabBtnInfo[i].btn);  // turn into jQuery
		var area = tabBtnInfo[i].content = $(tabBtnInfo[i].content);	
		var tab = new TabContent( btn,area,i );

	}
	
	// assuming first button is default
	tabBtnInfo[0].btn.addClass('selected');
	
	function TabContent( btn, content, i){
		var btn = btn;
		var content = content;
		var i = i;
		
		btn.click( function( e ){
			e.stopPropagation();
			resetStacks();
			$(this).addClass('selected');
			content.removeClass('hidden').show();
			
			if(typeof callBack === "function") callBack(i);
		});		
	}

	function resetStacks(){
		for(var i=0; i<tabBtnInfo.length; i++){
			tabBtnInfo[i].btn.removeClass('selected');
			tabBtnInfo[i].content.hide();
		}
	}
	
}
/**
OEscape offers 4 resize states for the left hand chart area	
@param 'callBack' (function)  	- callback optional
**/
oes.setupResizeButtons = function( callBack ){
	
	var left = $('.oes-left-side'),
		right = $('.oes-right-side'),
		size;
	
	// setup resize buttons
	// buttons have data-area attribute: small, medium, large and full
	$('.js-oes-area-resize').click(function( e ){
		e.stopPropagation();
		
		var str = $(this).data('area');
		switch(str){
			case 'small': 	size = 500;
			break;
			case 'medium': 	size = 700;
			break;
			case 'large': 	size = 900;
			break;
			case 'full': 	size = null;  // null, when passed to highcharts makes chart fill container
			break;
		}
		
		// fullsize requires some tweaking
		if(size == null){
			left.css({"min-width":"500px", "width":"100%"});
			right.hide();
		} else {
			left.css({"min-width": size + "px", "width":""});
			right.show();	
		}
		
		if(typeof callBack === "function" ) callBack(size);	
	});
}
/*
Lightening Letter Viewer
Icon in the Patient banner area links to the 
Letter Viewer page for the patint
*/
idg.lighteningViewer = function(){
	
	// if on the letter viewing page  
	// set icon to active 
	if(window.location.pathname == '/v3.0/lightening-letter-viewer'){
		$('#js-lightening-viewer-btn').addClass('active');
		return;	
	};
	
	// Events
	$('#js-lightening-viewer-btn').click(function( e ){
		e.stopPropagation();
		window.location = '/v3.0/lightening-letter-viewer';
	})
	.mouseenter(function(){
		$(this).addClass( 'active' ); 
	})
	.mouseleave(function(){
		$(this).removeClass( 'active' ); 
	});	
}
/**
All Patient Popups 
Manage them to avoid any overlapping	
**/
idg.patientPopups = {
	
	init:function(){
		
		if( $('#oe-patient-details').length == 0 ) return;
		
		// patient popups
		var quicklook 		= new idg.NavBtnPopup( 'quicklook', $('#js-quicklook-btn'), $('#patient-summary-quicklook') );
		var demographics 	= new idg.NavBtnPopup( 'demographics', $('#js-demographics-btn'), $('#patient-popup-demographics') );
		var risks 			= new idg.NavBtnPopup( 'risks', $('#js-allergies-risks-btn'), $('#patient-popup-allergies-risks') );
		var tasks 			= new idg.NavBtnPopup( 'tasks', $('#js-tasks-btn'), $('#patient-popup-tasks') );
		
		var all = [ quicklook, demographics, risks, tasks ];
		
		for( pBtns in all ) {
			all[pBtns].inGroup( this ); // register group with PopupBtn 
		}
		
		this.popupBtns = all;
		
		/**
		Problems and Plans
		These are currently in quicklook popup
		**/
		if( $('#problems-plans-sortable').length ){
			idg.problemsPlans();
		}
	},

	closeAll:function(){
		for( pBtns in this.popupBtns ){
			this.popupBtns[pBtns].hide();  // close all patient popups
		}
	}

}

/*
Problems &  Plans sortable list 
In patient quicklook 
- requires Sortable.js
*/
idg.problemsPlans = function(){
	// make Problems & Plans Sortable:
	var el = document.getElementById( 'problems-plans-sortable' );
	var sortable = Sortable.create( el );
		
	// Add New Plan / Problem	
	$('#js-add-pp-btn').click(function(){
		var input = $('#create-problem-plan');
		var val = input.val();
		if( val === '') return;				
		var html = '<li><span class="drag-handle">&#9776;</span>'+ val +'<div class="remove">&times;</div></li>';
		$('#problems-plans-sortable').append( html );
		input.val(''); // refresh input
	}); 

	// remove a Problem Plan
	$('#problems-plans-sortable .remove').click(function(){ 
  		$(this).parent().remove(); 
  	});
}
/*
SEM Element - Add or Search
Popup to add selected list to element
(optional - autocomplete field)
No functionality, demoing basic UI & UX
*/
idg.elementAddSearchType = function(){
		
		$('.js-add-select-type').each(function(){
			var addBtn = new AddSearchType( 	$(this),
												$(this).parent().children('.oe-add-select-type') );
		});
	
		function AddSearchType( $btn, $popup ){
			
			$popup.removeClass('hidden').hide();
			
	  		var auto = $popup.find('.type-search-autocomplete'),
	  			results = $popup.find('.type-search-results'),
	  			cancelBtn = $popup.find('.oe-add-select-type-cancel');

			$btn.click( function( e ){
				e.stopPropagation();
				open();
			});
			
			function open(){
				$popup.show();
				results.hide(); // hide autocomplete results until keypress
		  		
		  		// fake input ajax search
		  		auto.keypress(function() {
			  		if(auto.val() === 'au'){
				  		results.show(); // show fake autocomplete results
			  		}
				});
			}

			// faking interaction of selecting an item, does nothing.
	  		$popup.find('.oe-ast-options > li').click(function(){
		  		close(); 
	  		});
	  		
	  		// remove icon
	  		cancelBtn.click(function(){
		  		close();
	  		});
			
			// Close and reset
	  		function close(){
		  		results.hide();
		  		auto.val('');
		  		$popup.hide();
	  		}
			
		}
}
/*
Right Left Element searching in Examination Edit mode
All content in popup is static and the inputs only 
show the popup behaviour
*/
idg.examElementSearchPopup = function(){
	var el = document.getElementById('elements-search-results');
	if(el === null) return; 
	
	// inputs
	$('#js-element-search-right').focus(function(){
		showPopup();
	}).focusout(function(){
		$(this).val('');
	});
	
	$('#js-element-search-left').focus(function(){
		showPopup();
	}).focusout(function(){
		$(this).val('');
	});

	
	// popup
	function showPopup(){
		$('#elements-search-results').show();
	
		$('.lvl1').click(function(){
			$('#elements-search-results').hide();
		})
		$('.close-icon-btn').click(function(){
			$('#elements-search-results').hide();
		});
	}		
}
/*
Sidebar Events Quicklook & Quickview
- Quicklook: Event Title and Message
- Quickview: Popup with event Screenshot
*/
idg.sidebarQuickInfo = function(){
	
	if( $('.events').length == 0 ) return;
	
	$('.events .event').each(function(){	
		var quicklook = new Quicklook( $('.event-type', this),
									   $('.quicklook', this) );
	});
	
	function Quicklook( $icon, $quicklook ){
		
		$icon.hover(function(){
			$quicklook.removeClass('hidden').show();
			showQuickView( $(this).data('id'), $(this).data('date') );
		},function(){
			$quicklook.hide();
			hideQuickView();
		});
	}
	
	/**
	Demo the Quick View for Events
	Shows a scaled screen-shot of the event page
	**/
	
	// hide all QuickView screen shots
	$("[id^=quickview]").hide();

	var prevID = null;
	var $quickView = $('#js-event-quickview'); 
	
	function showQuickView( id, date ){
		$quickView.stop().fadeIn(50);
		$('#quickview-'+prevID).hide();
		$('#quickview-'+id).show();
		$('#js-quickview-date').text( date );
		prevID = id;
	}
	
	function hideQuickView(){
		$quickView.stop().fadeOut(150);	// Using fadeOut to stop a flicking effect
	}

}
/**
Create 'buttons' for nav menus, 3 different flavours: standard, wrapped and fixed
- standard: $btn open/closes the popup $content (seperate DOM element). MouseEnter/Leave provides increased functionality for non-touch users
- wrapped: 'btn' & popup $content wrapped by shared DOM (shortcuts menu), wrapper is used for the eventObj
- fixed: When the browser width is wide enough CSS fixes open the Activity Panel 
@ $btn - structurally as <a> but without CSS pseudos :hover, :focus, :active
@ $content - DOM content to show on click 
@ wrap - shortcuts has a DOM wrapper, this displays on hover.
**/
idg.NavBtnPopup = function(id,$btn,$content){
		
	// private
	var id = id,
		eventObj = $btn,
		useMouseEvents = false,
		isGrouped = false, 		// e.g. patient popups 
		groupController = null,
		isFixed = false,
		css = { 
			active:'active', 	// hover
			open:'open' 		// clicked 
		};	
		
	/**
	public methods
	**/
	this.hide = hide;	
	this.useWrapper = useWrapperEvents;
	this.fixed = fixed;
	this.inGroup = inGroup;
	
		
	init(); // all are initiated but useWrapperEvents modifies the eventObj then re-initiates
		
	/**
	provide a way for shortcuts to re-assign
	the Events to the DOM wrapper
	**/
	function init(){
		// Events
		eventObj.click(function( e ){
			e.stopPropagation();
			// use $btn class as boolean
			changeContent( $btn.hasClass( css.open ) );
		})
		.mouseenter(function(){
			$btn.addClass( css.active ); 
			if( useMouseEvents ) show();
		})
		.mouseleave(function(){
			$btn.removeClass( css.active ); 
			if( useMouseEvents ) hide();
		});
	}

	function changeContent( isOpen ){
		if(isFixed) return; // if popup is fixed
			
		if( isOpen ){
			hide();
		} else {
			if(isGrouped) groupController.closeAll(); 
			show();
		}
	}
	
	function show(){
		$btn.addClass( css.open );
		$content.show();
		if( ! useMouseEvents &&  ! isFixed  ) addContentEvents();
	}
	
	function hide(){
		$btn.removeClass( css.open );
		$content.hide();
	}	
	
	/**
	Enhance $content behaviour for non-touch users
	Allow mouseLeave to close $content popup
	**/
	function addContentEvents(){
  		$content.mouseenter(function(){
	  		$(this).off( 'mouseenter' ); // clean up
			$(this).mouseleave(function(){
				$(this).off( 'mouseleave' ); // clean up
				hide();
			});
		});
	}

	/**
	DOM structure for the Shortcuts dropdown list is different
	Need to shift the events to the wrapper DOM rather than the $btn	
	**/
	function useWrapperEvents( DOMwrapper ){
		eventObj.off( 'click mouseenter mouseleave' );
		eventObj = DOMwrapper;
		css.open = css.active; // wrap only has 1 class
		useMouseEvents = true;
		init(); // re initiate with new eventObj
	}
	
	/**
	Activity Panel needs to be fixable when the browsers is wide enough
	(but not in oescape mode)	
	**/
	function fixed( b ){
		isFixed = b;
		if( b ){
			$content.off( 'mouseenter mouseleave' );  		
			show();
		} else {
			hide(); 
		}
	}
	
	/**
	Group popups to stop overlapping	
	**/
	function inGroup( controller ){
		isGrouped = true;
		groupController = controller;
	}	
}



/**
Collapse Group
Uses the DOM and CSS hooks
**/
idg.collapseGroups = function(){
	// find and set up all collapse-groups
	$('.collapse-group').each(function(){
		var group = new CollapseGroup( 	$(this).find( '.collapse-group-icon .oe-i' ), 
										$(this).find( '.collapse-group-header' ), 
										$(this).find( '.collapse-group-content' ),
										$(this).data('collapse') );
	});
	
	function CollapseGroup( icon, header, content, initialState ){
		var $icon = icon, 
			$header = header, 
			$content = content,
			expanded = initialState == 'expanded' ? true : false;
			
		$icon.click(function(){
			change();
		});	
	
		$header.click(function(){
			change();
		});	
		
		function change(){
			if(expanded){
				$content.hide();
			} else {
				$content.removeClass('hidden').show();
			}
			
			$icon.toggleClass('minus plus');
			expanded = !expanded;
		}	
	}	
}
/**
Comments
**/
idg.comments = function(){
	/**
	Comments icon is clicked on to reveal 
	commets input field. Either:
	1) Textarea switches places with icon button
	2) Textarea is shown in different DOM placement  
	**/
	$('.js-add-comments').click(function( e ){
		e.stopPropagation();
		$(this).hide();
		
		var textAreaID = $(this).data('input');
		if(textAreaID == 'next'){
			$(this).next().removeClass('hidden').focus();
		} else {
			$(textAreaID).removeClass('hidden').focus();
		}
	});
}
/**
Load content as Overlay
- Eyedraw App
- Add New Event	
@param {btn} - ID or Class of btn 
@param {phpToLoad} - PHP file name 
@param {closeBtnID} - ID of close button in overlay content
@param {callBack} - Optional Callback
**/
idg.overlayPopup = function( btn, phpToLoad, closeBtnID, callBack ){
	
	// check DOM exists
	if( $(btn).length ){
		
		$(btn).click(function( e ){
			e.stopPropagation();
			loadOverlay();
		});
	}
	  	
	/**
	Create full screen cover using 'oe-popup-wrap'
	CSS handles the positioning of the loaded DOM
	**/  	
	function loadOverlay(){
		var $overlay = $('<div>');
  		$overlay.addClass('oe-popup-wrap');
  		$overlay.load('/php/v3.0/_load/' + phpToLoad,function(){
	  		closeOverlayBtn( $(closeBtnID, this ), $(this) );
	  		if(callBack) callBack( $overlay );
  		});
  		
  		$('body').prepend($overlay);
	}
	
	/**
	Set up a close button	
	**/
	function closeOverlayBtn( $closeBtn, $overlay ){
		$closeBtn.click(function(){
		  	$overlay.remove();
	  	});
	}
	
}
/*
Basic tooltip functionality. Quick for IDG demo
*/
idg.tooltips = function(){
	$('.js-has-tooltip').hover(
		function(){
			var text = $(this).data('tooltip-content');
			var offset = $(this).offset();
			var html = '<div class="oe-tooltip" style="position:fixed; left:'+(offset.left + 20)+'px; top:'+(offset.top + - 10)+'px;">'+ text +'</div>';
			$(this).data( "tooltip", html );
			$('body').append(html);
		},
		function(){
			$('body').find( ".oe-tooltip" ).remove();
		}
	);	
}