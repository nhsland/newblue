/*
Optional Lists based on List selection
find group ID: 	"add-to-{uniqueID}-listgroup{n}";
find list ID: 	"add-to-{uniqueID}-list{n}";

@param dependents: String e.g. "2.1" or "2.1,2.2": 
*/

idg.addSelectInsert.OptionDependents = function( dependents, listId ){

	if(dependents === undefined)  return false;
	
	/*
	List has extra list options	
	*/
	const idPrefix = "#add-to-" + listId + "-";
	let groups = [];
	
	/*
	Can be mulitple list groups.
	Check string for commas "2.1,2.2" for groups
	*/
	dependents.split(',').forEach( group => {

		let ids = group.split('.');
		let obj = {};
		// find group
		obj.$group 	= $(idPrefix + 'listgroup'+ids[0] ); 		// <div> wrapper for optional lists
		obj.$holder = obj.$group.find('.optional-placeholder'); // default placeholder for Optional Lists

		/*
		Does it have lists, or show default text?
		e.g. 2.0
		*/
		if( ids[1] == 0 ){
			obj.showDefaultText = true;
		} else {
			obj.showDefaultText = false;
			/*
			Loop through option lists required
			e.g. 2.4.5 (two lists in group '2')
			*/
			obj.lists = [];
			for(let i=1;i<ids.length;i++ ){
				obj.lists.push( $(idPrefix + 'list'+ids[ i ] ) )
			}
		}
		
		groups.push( obj );
		
	});

	/*
	Methods
	*/
	this.show = function( show ){
		if(show){
			/*
			hide ALL optional lists
			$('#add-to-'+listId+' .optional-list').hide();
			*/
			this.myLists();
		} else {
			// unclick
			this.reset();
		}
	}

	this.myLists = function(){

		groups.forEach( group => {
			/*
			in group hide other lists
			*/
			group.$group.children('.optional-list').hide();
			
			if(group.showDefaultText){
				group.$holder.show();
			} else {
				group.$holder.hide();
				// show required Lists
				group.lists.forEach( list => {
					list.show();
				});
			}
			
		});
	}
	
	/*
	Reset (these!) groups!	
	*/
	this.reset = function(){
		groups.forEach( group => {
			group.$group.children('.optional-list').hide();
			group.$holder.show();
		});
	}	
}


 