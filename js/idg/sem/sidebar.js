/*
Sidebar
*/
idg.sidebar = function(){
	
	/*
	setup filter mechanisms for new UI.
	- first check UI is available 
	*/
	var filter = document.getElementById('js-sidebar-filter');
	if(filter == null) return;
	
	var lists = {
		/* 
		set date as UTC.
		note: Edge may not handle this well.
		But for IDG demo it's oK
		*/
		setUTC: function(listId){
			$("li",listId).each(function(){
				$(this).data( 'UTC',Date.parse($(this).data('created-date')) );
			})	
		},
		
		/* 
		date sort on UTC
		use jQuery to reorder DOM list 
		*/
		dateSort:function(listId,newold){		
			$("li",listId)
				.sort( function( a, b ) {
					a = $( a ).data('UTC'); 
					b = $( b ).data('UTC');
					if(newold) 	return b - a;
					else		return a - b;
					})
				.appendTo(listId);
		}
	}
	
	
	
	lists.setUTC("#js-events-by-date");
	// lists.dateSort("#js-events-by-date",true);
	
	
	
	
}
