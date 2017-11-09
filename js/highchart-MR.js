var eyeR = chartColor.eyeR // green
var eyeL = "#fe6767"; // red
var blue = "#00aeff";	
var bannerColor = '#384855';

// highSTOCK https://api.highcharts.com/highstock/

var drugs = ['Lucentis (7)','Eylea (4)'];
var chartHeight = 650;
var xAxisOffset = 60 * drugs.length; // offset xAxis to allow space for drug banners

// resize chart area
function updateChartSize(size){
	chart.setSize( size, chartHeight, false );
}

// HighChart options
// MR VA Right Eyes
var options = {
		chart: {
		    events: {
		        load: function() {
		          	drawBanners(this,drugs);
		        },
		        redraw: function(){
		         	drawBanners(this,drugs);
		        }
		    },
			renderTo: 'chart', 					// <div> id
		    backgroundColor: chartColor.bg, 	// outline
		    height: chartHeight, 				// px
		    // spacing: [10, 10, 15, 10], 		// default: [10, 10, 15, 10] outer edge of the chart and the content (doesn't effect SVG banners)
		    // type: 'line' 					// Can be any of the chart types listed under plotOptions. ('line' default)	
		   
		},
		
		colors:['#00f'], // default colors for the chart's series (shows if not set elsewhere)
		
		credits: { enabled: false }, // highcharts url (logo) removed
		
		navigation: chartNavigation(),
		
	    title: 		chartTitle('Retinal thickness-Visual acuity (Right Eye)'),
	    
	    legend: 	chartLegend(),

	    tooltip: 	chartTooltip(),
		
		navigator: 	chartNavigator(),
		
		exporting:	chartExporting(), 
		
		
		// labels are HTML overlays that can be positioned on the chart
		// They are not moved or affected by the navigator
/*
		labels: {
			items:[{
				html:'Hi ya!',
				style: {
				    left: '100px',
				    top: '100px'
				}	
			}],
		},
*/
	
	    yAxis: [{
		    opposite: true,
		      title: {
		        text: 'CRT (um)',
		        style: {
		          color: '#ccc'
		        }
		      },
		    
	       	        
	        gridLineColor: '#777',
	         
	        labels: {
	            style: {
	                  "color": "#fff",
	            }
	        },
	        
	        reversed: false,
	         
	    },{
		    gridLineColor: '#777',
			opposite: false,
	      title: {
	        text: 'VA (ETDRS)',
	        style: {
	          color: '#ccc',
	        }
	      },
	      labels: {
	        format: '{value}',
	        style: {
	          color: '#fff'
	        }
	      },
      
    	}],
	    
	    xAxis: {
		    offset: 120,   // this moves the chart up to allow for the banners
	        title: {
	            text: 'Time Months',
	        },
	        
	         crosshair: {
        color: '#3db0fb',
        snap: true
      },
	        
	        lineColor: '#aaa',
	        
	        labels: {
	            style: {
	                  "color": "#fff",
	            },
	            
	            y:25,
	        }
	    },
	   
	
	    plotOptions: {
	        series: {
		        cursor: 'pointer',
		        animation:false,
	            pointStart: 1,
	            
	            point: {
	                events: {
	                    click: function (e) {
	                      	console.log( this.options );
	                    }, 
	                    mouseOver: function( e ){
		                    oes.changeOCT( this.oct );
	                    }
	                }
	            },
	            
	            marker: {
		            symbol:'circle',
	            }
	        },
	        
	        flags: {
		        fillColor: "#696",
		        shape: "square",
		        lineWidth: 0,
		        style: {
				 	color: "#fff",
		    	},
		    	
		    	
		    	showInLegend: false,
		    	tooltip: {
			    	pointFormatter : function () {
							var s = '<b>'+this.info+'</b>';
	
							return s;
	        		},
		    	},
		    	states: {
			    	hover: {
				    	brightness: 0.1,
				    	fillColor: '#060',
			    	}
		    	}
	        }
	    },
	    
	
	    series: [{
		    name: '(VA) ETDRS (R)',
		    showInNavigator: true,
	        data: [		{x:1,y:55,oct:1},
	        			{x:2,y:61,oct:2},
	        			{x:3,y:70,oct:3},
	        			{x:4,y:76,oct:4},
	        			{x:6,y:80,oct:5},
	        			{x:8,y:90,oct:6},
	        			{x:10,y:85,oct:7},
	        			{x:14,y:60,oct:8},
	        			{x:18,y:55,oct:9},
	        ],
	        		
	        		
	        		
	        color:eyeR,
	    },{
	       name: 'CRT (R)',
	       showInNavigator: true,
	       dashStyle: "shortdot",
	        data: [		{x:1,y:300,oct:1},
	        			{x:2,y:265,oct:2},
	        			{x:3,y:190,oct:3},
	        			{x:4,y:180,oct:4},
	        			{x:6,y:170,oct:5},
	        			{x:8,y:200,oct:6},
	        			{x:10,y:195,oct:7},
	        			{x:14,y:223,oct:8},
	        			{x:18,y:267,oct:9},
	        ],
	        	
	       color:eyeR,
	    },{
		    name: "Placeholder Data Point",
			color: "rgba(90, 90, 90, 0.0)",
			showInLegend: false,
			enableMouseTracking: false,
			data: [550] 
	    },{
		    type: "flags",
		    name: "Drug name",
		   
		    y: -85, // position over banner rect
		    "data": [
		      {
		        "x": 1,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 2.5,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 2.8,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 4,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 5,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 8,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 8.4,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      }]

	    },{
		    type: "flags",
		    name: "Drug name",
		    y: -35, // position over banner rect
		    "data": [
		      {
		        "x": 12,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 13,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 15.5,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      },
		      {
		        "x": 16,
		        "title": "R",
		        "info" : "0.4 M, 11D"
		      }]

	    }]

	};
	
var chart = new Highcharts.Chart(options);