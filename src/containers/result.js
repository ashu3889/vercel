import React, { Component, CSSProperties } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pagination from './Pagination';
import Table from 'react-bootstrap/Table';
import ClipLoader from "react-spinners/ClipLoader";
import { CSVLink, CSVDownload } from "react-csv";









import BarLoader from "react-spinners/BarLoader";



const override: CSSProperties = {
  display: "block",
  borderColor: "gray", 
  marginTop: 100,
  marginLeft: 400,
};

let filteredData = [];
let weeklyData = [];

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      items: [],
      currentPage: 1,
      totalPosts:100,
      postsPerPage:10,
      loading: true,
      color : '#808080',
      exchange: '',
      selectValue:124,
      filter: 'all-weekly-shares'
    };
  }

  handleChange = (e) => {
    this.setState({selectValue:parseInt(e.target.value)});
  };

  componentDidMount() {
    axios.get('http://localhost:5000/results').then((res) => {
      // debugger;
      let newsdata = res.data.user.map((a) =>  {
        a["date"] = this.toTimestampDatum(a["date"]);
        return a;
      });
      newsdata = newsdata.filter(a => a.tradeType !== "Sell").sort((a, b) => b.date - a.date) ;

      // newsdata = newsdata.filter(a => !a.globalHasRiskInsight && a.tradeType !== "Sell").sort((a, b) => b.date - a.date) ;
      //debugger;
      // newsdata = newsdata.sort((a, b) => b.date - a.date) ;

      // debugger;
      this.setState({
        fullData: newsdata,
        loading: false,
      });

    });
  }

  componentWillReceiveProps(nextProps) {

  }

  GetDomain = (url) => {
    const url1 = /\.(.*?)\//g;
    const match = url1.exec(url) || [];
    return match[1];
  }

  toTimestampDatum = (strDate) => {
    var datum = Date.parse(strDate);
    return new Date(datum);
  }

  numFormatter = (num) => {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }

  convertToInternationalCurrencySystem = (labelValue) => {

    if (typeof labelValue === "string" ) {
      labelValue = parseInt(labelValue);
    }


    if (labelValue < 0) {
      labelValue =  -labelValue;
      return Math.abs(Number(labelValue)) >= 1.0e+9

      ? -(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6
  
      ? -(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3
  
      ? -(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
  
      : Math.abs(Number(labelValue));
      
    }

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

  }


  getRiskInsightData = (data) =>  {
    // globalHasRiskInsight
    return 'N.A';
    // if (data) {
    //   return 'Yes'
    // }
    // return 'No'
  }

  convertToInternationalCurrencySystem = (labelValue) => {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

}


  render() {
    if(this.state.filter === "non-risky") {
      filteredData = this.state.fullData.filter(a => {
        let year = a.date.getYear();
        if (year === this.state.selectValue) {
          return true;
        }
        return false;
      }); 
      filteredData = filteredData.sort((a, b) => b.date - a.date);
      filteredData = filteredData.filter(a => !a.globalHasRiskInsight)
    }
    else if(this.state.filter === "all-weekly-shares") {
      debugger;
      filteredData = this.state.fullData;
      filteredData = filteredData.filter(a => a.exchange === "N-Hourly");
      debugger;
      //  exchange: 'Hourly',
    }

    // console.log('Filtered data length is...' + filteredData.length);


    if (filteredData.length > 0) {
     // // debugger;
    }

    var tableRows = [];
    if (this.state.exchange === "IBK") {
      tableRows = filteredData.filter(y => y.evalDate).filter(y => {
        if(y.exchange === 'NASDAQ' ||  y.exchange === 'coindcx' ||  y.exchange === 'NSE'  || y.exchange === 'NYSE' ) {
          return false;
        }
        return true;
      }).map(
        (element)=>{
          var dateFeild = new Date(element.date.toDateString())
          dateFeild = dateFeild.toString();
          var evaldateFeild = element.evalDate;
          if (element.tradeType == "Sell") {
            return  ( 
              <tr style={{backgroundColor: 'lightcoral'}}>
                <td>{dateFeild}</td>
                <td>{element.scripName}</td>
                <td>{this.getRiskInsightData(element)}</td>
                <td>{element.message}</td>
                <td>{this.numFormatter(element.volume)}</td>
                <td>{element.eps}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
                <td>{element.globalEbidt}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
                <td>{evaldateFeild}</td>
                <td>{element.code}</td>
              </tr>
            )
          }
  
          return  ( 
            <tr style={{backgroundColor: 'lightgreen'}}>
              <td>{dateFeild}</td>
              <td>{element.scripName}</td>
              <td>{this.getRiskInsightData(element)}</td>
              <td>{element.message}</td>
              <td>{this.numFormatter(element.volume)}</td>
              <td>{element.eps}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
              <td>{element.globalEbidt}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
              <td>{evaldateFeild}</td>
              <td>{element.code}</td>
            </tr>
          )
          
        }
      )
    }
    else if (this.state.exchange === "Hourly") {
      tableRows = filteredData.filter(y => y.evalDate && y.iteration11).filter(y => {
        if( y.exchange === 'NASDAQ'  || y.exchange === 'NYSE' ) {
          return true;
        }
        return false;
      }).map(
        (element)=>{
          var dateFeild = new Date(element.date.toDateString())
          dateFeild = dateFeild.toString();
          var evaldateFeild = element.evalDate;


          // console.log('globalHasRiskInsight...' + element.globalHasRiskInsight + '..tradeType...' + element.tradeType + '..scripName...' + element.scripName + "..."+ JSON.stringify(element));

          if (element.globalHasRiskInsight && element.tradeType !== "Sell") {
            // debugger;
            // console.log('broken...' + 1);
            return (
              <tr style={{backgroundColor: 'orange'}}>
                <td>{dateFeild}</td>
                <td>{element.scripName}</td>
                {/* <td>{element.message}</td>
                <td>{evaldateFeild}</td>  */}
                {/* <td>{this.numFormatter(element.volume)}</td>
                <td>{element.eps}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
                <td>{element.globalEbidt}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
                <td>{evaldateFeild}</td> */}
                {/* <td>{element.code}</td> */}
              </tr>
            )
          }

          if (element.globalHasRiskInsight && element.tradeType === "Sell") {
            // debugger;
            // console.log('broken...' + 2);
            return (
              <tr style={{backgroundColor: 'orange'}}>
                <td>{dateFeild}</td>
                <td>{element.scripName}</td>
                {/* <td>{element.message}</td>
                <td>{evaldateFeild}</td>  */}
                {/* <td>{this.numFormatter(element.volume)}</td>
                <td>{element.eps}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
                <td>{element.globalEbidt}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
                <td>{evaldateFeild}</td> */}
                {/* <td>{element.code}</td> */}
              </tr>
            )
          }




          if (element.tradeType == "Sell") {
             // console.log('broken...' + 3);
              return  (
                <div></div>
              )
            return  ( 
              <tr style={{backgroundColor: 'lightcoral'}}>
                <td>{dateFeild}</td>
                <td>{element.scripName}</td>
                <td>{element.message}</td>
                <td>{evaldateFeild}</td> 
                {/* <td>{dateFeild}</td>
                <td>{element.scripName}</td>
                <td>{this.getRiskInsightData(element)}</td>
                <td>{element.message}</td>
                <td>{this.numFormatter(element.volume)}</td>
                <td>{element.eps}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
                <td>{element.globalEbidt}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
                <td>{evaldateFeild}</td>
                <td>{element.code}</td> */}
              </tr>
            )
          }
  
          // console.log('broken...' + 4);
          // return  (
          //   <div></div>
          // )


          if(!element.globalEbidt ) {
            return  ( 
              <>
              </>
              // <tr style={{backgroundColor: 'coral'}}>
              //   <td>{dateFeild}</td>
              //   <td>{element.scripName}</td>
              //   <td>{this.convertToInternationalCurrencySystem(element.globalEbidt)}</td>
              // </tr>
            )
          }

          if(element.globalEbidt && parseInt(element.globalEbidt) < 0) {
            return  ( 
              <>
              </>
              // <tr style={{backgroundColor: 'coral'}}>
              //   <td>{dateFeild}</td>
              //   <td>{element.scripName}</td>
              //   <td>{this.convertToInternationalCurrencySystem(element.globalEbidt)}</td>
              // </tr>
            )
          } 

          if(element.scripName === "Cumberland Pharmaceuticals Inc") {
            console.log('ALERT....' + JSON.stringify(element));
          }

          return  ( 
            <tr style={{backgroundColor: 'lightgreen'}}>
              <td>{dateFeild}</td>
              <td>{element.scripName}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalEbidt)}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalThirtyDaysVolumeCount)}</td>
            </tr>
          )
          
        }
      )
    }
    else {
      tableRows = filteredData.map(
        (element)=>{
          var dateFeild = new Date(element.date.toDateString())
          dateFeild = dateFeild.toString();
          var evaldateFeild = element.evalDate;
          if (element.globalHasRiskInsight == "Yes") {
            return null;
          }

          if (element.tradeType == "Sell") {
            return  ( 
              <tr style={{backgroundColor: 'lightcoral'}}>
                <td>{dateFeild}</td>
                <td>{element.scripName}</td>
                <td>{this.getRiskInsightData(element)}</td>
                <td>{element.message}</td>
                <td>{this.numFormatter(element.volume)}</td>
                <td>{element.eps}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
                <td>{element.globalEbidt}</td>
                <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
                <td>{evaldateFeild}</td>
                <td>{element.code}</td>
              </tr>
            )
          }
  
          return  ( 
            <tr style={{backgroundColor: 'lightgreen'}}>
              <td>{dateFeild}</td>
              <td>{element.scripName}</td>
              <td>{element.globalEbidt}</td>
              <td>{element.volume}</td>
              {/* <td>{this.getRiskInsightData(element)}</td>
              <td>{element.message}</td>
              <td>{this.numFormatter(element.volume)}</td>
              <td>{element.eps}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalRevenue)}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalEmployeeCount)}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalGrossProfitTTM)}</td>
              <td>{element.globalEbidt}</td>
              <td>{this.convertToInternationalCurrencySystem(element.globalMarketCap)}</td>
              <td>{evaldateFeild}</td>
              <td>{element.code}</td> */}
            </tr>
          )
          
        }
      )
    }



    if(this.state.loading) {
      return (
        <ol>
        <h6>Below signals are generated on daily timeframe. </h6>



        <Table striped bordered hover>
            <thead>
              <tr>    
                <th> Date</th>
                <th> Name </th>
                <th>EEbidta</th>
                {/* <th> Has risk </th>
                <th> Message </th>
                <th> Volume </th>
                <th> EPS </th>
                <th>Global revenue</th>
                <th>Global Employee Count</th>
                <th>Global Gross Profit TTM</th>
                <th>EEbidta</th>
                <th>Global MarketCap</th>
                <th> Evaluation date </th>
                <th> Code </th> */}
              </tr>
            </thead>
            <tbody>
              <ClipLoader color={this.state.color} loading={this.state.loading} cssOverride={override} size={100} />
            </tbody>
          </Table>  
      </ol>
      );
    }
  
    return (
      <ol>
      <h6>Below signals are generated on daily timeframe. </h6>
      <CSVLink data={this.state.fullData}>Download full data</CSVLink>;
        {/* <button onClick={ () => {
          this.setState({
            exchange: 'NSE'
          })
        }}>NSE</button> */}
        {/* <button 
          onClick = { () => {
            this.setState({
              exchange: 'NASDAQ'
            })
          }}
        >Nasdaq</button> */}


        <div>
          <p>
            Sort based in high risk vs low risk shares
          </p>
          <div>
            <button
              onClick = { () => {
                this.setState({
                  filter: 'all-weekly-shares'
                })
              }}
            >All shares hourly</button>
          </div>
        </div>



        {/* <select 
          id = "dropdown"
          value={this.state.selectValue} 
          onChange={this.handleChange} 
        >
          <option value="N/A">N/A</option>
          <option value="124">2024</option>
          <option value="123">2023</option>
          <option value="122">2022</option>
          <option value="121">2021</option>
        </select> */}
      <Table striped bordered hover >
          <thead>
            <tr>    
                <th> Date</th>
                <th> Name </th>
                <th>Ebidta</th>
                <th>Volume</th>
                {/* <th> Has risk </th>
                <th> Message </th>
                <th> Volume </th>
                <th> EPS </th>
                <th>Global revenue</th>
                <th>Global Employee Count</th>
                <th>Global Gross Profit TTM</th>
                <th>EEbidta</th>
                <th>Global MarketCap</th>
                <th> Evaluation date </th>
                <th> Code </th> */}
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </Table>  
    </ol>
    );
  }
}

export default Results;