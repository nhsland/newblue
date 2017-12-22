/*

--------  This is NOT production JS!! ------------

It is simply provided to demo & review UI design work on IDG idg.knowego.com

Note: To improve touch device support nav interaction is handle with js.

*/

var oeui = {
	
	init:function(){
		
		
		
		
										
		
										
		// basic side bar event popup 
		// (desktop users only currently, although could be made available for touch)								
		oeui.eventTypeQuicklook();
		
		// tooltips
		oeui.hasTooltip();
		
		// hideShow in popups
		oeui.hideShowBtn();
		
		// problems and plans (sortable)
		oeui.problemsPlans();
		
		// in Element edit mode:
		oeui.eAddSearchType();
		
		// in Element edit mode:
		oeui.eyedrawEditApp();
		
		// Add New Event popup:
		oeui.addNewEvent();
								
		// show comments
		oeui.showComments();
		
		// sidebar grouping 
		oeui.enableGrouping();	
		
		// sidebar grouping 
		oeui.elementSearchPopup();
		
		// event quickview
		oeui.eventQuickView();
		
		// lightening viewer
		oeui.lighteningViewer();
		

	},
	
	/*
	Lightening View (basic version of Quicklook, etc)
	*/
	lighteningViewer:function(){
		
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
	
	/*
	Event Quickview
	*/
	eventQuickView:function(){
		var el = document.getElementById('js-event-quickview-panel');
		if(el === null) return; 
		
		// Quick view demo
		$('.js-screen-grab').hide();
		
		var previousID;
		$('.js-event-a').hover(function(){
			$('#js-event-quickview-panel').stop().fadeIn(50);
			var id = $(this).data('id');
			$('#quickview-'+previousID).hide();
			$('#quickview-'+id).show();
			$('#js-quickview-date').text($(this).data('date'));
			
		},function(){
			previousID = $(this).data('id');
			$('#js-event-quickview-panel').stop().fadeOut(150);
		});		
	},
	
	/*
	Element searching in Examination Edit
	*/
	elementSearchPopup:function(){
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
			$('.elements-search-results-close').click(function(){
				$('#elements-search-results').hide();
			});
		}		
	},

	
	/*
	Sidebar Grouping
	View and Edit Element Sidebar
	*/
	enableGrouping:function(){
		
		// collapse all
		$('.js-sidebar-group').hide();
		
		// fake selection
		$('.oe-element-list .element').click(function(){
			$(this).children('a').toggleClass('selected');
		});
		
		// show hide
		$('.group-showhide-btn').click(function(){
			var icon = $(this).children('.oe-i');
			var group = $(this).parent().children('.js-sidebar-group');
			
			if(icon.hasClass('plus')){
				// close other groups
				// $('.js-sidebar-group').hide();
				// expand this group
				group.removeClass('hidden').show();
			} else {
				// collapse
				group.hide();
			}
			
			icon.toggleClass('minus plus');
			
		});
		
		// link group to btn
		$('.group-header').click(function(){
			// yep, big assumptions about the DOM but this is just a demo:
			$(this).next().trigger('click');
		});
		
	},
	
	/*
	Comments
	*/
	showComments:function(){
		// 2 types of comments
		// 1) Swith icon for textarea input
		// 2) Show general element comments
		
		// 1) inplace - click on wrapper div
		$('.js-comment-inplace').click(function( e ){
			e.stopPropagation();
			
			$(this).children('.js-add-comments-btn').hide();
			$(this).children('.js-input-comments').removeClass('hidden').focus();
			
		});
		
		// 2) general element comments
		$('.js-add-general-comments-btn').click(function( e ){
			e.stopPropagation();
			
			$(this).hide();
			// this is a guess on the general structure
			// but will do for a demo
			var p = $(this).parent().parent();
			p.find('.js-input-comments').removeClass('hidden').focus();
			
		});
		
	},
	
	/*
	Eyedraw - demo edit app
	*/
	eyedrawEditApp:function(){
		
  		$('.js-demo-open-eyedraw-app').click(function( e ){
	  		
	  		e.stopPropagation();
	  		
	  		$popup = $('<div>');
	  		$popup.addClass('oe-popup-wrap');
	  		$('body').prepend($popup);
	  		$popup.load('/php/v3.0/_load/eyedraw-edit-app.php',function(){
		  		$popup.find('#js-demo-eyedraw-app-close').click(function(){
			  		$popup.remove();
		  		});
	  		});
	  		
	  	});
	},
	
	/*
	Add New Event - fake demo
	*/
	addNewEvent:function(){
		
  		$('#js-add-new-event').click(function( e ){
	  		
	  		e.stopPropagation();
	  		
	  		$popup = $('<div>');
	  		$popup.addClass('oe-popup-wrap');
	  		$('body').prepend($popup);
	  		$popup.load('/php/v3.0/_load/add-new-event.php',function(){
		  		$popup.find('.close-btn').click(function(){
			  		$popup.remove();
		  		});
		  		// fake links on Events
		  		$popup.find('.step-3').click(function(){
			  		window.location = $(this).data('url');
		  		});
		  		
	  		});
	  		
	  	});
	},
	
	
	/*
	Element - edit - demo Add - Search - Type
	*/
	eAddSearchType:function(){
  		$('.js-add-select-type').click(function( e ){
	  		
	  		e.stopPropagation();
	  		
	  		var ast = $(this).parent().children('.oe-add-select-type');
	  		var auto = ast.find('.type-search-autocomplete'); // input
	  		var results = ast.find('.type-search-results'); // results (faked)
	  		var cancelBtn = ast.find('.oe-add-select-type-cancel');
	  		
	  		ast.show();
	  		
	  		results.hide(); // hide autocomplete results until keypress
	  		
	  		// fake input ajax search
	  		auto.keypress(function() {
		  		if(auto.val() === 'au'){
			  		results.show(); // show fake autocomplete results
		  		}
	  			
			});
	  		
			// clicking 'show' create something but just faking interaction here
	  		ast.find('.oe-ast-options > li').click(function(){
		  		close(); 
	  		});
	  		
	  		// remove icon
	  		cancelBtn.click(function(){
		  		close();
	  		});
	  		
	  		// rollout to close - this was irritating.
/*
	  		ast.mouseleave(function(){
		  		$(this).off( 'mouseleave' ); // clean up
				close();
  			});
*/
	  		
	  		// close Add Search Type popup
	  		function close(){
		  		results.hide();
		  		ast.hide();
		  		auto.val('');
	  		}
	  		
	  		
  		});
	},
	
	/*
	Sidebar Events, Quicklook extra info
	*/
	eventTypeQuicklook:function(){
  		$('.events .event-type').hover(
	  		function(){
		  		$(this).parent().parent().children('.quicklook').show();
	  		},
	  		function(){
		  		$(this).parent().parent().children('.quicklook').hide();
	  		}	
  		);
	},
	
	/*
	Basic tooltip functionality. Quick and dirty for demo
	*/
	hasTooltip:function(){
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
	},
	
	/*
	Expand collapse content wrapper (currently Management Summaries in popup)
	*/
	hideShowBtn:function(){
		$('.hideshow-btn').click(function(e){
			e.stopPropagation();
			
			var icon = $(this).children('.oe-i');
			var content = $(this).parent().children('.hideshow-content');
			
			if( icon.hasClass('minus') ){
				content.hide();
			} else {
				content.show();
			}
			
			icon.toggleClass('minus plus');
		})
	},
	
	/*
	Popup - problem plans sortable list 
	*/
	problemsPlans:function(){
		// set up Sortable for Problems & Plans
		var el = document.getElementById('problems-plans-sortable');
		
		if(el === null) return; 
		
		var sortable = Sortable.create(el,{handle:".drag-handle"});	
		
		// add a new one:	
		// add to Problems Plans
		$('#js-add-pp-btn').click(function(){
			var input = $('#create-problem-plan');
			var val = input.val();
			if( val === '') return;				
			var html = '<li><span class="drag-handle">&#9776;</span>'+ val +'<div class="remove">&times;</div></li>';
			$('#problems-plans-sortable').append(html);
			input.val(''); // clean input
		}); 
		
		// remove a Problem Plan
		$('#problems-plans-sortable .remove').click(function(){ 
	  		$(this).parent().remove(); 
	  	});

	},
	
	/*
	Hack. Popups overlap so ... 
	*/
	popupOverlapCheck:function(){
		oeui.quicklook.hide();
		oeui.demographics.hide();
		oeui.risks.hide();
		oeui.tasks.hide();
	},

	/*
	Create 'buttons' for menus, 3 different flavours: wrapper, standard and fixed
	@ btn - structurally as <a> but without CSS :hover, :focus, :active
	@ content - DOM content to show on click 
	@ wrap - shortcuts has a DOM wrapper, this displays on hover.
	*/
	JsBtn:function(btn,content,wrap = null,checkPopupOverlap = false){
		
		var eventObj,
			usingWrapper = false,
			isFixed = false;
			css = { 
				active:'active', 	// hover
				open:'open' 		// clicked
			};
		
		if( wrap !== null ){
			eventObj = wrap;
			css.open = css.active; // wrap only has 1 class
			usingWrapper = true;
		} else {
			eventObj = btn;
		}
		
		// Events
		eventObj.click(function( e ){
			e.stopPropagation();
			
			if(isFixed) return; 
			
			if( btn.hasClass( css.open ) ){
				hide();
			} else {
				show();
			}
		})
		.mouseenter(function(){
			btn.addClass( css.active ); 
			if( usingWrapper ) show();
		})
		.mouseleave(function(){
			btn.removeClass( css.active ); 
			if( usingWrapper ) hide();
  		});

  		// Controller
		function show(){
			
			if( checkPopupOverlap ) oeui.popupOverlapCheck(); // hack
			
			btn.addClass( css.open );
			content.show();
			
			if( ! usingWrapper ){
				// no DOM wrapper for btn and content
				// content therefore handles it's own events
		  		content.mouseenter(function(){
					$(this).mouseleave(function(){
						$(this).off( 'mouseleave' ); // clean up
						$(this).hide();
						btn.removeClass( css.open );
					});
					$(this).off( 'mouseenter' ); // clean up
	  			});
			}
		}
		
		function hide(){
			btn.removeClass( css.open );
			content.hide();
		}	
		
		// fix or unfix... activity panel
  		function makeFixed(b){
	  		
	  		if(b){
		  		content.off( 'mouseenter' ); // in case 
		  		content.off( 'mouseleave' ); // in case	  		
		  		content.show();
		  		btn.addClass( css.open );
	  		} else {
		  		content.hide();
		  		btn.removeClass( css.open ); 
	  		}
	  		
	  		isFixed = b;
  		}
  		
		// make public
		this.show = show;
		this.hide = hide;
		this.makeFixed = makeFixed;
		
	}
	
};


$(document).ready(function() {
	// init
	oeui.init();
});







