/** 
Inital setup for Active steps
and also setups the info popup	
**/
clinic.setupActiveInfo = function(){

	/**
  	Events
  	**/
	$('#js-active-step-info .js-close-btn').click(function( e ){
  		e.stopPropagation();
  		clinic.activeInfo.hide();
	});
		
	// activate this task
	$('#js-activate-task').click(function( e ){
  		clinic.activeInfo.activate();
	});
		
	// tick icon Right | Left
	// a successful pin in either one will work
	$('#js-submit-pin-right').click(function( e ){
  		clinic.activeInfo.pin( $('#js-user-pin-right').val(), 'right' );
	});
		
	$('#js-submit-pin-left').click(function( e ){
  		clinic.activeInfo.pin( $('#js-user-pin-left').val(), 'left' );
	});
		
	// trash icon 
	$('#js-trash-active-step').click(function( e ){
  		clinic.activeInfo.removeStep();
	});
		
		
		
	/**
  	Handle active-step-info application logic 
  	**/
	clinic.activeInfo = {
  		
  		activeStep:null,
  		
  		removeStep:function(){
	  		this.activeStep.remove();
	  		this.hide();
  		},
  		
  		activate:function(){
	  		clinic.makeStepActive( this.activeStep );
	  		this.hide();	
  		},
  		
  		pin:function( code, side ){
	  		if( code === '1234'){
		  		
		  		clinic.stepComplete( this.activeStep );
		  		this.hide();
		  		
	  		} else {
		  		$('.eye-confirmation.'+side).addClass('wrong-pin');
		  		$('#js-user-pin-'+side).focus();
	  		}
  		},
  		
  		show:function( left, top, $step ){
	  		
	  		clinic.addPathway.hide() // hide addPathway options
	  		
	  		$('.eye-confirmation').removeClass('wrong-pin');
	  		
	  		this.activeStep = $step;
	  		var data = $step.data('data');
	  		
	  		/**
	  		Set up text for all the data
	  		**/
	  		$('#js-active-step-info .title').text( data.n );
	  		$('#js-active-step-info .eye .side').text( data.eye );
	  		$('#js-active-step-info .data').html( data.t );
	  		
	  		// show and position correctly
			$('#js-active-step-info')
				.removeClass('hidden')
				.show()
				.css({'left':left, 'top':top });
				
			// setup depending on 'state'	
			$('#js-activate-task').hide();
			$('#js-pin-confirmation').hide();
			$('#js-who-completed').hide();
			$('#js-trash-active-step').show(); // trash 
			
			function showEyeInput( eye ){
				eye = eye.toLowerCase();
				switch( eye ){
					case 'right':
						$('#js-pin-confirmation .eye-confirmation.left').hide();
						$('#js-pin-confirmation .eye-confirmation.right').show();
					break;
					case 'left':
						$('#js-pin-confirmation .eye-confirmation.left').show();
						$('#js-pin-confirmation .eye-confirmation.right').hide();
					break;
					default:
						$('#js-pin-confirmation .eye-confirmation.left').show();
						$('#js-pin-confirmation .eye-confirmation.right').show();
				}
			}
			
			switch(data.state){
				case 'ready': 		$('#js-activate-task').show();
				break;
				case 'active': 		$('#js-pin-confirmation').show();
									showEyeInput( data.eye );
				break;
				case 'complete': 	$('#js-who-completed').show();
									$('#js-trash-active-step').hide();		
				break;
			}
		},
			
		hide:function(){
  			this.activeStep = null
  			$('.input-confirmation').removeClass('wrong-pin');
			$('#js-active-step-info').hide();
		}
	};  		
}