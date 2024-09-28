import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { Link } from 'react-router-dom';
import './styles.css';
import 'react-virtualized/styles.css';

function TableData({articles}) {
  const [searchedStock, setSearchedStock] = React.useState('');
  const [dataArticle, setDataArticle] = React.useState([...articles]);
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const [dropDownVal, setDropDownVal] = React.useState("us");
  const [dropDownValTradetype, setDropDownValTradetype] = React.useState("buy");
  var exchangeArrayList = [
    "London",
    "Xetra",
    "Sydney",
    "Toronto",
    "Switzerland",
    "Paris",
    "Milan",
    "Tokyo",
    "Amsterdam",
    "Hong Kong",
    "Tel Aviv",
    "Stockholm",
    "Seoul",
    "Brussels",
    "Vienna",
    "Singapore",
    "Oslo",
    "Mexico",
    "Madrid"
  ];
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
      return modData;
    }
    else if(dropDownVal == "ind") {
      modData = modData.filter(x => x.breakingFix);
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
              {/* <option value="ind">Indian market</option> */}
              <option value="luna">Crypto</option>
              <option value="euro">Global markets</option>
              {/* <option value="London">London</option>
              <option value="Singapore">Singapore</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Paris">Paris</option>
              <option value="Xetra">Xetra</option>
              <option value="Sydney">Sydney</option>
              <option value="Toronto">Toronto</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Milan">Milan</option>
              <option value="Tel Aviv">Tel Aviv</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Oslo">Oslo</option>
              <option value="Seoul">Seoul</option>
              <option value="Brussels">Brussels</option>
              <option value="Vienna">Vienna</option>
              <option value="Mexico">Mexico</option> */}
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
                            var navLink = "/ohlc/" + dataArticle[rowIndex].code;
                            if(cellData == "Buy" || cellData == "'Buy'::character varying" ) {
                              return (
                                <div> 
                                   <span className="buy">Buy</span>
                                    {/* <Link to={navLink} className="nav-link" style={{display: 'block'}}>
                                       View chart
                                    </Link> */}
                                </div>
                              )
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
                    {/* <Column dataKey="viewChart"
                      cellRenderer={
                          ({ cellData, rowIndex, dataKey }) => {
                            return <span style={{ fontSize: '10px'}}>View Chart</span>
                          }
                      }
                      headerRenderer = {
                        () => {
                          return <span style={{ fontSize: '10px'}}>View Chart</span>
                        }
                      }
                    />  */}
                </Table>
              )}
            </AutoSizer>
        </div>
      </div>
    </div>
  )
}

export default TableData;
