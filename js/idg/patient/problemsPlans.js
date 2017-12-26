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