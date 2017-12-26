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