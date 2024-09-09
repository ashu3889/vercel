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


  articles = articles.map((e) =>  {
    e['date'] = new Date(e.date).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    e['tradeType'] = 'Buy';
    return e;
  });

  return (
    <div className="TableData">
      <div style={{ height: '100vh', width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              gridStyle={{ 

              }}
              width={width}
              height={height}
              headerHeight={30}
              rowHeight={40}
              rowCount={articles.length}
              sortBy='date'
              sortDirection='ASC'
              rowGetter={({ index }) => articles[index]}>
              <Column width={150} label="Trigger date" dataKey="date" />
              <Column width={300} label="Stock" dataKey="scripName" />
              <Column width={100} label="Exchange" dataKey="exchange" />
              <Column width={100} label="Signal" dataKey="tradeType"/> 
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default TableData;
