var eyeR = "#9fec6d"; // green
var eyeL = "#fe6767"; // red
var blue = "#00aeff";	
var bannerColor = '#384855';

var bannerBox1, bannerBox1Label = null;
  function drawBanner(chart) {
    if (bannerBox1){
      bannerBox1.element.remove();
      bannerBox1Label.element.remove();
 
    }

    bannerBox1 = chart.renderer.rect(0, chart.chartHeight - (chart.xAxis[0].bottom - 10), chart.chartWidth -35 , 45, 00)
    .attr({
      'stroke-width': 0,
      stroke: bannerColor,
      fill: bannerColor,
      zIndex: 1,
    })
    .add();

    bannerBox1Label = chart.renderer.text('Very long drug name here (7)', 5, chart.chartHeight - (chart.xAxis[0].bottom - 23))
    .attr({
      zIndex: 5
    })
    .css({
      color: '#ccc',
      fontSize: '12px',
      fontWeight: '300',
    }).add();

  };
  
  function chartOct(num){
	$('#oct_img_'+oct).hide();
	$('#oct_img_'+num).removeClass('hidden').show();

	oct = num;
};


		
	// Good code:
	var options = {
	    chart: {
		    events: {
		        load: function() {
		          drawBanner(this);
		        },
		        redraw: function(){
		          drawBanner(this);
		        }
		        
		      },
			renderTo: 'chart',
		    backgroundColor:'#141f2c',
		    height: 600,
		},
		
	    title: {
	        text: ''
	    },  
	    
	    
	    legend: {
	        layout: 'vertical',
	        align: 'left',
	        width: 140,
	        floating:true,
			symbolWidth: 30,
			verticalAlign: 'top', 
	        itemStyle: { "color": "#aaa", fontSize:'10px' },
	        itemHoverStyle: { "color": "#ccc" }
	    },

	    
	    tooltip: {
		 	backgroundColor: '#141f2c',
		 	borderColor: '#0ff',
		 	borderRadius: 0,
		 	style: {
	            color: '#fff',
	            fontWeight: 'bold'
	        },
/*
	        formatter: function () {
	            var s = '<b>Right Eye</b>';
	
	            $.each(this.points, function () {
	                s += '<br/>' + this.series.name + ': ' +
	                    this.y + 'm';
	            });
	
	            return s;
	        },
*/
		 	
		},
	
	    yAxis: {
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
	         
	    },
	    
	    xAxis: {
		  
		    offset: 100,   // this moves the chart up to allow for the banners
	        title: {
	            text: 'Time Months',
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
		                    chartOct( this.x );
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
	        }
	    },
	   
	
	    series: [{
		    name: '(VA) ETDRS (R)',
	        data: [55,61,70,76,[6,80],[8,90],[9,85]],
	        color:eyeR,
	    },{
	       name: 'CRT (R)',
	       dashStyle: "shortdot",
	       data: [300,265,190,180,[6,170],[8,200],[9,195]],
	       color:eyeR,
	    },{
		    name: "Placeholder Data Point",
			color: "rgba(90, 90, 90, 0.0)",
			showInLegend: false,
			data: [550] 
	    },{
		    type: "flags",
		    name: "Drug name",
		    y: -65, // position over banner rect
		    "data": [
		      {
		        "x": 1,
		        "title": "R"
		      },
		      {
		        "x": 2.5,
		        "title": "R"
		      },
		      {
		        "x": 2.8,
		        "title": "R"
		      },
		      {
		        "x": 4,
		        "title": "R"
		      },
		      {
		        "x": 5,
		        "title": "R"
		      },
		      {
		        "x": 8,
		        "title": "R"
		      },
		      {
		        "x": 8.4,
		        "title": "R"
		      }]

	    }]

	};
	
	var chart = new Highcharts.Chart(options);