// highSTOCK https://api.highcharts.com/highstock/

/*
 * Highchart options (data and positioning only) - all UI stylng is handled in CSS
*/

var optionsAnalytics = {
	chart: {
		className: 'oes-chart-analytics',
		height:'55%',					// aspect ratio to height
		spacing: [15, 10, 15, 10], 		// then make space for title - default: [10, 10, 15, 10] 
	},
	
	credits: { enabled: false },  // highcharts url (logo) removed
	
	title: {
		text: '',
		align: 'center',
		margin:0,
		y:0, 				// title needs offset to not go under legend in small mode
	},
	
	xAxis: {
		title: {
			text: 'dB/year',
		},

		min:-35,
		max:15,
		
		labels: {  
			y:25				// move labels further below ticks
		},
		
		reversed:true, 
	},
	
	yAxis: {
		title: {
			text: 'Count',
		}, 
		min:0,
		max:1200,
		
	},
	
	legend: {
		enabled: false
	},


	plotOptions: {
        column: {
            animation: {
				duration: 0, // disable the inital draw animation 
        	}
        },
        series: {
            cursor: 'pointer',
            events: {
                click: function (event) {
                    demoDrillDown(event.point.x);
                }
            },
            pointWidth: 5
        }
	},
	
	series: [{
        name: 'Data',
        type: 'column',
        data: [[10,35],[9,45],[8,23],[6,23],[7,20],[5,14],[4,23],[3,12],[2,34],[1,16],[0,67],[-1,78],[-2,90],[-3,99],[-4,134],[-5,345],[-6,453],[-7,654],[-8,988],[-9,1001],[-10,1243],[-11,1209],[-12,1134],[-13,980],[-14,887],[-15,677],[-16,566],[-17,435],[-18,342],[-19,322],[-20,321],[-21,221],[-22,124],[-23,109],[-24,89],[-25,56],[-26,34],[-27,22],[-28,33],[-29,12],[-30,4]],       
        colorIndex:50,
    }]
};
	
/*
[10,45],[5,56],[3,55],[1,67],[0,99],[-1,102],[-3,204],[-5,306],[-7,234],[-9,244],[-11,125],
        [-13,103],[-15,78],[-17,45],[-19,34],[-21,23],[-23,15],[-25,6]	
*/	
	
	
	
	
var optionsRegression = {
	chart: {
		className: 'js-hs-chart-analytics-drill',
		height:'55%',					// aspect ratio to height
		spacing: [15, 10, 15, 10], 		// then make space for title - default: [10, 10, 15, 10] 
	},
	
	credits: { enabled: false },  // highcharts url (logo) removed
	
	title: {
		text: '',
		align: 'center',
		margin:0,
		y:0, 				// title needs offset to not go under legend in small mode
	},
	
	xAxis: {
		title: {
			text: 'Age (year)',
		},

		min:0,
		max:100,
		
		labels: {  
			y:25				// move labels further below ticks
		},
		
	},
	
	yAxis: {
		title: {
			text: 'db',
		}, 
		
		min:-30,
		max:5,
		
	},
	
	legend: {
		enabled: false
	},

	plotOptions: {
        series: {
            cursor: 'pointer',
            pointWidth: 10,
            marker: { enabled: false },
            enableMouseTracking: false,
            animation: { duration: 0, }
        }
	},
	
	series: [{
    		type: 'line',
		data: [],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [],
		colorIndex: 11,
  	}]
	
/*
	series: [{
    		type: 'line',
		data: [[35,-1],[75, -15]],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [[40, -2],[64,-15]],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [[36, -4],[55,-16]],
		colorIndex: 11,
  	},{
	  	type: 'line',
		data: [[55, -5],[67,-18]],
		colorIndex: 11,	
  	},{
	  	type: 'line',
		data: [[43,-2],[56,-7]],
		colorIndex: 11,
  	}]
*/
  
};

/*
	
	line 2 [[40, -2],[64,-15]]
line 3[[36, -4],[55,-16]]
line 4
line 5
	{
	type: 'scatter',
name: 'Observations',
data: [[55,10],[60,20],[65,34],[70,34]],
marker: {
	radius: 4
	},
	colorIndex:50,
	
	}
*/
	
