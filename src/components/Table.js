import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import './styles.css';
import 'react-virtualized/styles.css';

function TableData({articles}) {
  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    for (let i = 0; i < 1000; i++) {
      setArr((prevArr) => [...prevArr, { number: i, name: 'uwu' }]);
    }
  }, []);

  // alert('alert length ...' + articles.length);
  debugger;

  let articleData = articles.filter(a => a.tradeType !== "Sell");
  // sort((a, b) => new Date(b.date) - new Date(a.date)) ;
  return (
    <div className="TableData">
      <div style={{ height: '100vh', width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              gridStyle={{ outline: 'none' }}
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={70}
              rowCount={articleData.length}
              sortBy='scripName'
              sortDirection='ASC'
              rowGetter={({ index }) => articleData[index]}>
              <Column width={400} label="Stock" dataKey="scripName" />
              <Column width={200} label="Exchange" dataKey="exchange" />
              <Column width={400} label="Date of trade" dataKey="date" />
              <Column width={300} label="Trade type" dataKey="tradeType" /> 
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default TableData;
