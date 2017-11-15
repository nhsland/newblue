/*

--------  This is NOT production JS!! ------------

It is simply provided to demo & review UI design work on IDG idg.knowego.com

*/

var oes = {
	
	init:function(){
		
		oes.octNum = 1;
		oes.ffaNum = 1;
		
		// OCT, FFA, Images
		oes.tabButtons();
		
		// stackAnimations
		console.log( $('.oct-stack').children().length-1 );
		
		
		oes.stackAnimation( $('.oct-stack'),$('.oct-stack').children().length,oes.changeOCT );
		oes.stackAnimation( $('.ffa-stack'),2,oes.changeFFA );
	
	},

	
	/*
	* - update OCT images
	* - called by highcharts
	*/	
	changeOCT:function(n){
		if(n === undefined) return; // called by Drug Flags as well so need to ignore them
		
		$('#oct_img_'+oes.octNum).hide();
		$('#oct_img_'+n).removeClass('hidden').show();
		
		oes.octNum = n;
		
		// MR demo of Assessment Panel only:
		var el = document.getElementById('ass-right');
	    if(el !== null){
			changeAssessmentPanel(n);	
		} 
	},
	
	/*
	* - update FFA images
	*/	
	changeFFA:function(n){
		
		if(n === undefined) return; // called by Drug Flags as well so need to ignore them
			
		$('#ffa_img_'+oes.ffaNum).hide();
		$('#ffa_img_'+n).removeClass('hidden').show();
		
		oes.ffaNum = n;	
	},
	
	/*
	* - general stack animation (flick book)
	*/
	stackAnimation:function($stack,imgCount,callBack){
	
		if($stack === null) return; 
		
		$stack.mousemove(function(e) {
			var offset = $(this).offset();
			var xPos = e.pageX - offset.left;
			var w = $(this).width();
			var num = Math.ceil( xPos / ( w / imgCount ) );
				
			if(num === 0) return;
			callBack(num);
  		});
	},

	
	/*
	* - tab buttons for OCT, FFA, Images
	*/
	tabButtons:function(){
		
		
	}
		
};

$(document).ready(function() {
	// init
	oes.init();
});







