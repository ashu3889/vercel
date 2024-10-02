import React, { Component } from "react";
import "./styles.css";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import axios from 'axios';


class OhlcChart extends Component {

  constructor() {
    super();
    this.state = {
      isGraphDataAvailable: null,
      scripName: null,
    };
  }
  componentDidMount() {
    const code = window.location.pathname.split('/')[2] ;
    const urlParams = new URLSearchParams(window.location.search);
    const exchangeParam = urlParams.get('exchange');
    const symbolParam = urlParams.get('symbol');
    if (!exchangeParam && !symbolParam) {
      return false
    }

    

    this.setState({ isGraphDataAvailable: true});
    const API_ROOT = 'https://gvvvybsctuddylxfiecz.supabase.co/rest/v1/graph_data?&exchangeName=eq.'+exchangeParam+'&scripCode=eq.'+symbolParam;
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dnZ5YnNjdHVkZHlseGZpZWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNDAwMTAsImV4cCI6MjA0MTkxNjAxMH0.1OUIdwq9DmcdMvHJwXPc3hocXMonsJAwbXkbJSfWQtk';

    fetch(API_ROOT, {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': token,
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (!response.ok) { // Don't forget this part!
          throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(response => {

      if(response.length === 0) {
        this.setState({ isGraphDataAvailable: false});
        return false;
      }



      this.setState({ isGraphDataAvailable: true});

      let dataOfConcern = response[response.length-1];
      const scripName = dataOfConcern.scripName;

      // let sidewaysStart = dataOfConcern.sidewaysData.sidewaysEndTick;
      // let sidewaysEndtick = dataOfConcern.sidewaysData.sidewaysStartTick;
      // let sidewaysEntryPoint = dataOfConcern.sidewaysData.sidewaysLowBlackPoint;
      // var tradeDate = +new Date(dataOfConcern.sidewaysData.tradeDate);





      var root = am5.Root.new("chartdiv");


  // Set themes
  // -------------------------------------------------------------------------------
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);


    // Create a stock chart
    // -------------------------------------------------------------------------------
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating_the_chart
    var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
    }));


// Set global number format
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");


// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: false,
  pinchZoomX: true
}));


// Create value axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom"
  }),
  extraMin: 0.1, // adds some space for for main series
  tooltip: am5.Tooltip.new(root, {}),
  numberFormat: "#,###.00",
  extraTooltipPrecision: 2
}));

var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));


// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  name: dataOfConcern.scripCode,
  clustered: false,
  valueXField: "Date",
  valueYField: "Close",
  highValueYField: "High",
  lowValueYField: "Low",
  openValueYField: "Open",
  calculateAggregates: true,
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
  legendRangeValueText: ""
}));


// Set main value series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
stockChart.set("stockSeries", valueSeries);


// Add a stock legend
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));


// Create volume axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true
});

volumeAxisRenderer.labels.template.set("forceHidden", true);
volumeAxisRenderer.grid.template.set("forceHidden", true);

var volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a",
  height: am5.percent(20),
  y: am5.percent(100),
  centerY: am5.percent(100),
  renderer: volumeAxisRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
  name: "Volume",
  clustered: false,
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: dateAxis,
  yAxis: volumeValueAxis,
  legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
}));

volumeSeries.columns.template.setAll({
  strokeOpacity: 0,
  fillOpacity: 0.5
});

// color columns by stock rules
volumeSeries.columns.template.adapters.add("fill", function(fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem);
  }
  return fill;
})


// Set main series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries, volumeSeries]);


// Add cursor(s)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: [valueSeries],
  snapToSeriesBy: "y!"
}));


// Add scrollbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

// add Bollinger Bands indicator
// var bollingerBands = stockChart.indicators.push(am5stock.BollingerBands.new(root, {
//   stockChart: stockChart,
//   stockSeries: valueSeries,
//   legend: valueLegend
// }));


// Stock toolbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/
    var indicatorControl = am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      legend: valueLegend
    });

    var drawingControl = am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    });

    var toolbar = am5stock.StockToolbar.new(root, {
      container: document.getElementById("chartcontrols"),
      stockChart: stockChart,
      controls: [
        indicatorControl,
        am5stock.DateRangeSelector.new(root, {
          stockChart: stockChart
        }),
        am5stock.PeriodSelector.new(root, {
          stockChart: stockChart
        }),
        drawingControl,
        am5stock.ResetControl.new(root, {
          stockChart: stockChart
        }),
        am5stock.SettingsControl.new(root, {
          stockChart: stockChart
        })
      ]
    })

    // data
    var data = [...response[0].jsonData];
    data = data.map((x) => {
      return {
        ...x,
        Date: + new Date(x.Date) 
      }
    });

    // set data to all series
    valueSeries.data.setAll(data);
    volumeSeries.data.setAll(data);
    sbSeries.data.setAll(data);

    // Load serialized annotations and indicators
    // -------------------------------------------------------------------------------
    // https://www.amcharts.com/docs/v5/charts/stock/serializing-indicators-annotations/


    let resistanceData = dataOfConcern.sidewaysData.range.resistance[0];

    var sidewayResistance = [
      {
        "__tool": "Line",
        "__panelIndex": 0,
        "__drawing": [
          {
            "stroke": {
              "type": "Template",
              "settings": {
                "stroke": {
                  "type": "Color",
                  "value": "#882dff"
                },
                "strokeOpacity": 1,
                "strokeDasharray": [],
                "strokeWidth": 2
              }
            },
            "fill": {
              "type": "Template",
              "settings": {
                "fill": {
                  "type": "Color",
                  "value": "#ad6eff"
                },
                "fillOpacity": 0.5
              }
            },
            "index": 1,
            "showExtension": true,
            "corner": "e",
            "__parse": true
          },
          {
            "valueY": resistanceData.high,
            "valueX": + new Date(resistanceData.date),
            "corner": "p1",
            "index": 1,
            "__parse": true
          },
          {
            "valueY": resistanceData.high,
            "valueX": + new Date(),
            "corner": "p2",
            "index": 1,
            "__parse": true
          }
        ]
      }
    ];
    drawingControl.unserializeDrawings(sidewayResistance);


    let supportData = dataOfConcern.sidewaysData.range.support[0];

    var sidewaySupport = [
      {
        "__tool": "Line",
        "__panelIndex": 0,
        "__drawing": [
          {
            "stroke": {
              "type": "Template",
              "settings": {
                "stroke": {
                  "type": "Color",
                  "value": "#882dff"
                },
                "strokeOpacity": 1,
                "strokeDasharray": [],
                "strokeWidth": 2
              }
            },
            "fill": {
              "type": "Template",
              "settings": {
                "fill": {
                  "type": "Color",
                  "value": "#ad6eff"
                },
                "fillOpacity": 0.5
              }
            },
            "index": 1,
            "showExtension": true,
            "corner": "e",
            "__parse": true
          },
          {
            "valueY": supportData.low,
            "valueX": + new Date(supportData.date),
            "corner": "p1",
            "index": 1,
            "__parse": true
          },
          {
            "valueY": supportData.low,
            "valueX": + new Date(),
            "corner": "p2",
            "index": 1,
            "__parse": true
          }
        ]
      }
    ];
    drawingControl.unserializeDrawings(sidewaySupport);

    let retestData = dataOfConcern.sidewaysData.range.retestLine;



    // activeTradeData
    let activeTradeDataArray = dataOfConcern.sidewaysData.range.activeTradeData[0];
    let targetPoint = null;
    let tradeDirStrokeColor = null;
    let retestLinePoint = 0;
    let retestLinecolor = '#fffff';


    let zoomIndex = 1;
    let zoomStartTime = null;

    if(+ new Date(supportData.date) > + new Date(resistanceData.date) ) {
      zoomStartTime =  + new Date(resistanceData.date);
    }
    else{
      zoomStartTime =  + new Date(supportData.date);
    }

    // get zoom-index
    let timestampArray = data.map((x) => + new Date(x.Date));
    let sidewaysIndex = timestampArray.indexOf(zoomStartTime);
    if(sidewaysIndex !== -1) {
      zoomIndex = (timestampArray.length - sidewaysIndex)/timestampArray.length ;
      zoomIndex = zoomIndex*1.2
      zoomIndex = 1-zoomIndex;
    }




    if(activeTradeDataArray.tradeType === "Sell" && retestData) {
      tradeDirStrokeColor = '#c84517';
      retestLinecolor = '#c84517';
      targetPoint = supportData.low;
      retestLinePoint = retestData.UPblackpoint;
    }
    else{
      tradeDirStrokeColor = "#259054";
      retestLinecolor = "#259054";
      targetPoint = resistanceData.high;
      if(retestData) {
        retestLinePoint = retestData.Lowblackpoint;
      }
    }

    var sidewaysRetestLine = [
      {
        "__tool": "Line",
        "__panelIndex": 0,
        "__drawing": [
          {
            "stroke": {
              "type": "Template",
              "settings": {
                "stroke": {
                  "type": "Color",
                  "value": retestLinecolor
                },
                "strokeOpacity": 1,
                "strokeDasharray": [],
                "strokeWidth": 2
              }
            },
            "fill": {
              "type": "Template",
              "settings": {
                "fill": {
                  "type": "Color",
                  "value": retestLinecolor
                },
                "fillOpacity": 0.5
              }
            },
            "index": 1,
            "showExtension": true,
            "corner": "e",
            "__parse": true
          },
          {
            "valueY": retestLinePoint,
            "valueX": retestData ? + new Date(retestData.pivotDate): null,
            "corner": "p1",
            "index": 1,
            "__parse": true
          },
          {
            "valueY": retestLinePoint,
            "valueX": + new Date(),
            "corner": "p2",
            "index": 1,
            "__parse": true
          }
        ]
      }
    ];
    drawingControl.unserializeDrawings(sidewaysRetestLine);


  

    var tradeAlertLine = [
      {
        "__tool": "Line",
        "__panelIndex": 0,
        "__drawing": [
          {
            "stroke": {
              "type": "Template",
              "settings": {
                "stroke": {
                  "type": "Color",
                  "value": tradeDirStrokeColor
                },
                "strokeOpacity": 1,
                "strokeDasharray": [],
                "strokeWidth": 2
              }
            },
            "fill": {
              "type": "Template",
              "settings": {
                "fill": {
                  "type": "Color",
                  "value": tradeDirStrokeColor
                },
                "fillOpacity": 0.5
              }
            },
            "index": 1,
            "showExtension": true,
            "corner": "e",
            "__parse": true
          },
          {
            "valueY": activeTradeDataArray.close,
            "valueX": + new Date(activeTradeDataArray.date),
            "corner": "p1",
            "index": 1,
            "__parse": true
          },
          {
            "valueY": targetPoint,
            "valueX": + new Date() + 24*60*60*60,
            "corner": "p2",
            "index": 1,
            "__parse": true
          }
        ]
      }
    ];
    drawingControl.unserializeDrawings(tradeAlertLine);

    // mainPanel.events.on("datavalidated", function(ev) {
    //   // ev.target.get("xAxis").zoom(0.9,1);//start from start date to end
    //   dateAxis.zoom(0.9,1);
    //   // dateAxis.zoomToValues(1696001908000, 1703864308000);

    // });

    valueSeries.events.once('datavalidated', (ev) => {
      ev.target.get('xAxis').zoom(zoomIndex, 1);
    });

    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: "Trading setup Notes: Disclaimer: This is informational only",
      fontSize: 8,
      fontWeight: "bold",
      textAlign: "left",
      x: am5.percent(80),
      y: am5.percent(80),
      paddingBottom: 0
    }));

    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Trade type: ${activeTradeDataArray.tradeType}`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(120),
      paddingBottom: 0
    }));
    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Trade entry date: ${ new Date(activeTradeDataArray.date).getDate()} / ${ new Date(activeTradeDataArray.date).getMonth()} / ${ new Date(activeTradeDataArray.date).getFullYear()}`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(140),
      paddingBottom: 0
    }));
    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Trade entry price: ${activeTradeDataArray.close}`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(160),
      paddingBottom: 0
    }));
    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `First target: ${activeTradeDataArray.tradeType === "Sell" ? resistanceData.high : supportData.high }`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(180),
      paddingBottom: 0
    }));
    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Second target: ${activeTradeDataArray.tradeType === "Sell" ? supportData.high : resistanceData.high }`,
      fontSize: 8,
      fontWeight: "50",
      backgroundColor: 'green',
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(200),
      paddingBottom: 0
    }));

    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Sideways support: ${supportData.low}`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(220),
      paddingBottom: 0
    }));
    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Sideways resistance: ${resistanceData.high}`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(240),
      paddingBottom: 0
    }));
    scrollbar.chart.children.unshift(am5.Label.new(root, {
      text: `Sideways breakout retest line: ${retestLinePoint}`,
      fontSize: 8,
      fontWeight: "50",
      textAlign: "left",
      x: am5.percent(89),
      y: am5.percent(260),
      paddingBottom: 0
    }));
 
    });
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {

    if(this.state.isGraphDataAvailable === null) {
      return (
        <div>
          Loading
        </div>
      )
    }

    if(this.state.isGraphDataAvailable === false) {
      return (
        <div>
          Chart data is not available.
        </div>
      )
    }
    return (
       <div>
            <p style={{
              textAlign: "center",
              fontWeight: 'bold'
            }}> {this.state.scripName} </p>
            <div
                id="chartcontrols"
                style={{ height: "auto", padding: "5px 45px 0 15px" }}
            ></div>
              <div id="chartdiv" style={{ width: "100%", height: "500px" }}>
            </div>
            {/* <div>
              <p> Chart Notes</p>
              <p> Sideways resistance: </p>
              <p> Sideways support: </p>
              <p> Sideways breakout retest line: </p>
              <p> Entry Date: </p>    
              <p> Entry price: </p>
              <p> First target: </p>
              <p> Second Target:  </p>
            </div> */}
       </div>
    )
  }
}

export default OhlcChart;