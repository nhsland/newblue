/*
Tile Element - watch for data overflow
*/
idg.activityList = function(activity){
	
	if( $('#js-nav-activity-btn').length == 0 ) return;
		
	// Fix Activity Panel if design allows it to be fixable!
	if( $('#js-nav-activity-btn').data('fixable') == true ){
		checkBrowserSize();
		
		$( window ).resize(function() {
			checkBrowserSize();
		});
		
		function checkBrowserSize(){	
	  		if( $( window ).width() > 1800){ // min width for fixing Activity Panel (allows some resizing)
				activity.fixed( true );
			} else {
				activity.fixed( false );
			}
		}  
	}
	
	// js-pickmeup-closed-date
	
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
	
	$('#js-activity-closed-select').click(function(){
		$pmuWrap.show();
	});
	
	$('#js-activity-closed-today').click(function(){
		pmu.set_date(new Date);
		$('#js-pickmeup-closed-date').text("Today");
	});
}