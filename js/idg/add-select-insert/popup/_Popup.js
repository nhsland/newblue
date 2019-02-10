/*
Add Select Search insert  
Popup Constructor
*/

idg.addSelectInsert.Popup = function ( $btn, popupID ){	
	
	let $popup = $('#'+popupID);
	const reset = true;
	const require = false; 
	const callback = $popup.data('callback');  // optional
	
	/*
	Using in analytics to build the data filters. Popup
	needs to anchor left. Can not rely to x < n to do this.
	Checking therefore the data- 
	*/
	
	this.anchorLeft = $popup.data('anchor-left') ==! undefined ? true : false;
	
	/*
	Props
	*/ 
	this.$btn = $btn;  
	this.$popup = $popup;
	
	/*
	Methods
	*/
	this.open = function(){
		this.positionFixPopup();
		this.onScrollClose();
		idg.addSelectInsert.closeAll();
		$popup.show();
	}
	
	this.close = function(){
		$popup.hide();		
	}
	
	this.reset = function(){
		// reset (to default state)
	}
	
	this.insertData = function(){
		/*
		gather data and send to callback (if requested)
		*/
		let JSONdata = []
		lists.forEach( list => {
			JSONdata.push( list.gatherData() );
		});
		
		/*
		callback handles Element insert demo
		*/
		if( callback != undefined){
			idg.addSelectInsert.updateElement[callback]( JSONdata );
		}
		
		this.close();
	}
	
	/*
	Store lists
	*/
	let lists = [];
	
	$('.add-options',$popup).each( function(){
		lists.push( new idg.addSelectInsert.OptionsList( $(this) ) );
	});
	
	/*
	Setup Btn Events. 
	*/
	idg.addSelectInsert.btnEvent( this, $btn, this.open );
	idg.addSelectInsert.btnEvent( this, $popup.children('.close-icon-btn'), this.close );
	idg.addSelectInsert.btnEvent( this, $popup.find('.add-icon-btn'), this.insertData );
	  					
}
