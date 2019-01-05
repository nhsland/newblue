/*
List Options Constructor
*/

idg.addSelectInsert.ListOption = function ( $li, optionList ){
	const _value = $li.data('insert').value;	
	const _extraOptions = $li.data('insert').extraOptions;
	
	let _selected = $li.hasClass('selected') ? true : false; // check not setup to be selected:
	
	/*
	Methods
	*/
	this.click = function(){
		this.toggleState();
		optionList.optionClicked( _selected, this );
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
	
	Object.defineProperty(this, 'extraOptions',{
		get: () => {
			return _extraOptions === undefined ? false : _extraOptions;
		}
	});
	
	
	
	/*
	Events 
	*/
	$li[0].addEventListener( "click", this.click.bind( this ) );
}
