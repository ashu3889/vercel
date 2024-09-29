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
    if (!code) {
      return false
    }

    this.setState({ isGraphDataAvailable: true});
    const API_ROOT = 'https://gvvvybsctuddylxfiecz.supabase.co/rest/v1/graph_data?&code=eq.'+code;
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
      const scripName = response[0].scripName;

      let sidewaysStart = response[0].sidewaysData.sidewaysEndTick;
      let sidewaysEndtick = response[0].sidewaysData.sidewaysStartTick;
      let sidewaysEntryPoint = response[0].sidewaysData.sidewaysLowBlackPoint;
      var tradeDate = +new Date(response[0].sidewaysData.tradeDate);

      /**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);

// Create a stock chart
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Instantiating_the_chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {  
  paddingRight: 0
}));


// Set global number format
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");


// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Adding_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
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

// valueAxis.createAxisRange

// var seriesRangeDataItem = valueAxis.makeDataItem({ value: sidewaysStart, endValue: sidewaysEndtick });
// var seriesRange = valueAxis.createAxisRange(seriesRangeDataItem);
// debugger;
// seriesRange.fill.template.setAll
// seriesRange.fills.template.setAll({
//     visible: true,
//     opacity: 0.3
// });

// seriesRange.fills.template.set("fill", '#008000');
// seriesRange.strokes.template.set("stroke", am5.color(0x000000));

var rangeDataItem = valueAxis.makeDataItem({
  value: new Date(2021, 0, 1).getTime(),
  endValue: new Date(2021, 0, 15).getTime()
});

// rangeDataItem.get("grid").setAll({
//   stroke: 'black',
//   strokeOpacity: 1
// });

debugger;

// rangeDataItem.columns.template.setAll({
//   stroke: 'black',
//   strokeOpacity: 1
// });

// volumeSeries.columns.template.setAll(

// mainPanel.series

var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));


// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  name: scripName,
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
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
stockChart.set("stockSeries", valueSeries);


// Add a stock legend
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));


// Create volume axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true,
  pan: "zoom"
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
volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem);
  }
  return fill;
})


// Set main series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
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
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  })
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

// Set up series type switcher
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/series-type-control/
var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function (ev) {
  setSeriesType(ev.item.id);
});

function getNewSettings(series) {
  var newSettings = [];
  am5.array.each(["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "legendRangeValueText", "stroke", "fill"], function (setting) {
    newSettings[setting] = series.get(setting);
  });
  return newSettings;
}

function setSeriesType(seriesType) {
  // Get current series and its settings
  var currentSeries = stockChart.get("stockSeries");
  var newSettings = getNewSettings(currentSeries);

  // Remove previous series
  var data = currentSeries.data.values;
  mainPanel.series.removeValue(currentSeries);

  // Create new series
  var series;
  switch (seriesType) {
    case "line":
      series = mainPanel.series.push(am5xy.LineSeries.new(root, newSettings));
      break;
    case "candlestick":
    case "procandlestick":
      newSettings.clustered = false;
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
      if (seriesType == "procandlestick") {
        series.columns.template.get("themeTags").push("pro");
      }
      break;
    case "ohlc":
      newSettings.clustered = false;
      series = mainPanel.series.push(am5xy.OHLCSeries.new(root, newSettings));
      break;
  }

  // Set new series as stockSeries
  if (series) {
    valueLegend.data.removeValue(currentSeries);
    series.data.setAll(data);
    stockChart.set("stockSeries", series);
    var cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", [series]);
    }
    valueLegend.data.insertIndex(0, series);
  }
}

// Drawing control with custom icons
// -------------------------------------------------------------------------------
var drawingControl = am5stock.DrawingControl.new(root, {
  stockChart: stockChart
});

drawingControl.get("drawingIcons").push({
  svgPath: "M 3 3 L 47 3 L 47 39 L 31 39 L 25 45 L 19 39 L 3 39 L 3 3 M 11 12 L 39 12 M 11 20 L 39 20 M 11 28 L 39 28",
  scale: 1,
  centerX: am5.p50,
  centerY: am5.p100
}, {
  svgPath: "M 5 11 A 1 1 90 0 0 36 27 A 1 1 90 0 0 5 11 M 34 30 L 49 45 L 47 47 L 32 32",
  scale: 1,
  centerX: am5.p50,
  centerY: am5.p50
});

// Stock toolbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      legend: valueLegend
    }),
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    }),
    seriesSwitcher,
    drawingControl,
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
})

// data
var data = [...response[0].jsonData.map(x => {
  return {
    ...x,
    Date: + new Date(x.Date)
  }
})];


var tooltip = am5.Tooltip.new(root, {
  getStrokeFromSprite: false,
  getFillFromSprite: false
});

tooltip.get("background").setAll({
  strokeOpacity: 1,
  stroke: am5.color(0x000000),
  fillOpacity: 1,
  fill: am5.color(0xffffff)
});


function makeEvent(date, letter, color, description) {
  var dataItem = dateAxis.createAxisRange(dateAxis.makeDataItem({ value: date }))
  var grid = dataItem.get("grid");
  if (grid) {
    grid.setAll({ visible: true, strokeOpacity: 0.2, strokeDasharray: [3, 3] })
  }

  var bullet = am5.Container.new(root, {
    dy: -100
  });

  var circle = bullet.children.push(am5.Circle.new(root, {
    radius: 10,
    stroke: color,
    fill: am5.color(0xffffff),
    tooltipText: description,
    tooltip: tooltip,
    tooltipY: 0
  }));

  var label = bullet.children.push(am5.Label.new(root, {
    text: letter,
    centerX: am5.p50,
    centerY: am5.p50
  }));

  dataItem.set("bullet", am5xy.AxisBullet.new(root, {
    location: 0,
    stacked: true,
    sprite: bullet
  }));
}

makeEvent(1619006400000, "S", am5.color(0xff0000), "Split 4:1")
makeEvent(1619006400000, "D", am5.color(0x00FF00), "Dividends paid")
makeEvent(1634212800000, "D", am5.color(0x00FF00), "Dividends paid")


// set data to all series
valueSeries.data.setAll(data);
volumeSeries.data.setAll(data);
sbSeries.data.setAll(data);
     

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
       </div>
    )
  }
}

export default OhlcChart;