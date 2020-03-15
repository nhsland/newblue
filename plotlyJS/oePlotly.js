// https://plot.ly/javascript/reference/
const oePlotly = {
	getColorFor: function(plotlyElement, theme){
		// create a way to consistently style the Plot.ly elements
		// based on theme: "dark" or "light"
		const dark = theme === "dark" ? true : false;
		switch(plotlyElement){
			case 'error_y': 
				return dark ? 'rgb(70,70,80)' : 'rgb(120,120,130)';
			
			default: 
				return 'pink'; // no match, flag as pink!
		}
		
	},
	
	getLayout: function(options){
		// set up layout colours based on theme: "dark" or "light"
		const dark = options.theme === "dark" ? true : false;
		
		// build a layout obj
		let layout = {
			hovermode:'closest', // get single point rather than all of them
			autosize:true, // onResize change chart size
			margin: {
				l:60, // 80 default, if Y axis has a title this will need more
				r:60,
				t:30, // if there is a title will need upping to 60
				b:80, // allow for xaxis title
				pad:2, // px between plotting area and the axis lines
				autoexpand:true, // turn off auto margin expansion computations
			},
			// this is the chart area. 
			// had this set at opacity 0.5 for both, to hide the 'paper' set to: 0
			paper_bgcolor: dark ? 'rgba(30,46,66,0.5)' : 'rgba(255,255,255,0.5)',
			// plot area
			plot_bgcolor: dark ? 'rgb(10,10,30)' : '#fff',
			
			// base font settings
			font: {
				family: "Roboto, 'Open Sans', verdana, arial, sans-serif",
				size: dark ? 11 : 13,
				color: dark ? '#aaa' : '#333',
			},
			
			// needs setting up to layout legend better but for now...
			showlegend: options.legend,
			
			legend: {
				font: {
					size: 10
				},
				orientation: 'h', // 'v' || 'h'				
				xanchor:'right',
				yanchor:'top',
				x:1,
				y:1,
				
			}, 
			
			
			hoverlabel: {
				bgcolor: dark ? "#003" : '#fff',
				bordercolor: dark ? '#003' : '#00f',
				font: {
					size:15, // override base font
					color: dark ? '#63d7d6' : '#00f',
				}
			},
		};
		
		/*
		Colours
		*/
		if(options.colors){
			switch(options.colors){
				case "varied":
					layout.colorway = dark ? ['#0a83ea', '#18949f', '#0a0a1e','#3f0aea'] : ['#0a2aea', '#ea0a8e', '#00b827','#890aea'];
				break;	
			}
			
		} else {
			// default blues 
			layout.colorway = ['#0a4198', '#1451b3', '#175ece'];
		}
		
		/*
		Plot title?	
		*/
		if(options.plotTitle){
			
			layout.title = {
				text: options.plotTitle,
				xref: 'paper', //  "container" | "paper"
				yref: 'container', 
				x: 0, // 0 - 1
				y: 0.96,
				font: {
					size:dark ? 15 : 17,
					// color:'#f00' - can override base font
				}, 		
			};
			
			layout.margin.t = 60;
		}

		/*
		Axes
		*/
		let axis = {
			// color: '#fff', // override base font
			linecolor: dark ? '#666' : '#999', // axis line colour
			linewidth:1,
			showgrid: true,
			gridcolor: dark ? '#292929' : '#c9c9c9',
	
			tickmode: "auto",
			nticks: 50, // number of ticks
			ticks: "outside",
			ticklen: 3, // px
			tickcolor: dark ? '#666' : '#ccc',
			automargin: true, //  long tick labels automatically grow the figure margins.
			
			mirror: true, //  ( true | "ticks" | false | "all" | "allticks" )	
		}
		
		// set up X & Y axis
		layout.xaxis = Object.assign({},axis); 
		layout.xaxis.nticks = options.numTicksX;
		
		layout.yaxis = Object.assign({},axis); 
		layout.yaxis.nticks = options.numTicksY;
		
		// turn off zoom?
		if(options.zoom === false){
			layout.xaxis.fixedrange = true;
			layout.yaxis.fixedrange = true;
		}
		
		if(options.rangeX){
			layout.xaxis.range = options.rangeX;
		}
		
		if(options.rangeY){
			layout.yaxis.range = options.rangeY;
		}
		
		
		// add titles?
		if(options.titleX){
			layout.xaxis.title = {
				text: options.titleX,
				standoff:20, // px offset 
				font: {
					size:dark ? 12 : 13,
				}
			}
		}
		
		if(options.titleY){
			layout.yaxis.title = {
				text: options.titleY,
				standoff: 15, // px offset 
				font: {
					size:dark ? 12 : 13,
				}
			}
			// make space for Y title
			layout.margin.l = 80;
		}
		
		// different Y axis? 
		if(options.y2){
			layout.yaxis2 = Object.assign({},axis);
			layout.yaxis2.nticks = options.numTicksY;
			layout.yaxis2.overlaying = 'y';
			layout.yaxis2.side = 'right';
			
			if(options.y2.title){
			layout.yaxis2.title = {
				text: options.y2.title,
				standoff: 15, // px offset 
				font: {
					size:dark ? 12 : 13,
				}
			}
			// make space for Y title
			layout.margin.r = 80;
		}
			
			
		}
		
		
		return layout;
	}, 
	
	findRegression: function(values_x, values_y) {
		// Find Line By Least Squares
	    let sum_x = 0,
	    	sum_y = 0,
			sum_xy = 0,
			sum_xx = 0,
			count = 0,
			x = 0,	// speed up read/write access
			y = 0,
			values_length = values_x.length;
	
		// check we have what we need
	    if (values_length != values_y.length)  throw new Error('The parameters values_x and values_y need to have same size!');
		// nothing!
	    if (values_length === 0) return [ [], [] ];
	
	    /*
	     * Calculate the sum for each of the parts necessary.
	     */
	    for (let v = 0; v < values_length; v++) {
	        x = values_x[v];
	        y = values_y[v];
	        sum_x = sum_x + x;
	        sum_y = sum_y + y;
	        sum_xx = sum_xx + x*x;
	        sum_xy = sum_xy + x*y;
	        count++;
	    }
	
	    /*
	     * Calculate m and b for the formular:
	     * y = x * m + b
	     */
	    const m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
	    const b = (sum_y/count) - (m*sum_x)/count;
	
	    /*
	     * We will make the x and y result line now
	     */
	    let result_values_x = [];
	    let result_values_y = [];
	
	    for (let v = 0; v < values_length; v++) {
	        x = values_x[v];
	        y = x * m + b;
	        result_values_x.push(x);
	        result_values_y.push(y);
	    }
	
	    return {x: result_values_x, y: result_values_y};
	}

};
