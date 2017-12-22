/**
Manage Patient Popups to avoid them overlapping	
**/
idg.patientPopups = {
	
	init:function(){
		// patient popups
		var quicklook = new idg.PopupBtn( 'quicklook', $('#js-quicklook-btn'), $('#patient-summary-quicklook') );
		var demographics = new idg.PopupBtn( 'demographics', $('#js-demographics-btn'), $('#patient-popup-demographics') );
		var risks = new idg.PopupBtn( 'risks', $('#js-allergies-risks-btn'), $('#patient-popup-allergies-risks') );
		var tasks = new idg.PopupBtn( 'tasks', $('#js-tasks-btn'), $('#patient-popup-tasks') );
		
		var all = [ quicklook, demographics, risks, tasks ];
		for( pBtns in all ) all[pBtns].inGroup( this ); // register group with PopupBtn 
		
		this.popupBtns = all;
	},

	closeAll:function(){
		for( pBtns in this.popupBtns ) this.popupBtns[pBtns].hide();  // close all patient popups
	}

}
