/*
Sidebar Date Filter
*/
idg.sidebarDateFilter = function(){
	
	if( $('.datepicker-to').length == 0 ) return;

	/*
	Sidebar: Date Range	
	*/
	pickmeup('.datepicker-to',{
		format	: 'd b Y',
		default_date: false,
		hide_on_select : true,
	});
	
	pickmeup('.datepicker-from',{
		format	: 'd b Y',
		default_date: false,
		hide_on_select : true,
	});
	
	$('#sidebar-clear-date-ranges').click(function(){
		$('input.date').val("");
	});

}