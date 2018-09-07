/*
Element Expand (collapse) data list
*/
idg.expandElementList = function(){
	
	// check for view elementss
	if( $('.element-data').length == 0 ) return;
	
	$('.js-listview-expand-btn').each(function(){	
		/* 
		Generally there is 1 list. But it could handle 2 (R/L Eye)	
		DOM: id= js-listview-[data-list]-full | pro
		*/
		
		var listId = $(this).data('list');
		var listId2 = $(this).data('list2'); // (optional) R / L Eye control (see PCR Risks)
		var listview = new ListView( $(this),listId,listId2);
	});
	
	function ListView( $iconBtn, listId, listId2 ){
		var proView = true;
		var list = new List(listId);
		var list2 = listId2 == undefined ? false : new List(listId2);	
		
		$iconBtn.click(function(){
			$(this).toggleClass('collapse expand');
			proView = !proView;
			changeView(proView,list);
			if(list2 != false) changeView( proView,list2);
		});
		
		function changeView(proView,list){
			if(proView){
				list.$pro.show();
				list.$full.hide();
			} else {
				list.$pro.hide();
				list.$full.show();
			}
		}
		
		function List(id){
			this.$pro = $('#js-listview-'+id+'-pro');
			this.$full = $('#js-listview-'+id+'-full');
		}
		
	}


}