var b = a.filter(x => {
    // let month = new Date(x.date).getMonth();
    let year = new Date(x.date).getFullYear();
    // ['NYSE', 'NASDAQ', 'NSE', 'BSE', 'coindcx'] 
    if(year === 2024 ) {
        return true;
    }
    return false;
});

var names = a.map(x => x.exchange);
var uniq = names.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

console.log(uniq, names);


///
var b = a.filter(x => {
    if ( x.exchange == "NSE" ||  x.exchange == "BSE" ) {
        return false;
    }
    return true;
})

var b = a.filter(x => {
    var date1 = new Date(x.date);
    var month = date1.getMonth();
    var date = date1.getDate();
    var year = date1.getFullYear();
    if(year === 2024 &&  date >=19 && month ==8){
        return true;
    }
    return false;
})


var b = a.filter(x => {
    if(
        x.exchange.toLowerCase() !== "nyse" ||
        x.exchange.toLowerCase() !== "nasdaq" ||
        x.exchange.toLowerCase() !== "coindcx" ||
        x.exchange.toLowerCase() !== "nse" ||
        x.exchange.toLowerCase() !== "bse"
    ){
        return true;
    }
    return false
})


var b = a.filter(x => {
    var date = x.date;
    var dateObj = new Date(x.date);
    var month = dateObj.getMonth();
    if(month == 8 && (x.exchange.toLowerCase() == "nasdaq" || x.exchange.toLowerCase() == "nyse") ) {
        return true;
    }
    return false;
});


var c