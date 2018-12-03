/*
Mulit Page Scroll Widget. 
Used in Correspondence VIEW and Lightning Viewer for Letters 
... and maybe other places too.
*/
idg.multiPageScroll = function(){
	/*
	check DOM... 
	*/
	if( $('.lightning-multipage-scroll').length == 0 ) return;
	
	/*
	Allowing for 'n' number of widgets
	*/
	$('.lightning-multipage-scroll').each( function(){
		var mps = new MultiPage( $(this) );
	});
	
	function MultiPage( $div ){
		var me = this;
		var $nav = $('.multipage-nav',$div);
		var $stack = $('.multipage-stack',$div);
		var numOfImgs = $('.multipage-stack > img',$div).length;
		
		/*
		Get first IMG height Attribute 
		to work out page scrolling.
		Note: CSS adds 10px padding to the (bottom) of all images !
		*/
		var pageH = 10 + parseInt( $('.multipage-stack > img:first-child',$div).attr('height') );

		/*
		Build Page Nav Btns
		loop through and create page buttons
		e.g. <div class="page-num-btn">1/4</div>
		*/	
		for(var i=0;i<numOfImgs;i++){
			var btn = $( "<div></div>", {
							text: (i+1)+"/"+numOfImgs,
							"class": "page-num-btn",
							"data-page": i,
							mouseenter: function( e ) {
								me.animateScrolling( $(this).data('page') );
							},
							click: function( event ) {
								me.animateScrolling( $(this).data('page') );
							}
						}).appendTo( $nav );
		}
		
		/*
		Animate the scrolling
		*/	
		this.animateScrolling = function( page ){
			var scroll = pageH * page;	
			$stack.animate({scrollTop: scroll+'px'},200,'swing');
		}
	}
		
	
}
