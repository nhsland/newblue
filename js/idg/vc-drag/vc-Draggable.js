/**
VC Draggable Floating inputs
**/
idg.vcDraggable = function(){
	
	var id = 'oe-vc-floating-input';

	if( $('#'+id).length == 0 ) return;
	
	/* 	
	Drag...
	*/	
	var relativeX, relativeY;
		
	document.addEventListener("dragstart", getMouseOffset, false);
	document.addEventListener("dragend", reposFloat, false);
		
	
	function getMouseOffset( e ){
		e.dataTransfer.dropEffect = "move";
		
		// need to work out mouse offset in <div> before dragging
		var offset = $('#'+id).offset();
		relativeX = (e.clientX - offset.left);
		relativeY = (e.clientY - offset.top);		
	}
	
	function reposFloat( e ) {
		// Update the panel position
		var left = e.clientX - relativeX;
		var top = e.clientY - relativeY;
		
		// stop it being dragged off screen
		top = top < 1 ? 1 : top;
		left = left < 1 ? 1 : left;
		
		$('#'+id).css({"top":top+"px","left":left+"px"});
	}
	
	
	/*
	Touch version? ... 
	Not sure if this works, not tested but just in case...	
	*/
	var el = document.getElementById(id);
	el.addEventListener("touchstart", getMouseOffset, false);
	el.addEventListener("touchend", reposFloat, false);
		
	
}