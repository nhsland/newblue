/*
List has extra Lists
find group ID: 	"add-to-{uniqueID}-listgroup{n}";
find list ID: 	"add-to-{uniqueID}-list{n}";

@param dependents: String e.g. "2.1" or "2.1,2.2": 
*/

idg.addSelectInsert.OptionDependents = function( dependents, listId ){
	
	if(dependents === undefined)  return false;
	
	/*
	List has extra list options	
	*/
	let extraListOptions = [];
	let idPrefix = "#add-to-" + listId + "-";
	
	dependents.split(',').forEach( group => {

		let findIDs = group.split('.');
		let obj = {};
		obj.$group 	= $(idPrefix + 'listgroup'+findIDs[0] ); 		// <div> wrapper for optional lists
		obj.$list1	= $(idPrefix + 'list'+findIDs[1] ); 			// the list to show
		obj.$list2	= $(idPrefix + 'list'+findIDs[2] ); 			// the list to show
		obj.$holder = obj.$group.find('.optional-placeholder'); // default placeholder for Optional Lists
		extraListOptions.push( obj );
		
	});

	/*
	Methods
	*/
	this.show = function( show ){
		if(show){
			this.showLists();
		} else {
			this.reset();
		}
	}

	this.showLists = function(){
		extraListOptions.forEach( xtras => {
			// in the group hide other lists:
			xtras.$group.children('.optional-list').hide();
			xtras.$holder.hide();
			// show required Lists
			xtras.$list1.show();
			xtras.$list2.show();
		});
	}
	
	// if Option is UNclicked need to reset the groups
	this.reset = function(){
		extraListOptions.forEach( xtras => {
			xtras.$group.children('.optional-list').hide();
			xtras.$holder.show();
		});
	}	
}


 