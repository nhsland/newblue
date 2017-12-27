/*
Clinic JS

The logic for the pathway steps is:
Green 	- done 
Orange 	- in progress/active
Grey 	- to do
*/

var clinic = clinic || {};

/**
The main function of JS is to provide
ways to filter the clinic list view
and to add new steps to a patient pathway.
@para data - Object containing setup info: { id:[ patients Array ] }
**/
clinic.init = function( data ){
		
	this.data = data; // reference data Obj.
	this.activePathwayID = 0;
	this.activePathwayName = "";
	
	/**
	all '+' icons to add pathways to patient
	**/
	$('.js-add-pathway').click(function( e ){
		e.stopPropagation();
		clinic.activePathwayID = $(this).data('id'); 		// need to know where to insert new pathways
		clinic.activePathwayName = $(this).data('name'); 	// Patient name
		var pos = clinic.getPosition( $(this) );			// position 
		clinic.addPathway.show( pos.left, pos.top - 15 );
	});
	
	/** 
	Setup all the pathway steps that are pre-loaded in the DOM
	**/
	$('.oe-clinic-list .pathway-step').each(function(){
		clinic.makeDefaultStep( $(this) );
		var css = $(this).attr("class").split(' ');	

		if( $(this).data('data') == undefined ){
			$(this).data( 'data', clinic.createDefaultData( css[1] ) ); // if no specifc data setup default data
		} else {
			$(this).data('data').state = clinic.setState( css[1] );
		}
	});  
	
	/**
	clinic list filters
	**/
	$('.oe-clinic-filter').click( function( e ){
		e.stopPropagation();
		clinic.filterList( $(this) );
	});
	
	/**
	ultimately this will be handled by backend
	for now easier to setup demo DOM in JS	
	**/
	this.setupDemoUI();	// ---- for IDG demo
	
	/**
	setup UI
	**/
	this.setupAddToAll();
	this.setupAddPathway();
	this.setupActiveInfo();
	this.setupAssignments();
	this.setupFilters(); 				
	this.setDurationGraphics();	
	this.showCurrentTime();
	this.quicklook();
}