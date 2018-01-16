// highSTOCK https://api.highcharts.com/highstock/

/*
 * Highchart options (data and positioning only) - all UI stylng is handled in CSS
*/

var optionsAnalytics = {
	chart: {
		className: 'oes-chart-analytics',
		height:'60%',					// aspect ratio to height
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
			text: 'Time',
		},

		min:1,
		
		labels: {  
			y:25				// move labels further below ticks
		},
	},
	
	yAxis: {
		title:'Count', 
		min:0,
		max:100 
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
                    showFakePatientDataList(this.chart.title.textStr, event.point.x, event.point.y);
                }
            }
        }
	},
	
	series: [{
        name: 'Data',
        type: 'column',
        colorIndex:51,
    }]
};
	
	
var optionsDiagnoses = {
	chart: {
		className: 'oes-chart-analytics',
		height:'60%',					// aspect ratio to height
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
			text: '',
			
		},
		
		categories: ['Macular degeneration',' Diabetic Macular Oedema (bin)','BRVO','CRVO','Hemivein','Other','No Diagnoses'], 
		
		labels: {  
			y:25				// move labels further below ticks
		},
	},
	
	yAxis: {
		title:'Patients'
		
	},
	
	legend: {
		enabled: false
	},


	plotOptions: {
        bar: {
            animation: {
				duration: 0, // disable the inital draw animation 
        	}
        },
        series: {
            cursor: 'pointer',
            events: {
                click: function (event) {
                    showFakePatientDataList(this.chart.title.textStr, event.point.x, event.point.y);
                }
            }
        }
	},
	
	series: [{
        name: 'Data',
        type: 'bar',
        data:[1256,1100,346,459,34,654,890],
        colorIndex:51,
    }]
} 

	
