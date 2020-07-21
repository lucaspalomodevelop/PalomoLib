var lplib = require("./bin/index").read();
console.log(lplib.functions.timestemp());
console.log(JSON.stringify(lplib)); 
lplib.properties.hallo = "hallo i bims";
lplib.save();
