/*
Extra Options
*/

idg.addSelectInsert.OptionsList.prototype.extraOptions = function( groupList ){
	
	if( typeof groupList === 'string'){
		/*
		Show optional lists, String e.g. "2.1" : 
		find group ID: 	"add-to-{uniqueID}-listgroup{n}";
		find list ID: 	"add-to-{uniqueID}-list{n}";
		*/
		let findIDs = groupList.split('.');
		let idPrefix = "#add-to-" + this.uniqueId + "-";
		
		// find the <div> wrappers
		this.$extraGroup 	= $(idPrefix + 'listgroup'+findIDs[0] ); // <div> wrapper for optional lists
		this.$extraList 	= $(idPrefix + 'list'+findIDs[1] ); // the list to show
		this.$extraHolder 	= this.$extraGroup.find('.optional-placeholder'); // default placeholder for Optional Lists
		
		// update DOM and record the state
		this.$extraHolder.hide();
		this.$extraGroup.children('.optional-list').hide();
		this.$extraList.show();
		
	} else {
		/*
		Reset
		*/
		this.$extraHolder.show();
		this.$extraGroup.children('.optional-list').hide();
	}
}

 