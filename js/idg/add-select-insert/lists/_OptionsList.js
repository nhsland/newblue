/*
Add Select Search insert  
List Constructor
*/

idg.addSelectInsert.OptionsList = function ( $ul ){

	let dataObj = $ul.data('options'); // JSON object created in the HTML DOM. No need to parse.
	const single 			= dataObj.type == 'single' ? true : false ;				
	// some assumptions here... 
	const hasOptions 		= (dataObj.hasExtraOptions == 'true');
	const isOptionalList 	= (dataObj.isOptionalList == 'true');
	
	/*
	Props
	*/ 
	this.uniqueId  = $ul.data('id'); // passes in DOM id (unique part) 
	
	/*
	Optional List? 
	Needs hiding. The List Option it depends on will show
	it when it's clicked	
	*/
	if(isOptionalList) $ul.parent().hide();
	 
	/*
	Store all List Options	
	*/
	let me = this; // hmmm... this could be better.
	let options = [];
	
	$('li', $ul).each( function(){
		options.push( new idg.addSelectInsert.ListOption( $(this), me ) );
	});
	
	/*
	Methods	
	*/
	this.optionClicked = function( selected, listOption ){
		/*
		Depending on type manage the list.
		multi is the default	
		*/
		if(selected){
			if(single){
				options.forEach( option => {
					if(option !== listOption) option.deselect();
				});
				
				// does list have extraOptions?
				if(hasOptions && listOption.extraOptions != false){
					this.extraOptions( listOption.extraOptions );	
				}
			}
		} else {
			// UN-selected!
			if(hasOptions && single){
				this.extraOptions( false );
			}
		}	
	}
	
	this.gatherData = function(){
		let data = [];
		
		options.forEach( option => {
			if( option.selected ){
				if(isOptionalList){
					/*
					Only get the data from visible options
					*/
					if( $ul.parent().is(":hidden") == false ){
						data.push( option.value );
					}
				} else {
					data.push( option.value );
				}
			}
		});
		
		return data.join(', ');
	}
			
}
