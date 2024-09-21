import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import './styles.css';
import 'react-virtualized/styles.css';

function TableData({articles}) {
  const [searchedStock, setSearchedStock] = React.useState('');
  const [dataArticle, setDataArticle] = React.useState([...articles]);

  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

  const [dropDownVal, setDropDownVal] = React.useState("us");
  const [dropDownValTradetype, setDropDownValTradetype] = React.useState("buy");



  const getDataBasedOnCountry = (data) => {
    let modData = [...data];
    if(dropDownValTradetype === "buy") {
      modData = modData.filter(a => a.tradeType === "Buy");
    }
    else if(dropDownValTradetype === "sell"){
      modData = modData.filter(a => a.tradeType === "Sell");
    }
    if(dropDownVal == "us") {
      // (a => a.tradeType !== "Sell");
      modData = modData.filter(x => {
         if(x.exchange.toLowerCase() == "nasdaq" || x.exchange.toLowerCase() == "nyse" ) {
          return true;
         }
         return false;
      }).filter(a => a.isNewIteration).sort((a, b) => new Date(b.date) - new Date(a.date)) ;
      return modData;
    }
    else if(dropDownVal == "ind") {
       // BSE
       // || x.exchange.toLowerCase() == "bse" 
      modData = modData.filter(x => {
        if((x.exchange.toLowerCase() == "nse" )&& x.scripName && x.scripName.trim().length > 0) {
          return true;
        }
        return false;
     }).sort((a, b) => new Date(b.date) - new Date(a.date));
     return modData;
    }
    else if(dropDownVal == "luna") {
      modData = modData.filter(x => {
        if(x.exchange.toLowerCase() == "coindcx" ) {
         return true;
        }
        return false;
     }).sort((a, b) => new Date(b.date) - new Date(a.date));
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
      // const newData = articles.filter(a => a.scripName.toLowerCase().startsWith(debouncedInputValue));
      let data1 = getDataBasedOnCountry(articles);
      console.log('data...' + JSON.stringify(data1));
      const newData = data1.filter(a =>  {
        if(a.scripName) {
          return a.scripName.toLowerCase().startsWith(debouncedInputValue);
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
    setInputValue(event.target.value);
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
          <input 
            type="text" 
            id="search_input" 
            placeholder="Search by stock name and backtest past results."
            // onKeyDown={_handleKeyDown}
            onChange={handleInputChange}
          />
            <legend className="market-title-legend" style={{
              display: 'contents',
              color: 'white',
              fontSize: '10px',
              marginLeft: '10px'
            }}>Select market</legend>
            <select  class="market-selector" id="lang" onChange={change} value={dropDownVal}>
              <option value="us">Nasdaq</option>
              <option value="ind">Indian market</option>
              <option value="luna">Crypto</option>
            </select>
            <legend className="trade-title-legend" style={{
              display: 'contents',
              color: 'white',
              fontSize: '10px',
              marginLeft: '10px'
            }}>Select trade</legend>
            <select  class="direction-selector" id="lang" onChange={changeTradetype} value={dropDownValTradetype}>
              <option value="buy">Buy</option>
              <option value="sell" disabled={(dropDownVal === "ind" || dropDownVal === "luna" ) ? true: false} >Sell</option>
              <option value="both" disabled={(dropDownVal === "ind" || dropDownVal === "luna" ) ? true: false}>Show both</option>
            </select>
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
                  rowHeight={70}
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
                            if(cellData == "Buy" ) {
                              return <span className="buy">{cellData}</span>
                            }
                            else if(cellData == "Sell" ) {
                              return <span className="sell">{cellData}</span>
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
