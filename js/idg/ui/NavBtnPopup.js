/**
Create 'buttons' for nav menus, 3 different flavours: standard, wrapped and fixed
- standard: $btn open/closes the popup $content (seperate DOM element). MouseEnter/Leave provides increased functionality for non-touch users
- wrapped: 'btn' & popup $content wrapped by shared DOM (shortcuts menu), wrapper is used for the eventObj
- fixed: When the browser width is wide enough CSS fixes open the Activity Panel 
@ $btn - structurally as <a> but without CSS pseudos :hover, :focus, :active
@ $content - DOM content to show on click 
@ wrap - shortcuts has a DOM wrapper, this displays on hover.
**/
idg.NavBtnPopup = function(id,$btn,$content){
		
	// private
	var id = id,
		eventObj = $btn,
		useMouseEvents = false,
		isGrouped = false, 		// e.g. patient popups 
		groupController = null,
		isFixed = false,
		css = { 
			active:'active', 	// hover
			open:'open' 		// clicked 
		};	
		
	/**
	public methods
	**/
	this.hide = hide;	
	this.useWrapper = useWrapperEvents;
	this.fixed = fixed;
	this.inGroup = inGroup;
	
		
	init(); // all are initiated but useWrapperEvents modifies the eventObj then re-initiates
		
	/**
	provide a way for shortcuts to re-assign
	the Events to the DOM wrapper
	**/
	function init(){
		// Events
		eventObj.click(function( e ){
			e.stopPropagation();
			// use $btn class as boolean
			changeContent( $btn.hasClass( css.open ) );
		})
		.mouseenter(function(){
			$btn.addClass( css.active ); 
			if( useMouseEvents ) show();
		})
		.mouseleave(function(){
			$btn.removeClass( css.active ); 
			if( useMouseEvents ) hide();
		});
	}

	function changeContent( isOpen ){
		if(isFixed) return; // if popup is fixed
			
		if( isOpen ){
			hide();
		} else {
			if(isGrouped) groupController.closeAll(); 
			show();
		}
	}
	
	function show(){
		$btn.addClass( css.open );
		$content.show();
		if( ! useMouseEvents &&  ! isFixed  ) addContentEvents();
	}
	
	function hide(){
		$btn.removeClass( css.open );
		$content.hide();
	}	
	
	/**
	Enhance $content behaviour for non-touch users
	Allow mouseLeave to close $content popup
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
	DOM structure for the Shortcuts dropdown list is different
	Need to shift the events to the wrapper DOM rather than the $btn	
	**/
	function useWrapperEvents( DOMwrapper ){
		eventObj.off( 'click mouseenter mouseleave' );
		eventObj = DOMwrapper;
		css.open = css.active; // wrap only has 1 class
		useMouseEvents = true;
		init(); // re initiate with new eventObj
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
		}
	}
	
	/**
	Group popups to stop overlapping	
	**/
	function inGroup( controller ){
		isGrouped = true;
		groupController = controller;
	}	
}


