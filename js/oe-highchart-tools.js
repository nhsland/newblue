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
            boxShadow: 0,
        },
        menuStyle: {
            background: chartColor.bg,
        }
		
/*
		// this is for burger menu icon but instead I'm setting in exporting 
        buttonOptions: {
            theme: {
	            fill: '#f00',
	            stroke: '#0f0',
                states: {
                    hover: {   			// undocumented in API!!
                        fill: chartColor.blue,
                    },
                    select: {			// undocumented in API!!
                        stroke: '#039',
                        fill: '#00f'
                    }
                }
            }
        }
*/
    }
}

function chartTitle(title){
	return {
        text: title,
        align: 'center',    
	      style: {
	        color: chartColor.txt,
	        fontSize: '14px',
	        fontWeight: 'normal',
	      }
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
        backgroundColor: chartColor.bg,
        width: null,
        floating:true,
		symbolWidth: 40, // make this wide enought to see the line styles
		 
        itemStyle: { 
	        color: chartColor.txt, 
	        fontSize:'10px',
	        fontWeight:'normal',
	         
	    },
        itemHoverStyle: { 
	        color: chartColor.txtHighlight 
	    }
	}
}

function chartTooltip(){
	return {
		 	backgroundColor: '#141f2c',
		 	borderColor: '#0ff',
		 	borderRadius: 0,
		 	style: {
	            color: '#fff',
	            fontWeight: 'bold'
	        },
	 	
		}
}

function chartNavigator(){
	return  {
        	enabled: true,
        	maskFill: 'rgba(102,133,214,0.1)',
        	outlineColor: '#099',
        	xAxis: {
	        	gridLineColor:"#336",
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
	  color: '#ccc',
	  fontSize: '12px',
	}).add();
	
	drugBanners.push(banner);
}






