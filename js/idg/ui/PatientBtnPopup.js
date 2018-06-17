/**
Patient Popup Buttons 
@ id - id
@ $btn - structurally as <a> but without CSS pseudos :hover, :focus, :active
@ $content - DOM content to show on click 

UX: on $btn MouseEvents show the popups (only on the $btn).
click (touch), locks the popup open. click (touch) to close it 

**/
idg.PatientBtnPopup = function(id,$btn,$content){
		
	// set up vars
	var id = id,
		contentPopup = false,
		useClick = false,
		useMouse = false,
		isGrouped = false, 		
		groupController = null,
		css = { 
			active:'active', 	// hover
			open:'open' 		// clicked 
		};	
		
	/**
	public methods
	**/
	this.inGroup = inGroup;
	this.hide = reset;
	
	/**
	Events
	**/
	$btn.click( function( e ){
			e.stopPropagation();
			clickChange();				// touch (click)
			})							
		.mouseenter( mouseShow )		// MouseEvent enhancements
		.mouseleave( mouseHide );	
	
	/**
	Handlers
	click / touch 
	**/
	function clickChange(){
		
		if(contentPopup){
			if(useMouse){
				// user wants to lock it, switch to click events
				useClick = true;
				useMouse = false;
			} else {
				hideContent();
			}
		} else {
			showContent();
		}		
	}	  	
		  
	function mouseShow(){
		if(useClick == false){		
			showContent();
			useMouse = true;
		}
	}	
	
	function mouseHide(){
		// has user clicked to lock open?
		if(useClick == false){
			hideContent();
			useMouse = false;
		}
	}  
	
	/**
	View	
	**/	  
  	function showContent(){
	  	// only 1 Patient Popup open at a time:
	  	if(isGrouped) groupController.closeAll();

	  	$content.show();
	  	contentPopup = true;
	  	$btn.addClass( css.open );
  	}
  	
  	function hideContent(){
	  	$content.hide();
	  	contentPopup = false;
	  	$btn.removeClass( css.open );
	}
	
	// called by the groupController
	function reset(){
		hideContent();
		useClick = false;
		useMouse = false;
	}

	/**
	Group popups to stop overlap	
	**/
	function inGroup( controller ){
		isGrouped = true;
		groupController = controller;
	}	
}


