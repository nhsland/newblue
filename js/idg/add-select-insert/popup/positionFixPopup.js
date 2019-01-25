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
	// and don't overlay Logo! or Patient Name
	let posH = (h - btnPos.bottom);
	if(h - posH < 325){
		posH = h - 325;
	}

	// is popup pushing off the left
	let leftSideEdge = btnPos.right - this.$popup.width();
	let adjustRight =  leftSideEdge < 0 ? leftSideEdge - 25 : 0;

	this.$popup.css(	{	"bottom": posH + 'px',
							"right": (w - btnPos.right) + adjustRight + 'px' });
	

}
