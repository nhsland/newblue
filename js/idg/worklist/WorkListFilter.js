/**
Homepage Message expand / contract 	
**/
idg.WorkListFilter = function(){
	
	if( $('.js-worklist-filter').length == 0 ) return;
	
	$('.js-worklist-filter').each(function(){
		$(this).click( function(e){
			e.preventDefault();
			resetFilters();
			$(this).addClass('selected');
			updateWorkLists( $(this).data('worklist') );
			
		});
	});
	
	function resetFilters(){
		$('.js-worklist-filter').removeClass('selected');
	}
	
	function updateWorkLists( listID ){
		if(listID == 'all'){
			$('.worklist-group').show();
		} else {
			$('.worklist-group').hide();
			$('#'+listID).show();	
		}
	}
}
