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

      this.setState({
        scripName: response[0].scripName
      });

      let sidewaysStart = response[0].sidewaysData.sidewaysEndTick;
      let sidewaysEndtick = response[0].sidewaysData.sidewaysStartTick;
      let sidewaysEntryPoint = response[0].sidewaysData.sidewaysLowBlackPoint;
      var tradeDate = +new Date(response[0].sidewaysData.tradeDate);

      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("chartdiv");


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
          am5themes_Animated.new(root)
      ]);


      // panX: true,
      // panY: false,
      // wheelX: "zoomX",
      // wheelZoomPositionX: 1

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          wheelZoomPositionX: 1
      }));

      // chart.children.unshift(am5.Label.new(root, {
      //   text: scripName,
      //   fontSize: 14,
      //   fontWeight: "bold",
      //   textAlign: "center",
      //   marginBottom: "300px",
      //   x: am5.percent(10),
      //   // centerX: am5.percent(50),
      //   y: am5.percent(10),
      //   paddingTop: 0,
      //   paddingBottom: 0
      // }));

      // var title = chart.title();
      // title.enabled(true);
      // title.text(scripName);


      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineX.set("forceHidden", true);
      cursor.lineY.set("forceHidden", true);

      // Generate random data
      var date = new Date();
      date.setHours(0, 0, 0, 0);

      var value = 20;

      // var xAxis = chart.xAxes.push(
      //   am5xy.ValueAxis.new(root, {
      //     maxDeviation: 0,
      //     renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 })
      //   })
      // );

      var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
          baseInterval: {
              timeUnit: "day",
              count: 1
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 80
          })
         //  renderer: am5xy.AxisRendererX.new(root, {})
      }));

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
      }));

      var series = chart.series.push(am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
              labelText: "{valueY}"
          })
      }));

      series.fills.template.setAll({
          fillOpacity: 0.2,
          visible: true
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
          orientation: "horizontal"
      }));

      var data = [...response[0].jsonData];
      data = data.map(x => {
        return {
          date: +new Date(x['Date']),
          value: x['Close']
        }
      });

      series.data.setAll(data);
      var rangeDate = new Date();
      am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
      var rangeTime = rangeDate.getTime();

      // support lines start
      var seriesRangeDataItem = yAxis.makeDataItem({ value: sidewaysStart, endValue: sidewaysEndtick });
      var seriesRange = series.createAxisRange(seriesRangeDataItem);
      seriesRange.fills.template.setAll({
          visible: true,
          opacity: 0.3
      });

      seriesRange.fills.template.set("fill", '#008000');
      seriesRange.strokes.template.set("stroke", am5.color(0x000000));
      // seriesRange.strokes.template.set("stroke-width", '12px');


      seriesRangeDataItem.get("grid").setAll({
          strokeOpacity: 1,
          visible: true,
          stroke: am5.color(0x000000),
          // strokeDasharray: [2, 2]
          strokeWidth: 1,
      })

      seriesRangeDataItem.get("label").setAll({
          location:0,
          visible:true,
          text:"Sideways range",
          inside:true,
          centerX:0,
          centerY:am5.p100,
          fontSize: 14,
          fontWeight: "normal",
      });



      var seriesRangeDataItem3 = yAxis.makeDataItem({ value: sidewaysEndtick });
      var seriesRange3 = series.createAxisRange(seriesRangeDataItem3);
      seriesRange3.fills.template.setAll({
          visible: true,
          opacity: 0.3
      });
      
      seriesRange3.fills.template.set("fill", '#008000');
      seriesRange3.strokes.template.set("stroke", am5.color(0x000000));
      
      seriesRangeDataItem3.get("grid").setAll({
          strokeOpacity: 1,
          visible: true,
          stroke: am5.color(0x000000),
          // strokeDasharray: [2, 2],
          strokeWidth: 2
      });
      
      seriesRangeDataItem3.get("label").setAll({
        location:0,
        visible:true,
        text:"sideways boundary",
        inside:true,
        centerX:0,
        centerY:am5.p100,
        fontSize: 14,
        fontWeight: "normal",
      });      


      if(sidewaysEntryPoint === sidewaysStart ||sidewaysEntryPoint === sidewaysEndtick) {

      }
      else {
        var seriesRangeDataItem1 = yAxis.makeDataItem({ value: sidewaysEntryPoint });
        var seriesRange1 = series.createAxisRange(seriesRangeDataItem1);
        seriesRange1.fills.template.setAll({
            visible: true,
            opacity: 0.3
        });
  
        seriesRange1.fills.template.set("fill", '#008000');
        seriesRange1.strokes.template.set("stroke", am5.color(0x000000));
  
        seriesRangeDataItem1.get("grid").setAll({
            strokeOpacity: 1,
            visible: true,
            stroke: am5.color(0x000000),
            // strokeDasharray: [2, 2],
            strokeWidth: 2
        });
  
        seriesRangeDataItem1.get("label").setAll({
          location:0,
          visible:true,
          text:"sideways breakout rejection line",
          inside:true,
          centerX:0,
          centerY:am5.p100,
          fontSize: 14,
          fontWeight: "normal",
        });
      }



      var seriesRangeDataItem2 = xAxis.makeDataItem({ value: tradeDate });
      var seriesRange2 = series.createAxisRange(seriesRangeDataItem2);
      seriesRange2.fills.template.setAll({
          visible: true,
          opacity: 0.3
      });

      seriesRangeDataItem2.get("grid").setAll({
        strokeOpacity: 1,
        visible: true,
        stroke: '#ffA500',
        strokeWidth: 2
    });


      seriesRangeDataItem2.get("label").setAll({
        location:-100,
        visible:true,
        text:"Entry point",
        inside:true,
        centerX:0,
        centerY:am5.p100,
        fontWeight:"bold"
      });

      // xAxis.zoom(0.9, 1);

      // var valueSeries = chart.series.push(am5xy.CandlestickSeries.new(root, {
      //   name: "MSFT",
      //   clustered: false,
      //   valueXField: "Date",
      //   valueYField: "Close",
      //   highValueYField: "High",
      //   lowValueYField: "Low",
      //   openValueYField: "Open",
      //   calculateAggregates: true,
      //   xAxis: xAxis,
      //   yAxis: yAxis,
      //   legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
      //   legendRangeValueText: ""
      // }));
      
      
      // // Set main value series
      // // -------------------------------------------------------------------------------
      // // https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
      // chart.set("stockSeries", valueSeries);

      debugger;

      var startData = response[0].jsonData.filter(x => x.High === sidewaysStart || x.Low === sidewaysStart);
      let zoomIndex = 0.95;
      if(startData.length > 0) {
        // get index
        let lengthOfArray = response[0].jsonData.length;
        let indexData = response[0].jsonData.map(x => + new Date(x.Date)).indexOf(+ new Date(startData[0].Date));
        zoomIndex = (lengthOfArray-indexData)/indexData;
        zoomIndex = zoomIndex*1.2;
        zoomIndex = 1-zoomIndex;
      }


 
      series.events.once('datavalidated', (ev) => {
        ev.target.get('xAxis').zoom(zoomIndex, 1,);
      });

      var copyright = chart.plotContainer.children.push(am5.Label.new(root, {
        text: "Copyright amCharts",
        x: 10,
        y: am5.p100,
        centerY: am5.p100,
        dy: 10
      }));
      
      var logo = chart.plotContainer.children.push(am5.Picture.new(root, {
        src: "https://assets.codepen.io/t-160/amcharts_light.svg",
        width: 100,
        x: am5.p100,
        centerX: am5.p100,
        dx: -10,
        y: am5.p100,
        centerY: am5.p100
      }));
   
      series.appear(1000);
      chart.appear(1000, 100);

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