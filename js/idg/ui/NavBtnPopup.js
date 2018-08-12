/**
Create 'buttons' for nav menus, 3 different flavours: standard, wrapped and fixed
- standard: $btn open/closes the popup $content (seperate DOM element). MouseEnter/Leave provides increased functionality for non-touch users
- wrapped: 'btn' & popup $content wrapped by shared DOM (shortcuts menu), wrapper is used for the $eventObj
- fixed: When the browser width is wide enough CSS fixes open the Activity Panel 
@ $btn - structurally as <a> but without CSS pseudos :hover, :focus, :active
@ $content - DOM content to show on click 
**/
idg.NavBtnPopup = function(id,$btn,$content){
		
	// private
	var id = id,
		$eventObj = $btn,
		contentOpen = false,
		mouseOpened = false,
		mouseOutContent = true,
		isFixed = false,	// hotlist
		isLocked = false, 	// hotlist
		css = { 
			active:'active', 	// hover
			open:'open',		// clicked 
			locked:'open' 	// clicked 
		};	
		
	/**
	public methods
	**/
	this.hide = hide;	
	this.show = show;
	this.fixed = fixed;
	this.basic = basic;
	this.useWrapper = useWrapperEvents;
	this.enhanced = advancedEvents;
	
	
	/* 
	JS behaviour to replace CSS pseudos	
	*/
	function CSShover(){
		$eventObj
			.mouseenter(function(){
				$btn.addClass( css.active ); 
			})
			.mouseleave(function(){
				$btn.removeClass( css.active ); 
			});
	}
	

	/**
	Main interaction (for touch/click)
	**/
	function useClick(){
		// Click touch
		$eventObj.click(function( e ){
			e.stopPropagation();
			changeContent();
		});
	}

	/*
	setup
	Basic Touch / click support (no mouse events)	
	*/
	function basic(){
		CSShover();
		useClick();
	}
	
	/**
	DOM structure for the Shortcuts dropdown list is different
	Need to shift the events to the wrapper DOM rather than the $btn	
	**/
	function useWrapperEvents( $wrapper ){
		$eventObj = $wrapper;
		css.open = css.active; 		// wrap only has 1 class
		mouseOutContent = false;	// using DOM wrapper 
		CSShover();
		useClick();
		
		// enhance for Mouse/Track users
		$eventObj
			.mouseenter(function(){ show(); })
			.mouseleave(function(){ hide(); });	
	}

	/**
	Hotlist is structured like Shortcuts but requires a different 
	behaviour, it requires enhanced behaviour touch to lock it open!	
	**/
	function advancedEvents( $wrapper ) {
		$eventObj = $wrapper;
		css.open = css.active;
		mouseOutContent = false;
		CSShover();
		
		/*
		click needs to open / close
		OR if mouseEvents are working
		lock open
		*/
		$btn.click(function( e ){
			e.stopPropagation();
			
			if(mouseOpened && isFixed == false){
				if(isLocked){
					// if open it
					isLocked = false;
					$btn.removeClass( css.locked );
					hide();
				} else {
					isLocked = true;
					$btn.addClass( css.locked );
				}
			
			} else {
				changeContent();
			}
					
		});
		
		// enhance for Mouse/Track users
		$eventObj
			.mouseenter(function(){ 
				mouseOpened = true;
				show(); 
			})
			.mouseleave(function(){ 
				if(isLocked == false) hide(); 
			});	

	}
	

	/**
	Update content state
	**/
	function changeContent( isOpen ){
		if(isFixed) return; // if popup is fixed
		if(isLocked) return; 
			
		if( contentOpen ){
			hide();
		} else { 
			show();
		}
	}
	
	function show(){
		$btn.addClass( css.open );
		$content.show();
		if( mouseOutContent ) addContentEvents();
		contentOpen = true;
	}
	
	function hide(){
		$btn.removeClass( css.open );
		$content.hide();
		contentOpen = false;
		mouseOpened = false;
	}	
	
	/**
	Add mouseLeave enhancement to close $content popup
	**/
	function addContentEvents(){
  		$content.mouseenter(function(){
	  		$(this).off( 'mouseenter' ); // clean up
			$(this).mouseleave(function(){
				$(this).off( 'mouseleave' ); // clean up
				hide();
			});
		});
	}
	
	/**
	Activity Panel needs to be fixable when the browsers is wide enough
	(but not in oescape mode)	
	**/
	function fixed( b ){
		isFixed = b;
		
		if( b ){
			$content.off( 'mouseenter mouseleave' );  		
			show();
		} else {
			hide(); 
			isLocked = false; // reset this too.
		}
	}

}
