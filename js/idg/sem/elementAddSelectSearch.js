/*
SEM Element - Add or Search
Popup to add selected list to element
(optional - autocomplete field)
No functionality, demoing basic UI & UX
*/
idg.elementAddSelectSearch = function(){
	
	var all = [];
	
	$('.js-add-select-search').each(function(){
		var addBtn = new AddSelectSearch( 	$(this),
											$(this).parent().children('.oe-add-select-search') );
		all.push(addBtn);																
	});
	
	function closeAll(){
		for(var i=0; i < all.length; i++){
			all[i].closePopup();
		}
	}

	function AddSelectSearch( $btn, $popup ){
		
  		var search 		= $popup.find('.search-options'),
  			select 		= $popup.find('.select-options'),
  			closeBtn 	= $popup.find('.close-icon-btn'),
  			selectBtn 	= $popup.find('.select-icon-btn'),
  			searchBtn 	= $popup.find('.search-icon-btn'),
  			addBtn 		= $popup.find('.add-icon-btn'),
  			searchInput = $popup.find('.js-search-autocomplete');
  			
  			
  		var resetPopupData = true;
  		// var $overlay;					// ----------------------------  Overlay
  		
  		// but for these popups remember the data added:
  		switch( $popup.prop('id') ){
	  		case "add-to-history":
	  		case "add-to-risks":
	  		case "add-to-follow-up":
	  		resetPopupData = false;
	  		break;
  		}
  			
  		/*
	  	All lists
	  	store the list objects and then 
	  	iterate over them to build the inputs
	  	*/	
  		var lists = [];

  		/*
	  	pubilc methods
  		used to close all popups
  		*/
  		this.closePopup = closeCancel;

  		/*
	  	Events	
	  	*/
  		closeBtn.click(function(e){
	  		e.stopPropagation();
	  		closeCancel();
	  		// $overlay.remove();			// ----------------------------  Overlay
  		});
  		
  		selectBtn.click(function(e){
  			e.stopPropagation();
  			addSelect();
  			if( searchBtn.length ) iconSelected();
		});
			
			
		// setup based on the DOM
		if(addBtn.length){
	  		addBtn.click(function(e){
	  			e.stopPropagation();
	  			// $overlay.remove();  		// ----------------------------  Overlay
	  			closeAdd();
	  			
  			});
  		}
  		
  		if(searchBtn.length){
	  		searchBtn.click(function(e){
	  			e.stopPropagation();
	  			addSearch();
	  			iconSelected();
  			});
  		}
  	
  		
  		// list have 2 states multi or single 
  		$('.add-options',$popup).each( function(){
	  		var multi = $(this).data('multi');
	  		
	  		lists.push( new OptionsList( $(this), 
	  									 $(this).data('multi'),
	  									 $(this).data('clickadd') ) );
  		});
  		
  		
		function OptionsList( $ul, multi, clickAdd ){
			var multi = multi;
			var clickAdd = clickAdd; 
			var $active = null; // if only single entry 
			var selectedData = [];
			
			if(clickAdd){
				addBtn.hide();
			}
			
			
			if(multi){
				$('li', $ul).click(function(e){
		  			e.stopPropagation();
		  			$(this).toggleClass('selected'); 
		  			if($(this).hasClass('selected')){
			  			addData($(this).data('str'));
		  			} else {
			  			removeData($(this).data('str'));
		  			}
	  			});
			} else {
				$('li', $ul).click(function(e){
		  			e.stopPropagation();
		  			updateListOptions( $(this) );
		  			if(clickAdd) closeAdd();
	  			});
			}
	
			function updateListOptions( $new ){
				if($active != null) {
					$active.removeClass('selected');
					removeData( $active.data('str') );
				}
				$new.addClass('selected');
				addData( $new.data('str') );
				$active = $new;
			}
			
			function addData(data){
				selectedData.push(data);
			}
			
			function removeData(data){
				var index = selectedData.indexOf(data);   
				if (index !== -1) {
				    selectedData.splice(index, 1);
				}
			}
			
			/*
			Public methods	
			*/
			this.getData = function ( join ){
				return selectedData.join(join);
			}
			
			this.clearData = function(){
				selectedData = [];
			}
		}  		

  		
/*
  		// top element popup will disappear behind header, so adjust it's position:
  		if($btn.offset().top < 250 && $btn.offset().top){
	  		var vOffset = $btn.offset().top - 310;
	  		$popup.css({bottom:vOffset});
	  	}
  		
*/

		$btn.click( function( e ){
			e.stopPropagation();
			openAdd();
		});
		
		
		
		
		function positionFixedPopup(offset){
			/* 
			Popup is FIXED positioned
			work out offset position 
			setup events to close it on resize or scroll.
			*/
			var btnW = 38; // cover, button - abritary, set by eye
			var btnH = 25; 
			var right = ($( window ).width() - offset.left) - btnW;
			var bottom = ($( window ).height() - offset.top) - btnH; 
			
			// set CSS Fixed position
			$popup.css(	{	"bottom":bottom,
							"right":right });
	  					
			/*
			Close popup on...
			Scroll event fires on adding.
			check against scroll position
			*/				
			var scrollPos = $(".main-event").scrollTop();
			$(".main-event").on("scroll", function(){ 
				if( scrollPos !=  $(this).scrollTop() )
					closeCancel();
			});
		}
		
		
		function openAdd(){
			
			closeAll();
			addSelect();
			
			positionFixedPopup( $btn.offset() );
			$popup.show();
			
			selectBtn.children('.oe-i').addClass('selected');
			searchBtn.children('.oe-i').removeClass('selected');
		
					  		
			// chnage popup into a overlay						// ----------------------------  Overlay
/*
			$overlay = $('<div>');
			$overlay.addClass('oe-popup-wrap');
			$popup.appendTo($overlay);
  			$('body').prepend($overlay);
*/		  				  		
		}

		// Close and reset
  		function closeCancel(){
	  		search.hide();
	  		searchInput.val('');
	  		
	  		/*
		  	Remove Events	
		  	*/
		  	$(".main-event").off("scroll");
	  		
	  		$popup.hide();
	
	  		if(resetPopupData){
		  		$popup.find('.add-options li').removeClass('selected');
		  		for(var i = 0; i<lists.length; i++){
			  		lists[i].clearData();
			  	}
			}
	  		
  		}
  		
  		function closeAdd(){
	  			
	  		/*
		  	IDG specific elements limited functionality demos
		  	*/
	
		  	/*
			Refraction	
			*/
			if($popup.prop('id') == 'add-to-refraction'){
				
				var sphere = "", 
					cylinder = "", 
					axis = "";
					type = ""
					
				for(var i = 0; i<lists.length; i++){
			  		var data = lists[i].getData('');
			  		
			  		switch(i){
				  		case 0:
				  		case 1:
				  		case 2:
				  		sphere += data;
				  		break;
				  		
				  		case 3:
				  		case 4:
				  		case 5:
				  		cylinder += data;
				  		break;
				  		
				  		case 6: 
				  		axis = data;
				  		break;
				  		
				  		case 7:
				  		type = data;
				  		break;
			  		}
		  		}
				
				$('#js-refraction-input-sphere').val( sphere );
				$('#js-refraction-input-cylinder').val( cylinder );
				$('#js-refraction-input-axis').val( axis );
				$('#js-refraction-input-type').val( type );
			}
			
			if($popup.prop('id') == 'add-to-pupils-left'){
				$('#js-pupil-left-text').text( lists[0].getData('') );
			}
			
			if($popup.prop('id') == 'add-to-pupils-right'){
				$('#js-pupil-right-text').text( lists[0].getData('') );
			}
			
			if($popup.prop('id') == 'add-to-analytics-service'){
				$('#js-service-selected').text( lists[0].getData('') );
			}
		
		 
		  	/*
			Text inputs
			*/
		  	if($popup.prop('id') == 'add-to-history')		showInputString('history');
		  	if($popup.prop('id') == 'add-to-risks')			showInputString('risks');
		  	if($popup.prop('id') == 'add-to-follow-up')		showInputString('follow-up');
	  		
	
	  		function showInputString(id){
		  		var id = '#js-'+id+'-input-demo';
		  		var inputs = [];
		  		for(var i = 0; i<lists.length; i++){
			  		var data = lists[i].getData(', ');
			  		if(data != ""){
				  		inputs.push(data);
			  		}
		  		}
		  		
		  		$(id).val( inputs.join(', ') );
		  		autosize.update( $(id) );
	  		}
	  		
	  		
	  		/*
		  	OpNote.
		  	Procedures	
		  		
		  	*/
	  		if($popup.prop('id') == 'add-to-procedures'){
	  			// <tr> template
			  	var rowTemplate = $("#js-procedures-template");
			  	
			  	// get Procedures...	
			  	var procedures = lists[0].getData(',');
			  	var proceduresArray = procedures.split(',')	
			  		
		  		for(var i = 0; i<proceduresArray.length; i++){
			  		
			  		var newRow = rowTemplate.clone();
			  		newRow.removeAttr('style id');
			  		newRow.find('.js-procedure-name').text(proceduresArray[i]);
			  		
			  		$("#js-show-procedures").append( newRow );
			  		
			  		console.log(proceduresArray[i] == "Phacoemulsification and IOL");
			  		// hack to demo functionality of elements
			  		if(proceduresArray[i] == "Phacoemulsification and IOL"){
				  		$('.edit-phaco--iol-right').show();
				  		$('.edit-pcr-risk-right').show();
				  		
				  		newRow.find('.js-add-comments').hide();
			  		}
			  		
			  	}
	  		}
	  		
	  		
	  		// clean up!
	  		closeCancel();
  		}
  		
  		function addSearch(){
	  		select.hide();
	  		search.show();
	  		searchInput.focus();
	  		
	  		// fake ajax search
	  		var fakeAjax = $('.js-search-results').hide();
	  		searchInput.keypress(function() {
		  		if(searchInput.val() === 'au'){
			  		fakeAjax.show(); // show fake autocomplete results
		  		}
			})
  		}
  		
  		function addSelect(){
	  		select.show();
	  		search.hide();
	  		searchInput.val('');
  		}
  		
  		function iconSelected(){
	  		selectBtn.children('.oe-i').toggleClass('selected');
	  		searchBtn.children('.oe-i').toggleClass('selected');
  		}
	
	}
}