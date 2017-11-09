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
		oes.stackAnimation( $('.oct-stack'),9,oes.changeOCT );
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
		
		changeAssessmentPanel(n);	// MR demo of Assessment Panel
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
		var octBtn = $('#js-oct-btn');
		var ffaBtn = $('#js-ffa-btn');
		var imgBtn = $('#js-img-btn');
		
		var stackOCT = $('.oct-stack');
		var stackFFA = $('.ffa-stack');
		var stactIMG = $('.img-stack');
		var assPanel = $('.oes-assessment-panel');
		
		// default
		octBtn.addClass('selected');
		
		octBtn.click( function(){
			resetStacks();
			stackOCT.show();
			assPanel.show();
			
			$(this).addClass('selected');
		});
		
		ffaBtn.click( function(){
			resetStacks();
			stackFFA.removeClass('hidden').show();
			assPanel.show();
			
			$(this).addClass('selected');
		});
		
		imgBtn.click( function(){
			resetStacks();
			stactIMG.removeClass('hidden').show();
			
			$(this).addClass('selected');
		});
		
		function resetStacks(){
			ffaBtn.removeClass('selected');
			octBtn.removeClass('selected');
			imgBtn.removeClass('selected');
			
			stackOCT.hide();
			stackFFA.hide();
			stactIMG.hide();
		}
		
	}
		
};

$(document).ready(function() {
	// init
	oes.init();
});







