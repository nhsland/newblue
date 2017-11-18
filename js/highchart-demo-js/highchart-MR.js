// highSTOCK https://api.highcharts.com/highstock/

/*
* Positioning of Elements below the xAxis.
* The xAxis is offset to allow space for the banners
* Banners and data Flags are drawn from the xAxis up.	
*/

var drugs = ['Ranibizumab (4)','Eylea (7)'];	// drug banners
var bannersOffset = 65 * drugs.length; 			// offset xAxis to allow space for drug banners
var xAxisOffset = bannersOffset + 10 			// allow for the '>5' flags
var flagYoffset = -35; 							// drug flags are positioned relative to xAxis 

/*
* Highchart options (data and positioning only)
* all UI stylng is handled in CSS
*/
var options_MR = {
		chart: {
		    events: {
		        load: function() {
		          	highHelp.drawBanners(this,drugs);
		        },
		        redraw: function(){
		         	highHelp.drawBanners(this,drugs);
		        }
		    },
			className: 'oes-chart-mr-right',	// suffix: -right -left or -both (eyes)
		    height: 650, 						// chart height fixed px
		    marginTop:80,						// make px space for Legend
			spacing: [30, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
		    type: 'line' 						// Can be any of the chart types listed under plotOptions. ('line' default)	 
		},
			
		credits: { enabled: false },  // highcharts url (logo) removed
		
	    title: 	{
	        text: "Retinal thickness-Visual acuity (Right Eye)",
	        align: 'center',
	        margin:60,
	        y:-10, // title needs offset to not go under legend in small mode
	    },
	    
	    // standard settings
	    legend: 		highHelp.chartLegend(),
		navigator: 		highHelp.chartNavigator(),				
		rangeSelector: 	highHelp.chartRangeSelector(-60,-25),	// offset from bottom right (x,y) "Show all" button
		
	    yAxis: [{ 
		    // primary y axis
			title: {
				text: 'CRT (um)'
			}, 
			opposite: true,   
	        reversed: false,
	    },{
	     	// secondary y axis
		 	title: {
	        	text: 'VA (ETDRS)'
	      	},
	      	opposite: false,
    	}],
	    
	    
	    xAxis: {
	        title: {
	            text: 'Time (months)',
	        },
	        crosshair: {
			 	snap: false,		// blue line smooth
      		},
	        labels: {  
	            y:25				// move labels below ticks
	        },
	        offset: xAxisOffset,   	// this moves the chart up to allow for the banners and other flags
	        min:0, 					// show first tick
	        max:18,					// show last tick
			tickPixelInterval: 50,  // if this is too high the last tick isn't shown (default 100) but depends on chart width
	    },
	
	    plotOptions: {
	        series: {
		        animation:false,
	            point: {
	                events: {
	                    mouseOver: function( e ){
		                    octImgStack.setImg( this.oct ); // link chart points to OCTs
	                    }
	                }
	            },
	            
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
	    
		// ----------------------  Medical Retina Data
		
	    series: [{
		    name: '(VA) ETDRS (R)',
		    type:'line',
		    colorIndex: 11,				// Right Eye 11-13: 11-solid; 12-dotted; 13-dashed
		    yAxis: 1,					// link to yAxis
		    showInNavigator: true,
	        data: [		{x:1,	y:55,	oct:1},
	        			{x:2,	y:61,	oct:2},
	        			{x:3,	y:70,	oct:3},
	        			{x:4,	y:76,	oct:4},
	        			{x:6,	y:80,	oct:5},
	        			{x:8,	y:90,	oct:6},
	        			{x:10,	y:85,	oct:7},
	        			{x:14,	y:60,	oct:8},
	        			{x:18,	y:55,	oct:9},
	        ],
	    },{
		    name: "VA > 5 lines", 				
		    type: "flags",
			className: 'oes-hs-eye-right-dull',	// Not shown in Legend or Navigator color with specific class
		    y: (0 - xAxisOffset + 5), 			// position below chart
		    data: [
		      	{	x: 1, title: "> 5", info : "> 5" },
		      	{	x: 2, title: "> 5", info : "> 5" },
		      	{	x: 3, title: "> 5", info : "> 5" },
		    ]

	    },{ 
	       name: 'CRT (R)',
	       type:'line',
		   colorIndex: 12,				// Right Eye 11-13: 11-solid; 12-dotted; 13-dashed
		   yAxis: 0,					// link to yAxis
	       showInNavigator: true,
	       data: [		{x:1,	y:300,	oct:1},
	        			{x:2,	y:265,	oct:2},
	        			{x:3,	y:190,	oct:3},
	        			{x:4,	y:180,	oct:4},
	        			{x:6,	y:170,	oct:5},
	        			{x:8,	y:200,	oct:6},
	        			{x:10,	y:195,	oct:7},
	        			{x:14,	y:223,	oct:8},
	        			{x:18,	y:267,	oct:9},
	        ],
	    },{
		    name: "Lucentis", 						// chart label is drawn using drawBanners() helper
		    type: "flags",
			className: 'oes-hs-eye-right-dull',		// Not shown in Legend or Navigator color with specific class
		    y: flagYoffset - 50, 					// position over banner rect
		    data: [
		      {
		        x: 0,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 2.5,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 2.8,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 4,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 5,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 8,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 8.4,
		        title: "R",
		        info : "0.4 M, 11D"
		      }]

	    },{
		    name: "Eylea", 							// chart label is drawn using drawBanners() helper
		    type: "flags",
			className: 'oes-hs-eye-right-dull',		// Not shown in Legend or Navigator color with specific class
		    y: flagYoffset, 						// position over banner rect
		    data: [
		      {
		        x: 12,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 13,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 15.5,
		        title: "R",
		        info : "0.4 M, 11D"
		      },
		      {
		        x: 16,
		        title: "R",
		        info : "0.4 M, 11D"
		      }]

	    }]

	};
