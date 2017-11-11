// highSTOCK https://api.highcharts.com/highstock/


var chartHeight = 350;					// fixed height
var MedChart, IOPchart, VAchart;
/*
 * Highchart options (data and positioning only) - all UI stylng is handled in CSS
*/

$(document).ready(function(){
	// create the Medication chart
	MedChart = new Highcharts.chart({
		chart: {
			renderTo: 'chart-meds', 					// <div> id
			className: 'oes-chart-medications-both',	// suffix: -right -left or -both (eyes)
		    height: (8 * 40), 					// needs to be based on the number of series data
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
            labels: {
                // enabled: false
            },
            min: Date.UTC(2012, 11, 01)  // push yAxis (xAxis because inverted) out to show labels
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
				         [
				            1365811200000,
				            1373673600000
				         ]
				      ]
				   },
				   {
				      name:"Ganfort",
				      className:"oes-hs-eye-right-dull",
					  data:[
				         [
				            1373673600000,
				            1460592000000
				         ]
				      ]
				   },
				   {
				      name:"Latanoprost",
					  className:"oes-hs-eye-left-dull",
				      data:[
				         [
				            1365811200000,
				            1373673600000
				         ]
				      ]
				   },
				   {
				      name:"Ganfort",
					  className:"oes-hs-eye-left-dull",
				      data:[
				         [
				            1373673600000,
				            1436918400000
				         ]
				      ]
				   },
				   {
				      name:"Brinzolamide",
				      className:"oes-hs-eye-left-dull",
				      data:[
				         [
				            1420848000000,
				            1436918400000
				         ]
				      ]
				   },
				   {
				      name:"PredForte",
				      className:"oes-hs-eye-left-dull",
				      data:[
				         [
				            1437004800000,
				            1460592000000
				         ]
				      ]
				   },
				   {
				      name:"Chloramphenicol",
					  className:"oes-hs-eye-left-dull",
				      data:[
				         [
				            1437004800000,
				            1439424000000
				         ]
				      ]
				   },
				   {
				      name:"Cosopt",
					  className:"oes-hs-eye-left-dull",
				      "data":[
				         [
				            1445472000000,
				            1460592000000
				         ]
				      ]
				   }
				]
	});
	
	// Create the IOP chart
    IOPchart = new Highcharts.StockChart({
        chart: {
            animation: false,
            renderTo: 'chart-IOP',
            height:500,
            spacing: [15, 10, 15, 10], 			// then make space for title - default: [10, 10, 15, 10] 
        },
        
        title: {
            align: 'center',
            text: 'IOP',
        },

        tooltip: {
            shared:true,
            followTouchMove: false,
            xDateFormat: '<b>%d/%m/%Y</b>',
        },

        plotOptions: {
            series: {
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

        xAxis:{
            labels: {
                enabled: false
            },
            crosshair: {
                snap: false,
                enabled: true
            },
            type: 'datetime',
            plotLines: [{
   
                width: 1,
                value: Date.UTC(2015,07,16),
                label: {
                    text: 'M',
                    rotation: 90,
                    
                },
                zIndex: 1
            },{
                width: 1,
                value: Date.UTC(2015,08,06),
                label: {
                    text: 'SC5FU/Dex',
                    rotation: 90,
                    
                },
                zIndex: 1
            },{
                width: 1,
                value: Date.UTC(2015,09,03),
                label: {
                    text: 'M',
                    rotation: 90,
                   
                },
                zIndex: 1
            },{
                width: 1,
                value: Date.UTC(2015,09,03),
                label: {
                    text: 'SC Dex',
                    rotation: 90,
                    style: {
                        color: '#61899b'
                    }
                },
                zIndex: 1
            },{
                width: 1,
                value: Date.UTC(2015,11,19),
                label: {
                    text: 'Needling 5FU',
                    rotation: 90,
                    style: {
                        color: '#61899b'
                    }
                },
                zIndex: 1
            }]
        },

        yAxis: {
            min: 0,
            max: 60,
            opposite: false,
            labels: {
                enabled: true,
                align: 'left',
                x: -20,
                y: -2,
                style: {
                  color: '#fff'
                }
            },
            style: {
                color: '#fff'
            },
            plotLines: [{
       
                width: 1,
              
                label: {
                    text: 'Target IOP ()',
                
                },
                zIndex: 5
            },
            {
              
                width: 1,
             
                label: {
                    text: 'Target IOP ()',
                    
                },
                zIndex: 5
            }
            ]
        },

        credits: {
            enabled: false
        },

        navigator: {
            enabled: false
        },

        scrollbar : {
            enabled : false
        },
        
        series: [
        	{
		    name: '(VA) ETDRS (R)',
		    type:'line',
		    colorIndex: 11,				// Right Eye 11-13: 11 - solid; 12 - dotted; 13 - dashed
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
			}
	    ]
        
    });
	
	
}); // ready! 


	
