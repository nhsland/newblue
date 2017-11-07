$(document).ready(function() {

  var urlData = '/userinterface/js/mr.json';
  var chart = undefined;
  var eyeLeft = '#b1e270';    // 1
  var eyeRight = '#ef786f';   // 2
  
  var bgColor = '#141f2c';
  var bannerColor = '#384855';
 

  var bannerBox1, bannerBox1Label, bannerBox2, bannerBox2Label, bannerBox3, bannerBox3Label = null;
  function drawBanner(chart) {
    if (bannerBox1){
      bannerBox1.element.remove();
      bannerBox1Label.element.remove();
      bannerBox2.element.remove();
      bannerBox2Label.element.remove();
    }

    bannerBox1 = chart.renderer.rect(10, chart.chartHeight - (chart.xAxis[0].bottom - 10), chart.chartWidth -35 , 20, 00)
    .attr({
      'stroke-width': 0,
      stroke: bannerColor,
      fill: bannerColor,
      zIndex: 1,
    })
    .add();

    bannerBox2 = chart.renderer.rect(0, chart.chartHeight - (chart.xAxis[0].bottom - 60), chart.chartWidth -35 , 20, 00)
    .attr({
      'stroke-width': 0,
      stroke: bannerColor,
      fill: bannerColor,
      zIndex: 1,
    })
    .add();


    bannerBox1Label = chart.renderer.text('Lucentis (7)', 5, chart.chartHeight - (chart.xAxis[0].bottom - 10))
    .attr({
      zIndex: 5
    })
    .css({
      color: '#fff',
      fontSize: '10px'
    }).add();

    bannerBox2Label = chart.renderer.text('Eylea (14)', 5, chart.chartHeight - (chart.xAxis[0].bottom - 43))
    .attr({
      zIndex: 5
    })
    .css({
      color: '#fff',
      fontSize: '10px'
    }).add();

   
  }

  var options = {
    rangeSelector: {
      selected: 1
    },

    chart: {
      events: {
        load: function() {
          drawBanner(this);
        },
        redraw: function(){
          drawBanner(this);
        }
      },
      height: 600,
      renderTo: 'chart',
      backgroundColor: bgColor,
      plotBackgroundColor: bgColor,
      style: {
        fontFamily: 'Roboto',
        color: '#fff'
      }
    },

    plotOptions: {
      series: {
        showInNavigator: true,
        marker: {
          enabled: true,
          radius: 4,
          symbol: "circle"
        }
      }
    },

    rangeSelector: {
      enabled: false
    },

    navigator: {
      enabled: true,
      height: 20,
      outlineColor: '#ff0000',
      maskFill: 'rgb(30, 50, 200)',
      series: {
        color: 'rgba(90, 90, 90, 0.0)',
        lineWidth: 0
      },
      xAxis: {
        tickColor: '#adadad',
        labels: {
          align: 'center',
          style: {
            color: '#fff'
          },
          y: -5
        }
      }
    },

    scrollbar: {
      barBackgroundColor: '#434343',
      buttonArrowColor: '#fff',
      buttonBackgroundColor: '#434343',
      buttonBorderColor: '#434343',
      rifleColor: '#fff',
      trackBackgroundColor: '#333333',
      trackBorderColor: '#333333'
    },

    xAxis: {
      gridLineColor: '#6b6b6b',
      offset: 100,   // this moves the chart up to allow for the banners
      type: 'datetime',
      tickColor: '#adadad',
      labels: {
        style: {
          color: '#fff'
        }
      },
      crosshair: {
        color: '#3db0fb',
        snap: true
      },
      plotLines: [{
        color: bannerColor,
        width: 1,
        value: 1454544000000,
        label: {
          text: 'DRSS rep',
          rotation: 90,
          style: {
            color: bannerColor
          }
        },
        zIndex: 1
      },{
        color: eyeLeft,
        width: 1,
        value: 1456185600000,
        label: {
          text: 'Laser',
          rotation: 90,
          style: {
            color: eyeLeft
          }
        },
        zIndex: 1
      },{
        color: eyeRight,
        width: 1,
        value: 1460764800000,
        label: {
          text: 'Phaco IOL',
          rotation: 90,
          style: {
            color: eyeRight
          }
        },
        zIndex: 1
      }]
    },

    yAxis: [{
      gridLineColor: '#6b6b6b',
      opposite: false,
      margin:'80',
      title: {
        text: 'VA (ETDRS)',
        style: {
          color: '#fff',
        }
      },
      labels: {
        format: '{value}',
        style: {
          color: '#fff'
        }
      },
      x:60,
      
    },
    {
      gridLineColor: '#6b6b6b',
      opposite: true,
      title: {
        text: 'SFT (um)',
        style: {
          color: '#fff'
        }
      },
      labels: {
        format: '{value} um',
        style: {
          color: '#fff'
        }
      }
    }],

    title: {
      align: 'center',
      text: '',
      style: {
        color: '#fff',
        fontSize: '14px'
      }
    },

    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          symbolStroke: '#fff',
          theme: {
            fill: bgColor,
            strokeFill: '#fff',
          }
        }
      }
    },

    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      backgroundColor: bgColor,
      width: 140,
      symbolWidth: 30,
      itemWidth: 70,
      itemStyle: {
        width: 60,
        color: '#fff',
        fontSize: '10px'
      }
    },

    tooltip: {
      borderColor: '#3db0fb',
      backgroundColor: bgColor,
      borderWidth: 2,
      style: {
        color: '#fff'
      },
      shared: false
    },

    credits: {
      enabled: false
    },

    series: [{}] // json
  };

  $.getJSON(urlData, function(mrData) {
    options.series = mrData;
    chart = new Highcharts.StockChart(options);
  });

  


/*
  $('#oct-images').mousemove(function(e) {
    var offset = $(this).offset();
    changeOctImages(e.pageX - offset.left, $(this).width());
  });
*/

/*
  function changeOctImages(xCoord, imageWidth) {

    var $octImages = $('#oct-images img');
    // var imageCount = $octImages.length - 1;
    imageCount = 5;   // Zero based array
    var currentIndex = Math.round(xCoord/(imageWidth/imageCount));

    $('#oct-image-current').attr('src', urlImg + (currentIndex + 1) + '.jpg');
  };
*/

});