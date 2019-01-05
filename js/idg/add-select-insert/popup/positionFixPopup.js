/*
Set up Btn click events
*/

idg.addSelectInsert.Popup.prototype.positionFixPopup = function(){
	/* 
	Popup is FIXED positioned, work out offset position based on button
	To do this proved easer with Vanilla JS
	*/
	let elem = this.$btn[ 0 ];
	let btnPos = elem.getBoundingClientRect();		
	let w = document.documentElement.clientWidth;
	let h = document.documentElement.clientHeight;
	
	// check popup doesn't go off the top of the screen 
	// and don't overlay Logo or Patient Name
	let posH = (h - btnPos.bottom);
	if(h - posH < 310){
		posH = h - 315;
	}
	
	// set CSS Fixed position appropriately:
	if( btnPos.left < 310 ){
		this.$popup.css(	{	"bottom": posH,
								"right": "auto",
								"left": (btnPos.left) });
	} else {
		
		this.$popup.css(	{	"bottom": posH,
								"right": (w - btnPos.right) });
	}

}
