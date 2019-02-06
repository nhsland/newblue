/*
Clinic steps and Patient actions steps in WS
*/
idg.pathSteps = {
	
	/*
	popup & quickview is built by JS.
	content and position is then modified for each step	
	*/
	popup:null,
	quickview:null,
	steps:[],
		
	/*
	init
	*/	
	init:function(){
		/*
		do we have elems?
		*/
		if( $('.oe-pathstep-btn').length){
			
			this.popup = new this.CreatePopup();
			this.popup.init(true);
			this.quickview = new this.CreatePopup();
			this.quickview.init(false);
			/*
			Use $ for DOM work
			*/
			$('.oe-pathstep-btn').each(function( ){
				idg.pathSteps.setupSteps( $(this) );
			});
		}
	},
	
	/*
	setup Btns
	*/ 
	setupSteps:function( $stepBtn ){
		this.steps.push( new this.StepBtn( $stepBtn, this.popup, this.quickview ) );	
	},
	
	/*
	build Step Btn	
	*/
	StepBtn:function( $btn, popup, quickview ){
		const elem = $btn[ 0 ];
		const data = $btn.data("step");

		/*
		Methods
		*/ 
		this.click = function(){
			let btnPos = elem.getBoundingClientRect();
			let w = document.documentElement.clientWidth;
			quickview.close();
			popup.show( data, btnPos.top, w - btnPos.right  );
		}
		
		this.enter = function(){
			let btnPos = elem.getBoundingClientRect();
			let w = document.documentElement.clientWidth;
			popup.close();
			quickview.show( data, btnPos.top + btnPos.height, w - btnPos.right );
			
			
		}
		
		this.leave = function(){
			quickview.close();
		}
		
		/*
		Events 
		*/
		elem.addEventListener( "click", this.click.bind( this ) );	
		elem.addEventListener( "mouseenter", this.enter.bind( this ) );
		elem.addEventListener( "mouseleave", this.leave.bind( this ) );
	},

	/*
	info popup. 
	full (on click) and data-only (hover enhancement)	
	*/
	CreatePopup:function(){
		
		this.full = true;
		
		/*
		build Data DOM
		*/
		const $div 		= $('<div class="oe-pathstep-popup"></div>');	
		const $dataGroup = $('<div class="data-group"></div>');
		const $dataList = $('<ul class="data-list"></ul>');
		const $dataTable = $('<table class="data-table"></table>');
		
		// full DOM elements
		let $close 	= null;	
		let $status = null;
		let $title = null;
		let $eye = null;
		let $pin = null;
		let $pinRight = null;		
		let $pinLeft = null;
		let $inputPinRight = null;
		let $inputPinLeft = null;
		let $edit = null;
		
		
		/*
		Methods	
		*/
		this.init = function( full ){
			this.full = full;
			
			if( full ){
				
				$close 	= $('<div class="close-icon-btn"><i class="oe-i remove-circle medium"></i></div>');	
				$status = $('<div class="step-status"></div>');
				$title 	= $('<h3 class="title"></h3>');
				// $eye 	= $('<div class="eye">Eye: <span class="side"></span></div>');
				
				/*
				PIN not being added in this version 
				BUT will be in Clinic list! (when built)	
				
				// PIN not be
				// pin confirmation
				$pin		= $('<div class="pin-confirmation"></div>');
				$pinRight 	= $('<div class="eye-confirmation right"><h3>Right</h3></div>');
				$pinLeft 	= $('<div class="eye-confirmation left"><h3>Left</h3></div>');
				
				function inputPIN( side ){
					return $('<input id="pathstep-user-pin-'+side+'" type="text" maxlength="4" inputmode="numeric" placeholder="****">');
				}
				$inputPinRight = inputPIN('right');
				$inputPinLeft = inputPIN('left');
				
				// pin
				$pinRight.append( $inputPinRight );
				$pinLeft.append( $inputPinLeft );
				$pin.append( $pinRight, $pinLeft ).hide();
				
				*/
		
		
				// edit PSD
				$edit = $('<div class="step-actions"><button class="blue hint">Edit PSD</button></div>').hide();
				
				// dataList DOM
				$dataGroup.append( $dataList, $dataTable );
				
						
				// build DOM element, and hide it
				$div.append(	$close, 
								$status,
								$title, 
								$dataGroup,
								//$pin,
								$edit );
				
				
				/*
				Events
				*/
				$close[0].addEventListener( "click", this.close.bind( this ) );
				//$inputPinRight[0].addEventListener("input", this.pinRightChange.bind( this ));
				//$inputPinLeft[0].addEventListener("input", this.pinLeftChange.bind( this ));
				
			} else {
				$div.addClass("data-only");
				$dataGroup.append( $dataList, $dataTable );
				$div.append( $dataGroup );
				
			}
	
			// attach to DOM
			$div.hide();
			$('body').append( $div );
			
		}
	
		this.show = function( stepData, top, right){
			// position
			$div.css({ 	top : top,
					 	right: right });
					 	
			/*
			data can be either a list or table	
			*/	
			let fragment = null;	
			$dataList.children('li').remove();
			$dataTable.children('tr').remove();
			
			if( stepData.data.type == "list"){
				// build list
				fragment = idg.pathSteps.buildDataList( stepData.data.data );
				$dataList.append( fragment );
			}
			
			if( stepData.data.type == "table"){
				// build table
				fragment = idg.pathSteps.buildDataTable( stepData.data.data );
				$dataTable.append( fragment );
			}
			
			$dataList.append( fragment );	
				
					 	
			if( this.full ){
				// update popup content
				$title.text( stepData.title );
					
				/*
				DOM depends on status	
				*/
				switch( stepData.status ){
					case "done":
						$status.text('HCA: F. Nightingale - 09:20');
						$status.addClass('step-status green');
					break;
					case "todo":
						$status.text('Waiting to do');
						$status.addClass('step-status');
						$edit.show();
						//$pin.show();
					break;
					case "progress":
						$status.text('In progress');
						$status.addClass('step-status orange');
						$edit.show();
						//$pin.show();
					break;
					case "problem":
						$status.text('Problem! e.g. Patient has left');
						$status.addClass('step-status red');
						$edit.show();
						//$pin.show();
					break;
					
					default: $status.text('no status set');
				}
			
			} 
			
			// now show it
			$div.show();
		}		
		
		this.close = function(){
			
			$div.hide();
			
			if( this.full ){
				$status.removeClass();
				$edit.hide();
				//$pin.hide();
			}
		}
	
		/*
		Demo PIN UI
		*/
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
	},
 
	
	/*
	Build DOM (use fragments to avoid re-flowing the DOM)
	*/
	
	buildDataList:function( dataArrOfObjs ){
		
		let fragment = document.createDocumentFragment();
			
		dataArrOfObjs.forEach( obj => {
			let li = document.createElement('li');
			li.textContent = obj.li;
			fragment.appendChild(li);
		});
		
		return fragment;
	},
	
	buildDataTable:function( dataArrOfObjs ){
		
		let fragment = document.createDocumentFragment();

		dataArrOfObjs.forEach( obj => {
			
			console.log(obj);
			
			let tr = document.createElement('tr');
			let tds = obj.tr.split(';');
			tds.forEach( data => {
				let td = document.createElement('td'); 
				
				switch( data ){
					case 'R':
					td.innerHTML = '<span class="oe-eye-lat-icons"><i class="oe-i laterality R small pad"></i><i class="oe-i laterality NA small pad"></i></span>';
					break;
					case 'L':
					td.innerHTML ='<span class="oe-eye-lat-icons"><i class="oe-i laterality NA small pad"></i><i class="oe-i laterality L small pad"></i></span>';
					break;
					case "B":
					td.innerHTML ='<span class="oe-eye-lat-icons"><i class="oe-i laterality R small pad"></i><i class="oe-i laterality L small pad"></i></span>';
					break;
					
					default: td.innerHTML = data;
				}
				
				tr.appendChild(td);
			});
			fragment.appendChild(tr);
		});
		
		return fragment;
	}
	
	
}