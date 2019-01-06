/*
List Options Constructor
*/

idg.addSelectInsert.ListOption = function ( $li, optionList ){
	
	const _value = $li.data('insert').value;	
	const dependents = new idg.addSelectInsert.OptionDependents( $li.data('insert').dependents, optionList.uniqueId );
	let _selected = $li.hasClass('selected') ? true : false; // check not setup to be selected:
	
	/*
	Methods
	*/ 
	this.click = function(){
		this.toggleState();
		optionList.optionClicked( _selected, this );
		
		if(dependents !== false){
			dependents.show( _selected );
		}
		
	}
	
	this.toggleState = function() {
		$li.toggleClass('selected'); 
		_selected = !_selected;
	}	
	
	this.deselect = function(){
		if( _selected ){
			this.toggleState();
		}
	}
	
	
	Object.defineProperty(this, 'selected',{
		get: () => {
			return _selected;
		}
	});
	
	Object.defineProperty(this, 'value',{
		get: () => {
			return _value;
		}
	});


	/*
	Events 
	*/
	$li[0].addEventListener( "click", this.click.bind( this ) );
}
