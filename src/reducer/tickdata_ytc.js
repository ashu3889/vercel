export default function(state = [], action) {
  switch(action.type) {
    case 'REMOVE_TICK_DATA_YTC':
     return [];
    case 'ADD_DATA_SCOPE_YTC':
           

         //;
    //if(parseFloat(action.payload.testHour) >= 10){

               
         let length = state.length;
         let direction = '';
         const now = new Date();
         let shift = action.payload.shift;

         
    
    


        
        if(length >= 1 ){


                if(state[state.length-1].hasTradeStarted != undefined && state[state.length-1].hasTradeStarted != false){
                    action.payload.detectionCount = state[state.length-1].detectionCount;
                } 

                 if(state[state.length-1].detectionCount != undefined){
                  action.payload.detectionCount = state[state.length-1].detectionCount;
                } 


                if(state[state.length-1].detectionCandle != undefined){
                  action.payload.detectionCandle = state[state.length-1].detectionCandle;
                } 


                if(state[state.length-1].downPivotNotFormed != undefined){
                  action.payload.downPivotNotFormed = state[state.length-1].downPivotNotFormed;
                } 




                if(action.payload.hasTradeStarted != undefined && action.payload.hasTradeStarted  != false){
                   
                     if(action.payload.detectionCount == undefined){

                        action.payload.detectionCount = 1;
                        var data ={'date':action.payload.date ,'type': action.payload.tickType};
                        action.payload.detectionCandle = [action.payload.tickType];
                     }
                     else{

                       //console.log('action.payload.date ' + action.payload.date);
                       action.payload.detectionCount =  action.payload.detectionCount +1;
                       var data ={'date':action.payload.date ,'type': action.payload.tickType};

                      
                       action.payload.detectionCandle =  action.payload.detectionCandle.concat(data);
                        
                     }
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
        }


         //new condition ends here to avoid some error
          

          if(direction == 'up'){
            action.payload.y = parseFloat(action.payload.high);
          }
          else if(direction == 'down'){
            action.payload.y = parseFloat(action.payload.low);
          }
          else{            
            action.payload.y = parseFloat(action.payload.close);
          }

          // console.log('Direction is...' + direction + '..date is..' + action.payload.date + '...ts is..' + +action.payload.date );




          

 
            if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low)<= parseFloat(action.payload.low))){
            
                // console.log('Date 2 is...' + action.payload.date + '..ts is..' + +action.payload.date);
                return state ;
              } 

           else{      
                         //DETETC UPWARD INFLECTION AND DOWNWARD
                         //CHECK ONLY IF LENGTH IS GREATER THAN 3

                  // console.log('Date is...' + action.payload.date + '..ts is..' + +action.payload.date);
                  if(length> 4){
                      //if new one is 

                      //
                      let prevone = state[state.length-1].direction;
                      let beforeprevone = state[state.length-2].direction;
                      let swingHigh = state[state.length-1].swingHigh;
                      let swingLow = state[state.length-1].swingLow;

                      // if(+action.payload.date  === 1614135600000){
                      //   debugger;
                      // }



                       if(direction == prevone && beforeprevone != prevone && direction !="same"){

                         //ideal condition
                         //condition of inflection treend will be decided by direction
                       

                         if(direction == "down"){
                            //;
                           //console.log('action.payload.date  down is ' + action.payload.date);
                            var weakPivot = false;
                            // 2018-04-25
                            //2018-05-02

                          
                          

                         
                                  //condition to avaoid unnnecessay pivot weak pivots
                            /*  if(action.payload.close < state[state.length-2].high &&  state[state.length-1].close < state[state.length-2].high){
                                     weakPivot = true;
                              }*/

                            

                          if((action.payload.downPivotNotFormed != true || action.payload.downPivotNotFormed != undefined) && weakPivot ==false){
                              // console.log(' up action.payload.date ' + action.payload.date);
                               //console.log('up pivot value is....' +  parseFloat(state[state.length-2].high) );

                                if(parseFloat(state[state.length-1].high) > parseFloat(state[state.length-2].high)){
                                       action.payload.pivot =   parseFloat(state[state.length-1].high); 
                                }
                                else{
                                       action.payload.pivot =   parseFloat(state[state.length-2].high); 
                                }

                                action.payload.trend = "downtrend";

                                // console.log('up pivot value is....' +  action.payload.pivot + ' ..on date...' + action.payload.date + '..ts is...' + +action.payload.date);
                               

                                // if(+action.payload.date === 1507766400000){
                                     // debugger;
                                 // }
                                
                                action.payload.dir = 'up'; 
                                action.payload.currentPrice = parseFloat(action.payload.close) ;
                                action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                action.payload.x = state.length+1;
                                action.payload.direction = direction;
                                action.payload.pivotDate = state[state.length-2].date; 
                                action.payload.upPivotNotFormed = false;
                                var newstate = state.concat(action.payload);                
                                return newstate ;

                          } 
                          else{

                               action.payload.upPivotNotFormed = true;
                               var newstate = state.concat(action.payload);
                               return newstate;
                            }

                            
                         
                       

                            //return  state.slice();

                            
                             //new code data

                         } 
                         else if(direction == "up"){


                          

                         //console.log('action.payload.date UP  ' + action.payload.date);

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

                          //HINDCOMPOS
                          if(prevPivotType == "red" && pivotType =="red" && signalType == "red" && triggerType =="green"){
                               if( parseFloat(prevPivotBodyHigh) >= parseFloat(triggerBodyHigh)){
                                      prevPivotGoAhead = false;
                               }

                          }

                          if(triggerType == "red"){

                                if(parseFloat(pivotBodyOpen) >= parseFloat(signalBodyOpen) && parseFloat(pivotBodyOpen) >= parseFloat(triggerBodyOpen)){
                                     goAhead = false;
                                }
                          }

                          
 
                          //genesys condition
                          if(pivotType =="green" && signalType == "red" && triggerType =="red"){
                              if(parseFloat(pivotBodyHigh) >= parseFloat(triggerBodyOpen)){
                                   triggerGoAhead = false;
                              }
                          }

                          if(action.payload.low  >  state[state.length-2].low){

                            if(triggerType == "red"){
                                  if(parseFloat(triggerBodyOpen) >=  parseFloat(state[state.length-2].open) &&  parseFloat(triggerBodyClose) >=  parseFloat(state[state.length-2].open)){
                                      triggerCloseGoAhead = true;
                                  }
                                  else{

                                       if(lovelyDiffRatio < 10){
                                            triggerCloseGoAhead = false;
                                       }
                                       else{
                                             triggerCloseGoAhead = true;
                                       }
                                       
                                  }
                            }

                          }

                        

                          if(action.payload.close < state[state.length-2].high &&  state[state.length-1].close < state[state.length-2].high){
                                     
                                      if(lovelyDiffRatio < 10){
                                            weakPivot = true;
                                       }
                                       else{
                                            weakPivot = false;
                                       }
                          }


                          //                           if((action.payload.upPivotNotFormed != true || action.payload.upPivotNotFormed != undefined) &&  prevPivotGoAhead == true && triggerGoAhead == true && triggerCloseGoAhead == true && goAhead == true && weakPivot == false){

                          // if((action.payload.upPivotNotFormed != true || action.payload.upPivotNotFormed != undefined) &&  prevPivotGoAhead == true && triggerGoAhead == true && triggerCloseGoAhead == true && goAhead == true && weakPivot == false){
                          if((action.payload.upPivotNotFormed != true || action.payload.upPivotNotFormed != undefined) &&  prevPivotGoAhead == true && triggerGoAhead == true && goAhead == true && weakPivot == false){                     
                                        //console.log('down pivot date is....' +  action.payload.date);

                                        if(state[state.length-1].low  <= state[state.length-2].low ){
                                            action.payload.pivot = state[state.length-1].low; 
                                        }
                                        else{
                                          action.payload.pivot = state[state.length-2].low; 
                                        }

                                        action.payload.trend = "upward";
                                       
                                        action.payload.dir = 'low'; 
                                        action.payload.currentPrice = parseFloat(action.payload.close) ;
                                        //new code data
                                        action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                        action.payload.x = state.length+1;
                                        action.payload.direction = direction;

                                        action.payload.downPivotNotFormed = false;


                                        action.payload.pivotDate = state[state.length-2].date; 
                                        var newstate = state.concat(action.payload);                
                                        return newstate ;
                            }
                            else{
                               action.payload.direction = direction;
                               action.payload.downPivotNotFormed = true;
                               var newstate = state.concat(action.payload);
                               return newstate;
                            }


                             //new code data
                         }

                       }  
                       else if(direction =="same" && state[state.length-1].direction =="same"){
                        //condition to remove same candles from data                          
                               if( parseFloat( ) == parseFloat(state[state.length-1].close)){
                                     //same candle console.log  remove this state                             
                                      return state;
                                 }  
                       }
                       else if(direction != prevone && direction == beforeprevone){
                             
                               if(direction == "up"){                                   
                                   if(parseFloat(state[state.length-2].high) >= parseFloat(action.payload.high)){                                   
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

                                       let newstate1 = newstatedata.concat(action.payload);                
                                       return newstate1 ;
                                   }
                               }
                                else if(direction == "down"){ 
                                //  ;


                                   if(parseFloat(state[state.length-2].low) <= parseFloat(action.payload.low)){
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
                                       return newstate1 ;
                                    }
                               }
                       } 

      
                   }


              action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
              action.payload.x = state.length+1;
              action.payload.direction = direction;
              var newstate = state.concat(action.payload);                
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
         return newstate ;

 
     
  }

  return state;
}