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
		text: 'Appointments: Follow Up',
		align: 'center',
		margin:0,
		y:0, 				// title needs offset to not go under legend in small mode
	},
	
	xAxis: {
		title: {
			text: 'Time',
		},

		labels: {  
			y:25				// move labels further below ticks
		},
	},
	
	yAxis: {
		title:'Count',  
	},
	
	legend: {
		enabled: false
	},
	
	plotOptions: {
            column: {
	            animation: {
					duration: 0, // disable the inital draw animation 
            	}
            }
	},
	
	series: [{
        name: 'Data',
        type: 'column',
        colorIndex:51,
        data: data,
        id: 's1',
    }]
};
	

	
