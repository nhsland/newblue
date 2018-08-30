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
	
	// OE Filter Options (analytics)
	idg.filterOptions();
	
	// Element subgroups
	idg.elementSubgroup();
	
										
};

