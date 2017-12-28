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
			
			$popup.removeClass('hidden').hide();
			
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