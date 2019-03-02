/**
Homepage Message expand / contract 	
- used in WorkList and Trials
**/
idg.WorkListFilter = function(){
	
	if( $('.js-list-filter').length == 0 ) return;
	
	$('.js-list-filter').each(function(){
		$(this).click( function(e){
			e.preventDefault();
			resetFilters();
			$(this).addClass('selected');
			updateListView( $(this).data('list') );
			
		});
	});
	
	function resetFilters(){
		$('.js-list-filter').removeClass('selected');
	}
	
	function updateListView( listID ){
		if(listID == 'all'){
			$('.js-filter-group').show();
		} else {
			$('.js-filter-group').hide();
			$('#'+listID).show();	
		}
	}
	
	
	
}
