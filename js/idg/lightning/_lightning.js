/*
Lightning
*/
var lightning = lightning || {};

lightning.init = function(){

	/*
	All IMGs are pre-loaded in DOM
	Speed of interaction is PRIORITY!
	*/
	var me = this;
	this.currentStack = 0;
	this.iconPrefix = '#lqv_';
	this.stackPrefix = '#lsg_';
	this.totalStackNum = $('.stack-group').length;
	this.xscrollWidth = $('.lightning-view').width();
	this.locked = true;
	
	
	this.updateView = function( id ){
		this.updateStack( id );
		this.updateMeta( $(this.iconPrefix + id).data('meta') );
	}

	this.updateMeta = function(meta){
		var $div = $('.lightning-meta');
		var d = meta.split(',');
		$div.children('.type').text(d[0]);
		$div.children('.date').text(d[1]);
		$div.children('.who').text(d[2]);
	}
	
	this.updateStack = function( stackID ){
		$(this.stackPrefix + this.currentStack).hide();
		$(this.stackPrefix + stackID).show();
		this.currentStack = stackID; // track id
		this.updateCounter();
		this.timelineIcon();
	}
	
	this.updateCounter = function(){
		$('.lightning-ui .stack-position').text( this.currentStack+1 + '/' + this.totalStackNum);
	}
	
	this.timelineIcon = function(){
		$('.icon-event').removeClass('js-hover');
		$(this.iconPrefix + this.currentStack).addClass('js-hover');	
	}
	
	/*
	xscroll using DOM overlay (rather than the image)
	(note: the overlay has 2 possible widths depending on browser size)
	*/
	this.xscroll = function(xCoord,e){
		var xpos = Math.floor(xCoord/(this.xscrollWidth / this.totalStackNum));
		if(this.locked == false){
			this.updateView( xpos );
		} 
	}
	
	this.swipeLock = function(){
		this.locked = !this.locked;
		if(this.locked){
			$('.lightning-ui .user-help').text( 'Swipe is LOCKED | Click to unlock' );
		} else {
			$('.lightning-ui .user-help').text( 'Swipe to scan or use key RIGHT / LEFT | Click to LOCK swipe' );
		}
	}
	
	/*
	Step through stack (arrows or KEYs)	
	*/
	this.stepThrough = function( dir ){
		var next = this.currentStack + dir;
		if( next >= 0 && next < this.totalStackNum){
			this.updateView( next );
		}
	}
	
	/*
	Events
	*/
	$('.icon-event')
		.hover(
			function(){
				me.updateStack(	$(this).data('id') );
				me.updateMeta( 	$(this).data('meta') );
			}, function(){
				// no out action
			})
		.click(function(){
			me.swipeLock();
		});
		
		
	// mouse xscroll
	$('.lightning-view').mousemove(function(e) {
	  	var offset = $(this).offset();
	  	me.xscroll(e.pageX - offset.left,e);
	});		
	
	// Click to LOCK swiping
	$('.lightning-view').click(function(e){
		e.stopPropagation();
		me.swipeLock();
	});				

	// step through
	// use either the < > btn
	$('#lightning-left-btn').click(function( e ){
		e.stopPropagation();
		me.stepThrough( -1 );
	});
	
	$('#lightning-right-btn').click(function( e ){
		e.stopPropagation();
		me.stepThrough( 1 );
	});
	
	// or LEFT - RIGHT Keys
	$("body").keydown(function(e){
	    if ((e.keyCode || e.which) == 37)	me.stepThrough( -1 );
	    if ((e.keyCode || e.which) == 39)	me.stepThrough( 1 );
	});
		
	// watch for resize (the view has 2 widths )
	$( window ).resize(function() {
		me.xscrollWidth = $('.lightning-view').width();
	});
	

	/*
	setup timeline
	*/
	this.filterOptions();
	this.iconGroup();
	/*
	setup viewer	
	*/
	this.updateCounter();
	this.swipeLock();

	
}