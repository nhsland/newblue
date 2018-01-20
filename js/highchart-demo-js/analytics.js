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
		title: {
			text: 'yAxis',
		}, 
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
        colorIndex:50,
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
		
		categories: ['Macular degeneration','DMO','BRVO','CRVO','Hemivein','Other','No Diagnoses'], 
		
		labels: {  
			y:25				// move labels further below ticks
		},
	},
	
	yAxis: {
		title: {
			text: 'Patients',
			
		}
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
        colorIndex:50,
    }]
} 


var aflibercept = 	[58,63,64,64.5,64,63,64,64.3,63,62,61,62,63];
var ranibizumab = 	[59,60.5,61,62,62.5,61,62,61.75,61,60,59,59.5,58];
var errorAflibercept = []; 
var errorRanibizuma = [];

// build error array
for(var i=0; i < aflibercept.length; i++){
	errorAflibercept.push([aflibercept[i]-1,aflibercept[i]+1]);
	errorRanibizuma.push([ranibizumab[i]-1,ranibizumab[i]+1]);
}



var optionsVA = {
	chart: {
		className: 'oes-chart-analytics',
		height:'60%',					// aspect ratio to height
		spacing: [15, 10, 15, 10], 		// then make space for title - default: [10, 10, 15, 10] 
	},
	
	credits: { enabled: false },  // highcharts url (logo) removed
	
	title: {
		text: 'VA Plots',
		align: 'center',
		margin:0,
		y:0, 				// title needs offset to not go under legend in small mode
	},
	
	xAxis: {
		title: {
			text: 'Months',
			
		},
	
		labels: {  
			y:25				// move labels further below ticks
		},
	},
	
	yAxis: {
		title: {
			text: 'ETDRS',
		},
		min:55,
		max:70
	},
	
	legend: {
		enabled:true, 
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        width: null,
        floating:true,
		symbolWidth: 40, // make this wide enought to see the line styles
	},
	
	plotOptions: {
        line: {
            animation: {
				duration: 0, // disable the inital draw animation 
        	}
        },
        errorbar: {
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

    series: [ {
	    name: 'Aflibercept',
        type: 'line',
        colorIndex:51,
        data: aflibercept,
    },{
        name: 'Error Aflibercept',
        type: 'errorbar',
        zIndex:-1,
        data: errorAflibercept,
    }, {
	    name: 'Ranibizumab',
        type: 'line',
        colorIndex:61,
        data: ranibizumab,
    },{
        name: 'Error Ranibizumab',
        type: 'errorbar',
        zIndex:-1,
        data: errorRanibizuma,
    }]
}

	
