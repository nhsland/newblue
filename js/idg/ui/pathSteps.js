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
		
		// build Data DOM
		const $div 		= $('<div class="pathstep-popup"></div>');	
	 	const $close 	= $('<div class="close-icon-btn"><i class="oe-i remove-circle medium"></i></div>');	
	 	const $status 	= $('<div class="step-status">status</div>');
 		const $title 	= $('<h3 class="title"></h3>');
		const $eye 		= $('<div class="eye">Eye: <span class="side"></span></div>');
		const $dataGroup = $('<div class="data-group"></div>');
		const $dataList = $('<ul class="data-list"></ul>');
		
		// data DOM
		$dataGroup.append( $dataList );
				
		// build DOM element, and hide it
		$div.append(	$close, 
						$status,
						$title, 
						$eye, 
						$dataGroup ).hide();

		// attach to DOM
		$('body').append( $div );
		
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
					$status.addClass('green');
				break;
				
				default: $status.text('no status');
			}
					
			
			// now show it
			$div.show();
		}
	
		this.close = function(){
			$div.hide();
		}

		/*
		Events
		*/
		$close[0].addEventListener( "click", this.close.bind( this ) );
	}
	
}