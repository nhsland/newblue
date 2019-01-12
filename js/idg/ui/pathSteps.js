/*
Clinic steps and Patient actions steps in WS
*/
idg.pathSteps = {
	
	/*
	popup is built by JS.
	content and position is then modified for each step	
	*/
	popup:null,
	steps:[],
		
	/*
	init
	*/	
	init:function(){
		/*
		do we have elems?
		*/
		if( $('.pathstep-btn').length){
			
			this.popup = new this.CreatePopup();
			/*
			Use $ for DOM work
			*/
			$('.pathstep-btn').each(function( ){
				idg.pathSteps.setupSteps( $(this) );
			});
		}
	},
	
	/*
	setup Btns
	*/ 
	setupSteps:function( $stepBtn ){
		this.steps.push( new this.StepBtn( $stepBtn, this.popup ) );	
	},
	
	/*
	build Step Btn	
	*/
	StepBtn:function( $btn, popup ){
		const elem = $btn[ 0 ];
		const data = $btn.data("step");

		/*
		Methods
		*/ 
		this.click = function(){
			let btnPos = elem.getBoundingClientRect();
			let w = document.documentElement.clientWidth;
			popup.show( data, btnPos.top, w - btnPos.right  );
		}
		
		/*
		Events 
		*/
		elem.addEventListener( "click", this.click.bind( this ) );	
	},

	/*
	the popup	
	*/
	CreatePopup:function(){
		
		/*
		build Data DOM
		*/
		const $div 		= $('<div class="pathstep-popup"></div>');	
	 	const $close 	= $('<div class="close-icon-btn"><i class="oe-i remove-circle medium"></i></div>');	
	 	const $status 	= $('<div class="step-status">status</div>');
 		const $title 	= $('<h3 class="title"></h3>');
		const $eye 		= $('<div class="eye">Eye: <span class="side"></span></div>');
		const $dataGroup = $('<div class="data-group"></div>');
		const $dataList = $('<ul class="data-list"></ul>');
		
		// pin confirmation
		const $pin		= $('<div class="pin-confirmation"></div>');
		const $pinRight = $('<div class="eye-confirmation right"><h3>Right</h3></div>');
		const $pinLeft = $('<div class="eye-confirmation left"><h3>Left</h3></div>');
		const $inputPinRight = inputPIN('right');
		const $inputPinLeft = inputPIN('left');
	
		function inputPIN( side ){
			return $('<input id="pathstep-user-pin-'+side+'" type="text" maxlength="4" inputmode="numeric" placeholder="****">');
		}
		
		// edit PSD
		const $edit 	= $('<div class="step-actions"><button class="blue hint">Edit PSD</button></div>').hide();
		
		/*
		compile DOM
		*/

		// dataList DOM
		$dataGroup.append( $dataList );
		
		// pin
		$pinRight.append( $inputPinRight );
		$pinLeft.append( $inputPinLeft );
		$pin.append( $pinRight, $pinLeft ).hide();
				
		// build DOM element, and hide it
		$div.append(	$close, 
						$status,
						$title, 
						$eye, 
						$dataGroup,
						$pin,
						$edit ).hide();

		// attach to DOM
		$('body').append( $div );
		
		function resetDOM(){
			$status.removeClass();
			$edit.hide();
			$pin.hide();
		}
		
		/*
		Methods	
		*/
		this.show =function( stepData, top, right){
			// position
			$div.css({ 	top : top,
					 	right: right });
							
			// update popup content
			$title.text( stepData.title );
			$eye.children('.side').text( stepData.eye );
			
			/*
			data is ALL handled as a list	
			*/
			// clear previous data.
			$dataList.children('li').remove();
			// build list
			let list = stepData.data.split(";");
			list.forEach( list => $dataList.append('<li>'+list+'</li>') );	
			
			
			/*
			status	
			*/
			switch( stepData.status ){
				case "done":
					$status.text('Done: 09:20');
					$status.addClass('step-status green');
				break;
				case "todo":
					$status.text('Waiting');
					$status.addClass('step-status orange');
					$edit.show();
					$pin.show();
				break;
				case "problem":
					$status.text('Problem! e.g. Patient has left');
					$status.addClass('step-status red');
					$edit.show();
					$pin.show();
				break;
				
				default: $status.text('no status');
			}
					
			
			// now show it
			$div.show();
		}
		
		this.pinRightChange = function( e ){
			checkPin( e.target.value, $pinRight, "right");
		}
		
		this.pinLeftChange = function( e ){
			checkPin( e.target.value, $pinLeft, "left");
		}
		
		function checkPin( pin, $side, side ){
			if( pin.length === 4){
				if(pin === "1234"){
					$side.addClass("correct-pin");
				} else {
					$side.addClass("wrong-pin");
				}
			} else {
				$side.removeClass("wrong-pin correct-pin");
			}
			
		}
	
		this.close = function(){
			$div.hide();
			resetDOM();
		}
		
		

		/*
		Events
		*/
		$close[0].addEventListener( "click", this.close.bind( this ) );
		$inputPinRight[0].addEventListener("input", this.pinRightChange.bind( this ));
		$inputPinLeft[0].addEventListener("input", this.pinLeftChange.bind( this ));
		
		
	}
	
}