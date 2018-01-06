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
  		
  		// but for these popups remember the data added:
  		if($popup.prop('id') == 'add-to-history') resetPopupData = false;
  		if($popup.prop('id') == 'add-to-risks') resetPopupData = false;
  			
  		/*
	  	All lists
	  	store the list objects and then 
	  	iterate over them to build the inputs
	  	*/	
  		var lists = [];
  		
  		$popup.removeClass('hidden').hide();
  		search.removeClass('hidden').hide();

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
	  		lists.push( new OptionsList( $(this), multi ) );
  		});
  		
  		
		function OptionsList( $ul, multi ){
			var multi = multi;
			var $active = null; // if only single entry 
			var selectedData = [];
			
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

  		
  		// top element popup will disappear behind header, so adjust it's position:
  		if($btn.offset().top < 400){
	  		var vOffset = $btn.offset().top - 310;
	  		$popup.css({bottom:vOffset});
	  	}
  		

		$btn.click( function( e ){
			e.stopPropagation();
			openAdd();
		});
		
		function openAdd(){
			closeAll();
			addSelect();
			$popup.show();
			selectBtn.children('.oe-i').addClass('selected');
			searchBtn.children('.oe-i').removeClass('selected');
					  		
		}
		
		
		
		// Close and reset
  		function closeCancel(){
	  		search.hide();
	  		searchInput.val('');
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
		 
		 
		  	/*
			history
			*/
		  	if($popup.prop('id') == 'add-to-history'){
			  	var inputs = [];
		  		for(var i = 0; i<lists.length; i++){
			  		var data = lists[i].getData(', ');
			  		if(data != ""){
				  		inputs.push(data);
			  		}
		  		}
		  		
		  		$('#js-history-input-demo').val( inputs.join(', ') );
		  		autosize.update($('#js-history-input-demo'));
	  		}
	  		
	  		
	  		/*
			Risks
			*/
		  	if($popup.prop('id') == 'add-to-risks'){
			  	var inputs = [];
		  		for(var i = 0; i<lists.length; i++){
			  		var data = lists[i].getData(', ');
			  		if(data != ""){
				  		inputs.push(data);
			  		}
		  		}
		  		
		  		$('#js-risks-input-demo').val( inputs.join(', ') );
		  		autosize.update($('#js-risks-input-demo'));
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