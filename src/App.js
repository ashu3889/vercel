import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import {createStore} from 'redux';
import Container from './containers/Container.js';
// import { Provider } from "react-redux";
// import Store from './reducer/combo_reducer.js';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App"> 
      <BrowserRouter>
         {/* <Provider store={Store}> */}
            <Container/>
         {/* </Provider>     */}
      </BrowserRouter> 
       
      </div>
    );
  }
}

 export default App;
