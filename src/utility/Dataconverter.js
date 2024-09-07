
var a = {"t":[1580376300],"c":[52.650001525879],"o":[52.619998931885],"h":[52.700000762939],"l":[52.619998931885],"v":["n\/a"],"s":"ok"};

var e = [];

Object.values(a)[0].map((val, index) => {
	
var f = {};
f['Local time']  = new Date(Object.values(a)[0][index]);
f["Open"] = Object.values(a)[2][index];
f["High"] = Object.values(a)[3][index];
f["Low"] = Object.values(a)[4][index];
f["Close"] = Object.values(a)[1][index];
e.push(f);

})

console.log(e);