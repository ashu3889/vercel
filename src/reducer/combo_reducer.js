import {combineReducers, createStore,applyMiddleware} from 'redux';


import tickData from './tickdata.js';

import plData from './plotdata.js';

import ltfTick from './ltf_tick.js';
import dailyTick from './daily_tick.js';
import hourlyTick from './hourly_tick.js';

import ltfPlot from './ltf_plot.js';
import dailyPlot from './daily_plot.js';
import hourlyPlot from './hourly_plot.js';

import tmtfTick from './tmtf_tick.js';
import tmtfPlot from './tmtf_plot.js';

import reduxThunk from 'redux-thunk';

import tickDataYTC from './tickdata_ytc.js';

import plDataYTC from './plotdata_ytc.js';
import plDataYTC4H from './plotdata_ytc_4h.js';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const rootreducer = combineReducers({
	tickData: tickData,
	plData:   plData,
	dailyTick: dailyTick,
	dailyPlot: dailyPlot,
	hourlyTick: hourlyTick,
	hourlyPlot: hourlyPlot,
	ltfTick:ltfTick,
	ltfPlot:ltfPlot,
	tmtfTick:tmtfTick,
	tmtfPlot:tmtfPlot,
	tickDataYTC:tickDataYTC,
	plDataYTC:plDataYTC,
	plDataYTC4H:plDataYTC4H,
});


// const rootReducer =combineReducers({
// 	physics : physics,
// 	chemis,
// 	bilogy
// })

const persistedstate = {
	tickData: [],
	plData:   [],
	dailyTick: [],
	dailyPlot: [],
	hourlyTick: [],
	hourlyPlot: [],
	ltfTick:[],
	ltfPlot:[],
	tmtfTick:[],
	tmtfPlot:[],
	tickDataYTC:[],
	plDataYTC:[],
	plDataYTC4H:[],
};

const store = createStoreWithMiddleware(rootreducer , persistedstate,/* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   );



//console.log(store.getstate());

export default store;



// var a = {"t":[1580376300],"c":[52.650001525879],"o":[52.619998931885],"h":[52.700000762939],"l":[52.619998931885],"v":["n\/a"],"s":"ok"};

// var e = [];

// Object.values(a)[0].map((val, index) => {
	
// var f = {};
// f['Local time']  = new Date(Object.values(a)[0][index]);
// f["Open"] = Object.values(a)[2][index];
// f["High"] = Object.values(a)[3][index];
// f["Low"] = Object.values(a)[4][index];
// f["Close"] = Object.values(a)[1][index];
// e.push(f);

// })

// console.log(e);