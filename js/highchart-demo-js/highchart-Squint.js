// highSTOCK https://api.highcharts.com/highstock/

/*
* Positioning of Elements below the xAxis.
* The xAxis is offset to allow space for the banners
* Banners and data Flags are drawn from the xAxis up.	
*/

var drugs = ['Ranibizumab (4)','Eylea (7)'];	// drug banners
var bannersOffset = 65 * drugs.length; 			// offset xAxis to allow space for drug banners
var xAxisOffset = 0 // bannersOffset + 10 			// allow for the '>5' flags
var flagYoffset = -35; 							// drug flags are positioned relative to xAxis 

/*
* Highchart options (data and positioning only)
* all UI stylng is handled in CSS
*/
var optionsSquint = {
		chart: {
			className: 'oes-chart-squint-both',	// suffix: -right -left or -both (eyes)
		    height: 650, 						// chart height fixed px
		    marginTop:80,						// make px space for Legend
			spacing: [30, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
		    type: 'line' 						// Can be any of the chart types listed under plotOptions. ('line' default)	 
		},
			
		credits: { enabled: false },  // highcharts url (logo) removed
		
	    title: 	{
	        text: "Occlusion VA",
	        align: 'center',
	        margin:60,
	        y:-10, // title needs offset to not go under legend in small mode
	    },
	    
	    // standard settings
	    legend: 		highHelp.chartLegend(),
		navigator: 		highHelp.chartNavigator(),				
		rangeSelector: 	highHelp.chartRangeSelector(),	// offset from bottom right (x,y) "Show all" button
		
	    yAxis: [{ 
		    // primary y axis
			title: {
				text: 'Occulsion time/day (hours)'
			}, 
			opposite: true,   
	        reversed: false,
	    },{
	     	// secondary y axis
		 	title: {
	        	text: 'VA (Snellen Metre)'
	      	},
	      	type:'category',
	      	opposite: false,
    	}],
	    
	    
	    xAxis: {
	        title: {
	            text: 'Time (months)',
	        },
	        type: 'datetime',
	        crosshair: {
			 	snap: false,		// blue line smooth
      		},
	        labels: {  
	            y:25				// move labels below ticks
	        },
	        offset: xAxisOffset,   	// this moves the chart up to allow for the banners and other flags
	        min:Date.UTC(2016, 6, 10), 					// show first tick
	        max:Date.UTC(2016, 11, 25),					// show last tick
			tickPixelInterval: 50,  // if this is too high the last tick isn't shown (default 100) but depends on chart width
	    },
	
	    plotOptions: {
	        series: {
		        animation:false,
	            
	            label: {
		            enabled:false,
	            },
	            
	            marker: {
		            symbol:'circle',
	            }
	        },
	        
	        flags: {
		        shape: "square",
		    	showInLegend: false,
		    	tooltip: {
			    	pointFormatter : function () {
							var s = '<b>'+this.info+'</b>';
							return s;
	        		},
		    	},
	        }
	    },
	    
		// ----------------------   Data
		
	    series: [{
		    name: 'VA (R)',
		    type:'line',
		    colorIndex: 21,				// Right Eye 11-13: 11-solid; 12-dotted; 13-dashed
		    yAxis: 1,					// link to yAxis
		    showInNavigator: true,
	        data: [		{ x:Date.UTC(2016, 6, 10), 	y:110, name:"6/6" },
	        			{ x:Date.UTC(2016, 7, 22), 	y:110, name:"6/6" },
						{ x:Date.UTC(2016, 9, 2), 	y:110, name:"6/6" },	
						{ x:Date.UTC(2016, 10, 14), y:110, name:"6/6"	},
						{ x:Date.UTC(2016, 11, 25), y:110, name:"6/6" },	
	        ],
	    },{ 
	       name: 'VA (L)',
	       type:'line',
		   colorIndex: 11,				// Right Eye 11-13: 11-solid; 12-dotted; 13-dashed
		   yAxis: 1,					// link to yAxis
	       showInNavigator: true,
	       data: [		{ x:Date.UTC(2016, 6, 10), 	y:71, name:"6/36" },
	        			{ x:Date.UTC(2016, 7, 22), 	y:80, name:"6/36" },
						{ x:Date.UTC(2016, 9, 2), 	y:95, name:"6/36" },	
						{ x:Date.UTC(2016, 10, 14), y:101, name:"6/36" },
						{ x:Date.UTC(2016, 11, 25), y:101, name:"6/36" },
	        ],
	    }]

	};
