/**
Tab buttons control what is shown on the right handside

@param tabBtnInfo (Array) - Array of Objects: {btn:'btn_id',area:'area_id'}
@param 'callBack' (function)  	- callback optional
**/
oes.setupAreaTabButtons = function( tabBtnInfo, callBack ){
	
	for( var i=0; i<tabBtnInfo.length; i++ ){
		
		var btn = tabBtnInfo[i].btn = $(tabBtnInfo[i].btn);  // turn into jQuery
		var area = tabBtnInfo[i].content = $(tabBtnInfo[i].content);	
		var tab = new TabContent( btn,area,i );

	}
	
	// assuming first button is default
	tabBtnInfo[0].btn.addClass('selected');
	
	function TabContent( btn, content, i){
		var btn = btn;
		var content = content;
		var i = i;
		
		btn.click( function( e ){
			e.stopPropagation();
			resetStacks();
			$(this).addClass('selected');
			content.removeClass('hidden').show();
			if(callBack !== undefined){
				callBack(i);
			}
		});		
	}

	function resetStacks(){
		for(var i=0; i<tabBtnInfo.length; i++){
			tabBtnInfo[i].btn.removeClass('selected');
			tabBtnInfo[i].content.hide();
		}
	}
	
}