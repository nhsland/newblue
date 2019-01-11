// js test
const idgTest = {
	
	report:function(msg){
		let id = "idg-js-ui-test"
		let ul = document.getElementById(id);
		let li = document.createElement("li");
		
		if(ul === null){
			ul = document.createElement("ul");
			ul.id = id;
			ul.style = "position:fixed; bottom:10px; right:10px; z-index:9999; background:orange; padding:10px; list-style-position:inside; max-height:400px; overflow-y: scroll; font-size:11px;";
			document.body.appendChild(ul);
		}

		li.appendChild( document.createTextNode(msg) );
		ul.appendChild(li);
	},

	assert:function(statement, desc){
		let test = statement ? "pass" : "fail";
		this.report( "[" + test + "] " + desc );			
	},
}
