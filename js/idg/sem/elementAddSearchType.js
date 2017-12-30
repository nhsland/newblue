/*
SEM Element - Add or Search
Popup to add selected list to element
(optional - autocomplete field)
No functionality, demoing basic UI & UX
*/
idg.elementAddSelectSearch = function(){
		
		$('.js-add-select-search').each(function(){
			var addBtn = new AddSelectSearch( 	$(this),
												$(this).parent().children('.oe-add-select-search') );
		});
	
		function AddSelectSearch( $btn, $popup ){
			
	  		var auto 	= $popup.find('.js-search-autocomplete'),
	  			results = $popup.find('.search-options'),
	  			close 	= $popup.find('.close-icon-btn'),
	  			select 	= $popup.find('.select-icon-btn'),
	  			search 	= $popup.find('.search-icon-btn'),
	  			add 	= $popup.find('.add-icon-btn');
	  			
	  		$popup.removeClass('hidden').hide();
	  		results.removeClass('hidden').hide();
	  		

			$btn.click( function( e ){
				e.stopPropagation();
				openAdd();
			});
			
			function openAdd(){
				addSelect();
				$popup.show();
				select.children('.oe-i').addClass('selected');
				search.children('.oe-i').removeClass('selected');
						  		
			}
			
			// Close and reset
	  		function closeAdd(){
		  		results.hide();
		  		auto.val('');
		  		$popup.hide();
	  		}
	  		
	  		function addSearch(){
		  		$('.flex-layout > .add-options').hide();
		  		results.show();
		  		auto.focus();
		  		
		  		// fake ajax search
		  		var fakeAjax = $('.js-search-results').hide();
		  		auto.keypress(function() {
			  		if(auto.val() === 'au'){
				  		fakeAjax.show(); // show fake autocomplete results
			  		}
				})
	  		}
	  		
	  		function addSelect(){
		  		$('.flex-layout > .add-options').show();
		  		results.hide();
		  		
	  		}
	  		
	  		function iconSelected(){
		  		select.children('.oe-i').toggleClass('selected');
		  		search.children('.oe-i').toggleClass('selected');
	  		}
	  		
	  		/*
		  	Faking interaction:
		  	if we have 'search' option (ajax search options)
		  	- make list elements multi-selectable 
		  	else 
		  	- hide the menu icon, hide the + icon
		  	- make the list items single selct only	
		  	*/
	  		
			// faking interaction of selecting an item, does nothing.
			// if search is avaiable
	  		if( search.length ){
		  		search.click(function(e){
		  			e.stopPropagation();
		  			addSearch();
		  			iconSelected();
	  			});
	  			
	  			$popup.find('.add-options li').click(function(e){
		  			e.stopPropagation();
		  			$(this).toggleClass('selected'); 
	  			});
	  			
	  			
	  		} else {
		  		select.hide();
		  		add.hide();
		  		
		  		$popup.find('.add-options li').click(function(e){
		  			e.stopPropagation();
		  			closeAdd(); 
	  			});
	  		}
			

	  		
	  		// remove icon & plus icon button
	  		close.click(function(e){
		  		e.stopPropagation();
		  		closeAdd();
	  		});
	  		
	  		add.click(function(e){
		  		e.stopPropagation();
		  		closeAdd();
	  		});
	  		
	  		select.click(function(e){
	  			e.stopPropagation();
	  			addSelect();
	  			if( search.length ) iconSelected();
  			});
	  		
	  		
		
		}
}