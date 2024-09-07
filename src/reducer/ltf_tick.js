
export default function(state = [], action) {
    switch(action.type) {
      case 'REMOVE_TICK_DATA_LTF':
       return [];
      case 'ADD_DATA_SCOPE_LTF':
             
                 
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
  
              if(state[state.length-1].trend != undefined){
                 action.payload.trend = state[state.length-1].trend;
              } 
  
  
              if(state[state.length-1].potentialSwing){
                 action.payload.potentialSwing = state[state.length-1].potentialSwing;
              } 
  
              if(state[state.length-1].potentialTrend){
                action.payload.potentialTrend = state[state.length-1].potentialTrend;
              } 
  
              if(state[state.length-1].potentialTrendStarted){
                action.payload.potentialTrendStarted = state[state.length-1].potentialTrend;
              } 
  
              if(state[state.length-1].bewareOfPotentialSignalCandle){
                action.payload.bewareOfPotentialSignalCandle = state[state.length-1].bewareOfPotentialSignalCandle;
              } 
  
              if(state[state.length-1].potentialTriggerCandle){
                action.payload.potentialTriggerCandle = state[state.length-1].potentialTriggerCandle;
              } 
  
  
              if(state[state.length-1].aggregatePotentialSwings){
                action.payload.aggregatePotentialSwings = state[state.length-1].aggregatePotentialSwings;
              } 
  
              if(state[state.length-1].potentialSwingExtremeCombo){
                action.payload.potentialSwingExtremeCombo = state[state.length-1].potentialSwingExtremeCombo;
              } 
  
              if(state[state.length-1].potentialSwingExtreme){
                action.payload.potentialSwingExtreme = state[state.length-1].potentialSwingExtreme;
              } 
  
  
              if(state[state.length-1].upPivotsCombo){
                action.payload.upPivotsCombo = state[state.length-1].upPivotsCombo;
              } 
  
  
              if(state[state.length-1].lowPivotsCombo){
                action.payload.lowPivotsCombo = state[state.length-1].lowPivotsCombo;
              } 
  
  
              
              //// consolelog('Starting every day' + action.payload.date + '... potential trendis is...' +  action.payload.potentialTrend);
              //// consolelog('Starting every day' + +action.payload.date + '... potential trendis is...' +  action.payload.potentialTrend);
              //1555027200000
              if(+action.payload.date  == 1572271200000){
                 // debugger;
              }
  
              if(action.payload.potentialSwing ){
                 // If potential is down/up, wait for for it to trigger or be invalidated
                 let {high, low , potentialTrend, bewareOfPotentialSignalCandle } = action.payload;
                 let {direction : potentialDirection, candle} = action.payload.potentialSwing;
                 let {high : potentialHigh, low : potentialLow} = candle;
  
                 let prevSwingHigh = null;
                 let prevSwingLow = null;
                 if(action.payload.potentialSwing.prevCandle){
                    prevSwingHigh = action.payload.potentialSwing.prevCandle.high;
                    prevSwingLow = action.payload.potentialSwing.prevCandle.low;
                 }
                 
  
                
                 // First  if potential direction is down, 
                 //action.payload.bewareOfPotentialSignalCandle = null;
                if(+action.payload.date  == 1562803200000){
                   // debugger;
                }
  
                if(potentialDirection == "down"  ){
                        var isWeaklyClosed = false;
                        if(action.payload.lowPivotsCombo){
                          let nearbyPivotArray = action.payload.lowPivotsCombo.map(e => Object.values(e)[0]);
                          var breachedArray = nearbyPivotArray.filter(h => (h < action.payload.high && h > action.payload.low)); 
                          if(breachedArray.length >= 1){
                            if(action.payload.close > breachedArray[0]){
                              isWeaklyClosed = true;
                            }
                          }
                        }
  
                        
                        if(low < potentialLow && high < potentialHigh && !bewareOfPotentialSignalCandle && potentialTrend !== "potential-downswing" ){
                            ////// consolelog('Triggered  downtrend started...on...' + action.payload.date);
                            action.payload.potentialTrend = "potential-downswing";
                            action.payload.potentialTrendStarted = true;
                            action.payload.potentialTriggerCandle = action.payload;
                            action.payload.potentialSwingExtreme = {dir : 'down' ,high: potentialHigh , low: prevSwingLow};
                     
                            
                        }
                        if(low < potentialLow && high < potentialHigh && bewareOfPotentialSignalCandle && potentialTrend !== "potential-downswing"){
                          let {low : bewareLow , high: bewareHigh} = bewareOfPotentialSignalCandle.candle;
                          if(low <  bewareLow){
                              ////// consolelog('Beware condition started..Triggered  downtrend started...on...' + action.payload.date);
                              action.payload.potentialTrend = "potential-downswing";
                              action.payload.potentialTrendStarted = true;
                              action.payload.potentialTriggerCandle = action.payload;
                              action.payload.potentialSwingExtreme = {dir : 'down' ,high: potentialHigh , low: prevSwingLow};
                              // action.payload.potentialSwingExtreme = potentialLow;
                          }
  
                          if(bewareOfPotentialSignalCandle.candle.low < low){
                            ////// consolelog('New condition.. Not tested enough.. yet ...' + action.payload.date);
                            action.payload.potentialTrend = "potential-downswing";
                            action.payload.potentialTrendStarted = true;
                            action.payload.potentialTriggerCandle = action.payload;
                            action.payload.potentialSwingExtreme = potentialHigh;
                          }
                        }
                        else if(low < potentialLow && high > potentialHigh){
                          ////// consolelog('Potential downtrend violated on ...date...' + action.payload.date);
                          action.payload.potentialSwing = null;
                          action.payload.potentialTrend = null;
                          action.payload.potentialTrendStarted = false;
                          action.payload.potentialTriggerCandle = null;
                          action.payload.bewareOfPotentialSignalCandle = null;
                          action.payload.potentialSwingExtreme = null;
                        }
                        else if( high > potentialHigh){
                          ////// consolelog('Potential downtrend violated on ...date...' + action.payload.date);
                          action.payload.potentialSwing = null;
                          action.payload.potentialTrend = null;
                          action.payload.potentialTrendStarted = false;
                          action.payload.potentialTriggerCandle = null;
                          action.payload.bewareOfPotentialSignalCandle = null;
                          action.payload.potentialSwingExtreme = null;
                        }
  
                                             
                    if(isWeaklyClosed){
                        // //// consolelog('WEAKLY CLOSED. DOWN SIDE....Potential uptrend violated on ...date...' + action.payload.date);
                        action.payload.potentialSwing = null;
                        action.payload.potentialTrendStarted = false;
                        action.payload.potentialTriggerCandle = null;
                        action.payload.bewareOfPotentialSignalCandle = null;
                        action.payload.potentialSwingExtreme = null;
                        action.payload.potentialTrend = "do-not-enter";
                    }
  
   
                 }
  
              
                if(potentialDirection == "up" ){
                  var isWeaklyClosed = false;
  
                  if(action.payload.upPivotsCombo){
                    let nearbyPivotArray = action.payload.upPivotsCombo.map(e => Object.values(e)[0]);
                    var breachedArray = nearbyPivotArray.filter(h => (h < action.payload.high && h > action.payload.low));
                    if(breachedArray.length >= 1){
                      if(action.payload.close < breachedArray[0]){
                        isWeaklyClosed = true;
                      }
                    }
                  }
                  
  
  
                  if(high > potentialHigh && low > potentialLow  && !bewareOfPotentialSignalCandle && potentialTrend !== "potential-uptrend" ){
                    ////// consolelog('Triggered  uptrend started...on...' + action.payload.date);
                    action.payload.potentialTrend = "potential-uptrend";
                    action.payload.potentialTrendStarted = true;
                    action.payload.potentialTriggerCandle = action.payload;
                    action.payload.potentialSwingExtreme = {dir : 'up' , high: prevSwingHigh , low: potentialLow};
                  }
                  if(high > potentialHigh && low > potentialLow  && bewareOfPotentialSignalCandle && potentialTrend !== "potential-uptrend" ){
                    let {high : bewareHigh, low: bewareLow} = bewareOfPotentialSignalCandle.candle;
                    if(high > bewareHigh){
                      ////// consolelog('Beware condition started..Triggered  UPTREND started...on...' + action.payload.date);
                      action.payload.potentialTrend = "potential-uptrend";
                      action.payload.potentialTrendStarted = true;
                      action.payload.potentialTriggerCandle = action.payload;
                      action.payload.potentialSwingExtreme = {dir : 'up' , high: prevSwingHigh , low: potentialLow};
                    }
                  }
                  else if(high > potentialLow && low < potentialLow){
                    ////// consolelog('Potential uptrend violated on ...date...' + action.payload.date);
                    action.payload.potentialSwing = null;
                    action.payload.potentialTrend = null;
                    action.payload.potentialTrendStarted = false;
                    action.payload.potentialTriggerCandle = null;
                    action.payload.bewareOfPotentialSignalCandle = null;
                    action.payload.potentialSwingExtreme = null;
                  }
                  else if( low <  potentialLow){
                    ////// consolelog('Potential uptrend violated on ...date...' + action.payload.date);
                    action.payload.potentialSwing = null;
                    action.payload.potentialTrend = null;
                    action.payload.potentialTrendStarted = false;
                    action.payload.potentialTriggerCandle = null;
                    action.payload.bewareOfPotentialSignalCandle = null;
                    action.payload.potentialSwingExtreme = null;
                  }
                  else{
                       
                    if(isWeaklyClosed){
                      // // console.log('WEAKLY CLOSED....UP SIDE .Potential uptrend violated on ...date...' + action.payload.date);
                      action.payload.potentialSwing = null;
                      action.payload.potentialTrendStarted = false;
                      action.payload.potentialTriggerCandle = null;
                      action.payload.bewareOfPotentialSignalCandle = null;
                      action.payload.potentialSwingExtreme = null;
                      action.payload.potentialTrend = "do-not-enter";
                    }
                   
                    
                    if(+action.payload.date  == 1572267600000){
                      // debugger;
                    }
                  }
                }
  
              }
  
  
             // Two condition.
             // First when Green candle and potentialtrend is ""potential-uptrend" and vice versa
             // Second Check when potential trend is "potential-uptrend" and red candle is encountered
  
  
              let prevSwingCandle = null;
              if(state[state.length-1].potentialSwing){
                prevSwingCandle =  state[state.length-1].potentialSwing.candle;
              }
  
            if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high)) && (parseFloat(state[state.length-1].low ) <= parseFloat(action.payload.low))){
                ////// consolelog('Overlapping candle .. stay away for Potential candle at...' + action.payload.date);
  
                if(state[state.length-1].potentialSwing && state[state.length-2].potentialSwing ){
                  ////// console('Final corona cleaning.. ovelapping candle color is..'+ state[state.length-1].tickType +'.. current canle color is..'+ action.payload.tickType  + '..current potential trend is..' +  state[state.length-1].potentialSwing.direction + '....previous potential trend is..' + state[state.length-2].potentialSwing.direction + '.. date is..'+ action.payload.date);
                
                  var currentPotentialDirection = state[state.length-1].potentialSwing.direction;
                  var previousPotentialDirection = state[state.length-2].potentialSwing.direction;
                  var currentTicktype = action.payload.tickType;
  
                  // Overlapping candle finding potential new direction for long.
                  if(currentPotentialDirection == previousPotentialDirection && currentPotentialDirection == "down" && currentTicktype == "green" ){
                      ////// console('Rain ..UP .. overlapping canlde on date...' + action.payload.date);
                      action.payload.specialOverlappingCondition = true;
  
                      if(action.payload.potentialSwing){
                        let {direction : potentialDir} = action.payload.potentialSwing;
                        if(potentialDir !== "up"){
                          
                          action.payload.potentialSwing = { direction: 'up' , candle : action.payload , prevCandle: prevSwingCandle};
                          // debugger;
  
                          ////// consolelog('Potential uptrend 1 at...' + action.payload.date + '...direction is...' +  "up" + '..close is..' + action.payload.close );
                        }
                        else{
                          //// consolelog('Not looking for anything on. 3..' + action.payload.date);
                        }
                      }
                      else{
                          action.payload.potentialSwing = { direction: 'up' , candle : action.payload, prevCandle: prevSwingCandle };
                          ////// consolelog('Potential uptrend at 2...' + action.payload.date + '...direction is...' +  "up" + '..close is..' + action.payload.close );
                      }
                  }
  
                  // Overlapping candle finding potential new direction for short.
                  if(currentPotentialDirection == previousPotentialDirection && currentPotentialDirection == "up" && currentTicktype == "red"){
                    ////// console('Rain ...down . overlapping canlde on date...' + action.payload.date);
                    action.payload.specialOverlappingCondition = true;
                    
                    if(action.payload.potentialSwing){
                      ////// console('date is...' + action.payload.date + '...potential swing direction is...' + action.payload.potentialSwing.direction );
                      let {direction : potentialDir} = action.payload.potentialSwing;
                      if(potentialDir !== "down"){
                        //////// console('Looking for potential downtrend at..' + action.payload.date);
                        action.payload.potentialSwing = { direction: 'down' , candle : action.payload, prevCandle: prevSwingCandle};
                        ////// consolelog('Potential downtrend  at...' + action.payload.date +'.. direction is...'+ "down");
                      }
                      else{
                        // console('Not looking for anything on.4 ..' + action.payload.date);
                      }
                    }
                    else{
                      ////// console('date is...' + action.payload.date + '...potential swing is...' + action.payload.potentialSwing );
                      action.payload.potentialSwing = { direction: 'down' , candle : action.payload, prevCandle: prevSwingCandle};
                      ////// consolelog('Potential downtrend 3 at...' + action.payload.date +'.. direction is...'+ "down");
                    }
  
                  }
                
                }
            }
            else{
  
              if(action.payload.tickType == "red" ){
  
                  var bewareMode = false;
  
                  if(action.payload.potentialTriggerCandle){
                    if(action.payload.date == action.payload.potentialTriggerCandle.date){
                      ////// consolelog('Beware this is potential trigger candle for short ..date is..' + action.payload.date);
                      ////// consolelog('Caution as  the signal canlde of short is...' + state[state.length-1].potentialSwing.candle.date);
                      bewareMode = true;
                    }
                    else{
                      bewareMode = false;
                    }
                  }
  
                  // potential swing -> undefined ||  potential swin direction == up g
                  
                  if(action.payload.potentialSwing){
                      ////// consolelog('date is...' + action.payload.date + '...potential swing direction is...' + action.payload.potentialSwing.direction );
                      let {direction : potentialDir} = action.payload.potentialSwing;
                      if(potentialDir !== "down"){
                        //////// console('Looking for potential downtrend at..' + action.payload.date);
                        action.payload.potentialSwing = { direction: 'down' , candle : action.payload, prevCandle: prevSwingCandle};
                        if(bewareMode){
                          action.payload.bewareOfPotentialSignalCandle = state[state.length-1].potentialSwing;
                        }
                        else{
                          action.payload.bewareOfPotentialSignalCandle = null;
                        }
                        ////// consolelog('Potential downtrend 1 at...' + action.payload.date +'.. direction is...'+ "down");
                      }
                      else{
                        //// consolelog('Not looking for anything 1 on...' + action.payload.date);
                      }
                  }
                  else{
                      ////// console('date is...' + action.payload.date + '...potential swing is...' + action.payload.potentialSwing );
                      action.payload.potentialSwing = { direction: 'down' , candle : action.payload, prevCandle: prevSwingCandle};
                      if(bewareMode){
                        action.payload.bewareOfPotentialSignalCandle = state[state.length-1].potentialSwing;
                      }
                      else{
                        action.payload.bewareOfPotentialSignalCandle = null;
                      }
                      ////// consolelog('Potential downtrend 2 at...' + action.payload.date +'.. direction is...'+ "down");
                  }
                
              }
  
             // if(action.payload.trend == "downtrend" && action.payload.tickType == "green" && !action.payload.potentialSwing){
              if( action.payload.tickType == "green"){
  
                  var bewareMode = false;
                  if(action.payload.potentialTriggerCandle){
                    if(action.payload.date == action.payload.potentialTriggerCandle.date){
                      ////// console('Beware this is potential trigger candle for long ..date is..' + action.payload.date);
                      ////// console('Caution as the signal canlde for short...' + state[state.length-1].potentialSwing.candle.date);
                      bewareMode = true;
                    }
                    else{
                      bewareMode = false;
                    }
                  }
  
                  if(action.payload.potentialSwing){
                    let {direction : potentialDir} = action.payload.potentialSwing;
                    if(potentialDir !== "up"){
                      action.payload.potentialSwing = { direction: 'up' , candle : action.payload , prevCandle: prevSwingCandle};
                      if(bewareMode){
                        action.payload.bewareOfPotentialSignalCandle = state[state.length-1].potentialSwing;
                      }
                      else{
                        action.payload.bewareOfPotentialSignalCandle = null;
                      }
                      ////// consolelog('Potential uptrend 1 at...' + action.payload.date + '...direction is...' +  "up" + '..close is..' + action.payload.close );
  
                    }
                    else{
                      //// consolelog('Not looking for anything on 2 ...' + action.payload.date);
                    }
                  }
                  else{
                      action.payload.potentialSwing = { direction: 'up' , candle : action.payload, prevCandle: prevSwingCandle };
                      if(bewareMode){
                        action.payload.bewareOfPotentialSignalCandle = state[state.length-1].potentialSwing;
                      }
                      else{
                        action.payload.bewareOfPotentialSignalCandle = null;
                      }
                      ////// consolelog('Potential uptrend at 2...' + action.payload.date + '...direction is...' +  "up" + '..close is..' + action.payload.close );
                  }
  
                 
              }
                
            }
            
  
  
              if(state[state.length-1].high < parseFloat(action.payload.high) ){
                  //up direction
                   if(action.payload.tickType == "green" || action.payload.tickType == "doji"){
                            if(parseFloat(action.payload.low) < parseFloat(state[state.length-1].low) &&  state[state.length-1].tickType == "red"){
                                  direction ='down';
                            }
                            else{
                                 //////// console('Modi wala Curfeww at time...' + action.payload.date);
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
                                                 //////// console('Curfeww at time...' + action.payload.date);
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
                    // debugger;
                  }  
              }
              else if(parseFloat(state[state.length-1].high) > parseFloat(action.payload.high)){
                    //down direction
                     // ////// console('curfew at time. 1..' + action.payload.date);
                     direction ='down';
              }
              else if(parseFloat(state[state.length-1].high) == parseFloat(action.payload.high)){
                  // ////// console('curfew at time 2...' + action.payload.date + '...PRice is...' + action.payload.high );
                  if(parseFloat(state[state.length-1].low) > parseFloat(action.payload.low)){
                              direction = "down";
                  }
                  else{
                       ////// console('Hello Bonu');
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
  
   
             // ////// console('Janata curfew time is...' + action.payload.date + '...action.payload.high is..' + action.payload.high + 'potential swing is...' + action.payload.potentialSwing.direction );
              
              if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low ) <= parseFloat(action.payload.low))){
                  ////// console('Death zone...' + action.payload.high );
  
                  if(state[state.length-1].potentialSwing && state[state.length-2].potentialSwing ){
                    var currentPotentialDirection = state[state.length-1].potentialSwing.direction;
                    var previousPotentialDirection = state[state.length-2].potentialSwing.direction;
                    var currentTicktype = action.payload.tickType;
  
                    if(currentPotentialDirection == previousPotentialDirection && currentPotentialDirection == "down" && currentTicktype == "green" ){
                        ////// console('Extra normal death zone at...' + action.payload.date);
                        var comboState = [...state];
                        var last = comboState.pop();
                        last.potentialSwing = action.payload.potentialSwing;
                        last.potentialTrend = action.payload.potentialTrend;
                        last.potentialTrendStarted = action.payload.potentialTrendStarted;
                        last.bewareOfPotentialSignalCandle =  null;
                        last.potentialTriggerCandle =  action.payload.potentialTriggerCandle;
                        last.specialOverlappingCondition = true;
                        last.potentialSwingExtreme = action.payload.potentialSwingExtreme;
  
                        var candleDate = action.payload.date;
                        var potentialStrength = action.payload.potentialTrend;
                        var potentialSwingExtreme1 = action.payload.potentialSwingExtreme;
                        ////// console('HELL3');
                        ////// console('Last candle date is...' + state[state.length-1].date + '... data aggregarting for month..' + candleDate );
  
                        if(!state[state.length-1].aggregatePotentialSwings ){
                          last.aggregatePotentialSwings = [{ [candleDate]: potentialStrength }];
                        }
                        else{
                          last.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: potentialStrength }]; 
                        }
  
                        if(!state[state.length-1].potentialSwingExtremeCombo ){
                          last.potentialSwingExtremeCombo = [{ [candleDate]: potentialSwingExtreme1}];
                        }
                        else{
                          last.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: potentialSwingExtreme1 }]; 
                        }
    
                        var newCombo  = [...comboState , last];
                        return newCombo;
                    }
  
                    if(currentPotentialDirection == previousPotentialDirection && currentPotentialDirection == "up" && currentTicktype == "red"){
                      ////// console('Extra normal death zone at...' + action.payload.date);
                      var comboState = [...state];
                      var last = comboState.pop();
                      last.potentialSwing = action.payload.potentialSwing;
                      last.potentialTrend = action.payload.potentialTrend;
                      last.potentialTrendStarted = action.payload.potentialTrendStarted;
                      last.bewareOfPotentialSignalCandle =  null;
                      last.potentialTriggerCandle =  action.payload.potentialTriggerCandle;
                      last.specialOverlappingCondition = true;
                      last.potentialSwingExtreme = action.payload.potentialSwingExtreme;
  
                      var candleDate = action.payload.date;
                      var potentialStrength = action.payload.potentialTrend;
                      var potentialSwingExtreme1 = action.payload.potentialSwingExtreme;
                      ////// console('HELL2');
                      ////// console('Last candle date is...' + state[state.length-1].date + '... data aggregarting for month..' + candleDate );
                      // last.aggregatePotentialSwings = [...state.aggregatePotentialSwings, { candleDate: potentialStrength }]; 
  
                      if(!state[state.length-1].aggregatePotentialSwings ){
                        last.aggregatePotentialSwings = [{ [candleDate]: potentialStrength }];
                      }
                      else{
                        last.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: potentialStrength }]; 
                      }
  
                      if(!state[state.length-1].potentialSwingExtremeCombo ){
                        last.potentialSwingExtremeCombo = [{ [candleDate]: potentialSwingExtreme1 }];
                      }
                      else{
                        last.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: potentialSwingExtreme1 }]; 
                      }
  
                      var newCombo  = [...comboState , last];
                      return newCombo;
                    }
                  }
                  
  
                  // return state ;
                  ////// console('Normal death zone at...' + action.payload.date + 'is special overlapping available...' + state[state.length-1].specialOverlappingCondition);
                  if(state[state.length-1].specialOverlappingCondition){
                      var comboState = [...state];
                      var last = comboState.pop();
                      last.potentialSwing = action.payload.potentialSwing;
                      last.potentialTrend = action.payload.potentialTrend;
                      last.potentialTrendStarted = action.payload.potentialTrendStarted;
                      last.bewareOfPotentialSignalCandle =  null;
                      last.potentialTriggerCandle =  action.payload.potentialTriggerCandle;
                      last.specialOverlappingCondition = true;
                      last.potentialSwingExtreme = action.payload.potentialSwingExtreme;
  
                      var candleDate1 = action.payload.date;
                      var potentialStrength1 = action.payload.potentialTrend;
                      var potentialSwingExtreme1 = action.payload.potentialSwingExtreme;
                     
                      // last.aggregatePotentialSwings = [...state.aggregatePotentialSwings, { candleDate: potentialStrength }]; 
  
                      ////// console('Last candle date is...' + state[state.length-1].date + '... data aggregarting for month..' + candleDate1 );
                      if(!state[state.length-1].aggregatePotentialSwings ){
                        last.aggregatePotentialSwings = [{ [candleDate1]: potentialStrength1 }];
                      }
                      else{
                        last.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: potentialStrength1 }]; 
                      }
  
                      if(!state[state.length-1].potentialSwingExtremeCombo ){
                        last.potentialSwingExtremeCombo = [{ [candleDate1]: potentialSwingExtreme1 }];
                      }
                      else{
                        last.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: potentialSwingExtreme1 }]; 
                      }
  
  
                      var newCombo  = [...comboState , last];
                      return newCombo;
                  }
  
  
  
  
                  var comboState = [...state];
                  var last = comboState.pop();
                  last.potentialSwing = state[state.length-1].potentialSwing;
                  last.potentialTrend = state[state.length-1].potentialTrend;
                  last.potentialTrendStarted = state[state.length-1].potentialTrendStarted;
                  last.bewareOfPotentialSignalCandle =  null ;
                  last.potentialTriggerCandle =  state[state.length-1].potentialTriggerCandle;
                  last.potentialSwingExtreme = action.payload.potentialSwingExtreme;
  
                  var dailyCandleDate = state[state.length-1].date;
                  var potentialCandleTrend = state[state.length-1].potentialTrend;
                  var potentialSwingExtreme1 = action.payload.potentialSwingExtreme;
                  ////// console('HELL4');
                  ////// console('Last candle date is...' + state[state.length-1].date + '... data aggregarting for month..' + dailyCandleDate );
  
                  if(!state[state.length-1].aggregatePotentialSwings ){
                    last.aggregatePotentialSwings = [{ [dailyCandleDate]: potentialCandleTrend }]
                  }
                  else{
                    last.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: potentialCandleTrend }]; 
                  }
  
                  if(!state[state.length-1].potentialSwingExtremeCombo ){
                    last.potentialSwingExtremeCombo = [{ [dailyCandleDate]: potentialSwingExtreme1 }]
                  }
                  else{
                    last.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: potentialSwingExtreme1 }]; 
                  }
  
                  var newCombo  = [...comboState , last];
                  return newCombo;
               
              } 
              else{      
                          
                  if(length> 4){
                        //if new one is 
  
                        //
                        let prevone = state[state.length-1].direction;
                        let beforeprevone = state[state.length-2].direction;
                        let swingHigh = state[state.length-1].swingHigh;
                        let swingLow = state[state.length-1].swingLow;
  
  
                      // ////// console('curfew at time...' + action.payload.date + '...price is...'+ action.payload.low + '.. trend is...' + action.payload.trend);
                        
  
                       
                       
                        if(direction == prevone && beforeprevone != prevone && direction !="same"){
                         
                 
  
                           if(direction == "down"){
                              var weakPivot = false;
  
                              if((action.payload.downPivotNotFormed != true || action.payload.downPivotNotFormed != undefined) && weakPivot ==false){
                                  //////// console(' up pivot date is... ' + state[state.length-2].date);
  
                                   ////////// console('up pivot value is....' +  parseFloat(state[state.length-2].high) );
                                   ////// console('Sudama jee...' + action.payload.date);
                                    if(parseFloat(state[state.length-1].high) > parseFloat(state[state.length-2].high)){
                                      action.payload.lwpCandle = action.payload.close;
                                      action.payload.lwpCandleTime = action.payload.date;
                                      action.payload.pivot =   parseFloat(state[state.length-1].high); 
                                      action.payload.upPivots  =  {[state[state.length-2].date ]:  parseFloat(state[state.length-1].high)} ;
                                    }
                                    else{
                                      //debugger;
                                      action.payload.lwpCandle = state[state.length-1].close;
                                      action.payload.lwpCandleTime = state[state.length-1].date;
                                      action.payload.pivot =   parseFloat(state[state.length-2].high); 
                                      action.payload.upPivots  =  {[state[state.length-2].date ]:  parseFloat(state[state.length-2].high)} ;
                                      //action.payload.potentialSwing = null;
                                    }
  
                                    
                                    if(!state[state.length-1].upPivotsCombo ){
                                      action.payload.upPivotsCombo = [action.payload.upPivots ]
                                    }
                                    else{
                                      action.payload.upPivotsCombo = [...state[state.length-1].upPivotsCombo,  action.payload.upPivots]; 
                                    }
  
                                    if(action.payload.high == 53.39){
                                       // debugger;
                                    }
  
                                    action.payload.trend = "downtrend";
  
                                    // Move is impulsive
                                    if(action.payload.close <= state[state.length-1].close ){
                                      action.payload.strength = "Impulsive";
                                    }
                                    else{
                                      action.payload.strength = "Corrective";
                                    }
                                    
                                    ////// console('Bikram...');
                                    // action.payload.potentialSwing = null;
                                    // action.payload.potentialTrend = null;
                                    // action.payload.potentialTrendStarted = false;
                                    //action.payload.dir = 'up'; 
                                    action.payload.currentPrice = parseFloat(action.payload.close) ;
                                    action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                    action.payload.x = state.length+1;
                                    action.payload.direction = direction;
                                    action.payload.pivotDate = state[state.length-2].date; 
                                    action.payload.upPivotNotFormed = false;
                                    var newstate = state.concat(action.payload);  
  
                                    if(!state[state.length-1].aggregatePotentialSwings ){
                                      action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                    }
                                    else{
                                      action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                    }
  
                                    if(!state[state.length-1].potentialSwingExtremeCombo ){
                                      action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                    }
                                    else{
                                      action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                    }
  
                                    ////////// console('Direction on date..' + action.payload.date + ' 222 ...is...' + action.payload.dir);              
                                    return newstate ;
  
                              } 
                              else{
                                    ////// console('Hanuman jee...' + action.payload.date);
                                    action.payload.upPivotNotFormed = true;
                                   
                                    if(!state[state.length-1].aggregatePotentialSwings ){
                                      action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                    }
                                    else{
                                      action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                    }
  
                                    if(!state[state.length-1].potentialSwingExtremeCombo ){
                                      action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                    }
                                    else{
                                      action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                    }
  
                                    var newstate = state.concat(action.payload);
                                   ////////// console('Direction on date..' + action.payload.date + ' 333 ...is...' + action.payload.dir);
                                    return newstate;
                              }
                             // cons
  
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
                            
                                                //////// console('down pivot date is....' +  state[state.length-2].date);
                                                // ////// console('Hare rama zone ...'+ action.payload.date);
                                                if(state[state.length-1].low  <= state[state.length-2].low ){
                                                  action.payload.lwpCandle = action.payload.close;
                                                  action.payload.lwpCandleTime = action.payload.date;
                                                  action.payload.pivot = state[state.length-1].low; 
                                                  action.payload.lowPivots  =  {[state[state.length-2].date]:  parseFloat(state[state.length-1].low)} ;
                                                }
                                                else{
                                                  action.payload.lwpCandle = state[state.length-1].close;
                                                  action.payload.lwpCandleTime = state[state.length-1].date;
                                                  action.payload.pivot = state[state.length-2].low; 
                                                  action.payload.lowPivots  =  {[state[state.length-2].date ]:  parseFloat(state[state.length-2].low)} ;
                                                }
  
                                                if(!state[state.length-1].lowPivotsCombo ){
                                                  action.payload.lowPivotsCombo = [action.payload.lowPivots ]
                                                }
                                                else{
                                                  action.payload.lowPivotsCombo = [...state[state.length-1].lowPivotsCombo, action.payload.lowPivots ]; 
                                                }
              
  
                                                
  
                                                ////////// console('down pivot date is....' +  action.payload.date );
                                                ////////// console('down pivot value is....' +  action.payload.pivot );
  
                                                // if(state[state.length-2].date == "Fri Jan 31 2020 18:30:00 GMT+0530 (India Standard Time)"){
                                                //     debugger;
                                                // }
                                                // Move is impulsive
  
                                                if(action.payload.close >= state[state.length-1].close ){
                                                  //  ////// console('DIRECTION IS....' + direction);
                                                    action.payload.strength = "Impulsive";
                                                }
                                                else{
                                                   action.payload.strength = "Corrective";
                                                }
                                                
                                                ////// console('Betaal...');
                                                // action.payload.potentialSwing = null;
                                                // action.payload.potentialTrend = null;
                                                // action.payload.potentialTrendStarted = false;
  
                                                action.payload.trend = "upward";
                                               
                                                //action.payload.dir = 'low'; 
                                                action.payload.currentPrice = parseFloat(action.payload.close) ;
                                                //new code data
                                                action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                                action.payload.x = state.length+1;
                                                action.payload.direction = direction;
  
                                                action.payload.downPivotNotFormed = false;
  
  
                                                action.payload.pivotDate = state[state.length-2].date; 
                                                if(!state[state.length-1].aggregatePotentialSwings ){
                                                  action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                                }
                                                else{
                                                  action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                                }
  
                                                if(!state[state.length-1].potentialSwingExtremeCombo ){
                                                  action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                                }
                                                else{
                                                  action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                                }
  
                                                var newstate = state.concat(action.payload);
                                                ////////// console('Direction on date..' + action.payload.date + ' 444 ...is...' + action.payload.dir);              
                                                return newstate ;
                                  }
                                  else{
                                       action.payload.direction = direction;
                                       action.payload.downPivotNotFormed = true;
                                       if(!state[state.length-1].aggregatePotentialSwings ){
                                         action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                       }
                                       else{
                                         action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                       }
  
                                       if(!state[state.length-1].potentialSwingExtremeCombo ){
                                        action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                      }
                                      else{
                                        action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                      }
  
                                       var newstate = state.concat(action.payload);
  
                                       ////////// console('Direction on date..' + action.payload.date + ' 555 ...is...' + action.payload.dir);
                                       return newstate;
                                  }
                            }
  
                         }  
                         else if(direction =="same" && state[state.length-1].direction =="same"){
                          //condition to remove same candles from data                          
                            if( parseFloat( ) == parseFloat(state[state.length-1].close)){
                                       //same candle //////// console  remove this state   
                              ////////// console('Direction on date..' + action.payload.date + ' 666 ...is...' + action.payload.dir);                          
                              ////// console('Hello Lovely');
                              return state;
                            }  
                         }
                         else if(direction != prevone && direction == beforeprevone){
                               
                                 if(direction == "up"){                                   
                                     if(parseFloat(state[state.length-2].high) >= parseFloat(action.payload.high)){   
                                         ////////// console('Direction on date..' + action.payload.date + ' 777 ...is...' + action.payload.dir);                                
                                         ////// console('Hello Sonali');
                                         var comboState = [...state];
                                         var last = comboState.pop();
                                         last.potentialSwing = action.payload.potentialSwing;
                                         last.potentialTrend = action.payload.potentialTrend;
                                         last.potentialTrendStarted = false;
  
                                          if(!state[state.length-1].aggregatePotentialSwings ){
                                            last.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                          }
                                          else{
                                            last.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                          }
  
                                          if(!state[state.length-1].potentialSwingExtremeCombo ){
                                            last.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                          }
                                          else{
                                            last.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                          }
  
                                         var newCombo  = [...comboState , last];
                                         return newCombo;
                                     }
                                     else if(parseFloat(state[state.length-2].high) < parseFloat(action.payload.high)){
                                        //time to remove the state here
                                         //////// console('HELLOOOOOO.. REMOVING STATE HERE 2...' + state[state.length-1].date );
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
  
                                        // action.payload.aggregatePotentialSwings = state[state.length-1].aggregatePotentialSwings;
  
                                         //DAMN NEW//
                                         //action.payload.pivot = state[state.length-2].low; 
                                         //DAMN NEW//
  
                                          if(!state[state.length-1].aggregatePotentialSwings ){
                                            action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                          }
                                          else{
                                            action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                          }
  
                                          if(!state[state.length-1].potentialSwingExtremeCombo ){
                                            action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                          }
                                          else{
                                            action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                          }
  
                                         let newstate1 = newstatedata.concat(action.payload);    
  
                                         // if(action.payload.date == "30.01.2020 16:10:00.000 GMT+0530"){
                                         //  // debugger;
                                         // } 
  
                                         ////////// console('Direction on date..' + action.payload.date + ' 888...is...' + action.payload.dir);
  
                                         return newstate1 ;
                                     }
                                 }
                                  else if(direction == "down"){ 
                                  //  ;
  
  
                                     if(parseFloat(state[state.length-2].low) <= parseFloat(action.payload.low)){
                                        ////////// console('Direction on date..' + action.payload.date + ' 999 ...is...' + action.payload.dir);
                                        ////// console('Hello Ashutosh');
                                        var comboState = [...state];
                                        var last = comboState.pop();
                                        last.potentialSwing = action.payload.potentialSwing;
                                        last.potentialTrend = action.payload.potentialTrend;
                                        last.potentialTrendStarted = false;
  
                                        if(!state[state.length-1].aggregatePotentialSwings ){
                                          last.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                        }
                                        else{
                                          last.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                        }
  
                                        if(!state[state.length-1].potentialSwingExtremeCombo ){
                                          last.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                        }
                                        else{
                                          last.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                        }
  
                                        var newCombo  = [...comboState , last];
                                        return newCombo;
                                     }
                                     else if(parseFloat(state[state.length-2].low) > parseFloat(action.payload.low)){
                                        //time to remove the state here
                                         // ////// console('HELLOOOOOO.. REMOVING STATE HERE 1...' +  state[state.length-1].date );
                                         // ////// console('HELLOOOOOO.. REMOVING STATE HERE 1...' +  +state[state.length-1].date );
                                         
                                         var obj = [...state];
                                         const aggregateCandle = obj[obj.length-1].aggregatePotentialSwings;
                                        //  var obj = JSON.parse(JSON.stringify(state));
                                        //  var aggregateCandle = obj[obj.length-1].aggregatePotentialSwings;
  
                                         var statelength = state.length -1;
                                         var newstatedata =  state.filter(function(item ,index) {
                                                 return index !== statelength
                                            });
                                         action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                         action.payload.x = newstatedata.length+1;
                                         action.payload.y = parseFloat(action.payload.low);
                                         action.payload.direction = direction;
                                         action.payload.downPivotNotFormed = false;
  
  
                                         // action.payload.aggregatePotentialSwings = state[state.length-1].aggregatePotentialSwings;
                                         // action.payload.aggregatePotentialSwings = aggregateCandle;
                                         // action.payload.aggregatePotentialSwings = "Ashutosh";
  
  
                                        if(!state[state.length-1].aggregatePotentialSwings ){
                                          action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                                        }
                                        else{
                                          action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                                        }  
                                        
                                        
                                        if(!state[state.length-1].potentialSwingExtremeCombo ){
                                          action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                                        }
                                        else{
                                          action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                                        }      
  
  
                                         action.payload.pivotDate = state[state.length-2].date;
  
                                         var newstate1 = newstatedata.concat(action.payload); 
  
                                        if(+state[state.length-1].date == 1567468800000){
                                          // debugger;
                                        }
  
                                         ////////// console('Direction on date..' + action.payload.date + ' 1000...is...' + action.payload.dir);               
                                         return newstate1 ;
                                      }
                                 }
                         } 
                  }
  
  
                  action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                  action.payload.x = state.length+1;
                  action.payload.direction = direction;
   
  
                  if(!state[state.length-1].aggregatePotentialSwings ){
                    action.payload.aggregatePotentialSwings = [{ [action.payload.date]: action.payload.potentialTrend }]
                  }
                  else{
                    action.payload.aggregatePotentialSwings = [...state[state.length-1].aggregatePotentialSwings, { [action.payload.date]: action.payload.potentialTrend }]; 
                  }
  
                  if(!state[state.length-1].potentialSwingExtremeCombo ){
                    action.payload.potentialSwingExtremeCombo = [{ [action.payload.date]: action.payload.potentialSwingExtreme }]
                  }
                  else{
                    action.payload.potentialSwingExtremeCombo = [...state[state.length-1].potentialSwingExtremeCombo, { [action.payload.date]: action.payload.potentialSwingExtreme }]; 
                  }
  
                  var newstate = state.concat(action.payload);  
  
                  ////////// console('Direction on date..' + action.payload.date + ' 1222 ...is...' + action.payload.dir);           
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
  
           //////// console('Direction on date..' + action.payload.date + ' 1333 ...is...' + action.payload.dir);
           return newstate ;
  
   
       
    }
  
    return state;
  }
  