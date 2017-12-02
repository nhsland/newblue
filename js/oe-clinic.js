/*

JS provided to demo & review UI design work on IDG idg.knowego.com

*/

var clinic = {
	
	/**
	The main function of JS is to provide
	ways to filter the clinic list view
	and to add new steps to a patient pathway.
	@para data - Object containing setup info: { id:[ patients Array ] }
	**/
	init:function( data ){
		
		this.data = data; // reference data Obj.
		this.activePathwayID = 0;
		
		/**
		all '+' icons to add pathways to patient
		**/
		$('.js-add-pathway').click(function( e ){
			e.stopPropagation();
			// need to know where to insert new pathways
			clinic.activePathwayID = $(this).data('id')
			// position popup
			clinic.addPathway( $(this).position() );
		});
		
		/**
		add pathway steps popup. Hidden in DOM 
		**/
		$('#js-add-new-pathway .next-step-add').click(function( e ){
			e.stopPropagation();
			clinic.createNewPathway( $(this) );
		});
		
		/** 
		Allow user to remove any next-steps (grey ones)	
		that have been added to pathway
		**/
		$('.next-step').click(function( e ){
			e.stopPropagation();
			$(this).remove();
		});
		
		/**
		select dropdown assignment capture inital value 
		**/
		$('.clinic-assign-options').each( function(){
			var value = $(this).val();
			$(this).data('previous',value);
		});
		
		/**
		select dropdown assignment watch for changes 
		**/
		$('.clinic-assign-options').change(function() {
			var patientID = $(this).data('id');
			clinic.changeAssignment( $(this).data('previous'), this.value, patientID );
			$(this).data('previous',this.value);
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
		for now easier to setup DOM in JS	
		**/
		this.setupDemoUI();
		
		/**
		filters based on DOM so run after demo setup
		**/
		this.setupFilters();
		this.setDurationGraphics();	
		this.showCurrentTime();
	},	
	
	/**
	All, Doctors, Unassigned, DNA and Tasks
	allows the user to filter the patient list	
	**/
	filterList:function( $filter ){
		var id = $filter.data( 'id' );
		// update UI
		$('.oe-clinic-filter').removeClass('selected');
		$('#filter-'+ id ).addClass('selected');
		
		/** 
		'All' and 'Tasks' are the exceptions to the standard filtering	
		**/
		if( id == 'all' ) {
			
			$('.oe-clinic-list tbody tr').show();
		
		} else if (id == 'tasks') {
			
		
		} else {
			// Doctors, Unassigned and DNA
			// hide others...
			$('.oe-clinic-list tbody tr').hide();
			
			var patients = clinic.data[id];
			for(var i=0; i<patients.length; i++){
				$('#patient-' + patients[i]).show(); // show assigned patients 			
			}
		}
	},
	
	
	/**
	set up ALL filter buttons, use init data
	**/
	setupFilters:function(){
		
		// All is selected by default
		$('#filter-all').addClass('selected');
		
		// set up assignment dropdowns for doctors & show count
		for(obj in clinic.data){
			var patients = clinic.data[obj];
			var id = obj.toString();
			for(var i=0; i<patients.length; i++){
				$('#patient-'+ patients[i] +' .clinic-assign-options').val( id );	
			}
			$('#filter-'+ id + ' .current').text( patients.length );
		}
		
		/**
		build the data for unassigned from the DOM
		note: js has setup the DOM for IDG demo
		**/
		$('.clinic-assign-options').each( function(){
			if( $(this).val() == 'unassigned' && $(this).is(":visible") ){
				var trID = $(this).parents('tr').data('id')
				clinic.data['unassigned'].push( parseInt(trID) );
			}
		});
		$('#filter-unassigned .current').text( clinic.data['unassigned'].length );
	},
	
	/**
	users adds/removes assignment to doctor	
	**/
	changeAssignment:function( prevAssign, newAssign, patientID ){
		patientID = parseInt( patientID );
	
		// remove 
		var index = clinic.data[ prevAssign ].indexOf( patientID );
		if (index > -1) clinic.data[ prevAssign ].splice( index, 1 );

		// add
		clinic.data[ newAssign ].push( patientID );
		
		updateCount( prevAssign );
		updateCount( newAssign );
		
		function updateCount( code ){
			$('#filter-'+ code +' .current').text( clinic.data[ code ].length );
		}
	},
	
	/**
	Show popup containing all options for adding pathways
	This is pre-built in the DOM 
	**/
	addPathway:function( pos ){
		var left = pos.left, 
			top = pos.top - 15; 
		
		$('#js-add-new-pathway')
			.removeClass('hidden')
			.show()
			.css({'left':left, 'top':top })
			.mouseleave(function(){
				$(this).hide();
	  		});
  		
  		$('#js-add-new-pathway .js-close-btn').click(function( e ){
	  		e.stopPropagation();
	  		$('#js-add-new-pathway').hide();
  		});
	}, 
	
	/**
	Create new pathway step in patient
	**/
	createNewPathway:function( $step ){
		// clone DOM and insert into patient pathway
		var $newStep = $step.clone().unbind('click');
		$newStep
			.removeClass('next-step-add')
			.addClass('next-step')
			.click(function( e ){
				e.stopPropagation();
				$(this).remove();
			});

		$('#patient-'+clinic.activePathwayID+' .pathway' ).append( $newStep );
	},
	
	/** 
	set waiting light graphics based on the duration minutes
	**/
	setDurationGraphics:function(){
		
		$('.duration-mins').each(function(){
			var time = parseInt( $(this).text() );
			if( time > 0){	
				var $svg = $(this).parent().children('.duration-graphic'); 

				if (time > 90) { 
					$svg.children('.c4').css({ fill: "#f00" });
				} else if (time > 60) { 
					$svg.children('.c3').css({ fill: "#f60" });
				} else if (time > 40) { 
					$svg.children('.c2').css({ fill: "#ebcd00" });
				} else {
					$svg.children('.c1').css({ fill: "#0c0" });	
				}	
			}
		});		
	},
	
	/** 
	show 'current' time in clinic patient list
	faked for demo purposes
	**/
	showCurrentTime:function(){
		var nowTime = "10:35";
		var future = false;
		$('.oe-clinic-list tbody tr').each( function(){
			var td = $(this).find('td').first();
			
			if(td.text() == "10:35"){
				future = true;
				
				var pos = td.position();
				$('.clinic-time').css( {'top':pos.top - 7 } );
			}
		
			if( future ){
				$(this).addClass('future');
			}
		});	
	},
	
	/** 
	UI setup DEMO (based on DOM elements)
	**/
	setupDemoUI:function(){
		
		/**
		Update UI for Late and DNA
		**/
		$('.pathway').each(function(){
			var firstStep = $(this).children('.pathway-step').first();
			
			// late! 
			if( firstStep.hasClass( 'late' ) ){
				var tr = $(this).parents('tr');
				tr.find('td').first().addClass('time-flag late');
			}
			
			// DNA! 
			if( firstStep.hasClass( 'dna' ) ){
				var tr = $(this).parents('tr');
				tr.find('td').first().addClass('time-flag dna');
				tr.find('.clinic-assign-options').hide();
				tr.find('.js-add-pathway').hide();
				tr.find('.duration-graphic').css('opacity','0.3');
				tr.find('.duration-mins').hide();
			}
		});
		
		/** 
		Show a completed pathway exmaple	
		**/	
		var tr = $( '#patient-'+1152572 );
		var duration = tr.find('.duration-graphic');
		var td = duration.parent();
		duration.hide();
		td.addClass('complete');
		td.children('.duration-mins').append(' mins');
		tr.find('.clinic-assign-options').hide();
		tr.find('.clinic-assign-options').parent().text('Dr Amit Baum (AB)');
		tr.find('.js-add-pathway').hide();
		$('#filter-AB .total').text(1);
		
		
	},
};





