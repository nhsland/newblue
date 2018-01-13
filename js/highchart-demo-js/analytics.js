// highSTOCK https://api.highcharts.com/highstock/

/*
 * Highchart options (data and positioning only) - all UI stylng is handled in CSS
*/


// Histogram for MR
var appointmentsData = [0,0,0,0,0,0,0,2,5,7,15,30,67,78,45,34,23,10,35,34,67,3,14,20,24,15,16,17,12,14,15,10,9,5,7,4,5,6,3,1,0,0,0,0,0];

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
			text: 'Days',
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
        data: appointmentsData,
        id: 's1',
    }]
};
	

	
