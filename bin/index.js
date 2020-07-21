'use strict';
const fs = require("fs");
const moment = require("moment");
let struc = {}


struc.vars =
{
    properties_path: __dirname + "/ServerProperties.json"
}

struc.functions =
{
    "timestemp": (format = "YYYY_MM_DD : HH:mm:ss") => { return moment().format(format) },
    "expresslogger": (req, res, next) => {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let string = `${struc.functions.timestemp()} -> ${ip} <- (${req.method}) ${req.originalUrl}`
        console.log(string);
        next();
    }
}

struc.read = function(path = struc.vars.properties_path){

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