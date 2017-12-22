/**
IDG demo JS
Provided to demo & review UI design concept work on IDG idg.knowego.com
Loaded on all pages, js activates depending on the DOM setup
**/
var idg = idg || {};

idg.init = function(){	
	
	/**
	used across OE UI	
	**/ 
	
	// OpenEyes logo, info and theme switcher
	var openeyes = new idg.PopupBtn( 'logo', $('#js-openeyes-btn'), $('#js-openeyes-info') );
	
	// Shortcuts Nav in <header> 
	var shortcuts = new idg.PopupBtn( 'shortcuts', $('#js-nav-shortcuts-btn'), $('#js-nav-shortcuts-subnav') );
	shortcuts.useWrapper( $('#js-nav-shortcuts') );
	
	// Activity panel
	var activity = new idg.PopupBtn( 'activity', $('#js-nav-activity-btn'), $('#js-activity-panel') );
	
	/*
	check browser size for fixing Activity Panel
	but don't fix Activity Panel in OEscape
	*/
	if( ! $('#oescape-layout').length ){
		// check it
		checkBrowserSize();
		
		// resize
		$( window ).resize(function() {
			checkBrowserSize();
		});
		
		function checkBrowserSize(){	
	  		if( $( window ).width() > 1800){ // min width for fixing Activity Panel (allows some resizing)
				activity.fixed( true );
			} else {
				activity.fixed( false );
			}
		};  
	}
	

	/**
	Patient Banner, used in SEM	
	**/ 
	
	if( $('#oe-patient-details').length ){
		idg.patientPopups.init();
	}
		
									
};

$(document).ready(function() {
	// init
	idg.init();
	
});