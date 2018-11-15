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
	var shortcuts 	= new idg.NavBtnPopup( 'shortcuts', $('#js-nav-shortcuts-btn'), $('#js-nav-shortcuts-subnav') );
	var hotlist 	= new idg.NavBtnPopup( 'hotlist', $('#js-nav-hotlist-btn'), $('#js-hotlist-panel') );
	

	openeyes.basic();
	shortcuts.useWrapper( $('#js-nav-shortcuts') );
	hotlist.enhanced( $('#js-hotlist-panel-wrapper') );
	
	// Activity List popup
	idg.hotList(hotlist);

	
	// set up 'hidden' for JS 
	// hidden in the CSS is helpful in the DOM
	// but it also stops the flickering! 
	$('.hidden').removeClass('hidden').hide();

	// Patient Banner
	idg.patientPopups.init();
	
	// Collapse Groups: e.g. Management Summaries in Popup and Edit Element groups in sidebar
	idg.collapseGroups();
	
	// lightning viewer
	// idg.lightningViewer();  // now a regular link
 	
	// Tooltips on info icons
	idg.tooltips();
	
	// full overlay popup content 
	// Eyedraw App
	idg.overlayPopup( 	'.js-demo-open-eyedraw-app',  	// 2x + icons in Examination Edit
						'eyedraw-edit-app.php', 		// Demo content
						'#js-demo-eyedraw-app-close' );	// Eyedraw App X icon
						
	// Eyedraw App
	idg.overlayPopup( 	'.js-demo-open-eyedraw-app-v2',  	// 2x + icons in V2 demo
						'eyedraw-edit-app-v2.php', 			// Demo content
						'#js-demo-eyedraw-app-close' );	// Eyedraw App X icon					
						
	// Eyedraw App for Cataract in OpNote
	idg.overlayPopup( 	'.js-demo-open-cataract',  	// 2x + icons in Examination Edit
						'ed-opnote-cataract.php', 		// Demo content
						'#js-demo-eyedraw-app-close' );	// Eyedraw App uses the 'canel' button to close				
						
	
	// change context (firm)					
	idg.overlayPopup( 	'#js-change-context-btn',  		// "change" text in header
						'change-context.php', 			// Demo content
						'.close-icon-btn' );			// wraps remove icon
						
	// duplicate history element					
	idg.overlayPopup( 	'#copy-edit-history-btn',  			// "Duplicate" Event icon  (Exam Edit: History )
						'previous-history-elements.php', 	// Demo content
						'.close-icon-btn' );				// wraps remove icon
						
						
	// duplicate history element					
	idg.overlayPopup( 	'#copy-edit-anterior-segment-btn',  // "Duplicate" Event icon  (Exam Edit: ED Anterior Segment example )
						'previous-ed-anterior.php', 		// Demo content
						'.close-icon-btn' );				// wraps remove icon					
						
						
	// virtual clinic change:					
	idg.overlayPopup( 	'#js-virtual-clinic-btn',  			// "Duplicate" Event icon  (Exam Edit: Virtual Clinic change )
						'virtual-clinic.php', 			// Demo content
						'.close-icon-btn' );				// wraps remove icon					
						
						
	// Delete Event generic example:					
	idg.overlayPopup( 	'#js-delete-event-btn',  			// 
						'delete-event.php', 				// Demo content
						'.cancel-icon-btn' );		// no close btn! must cancel				
						
						
	// Add New Event in SEM view mode
	idg.overlayPopup(	'#js-add-new-event',			// SEM header button
						'add-new-event.php',			// PHP
						'.close-icon-btn',				// wraps remove icon
						fakeAddNewEvent );				// callBack	
						
						
	// duplicate history element					
	idg.overlayPopup( 	'#js-idg-preview-correspondence',  	// "Preview Letter" in Correspondence EDIT
						'letter-preview.php', 				// Demo content
						'.close-icon-btn' );				// wraps remove icon					
									
	
	// IDG demo some interaction
	function fakeAddNewEvent( $overlay ){
		// fake the links on Events
		 $overlay.find('.step-3').click(function(){
			  window.location = $(this).data('url');
		 });
	}
	
	// Exam Edit Right Left Search popup demo
	idg.examElementSearchPopup();
	
	// Expand Collapse View lists
	idg.expandElementList();
	
	// SEM sidebar 
	idg.sidebar();
	
	// SEM View sidebar: Quicklook and QuickView
	idg.sidebarQuickInfo();
	
	// tile data overflow
	idg.tileDataOverflow();
	
	// tile collapsable
	idg.collapseTiles();
	
	// Comments
	idg.comments();
	
	// Add Search and Autocomplete
	idg.elementAddSelectSearch();
	
	// Toggle Radio Buttons R / L
	idg.toggleRadio();
	
	// OEscape exit button
	oes.oescapeExit();
	
	// Homepage Message Expand Contract	
	idg.homeMessageExpand();
	
	// audit trail popup
	idg.auditTrail();
	
	// VC Draggable
	idg.vcDraggable();
	
	// Worklist filter 
	idg.WorkListFilter();
	
	// SEM Event Filter Actions 
	idg.eventFilterActions();
	
	// SEM Correspondence Scroller 
	idg.correspondencePageScroll();
	
	// OE Filter Options (analytics)
	idg.filterOptions();
	
	// Element subgroups
	idg.elementSubgroup();
	
	// Patient Mini Overview
	idg.patientMiniOverview();
	
	// Notification (user/admin)
	idg.notificationBanner();
	
										
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
Homepage Message expand / contract 	
**/
idg.homeMessageExpand = function(){
	
	if( $('.home-messages').length == 0 ) return;
	
	$('.js-expand-message').each(function(){
		
		var message = $(this).parent().parent().find('.message');
		var expander = new Expander( $(this),
									 message );
	});
	
	function Expander( $icon, $message){
		var expanded = false; 
		
		$icon.click( change );
		
		function change(){
			
			$icon.toggleClass('expand collapse');
			
			if(expanded){
				$message.removeClass('expand');
			} else {
				$message.addClass('expand');
			}
			
			expanded = !expanded;
		}
	}
}

/**
OEscape 
**/
var oes = {
	
	init:function(){
		// exit oescape and go back to last viewed (non-oes) page
		$('#js-exit-oescape').click( function(){
			window.location = localStorage.getItem("lastPage");
		});
	},
	
	
	/*
	keep track of the last non-oescape page
	so that you can exit oescape mode and 
	return to last page	
	*/
	oescapeExit:function(){
		var href = window.location.href;
		if(href.includes("oescape") == false ){
			localStorage.setItem( "lastPage",href ); 
		}
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
idg.lightningViewer = function(){
	
	// if on the letter viewing page  
	// set icon to active 
	if(window.location.pathname == '/v3.0/lightning-letter-viewer'){
		$('#js-lightning-viewer-btn').addClass('active');
		return;	
	};
	
	// Events
	$('#js-lightning-viewer-btn').click(function( e ){
		e.stopPropagation();
		window.location = '/v3.0/lightning-letter-viewer';
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
		var quicklook 		= new idg.PatientBtnPopup( 'quicklook', $('#js-quicklook-btn'), $('#patient-summary-quicklook') );
		var demographics 	= new idg.PatientBtnPopup( 'demographics', $('#js-demographics-btn'), $('#patient-popup-demographics') );
		var demographics2 	= new idg.PatientBtnPopup( 'management', $('#js-management-btn'), $('#patient-popup-management') );
		var risks 			= new idg.PatientBtnPopup( 'risks', $('#js-allergies-risks-btn'), $('#patient-popup-allergies-risks') );
	
	
		var all = [ quicklook, demographics, demographics2, risks ];
		
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
		var html = '<li><span class="drag-handle">&#9776;</span>'+ val +'<div class="remove"><i class="oe-i remove-circle small pro-theme pad"></i></div></li>';
		$('#problems-plans-sortable').append( html );
		input.val(''); // refresh input
	}); 

	// remove a Problem Plan
	$('#problems-plans-sortable .remove').click(function(){ 
  		$(this).parent().remove(); 
  	});
}
/*
Tile Element - watch for data overflow
*/
idg.auditTrail = function(){
	
	if( $('#js-event-audit-trail-btn').length == 0 ) return;
		
	var show = false	
		
	// loop through the view tiles and check the data height
	$('#js-event-audit-trail-btn').click(function(){
		$('#js-event-audit-trail').toggle();
		$(this).toggleClass('active');
	});
	
}
/*
Correspondence Scrolling
*/
idg.correspondencePageScroll = function(){
	
	/*
	first check UI is available
	using demo ID here 
	*/
	var pageScroller = document.getElementById('js-idg-correspondence-scroll-demo');
	if(pageScroller == null) return;
	
	/*
	loop through and create page buttons
	e.g. <div class="page-num-btn">1/4</div>
	*/
	var numOfPages = $("#js-correspondence-page-images > img").length;
	
	for(var i=0;i<numOfPages;i++){
		$( "<div></div>", {
			text: (i+1)+"/"+numOfPages,
			"class": "page-num-btn",
			"data-page": i,
			mouseenter: function( e ) {
				animateScrolling( $(this).data('page') );
			},
			click: function( event ) {
				animateScrolling( $(this).data('page') );
			}
		}).appendTo( "#js-correspondence-page-nav" );
	}
	
	/*
	CSS settings:
	$pageHeight: 	842px;
	$pageSpacing:	10px; (bottom)
	*/
	var pageY = 852;
	var pages = $("#js-correspondence-page-images");
	
	function animateScrolling( page ){
		var scroll = pageY * page;	
		pages.animate({scrollTop: scroll+'px'},200,'swing');
	}
	
}

/*
SEM Element - Add or Search
Popup to add selected list to element
(optional - autocomplete field)
No functionality, demoing basic UI & UX
*/
idg.elementAddSelectSearch = function(){
	
	var all = [];
	
	$('.js-add-select-search').each(function(){
		var addBtn = new AddSelectSearch( 	$(this),
											$(this).parent().children('.oe-add-select-search') );
		all.push(addBtn);																
	});
	
	function closeAll(){
		for(var i=0; i < all.length; i++){
			all[i].closePopup();
		}
	}

	function AddSelectSearch( $btn, $popup ){
		
  		var select 		= $popup.find('.select-options'),
  			closeBtn 	= $popup.find('.close-icon-btn'),
  			addBtn 		= $popup.find('.add-icon-btn');
  			
  			
  		var resetPopupData = true;
  		
  		// but for these popups remember the data added:
  		switch( $popup.prop('id') ){
	  		case "add-to-history":
	  		case "add-to-risks":
	  		case "add-to-follow-up":
	  		resetPopupData = false;
	  		break;
  		}
  			
  		/*
	  	All lists
	  	store the list objects and then 
	  	iterate over them to build the inputs
	  	*/	
  		var lists = [];

  		/*
	  	pubilc methods
  		used to close all popups
  		*/
  		this.closePopup = closeCancel;
  		this.openPopup = openAdd; // need this to demo all pop UIs

  		/*
	  	Events	
	  	*/
  		closeBtn.click(function(e){
	  		e.stopPropagation();
	  		closeCancel();
  		});
  		
  		
			
			
		// setup based on the DOM
		if(addBtn.length){
	  		addBtn.click(function(e){
	  			e.stopPropagation();
	  			closeAdd();
	  			
  			});
  		}
  		
  		
  	
  		
  		// list have 2 states multi or single 
  		$('.add-options',$popup).each( function(){
	  		var multi = $(this).data('multi');
	  		
	  		lists.push( new OptionsList( $(this), 
	  									 $(this).data('multi'),
	  									 $(this).data('clickadd') ) );
  		});
  		
  		
		function OptionsList( $ul, multi, clickAdd ){
			var multi = multi;
			var clickAdd = clickAdd; 
			var $active = null; // if only single entry 
			var selectedData = [];
			
			
			if(multi){
				$('li', $ul).click(function(e){
		  			e.stopPropagation();
		  			$(this).toggleClass('selected'); 
		  			if($(this).hasClass('selected')){
			  			addData($(this).data('str'));
		  			} else {
			  			removeData($(this).data('str'));
		  			}
	  			});
			} else {
				$('li', $ul).click(function(e){
		  			e.stopPropagation();
		  			updateListOptions( $(this) );
		  			if(clickAdd) closeAdd();
	  			});
			}
	
			function updateListOptions( $new ){
				if($active != null) {
					$active.removeClass('selected');
					removeData( $active.data('str') );
				}
				$new.addClass('selected');
				addData( $new.data('str') );
				$active = $new;
			}
			
			function addData(data){
				selectedData.push(data);
			}
			
			function removeData(data){
				var index = selectedData.indexOf(data);   
				if (index !== -1) {
				    selectedData.splice(index, 1);
				}
			}
			
			/*
			Public methods	
			*/
			this.getData = function ( join ){
				return selectedData.join(join);
			}
			
			this.clearData = function(){
				selectedData = [];
			}
		}  		

  		
/*
  		// top element popup will disappear behind header, so adjust it's position:
  		if($btn.offset().top < 250 && $btn.offset().top){
	  		var vOffset = $btn.offset().top - 310;
	  		$popup.css({bottom:vOffset});
	  	}
  		
*/

		$btn.click( function( e , demoAll = false ){
			e.stopPropagation();
			openAdd(!demoAll);
		});
		
		
		function positionFixedPopup( $btn ){
			/* 
			Popup is FIXED positioned
			work out offset position 
			setup events to close it on resize or scroll.
			*/
			
			var elem = $btn[ 0 ];
			
			// js vanilla:
			var btnPos = elem.getBoundingClientRect();		
			var w = document.documentElement.clientWidth;
			var h = document.documentElement.clientHeight;
			
			// check popup doesn't go off the top of the screen 
			var posH = (h - btnPos.bottom);
			if(h - posH < 240){
				posH = h - 245;
			}
			
			// close to the left?
			if( btnPos.left < 310 ){
				// set CSS Fixed position
				$popup.css(	{	"bottom": posH,
								"right": "auto",
								"left": (btnPos.left) });
			} else {
				// set CSS Fixed position
				$popup.css(	{	"bottom": posH,
								"right": (w - btnPos.right) });
			}
			
			
	  					
			/*
			Close popup on scroll.
			note: scroll event fires on assignment.
			so check against scroll position
			*/		
			var scrollPos = $(".main-event").scrollTop();
			$(".main-event").on("scroll", function(){ 
				if( scrollPos !=  $(this).scrollTop() ){
					// Remove scroll event:	
					$(".main-event").off("scroll");
					closeCancel();
				}
					
			});
		}
		
		
		function openAdd( closeOthers=true ){
			if(closeOthers) closeAll();
			positionFixedPopup( $btn );
			$popup.show();	  				  		
		}
		

		// Close and reset
  		function closeCancel(){	  		
	  		$popup.hide();
	
	  		if(resetPopupData){
		  		$popup.find('.add-options li').removeClass('selected');
		  		for(var i = 0; i<lists.length; i++){
			  		lists[i].clearData();
			  	}
			}
	  		
  		}
  		
  		function closeAdd(){
	  			
	  		/*
		  	IDG specific elements limited functionality demos
		  	*/
	
		  	/*
			Refraction	
			*/
			if($popup.prop('id') == 'add-to-refraction'){
				
				var sphere = "", 
					cylinder = "", 
					axis = "";
					type = ""
					
				for(var i = 0; i<lists.length; i++){
			  		var data = lists[i].getData('');
			  		
			  		switch(i){
				  		case 0:
				  		case 1:
				  		case 2:
				  		sphere += data;
				  		break;
				  		
				  		case 3:
				  		case 4:
				  		case 5:
				  		cylinder += data;
				  		break;
				  		
				  		case 6: 
				  		axis = data;
				  		break;
				  		
				  		case 7:
				  		type = data;
				  		break;
			  		}
		  		}
				
				$('#js-refraction-input-sphere').val( sphere );
				$('#js-refraction-input-cylinder').val( cylinder );
				$('#js-refraction-input-axis').val( axis );
				$('#js-refraction-input-type').val( type );
			}
			
			if($popup.prop('id') == 'add-to-pupils-left'){
				$('#js-pupil-left-text').text( lists[0].getData('') );
			}
			
			if($popup.prop('id') == 'add-to-pupils-right'){
				$('#js-pupil-right-text').text( lists[0].getData('') );
			}
			
			if($popup.prop('id') == 'add-to-analytics-service'){
				$('#js-service-selected').text( lists[0].getData('') );
			}
		
		 
		  	/*
			Text inputs
			*/
		  	if($popup.prop('id') == 'add-to-history')		showInputString('history');
		  	if($popup.prop('id') == 'add-to-risks')			showInputString('risks');
		  	if($popup.prop('id') == 'add-to-follow-up')		showInputString('follow-up');
	  		
	
	  		function showInputString(id){
		  		var id = '#js-'+id+'-input-demo';
		  		var inputs = [];
		  		for(var i = 0; i<lists.length; i++){
			  		var data = lists[i].getData(', ');
			  		if(data != ""){
				  		inputs.push(data);
			  		}
		  		}
		  		
		  		$(id).val( inputs.join(', ') );
		  		autosize.update( $(id) );
	  		}
	  		
	  		
	  		/*
		  	OpNote.
		  	Procedures	
		  		
		  	*/
	  		if($popup.prop('id') == 'add-to-procedures'){
	  			// <tr> template
			  	var rowTemplate = $("#js-procedures-template");
			  	
			  	// get Procedures...	
			  	var procedures = lists[0].getData(',');
			  	var proceduresArray = procedures.split(',')	
			  		
		  		for(var i = 0; i<proceduresArray.length; i++){
			  		
			  		var newRow = rowTemplate.clone();
			  		newRow.removeAttr('style id');
			  		newRow.find('.js-procedure-name').text(proceduresArray[i]);
			  		
			  		$("#js-show-procedures").append( newRow );
			  		
			  		// hack to demo functionality of elements
			  		if(proceduresArray[i] == "Phacoemulsification and IOL"){
				  		$('.edit-phaco--iol-right').show();
				  		$('.edit-pcr-risk-right').show();
				  		
				  		newRow.find('.js-add-comments').hide();
			  		}
			  		
			  	}
	  		}
	  		
	  		
	  		// clean up!
	  		closeCancel();
  		}
  		
  		
	}
}
/*
Subgroup Collapse/expand
*/
idg.elementSubgroup = function(){
	
	if( $('.js-element-subgroup-viewstate-btn').length == 0 ) return;
	
	$('.js-element-subgroup-viewstate-btn').each( function(){
		var subgroup = new Viewstate( $(this) );
	});
	
	function Viewstate( $icon ){
		var me = this;
		var $content = $('#' + $icon.data('subgroup') );

		$icon.click( function( e ){
			e.preventDefault();
			me.changeState();
		});
		
		this.changeState = function(){
			$content.toggle();	
			$icon.toggleClass('collapse expand');
		}
		
	}

}
/*
Event Filter Actions
*/
idg.eventFilterActions = function(){
	
	if( $('#js-sidebar-filter-btn').length == 0 ) return;
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	
	@param $wrap
	@param $btn
	@param $popup	
	*/
	idg.enhancedTouch( 		$('#js-sidebar-filter'), 
							$('#js-sidebar-filter-btn'), 
							$('#js-sidebar-filter-options') );
	
}

/*
Right Left Element searching in Examination Edit mode
All content in popup is static and the inputs only 
show the popup behaviour
*/
idg.examElementSearchPopup = function(){
	var el = document.getElementById('js-search-in-event-popup');
	if(el === null) return; 
	
	
	$('#js-search-in-event').click(function(){
		showPopup();
		$(this).addClass('selected');
	})

	
	// popup
	function showPopup(){
		$('#js-search-in-event-popup').show();
	
		$('.close-icon-btn').click(function(){
			$('#js-search-in-event-popup').hide();
			$('#js-search-in-event').removeClass('selected');
			$('#js-search-event-input-right').val('');
			$('#js-search-event-results').hide();
		});
		
		$('#js-search-event-input-right').keyup(function(){
			var val = $(this).val().toLowerCase();
			
			if(val == 'alph' || $(this).val() == 'alpha'){
				$('#js-search-event-results').show();
			} else {
				$('#js-search-event-results').hide();
			}
		});
		
	}		
}
/*
Element Expand (collapse) data list
*/
idg.expandElementList = function(){
	
	// check for view elementss
	if( $('.element-data').length == 0 ) return;
	
	$('.js-listview-expand-btn').each(function(){	
		/* 
		Generally there is 1 list. But it could handle 2 (R/L Eye)	
		DOM: id= js-listview-[data-list]-full | pro
		*/
		
		var listId = $(this).data('list');
		var listId2 = $(this).data('list2'); // (optional) R / L Eye control (see PCR Risks)
		var listview = new ListView( $(this),listId,listId2);
	});
	
	function ListView( $iconBtn, listId, listId2 ){
		var proView = true;
		var list = new List(listId);
		var list2 = listId2 == undefined ? false : new List(listId2);	
		
		$iconBtn.click(function(){
			$(this).toggleClass('collapse expand');
			proView = !proView;
			changeView(proView,list);
			if(list2 != false) changeView( proView,list2);
		});
		
		function changeView(proView,list){
			if(proView){
				list.$pro.show();
				list.$full.hide();
			} else {
				list.$pro.hide();
				list.$full.show();
			}
		}
		
		function List(id){
			this.$pro = $('#js-listview-'+id+'-pro');
			this.$full = $('#js-listview-'+id+'-full');
		}
		
	}


}
/*
Sidebar
*/
idg.sidebar = function(){
	
	/*
	setup filter mechanisms for new UI.
	- first check UI is available 
	*/
	var filter = document.getElementById('js-sidebar-filter');
	if(filter == null) return;
	
	var lists = {
		/* 
		set date as UTC.
		note: Edge may not handle this well.
		But for IDG demo it's oK
		*/
		setUTC: function(listId){
			$("li",listId).each(function(){
				$(this).data( 'UTC',Date.parse($(this).data('created-date')) );
			})	
		},
		
		/* 
		date sort on UTC
		use jQuery to reorder DOM list 
		*/
		dateSort:function(listId,newold){		
			$("li",listId)
				.sort( function( a, b ) {
					a = $( a ).data('UTC'); 
					b = $( b ).data('UTC');
					if(newold) 	return b - a;
					else		return a - b;
					})
				.appendTo(listId);
		}
	}
	
	
	
	lists.setUTC("#js-events-by-date");
	// lists.dateSort("#js-events-by-date",true);
	
	
	
	
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
/*
Tile Collapse
*/
idg.collapseTiles = function(){
	// find and set up all
	$('.js-tiles-collapse-btn').each(function(){
		
		var groupID = $(this).data('group');
		var $wrap = $('#'+groupID);
		var initialState = $wrap.data('collapse');
		
		var tiles = new CollapseTiles( 	$(this), 
										$wrap, 
										initialState );
	});
	
	function CollapseTiles( $icon, $wrap, initialState ){
		/*
		Find all tiles. 	
		*/
		
		var $tiles = $wrap.children('.tile');
		var expanded = initialState == 'expanded' ? true : false;
		
		$icon.click(function(){
			change();
		});		
		
		function change(){
			if(expanded){
				$tiles.find('.element-data').hide();
				
				// is there an overflow flag?
				$tiles.find('.tile-more-data-flag').hide();
				
				/* 
				show collapsed icon in replace 
				of content (so user knows state...)
				*/
				var collapseIcon = $('<i class="oe-i expand small pad-right js-data-collapsed-icon"></i>');	
				var dataState = $('<span class="js-data-hidden-state"> [0]</span>');
					
				//$tiles.append( collapseIcon.click( change ) );
				
				$tiles.find('.element-title').append( dataState );
				
			} else {
				// $tiles.find('.js-data-collapsed-icon').remove();
				$tiles.find('.js-data-hidden-state').remove();
				$tiles.find('.element-data').show();
				// is there an overflow flag?
				$tiles.find('.tile-more-data-flag').show();
			}
			
			$icon.toggleClass('expand collapse');
			expanded = !expanded;
		}	
	}	
}
/*
Tile Element - watch for data overflow
*/
idg.tileDataOverflow = function(){
	
	if( $('.element.tile').length == 0 ) return;
		
	// loop through the view tiles and check the data height
	$('.element.tile').each(function(){
		var h = $(this).find('.data-value').height();

		// CSS is set to max-height:180px;
		if(h > 179){
			// it's scrolling, so flag it
			var flag = $('<div/>',{ class:"tile-more-data-flag"});
			var icon = $('<i/>',{ class:"oe-i arrow-down-bold medium selected" });
			flag.append(icon);
			$(this).prepend(flag);
			
			var tileOverflow = $('.tile-data-overflow', this)
			
			flag.click(function(){
				tileOverflow.animate({
					scrollTop: tileOverflow.height()
				}, 1000);
			});	

			tileOverflow.on('scroll',function(){
				flag.fadeOut();
			});
			
			// Assuming it's a table!...
			var trCount = $(this).find('tbody').get(0).childElementCount;
			// and then set the title to show total data count
			
			var title = $('.element-title',this);
			title.html( title.text() + ' <small>('+trCount+')</small>' );			
			
		}	
	});
	
	
	
}
/**
Create 'buttons' for nav menus, 3 different flavours: standard, wrapped and fixed
- standard: $btn open/closes the popup $content (seperate DOM element). MouseEnter/Leave provides increased functionality for non-touch users
- wrapped: 'btn' & popup $content wrapped by shared DOM (shortcuts menu), wrapper is used for the $eventObj
- fixed: When the browser width is wide enough CSS fixes open the Activity Panel 
@ $btn - structurally as <a> but without CSS pseudos :hover, :focus, :active
@ $content - DOM content to show on click 
**/
idg.NavBtnPopup = function(id,$btn,$content){
		
	// private
	var id = id,
		$eventObj = $btn,
		contentOpen = false,
		mouseOpened = false,
		mouseOutContent = true,
		isFixed = false,	// hotlist
		isLocked = false, 	// hotlist
		css = { 
			active:'active', 	// hover
			open:'open',		// clicked 
			locked:'open' 	// clicked 
		};	
		
	/**
	public methods
	**/
	this.hide = hide;	
	this.show = show;
	this.fixed = fixed;
	this.basic = basic;
	this.useWrapper = useWrapperEvents;
	this.enhanced = advancedEvents;
	
	
	/* 
	JS behaviour to replace CSS pseudos	
	*/
	function CSShover(){
		$eventObj
			.mouseenter(function(){
				$btn.addClass( css.active ); 
			})
			.mouseleave(function(){
				$btn.removeClass( css.active ); 
			});
	}
	

	/**
	Main interaction (for touch/click)
	**/
	function useClick(){
		// Click touch
		$eventObj.click(function( e ){
			e.stopPropagation();
			changeContent();
		});
	}

	/*
	setup
	Basic Touch / click support (no mouse events)	
	*/
	function basic(){
		CSShover();
		useClick();
	}
	
	/**
	DOM structure for the Shortcuts dropdown list is different
	Need to shift the events to the wrapper DOM rather than the $btn	
	**/
	function useWrapperEvents( $wrapper ){
		$eventObj = $wrapper;
		css.open = css.active; 		// wrap only has 1 class
		mouseOutContent = false;	// using DOM wrapper 
		CSShover();
		useClick();
		
		// enhance for Mouse/Track users
		$eventObj
			.mouseenter(function(){ show(); })
			.mouseleave(function(){ hide(); });	
	}

	/**
	Hotlist is structured like Shortcuts but requires a different 
	behaviour, it requires enhanced behaviour touch to lock it open!	
	**/
	function advancedEvents( $wrapper ) {
		$eventObj = $wrapper;
		css.open = css.active;
		mouseOutContent = false;
		CSShover();
		
		/*
		click needs to open / close
		OR if mouseEvents are working
		lock open
		*/
		$btn.click(function( e ){
			e.stopPropagation();
			
			if(mouseOpened && isFixed == false){
	
				if(isLocked){
					// if open it
					isLocked = false;
					$btn.removeClass( css.locked );
					hide();
				} else {
					isLocked = true;
					$btn.addClass( css.locked );
				}
			
			} else {
				changeContent();
			}
					
		});
		
		// enhance for Mouse/Track users
		$eventObj
			.mouseenter(function(){ 
				mouseOpened = true;
				show(); 
			})
			.mouseleave(function(){ 
				if(isLocked == false && isFixed == false) hide(); 
			});	

	}
	

	/**
	Update content state
	**/
	function changeContent( isOpen ){
		if(isFixed) return; // if popup is fixed
		if(isLocked) return; 
			
		if( contentOpen ){
			hide();
		} else { 
			show();
		}
	}
	
	function show(){
		$btn.addClass( css.open );
		$content.show();
		if( mouseOutContent ) addContentEvents();
		contentOpen = true;
	}
	
	function hide(){
		$btn.removeClass( css.open );
		$content.hide();
		contentOpen = false;
		mouseOpened = false;
	}	
	
	/**
	Add mouseLeave enhancement to close $content popup
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
	Hotlist Panel needs to be fixable when the browsers is wide enough
	(but not in oescape mode)	
	**/
	function fixed( b ){
		isFixed = b;
		
		if( b ){
			$content.off( 'mouseenter mouseleave' );  	
			$btn.addClass( css.locked );	
			show();
		} else {
			isLocked = false; // reset this too.
			$btn.removeClass( css.locked );
			hide(); 
		}
	}

}

/**
Patient Popup Buttons 
@ id - id
@ $btn - structurally as <a> but without CSS pseudos :hover, :focus, :active
@ $content - DOM content to show on click 

UX: on $btn MouseEvents show the popups (only on the $btn).
click (touch), locks the popup open. click (touch) to close it 

**/
idg.PatientBtnPopup = function(id,$btn,$content){
		
	// set up vars
	var id = id,
		contentPopup = false,
		useClick = false,
		useMouse = false,
		isGrouped = false, 		
		groupController = null,
		css = { 
			active:'active', 	// hover
			open:'open' 		// clicked 
		};	
		
	/**
	public methods
	**/
	this.inGroup = inGroup;
	this.hide = reset;
	this.show = showContent;
	
	/**
	Events
	**/
	$btn.click( function( e ){
			e.stopPropagation();
			clickChange();				// touch (click)
			})							
		.mouseenter( mouseShow )		// MouseEvent enhancements
		.mouseleave( mouseHide );	
	
	/**
	Handlers
	click / touch 
	**/
	function clickChange(){
		
		if(contentPopup){
			if(useMouse){
				// user wants to lock it, switch to click events
				useClick = true;
				useMouse = false;
			} else {
				hideContent();
			}
		} else {
			showContent();
		}		
	}	  	
		  
	function mouseShow(){
		if(useClick == false){		
			showContent();
			useMouse = true;
		}
	}	
	
	function mouseHide(){
		// has user clicked to lock open?
		if(useClick == false){
			hideContent();
			useMouse = false;
		}
	}  
	
	/**
	View	
	**/	  
  	function showContent(){
	  	// only 1 Patient Popup open at a time:
	  	if(isGrouped) groupController.closeAll();

	  	$content.show();
	  	contentPopup = true;
	  	$btn.addClass( css.open );
  	}
  	
  	function hideContent(){
	  	$content.hide();
	  	contentPopup = false;
	  	$btn.removeClass( css.open );
	}
	
	// called by the groupController
	function reset(){
		hideContent();
		useClick = false;
		useMouse = false;
	}

	/**
	Group popups to stop overlap	
	**/
	function inGroup( controller ){
		isGrouped = true;
		groupController = controller;
	}	
}



/**
Patient Mini Overview
This is click only. Big popup, could be irritating if 
it was popping up on rollover... 
**/
idg.patientMiniOverview = function(){
	
	if( $('.oe-patient-mini-overview').length == 0 ) return;

	/**
	IDG is only using 1 DOM as a demo for all interactions
	Martin Luther King
	**/

	var $mini = $('#patient-mini-overview');
	var $name = $('#patient-mini-overview .patient-name');
	var $id = $('#patient-mini-overview .patient-number');
	
	// wrapper for icons (covers warning triangle too)
	$('.js-patient-quick-overview').click(function( e ){
		e.stopPropagation();
		$name.text( $(this).data('name') );
		$id.text( $(this).data('id') );
		positionAndShow( $(this) );
	});
	
	$('#patient-mini-overview .close-icon-btn').click(function( e ){
		e.stopPropagation();
		$mini.hide();
	});
	
	function positionAndShow( $iconBtn ){
		
		/* 
			Popup is FIXED positioned
			work out offset position 
			setup events to close it on resize or scroll.
			*/
			
			var miniH = 350;
			var miniW = 465;
			
			var elem = $iconBtn[ 0 ];
			
			// js vanilla:
			var btnPos = elem.getBoundingClientRect();		
			var w = document.documentElement.clientWidth;
			var h = document.documentElement.clientHeight;
			
			var posTop = btnPos.top;
			var posLeft = btnPos.right - miniW;
		
			// check popup doesn't go off the top of the screen 
			if(h - posTop < miniH) posTop = h - miniH;
			if(posLeft < 0) posLeft = 0;
			
			// set CSS Fixed position
			$mini.css(	{	"top": posTop,
							"left": posLeft });			
							
			$mini.show();
		
		
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
		
		if(expanded == false) $content.removeClass('hidden').hide();	
			
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
				$content.show();
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
		
		var $btn = $(this);
		var $div = $('#'+ $btn.data('input') ); 
		
		$btn.hide();
		
		
		
		$div.show(0,function(){
			
			var textArea = $(this).find('textarea');
			var removeIcon = $(this).find('.js-remove-add-comments');
			
			textArea.focus();
			
			removeIcon.click(function(){
				$div.hide();
				$btn.show();	
			});
		});
		
	});
}
/*
Enhance Popup Fixed.
1) Provide click (touch) mechanism. 
2) Enhance for mouse / trackpad
3) Open popup and position (as it's Fixed)
IDG demo, it assumes a DOM structure of:
<wrap>
	<btn />
	<popup /> // Fixed position
</wrap>	
... and that there is an 'active' class on button ;)
*/
idg.enhancedPopupFixed = function($wrap,$btn,$popup){
	var popupShow = false;
	var css;
	
  	// handles touch
  	$btn.click( changePopup );
  	
  	// enchance with mouseevents through DOM wrapper
  	$wrap
  		.mouseenter( showPopup )
  		.mouseleave( hidePopup );
  	
  	// controller
  	function changePopup(){
	  	if(!popupShow){
		  	showPopup()
	  	} else {
		  	hidePopup()
	  	}		  	
  	}
  	
  	function showPopup(){
	  	setClasses();
	  	setCSSposition();
	  	$popup.show();
	  	$btn.addClass('active');
	  	popupShow = true;
	  	
	  	
  	}
  	
  	function hidePopup(){
	  	$popup.hide();
	  	$btn.removeClass('active');
	  	popupShow = false;
	  	resetCSS();
  	}
  	
  	// each time it opens
  	// work out where it is and apply 
  	// CSS and positioning.
  	  	
  	function setClasses(){
	  	// position popup based on screen location
		// options: top-left, top-right, bottom-left, bottom-right
		// updates the look of the popup
		var offset = $wrap.offset();
	
		var w = window.innerWidth;
		var h = window.innerHeight;
		
		if( offset.top < ( h / 2 ) ){
			css = "top-";
		} else {
			css = "bottom-";
		}
		
		if(offset.left < ( w / 2 ) ){
			css += "left";
		} else {
			css += "right";
		}
		
		$popup.addClass(css);
  	}
  	
  	function resetCSS(){
	  	$popup.removeClass(css);
	  	$popup.css("top", "");
	  	$popup.css("bottom", "");
	  	$popup.css("left", "");
	  	$popup.css("right", "");
	  	
  	}

  	
  	function setCSSposition(){
	  	/* 
		Popup is FIXED positioned
		work out offset position 
		setup events to close it on resize or scroll.
		*/
		
		// js vanilla:
		var wrapPos = $wrap[ 0 ].getBoundingClientRect();		
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
	
		switch(css){
			case "top-left":
			// set CSS Fixed position
			$popup.css(	{	"top": wrapPos.y,
							"left": wrapPos.x });
			break;
			case "top-right":
			// set CSS Fixed position
			$popup.css(	{	"top": wrapPos.y,
							"right": (w - wrapPos.right) });
			break;
			case "bottom-left":
			// set CSS Fixed position
			$popup.css(	{	"bottom": (h - wrapPos.bottom),
							"left": wrapPos.x  });
			break;
			case "bottom-right":
			// set CSS Fixed position
			$popup.css(	{	"bottom": (h - wrapPos.bottom),
							"right": (w - wrapPos.right) });
			
			break;
			
		}

		
  	} 	
  	
  	
  	
  	// should be a close icon button in the popup
	var $closeBtn = $popup.find('.close-icon-btn');
	$closeBtn.click( hidePopup );
}
/*
Enhance Touch.
1) Provide click (touch) mechanism. 
2) Enhance for mouse / trackpad
IDG demo, it assumes a DOM structure of:
<wrap>
	<btn />
	<popup />
</wrap>	
... and that there is an 'active' class on button ;)
*/
idg.enhancedTouch = function($wrap,$btn,$popup,calcFixedPosFn){
	var popupShow = false;
	
  	// handles touch
  	$btn.click( changePopup );
  	
  	// enchance with mouseevents through DOM wrapper
  	$wrap
  		.mouseenter( showPopup )
  		.mouseleave( hidePopup );
  	
  	// controller
  	function changePopup(){
	  	if(!popupShow){
		  	showPopup()
	  	} else {
		  	hidePopup()
	  	}		  	
  	}
  	
  	function showPopup(){
	  	$popup.show();
	  	$btn.addClass('active');
	  	popupShow = true;
  	}
  	
  	function hidePopup(){
	  	$popup.hide();
	  	$btn.removeClass('active');
	  	popupShow = false;
  	}
  	
  	// should be a close icon button in the popup
	var $closeBtn = $popup.find('.close-icon-btn');
	$closeBtn.click( hidePopup );
}
/*
OE Filter Options
*/

idg.filterOptions = function(){
	
	if( $('.oe-filter-options').length == 0 ) return;
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	
  	Loop through and set up (each filter group as unique IDs)
  	#oe-filter-options-{id}
  	#oe-filter-btn-{id}
	#filter-options-popup-{id}
	
	note: JS gets {id} from: data-filter-id="{id}"
  	*/
  	
  	$('.oe-filter-options').each(function(){
  		var id = $(this).data('filter-id');
  		/*
  		@param $wrap
  		@param $btn
  		@param $popup	
		*/
		idg.enhancedPopupFixed( 		$('#oe-filter-options-'+id), 
										$('#oe-filter-btn-'+id), 
										$('#filter-options-popup-'+id) );
												
		
		// workout fixed poition
		
		var $allOptionGroups =  $('#filter-options-popup-'+id).find('.options-group');
		$allOptionGroups.each( function(){
			// listen to filter changes in the groups
			updateUI( $(this) );
		});

	});

	
	// update UI to show how Filter works
	// this is pretty basic but only to demo on IDG
	function updateUI( $optionGroup ){
		// get the ID of the IDG demo text element
		var textID = $optionGroup.data('filter-ui-id');
		var $allListElements = $('.btn-list li',$optionGroup);
		
		$allListElements.click( function(){
			$('#'+textID).text( $(this).text() );
			$allListElements.removeClass('selected');
			$(this).addClass('selected');
			
			
			// $optionGroup.find('.btn-list li').
		});
	}
  	

}
/*
Hotlist
*/
idg.hotList = function(hotlistPopup){
	
	if( $('#js-nav-hotlist-btn').length == 0 ) return;
		
	// Fix Activity Panel if design allows it to be fixable!
	if( $('#js-nav-hotlist-btn').data('fixable') == true ){
		
		checkBrowserSize();
		
		$( window ).resize(function() {
			checkBrowserSize();
		});
		
		function checkBrowserSize(){	
	  		if( $( window ).width() > 1890){ // min width for fixing Activity Panel (allows some resizing)
				hotlistPopup.fixed( true );
			} else {
				hotlistPopup.fixed( false );
			}
		}  
	}
	
	
	/*
	VC mode?	
	PHP will have hidden everything else other than VC content
	*/
	
	if( $('#js-hotlist-panel').data('vc') == true ) return 
	
	/*
	Hotlist comments.
	The comment icon shows comment status. 
	Clicking on it show / hides the <tr> under it. 	
	*/
	$('.oe-hotlist-panel .js-patient-comments').click(function( e ){
		
		
		var commentBox = $(this).parent().parent().next();
		var textArea = commentBox.find('textarea');
		
		commentsQuickLook(false); // hide Quicklook 
		commentBox.toggle();
	
		// update the icon based on the textarea
		if(textArea.val() == ""){

			if($(this).hasClass("comments-added")){
				
				$(this).removeClass("comments-added active");
				$(this).addClass("comments");
			}

		} else {

			if($(this).hasClass("comments")){
				
				$(this).removeClass("comments");
				$(this).addClass("comments-added active");
			
			}
		};	
	});
	
	
	
	// enchance with mouseevents through DOM wrapper
  	$('.oe-hotlist-panel .js-patient-comments')
  		.mouseenter( function(){ commentsQuickLook(true, $(this) ); } )
  		.mouseleave( function(){ commentsQuickLook(false); } );
	
	
	function commentsQuickLook(show,$icon){
		
		$quick = $('#hotlist-quicklook');
		
		if(!show){
			$quick.hide();
			return
		}
		
		// quick and dirty JS to demo UI/UX
		var commentBox = $icon.parent().parent().next();
		var textArea = commentBox.find('textarea');
		
		if(textArea.val() != "") {
			$quick.text( textArea.val() );
			$quick.show();
			$quick.css('top',($icon.position().top + 19));
		}	
	
	}

	
	
	
	
	
	
	// activity datepicker using pickmeup.
	// CSS controls it's positioning
	
	var $pmuWrap = $('#js-pickmeup-datepicker').hide(); 
	var pmu = pickmeup('#js-pickmeup-datepicker',{
					format	: 'a d b Y',
					flat:true,         // position: relative
					position:'left',
				});

	// vanilla: 
	var activityDatePicker = document.getElementById("js-pickmeup-datepicker");
	activityDatePicker.addEventListener('pickmeup-change', function (e) {
		$('#js-pickmeup-closed-date').text(e.detail.formatted_date);
		$pmuWrap.hide();
	})	
	
	$('#js-hotlist-closed-select').click(function(){
		$pmuWrap.show();
	});
	
	$('#js-hotlist-closed-today').click(function(){
		pmu.set_date(new Date);
		$('#js-pickmeup-closed-date').text("Today");
	});
}
/**
Notification banner (User / Admin)
**/
idg.notificationBanner = function(){
	if( $('#oe-admin-notifcation').length == 0 ) return;
	
	// icon toggles Short/ Full Message
	$('#oe-admin-notifcation .oe-i').click( toggleNotification);
	
	function toggleNotification(){
		$('#notification-short').toggle();
		$('#notification-full').toggle();
	}
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
	
	// for testing and designing UI
	this.test = loadOverlay;
	return this;
	  	
	/**
	Create full screen cover using 'oe-popup-wrap'
	CSS handles the positioning of the loaded DOM
	**/  	
	function loadOverlay(){
		var $overlay = $('<div>');
  		$overlay.addClass('oe-popup-wrap');
  		$overlay.load('/idg-php/v3.0/_load/' + phpToLoad,function(){
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
/**
Toggle Radio Checked
**/
idg.toggleRadio = function(){
	/**
	With the L / R option as radio
	we need to be able to toggle there
	checked state
	**/
	$('.js-toggle-radio-checked').each(function(){
		var checked = true;
		$(this).click( function(){
			$(this).prop('checked', checked);
			checked = !checked;
		});
	});
}
/*
Basic tooltip functionality. Quick for IDG demo
*/
idg.tooltips = function(){
	$('.js-has-tooltip').hover(
		function(){
			var text = $(this).data('tooltip-content');
			var offset = $(this).offset();
			var leftPos, toolCSS; 
			
			// check for the available space for tooltip:
			if ( ( $( window ).width() - offset.left) < 100 ){
				leftPos = offset.left - 174 // tooltip is 200px (left offset on the icon)
				toolCSS = "oe-tooltip offset-left";
			} else {
				leftPos = offset.left - 94 // tooltip is 200px (center on the icon)
				toolCSS = "oe-tooltip";
			}
			
			// add, calculate height then show (remove 'hidden')
			var tip = $( "<div></div>", {
								"class": toolCSS,
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
/**
VC Draggable Floating inputs
**/
idg.vcDraggable = function(){
	
	var id = 'oe-vc-scratchpad';

	if( $('#'+id).length == 0 ) return;
	
	/* 	
	Drag...
	*/	
	var relativeX, relativeY;
		
	document.addEventListener("dragstart", getMouseOffset, false);
	document.addEventListener("dragend", reposFloat, false);
		
	
	function getMouseOffset( e ){
		e.dataTransfer.dropEffect = "move";
		
		// need to work out mouse offset in <div> before dragging
		var offset = $('#'+id).offset();
		relativeX = (e.clientX - offset.left);
		relativeY = (e.clientY - offset.top);		
	}
	
	function reposFloat( e ) {
		// Update the panel position
		var left = e.clientX - relativeX;
		var top = e.clientY - relativeY;
		
		// stop it being dragged off screen
		top = top < 1 ? 1 : top;
		left = left < 1 ? 1 : left;
		
		$('#'+id).css({"top":top+"px","left":left+"px"});
	}
	
	
	/*
	Touch version? ... 
	Not sure if this works, not tested... but anyway:	
	*/
	var el = document.getElementById(id);
	el.addEventListener("touchstart", getMouseOffset, false);
	el.addEventListener("touchend", reposFloat, false);
		
	
}
/**
Homepage Message expand / contract 	
**/
idg.WorkListFilter = function(){
	
	if( $('.js-worklist-filter').length == 0 ) return;
	
	$('.js-worklist-filter').each(function(){
		$(this).click( function(e){
			e.preventDefault();
			resetFilters();
			$(this).addClass('selected');
			updateWorkLists( $(this).data('worklist') );
			
		});
	});
	
	function resetFilters(){
		$('.js-worklist-filter').removeClass('selected');
	}
	
	function updateWorkLists( listID ){
		if(listID == 'all'){
			$('.worklist-group').show();
		} else {
			$('.worklist-group').hide();
			$('#'+listID).show();	
		}
	}
	
	// fake <tr> row click (always goes to IDG overview demo)
	$('.clickable-rows tbody tr').click(function(){
		window.location = '/v3.0-SEM/_overview';
	});
	
}
