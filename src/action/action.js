import axios from 'axios';


export const MARKET_KEY = 'sFWCdaWXBoFIVm7NVFOH8';

export function postResultSet(data){
  var url = 'http://localhost:5000/results';
  return function(dispatch) {
    axios.post(url, data)
    .then(response => {
      dispatch({type: 'POST_RESULT_SUCCESS',payload: response.data});
    })
    .catch((error) => {
      dispatch({type: 'POST_RESULT_ERROR',payload: 'Error'});
      console.log("Error Response"+error);
    });
  };
}

export function testEmail(data , id){

  

  // var seg1 = 'http://localhost:4000/email';
  var seq1 = 'https://serene-ocean-13672.herokuapp.com/email'
  //debugger;
  
  return function(dispatch) {
        //           axios({
        //  method: 'get',
        //  url: 'http://localhost:4000/email',
        //  params: {
        //   data: data
        // }

        // })
        // .then(response => {
        //     console.log('email sent');
        // })
        // .catch((error) => {
        //  console.log('error in sending email.......');
        // });

        // axios.get('http://localhost:4000/email', {
        //   params: {
        //     data: data
        //   }
        // })

        axios.post(seq1, {
          data: data
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });


  };
  
  } 

  // {
  //   params: {
  //     data: data
  //   }
  // }



export function getDukasDaily(data , id){

var seg1 = 'http://localhost:4000/daily';

return function(dispatch) {
                axios({
       method: 'get',
       url: 'http://localhost:4000/daily',
      })
      .then(response => {
       console.log('data recieved....'+ response.data.length);
      })
      .catch((error) => {
       console.log('error....');
      });
};

} 

export function getAlphaData(data , id){

var seg1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:';
var seg2 = '&outputsize=full&apikey=';


//B1A31LJSJBKKJR49

var url = `${seg1}${data}${seg2}${id}`

//debugger;


return function(dispatch) {
                axios({
       method: 'get',
       url: url,
      })
      .then(response => {
      //debugger;
     //alert(JSON.stringify(response));

         dispatch({type: 'DATA_OBTAINED',payload: response.data});

      })
      .catch((error) => {
        dispatch({type: 'DATA_NOT_OBTAINED',payload: 'Error'});
        console.log("Error Response"+error);
       
      });
};

} 





//getAcessToken  ADD_DATA_SCOPE
export function pivotDataTest(data){
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_TEST',
     payload : data,
    })
} 



export function removeAlphadata(data){
 // alert(JSON.stringify(data));
    return ({
     type :'REMOVE_ALPHA_DATA',
     payload : '',
    })
} 

export function removePlotdataLTF(data){
  // alert(JSON.stringify(data));
     return ({
      type :'REMOVE_PLOT_PIVOT_DATA_LTF',
      payload : '',
     })
 }

export function removePlotdatatest(data){
 // alert(JSON.stringify(data));
    return ({
     type :'REMOVE_PLOT_PIVOT_DATA',
     payload : '',
    })
}

export function removePlotdatatestHour(data){
 // alert(JSON.stringify(data));
    return ({
     type :'REMOVE_PLOT_PIVOT_DATA_HOUR',
     payload : '',
    })
} 

export function removePlotdatatestDaily(data){
 // alert(JSON.stringify(data));
    return ({
     type :'REMOVE_PLOT_PIVOT_DATA_DAILY',
     payload : '',
    })
} 


export function removeTickData(data){
    return ({
     type :'REMOVE_TICK_DATA',
     payload : '',
    })
} 

export function removeTickDataHour(data){
    return ({
     type :'REMOVE_TICK_DATA_HOUR',
     payload : '',
    })
} 

export function removeLTFData(data){
  return ({
   type :'REMOVE_TICK_DATA_LTF',
   payload : '',
  })
} 

export function removeTickDataDaily(data){
    return ({
     type :'REMOVE_TICK_DATA_DAILY',
     payload : '',
    })
} 

export function removeTickDataTest(data){
 // alert(JSON.stringify(data));
   return ({
     type :'REMOVE_DATA_SCOPE_TEST',
     payload : ''
    })
}



export function pivotData(data){

  //debugger;
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA',
     payload : data,
    })
}

export function pivotDataHour(data){

  //debugger;
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_HOUR',
     payload : data,
    })
}


export function pivotDataDaily(data){

  //debugger;
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_DAILY',
     payload : data,
    })
}



export function addTickData(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE',
     payload : data
    })
}

export function addTickDataHour(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_HOUR',
     payload : data
    })
}

export function addTickDataDaily(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_DAILY',
     payload : data
    })
}


export function addTickDataLTF(data){
   return ({
     type :'ADD_DATA_SCOPE_LTF',
     payload : data
    })
}

export function pivotDataLTF(data){
    return ({
     type :'PLOT_PIVOT_DATA_LTF',
     payload : data,
    })
}

export function addTickDataTMTF(data){
  return ({
    type :'ADD_DATA_SCOPE_TMTF',
    payload : data
   })
}

export function pivotDataTMTF(data){
   return ({
    type :'PLOT_PIVOT_DATA_TMTF',
    payload : data,
   })
}

export function removePlotdataTMTF(data){
  // alert(JSON.stringify(data));
     return ({
      type :'REMOVE_PLOT_PIVOT_DATA_TMTF',
      payload : '',
     })
}

export function removeTMTFData(data){
  return ({
   type :'REMOVE_TICK_DATA_TMTF',
   payload : '',
  })
} 

export function addTickDataYTC(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_YTC',
     payload : data
    })
}

export function pivotDataYTC(data){

  //debugger;
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_YTC',
     payload : data,
    })
}


export function removePlotdatatestYTC(data){
  // alert(JSON.stringify(data));
     return ({
      type :'REMOVE_PLOT_PIVOT_DATA_YTC',
      payload : '',
     })
 } 

 export function pivotDataYTC4H(data){
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_YTC_4H',
     payload : data,
    })
}


export function removePlotdatatestYTC4H(data){
  // alert(JSON.stringify(data));
     return ({
      type :'REMOVE_PLOT_PIVOT_DATA_YTC_4H',
      payload : '',
     })
 } 
 
 
 export function removeTickDataYTC(data){
     return ({
      type :'REMOVE_TICK_DATA_YTC',
      payload : '',
     })
 } 
 


















