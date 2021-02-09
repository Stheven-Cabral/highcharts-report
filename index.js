let geoData = [
  ['Africa', 0.00],
  ['Asia', 5.00],
  ['Oceania', 5.00],
  ['Europe', 2.00],
  ['North America', 88.00],
  ['South America', 0.00]
];

/* Printing */
Highcharts.setOptions({ // Apply to all charts
  chart: {
    events: {
      beforePrint: function () {
        this.oldhasUserSize = this.hasUserSize;
        this.resetParams = [this.chartWidth, this.chartHeight, false];
        this.setSize(200, 400, false);
      },
      afterPrint: function () {
        this.setSize.apply(this, this.resetParams);
        this.hasUserSize = this.oldhasUserSize;
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {

  /* Asset Allocation Pie Chart */
  const chart = Highcharts.chart('chart-container-1', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Asset',
      colorByPoint: true,
      data: [{
        name: 'Cash',
        y: 30.00,
      }, {
        name: 'US Stocks',
        y: 30.00
      }, {
        name: 'International Stocks',
        y: 12.50
      }, {
        name: 'ETFs',
        y: 2.50
      }, {
        name: 'Bonds',
        y: 5.00
      }, {
        name: 'Fixed Income',
        y: 5.00
      }, {
        name: 'Other',
        y: 15.00
      }]
    }],
    exporting: {
      printWidth: 50
    }
  });


  /* Asset Allocation Map by Geography */
  const geoChart = Highcharts.getJSON('https://code.highcharts.com/mapdata/custom/world-continents.geo.json', function (geojson) {
    // Initiate the chart
    Highcharts.mapChart('chart-container-2', {
      chart: {
        map: geojson
      },

      title: {
        text: ''
      },

      mapNavigation: {
        enabled: false
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      colorAxis: {
        tickPixelInterval: 100,
        minColor: '#E6E9F4',
        maxColor: '#26ACD2'
      },
      series: [{
        data: geoData,
        keys: ['name', 'value'],
        joinBy: 'name',
        name: '% Assets by Geo',
        states: {
          hover: {
            color: '#a4edba'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.properties.postal}'
        }
      }]
    });
  });

  /* Portfolio 1 Year Performance Line Chart */
  const lineChart1Y = Highcharts.chart('chart-container-3', {
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Thousand ($)'
      }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
      series: {
        color: '#1B9A46'
      }
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    series: [{
      type: "line",
      name: 'Performance (1 Year)',
      data: [10000, 12000, 5000, 30000, 18000, 21000, 27000, 30000, 29000, 41000, 26000, 39000]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });

  /* Portfolio 5 Year Performance Line Chart */
  const lineChart5Y = Highcharts.chart('chart-container-4', {
    title: {
      text: ''
    },

    subtitle: {
      text: ''
    },

    yAxis: {
      title: {
        text: 'Thousand ($)'
      }
    },
    xAxis: {
      categories: ['Jan', 'Jul 2016', 'Jan', 'Jul 2017', 'Jan', 'Jul 2018', 'Jan', 'Jul 2019', 'Jan', 'Jul 2020', 'Jan', 'Jul 2021']
    },
    plotOptions: {
      series: {
        color: '#26ACD2'
      }
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    series: [{
      type: "line",
      name: 'Performance (5 Year)',
      data: [7500, 12500, 11000, 11200, 12000, 5000, 2500, 8000, 9800, 8100, 10000, 27000]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
});

