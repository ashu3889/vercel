
export default function(state = [], action) {
  switch(action.type) {
    case 'REMOVE_TICK_DATA':
     return [];
    //  case 'Update_Physics_Dept':
    //    return [...DataCue, action.payla]
    case 'ADD_DATA_SCOPE':
           
               
         let length = state.length;
         let direction = 'same';
         const now = new Date();

        
        if(length >= 1 ){


          // if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low)<= parseFloat(action.payload.low))){
               
          //   return state ;
         
          // } 
               // Test if Target pivot is broke or not and color is against it
            const {targetInflectionPoint, currentInflectionPoint} = action.payload;
            

            if(state[state.length-1].downPivotNotFormed != undefined){
              action.payload.downPivotNotFormed = state[state.length-1].downPivotNotFormed;
            } 


            if(state[state.length-1].strength != undefined){
              action.payload.strength = state[state.length-1].strength;
            } 

            var incomingCandleColor = action.payload.tickType;
            var incomingOpen = parseFloat(action.payload.open);
            var incomingHigh = parseFloat(action.payload.high);
            var incomingLow = parseFloat(action.payload.low);
            var incomingClose = parseFloat(action.payload.close);

            var lastPrintedCandleColor = state[state.length-1].tickType;
            var lastPrintedOpen = parseFloat(state[state.length-1].open);
            var lastPrintedHigh = parseFloat(state[state.length-1].high);
            var lastPrintedLow = parseFloat(state[state.length-1].low);
            var lastPrintedClose = parseFloat(state[state.length-1].close);

            // var direction = "same";

            // 
            if(incomingLow >= lastPrintedLow && incomingHigh > lastPrintedHigh ){
                direction = "up";
            }
            else if(incomingLow < lastPrintedLow && lastPrintedHigh >= incomingHigh ){
                direction = "down";
            }
            else if(incomingLow > lastPrintedLow && lastPrintedHigh >= incomingHigh){
                // overlapping condition
                direction = "same";
            }
            else if(incomingHigh > lastPrintedHigh &&  incomingLow < lastPrintedLow ){
                // Superpass the previous candle condition.
                
                if(incomingCandleColor == lastPrintedCandleColor && lastPrintedCandleColor =="green" ){
                  direction = "up";
                }
                else if(incomingCandleColor == lastPrintedCandleColor && lastPrintedCandleColor =="red" ){
                  direction = "down";
                }
                else if(incomingCandleColor !== lastPrintedCandleColor && lastPrintedCandleColor =="green" && incomingCandleColor === "red" ){
                  direction = "down";
                }
                else if(incomingCandleColor !== lastPrintedCandleColor && lastPrintedCandleColor =="red" && incomingCandleColor === "green" ){
                  direction = "up";
                }
                else if(lastPrintedCandleColor === "doji"){
                  if(incomingCandleColor =="green"){
                    direction = "up";
                  }
                  else if(incomingCandleColor =="red"){
                    direction = "down";
                  }
                }
                else if(incomingCandleColor === "doji"){
                  let lastPrintedDirection = state[state.length-1].direction;
                  if(lastPrintedDirection == "down"){
                    direction = "down";
                  }
                  else if(lastPrintedDirection == "up"){
                    direction = "up";
                  }
                }

                // current printed is doji,..
                    // then its direction should be dependent on last direction
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

            // console.log('directions is...' + direction + '..on date...' + action.payload.date + '... ts is..' + +action.payload.date)

 

            // if(+action.payload.date == 1610078400000){
            //   debugger;
            // }


            // console.log('Janata curfew time is...' + action.payload.date + '...action.payload.high is..' + action.payload.high );
            
            if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low)<= parseFloat(action.payload.low))){
               
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


                    // // console.log('curfew at time...' + action.payload.date + '...price is...'+ action.payload.low);
                      

                     
                     
                     if(direction == prevone && beforeprevone != prevone && direction !="same"){
                       
               

                         if(direction == "down"){
                            var weakPivot = false;

                          
                          

                            if((action.payload.downPivotNotFormed != true || action.payload.downPivotNotFormed != undefined) && weakPivot ==false){
                                //// console.log(' up pivot date is... ' + state[state.length-2].date);

                                 ////// console.log('up pivot value is....' +  parseFloat(state[state.length-2].high) );


                                  var nearestHigh = [];
                                  var maxHigh = 0;
                                  if(state.length >= 4){
                                      nearestHigh= [state[state.length-1].high, state[state.length-2].high,state[state.length-3].high,state[state.length-4].high]
                                      maxHigh = Math.max(nearestHigh);
                                  }


                                  if(parseFloat(state[state.length-1].high) > parseFloat(state[state.length-2].high)){
                                    action.payload.lwpCandle = action.payload.close;
                                    action.payload.lwpCandleTime = action.payload.date;
                                      

                                     if(parseFloat(state[state.length-1].high) < parseFloat(maxHigh) ){
                                       action.payload.pivot = parseFloat(maxHigh);
                                     }
                                     else{
                                      action.payload.pivot =   parseFloat(state[state.length-1].high);
                                     }
                                    // 
                                  }
                                  else{
                                    //// debugger;
                                    action.payload.lwpCandle = state[state.length-1].close;
                                    action.payload.lwpCandleTime = state[state.length-1].date;
                                     //action.payload.pivot =   parseFloat(state[state.length-2].high);
                                    // action.payload.pivot = parseFloat(maxHigh); 

                                    if(parseFloat(state[state.length-2].high) < parseFloat(maxHigh) ){
                                      action.payload.pivot = parseFloat(maxHigh);
                                    }
                                    else{
                                     action.payload.pivot =   parseFloat(state[state.length-2].high);
                                    }
                                  }

                                  if(action.payload.high == 53.39){
                                     // // debugger;
                                  }

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

                                  // console.log('Direction on date..' + action.payload.date + ' 222 ...is...' + action.payload.dir);              
                                  return newstate ;

                            } 
                            else{

                                 action.payload.upPivotNotFormed = true;
                                 var newstate = state.concat(action.payload);
                                 console.log('Direction on date..' + action.payload.date + ' 333 ...is...' + action.payload.dir);
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
                          
                                              //// console.log('down pivot date is....' +  state[state.length-2].date);


                                              var nearestLow = [];
                                              var maxLow = 0;
                                              if(state.length >= 4){
                                                  nearestLow= [state[state.length-1].low, state[state.length-2].low,state[state.length-3].low,state[state.length-4].low]
                                                  maxLow = Math.max(nearestLow);
                                              }


                                              if(state[state.length-1].low  <= state[state.length-2].low ){
                                                action.payload.lwpCandle = action.payload.close;
                                                action.payload.lwpCandleTime = action.payload.date;
                                                // action.payload.pivot = state[state.length-1].low; 

                                                if(parseFloat(state[state.length-1].low) > parseFloat(maxLow) ){
                                                  action.payload.pivot = parseFloat(maxLow);
                                                }
                                                else{
                                                 action.payload.pivot =   parseFloat(state[state.length-1].low);
                                                }
                                              }
                                              else{
                                                action.payload.lwpCandle = state[state.length-1].close;
                                                action.payload.lwpCandleTime = state[state.length-1].date;
                                                // action.payload.pivot = state[state.length-2].low; 

                                                if(parseFloat(state[state.length-2].low) > parseFloat(maxLow) ){
                                                  action.payload.pivot = parseFloat(maxLow);
                                                }
                                                else{
                                                 action.payload.pivot =   parseFloat(state[state.length-2].low);
                                                }
                                              }

                                              ////// console.log('down pivot date is....' +  action.payload.date );
                                              ////// console.log('down pivot value is....' +  action.payload.pivot );

                                              // if(state[state.length-2].date == "Fri Jan 31 2020 18:30:00 GMT+0530 (India Standard Time)"){
                                              //     // debugger;
                                              // }
                                              // Move is impulsive

                                              if(action.payload.close >= state[state.length-1].close ){
                                                //  // console.log('DIRECTION IS....' + direction);
                                                  action.payload.strength = "Impulsive";
                                              }
                                              else{
                                                 action.payload.strength = "Corrective";
                                              }
                                               
                                          
                                              action.payload.trend = "upward";
                                             
                                              //action.payload.dir = 'low'; 
                                              action.payload.currentPrice = parseFloat(action.payload.close) ;
                                              //new code data
                                              action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                              action.payload.x = state.length+1;
                                              action.payload.direction = direction;

                                              action.payload.downPivotNotFormed = false;


                                              action.payload.pivotDate = state[state.length-2].date; 
                                              var newstate = state.concat(action.payload);  

                                              // console.log('Direction on date..' + action.payload.date + ' 444 ...is...' + action.payload.dir);              
                                              return newstate ;
                                }
                                else{
                                     action.payload.direction = direction;
                                     action.payload.downPivotNotFormed = true;
                                     var newstate = state.concat(action.payload);

                                     ////// console.log('Direction on date..' + action.payload.date + ' 555 ...is...' + action.payload.dir);
                                     return newstate;
                                }
                          }

                       }  
                       else if(direction =="same" && state[state.length-1].direction =="same"){
                        //condition to remove same candles from data                          
                          if( parseFloat( ) == parseFloat(state[state.length-1].close)){
                                     //same candle //// console.log  remove this state   
                            ////// console.log('Direction on date..' + action.payload.date + ' 666 ...is...' + action.payload.dir);                          
                            
                            return state;
                          }  
                       }
                       else if(direction != prevone && direction == beforeprevone){
                             
                               if(direction == "up"){                                   
                                   if(parseFloat(state[state.length-2].high) >= parseFloat(action.payload.high)){   
                                       ////// console.log('Direction on date..' + action.payload.date + ' 777 ...is...' + action.payload.dir);                                
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
                                       //  // // debugger;
                                       // } 

                                       // console.log('Direction on date..' + action.payload.date + ' 888...is...' + action.payload.dir);

                                       return newstate1 ;
                                   }
                               }
                                else if(direction == "down"){ 
                                //  ;


                                   if(parseFloat(state[state.length-2].low) <= parseFloat(action.payload.low)){
                                      ////// console.log('Direction on date..' + action.payload.date + ' 999 ...is...' + action.payload.dir);
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

                                       // console.log('Direction on date..' + action.payload.date + ' 1000...is...' + action.payload.dir);               
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
                  // // debugger;
                }  

                ////// console.log('Direction on date..' + action.payload.date + ' 1222 ...is...' + action.payload.dir);           
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

         //// console.log('Direction on date..' + action.payload.date + ' 1333 ...is...' + action.payload.dir);
         return newstate ;

 
     
  }

  return state;
}