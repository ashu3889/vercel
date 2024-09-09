import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import './styles.css';
import 'react-virtualized/styles.css';

function TableData({articles}) {
  const [searchedStock, setSearchedStock] = React.useState('');
  const [dataArticle, setDataArticle] = React.useState([...articles]);

  React.useEffect(() => {
    if(searchedStock == '') {
      setDataArticle(articles);
    }
    else if(searchedStock.length> 0) {
      const newData = articles.filter(a => a.scripName.toLowerCase().startsWith(searchedStock));
      debugger;
      setDataArticle(newData);
    }
  }, [searchedStock]);
 

  // articles = articles.map((e) =>  {
  //   e['date'] = new Date(e.date).toLocaleDateString('en-GB', {
  //     day: 'numeric', month: 'short', year: 'numeric'
  //   }).replace(/ /g, '-');
  //   e['tradeType'] = 'Buy';
  //   return e;
  // });

  const _handleKeyDown = (e)  => {
    if (e.key === 'Enter') {
      console.log('do validate');
      setSearchedStock(e.target.value.trim());
      debugger;
    }
  }

  return (
    <div class="wrapper">
      <div class="header">
        <div class="search_box">
          <input 
            type="text" 
            id="search_input" 
            placeholder="Filter table by stock name to check past result"
            onKeyDown={_handleKeyDown}
          />
        </div>
      </div>

      <div class="table_wrap">
      <div style={{ height: '100vh', width: '100%' }}>
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
                <Column width={150} label="Trigger date" dataKey="date" />
                <Column width={350} label="Stock" dataKey="scripName" />
                <Column width={100} label="Exchange" dataKey="exchange" />
                <Column class="buy-signal" width={100} label="Signal" dataKey="tradeType"/> 
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>

        {/* <div class="table_header">
          <ul>
            <li>
              <div class="item">
                <div class="name">
                  <span>NAME</span>
                </div>
                <div class="phone">
                  <span>PHONE</span>
                </div>
                <div class="issue">
                  <span>ISSUE</span>
                </div>
                <div class="status">
                  <span>STATUS</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="table_body">
          <ul>
            <li>
              <div class="item">
                <div class="name">
                  <span>Alex</span>
                </div>
                <div class="phone">
                  <span>+1 111 222 333</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
                <div class="status">
                  <span class="open">Open</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Max Johnson</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum dolor sit amet consectetur adipisicing.</span>
                </div>
                <div class="status">
                  <span class="reopened">Reopened</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>scarlett johansson</span>
                </div>
                <div class="phone">
                  <span>+1 341 242 336</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum dolor.</span>
                </div>
                <div class="status">
                  <span class="fixed">Fixed</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Rosey</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </div>
                <div class="status">
                  <span class="closed">Closed</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>John</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum.</span>
                </div>
                <div class="status">
                  <span class="hold">Hold</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Max Johnson</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum dolor sit amet consectetur adipisicing.</span>
                </div>
                <div class="status">
                  <span class="open">open</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Sarah Glenn</span>
                </div>
                <div class="phone">
                  <span>+1 111 222 333</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
                <div class="status">
                  <span class="open">Open</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Hayley Matthews</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit.</span>
                </div>
                <div class="status">
                  <span class="canceled">Canceled</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Sarah Glenn</span>
                </div>
                <div class="phone">
                  <span>+1 111 222 333</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
                <div class="status">
                  <span class="open">Open</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>John</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum.</span>
                </div>
                <div class="status">
                  <span class="hold">Hold</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Kate Cross</span>
                </div>
                <div class="phone">
                  <span>+1 341 242 336</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum dolor.</span>
                </div>
                <div class="status">
                  <span class="fixed">Fixed</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Jake Lehmann</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </div>
                <div class="status">
                  <span class="closed">Closed</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Richard Gleeson</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum.</span>
                </div>
                <div class="status">
                  <span class="hold">Hold</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Oliver Robinson</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum dolor sit amet consectetur adipisicing.</span>
                </div>
                <div class="status">
                  <span class="reopened">Reopened</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Richard Gleeson</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum.</span>
                </div>
                <div class="status">
                  <span class="hold">Hold</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Max Johnson</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem, ipsum dolor sit amet consectetur adipisicing.</span>
                </div>
                <div class="status">
                  <span class="closed">closed</span>
                </div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="name">
                  <span>Sam Whiteman</span>
                </div>
                <div class="phone">
                  <span>+1 331 442 436</span>
                </div>
                <div class="issue">
                  <span>Lorem ipsum dolor sit.</span>
                </div>
                <div class="status">
                  <span class="canceled">Canceled</span>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
    </div>
  )
}

export default TableData;
