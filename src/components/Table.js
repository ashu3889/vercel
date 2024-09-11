import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import './styles.css';
import 'react-virtualized/styles.css';

function TableData({articles}) {
  const [searchedStock, setSearchedStock] = React.useState('');
  const [dataArticle, setDataArticle] = React.useState([...articles]);

  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

  // React.useEffect(() => {
  //   if(searchedStock == '') {
  //     setDataArticle(articles);
  //   }
  //   else if(searchedStock.length> 0) {
  //     const newData = articles.filter(a => a.scripName.toLowerCase().startsWith(searchedStock));
  //     debugger;
  //     setDataArticle(newData);
  //   }
  // }, [searchedStock]);

    React.useEffect(() => {
    if(debouncedInputValue == '') {
      setDataArticle(articles);
    }
    else if(debouncedInputValue.length> 0) {
      const newData = articles.filter(a => a.scripName.toLowerCase().startsWith(debouncedInputValue));
      debugger;
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

  return (
    <div class="wrapper">
      <div class="header">
        <div class="search_box">
          <input 
            type="text" 
            id="search_input" 
            placeholder="Filter table by stock name to check past result"
            // onKeyDown={_handleKeyDown}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1 1 auto', height: '60vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={50}
                  rowCount={dataArticle.length}
                  sortBy='date'
                  sortDirection='ASC'
                  rowGetter={({ index }) => dataArticle[index]}>
                  <Column label="Date" dataKey="date" />
                  <Column label="Stock" dataKey="scripName" />
                  <Column label="Exchange" dataKey="exchange" />
                  <Column label="Signal" dataKey="tradeType"/> 
                </Table>
              )}
            </AutoSizer>
        </div>
      </div>
    </div>
  )
}

export default TableData;
