import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { Switch, Route, Routes } from 'react-router-dom';
import React from 'react';
import { store, history} from './store';
import { BrowserRouter } from 'react-router-dom';


import App from './components/App';

// ReactDOM.render((
//   // <Provider store={store}>
//   //   <ConnectedRouter history={history}>
//   //     <Routes>
//   //       <Route path="/" component={App} />
//   //     </Routes>
//   //   </ConnectedRouter>
//   // </Provider>
//   <BrowserRouter>
//     <Provider store={store}>
//       <Routes>
//         <Route path="/" component={App} />
//       </Routes>	
//     </Provider>    
//   </BrowserRouter> 

// ), document.getElementById('root'));


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>    
  </BrowserRouter> 
);
