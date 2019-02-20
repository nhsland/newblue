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
