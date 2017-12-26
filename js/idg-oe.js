/**
IDG Demo JS
Provided to demo & review UI design concept work on idg.knowego.com
Loaded on all pages, js activates depending on the DOM setup
**/
var idg = idg || {};

idg.init = function(){	

	/**
	- OpenEyes logo, info and theme switcher
	- Shortcuts Nav in <header> 
	- Activity panel
	**/ 
	var openeyes 	= new idg.NavBtnPopup( 'logo', $('#js-openeyes-btn'), $('#js-openeyes-info') );
	var shortcuts 	= new idg.NavBtnPopup( 'shortcuts', $('#js-nav-shortcuts-btn'), $('#js-nav-shortcuts-subnav') ).useWrapper( $('#js-nav-shortcuts') );
	var activity 	= new idg.NavBtnPopup( 'activity', $('#js-nav-activity-btn'), $('#js-activity-panel') );
	
	// Fix Activity Panel if device width is wide enough (but don't fix in OEscape)
	if( ! $('#oescape-layout').length ){
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
	
	// Patient Banner
	idg.patientPopups.init();
	
	// Collapse Groups: e.g. Management Summaries in Popup and Edit Element groups in sidebar
	idg.collapseGroups();
	
	// lightening viewer
	idg.lighteningViewer();
	
	// Tooltips on info icons
	idg.tooltips();
	
	// full overlay popup content (Eyedraw App, Add New Event)
	idg.overlayPopup( 	'.js-demo-open-eyedraw-app',  	// 2x + icons in Examination Edit
						'eyedraw-edit-app.php', 		// Demo content
						'#js-demo-eyedraw-app-close' );	// Eyedraw App uses the 'canel' button to close
						
	// Add New Event in SEM view mode
	idg.overlayPopup(	'#js-add-new-event',			// SEM header button
						'add-new-event.php',			// PHP
						'.close-icon-btn',				// wraps remove icon
						fakeAddNewEvent );				// callBack				
	
	// IDG demo some interaction
	function fakeAddNewEvent( $overlay ){
		// fake the links on Events
		 $overlay.find('.step-3').click(function(){
			  window.location = $(this).data('url');
		 });
	}
	
	// Exam Edit Right Left Search popup demo
	idg.examElementSearchPopup();
	
	// SEM View sidebar: Quicklook and QuickView
	idg.sidebarQuickInfo();
	
	// Comments
	idg.comments();
	
	// Add Search and Autocomplete
	idg.elementAddSearchType();
	
										
};


/*
Lightening Letter Viewer
Icon in the Patient banner area links to the 
Letter Viewer page for the patint
*/
idg.lighteningViewer = function(){
	
	// if on the letter viewing page  
	// set icon to active 
	if(window.location.pathname == '/v3.0/lightening-letter-viewer'){
		$('#js-lightening-viewer-btn').addClass('active');
		return;	
	};
	
	// Events
	$('#js-lightening-viewer-btn').click(function( e ){
		e.stopPropagation();
		window.location = '/v3.0/lightening-letter-viewer';
	})
	.mouseenter(function(){
		$(this).addClass( 'active' ); 
	})
	.mouseleave(function(){
		$(this).removeClass( 'active' ); 
	});	
},
/**
All Patient Popups 
Manage them to avoid any overlapping	
**/
idg.patientPopups = {
	
	init:function(){
		
		if( $('#oe-patient-details').length == 0 ) return;
		
		// patient popups
		var quicklook 		= new idg.NavBtnPopup( 'quicklook', $('#js-quicklook-btn'), $('#patient-summary-quicklook') );
		var demographics 	= new idg.NavBtnPopup( 'demographics', $('#js-demographics-btn'), $('#patient-popup-demographics') );
		var risks 			= new idg.NavBtnPopup( 'risks', $('#js-allergies-risks-btn'), $('#patient-popup-allergies-risks') );
		var tasks 			= new idg.NavBtnPopup( 'tasks', $('#js-tasks-btn'), $('#patient-popup-tasks') );
		
		var all = [ quicklook, demographics, risks, tasks ];
		
		for( pBtns in all ) {
			all[pBtns].inGroup( this ); // register group with PopupBtn 
		}
		
		this.popupBtns = all;
		
		/**
		Problems and Plans
		These are currently in quicklook popup
		**/
		if( $('#problems-plans-sortable').length ){
			idg.problemsPlans();
		}
	},

	closeAll:function(){
		for( pBtns in this.popupBtns ){
			this.popupBtns[pBtns].hide();  // close all patient popups
		}
	}

}

/*
Problems &  Plans sortable list 
In patient quicklook 
- requires Sortable.js
*/
idg.problemsPlans = function(){
	// make Problems & Plans Sortable:
	var el = document.getElementById( 'problems-plans-sortable' );
	var sortable = Sortable.create( el );
		
	// Add New Plan / Problem	
	$('#js-add-pp-btn').click(function(){
		var input = $('#create-problem-plan');
		var val = input.val();
		if( val === '') return;				
		var html = '<li><span class="drag-handle">&#9776;</span>'+ val +'<div class="remove">&times;</div></li>';
		$('#problems-plans-sortable').append( html );
		input.val(''); // refresh input
	}); 

	// remove a Problem Plan
	$('#problems-plans-sortable .remove').click(function(){ 
  		$(this).parent().remove(); 
  	});
}
/*
SEM Element - Add or Search
Popup to add selected list to element
(optional - autocomplete field)
No functionality, demoing basic UI & UX
*/
idg.elementAddSearchType = function(){
	
		$('.js-add-select-type').each(function(){
			var addBtn = new AddSearchType( 	$(this),
												$(this).parent().children('.oe-add-select-type') );
			
		});
	
		function AddSearchType( $btn, $popup ){

	  		var auto = $popup.find('.type-search-autocomplete'),
	  			results = $popup.find('.type-search-results'),
	  			cancelBtn = $popup.find('.oe-add-select-type-cancel');
			
			
			$btn.click( function( e ){
				e.stopPropagation();
				open();
			});
			
			function open(){
				$popup.show();
				results.hide(); // hide autocomplete results until keypress
		  		
		  		// fake input ajax search
		  		auto.keypress(function() {
			  		if(auto.val() === 'au'){
				  		results.show(); // show fake autocomplete results
			  		}
				});
			}

			// faking interaction of selecting an item, does nothing.
	  		$popup.find('.oe-ast-options > li').click(function(){
		  		close(); 
	  		});
	  		
	  		// remove icon
	  		cancelBtn.click(function(){
		  		close();
	  		});
			
			// Close and reset
	  		function close(){
		  		results.hide();
		  		auto.val('');
		  		$popup.hide();
	  		}
			
		}
}
/*
Right Left Element searching in Examination Edit mode
All content in popup is static and the inputs only 
show the popup behaviour
*/
idg.examElementSearchPopup = function(){
	var el = document.getElementById('elements-search-results');
	if(el === null) return; 
	
	// inputs
	$('#js-element-search-right').focus(function(){
		showPopup();
	}).focusout(function(){
		$(this).val('');
	});
	
	$('#js-element-search-left').focus(function(){
		showPopup();
	}).focusout(function(){
		$(this).val('');
	});

	
	// popup
	function showPopup(){
		$('#elements-search-results').show();
	
		$('.lvl1').click(function(){
			$('#elements-search-results').hide();
		})
		$('.close-icon-btn').click(function(){
			$('#elements-search-results').hide();
		});
	}		
}
/*
Sidebar Events Quicklook & Quickview
- Quicklook: Event Title and Message
- Quickview: Popup with event Screenshot
*/
idg.sidebarQuickInfo = function(){
	
	if( $('.events').length == 0 ) return;
	
	$('.events .event').each(function(){	
		var quicklook = new Quicklook( $('.event-type', this),
									   $('.quicklook', this) );
	});
	
	function Quicklook( $icon, $quicklook ){
		
		$icon.hover(function(){
			$quicklook.removeClass('hidden').show();
			showQuickView( $(this).data('id'), $(this).data('date') );
		},function(){
			$quicklook.hide();
			hideQuickView();
		});
	}
	
	/**
	Demo the Quick View for Events
	Shows a scaled screen-shot of the event page
	**/
	
	// hide all QuickView screen shots
	$("[id^=quickview]").hide();

	var prevID = null;
	var $quickView = $('#js-event-quickview'); 
	
	function showQuickView( id, date ){
		$quickView.stop().fadeIn(50);
		$('#quickview-'+prevID).hide();
		$('#quickview-'+id).show();
		$('#js-quickview-date').text( date );
		prevID = id;
	}
	
	function hideQuickView(){
		$quickView.stop().fadeOut(150);	// Using fadeOut to stop a flicking effect
	}

}
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



/**
Collapse Group
Uses the DOM and CSS hooks
**/
idg.collapseGroups = function(){
	// find and set up all collapse-groups
	$('.collapse-group').each(function(){
		var group = new CollapseGroup( 	$(this).find( '.collapse-group-icon .oe-i' ), 
										$(this).find( '.collapse-group-header' ), 
										$(this).find( '.collapse-group-content' ),
										$(this).data('collapse') );
	});
	
	function CollapseGroup( icon, header, content, initialState ){
		var $icon = icon, 
			$header = header, 
			$content = content,
			expanded = initialState == 'expanded' ? true : false;
			
		$icon.click(function(){
			change();
		});	
	
		$header.click(function(){
			change();
		});	
		
		function change(){
			if(expanded){
				$content.hide();
			} else {
				$content.removeClass('hidden').show();
			}
			
			$icon.toggleClass('minus plus');
			expanded = !expanded;
		}	
	}	
}
/**
Comments
**/
idg.comments = function(){
	/**
	Comments icon is clicked on to reveal 
	commets input field. Either:
	1) Textarea switches places with icon button
	2) Textarea is shown in different DOM placement  
	**/
	$('.js-add-comments').click(function( e ){
		e.stopPropagation();
		$(this).hide();
		
		var textAreaID = $(this).data('input');
		if(textAreaID == 'next'){
			$(this).next().removeClass('hidden').focus();
		} else {
			$(textAreaID).removeClass('hidden').focus();
		}
	});
}
/**
Load content as Overlay
- Eyedraw App
- Add New Event	
@param {btn} - ID or Class of btn 
@param {phpToLoad} - PHP file name 
@param {closeBtnID} - ID of close button in overlay content
@param {callBack} - Optional Callback
**/
idg.overlayPopup = function( btn, phpToLoad, closeBtnID, callBack ){
	
	// check DOM exists
	if( $(btn).length ){
		
		$(btn).click(function( e ){
			e.stopPropagation();
			loadOverlay();
		});
	}
	  	
	/**
	Create full screen cover using 'oe-popup-wrap'
	CSS handles the positioning of the loaded DOM
	**/  	
	function loadOverlay(){
		var $overlay = $('<div>');
  		$overlay.addClass('oe-popup-wrap');
  		$overlay.load('/php/v3.0/_load/' + phpToLoad,function(){
	  		closeOverlayBtn( $(closeBtnID, this ), $(this) );
	  		if(callBack) callBack( $overlay );
  		});
  		
  		$('body').prepend($overlay);
	}
	
	/**
	Set up a close button	
	**/
	function closeOverlayBtn( $closeBtn, $overlay ){
		$closeBtn.click(function(){
		  	$overlay.remove();
	  	});
	}
	
}
/*
Basic tooltip functionality. Quick for IDG demo
*/
idg.tooltips = function(){
	$('.js-has-tooltip').hover(
		function(){
			var text = $(this).data('tooltip-content');
			var offset = $(this).offset();
			var html = '<div class="oe-tooltip" style="position:fixed; left:'+(offset.left + 20)+'px; top:'+(offset.top + - 10)+'px;">'+ text +'</div>';
			$(this).data( "tooltip", html );
			$('body').append(html);
		},
		function(){
			$('body').find( ".oe-tooltip" ).remove();
		}
	);	
}