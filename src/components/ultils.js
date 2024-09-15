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