// highSTOCK https://api.highcharts.com/highstock/


var chartHeight = 350;					// fixed height
var MedChart, IOPchart, VAchart;

// set the axes MIN and Max to the same
var axisMin = Date.UTC(2012, 11, 1); // push axis out to show Medication labels
var axisMax = Date.UTC(2017, 12, 1);

// resize chart area
// called on resize
function updateChartSize(size){
	MedChart.setSize( size, MedChart.height, false );
	IOPchart.setSize( size, IOPchart.height, false );
	VAchart.setSize( size, VAchart.height, false );
}

/*
 * Highchart options (data and positioning only) - all UI stylng is handled in CSS
*/

var optionsMeds = {
		chart: {
			renderTo: 'chart-meds', 					// <div> id
			className: 'oes-chart-medications-both',	// suffix: -right -left or -both (eyes)
		    height: (3 * 42), 					// needs to be based on the number of series data
		    marginRight: 85,					// plot to chart edge (align right side)
			spacing: [15, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
		    type: 'columnrange', 				// Can be any of the chart types listed under plotOptions. ('line' default)	 
		    inverted: true,
		},
		
		credits: { enabled: false },  // highcharts url (logo) removed
		
	    title: {
	        text: 'Medications, IOP, VA & MD',
	        align: 'center',
	        margin:0,
	        y:0, 				// title needs offset to not go under legend in small mode
	    },
	
	    xAxis: {
	        visible: false,
	        
    	},

		yAxis: {
			title:'',
			type: 'datetime',
			labels: {  
		        enabled:false,
	        },
			crosshair: {
		    	snap:false,    
		    },
            min: axisMin,  
            max: axisMax, 
            tickPixelInterval: 100,  // if this is too high the last tick isn't shown (default 100)  
    	},
    	tooltip: {
            useHtml: true,
            formatter: function () {
                return '<b>' + this.series.name + '</b><br /><b>' + Highcharts.dateFormat('%d/%m/%Y', this.point.low) + ' - '+ Highcharts.dateFormat('%d/%m/%Y', this.point.high);
            }
        },
        
		plotOptions: {
            columnrange: {
	            animation: {
					duration: 0, // disable the inital draw animation 
            	},
                dataLabels: {
	                className:"oes-hs-columnrange-label",
                    enabled: true,
                    inside: false,			// move labels outside of the column area
                    crop: false,
                    overflow: 'justify',
                    padding:5,				// needs to be 0, or else SVG rect shows up with the CSS
                    formatter: function () {
	                    
                        if (this.y == this.point.low) {
                            return this.series.name;
                        } else {                        	
	                        return '';		// because of the padding this is still drawn (css hides it)
	                    }

                    },
                },
                showInLegend:false, 	// no legend
                groupPadding:0,			// effects the column 'height' (0.2 default)
            }	
        },

	    legend: {
	        enabled: false
	    },

	    series: [
		   {
			  name:"Latanoprost",
			  className:"oes-hs-eye-right-dull",
		      data:[
		         [ Date.UTC(2013,03,05), Date.UTC(2013,09,30) ]
		      ]
		   },
		   {
		      name:"Ganfort",
		      className:"oes-hs-eye-right-dull",
			  data:[
		         [ Date.UTC(2013,09,30), axisMax ]
		      ]
		   },
		   {
		      name:"Azopt",
		      className:"oes-hs-eye-right-dull",
			  data:[
		         [ Date.UTC(2015,03,24), axisMax ]
		      ]
		   }
		]
	};
	
var optionsIOP = {
        chart: {
            renderTo: 'chart-IOP',
            height:300,
            marginRight: 85,					// plot to chart edge (align right side)
            spacing: [15, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
        },
        
        credits: 		{ enabled: false },  // highcharts url (logo) removed
        navigator: 		{ enabled: false },
        scrollbar : 	{ enabled: false },
        
        title: {
            align: 'center',
            text: '',
        },
        
        
        legend: highHelp.chartLegend(),
        
        rangeSelector: {
	        enabled: false,
        },

        tooltip: {
            shared:false,
            xDateFormat: '%d/%m/%Y',
        },

        plotOptions: {
            series: {
	            animation: {
					duration: 0, // disable the inital draw animation 
            	},
                marker: {
                    enabled: true,
                    radius: 4,
                    symbol: "circle"
                },
                
            },
            line: {
                showInLegend: true
            }
        },

		yAxis: {
			title: {
				text: ''
			}, 
			opposite: true,   
	        reversed: false,
	        min:0,
	        plotLines: [{
		        className: 'oes-hs-plotline-right',
	            value: 15,
	            width: 1,
	            label: {
	                text: 'Target IOP (R)',
	                align: 'left',
	                y: -5,
	                x: 0
	            },
	            zIndex:1,
	        },{
		        className: 'oes-hs-plotline-left',
	            value: 10,
	            width: 1,
	            label: {
	                text: 'Target IOP (L)',
	                align: 'left',
	                y: -5,
	                x: 0
	            },
	            zIndex:1,
	        }] 
	    },
	    
	    xAxis: {
		    className: "oes-hide-xAxis-lines", // can't make visible: false because of the plotlines!
		    type: 'datetime',
	        title: {
	            text: '',
	        },
	        
	        crosshair: {
		    	snap:false,    
		    },
	        
	        labels: {  
		        enabled:false,
	            y:25				// move labels below ticks
	        },
	        min: axisMin,  
            max: axisMax,
			tickPixelInterval: 100,  // if this is too high the last tick isn't shown (default 100) 
			
			plotLines: [{
                className: 'oes-hs-plotline-blue',
                width: 1,
                value: Date.UTC(2015,07,16),
                label: {
                    text: 'M',
                    rotation: 90,
                    x: 2,
                },
                zIndex: 1
            },{
                className: 'oes-hs-plotline-blue',
                width: 1,
                value: Date.UTC(2015,08,06),
                label: {
                    text: 'SC5FU/Dex',
                    rotation: 90,
                    x: 2,
                },
                zIndex: 1
            },{
                className: 'oes-hs-plotline-blue',
                width: 1,
                value: Date.UTC(2015,09,03),
                label: {
                    text: 'SC Dex',
                    rotation: 90,
                    x: 2,
                },
                zIndex: 1
            },{
                className: 'oes-hs-plotline-blue',
                width: 1,
                value: Date.UTC(2015,11,19),
                label: {
                    text: 'Needling 5FU',
                    rotation: 90,
                    x: 2,
                },
                zIndex: 1
            },{
                className: 'oes-hs-plotline-blue',
                width: 1,
                value: Date.UTC(2016,11,19),
                label: {
                    text: 'Needling 5FU',
                    rotation: 90,
                    x: 2,
                },
                zIndex: 1
            },{
	            className: 'oes-hs-plotline-left-tight',
                width: 1,
                value: Date.UTC(2017,4,21),
                label: {
                    text: 'Phaco + IOL',
                    rotation: 90,
                    x: 2,
                },
                zIndex: 1   
            }]
	    },
        
        series: [
        	{
		    name: 'IOP (R)',
		    type:'line',
		    colorIndex: 11,				// Right Eye 11-13: 11 - solid; 12 - dotted; 13 - dashed
	        data: [	{ x:Date.UTC(2013, 03, 05), y:21 },
	        		{ x:Date.UTC(2014, 05, 20), y:15 },
	        		{ x:Date.UTC(2014, 10, 21), y:12 },	
	        		{ x:Date.UTC(2015, 03, 24), y:11 },	
	        		{ x:Date.UTC(2015, 06, 23), y:11 },
	        		{ x:Date.UTC(2015, 9, 8),	y:7 },
	        		{ x:Date.UTC(2015, 11, 17), y:10 },
	        		{ x:Date.UTC(2016, 1, 12), 	y:10 },
	        		{ x:Date.UTC(2016, 2, 23), 	y:15 },
	        		{ x:Date.UTC(2016, 11, 25), y:7 },
	        		{ x:Date.UTC(2016, 11, 30), y:14 },
	        		{ x:Date.UTC(2017, 2, 13), 	y:6 },
	        		{ x:Date.UTC(2017, 4, 21), 	y:4 },
	        		{ x:Date.UTC(2017, 5, 5), 	y:4 },
	        		{ x:Date.UTC(2017, 5, 15), 	y:6 },
	        		{ x:Date.UTC(2017, 5, 17), 	y:10 },
	        		{ x:Date.UTC(2017, 5, 20), 	y:15 },
	        ],
			},
/*
			{
		    name: 'IOP (L)',
		    type:'line',
		    colorIndex: 21,				// Right Eye 11-13: 11 - solid; 12 - dotted; 13 - dashed
	        data: [	{ x:Date.UTC(2013, 03, 05), y:20 },
	        		{ x:Date.UTC(2014, 05, 20), y:11 },
	        		{ x:Date.UTC(2014, 10, 21), y:12 },	
	        		{ x:Date.UTC(2015, 03, 24), y:8 },	
	        		{ x:Date.UTC(2015, 06, 23), y:12 },
	        		{ x:Date.UTC(2015, 9, 8),	y:8 },
	        		{ x:Date.UTC(2015, 11, 17), y:9 },
	        		{ x:Date.UTC(2016, 1, 12), 	y:12 },
	        		{ x:Date.UTC(2016, 2, 23), 	y:16 },
	        		{ x:Date.UTC(2016, 11, 25), y:6 },
	        		{ x:Date.UTC(2016, 11, 30), y:9 },
	        		{ x:Date.UTC(2017, 2, 13), 	y:6 },
	        		{ x:Date.UTC(2017, 2, 16), 	y:6 },
	        		{ x:Date.UTC(2017, 4, 21), 	y:15 },
	        		{ x:Date.UTC(2017, 5, 5), 	y:2},
	        		{ x:Date.UTC(2017, 5, 15), 	y:5 },
	        		{ x:Date.UTC(2017, 5, 17), 	y:14 },
	        		{ x:Date.UTC(2017, 5, 20), 	y:4 },
	        ],
			}
*/
	    ] 
    };
    

var optionsVA = {
		chart: {
            renderTo: 'chart-VA-MD',
            height:400,
            marginRight: 85,					// plot to chart edge (align right side)
            spacing: [15, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
        },
        
        credits: 		{ enabled: false },  // highcharts url (logo) removed
        scrollbar: 		{ enabled: false },
        
        title: {
            align: 'center',
            text: '',
        },

        legend: highHelp.chartLegend(),
        
        tooltip: {
            shared:false,
            xDateFormat: '%d/%m/%Y',
        },
        
        navigator: {
        	enabled: true,
        	xAxis: {
	        	labels : {
		        	enabled: false,
	        	}
        	}
    	},
    	
        rangeSelector: 	highHelp.chartRangeSelector(-20,-10),	// offset from bottom right (x,y) "Show all" button
        
        plotOptions: {
            series: {
	            animation: {
					duration: 0, // disable the inital draw animation 
            	},
                marker: {
                    enabled: true,
                    radius: 4,
                    symbol: "circle"
                },
            },
            line: {
                showInLegend: true
            }
        },
        
        xAxis: {
		    type: 'datetime',
	        title: {
	            text: '',
	        },
	        
	        crosshair: {
		    	snap:false,    
		    },
	        
	        labels: {  
	            y:25				// move labels below ticks
	        },
	        min: axisMin,  
            max: axisMax,
			tickPixelInterval: 100,  // if this is too high the last tick isn't shown (default 100) 
		},
		
		yAxis: [{
			title: {
				text: ''
			}, 
			opposite: true,   
	        reversed: false,
	    },{
		    title: {
				text: ''
			}, 
			opposite: true,   
	        reversed: false,
	        labels: {
		        format: '{value} dB',
	        },
	    }],

		series: [
			{
		    name: 'VA (R)',
		    type:'line',
		    colorIndex: 11,				// Right Eye 11-13: 11 - solid; 12 - dotted; 13 - dashed
		    yAxis:0,
		    showInNavigator: true,
		    data: [
		    [1362445200000,1],[1362445200000,0.48],[1364860800000,0.26],[1367884800000,0.1],[1371513600000,0],[1374537600000,0.1],[1381795200000,0.1],[1386032400000,0.2],[1394499600000,0.4],[1397520000000,0.2],[1400544000000,0.18],[1413849600000,0.2],[1420506000000,0.22],[1427158800000,0.2],[1435017600000,0.34],[1441670400000,0.3],[1447722000000,0.34],[1452560400000,0.4],[1456189200000,0.4],[1480035600000,-0.08],[1480467600000,0.3],[1486342800000,-0.08],[1487552400000,-0.32],[1488243600000,-0.18],[1488502800000,0.18],[1489626000000,0.18],[1492732800000,0.18],[1493769600000,0.18],[1493942400000,-0.08],[1494806400000,0.18],[1494979200000,-0.08],[1496448000000,0.3],[1496620800000,0],[1496966400000,-0.18],[1502668800000,0.18],[1503619200000,0.18],[1508976000000,-0.08]
		    ],
			},{
		    name: 'MD (R)',
		    type:'line',
		    colorIndex: 12,				// Right Eye 11-13: 11 - solid; 12 - dotted; 13 - dashed
		    yAxis:1,
		    showInNavigator: false,
		    data: [
		    [Date.UTC(2013, 03,05),-3.5],
			[Date.UTC(2013, 7,23),-4.5],
			[Date.UTC(2013, 12,3),-4.5],
			[Date.UTC(2014, 5,20),-6.7],
			[Date.UTC(2014, 10,21),-9.2],
			[Date.UTC(2015, 3,24),-6.2],
			[Date.UTC(2015, 6,23),-5.7],
			[Date.UTC(2015, 11,17),-6.2],
			[Date.UTC(2016, 11,25),-8.9],
			[Date.UTC(2017, 6,05),-14.8]
			]
			}
		] 

	
	};



  


$(document).ready(function(){
	// Highcharts.chart 
	// Highchart.StockChart  // Stock Chart has different defaults

    /**
	 * In order to synchronize tooltips and crosshairs, override the
	 * built-in events with handlers defined on the parent element.
	 */
	$('#charts-container').bind('mousemove touchmove touchstart', function (e) {
	  	
       var event = IOPchart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
       var point = IOPchart.series[0].searchPoint(event, true); // Get the hovered point
 
       VAchart.xAxis[0].drawCrosshair(event);
       IOPchart.xAxis[0].drawCrosshair(event);
       MedChart.yAxis[0].drawCrosshair(event);

	});
	
	
	// create the Medication chart
	MedChart = new Highcharts.chart( optionsMeds );
	
	// Create the IOP chart
    IOPchart = new Highcharts.chart( optionsIOP );
    
    // VA & MD
    VAchart = new Highcharts.chart( optionsVA );
    
    
     // VA has Navigator
    Highcharts.addEvent(VAchart.xAxis[0], 'afterSetExtremes', function (e) {
	   // match Extremes on other charts to VA:
	   IOPchart.xAxis[0].setExtremes( e.min, e.max);
	   MedChart.yAxis[0].setExtremes( e.min, e.max);   	

    });
	

		
	
}); // ready! 


	
