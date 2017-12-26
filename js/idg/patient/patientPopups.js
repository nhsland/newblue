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
