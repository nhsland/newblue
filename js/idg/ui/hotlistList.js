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