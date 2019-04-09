/**
IDG Demo JS is ONLY for OpenEyes internal prototyping/testing of UI/UX concepts
**/
var idg = idg || {};

idg.init = function(){	
	
	"use strict";
	
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
	$('.hidden').hide().removeClass('hidden');

	// Patient Banner
	idg.patientPopups.init();
	
	// Collapse Groups: e.g. Management Summaries in Popup and Edit Element groups in sidebar
	idg.collapseGroups();
	
	// lightning viewer
	// idg.lightningViewer();  // now a regular link
 	
	// Tooltips on info icons
	idg.tooltips();
	
					
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
						
	// Examination VA COMPLog					
	idg.overlayPopup( 	'#js-idg-exam-complog',  			// VA in Exam
						'exam-va-COMPlog.php', 				// Demo content
						'.close-icon-btn' );				// wraps remove icon
						
						
	
	// Worklist PSD / PSG					
	idg.overlayPopup( 	'#js-idg-worklist-ps-add',  			// VA in Exam
						'worklist-PS.php', 						// Demo content
						'.close-icon-btn' );				// wraps remove icon
						
	// Analytics Custom Filters					
	idg.overlayPopup( 	'#analytics-change-filters',  			// VA in Exam
						'analytics-filters.php', 						// Demo content
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
	
	// reduce height.
	idg.reduceElementHeight();
	
	// Comments
	idg.comments();
	
	// Add Search and Autocomplete
	idg.elementAddSelectSearch();
	// v2!
	idg.addSelectInsert.init();
	
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
	// idg.correspondencePageScroll(); NOW: MultiPage Scroll
	
	// Multi Page Scroll
	idg.multiPageScroll();
	
	// OE Filter Options (analytics)
	idg.filterOptions();
	
	// sidebar Date Filters
	idg.sidebarDateFilter();
	
	// Element subgroups
	idg.elementSubgroup();
	
	// Patient Mini Overview
	idg.patientMiniOverview();
	
	// Notification (user/admin)
	idg.notificationBanner();
	
	// Patient Step Info Popup
	idg.pathSteps.init();
	
	// User PIN 
	idg.userPIN.init();
	
	// ED3 App Demo
	idg.ed3App.init();
										
};


/*
Add Select Search insert Popup (v2)
*/
idg.addSelectInsert = {

	/*
	keep a track of all popups	
	*/
	all:[],
	
	/*
	Close all popups. Keep the interface tidy. 
	Actually there should be a popup controller... but for now:
	*/
	closeAll:function(){
		this.all.forEach(function( popup ){
			popup.close();
		});
	},
	
	/*
	initialise	
	*/
	init:function(){
		let all = this.all;
		/*
		Find all the green + buttons
		*/
		$('.js-add-select-btn').each(function(){
			let newPopup = new idg.addSelectInsert.Popup( 	$(this),
															$(this).data('popup') );
			all.push(newPopup);																
		});
	}
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

/*
Lightning
*/
var lightning = lightning || {};

lightning.init = function(){

	/*
	All IMGs are pre-loaded in DOM
	Speed of interaction is PRIORITY!
	*/
	var me = this;
	this.currentStack = 0;
	this.iconPrefix = '#lqv_';
	this.stackPrefix = '#lsg_';
	this.totalStackNum = $('.stack-group').length;
	this.xscrollWidth = $('.lightning-view').width();
	this.locked = true;
	
	
	this.updateView = function( id ){
		this.updateStack( id );
		this.updateMeta( $(this.iconPrefix + id).data('meta') );
	}

	this.updateMeta = function(meta){
		var $div = $('.lightning-meta');
		var d = meta.split(',');
		$div.children('.type').text(d[0]);
		$div.children('.date').text(d[1]);
		$div.children('.who').text(d[2]);
	}
	
	this.updateStack = function( stackID ){
		$(this.stackPrefix + this.currentStack).hide();
		$(this.stackPrefix + stackID).show();
		this.currentStack = stackID; // track id
		this.updateCounter();
		this.timelineIcon();
	}
	
	this.updateCounter = function(){
		$('.lightning-ui .stack-position').text( this.currentStack+1 + '/' + this.totalStackNum);
	}
	
	this.timelineIcon = function(){
		$('.icon-event').removeClass('js-hover');
		$(this.iconPrefix + this.currentStack).addClass('js-hover');	
	}
	
	/*
	xscroll using DOM overlay (rather than the image)
	(note: the overlay has 2 possible widths depending on browser size)
	*/
	this.xscroll = function(xCoord,e){
		var xpos = Math.floor(xCoord/(this.xscrollWidth / this.totalStackNum));
		if(this.locked == false){
			this.updateView( xpos );
		} 
	}
	
	this.swipeLock = function(){
		this.locked = !this.locked;
		if(this.locked){
			$('.lightning-ui .user-help').text( 'Swipe is LOCKED | Click to unlock' );
		} else {
			$('.lightning-ui .user-help').text( 'Swipe to scan or use key RIGHT / LEFT | Click to LOCK swipe' );
		}
	}
	
	/*
	Step through stack (arrows or KEYs)	
	*/
	this.stepThrough = function( dir ){
		var next = this.currentStack + dir;
		if( next >= 0 && next < this.totalStackNum){
			this.updateView( next );
		}
	}
	
	/*
	Events
	*/
	$('.icon-event')
		.hover(
			function(){
				me.updateStack(	$(this).data('id') );
				me.updateMeta( 	$(this).data('meta') );
			}, function(){
				// no out action
			})
		.click(function(){
			me.swipeLock();
		});
		
		
	// mouse xscroll
	$('.lightning-view').mousemove(function(e) {
	  	var offset = $(this).offset();
	  	me.xscroll(e.pageX - offset.left,e);
	});		
	
	// Click to LOCK swiping
	$('.lightning-view').click(function(e){
		e.stopPropagation();
		me.swipeLock();
	});				

	// step through
	// use either the < > btn
	$('#lightning-left-btn').click(function( e ){
		e.stopPropagation();
		me.stepThrough( -1 );
	});
	
	$('#lightning-right-btn').click(function( e ){
		e.stopPropagation();
		me.stepThrough( 1 );
	});
	
	// or LEFT - RIGHT Keys
	$("body").keydown(function(e){
	    if ((e.keyCode || e.which) == 37)	me.stepThrough( -1 );
	    if ((e.keyCode || e.which) == 39)	me.stepThrough( 1 );
	});
		
	// watch for resize (the view has 2 widths )
	$( window ).resize(function() {
		me.xscrollWidth = $('.lightning-view').width();
	});
	

	/*
	setup timeline
	*/
	this.filterOptions();
	this.iconGroup();
	/*
	setup viewer	
	*/
	this.updateCounter();
	this.swipeLock();

	
}
/*
Lightning
*/

lightning.filterOptions = function(){
	
	/*
  	Quick UX / UI JS demo	
  	Setup for touch (click) and enhanced for mouseevents
  	*/
  	var options = false;
  	
  	// handles touch
  	$('.lightning-btn').click( changeOptions );
  	
  	// enchance with mouseevents through DOM wrapper
  	$('.js-lightning-options')
  		.mouseenter( showOptions )
  		.mouseleave( hideOptions );
  	
  	// controller
  	function changeOptions(){
	  	if(!options){
		  	showOptions()
	  	} else {
		  	hideOptions()
	  	}		  	
  	}
  	
  	function showOptions(){
	  	$('.change-timeline').show();
	  	$('.lightning-btn').addClass('active');
	  	options = true;
  	}
  	
  	function hideOptions(){
	  	$('.change-timeline').hide();
	  	$('.lightning-btn').removeClass('active');
	  	options = false;
  	}

}
/*
Lightning
*/

lightning.iconGroup = function(){
	
	/*
  	Quick UX / UI JS demo	
  	Collapse and Expand the timeline
  	*/
  	$('.icon-group').each(function(){
	  	var count = $(this)[0].childElementCount;
		var $div = $('<div />').text('('+count+')').hide();
		$(this).parent().append( $div );
  	});
  	
  	$('.js-timeline-date').click(function( e ){
	  	var iconGroup = $(this).data('icons');
	  	
	  	if($(this).hasClass('collapse')){
		  	$('#js-icon-'+iconGroup).hide();
		  	$('#js-icon-'+iconGroup).next().show();
	  	} else {
		  	$('#js-icon-'+iconGroup).show();
		  	$('#js-icon-'+iconGroup).next().hide();
	  	}
	  
	  	$(this).toggleClass('collapse expand');
  	});
}
/*
Mulit Page Scroll Widget. 
Used in Correspondence VIEW and Lightning Viewer for Letters 
... and maybe other places too.
*/
idg.multiPageScroll = function(){
	/*
	check DOM... 
	*/
	if( $('.lightning-multipage-scroll').length == 0 ) return;
	
	/*
	Allowing for 'n' number of widgets
	*/
	$('.lightning-multipage-scroll').each( function(){
		var mps = new MultiPage( $(this) );
	});
	
	function MultiPage( $div ){
		var me = this;
		var $nav = $('.multipage-nav',$div);
		var $stack = $('.multipage-stack',$div);
		var numOfImgs = $('.multipage-stack > img',$div).length;
		
		/*
		Get first IMG height Attribute 
		to work out page scrolling.
		Note: CSS adds 10px padding to the (bottom) of all images !
		*/
		var pageH = 10 + parseInt( $('.multipage-stack > img:first-child',$div).attr('height') );

		/*
		Build Page Nav Btns
		loop through and create page buttons
		e.g. <div class="page-num-btn">1/4</div>
		*/	
		for(var i=0;i<numOfImgs;i++){
			var btn = $( "<div></div>", {
							text: (i+1)+"/"+numOfImgs,
							"class": "page-num-btn",
							"data-page": i,
							mouseenter: function( e ) {
								me.animateScrolling( $(this).data('page') );
							},
							click: function( event ) {
								me.animateScrolling( $(this).data('page') );
							}
						}).appendTo( $nav );
		}
		
		/*
		Animate the scrolling
		*/	
		this.animateScrolling = function( page ){
			var scroll = pageH * page;	
			$stack.animate({scrollTop: scroll+'px'},200,'swing');
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
		var chart			= new idg.PatientBtnPopup( 'charts', $('#js-charts-btn'), $('#patient-popup-charts') );
	
	
		var all = [ quicklook, demographics, demographics2, risks, chart ];
		
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
	
	let $eyeLatSwitcher =  $('.eye-side-switcher',$btn);
	
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
				
				eyeLatSwitch('hide');
				
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
			
			eyeLatSwitch('show');
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
	  	
	  	eyeLatSwitch('hide');
	}
	
	// called by the groupController
	function reset(){
		hideContent();
		useClick = false;
		useMouse = false;
	}
	
	function eyeLatSwitch(state){
		if($eyeLatSwitcher.length != 0){
			
			if(state == "show"){
				$eyeLatSwitcher.show();
			} else {
				$eyeLatSwitcher.hide();
			}
			
			
		}
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
	
	// is the popup DOM available?
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
ED3 App ... loads in a PHP file
*/
idg.ed3App = {
	
	/*
	init
	*/	
	init:function(){
	
		/*
		do we have elems?
		*/
		if( $('.js-idg-ed3-app-btn').length){
			
			$('.js-idg-ed3-app-btn').click(function(){
				// php content to load in...
				let php = $(this).data('php');	
			
				// build DOM wrapper
				let $ed3app = $('<div class="oe-eyedraw-app spinner-loader"></div>');
				
				
				// position y (top), x (left) is handled by the CSS.
				let elem = $(this)[ 0 ];
				let btnPos = elem.getBoundingClientRect();	
				
				// ed3 App height = 532px;
				// can not go above 60px
				let posH = btnPos.bottom - 532;
				if( posH < 60 ){
					$ed3app.css(	{"top": '60px'});
				} else {
					$ed3app.css(	{"top": posH + 'px'});
				}
				
				$('body').append( $ed3app );
				
				let $spinner = $('<div class="spinner-center"><i class="spinner"></i></div>');
				$ed3app.append( $spinner ); 
							
				// demo ed3 content: 
				$ed3app.load('/idg-php/v3.0/_load/ed3/'+php,function(){
					
					$('#js-idg-close-ed3-app').click(function(){
						// close and tidy up:
						$ed3app.html('').remove();				
					})
					
					// fake save and close:
					$('#js-idg-save-ed3-app').click(function(){
						// close and tidy up:
						$ed3app.html('').remove();				
					})
					
				});
			});			
		}
	}	
	
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
			$quick.css('top',($icon.offset().top) - 102);
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
/*
Clinic steps and Patient actions steps in WS
*/
idg.pathSteps = {
	
	/*
	popup & quickview is built by JS.
	content and position is then modified for each step	
	*/
	popup:null,
	//quickview:null,
	steps:[],
		
	/*
	init
	*/	
	init:function(){
		/*
		do we have elems?
		*/
		if( $('.oe-pathstep-btn').length){
			
			this.popup = new this.LoadPhpDemoDOM();
						
/*
			this.popup = new this.CreatePopup();
			this.popup.init(true);
			this.quickview = new this.CreatePopup();
			this.quickview.init(false);
*/
			/*
			Use $ for DOM work
			*/
			$('.oe-pathstep-btn').each(function( ){
				idg.pathSteps.setupSteps( $(this) );
			});
		}
	},
	
	/*
	setup Btns
	*/ 
	setupSteps:function( $stepBtn ){
		this.steps.push( new this.StepBtn( $stepBtn, this.popup ) );	
	},
	
	/*
	build Step Btn	
	*/
	StepBtn:function( $btn, popup ){
		const elem = $btn[ 0 ];
		const data = $btn.data("step");

		/*
		Methods
		*/ 
		this.click = function(){
			let btnPos = elem.getBoundingClientRect();
			let w = document.documentElement.clientWidth;
			popup.show( data, btnPos.top, w - btnPos.right, true  );
		}
		
		this.enter = function(){
			let btnPos = elem.getBoundingClientRect();
			let w = document.documentElement.clientWidth;
			popup.show( data, btnPos.top + btnPos.height, w - btnPos.right, false );
		}
		
		this.leave = function(){
			popup.out();
		}
		
		/*
		Events 
		*/
		elem.addEventListener( "click", this.click.bind( this ) );	
		elem.addEventListener( "mouseenter", this.enter.bind( this ) );
		elem.addEventListener( "mouseleave", this.leave.bind( this ) );
	},
	
	/*
	JS DOM construction was getting too complex. Decided to just 
	loaded in some demo PHP to showcase the UI (this allows easier
	and faster adjustments to the layouts) ... JS stuff was fun tho ;)	
	*/
	LoadPhpDemoDOM:function(){
		/*
		2 views Quick / Full
		Pull in the PHP for the different data
		Other DOM elements setup and control here	
		*/
		
		const $div 		= $('<div class="oe-pathstep-popup"></div>');
		const $close 	= $('<div class="close-icon-btn"><i class="oe-i remove-circle medium"></i></div>');	
		const $status 	= $('<div class="step-status">Status</div>');
		const $title 	= $('<h3 class="title"></h3>');
		const $overflow = $('<div class="popup-overflow"></div>');
		const $dataGroup = $('<div class="data-group"></div>');
		const $edit 	= $('<div class="step-actions flex-layout"><button class="red hint">Remove PSD</button><button class="green hint">Administer</button></div>');
		
		// wrap the data with an overflow wrapper
		$overflow.append( $dataGroup );
		
		// build DOM element, and hide it
		$div.append(	$close, 
						$title, 
						$overflow,
						$edit,
						$status );
		
		// attach to DOM
		$div.hide();
		$('body').append( $div );
		
		
		let clickLockOpen = false;
		
		this.show = function( data, top, right, lock){
			clickLockOpen = lock;
			
			// position
			$div.css({ 	top : top,
					 	right: right });	 	
			
			// show status message all the time 
			// (helpful UX to explain the colouring)
			
			switch( data.status ){
				case "done":
					$status
						.text('PSD: Completed at 11:40')
						.removeClass()
						.addClass('step-status green');
				break;
				case "todo":
					$status
						.text('PSD: Waiting to start')
						.removeClass()
						.addClass('step-status default');
					
				break;
				case "progress":
					$status
						.text('PSD: In progress')
						.removeClass()
						.addClass('step-status orange');		
				break;
				case "problem":
					$status
						.text('Issue with this PSD')
						.removeClass()
						.addClass('step-status red');
				break;
				
				default: $status.text('No status set!');
			}
			
			
			$dataGroup.load('/idg-php/v3.0/_load/' + data.php, function(){
				
				if( lock == false ){
					// hide extra details on mouseover:
					$('.administer-details').hide();
				}
				
				
			});
			
			
			/* 
			locked mean's clicked: show full	
			*/		
			
			if( lock ){
				$title.text(data.title).show();
				$close.show();
				
				if( data.status != "done"){
					$edit.show();
				}

				$close[0].addEventListener( "click", this.close.bind( this ) );
			
			} else {
				
				$close.hide();
				$title.hide();
				$edit.hide();
				
			}	 	
			// now show it
			$div.show();
			
			
		}
		
		this.out = function(){
			if(clickLockOpen) return;
			$div.hide();
		}
		
		this.close = function(){
			clickLockOpen = false;
			$div.hide();
		}

	},

	/*
	info popup. 
	full (on click) and data-only (hover enhancement)	
	*/
	CreatePopup:function(){
		
		this.full = true;
		
		/*
		build Data DOM
		*/
		const $div 		= $('<div class="oe-pathstep-popup"></div>');	
		const $dataGroup = $('<div class="data-group"></div>');
		const $dataList = $('<ul class="data-list"></ul>');
		const $dataTable = $('<table class="data-table"></table>');
		
		// full DOM elements
		let $close 	= null;	
		let $status = null;
		let $title = null;
		let $eye = null;
		let $pin = null;
		let $pinRight = null;		
		let $pinLeft = null;
		let $inputPinRight = null;
		let $inputPinLeft = null;
		let $edit = null;
		
		
		/*
		Methods	
		*/
		this.init = function( full ){
			this.full = full;
			
			if( full ){
				
				$close 	= $('<div class="close-icon-btn"><i class="oe-i remove-circle medium"></i></div>');	
				$status = $('<div class="step-status"></div>');
				$title 	= $('<h3 class="title"></h3>');
				// $eye 	= $('<div class="eye">Eye: <span class="side"></span></div>');
				
				/*
				PIN not being added in this version 
				BUT will be in Clinic list! (when built)	
				
				// PIN not be
				// pin confirmation
				$pin		= $('<div class="pin-confirmation"></div>');
				$pinRight 	= $('<div class="eye-confirmation right"><h3>Right</h3></div>');
				$pinLeft 	= $('<div class="eye-confirmation left"><h3>Left</h3></div>');
				
				function inputPIN( side ){
					return $('<input id="pathstep-user-pin-'+side+'" type="text" maxlength="4" inputmode="numeric" placeholder="****">');
				}
				$inputPinRight = inputPIN('right');
				$inputPinLeft = inputPIN('left');
				
				// pin
				$pinRight.append( $inputPinRight );
				$pinLeft.append( $inputPinLeft );
				$pin.append( $pinRight, $pinLeft ).hide();
				
				*/
		
		
				// edit PSD
				$edit = $('<div class="step-actions"><button class="blue hint">Edit PSD</button></div>').hide();
				
				// dataList DOM
				$dataGroup.append( $dataList, $dataTable );
				
						
				// build DOM element, and hide it
				$div.append(	$close, 
								$status,
								$title, 
								$dataGroup,
								//$pin,
								$edit );
				
				
				/*
				Events
				*/
				$close[0].addEventListener( "click", this.close.bind( this ) );
				//$inputPinRight[0].addEventListener("input", this.pinRightChange.bind( this ));
				//$inputPinLeft[0].addEventListener("input", this.pinLeftChange.bind( this ));
				
			} else {
				$div.addClass("data-only");
				$dataGroup.append( $dataList, $dataTable );
				$div.append( $dataGroup );
				
			}
	
			// attach to DOM
			$div.hide();
			$('body').append( $div );
			
		}
	
		this.show = function( stepData, top, right){
			// position
			$div.css({ 	top : top,
					 	right: right });
					 	
			/*
			data can be either a list or table	
			*/	
			let fragment = null;	
			$dataList.children('li').remove();
			$dataTable.children('tr').remove();
			
			if( stepData.data.type == "list"){
				// build list
				fragment = idg.pathSteps.buildDataList( stepData.data.data );
				$dataList.append( fragment );
			}
			
			if( stepData.data.type == "table"){
				// build table
				fragment = idg.pathSteps.buildDataTable( stepData.data.data, stepData.status );
				$dataTable.append( fragment );
			}
			
			$dataList.append( fragment );	
				
					 	
			if( this.full ){
				// update popup content
				$title.text( stepData.title );
					
				/*
				DOM depends on status	
				*/
				switch( stepData.status ){
					case "done":
						$status.text('Completed PSD at 11:12');
						$status.addClass('step-status green');
					break;
					case "todo":
						$status.text('Waiting to do');
						$status.addClass('step-status');
						$edit.show();
						//$pin.show();
					break;
					case "progress":
						$status.text('In progress');
						$status.addClass('step-status orange');
						$edit.show();
						//$pin.show();
					break;
					case "problem":
						$status.text('Problem! e.g. Patient has left');
						$status.addClass('step-status red');
						$edit.show();
						//$pin.show();
					break;
					
					default: $status.text('no status set');
				}
			
			} 
			
			// now show it
			$div.show();
		}		
		
		this.close = function(){
			
			$div.hide();
			
			if( this.full ){
				$status.removeClass();
				$edit.hide();
				//$pin.hide();
			}
		}
	
		/*
		Demo PIN UI
		*/
		this.pinRightChange = function( e ){
			checkPin( e.target.value, $pinRight, "right");
		}
		
		this.pinLeftChange = function( e ){
			checkPin( e.target.value, $pinLeft, "left");
		}
		
		function checkPin( pin, $side, side ){
			if( pin.length === 4){
				if(pin === "1234"){
					$side.addClass("correct-pin");
				} else {
					$side.addClass("wrong-pin");
				}
			} else {
				$side.removeClass("wrong-pin correct-pin");
			}	
		}
	},
 
	
	/*
	Build DOM (use fragments to avoid re-flowing the DOM)
	*/
	
	buildDataList:function( dataArrOfObjs ){
		
		let fragment = document.createDocumentFragment();
			
		dataArrOfObjs.forEach( obj => {
			let li = document.createElement('li');
			li.textContent = obj.li;
			fragment.appendChild(li);
		});
		
		return fragment;
	},
	
	/*
	Need to show different table data states.
	Progress: show who completed one of the drugs and when
	Done: show all as completed	
	*/
	buildDataTable:function( dataArrOfObjs, status ){
		
		let fragment = document.createDocumentFragment();
		let count = 1;
		
		dataArrOfObjs.forEach( obj => {
			
			
			let tr = document.createElement('tr');
			let tds = obj.tr.split(';');
			
			tds.forEach( data => {
				let td = document.createElement('td'); 
				
				switch( data ){
					case 'R':
					td.innerHTML = '<span class="oe-eye-lat-icons"><i class="oe-i laterality R small pad"></i><i class="oe-i laterality NA small pad"></i></span>';
					break;
					case 'L':
					td.innerHTML ='<span class="oe-eye-lat-icons"><i class="oe-i laterality NA small pad"></i><i class="oe-i laterality L small pad"></i></span>';
					break;
					case "B":
					td.innerHTML ='<span class="oe-eye-lat-icons"><i class="oe-i laterality R small pad"></i><i class="oe-i laterality L small pad"></i></span>';
					break;
					
					default: td.innerHTML = data;
				}
				
				tr.appendChild(td);
			});
			fragment.appendChild(tr);
			
			/*
			Hack to demo the UI / UX states
			*/
			if(status == "done") addWhoWhen();
			if(status == "progress" && count == 1) addWhoWhen();
			
			count++;
			
		});
		
		function addWhoWhen(){
			let tr = document.createElement('tr');
			tr.setAttribute('class', 'administer');
			
			let td = document.createElement('td')
			td.innerHTML = '';
			tr.appendChild(td);
			
			// Who when
			td = document.createElement('td'); 
			td.innerHTML = 'HCA: F. Nightingale at 11:12';
			tr.appendChild(td);
			
			// tick!
			td = document.createElement('td'); 
			td.innerHTML = '<i class="oe-i tick small pad"></i>';
			tr.appendChild( td );
			
			fragment.appendChild(tr);
			
		}
		
		
		return fragment;
	}
	
	
}
/*
Sidebar Date Filter
*/
idg.sidebarDateFilter = function(){
	
	if( $('.datepicker-to').length == 0 ) return;

	/*
	Sidebar: Date Range	
	*/
	pickmeup('.datepicker-to',{
		format	: 'd b Y',
		default_date: false,
		hide_on_select : true,
	});
	
	pickmeup('.datepicker-from',{
		format	: 'd b Y',
		default_date: false,
		hide_on_select : true,
	});
	
	$('#sidebar-clear-date-ranges').click(function(){
		$('input.date').val("");
	});

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
			var leftPos, toolCSS; 
		
			// get icon DOM position
			let iconPos = $(this)[ 0 ].getBoundingClientRect();
			let iconCenter = iconPos.width / 2;
			
			// check for the available space for tooltip:
			if ( ( $( window ).width() - iconPos.left) < 100 ){
				leftPos = (iconPos.left - 188) + iconPos.width // tooltip is 200px (left offset on the icon)
				toolCSS = "oe-tooltip offset-left";
			} else {
				leftPos = (iconPos.left - 100) + iconCenter - 0.5 	// tooltip is 200px (center on the icon)
				toolCSS = "oe-tooltip";
			}
			
			// add, calculate height then show (remove 'hidden')
			var tip = $( "<div></div>", {
								"class": toolCSS,
								"style":"left:"+leftPos+"px; top:0;"
								});
			// add the tip (HTML as <br> could be in the string)
			tip.html(text);
			
			$('body').append(tip);
			// calc height:
			var h = $(".oe-tooltip").height();
			// update position and show
			var top = iconPos.y - h - 25;
			
			$(".oe-tooltip").css({"top":top+"px"});
			
		},
		function(){
			$(".oe-tooltip").remove();
		}
	);	
}
/*
Clinic steps and Patient actions steps in WS
*/
idg.userPIN = {

	/*
	init
	*/	
	init:function(){
		/*
		do we have elems?
		*/
		if( $('.oe-user-pin').length){
			/*
			Use $ for DOM work
			*/
			$('.oe-user-pin').each(function( ){
				idg.userPIN.demoInput( $(this) );
			});
		}
	}, 
	
	demoInput:function( $div ){
		let $input = $('.user-pin-entry', $div);
				
		$input.on('input',function(){
			let pin = $(this).val();
			$div.removeClass('accepted-pin wrong-pin');
			
			if(pin.length == 4){
				if (pin == '1234'){
					$div.addClass('accepted-pin');
				} else {
					$div.addClass('wrong-pin');
				}
			}
			
		});
		
	}	
	
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
			// and don't overlay Logo or Patient Name
			var posH = (h - btnPos.bottom);
			if(h - posH < 310){
				posH = h - 315;
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
		
		// modify the main area to allow for 
		// compact search area:
		$('.main-event').addClass('examination-search-active');
		
	
		$('.close-icon-btn').click(function(){
			$('#js-search-in-event-popup').hide();
			$('#js-search-in-event').removeClass('selected');
			$('#js-search-event-input-right').val('');
			$('#js-search-event-results').hide();
			
			$('.main-event').removeClass('examination-search-active');
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
Reduce Increase height
*/
idg.reduceElementHeight = function(){
	// find and set up all
	$('.js-reduce-element-height-btn').each(function(){
		
		var elementID = $(this).data('id');
		var tiles = new ReduceElementHeight ( 	$(this), elementID );
	});
	
	function ReduceElementHeight( $icon, elementID ){
		
		var reduced = false;
		var $element = $('#'+elementID);
		// var $header = $element.find('.element-title');
		
		$icon.click(function(){
			changeHeight();
		});		
		
		function changeHeight(){
			if(reduced){
				$element.removeClass('reduced-height');			
			} else {
				$element.addClass('reduced-height');
			}
			
			$icon.toggleClass('increase-height-orange reduce-height');
			reduced = !reduced;
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
				var dataState = $('<span class="element-data-count js-data-hidden-state"> [0]</span>');
					
				//$tiles.append( collapseIcon.click( change ) );
				
				$tiles.find('.element-title').append( dataState );
				
			} else {
				// $tiles.find('.js-data-collapsed-icon').remove();
				$tiles.find('.js-data-hidden-state').remove();
				$tiles.find('.element-data').show();
				// is there an overflow flag?
				$tiles.find('.tile-more-data-flag').show();
			}
			
			$icon.toggleClass('reduce-height increase-height');
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
Homepage Message expand / contract 	
- used in WorkList and Trials
**/
idg.WorkListFilter = function(){
	
	if( $('.js-list-filter').length == 0 ) return;
	
	$('.js-list-filter').each(function(){
		$(this).click( function(e){
			e.preventDefault();
			resetFilters();
			$(this).addClass('selected');
			updateListView( $(this).data('list') );
			
		});
	});
	
	function resetFilters(){
		$('.js-list-filter').removeClass('selected');
	}
	
	function updateListView( listID ){
		if(listID == 'all'){
			$('.js-filter-group').show();
		} else {
			$('.js-filter-group').hide();
			$('#'+listID).show();	
		}
	}
	
	
	
}

/*
Dirty demo to show data insertion into IDG Elements where required
*/
idg.addSelectInsert.updateElement = {
	test:function( arr ){
		idgTest.report( 'test insert' );
	}
}
/*
Optional Lists based on List selection
find group ID: 	"add-to-{uniqueID}-listgroup{n}";
find list ID: 	"add-to-{uniqueID}-list{n}";

@param dependents: String e.g. "2.1" or "2.1,2.2": 
*/

idg.addSelectInsert.OptionDependents = function( dependents, listId ){

	if(dependents === undefined)  return false;
	
	/*
	List has extra list options	
	*/
	const idPrefix = "#add-to-" + listId + "-";
	let groups = [];
	
	/*
	Can be mulitple list groups.
	Check string for commas "2.1,2.2" for groups
	*/
	dependents.split(',').forEach( group => {

		let ids = group.split('.');
		let obj = {};
		// find group
		obj.$group 	= $(idPrefix + 'listgroup'+ids[0] ); 		// <div> wrapper for optional lists
		obj.$holder = obj.$group.find('.optional-placeholder'); // default placeholder for Optional Lists

		/*
		Does it have lists, or show default text?
		e.g. 2.0
		*/
		if( ids[1] == 0 ){
			obj.showDefaultText = true;
		} else {
			obj.showDefaultText = false;
			/*
			Loop through option lists required
			e.g. 2.4.5 (two lists in group '2')
			*/
			obj.lists = [];
			for(let i=1;i<ids.length;i++ ){
				obj.lists.push( $(idPrefix + 'list'+ids[ i ] ) )
			}
		}
		
		groups.push( obj );
		
	});

	/*
	Methods
	*/
	this.show = function( show ){
		if(show){
			/*
			hide ALL optional lists
			$('#add-to-'+listId+' .optional-list').hide();
			*/
			this.myLists();
		} else {
			// unclick
			this.reset();
		}
	}

	this.myLists = function(){

		groups.forEach( group => {
			/*
			in group hide other lists
			*/
			group.$group.children('.optional-list').hide();
			
			if(group.showDefaultText){
				group.$holder.show();
			} else {
				group.$holder.hide();
				// show required Lists
				group.lists.forEach( list => {
					list.show();
				});
			}
			
		});
	}
	
	/*
	Reset (these!) groups!	
	*/
	this.reset = function(){
		groups.forEach( group => {
			group.$group.children('.optional-list').hide();
			group.$holder.show();
		});
	}	
}


 
/*
List Options Constructor
*/

idg.addSelectInsert.ListOption = function ( $li, optionList ){
	
	const _value = $li.data('insert').value;	
	let _selected = $li.hasClass('selected') ? true : false; // check not setup to be selected:
	
	/*
	Does list have any dependency lists?
	*/
	let dependentsData = $li.data('insert').dependents;
	let dependents = false;
	if( dependentsData !== undefined ){
		// build dependents
		dependents = new idg.addSelectInsert.OptionDependents( dependentsData , optionList.uniqueId );
	}

	/*
	Methods
	*/ 
	this.click = function(){
		this.toggleState();
		optionList.optionClicked( _selected, this );

		if(dependents != false){
			dependents.show( _selected );
		}
		
	}
	
	this.toggleState = function() {
		$li.toggleClass('selected'); 
		_selected = !_selected;
	}	
	
	this.deselect = function(){
		if( _selected ){
			this.toggleState();
		}
	}
	
	
	Object.defineProperty(this, 'selected',{
		get: () => {
			return _selected;
		}
	});
	
	Object.defineProperty(this, 'value',{
		get: () => {
			return _value;
		}
	});


	/*
	Events 
	*/
	$li[0].addEventListener( "click", this.click.bind( this ) );
}

/*
Add Select Search insert  
List Constructor
*/

idg.addSelectInsert.OptionsList = function ( $ul ){

	let dataObj = $ul.data('options'); // JSON object created in the HTML DOM. No need to parse.
	const single 			= dataObj.type == 'single' ? true : false ;				
	// some assumptions here... 
	const hasOptions 		= (dataObj.hasExtraOptions == 'true');
	const isOptionalList 	= (dataObj.isOptionalList == 'true');
	
	/*
	Props
	*/ 
	this.uniqueId  = $ul.data('id'); // passes in DOM id (unique part) 
	
	/*
	Optional List? 
	Needs hiding. The List Option it depends on will show
	it when it's clicked	
	*/
	if(isOptionalList) $ul.parent().hide();
	 
	/*
	Store all List Options	
	*/
	let me = this; // hmmm... this could be better.
	let options = [];
	
	$('li', $ul).each( function(){
		options.push( new idg.addSelectInsert.ListOption( $(this), me ) );
	});
	
	/*
	Methods	
	*/
	this.optionClicked = function( selected, listOption ){
		/*
		Manage this list. Multi is the default	
		*/
		if(selected){
			if(single){
				options.forEach( option => {
					if(option !== listOption) option.deselect();
				});
			}
		} 
	}
	
	this.gatherData = function(){
		let data = [];
		
		options.forEach( option => {
			if( option.selected ){
				if(isOptionalList){
					/*
					Only get the data from visible options
					*/
					if( $ul.parent().is(":hidden") == false ){
						data.push( option.value );
					}
				} else {
					data.push( option.value );
				}
			}
		});
		
		return data.join(', ');
	}
			
}

/*
Add Select Search insert  
Popup Constructor
*/

idg.addSelectInsert.Popup = function ( $btn, popupID ){	
	
	let $popup = $('#'+popupID);
	const reset = true;
	const require = false; 
	const callback = $popup.data('callback');  // optional
	
	/*
	Using in analytics to build the data filters. Popup
	needs to anchor left. Can not rely to x < n to do this.
	Checking therefore the data- 
	*/
	
	this.anchorLeft = $popup.data('anchor-left') ==! undefined ? true : false;
	
	/*
	Props
	*/ 
	this.$btn = $btn;  
	this.$popup = $popup;
	
	/*
	Methods
	*/
	this.open = function(){
		this.positionFixPopup();
		this.onScrollClose();
		idg.addSelectInsert.closeAll();
		$popup.show();
	}
	
	this.close = function(){
		$popup.hide();		
	}
	
	this.reset = function(){
		// reset (to default state)
	}
	
	this.insertData = function(){
		/*
		gather data and send to callback (if requested)
		*/
		let JSONdata = []
		lists.forEach( list => {
			JSONdata.push( list.gatherData() );
		});
		
		/*
		callback handles Element insert demo
		*/
		if( callback != undefined){
			idg.addSelectInsert.updateElement[callback]( JSONdata );
		}
		
		this.close();
	}
	
	/*
	Store lists
	*/
	let lists = [];
	
	$('.add-options',$popup).each( function(){
		lists.push( new idg.addSelectInsert.OptionsList( $(this) ) );
	});
	
	/*
	Setup Btn Events. 
	*/
	idg.addSelectInsert.btnEvent( this, $btn, this.open );
	idg.addSelectInsert.btnEvent( this, $popup.children('.close-icon-btn'), this.close );
	idg.addSelectInsert.btnEvent( this, $popup.find('.add-icon-btn'), this.insertData );
	  					
}

/*
Set up Btn click events
*/
idg.addSelectInsert.btnEvent = function ( popup, $btn, callback ){
  	$btn.click(function(e) {
  		e.stopPropagation();
  		callback.call(popup);
	});	  					
}


idg.addSelectInsert.Popup.prototype.onScrollClose = function(){
	/*
	Close popup on scroll.
	note: scroll event fires on assignment.
	so check against scroll position
	*/	
	let popup = this;	
	let scrollPos = $(".main-event").scrollTop();
	$(".main-event").on("scroll", function(){ 
		if( scrollPos !=  $(this).scrollTop() ){
			// Remove scroll event:	
			$(".main-event").off("scroll");
			popup.close();
		}
			
	});

}

/*
Set up Btn click events
*/

idg.addSelectInsert.Popup.prototype.positionFixPopup = function(){
	/* 
	Popup is FIXED positioned, work out offset position based on button
	To do this proved easer with Vanilla JS
	*/
	let elem = this.$btn[ 0 ];
	let btnPos = elem.getBoundingClientRect();		
	let w = document.documentElement.clientWidth;
	let h = document.documentElement.clientHeight;
	
	let posH = (h - btnPos.bottom);
	
	// check popup doesn't go off the top of the screen 
	// and don't overlay Logo! or Patient Name
	if(h - posH < 325){
		posH = h - 325;
	}
	
	/*
	Popup can be 'requested' to anchor left.
	Only used in Analytics (so far)	
	*/
	if( this.anchorLeft ){
	
		this.$popup.css(	{	"bottom": posH + 'px',
								"left": btnPos.left + 'px' });
		
	} else {
		// is popup pushing off the left
		let leftSideEdge = btnPos.right - this.$popup.width();
		let adjustRight =  leftSideEdge < 0 ? leftSideEdge - 25 : 0;
	
		this.$popup.css(	{	"bottom": posH + 'px',
								"right": (w - btnPos.right) + adjustRight + 'px' });
		
	}
	
	
	
	
	
	

}
