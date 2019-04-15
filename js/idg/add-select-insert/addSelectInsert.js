/*
Add Select Search insert Popup (v2)
*/
idg.addSelectInsert = {

	/*
	keep a track of all popups	
	*/
	all:[],
	
	/*
	Close all popups. Keep the interface tidy. 
	Actually there should be a popup controller... but for now:
	*/
	closeAll:function(){
		this.all.forEach(function( popup ){
			popup.close();
		});
	},
	
	/*
	initialise	
	*/
	init:function(){
		let all = this.all;
		/*
		Find all the green + buttons
		*/
		$('.js-add-select-btn').each(function(){
			let newPopup = new idg.addSelectInsert.Popup( 	$(this),
														$(this).data('popup') );
			all.push(newPopup);																
		});
	}
}