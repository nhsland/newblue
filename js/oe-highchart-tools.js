/*

--------  This is NOT production JS!! ------------

It is simply provided to demo & review UI design work on IDG idg.knowego.com

// note: using highSTOCK https://api.highcharts.com/highstock/

*/

var chartColor = {
		bg : "#141f2c", // dark blue bg
		eyeR : "#9fec6d", // green
		eyeL : "#fe6767", // red
		blue : "#00aeff",	
		bannerColor : '#384855',
		txt : "#aaa",
		txtHighlight : "#ccc",
		blue: "#3db0fb",  	// highlight blue
		blueDark:"#266d9b",
};


function chartNavigation(){
	return {
		// this controls the export popup menu (and other menu items)
		// note: It seems you can just drop ANY CSS style in here
		menuItemHoverStyle: {
			background: chartColor.blueDark,
			color: '#fff',
		},
		menuItemStyle: {
            color: '#fff',
        },
        menuStyle: {
            background: chartColor.bg,
            "box-shadow": "none",
        }
    }
}

function chartTitle(title){
	return {
        text: title,
        align: 'center',    
    }  
}

function chartExporting(){
	return {
      enabled: true, // default
      symbolX:10,
	  symbolY:10,

		buttons: {
		contextButton: {
			theme: {
				fill: chartColor.bg,
				states: {
				    hover: {   			// undocumented in API!!
				        fill: chartColor.blue,
				    },
				    select: {			// undocumented in API!!
				        fill: '#fff'
				    }
				}
			}
		  
		}
		}

    }
}

function chartLegend(){
	return {
		enabled:true, 
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        width: null,
        floating:true,
		symbolWidth: 40, // make this wide enought to see the line styles
	}
}

function chartNavigator(){
	return  {
        	enabled: true,
        	xAxis: {
	        	labels : {
		        	enabled: false,
	        	}
        	}
    	}
}

// --------------------  Drug Banner Area under xAxis
var drugBanners = [];
// banners have to be redrawn on load and redraw
function drawBanners( highChart, drugsArr ){
	
	// remove previous SVGs
	if(drugBanners.length){
		for( var i=0; i<drugBanners.length; i++){
			drugBanners[i].box.element.remove();
			drugBanners[i].label.element.remove();
		}
		drugBanners = [];
	}
	
	// draw new SVGs
	for( var i=0; i<drugsArr.length; i++){
		buildBanners(highChart,drugsArr[i]);
	}
}


function buildBanners( highChart, drugStr ){
	
	var yOffset = (drugBanners.length * 50) + 10;
	var padding = 10;
	var x = padding;
	var y = highChart.chartHeight - ( highChart.xAxis[0].bottom - yOffset ); 
	var h = 45;
	var w = highChart.chartWidth - (padding * 2 );
	
	
	// rect (x,y,w,h,radius,border)
	var banner = {};
	
	// create box for drugs
	banner.box = highChart.renderer.rect( x, y, w, h)
	.attr({
		'stroke-width': 0,
		stroke: chartColor.bannerColor,
		fill: chartColor.bannerColor,
		zIndex: 1,
	})
	.add();
	
	// create label for drugs
	banner.label = highChart.renderer.text(drugStr, x + 4, y + 14 )
	.attr({
	  zIndex: 5
	})
	.css({
	  //color: '#ccc',
	  //fontSize: '12px',
	}).add();
	
	drugBanners.push(banner);
}






