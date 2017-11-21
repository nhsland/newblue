/**
Visual Fields SVG plots and Linear Regression
for single Eye (either Right or Left)

Imported JS from OE to demo VF plots and modified for new IDG interaction

Note: this is currently set up to run of IDG json data file which has fake date data
This will need adjusting for proper UTC date keys in JSON
**/

var vf = {
	
	init:function( eyeSide, highChart ){
		this.eyeSide = eyeSide 				// 'left' or 'right'
		this.highChart = highChart;
		this.VFdata = [];
		this.user = { $color: null, $grey: null, fixed:false, };
		
		this.loadVFdata( '/newblue/js/highchart-demo-js/fields.json' );
	}, 
	
	/**
	user mouseenters SVG plots
	**/
	userSelectsColorPlot:function( $plot, removePrevClass = true ){
		
		if( vf.user.fixed ) return; // fixed, ignore mouseevents
		
		var plotId = $plot.attr('id').split('_');
		vf.chartRegression( parseInt(plotId[2]) );
		
		// update SVG UI
		$plot.addClass('selected-plot');
		
		if(vf.user.$color !== null && removePrevClass ){
			vf.user.$color.removeClass('selected-plot');
		}
		
		vf.user.$color = $plot;
	},
	
	/**
	user mouse clicks to fix SVG plots
	**/
	userFixChangePlot:function( $plot ){
		// ensure plot is correct
		vf.userSelectsColorPlot( $plot, false )
		vf.user.fixed = !vf.user.fixed;
	},
	
	/**
	using chart to set colour plot date range
	**/
	userOverChart:function( x ){
		// 
		vf.setPlotColours( vf.VFdata[ x-1 ].date );
		vf.setPlotGreys( x - 1 );
		 
		// show plot range on chart: 
		vf.highChart.xAxis[0].removePlotBand('plot-range-end');
		vf.highChart.xAxis[0].addPlotLine({
			value: x,
			zIndex:2,
			className:'oes-hs-plotline-blue',
			id: 'plot-range-end'
		});
	},
	
	/**
	Set SVG plot fill	
	**/
	setSVGfill:function( id, color ){
		$( id ).attr('fill',color);
	},
	
	/**
	load in Visual Fields JSON data
	"2" = Right Eye data, "1" = Left
	VFgreyScale image ID, then 54 greyscale plots in array for eye
	
	"UTCdate":{	"2":["105","[30,27,26, ... ]"],
				"1":["123","[14,20,18, ... ]"]	}	
	**/
	loadVFdata:function( jsonURL ){
	    $.ajax({
	        url: jsonURL,
	        type: "GET",
	        dataType: "json",	
			success: function(data) {
				// Not currently using the VF greyscale image ID because 
				// we are drawing the plots onto a greyscale SVG
				// store data:
	            $.each( data, function(index, data){
					// For demo just Right Eye data
					var right = {};
					
					// JSON contains Left and Right Eyes OE data
					// Make sure there is Right data:
	                if (data[2] !== null && typeof data[2] !== 'undefined') {
	                   
						// build Right Eye VF data:
						right.date = parseInt(index); 			// month string (IDG fake data but should be UTC) 	
						right.plots = JSON.parse( data[2][1] ); // convert JSON string array		
	                    vf.VFdata.push( right ); 
	                }
	            });
	
	           vf.setPlotColours( Date.now() ); // set dateIndex to be greater than last date entry to show all data
	           vf.setPlotGreys( vf.VFdata.length - 1 );
	        },
	        cache: false
	    });
	}, 
	/**
	Set Grey Plots
	Data is already provide in Greyscale just needs converting to RGB	
	**/
	setPlotGreys:function( dateIndex ){
		var dateArray = vf.VFdata[dateIndex].plots;
		for( var i=0; i < 54; i++ ){
			var greyHex = Math.floor(dateArray[i] * 7.285).toString(16); // greyscale range 0 - 35 
			vf.setSVGfill( '#vfgrey_' + vf.eyeSide + '_' + i, '#'+ greyHex + greyHex + greyHex );
		}	
	},
	
	/**
	Set all Colours Plots for Eye
	54 dots (SVG). Linear Regression is created from the GreyScale data.
	Linear Regression then is used to create colour plots	
	**/
	setPlotColours:function( dateIndex ){
	    var regression;
	    for( var i = 0; i < 54; i++ ) {
		    // to create the regression need to get all the data for this dot over all dates
	        plotData 	= vf.getAllPlotData( i, dateIndex );
	        // calc regression from all plot data over all dates
	        regression 	= vf.linearRegression( plotData );
	        // now update the UI colors on the SVG plots 
	        vf.setSVGfill( '#vfcp_' + vf.eyeSide + '_' + i, vf.getPlotColour( regression.m, regression.pb) );
	    }
	}, 
	
	/**
	Get all date plots for single plot
	**/
	getAllPlotData:function( plotEyeDot, dateIndex ){
	    var returnArray = [];   
	    // build array of all date plots for this specific plot
	    for( var i = 0, len = vf.VFdata.length; i < len; i++  ){
		    /**
		    The colours for the plots are based on the linear regression
		    Therefore to change the colours the returnArray (that is used to calc regression)
		    must be restricted to a date range in the data
		    **/ 
		    if(vf.VFdata[i].date <= dateIndex){
			    returnArray[i] = [ i+1, vf.VFdata[i].plots[plotEyeDot]];
			} 
	    }  
	    return returnArray;
	}, 
	
	/**
	Show Linear Regression in Highchart	
	**/
	chartRegression:function( i ){
		var data = { 	plots: Array(), 
						line: Array(), 
						regression: Object() };

	    data.plots = vf.getAllPlotData( i, Date.now() ); // get full plot range for highChart
		
	    var regression = vf.linearRegression(data.plots);
	
	    data.line = [ 	[1, regression.m*1+regression.b],
	    				[data.plots.length, regression.m*data.plots.length+regression.b]  ];
	    				
	    data.regression = regression;
	
		/**
		update highChart
		**/
		var chart = vf.highChart;
	    chart.series[0].setData(data.line, false, false);
		chart.series[1].setData(data.plots, false, false);
	    
	    chart.setTitle({
	        text:'Gradient ' + parseFloat(data.regression.m).toFixed(2) + ' P ' + parseFloat(data.regression.pb).toFixed(2),
	    }, false);
	    
	    chart.redraw();
	},
	
	/**
	Create Linear Regression
	**/
	linearRegression:function( data ){

	    var point, ybar=0.0, xbar=0.0;
	    var n = data.length;
	
	    for ( var i = 0; i < n ; i++ ) {
	        point = data[i];
	        ybar = ybar + point[1];
	        xbar = xbar + point[0];
	    }
	    ybar = ybar/(n*1.0);
	    xbar = xbar/(n*1.0);

	    var bhat = 0.0;
	    var ssqx = 0.0;
	
	    for ( var i = 0; i < n; i++ ) {
	        point = data[i];
	        bhat = bhat + (point[1] - ybar)*(point[0] - xbar);
	        ssqx = ssqx + (point[0] - xbar)*(point[0] - xbar);
	    }
	    
	    if(ssqx != 0){
	        bhat = bhat/ssqx;
	    }
	    var ahat = ybar - bhat*xbar;

	    var sigmahat2 = 0.0;
	    var ri = new Array(n);
	    
	    for ( var i = 0; i < n; i++ ) {
	        point = data[i];
	        ri[i] = point[1] - (ahat + bhat*point[0]);
	        sigmahat2 = sigmahat2 + ri[i]*ri[i];
	    }
	    
	    sigmahat2 = sigmahat2 / ( n*1.0 - 2.0 );

	    var seb = Math.sqrt(sigmahat2/ssqx);
		var sigmahat = Math.sqrt((seb*seb)*ssqx);
	    var sea = Math.sqrt(sigmahat*sigmahat * ( 1 /(n*1.0) + xbar*xbar/ssqx));
	
	    var Tb = (bhat - 0.0) / seb;
	    pvalb = vf.studpval(Tb, n);
	
	    var Ta = (ahat - 0.0) / sea;
	    pvala = vf.studpval(Ta, n);
	
	    return{
	        m: bhat,
	        b: ahat,
	        pa: pvala,
	        pb: pvalb
	    }
	},
	
	/**
	pass in regression object to get the color
	**/
	getPlotColour:function( m, P ){
	    if(m < -1){
	        m = -1;
	    } else if(m >= 1){
	        m = 0.99;
	    }
	
	    if(P < 0.1){
	        P = 0.1;
	    }
	    // colourMatrix: [m value range][p value range][colour code]
	    var colourMatrix = [[[-1,-0.9],[0.8,1],"#F4B6B8"],[[-0.9,-0.8],[0.8,1],"#F4B7B1"],[[-0.8,-0.7],[0.8,1],"#F4B6A8"],[[-0.7,-0.6],[0.8,1],"#F4B897"],[[-0.6,-0.5],[0.8,1],"#F5BC8E"],[[-0.5,-0.4],[0.8,1],"#F5BB6F"],[[-0.4,-0.3],[0.8,1],"#F5BB48"],[[-0.3,-0.2],[0.8,1],"#F5C148"],[[-0.2,-0.1],[0.8,1],"#E9C847"],[[-0.1,0],[0.8,1],"#DECB45"],[[0,0.1],[0.8,1],"#D5CF45"],[[0.1,0.2],[0.8,1],"#C5D343"],[[0.2,0.3],[0.8,1],"#B5D643"],[[0.3,0.4],[0.8,1],"#9BDA5C"],[[0.4,0.5],[0.8,1],"#91DA87"],[[0.5,0.6],[0.8,1],"#7BDC9A"],[[0.6,0.7],[0.8,1],"#86DAB1"],[[0.7,0.8],[0.8,1],"#81D9B7"],[[0.8,1],[0.8,1],"#8FD6B9"],[[-1,-0.9],[0.6,0.8],"#EF9699"],[[-0.9,-0.8],[0.6,0.8],"#F09691"],[[-0.8,-0.7],[0.6,0.8],"#EF8D79"],[[-0.7,-0.6],[0.6,0.8],"#EF9069"],[[-0.6,-0.5],[0.6,0.8],"#F0955C"],[[-0.5,-0.4],[0.6,0.8],"#EF923F"],[[-0.4,-0.3],[0.6,0.8],"#F19B41"],[[-0.3,-0.2],[0.6,0.8],"#E7A13F"],[[-0.2,-0.1],[0.6,0.8],"#D9A73E"],[[-0.1,0],[0.6,0.8],"#C1AF3A"],[[0,0.1],[0.6,0.8],"#B8B43A"],[[0.1,0.2],[0.6,0.8],"#AAB738"],[[0.2,0.3],[0.6,0.8],"#98BD37"],[[0.3,0.4],[0.6,0.8],"#80BF45"],[[0.4,0.5],[0.6,0.8],"#66C25E"],[[0.5,0.6],[0.6,0.8],"#60C579"],[[0.6,0.7],[0.6,0.8],"#5DC193"],[[0.7,0.8],[0.6,0.8],"#5DC39A"],[[0.8,1],[0.6,0.8],"#5DC39A"],[[-1,-0.9],[0.4,0.6],"#EC6A75"],[[-0.9,-0.8],[0.4,0.6],"#EC6A69"],[[-0.8,-0.7],[0.4,0.6],"#EC6C58"],[[-0.7,-0.6],[0.4,0.6],"#EB683A"],[[-0.6,-0.5],[0.4,0.6],"#ED703B"],[[-0.5,-0.4],[0.4,0.6],"#DA7B38"],[[-0.4,-0.3],[0.4,0.6],"#D08337"],[[-0.3,-0.2],[0.4,0.6],"#C58834"],[[-0.2,-0.1],[0.4,0.6],"#BA8D34"],[[-0.1,0],[0.4,0.6],"#AE9132"],[[0,0.1],[0.4,0.6],"#A59731"],[[0.1,0.2],[0.4,0.6],"#9D9930"],[[0.2,0.3],[0.4,0.6],"#8F9D2E"],[[0.3,0.4],[0.4,0.6],"#7FA12D"],[[0.4,0.5],[0.4,0.6],"#5AA72A"],[[0.5,0.6],[0.4,0.6],"#53AA36"],[[0.6,0.7],[0.4,0.6],"#52AA64"],[[0.7,0.8],[0.4,0.6],"#51AA78"],[[0.8,1],[0.4,0.6],"#50A982"],[[-1,-0.9],[0.2,0.4],"#DA3F5C"],[[-0.9,-0.8],[0.2,0.4],"#DB414A"],[[-0.8,-0.7],[0.2,0.4],"#DA4334"],[[-0.7,-0.6],[0.2,0.4],"#D84832"],[[-0.6,-0.5],[0.2,0.4],"#C55A2F"],[[-0.5,-0.4],[0.2,0.4],"#BA632E"],[[-0.4,-0.3],[0.2,0.4],"#AE6A2C"],[[-0.3,-0.2],[0.2,0.4],"#A36F2A"],[[-0.2,-0.1],[0.2,0.4],"#9A7529"],[[-0.1,0],[0.2,0.4],"#937728"],[[0,0.1],[0.2,0.4],"#8A7B28"],[[0.1,0.2],[0.2,0.4],"#817E26"],[[0.2,0.3],[0.2,0.4],"#688624"],[[0.3,0.4],[0.2,0.4],"#498920"],[[0.4,0.5],[0.2,0.4],"#459022"],[[0.5,0.6],[0.2,0.4],"#438D52"],[[0.6,0.7],[0.2,0.4],"#418B63"],[[0.7,0.8],[0.2,0.4],"#418B6A"],[[0.8,1],[0.2,0.4],"#418B6A"],[[-1,-0.9],[0.1,0.2],"#BE3348"],[[-0.9,-0.8],[0.1,0.2],"#BD3134"],[[-0.8,-0.7],[0.1,0.2],"#BB2F29"],[[-0.7,-0.6],[0.1,0.2],"#B23227"],[[-0.6,-0.5],[0.1,0.2],"#9E4624"],[[-0.5,-0.4],[0.1,0.2],"#914E21"],[[-0.4,-0.3],[0.1,0.2],"#8B5220"],[[-0.3,-0.2],[0.1,0.2],"#7F581F"],[[-0.2,-0.1],[0.1,0.2],"#795B1F"],[[-0.1,0],[0.1,0.2],"#735E1D"],[[0,0.1],[0.1,0.2],"#6D611C"],[[0.1,0.2],[0.1,0.2],"#66631C"],[[0.2,0.3],[0.1,0.2],"#5D651A"],[[0.3,0.4],[0.1,0.2],"#52681F"],[[0.4,0.5],[0.1,0.2],"#386D17"],[[0.5,0.6],[0.1,0.2],"#346F28"],[[0.6,0.7],[0.1,0.2],"#347043"],[[0.7,0.8],[0.1,0.2],"#316D4F"],[[0.8,1],[0.1,0.2],"#326F54"],[[-1,-0.9],[0.05,0.1],"#8B2436"],[[-0.9,-0.8],[0.05,0.1],"#8B212A"],[[-0.8,-0.7],[0.05,0.1],"#96241F"],[[-0.7,-0.6],[0.05,0.1],"#88211A"],[[-0.6,-0.5],[0.05,0.1],"#783217"],[[-0.5,-0.4],[0.05,0.1],"#6D3B17"],[[-0.4,-0.3],[0.05,0.1],"#683E17"],[[-0.3,-0.2],[0.05,0.1],"#634115"],[[-0.2,-0.1],[0.05,0.1],"#59451D"],[[-0.1,0],[0.05,0.1],"#53451C"],[[0,0.1],[0.05,0.1],"#4F461A"],[[0.1,0.2],[0.05,0.1],"#4C491C"],[[0.2,0.3],[0.05,0.1],"#454A1F"],[[0.3,0.4],[0.05,0.1],"#3E4C22"],[[0.4,0.5],[0.05,0.1],"#2C4F19"],[[0.5,0.6],[0.05,0.1],"#245226"],[[0.6,0.7],[0.05,0.1],"#245333"],[[0.7,0.8],[0.05,0.1],"#24543A"],[[0.8,1],[0.05,0.1],"#24533F"],[[-1,-0.9],[0,0.05],"#61152D"],[[-0.9,-0.8],[0,0.05],"#621525"],[[-0.8,-0.7],[0,0.05],"#62151A"],[[-0.7,-0.6],[0,0.05],"#571D17"],[[-0.6,-0.5],[0,0.05],"#4B261D"],[[-0.5,-0.4],[0,0.05],"#4A2815"],[[-0.4,-0.3],[0,0.05],"#46290C"],[[-0.3,-0.2],[0,0.05],"#3C2E20"],[[-0.2,-0.1],[0,0.05],"#3A2F20"],[[-0.1,0],[0,0.05],"#362F1F"],[[0,0.1],[0,0.05],"#363020"],[[0.1,0.2],[0,0.05],"#343120"],[[0.2,0.3],[0,0.05],"#2F3122"],[[0.3,0.4],[0,0.05],"#2D3325"],[[0.4,0.5],[0,0.05],"#203319"],[[0.5,0.6],[0,0.05],"#1A371F"],[[0.6,0.7],[0,0.05],"#153624"],[[0.7,0.8],[0,0.05],"#153727"],[[0.8,1],[0,0.05],"#15392B"]];
	
	    var minM, maxM, minP, maxP;
	    for(var c=0;c<colourMatrix.length;c++){
	        minM = colourMatrix[c][0][0];
	        maxM = colourMatrix[c][0][1];
	        minP = colourMatrix[c][1][0];
	        maxP = colourMatrix[c][1][1];
	        if((minM <= m && m < maxM) && (minP <= P && P < maxP)){
	            return  colourMatrix[c][2];
	        }
	    }
	},
	
	statcom:function ( mq, mi, mj, mb )
	{
	    zz = 1;
	    mz = zz;
	    mk = mi;
	    while ( mk <= mj ) {
	        zz = zz * mq * mk / ( mk - mb);
	        mz = mz + zz;
	        mk = mk + 2;
	    }
	    return mz;
	},

	studpval:function ( mt , mn )
	{
	    PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679;
	    if ( mt < 0 )
	        mt = -1*mt;
	    mw = mt / Math.sqrt(mn);
	    th = Math.atan2(mw, 1);
	    if ( mn == 1 )
	        return 1.0 - th / (PI/2.0);
	    sth = Math.sin(th);
	    cth = Math.cos(th);
	    if ( mn % 2 == 1 )
	        return 1.0 - (th+sth*cth*vf.statcom(cth*cth, 2, mn-3, -1))/(PI/2.0);
	    else
	        return 1.0 - sth * vf.statcom(cth*cth, 1, mn-3, -1);
	},

/*
	RGBtoHSV:function(color) {
	    var r,g,b,h,s,v;
	    r= color[0];
	    g= color[1];
	    b= color[2];
	    min = Math.min( r, g, b );
	    max = Math.max( r, g, b );
	    v = max;
	    delta = max - min;
	    if( max != 0 )
	        s = delta / max;        // s
	    else {
	        // r = g = b = 0        // s = 0, v is undefined
	        s = 0;
	        h = -1;
	        return [h, s, undefined];
	    }
	    if( r === max )
	        h = ( g - b ) / delta;      // between yellow & magenta
	    else if( g === max )
	        h = 2 + ( b - r ) / delta;  // between cyan & yellow
	    else
	        h = 4 + ( r - g ) / delta;  // between magenta & cyan
	    h *= 60;                // degrees
	    if( h < 0 )
	        h += 360;
	    if ( isNaN(h) )
	        h = 0;
	    return [h,s,v];
	},

	HSVtoRGB:function(color) {
	    var i;
	    var h,s,v,r,g,b;
	    h= color[0];
	    s= color[1];
	    v= color[2];
	    if(s === 0 ) {
	        // achromatic (grey)
	        r = g = b = v;
	        return [r,g,b];
	    }
	    h /= 60;            // sector 0 to 5
	    i = Math.floor( h );
	    f = h - i;          // factorial part of h
	    p = v * ( 1 - s );
	    q = v * ( 1 - s * f );
	    t = v * ( 1 - s * ( 1 - f ) );
	    switch( i ) {
	        case 0:
	            r = v;
	            g = t;
	            b = p;
	            break;
	        case 1:
	            r = q;
	            g = v;
	            b = p;
	            break;
	        case 2:
	            r = p;
	            g = v;
	            b = t;
	            break;
	        case 3:
	            r = p;
	            g = q;
	            b = v;
	            break;
	        case 4:
	            r = t;
	            g = p;
	            b = v;
	            break;
	        default:        // case 5:
	            r = v;
	            g = p;
	            b = q;
	            break;
	    }
	    return [r,g,b];
	}
*/
};

/**
	
Options for Regression HighChart	

**/
var optionsReg = {
		chart: {
            renderTo: 'js-hs-chart-regression',
            height:350,
            // width:400,							// fixed because it was messing up the flex-layout
            spacing: [20, 10, 20, 10], 			// then make space for title - default: [10, 10, 15, 10] 
        },
        
        credits: 		{ enabled: false },  // highcharts url (logo) removed
        scrollbar: 		{ enabled: false },
        
        title: {
            text: 'Select a plot',
        },

        legend: false,
        tooltip: false,
        navigator: false,
    	
        // rangeSelector: 	highHelp.chartRangeSelector(-20,-10),	// offset from bottom right (x,y) "Show all" button
        
        plotOptions: {
            series: {
	            animation: {
					duration: 0, // disable the inital draw animation 
            	},
                marker: {
                    enabled: true,
                    symbol: "circle"
                },
                point: {
	                events: {
		                mouseOver: function(){
			                vf.userOverChart(this.x);
		                }
	                }
                },
            },
        },
        
        xAxis: {
	        title: {
	            text: 'Time',
	        },
	        // type: 'datetime',
	        crosshair:true,
	        labels: {  
	            y:25				// move labels below ticks
	        },
			tickPixelInterval: 50,  // if this is too high the last tick isn't shown (default 100) 
		},
		
		yAxis: {
			title: {
				text: ''
			}, 
			opposite: true,   
	        reversed: false,
	        min:0,
	        max:40,
	    },

		series: [{
                type: 'line',
                colorIndex:11,
                name: 'Regression Line',
                data: [],					// data placeholder
                marker: {
                    enabled: false
                },
            }, {
                type: 'scatter',
                colorIndex:10,
                name: 'Observations',
                data: [],					// data placeholder
                marker: {
                    symbol: 'circle'
                }
            }]
	
	};




