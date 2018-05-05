/*
Tile Element - watch for data overflow
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
	  		if( $( window ).width() > 1800){ // min width for fixing Activity Panel (allows some resizing)
				// hotlistPopup.fixed( true );
			} else {
				// hotlistPopup.fixed( false );
			}
		}  
	}
	
	/*
	Hotlist comments.
	The comment icon shows comment status. 
	Clicking on it show / hides the <tr> under it. 	
	*/
	$('.oe-hotlist-panel .js-patient-comments').click(function( e ){
		
		
		var commentBox = $(this).parent().parent().next();
		var textArea = commentBox.find('textarea');
		
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