import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
const lookup = require("coordinate_to_country");

import { Link } from 'react-router-dom';
import './styles.css';
import 'react-virtualized/styles.css';

import { useState } from "react";
import DatePicker from "react-multi-date-picker";

function DatePickerComponent() {
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([today, tomorrow])

  return (
    <DatePicker 
      multiple
      value={values} 
      onChange={setValues}
    />
  )
}

function TableData({articles}) {
  const [searchedStock, setSearchedStock] = React.useState('');
  const [dataArticle, setDataArticle] = React.useState([...articles]);
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const [dropDownVal, setDropDownVal] = React.useState("us");
  const [dropDownValTradetype, setDropDownValTradetype] = React.useState("buy");



  let usOptionData = [
    {value: 'us', label: 'Nasdaq'},
    {value: 'ind', label: 'Indian market'},
    {value: 'luna', label: 'Crypto'},
  ];

  let indiaOptionData = [
    {value: 'ind', label: 'Indian market'},
    {value: 'us', label: 'Nasdaq'},
    {value: 'luna', label: 'Crypto'},
  ];

  let selectedOptionDropdown = [...usOptionData];

  const removeDuplicateValues = (arr) => {
    const unique = [];
    const uniqueArr = [];

    let desiredArr = [];

    let groupedArray = Object.groupBy(arr, employee => employee.scripName);

    // Object.values(groupedArray).filter()

    for (var i = 0 ; i <  Object.values(groupedArray).length; i++ ){
      // check if this array contains scrip code
      let currentArray = Object.values(groupedArray)[i];
      let checkScripArray = currentArray.filter(x => x.scripCode);
      if(checkScripArray.length > 0) {
        checkScripArray.map( y => {
          unique.push(y);
          return y;
        });
      }
      else{
        currentArray.map(x => unique.filter(
            a => a.exchange == x.exchange && 
            a.scripName == x.scripName &&
            a.scripName == x.scripName &&
            + new Date(a.date) === + new Date(x.date)
          ).length > 0 ? 
          null : unique.push(x)
        );
      }
        // if yes push this in unique array,
        // else use the logic of below unique arr
    }

    // debugger;
    // for(var i = 0; i < arr.length-1; i++) {
    //   let originalArrMap = arr.filter(x => x.scripName === arr[i].scripName);
    //   let checkScripCodeIndex = originalArrMap.map(x => x.scripCode);
    //   let current = arr[i];
    // }


    // arr.filter(())

    // arr.map(x => unique.filter(
    //     a => a.exchange == x.exchange && 
    //     a.scripName == x.scripName &&
    //     a.scripName == x.scripName &&
    //     + new Date(a.date) === + new Date(x.date)
    //   ).length > 0 ? 
    //   null : unique.push(x)
    // );
    // debugger;
    return unique;
  }

  const getDataBasedOnCountry = (data) => {
    let modData = [...data];
    if(dropDownValTradetype === "buy") {
      modData = modData.filter(a1 => a1.tradeType === "Buy" ||  a1.tradeType === "'Buy'::character varying");
    }
    else if(dropDownValTradetype === "sell"){
      modData = modData.filter(a2 => a2.tradeType === "Sell");
    }
    if(dropDownVal == "us") {
      modData = modData.filter(x => {
         if(x.exchange.toLowerCase() == "nasdaq" || x.exchange.toLowerCase() == "nyse" ) {
          return true;
         }
         return false;
      }).filter(a3 => a3.isNewIteration).sort((a4, b) => new Date(b.date) - new Date(a4.date)) ;
      modData = removeDuplicateValues(modData);
      modData = modData.sort((a7, b) => new Date(b.date) - new Date(a7.date));
      return modData;
    }
    else if(dropDownVal == "ind") {
      modData = modData.filter(x => x.breakingFix);
      modData = removeDuplicateValues(modData);
      modData = modData.filter(x => {
        if((x.exchange.toLowerCase() == "nse" || x.exchange.toLowerCase() == "bse" )&& x.scripName && x.scripName.trim().length > 0) {
          return true;
        }
        return false;
     }).sort((a5, b) => new Date(b.date) - new Date(a5.date));
    
     return modData;
    }
    else if(dropDownVal == "luna") {
      modData = modData.filter(x => {
        if(x.exchange.toLowerCase() == "coindcx" ) {
         return true;
        }
        return false;
     }).sort((a6, b) => new Date(b.date) - new Date(a6.date));
     modData = removeDuplicateValues(modData);
     modData = modData.sort((a9, b) => new Date(b.date) - new Date(a9.date));
     return modData;
    }
    else if(dropDownVal == "euro") {
      modData = modData.filter(x => {
        if(
          x.exchange.toLowerCase() !== "coindcx" && 
          x.exchange.toLowerCase() !== "nse" &&
          x.exchange.toLowerCase() !== "bse" &&
          x.exchange.toLowerCase() !=="nasdaq" &&
          x.exchange.toLowerCase()  !== "nyse"
        ) {
         return true;
        }
        return false;
     }).sort((a7, b) => new Date(b.date) - new Date(a7.date));
      // modData = removeDuplicateValues(modData);
      // if() {

      // }
      var exchange =  modData.map(x => x.exchange);
      var exchangeArray = exchange.filter(function(item, pos) {
        return exchange.indexOf(item) == pos;
      })

     return modData;
    }
    return [];
  }

  React.useEffect(() => {
    let data = getDataBasedOnCountry(articles);
    setDataArticle(data);
  }, [dropDownVal, dropDownValTradetype]);

  // React.useEffect(() => {
  //   let data = getDataBasedOnCountry(articles);
  //   setDataArticle(data);
  // }, [dropDownValTradetype]);

  React.useEffect(() => {
    if(debouncedInputValue == '') {
      let data = getDataBasedOnCountry(articles);
      setDataArticle(data);
    }
    else if(debouncedInputValue.length> 0) {
      let data1 = getDataBasedOnCountry(articles);
      const newData = data1.filter(a8 =>  {
        if(a8.scripName) {
          return a8.scripName.toLowerCase().startsWith(debouncedInputValue);
        }
        return false;
      });
      setDataArticle(newData);
    }
  }, [debouncedInputValue]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);
 

  // articles = articles.map((e) =>  {
  //   e['date'] = new Date(e.date).toLocaleDateString('en-GB', {
  //     day: 'numeric', month: 'short', year: 'numeric'
  //   }).replace(/ /g, '-');
  //   e['tradeType'] = 'Buy';
  //   return e;
  // });

  const _handleKeyDown = (e)  => {
    console.log('e key is...' + e.key + '...e.target.value.trim()...' + e.target.value.trim());
    // alert('e key is...' + e.keyCode);
    if (e.key === 'Enter' || e.keyCode === 13 ) {
      console.log('do validate');
      setSearchedStock(e.target.value.trim());
    }
    else if(e.key === "Backspace" && e.target.value.trim() == "") {
      setSearchedStock('');
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const change = (event) => {
    // this.setState({setDropDownVal: event.target.value});
    setDropDownVal(event.target.value);

    if(event.target.value === "ind") {
      setDropDownValTradetype('buy');
    }
    if(event.target.value === "luna") {
      setDropDownValTradetype('buy');
    }


  };

  const changeTradetype = (event) => {
    // this.setState({setDropDownVal: event.target.value});
    setDropDownValTradetype(event.target.value);
  };

  const MIN_TABLE_WIDTH = 500;

  return (
    <div class="wrapper">
      <div class="header search-input">
        <div class="search_box" style={{height: '20px'}}>
            <legend className="market-title-legend" style={{
              display: 'contents',
              color: 'white',
              fontSize: '10px',
              marginLeft: '10px'
            }}>Select market</legend>
            <select  class="market-selector" id="lang" onChange={change} value={dropDownVal}>
              {
                selectedOptionDropdown.map(e => {
                  let val = e.value;
                  return (
                    <option value={val}>{e.label}</option>
                  )
              })}
            </select>
            <legend className="trade-title-legend" style={{
              display: 'contents',
              color: 'white',
              fontSize: '10px',
              marginLeft: '10px'
            }}>Select trade</legend>
            <select  class="direction-selector" id="lang" onChange={changeTradetype} value={dropDownValTradetype}>
              <option value="buy">Buy</option>
              <option value="sell" disabled={(dropDownVal !== "us"  ) ? true: false} >Sell</option>
              <option value="both" disabled={(dropDownVal !== "us" ) ? true: false}>Show both</option>
            </select>
         
        </div>
         <div style={{
            marginLeft: '30px',
            marginTop: '20px'
          }}>
            <span style={{color: 'whitesmoke'}}> Select date range</span>
            <DatePickerComponent/>
         </div>
 
      </div>

      <div className="scrip-table-container" style={{ display: 'flex', marginTop: '20px' }}>
        <div className="scrip-table" style={{ flex: '1 1 auto' ,height: '100vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  overflow={"scroll"}
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={80}
                  rowCount={dataArticle.length}
                  // sortBy='date'
                  // sortDirection='ASC'
                  rowGetter={({ index }) => dataArticle[index]}>
                    <Column label="Date" dataKey="date" />
                    <Column 
                      headerRenderer = {
                        () => {
                          return (
                            <div className="stock-row-header" >
                              Stock
                            </div>
                          )
                        }
                      }
                      dataKey="scripName" 
                      cellRenderer={
                        ({ cellData }) => {
                          return <span className="stock-name-column">{cellData}</span>
                        }
                      }
                    />
                    <Column  
                      className="exchange-row" 
                      // label="Exchange" 
                      dataKey="exchange" 
                      headerRenderer = {
                        () => {
                          return (
                            <div className="exchange-row-header" >
                              Exchange
                            </div>
                          )
                        }
                      }
                    />
                    <Column dataKey="tradeType"
                      cellRenderer={
                          ({ cellData, rowIndex, dataKey }) => {

                            if(dataArticle[rowIndex].scripCode === "CSL") {
                              // debugger;
                            }
                            const rowData1 = dataArticle[rowIndex];
                            var navLink = "/chart/?exchange=" + rowData1.exchange + '&symbol=' + rowData1.scripCode;
                            if(cellData == "Buy" || cellData == "'Buy'::character varying" ) {
                              return (
                                <div> 
                                   <span className="buy">Buy</span>
                                   {
                                    dataArticle[rowIndex].scripCode ?  (
                                      <Link 
                                        to={navLink} 
                                        className="nav-link" 
                                        target="_blank"
                                        style={{
                                          display: 'block',
                                          color: 'darkgreen',
                                          fontFamily: 'monospace',
                                          fontWeight: 'bold',
                                          cursor: 'pointer',
                                          textDecoration: 'underline',
                                        }}
                                      >
                                        View chart
                                      </Link>
                                    ) : ''
                                   }

                                </div>
                              )
                            }
                            else if(cellData == "Sell" ) {
                              return (
                                <div> 
                                   <span className="sell">Sell</span>
                                   {
                                    dataArticle[rowIndex].scripCode ?  (
                                      <Link 
                                        to={navLink} 
                                        className="nav-link" 
                                        target="_blank"
                                        style={{
                                          display: 'block',
                                          color: 'darkgreen',
                                          fontFamily: 'monospace',
                                          fontWeight: 'bold',
                                          cursor: 'pointer',
                                          textDecoration: 'underline',
                                        }}
                                      >
                                        View chart
                                      </Link>
                                    ) : ''
                                   }
                                </div>
                              )
                            }
                          }
                      }
                      headerRenderer = {
                        () => {
                          return (
                            <div style={{
                              height: '36px'
                            }}>
                              <p style={{
                                height: '7px',
                              }}> Signal </p>
                              <p className="disclaimer-text-grid"> Disclaimer: This is informational only.
                              <a style={{color: '#29a5d8'}} href="/disclaimer"> Learn more</a> </p>
                            </div>
                          )
                        }
                      }
                    /> 
                </Table>
              )}
            </AutoSizer>
        </div>
      </div>
    </div>
  )
}

export default TableData;
