'use strict';
const fs = require("fs");
const moment = require("moment");
let struc = {}

struc.properties_path = __dirname + "/ServerProperties.json"

struc.vars =
{

}

struc.functions =
{
    "timestemp": () => { return moment().format("YYYY_MM_DD : HH:mm:ss") },
    "expresslogger": (req, res, next) => {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let string = `${struc.functions.timestemp()} -> ${ip} <- (${req.method}) ${req.originalUrl}`
        console.log(string);
        next();
    }
}

struc.read = function(path = struc.properties_path){

    if (fs.existsSync(path))
    {
        struc.properties = require(path);
        return struc;
    }
    else
    {
        console.dir(fs.existsSync(path) + " " + path);
        throw "ERROR - CAN READ PROPERTIES";
        return undefined;
    }
}


module.exports = struc;