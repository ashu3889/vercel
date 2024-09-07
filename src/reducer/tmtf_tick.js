export default function(state = [], action) {
    switch(action.type) {
      case 'REMOVE_TICK_DATA_TMTF':
       return [];
      //  case 'Update_Physics_Dept':
      //    return [...DataCue, action.payla]
      case 'ADD_DATA_SCOPE_TMTF':
             
                 
           let length = state.length;
           let direction = '';
           const now = new Date();
  
          
          if(length >= 1 ){
  
                 // Test if Target pivot is broke or not and color is against it
              const {targetInflectionPoint, currentInflectionPoint} = action.payload;
              
  
              if(state[state.length-1].downPivotNotFormed != undefined){
                action.payload.downPivotNotFormed = state[state.length-1].downPivotNotFormed;
              } 
  
  
              if(state[state.length-1].strength != undefined){
                action.payload.strength = state[state.length-1].strength;
              } 
  
              // Brand new logic here to calculate potential swing
              if(state[state.length-1].future_potential_params != undefined){
                action.payload.future_potential_params = state[state.length-1].future_potential_params;
              }
  
              if(state[state.length-1].potentialTrend != undefined){
                action.payload.potentialTrend = state[state.length-1].potentialTrend;
              }
  
              if(state[state.length-1].aggregatePotentialSwings){
                action.payload.aggregatePotentialSwings = state[state.length-1].aggregatePotentialSwings;
              } 
  
              // if(state[state.length-1].doNotEnter){
              //   action.payload.doNotEnter = state[state.length-1].doNotEnter;
              // } 
  
              //////// console.log('Tribute to Irfan,..date is...' + action.payload.date + '... current swing high...' + action.payload.currentSwingHigh + '... cureent swing low is...' + action.payload.currentSwingLow + '... date is..' + +action.payload.date)
            
              // Check if swing high/low is broken or not
              if(action.payload.currentSwingHigh && action.payload.currentSwingLow ){
                 let {currentSwingHigh : htfHigh , currentSwingLow : htfLow  } = action.payload;
                 let {high : candleHigh, low : candleLow , close: candleClose , tickType : candleTickType} = action.payload;
  
                 if((candleHigh >=  htfHigh &&  candleLow <= htfHigh) || (candleHigh >=  htfLow &&  candleLow <= htfLow) ){
                     // ////// console.log('Irfan khan candle broken on.....' + action.payload.date);
                     
  
                     if(candleHigh >=  htfHigh &&  candleLow <= htfHigh  && candleTickType == "green"){
                        // If Broken candle closed above the level,, we will not enter.
  
                        action.payload.doNotEnter = true;
                        // if(candleClose < htfHigh){
                        //   // We will not at all enter now
                        //   action.payload.doNotEnter = true;
                        // }
                     }
  
                     if(candleHigh >=  htfLow &&  candleLow <= htfLow  && candleTickType == "red"){
                        // If Broken candle closed below the level,, we will not enter.
                        action.payload.doNotEnter = true;
                        // if(candleClose > htfLow){
                        //   // We will not at all enter now
                        //   action.payload.doNotEnter = true;
                        // }                    
                     }
                 }
  
              }
              // Now lets see if potential future swings get triggered or not
  
              ////// console.log('Before starting day....future_potential_params' + action.payload.future_potential_params  + '... day is...' + action.payload.date);
              if(action.payload.future_potential_params  != undefined){
                  // Now lets see if this new candle triggers the already existing potential parm or not
                  let {future_direction, is_triggered , is_confirmed, signal_candle } = action.payload.future_potential_params;
                  let {tickType : signal_candle_color , high : signal_candle_high, low: signal_candle_low } = signal_candle;
                  let {tickType : possible_trigger_candle_color , high : possible_trigger_candle_high, low: possible_trigger_candle_low } = action.payload;
  
                  if(+action.payload.date == 1585785600000){
                    // //debugger;
                  }
                  ////// console.log('Starting day calculation for potential swing if its triggered or not  is....' + action.payload.date + '..signal_candle_color..' + signal_candle_color + '...date is...' + +action.payload.date);
                
                  // if(action.payload.doNotEnter == true){
                  //   ////// console.log('Beware.....ashu on... do not enter on...' + action.payload.date);
                  // }
                  // else{
                  //   ////// console.log('Good to GO Ashu........ashu on... do not enter on...' + action.payload.date);
                  // }
                  
  
                  // Neutralising condition of future potential signal candle here
                  if(possible_trigger_candle_high > signal_candle_high && possible_trigger_candle_low < signal_candle_low  && signal_candle_color !== possible_trigger_candle_color){
                    
                    //// console.log(' Kaliph ... is prev contain overlap candle..' + action.payload.future_potential_params.is_overlap_candle + '.. date is...' + action.payload.date)
                    
                    if(action.payload.future_potential_params.is_overlap_candle ){
                      // { check: true , overlap_candle : state[state.length-1] , overlap_tickType : 'green', level : state[state.length-1].high};
                      const {overlap_tickType : parent_overlap_type , level : parent_overlap_level} = action.payload.future_potential_params.is_overlap_candle;
                      //// console.log('Inside caliphate parent overlap type is...' + parent_overlap_type + '.. parent level is...' + parent_overlap_level );
                      if(parent_overlap_type == "green" && action.payload.tickType == "green" && parent_overlap_level < action.payload.high){
                        action.payload.potentialTrend = "potential-uptrend";
                        action.payload.future_potential_params  = null;
                        // Aggregate to aggregate potential swing array
                        if(!state[state.length-1].aggregatePotentialSwings ){
                          action.payload.aggregatePotentialSwings = [{ [action.payload.date]:  "potential-uptrend" }];
                          
                        }
                        else{
                          action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: "potential-uptrend" }]; 
                        }  
                        //// console.log('Booooommmm  we got a confirmed uptrend at ...' + action.payload.date);
                      }
                      else if(parent_overlap_type == "red" && action.payload.tickType == "red" && parent_overlap_level > action.payload.low){
                        action.payload.potentialTrend = "potential-downswing";
                        action.payload.future_potential_params  = null;
                        // Aggregate to aggregate potential swing array
                        if(!state[state.length-1].aggregatePotentialSwings ){
                          action.payload.aggregatePotentialSwings = [{ [action.payload.date]:  "potential-downswing" }];
                        }
                        else{
                          action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]:  "potential-downswing" }]; 
                        }  
                        //// console.log('Booooommmm  we got a confirmed downtrend at ...' + action.payload.date);
                      }
                    }
                    else{
                      action.payload.potentialTrend = null;
                      action.payload.future_potential_params  = null;
                      //// console.log('Potential trend violated on...' + action.payload.date + '..signal candle color is...' + signal_candle_color + '.. trigger color is...' +  possible_trigger_candle_color);
                    }
                  }
                  else if(action.payload.doNotEnter){
                    action.payload.potentialTrend = "do-not-enter";
                    action.payload.future_potential_params  = null;
                    // Aggregate to aggregate potential swing array
                    if(!state[state.length-1].aggregatePotentialSwings ){
                      action.payload.aggregatePotentialSwings = [{ [action.payload.date]:  "do-not-enter" }];
                      
                    }
                    else{
                      action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: "do-not-enter" }]; 
                    }  
                  }
                  else{
                    if(future_direction == "up" && signal_candle_high < possible_trigger_candle_high && possible_trigger_candle_low > signal_candle_low){
                      action.payload.potentialTrend = "potential-uptrend";
                      action.payload.future_potential_params  = null;
                      //// console.log('Uptrend started on...' + action.payload.date);
  
                      // Aggregate to aggregate potential swing array
                      if(!state[state.length-1].aggregatePotentialSwings ){
                        action.payload.aggregatePotentialSwings = [{ [action.payload.date]:  "potential-uptrend" }];
                        
                      }
                      else{
                        action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: "potential-uptrend" }]; 
                      }                    
                    }
  
                    if(future_direction == "down" && signal_candle_low > possible_trigger_candle_low && signal_candle_high > possible_trigger_candle_low){
                        action.payload.potentialTrend = "potential-downswing";
                        action.payload.future_potential_params  = null;
                        //// console.log('Downtrend started on...' + action.payload.date + '.. actula time stamp is...' + +action.payload.date);
  
                        // Aggregate to aggregate potential swing array
                        if(!state[state.length-1].aggregatePotentialSwings ){
                          action.payload.aggregatePotentialSwings = [{ [action.payload.date]:  "potential-downswing" }];
                        }
                        else{
                          action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]:  "potential-downswing" }]; 
                        }                     
                    }
                  }
              }
  
  
              let p_s_search =  false;
              let is_overlap_candle = null;
              let future_potential_params = null;
              let prevCandleColor = state[length-1].tickType;
              let currentCandleColor = action.payload.tickType;
              if(state[length-1].purgedCandleDetail){
                prevCandleColor = state[length-1].purgedCandleDetail.tickType;
                ////////// console.log('Purged candle purged on date...' + state[length-1].purgedCandleDetail.date);
              }
              // PotentialSignal Candle only when diff candle color formed
              if(currentCandleColor !== prevCandleColor){
  
                // one more check before initiating potential signal candle search.
                // do not enable search if new candle is red and downtrend is confirmed.. and vice versa
                if(action.payload.potentialTrend == "potential-downswing" && action.payload.tickType == "red" ){
                  p_s_search = false;
                }
                else if(action.payload.potentialTrend == "potential-uptrend" && action.payload.tickType == "green" ){
                  p_s_search = false;
                }
                else{
                  p_s_search = true;
                }
              }
  
              if(+action.payload.date == 1588194000000){
                 // //debugger;
              }
  
              // Check if current candle is overlapped by any prev candle
              if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low)<= parseFloat(action.payload.low))){
                if(state[state.length-1].tickType == "red"){
                  is_overlap_candle = { check: true , overlap_candle : state[state.length-1] , overlap_tickType : 'red' , level : state[state.length-1].low };
                }
                else if(state[state.length-1].tickType == "green"){
                  is_overlap_candle = { check: true , overlap_candle : state[state.length-1] , overlap_tickType : 'green', level : state[state.length-1].high};
                }
                // //// console.log('Sputnik...Current candle at ..' + action.payload.date + '.. is overlapped by candle at...' + state[state.length-1].date + '.. overlapping candle color is...' + state[state.length-1].tickType);
              }
  
  
              if(p_s_search){
                if(action.payload.tickType == "green" || action.payload.tickType == "doji"){
                  action.payload.future_potential_params = {is_signal_found : true, is_triggered : false, is_confirmed : false , future_direction : 'up', signal_candle : action.payload, is_overlap_candle: is_overlap_candle};
                }
                if(action.payload.tickType == "red" ){
                  action.payload.future_potential_params = {is_signal_found : true, is_triggered : false, is_confirmed : false , future_direction : 'down', signal_candle : action.payload, is_overlap_candle: is_overlap_candle};
                }
                //// console.log('Possible potential signal candle for next day direction is...' + action.payload.future_potential_params.signal_candle.tickType  );
              }
              
              if(state[state.length-1].high < parseFloat(action.payload.high) ){
                  //up direction
                   if(action.payload.tickType == "green" || action.payload.tickType == "doji"){
                            if(parseFloat(action.payload.low) < parseFloat(state[state.length-1].low) &&  state[state.length-1].tickType == "red"){
                                  direction ='down';
                            }
                            else{
                                 ////////// console.log('Modi wala Curfeww at time...' + action.payload.date);
                                 direction ='up';
                             }
                   }
                   else if(action.payload.tickType == "red"){
                            if(parseFloat(action.payload.close) < state[state.length-1].close){
                                  if(length >= 2){
                                          if(parseFloat(action.payload.low) < state[state.length-2].low){
                                                //time to mark it as down.. no way its up against my rule if i mark it as up
                                                direction ='down';
                                          }
                                          else{
  
                                              if(parseFloat(action.payload.low) <= state[state.length-1].low){
                                                 direction ='down';
                                              }
                                              else{
                                                 ////////// console.log('Curfeww at time...' + action.payload.date);
                                                  direction = 'up';
                                              }
                                               
                                          }
                                  }
                            }
                            if(parseFloat(action.payload.low) >= state[state.length-1].low){
                                 direction ='up';
                            }
                   }
  
  
                  if(action.payload.date === "30.01.2020 18:40:00.000 GMT+0530"){
                    // //debugger;
                  }  
              }
              else if(parseFloat(state[state.length-1].high) > parseFloat(action.payload.high)){
                    //down direction
                     direction ='down';
              }
              else if(parseFloat(state[state.length-1].high) == parseFloat(action.payload.high)){
                  // //////// console.log('curfew at time 2...' + action.payload.date + '...PRice is...' + action.payload.high );
                  if(parseFloat(state[state.length-1].low) > parseFloat(action.payload.low)){
                      direction = "down";
                  }
                  else{
                       // action.payload.potentialTrend = "potential-uptrend"
                       state[state.length-1].potentialTrend = action.payload.potentialTrend;
                       state[state.length-1].aggregatePotentialSwings = action.payload.aggregatePotentialSwings;
                       state[state.length-1].purgedCandleDetail = action.payload;
                       state[state.length-1].future_potential_params = action.payload.future_potential_params;
                       return state;
                  }
                 
              }
  
              if(direction == 'up'){
                action.payload.y = parseFloat(action.payload.high);
              }
              else if(direction == 'down'){
                action.payload.y = parseFloat(action.payload.low);
              }
              else{            
                action.payload.y = parseFloat(action.payload.close);
              }
  
   
              ////////// console.log('Janata curfew time is...' + action.payload.date + '...action.payload.high is..' + action.payload.high );
              
              if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low)<= parseFloat(action.payload.low))){
                  state[state.length-1].potentialTrend = action.payload.potentialTrend;
                  state[state.length-1].aggregatePotentialSwings = action.payload.aggregatePotentialSwings;
                  state[state.length-1].purgedCandleDetail = action.payload;
                  state[state.length-1].future_potential_params = action.payload.future_potential_params;
                  return state ;
               
              } 
              else{      
                          
                  if(length> 4){
                        //if new one is 
  
                        //
                        let prevone = state[state.length-1].direction;
                        let beforeprevone = state[state.length-2].direction;
                        let swingHigh = state[state.length-1].swingHigh;
                        let swingLow = state[state.length-1].swingLow;
  
  
                      // //////// console.log('curfew at time...' + action.payload.date + '...price is...'+ action.payload.low);
                        
  
                       
                       
                       if(direction == prevone && beforeprevone != prevone && direction !="same"){
                         
                 
  
                           if(direction == "down"){
                              var weakPivot = false;
  
                            
                            
  
                              if((action.payload.downPivotNotFormed != true || action.payload.downPivotNotFormed != undefined) && weakPivot ==false){
                                  ////////// console.log(' up pivot date is... ' + state[state.length-2].date);
  
                                   //////////// console.log('up pivot value is....' +  parseFloat(state[state.length-2].high) );
  
                                    if(parseFloat(state[state.length-1].high) > parseFloat(state[state.length-2].high)){
                                      action.payload.lwpCandle = action.payload.close;
                                      action.payload.lwpCandleTime = action.payload.date;
                                      action.payload.pivot =   parseFloat(state[state.length-1].high); 
                                    }
                                    else{
                                      ////debugger;
                                      action.payload.lwpCandle = state[state.length-1].close;
                                      action.payload.lwpCandleTime = state[state.length-1].date;
                                      action.payload.pivot =   parseFloat(state[state.length-2].high); 
                                    }
                                    action.payload.doNotEnter = false;
  
                                    if(action.payload.high == 53.39){
                                       // //debugger;
                                    }
  
                                    ////// console.log('Rishi kapporr downtrend confirmed on...' +  action.payload.date + '.. current potential trend is...' + action.payload.potentialTrend)
  
                                    action.payload.trend = "downtrend";
  
                                    // Move is impulsive
                                    if(action.payload.close <= state[state.length-1].close ){
                                      action.payload.strength = "Impulsive";
                                    }
                                    else{
                                      action.payload.strength = "Corrective";
                                    }
                                                 
                                   
                                    //action.payload.dir = 'up'; 
                                    action.payload.currentPrice = parseFloat(action.payload.close) ;
                                    action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                    action.payload.x = state.length+1;
                                    action.payload.direction = direction;
                                    action.payload.pivotDate = state[state.length-2].date; 
                                    action.payload.upPivotNotFormed = false;
                                    var newstate = state.concat(action.payload);  
  
                                    //////////// console.log('Direction on date..' + action.payload.date + ' 222 ...is...' + action.payload.dir);              
                                    return newstate ;
  
                              } 
                              else{
  
                                   action.payload.upPivotNotFormed = true;
                                   var newstate = state.concat(action.payload);
                                   //////////// console.log('Direction on date..' + action.payload.date + ' 333 ...is...' + action.payload.dir);
                                   return newstate;
                                }
  
                           } 
                           else if(direction == "up"){
  
  
                                var goAhead = true;
                                var triggerGoAhead = true;
                                var triggerCloseGoAhead = true;
                                var prevPivotGoAhead = true;
                                var weakPivot = false;
  
                                var prevPivotType = state[state.length-3].tickType;
                                var pivotType = state[state.length-2].tickType;
                                var signalType= state[state.length-1].tickType;
                                var triggerType = action.payload.tickType;
  
                                var prevPivotBodyHigh = state[state.length-3].high;
                                var prevPivotBodyLow = state[state.length-3].low ;
  
                                var pivotBodyOpen = state[state.length-2].open;
                                var pivotBodyClose = state[state.length-2].close ;
  
                                var pivotBodyHigh = state[state.length-2].high;
                                var pivotBodyLow = state[state.length-2].low ;
  
                                var signalBodyOpen = state[state.length-1].open;
                                var signalBodyClose = state[state.length-1].close ;
  
                                var triggerBodyOpen = action.payload.open;
                                var triggerBodyClose = action.payload.close;
  
                                var triggerBodyHigh = action.payload.high;
                                var triggerBodyLow = action.payload.low ;
  
                                var lovelyDiff  = Math.abs(parseFloat(action.payload.low) - parseFloat(state[state.length-2].low));
                                var lovelyDiffRatio = (lovelyDiff/parseFloat(action.payload.low))*100;
  
  
                                  // if((action.payload.upPivotNotFormed != true || action.payload.upPivotNotFormed != undefined) &&  prevPivotGoAhead == true && triggerGoAhead == true && triggerCloseGoAhead == true && goAhead == true && weakPivot == false){
                                     if((action.payload.upPivotNotFormed != true || action.payload.upPivotNotFormed != undefined) ){
                            
                                                ////////// console.log('down pivot date is....' +  state[state.length-2].date);
  
                                                if(state[state.length-1].low  <= state[state.length-2].low ){
                                                  action.payload.lwpCandle = action.payload.close;
                                                  action.payload.lwpCandleTime = action.payload.date;
                                                  action.payload.pivot = state[state.length-1].low; 
                                                }
                                                else{
                                                  action.payload.lwpCandle = state[state.length-1].close;
                                                  action.payload.lwpCandleTime = state[state.length-1].date;
                                                  action.payload.pivot = state[state.length-2].low; 
                                                }
  
                                                action.payload.doNotEnter = false;
  
                                                //////////// console.log('down pivot date is....' +  action.payload.date );
                                                //////////// console.log('down pivot value is....' +  action.payload.pivot );
  
                                                // if(state[state.length-2].date == "Fri Jan 31 2020 18:30:00 GMT+0530 (India Standard Time)"){
                                                //     //debugger;
                                                // }
                                                // Move is impulsive
  
                                                if(action.payload.close >= state[state.length-1].close ){
                                                  //  //////// console.log('DIRECTION IS....' + direction);
                                                    action.payload.strength = "Impulsive";
                                                }
                                                else{
                                                   action.payload.strength = "Corrective";
                                                }
                                                 
                                            
                                                action.payload.trend = "upward";
  
                                                // //// console.log('Rishi kapporr uptrend confirmed on...' +  action.payload.date + '.. current potential trend is...' + action.payload.potentialTrend)
  
                                               
                                                //action.payload.dir = 'low'; 
                                                action.payload.currentPrice = parseFloat(action.payload.close) ;
                                                //new code data
                                                action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                                action.payload.x = state.length+1;
                                                action.payload.direction = direction;
  
                                                action.payload.downPivotNotFormed = false;
  
  
                                                action.payload.pivotDate = state[state.length-2].date; 
                                                var newstate = state.concat(action.payload);  
  
                                                //////////// console.log('Direction on date..' + action.payload.date + ' 444 ...is...' + action.payload.dir);              
                                                return newstate ;
                                  }
                                  else{
                                       action.payload.direction = direction;
                                       action.payload.downPivotNotFormed = true;
                                       var newstate = state.concat(action.payload);
  
                                       //////////// console.log('Direction on date..' + action.payload.date + ' 555 ...is...' + action.payload.dir);
                                       return newstate;
                                  }
                            }
  
                         }  
                         else if(direction =="same" && state[state.length-1].direction =="same"){
                          //condition to remove same candles from data                          
                            if( parseFloat( ) == parseFloat(state[state.length-1].close)){
                                       //same candle ////////// console.log  remove this state   
                              //////////// console.log('Direction on date..' + action.payload.date + ' 666 ...is...' + action.payload.dir);                          
                              state[state.length-1].potentialTrend = action.payload.potentialTrend;
                              state[state.length-1].aggregatePotentialSwings = action.payload.aggregatePotentialSwings;
                              state[state.length-1].purgedCandleDetail = action.payload;
                              state[state.length-1].future_potential_params = action.payload.future_potential_params;
                              return state;
                            }  
                         }
                         else if(direction != prevone && direction == beforeprevone){
                               
                                 if(direction == "up"){                                   
                                     if(parseFloat(state[state.length-2].high) >= parseFloat(action.payload.high)){   
                                         //////////// console.log('Direction on date..' + action.payload.date + ' 777 ...is...' + action.payload.dir);                                
                                         state[state.length-1].potentialTrend = action.payload.potentialTrend;
                                         state[state.length-1].aggregatePotentialSwings = action.payload.aggregatePotentialSwings;
                                         state[state.length-1].purgedCandleDetail = action.payload;
                                         state[state.length-1].future_potential_params = action.payload.future_potential_params;
                                         return state;
                                     }
                                     else if(parseFloat(state[state.length-2].high) < parseFloat(action.payload.high)){
                                        //time to remove the state here
                                         let statelength = state.length -1;
                                         let newstatedata =  state.filter(function(item ,index) {
                                                 return index !== statelength
                                            });
                                         action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                         action.payload.x = newstatedata.length+1;
                                         action.payload.direction = direction;
                                         action.payload.y = parseFloat(action.payload.high);
                                         action.payload.pivotDate = state[state.length-2].date;
                                         action.payload.upPivotNotFormed = false;
  
                                         //DAMN NEW//
                                         //action.payload.pivot = state[state.length-2].low; 
                                         //DAMN NEW//
  
                                         let newstate1 = newstatedata.concat(action.payload);    
  
                                         // if(action.payload.date == "30.01.2020 16:10:00.000 GMT+0530"){
                                         //  // //debugger;
                                         // } 
  
                                         //////////// console.log('Direction on date..' + action.payload.date + ' 888...is...' + action.payload.dir);
  
                                         return newstate1 ;
                                     }
                                 }
                                  else if(direction == "down"){ 
                                  //  ;
  
  
                                     if(parseFloat(state[state.length-2].low) <= parseFloat(action.payload.low)){
                                        //////////// console.log('Direction on date..' + action.payload.date + ' 999 ...is...' + action.payload.dir);
                                        state[state.length-1].potentialTrend = action.payload.potentialTrend;
                                        state[state.length-1].aggregatePotentialSwings = action.payload.aggregatePotentialSwings;
                                        state[state.length-1].purgedCandleDetail = action.payload;
                                        state[state.length-1].future_potential_params = action.payload.future_potential_params;
                                        return state;
                                     }
                                     else if(parseFloat(state[state.length-2].low) > parseFloat(action.payload.low)){
                                        //time to remove the state here
                                         let statelength = state.length -1;
                                         let newstatedata =  state.filter(function(item ,index) {
                                                 return index !== statelength
                                            });
                                         action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                         action.payload.x = newstatedata.length+1;
                                         action.payload.y = parseFloat(action.payload.low);
                                         action.payload.direction = direction;
                                         action.payload.downPivotNotFormed = false;
  
                                         action.payload.pivotDate = state[state.length-2].date;
  
                                         let newstate1 = newstatedata.concat(action.payload); 
  
                                         //////////// console.log('Direction on date..' + action.payload.date + ' 1000...is...' + action.payload.dir);               
                                         return newstate1 ;
                                      }
                                 }
                         } 
                  }
  
  
                  action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                  action.payload.x = state.length+1;
                  action.payload.direction = direction;
                  var newstate = state.concat(action.payload);   
  
                  if(action.payload.date === "30.01.2020 18:40:00.000 GMT+0530"){
                    // //debugger;
                  }  
  
                  //////////// console.log('Direction on date..' + action.payload.date + ' 1222 ...is...' + action.payload.dir);           
                  return newstate ;
              }
           }
  
  
           //plot x and y based on time 
           action.payload.trend = "";
           action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
           if(parseFloat(action.payload.open) >= parseFloat(action.payload.close)){
              action.payload.y = parseFloat(action.payload.high);
           }
           else{
              action.payload.y = parseFloat(action.payload.low);
           }
           action.payload.x = 1;
           var newstate = state.concat(action.payload);
  
           ////////// console.log('Direction on date..' + action.payload.date + ' 1333 ...is...' + action.payload.dir);
           return newstate ;
  
   
       
    }
  
    return state;
  }
  