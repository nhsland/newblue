// highSTOCK https://api.highcharts.com/highstock/


var chartHeight = 350;					// fixed height
var MedChart, IOPchart, VAchart;
/*
 * Highchart options (data and positioning only) - all UI stylng is handled in CSS
*/

var optionsMeds = {
		chart: {
			renderTo: 'chart-meds', 					// <div> id
			className: 'oes-chart-medications-both',	// suffix: -right -left or -both (eyes)
		    height: (8 * 35), 					// needs to be based on the number of series data
			spacing: [15, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
		    type: 'columnrange', 				// Can be any of the chart types listed under plotOptions. ('line' default)	 
		    inverted: true,
		},
		
		credits: { enabled: false },  // highcharts url (logo) removed
		
	    title: {
	        text: 'Medications',
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
            min: Date.UTC(2012, 11, 1),  // push yAxis (xAxis because inverted) out to show labels
            max: Date.UTC(2017, 6, 1),  // push yAxis (xAxis because inverted) out to show labels
            // tickPixelInterval: 50,  // if this is too high the last tick isn't shown (default 100)
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
		         [ 1365811200000, 1373673600000 ]
		      ]
		   },
		   {
		      name:"Ganfort",
		      className:"oes-hs-eye-right-dull",
			  data:[
		         [ 1373673600000, 1460592000000 ]
		      ]
		   },
		   {
		      name:"Latanoprost",
			  className:"oes-hs-eye-left-dull",
		      data:[
		         [ 1365811200000, 1373673600000 ]
		      ]
		   },
		   {
		      name:"Ganfort",
			  className:"oes-hs-eye-left-dull",
		      data:[
		         [ 1373673600000, 1436918400000 ]
		      ]
		   },
		   {
		      name:"Brinzolamide",
		      className:"oes-hs-eye-left-dull",
		      data:[
		         [ 1420848000000, 1436918400000 ]
		      ]
		   },
		   {
		      name:"PredForte",
		      className:"oes-hs-eye-left-dull",
		      data:[
		         [ 1437004800000, 1460592000000 ]
		      ]
		   },
		   {
		      name:"Chloramphenicol",
			  className:"oes-hs-eye-left-dull",
		      data:[
		         [ 1437004800000, 1439424000000 ]
		      ]
		   },
		   {
		      name:"Cosopt",
			  className:"oes-hs-eye-left-dull",
		      "data":[
		         [ 1445472000000, 1460592000000 ]
		      ]
		   }
		]
	};
	
var optionsIOP = {
        chart: {
            animation: false,
            renderTo: 'chart-IOP',
            height:400,
            spacing: [15, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
        },
        
        credits: 		{ enabled: false },  // highcharts url (logo) removed
        navigator: 		{ enabled: false },
        scrollbar : 	{ enabled: false },
        
        title: {
            align: 'center',
            text: 'IOP',
        },
        
        
        legend: highHelp.chartLegend(),
        
        rangeSelector: {
	        enabled: false,
        },

        tooltip: {
            shared:true,
            followTouchMove: false,
            xDateFormat: '<b>%d/%m/%Y</b>',
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
		    type: 'datetime',
	        title: {
	            text: '',
	        },
	        crosshair: {
			 	snap: true			// blue line
      		},
	        labels: {  
	            y:25				// move labels below ticks
	        },
	        min: Date.UTC(2012, 11, 1),  // push yAxis (xAxis because inverted) out to show labels
            max: Date.UTC(2017, 6, 1),  // push yAxis (xAxis because inverted) out to show labels
			tickPixelInterval: 50,  // if this is too high the last tick isn't shown (default 100) 
			
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
                    text: 'Phakoemulsification and IOL',
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
	        		{ x:Date.UTC(2016, 1, 12), y:10 },
	        		{ x:Date.UTC(2016, 2, 23), y:15 },
	        		{ x:Date.UTC(2016, 11, 25), y:7 },
	        		{ x:Date.UTC(2016, 11, 30), y:14 },
	        		{ x:Date.UTC(2017, 2, 13), y:6 },
	        		{ x:Date.UTC(2017, 4, 21), y:4 },
	        		{ x:Date.UTC(2017, 5, 5), y:4 },
	        		{ x:Date.UTC(2017, 5, 15), y:6 },
	        		{ x:Date.UTC(2017, 5, 17), y:10 },
	        		{ x:Date.UTC(2017, 5, 20), y:15 },
	        ],
			},{
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
	        		{ x:Date.UTC(2016, 1, 12), y:12 },
	        		{ x:Date.UTC(2016, 2, 23), y:16 },
	        		{ x:Date.UTC(2016, 11, 25), y:6 },
	        		{ x:Date.UTC(2016, 11, 30), y:9 },
	        		{ x:Date.UTC(2017, 2, 13), y:6 },
	        		{ x:Date.UTC(2017, 2, 16), y:6 },
	        		{ x:Date.UTC(2017, 4, 21), y:15 },
	        		{ x:Date.UTC(2017, 5, 5), y:2},
	        		{ x:Date.UTC(2017, 5, 15), y:5 },
	        		{ x:Date.UTC(2017, 5, 17), y:14 },
	        		{ x:Date.UTC(2017, 5, 20), y:4 },
	        ],
			}
	    ]
        
    };



$(document).ready(function(){
	// Highcharts.chart 
	// Highchart.StockChart  // Stock Chart has different defaults
	
	// create the Medication chart
	MedChart = new Highcharts.chart( optionsMeds );
	
	// Create the IOP chart
    IOPchart = new Highcharts.chart( optionsIOP );
	
	
}); // ready! 


	
