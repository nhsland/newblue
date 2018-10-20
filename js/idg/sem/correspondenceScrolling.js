/*
Correspondence Scrolling
*/
idg.correspondenceScrolling = function(){
	
	/*
	first check UI is available
	using demo ID here 
	*/
	var pageScroller = document.getElementById('js-idg-correspondence-scroll-demo');
	if(pageScroller == null) return;
	
	/*
	loop through and create page buttons
	e.g. <div class="page-num-btn">1/4</div>
	*/
	var numOfPages = $("#js-correspondence-page-images > img").length;
	
	for(var i=0;i<numOfPages;i++){
		$( "<div></div>", {
			text: (i+1)+"/"+numOfPages,
			"class": "page-num-btn",
			"data-page": i,
			mouseenter: function( e ) {
				animateScrolling( $(this).data('page') );
			},
			click: function( event ) {
				animateScrolling( $(this).data('page') );
			}
		}).appendTo( "#js-correspondence-page-nav" );
	}
	
	/*
	CSS settings:
	$pageHeight: 	842px;
	$pageSpacing:	10px; (bottom)
	*/
	var pageY = 852;
	var pages = $("#js-correspondence-page-images");
	
	function animateScrolling( page ){
		var scroll = pageY * page;	
		pages.animate({scrollTop: scroll+'px'},200,'swing');
	}
	
}
