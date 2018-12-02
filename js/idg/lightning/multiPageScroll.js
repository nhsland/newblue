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
	Allowing for 1 to n widgets
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
		CSS settings:
		$pageHeight: 	842px;
		$pageSpacing:	10px; (bottom)
		*/
		var pageY = 852;
		this.animateScrolling = function( page ){
			var scroll = pageY * page;	
			$stack.animate({scrollTop: scroll+'px'},200,'swing');
		}
	}
		
	
}
