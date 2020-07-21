'use strict';
let struc = {}

const fs = require("fs");
const moment = require("moment");

struc.modules ={}
struc.properties ={}
//struc.modules.moment = moment;

struc.vars =
{
    properties_path: __dirname + "/ServerProperties.json"
}

struc.functions =
{
    isUndefined: (input) => {return input === void 0;},
    timestemp: (format = "YYYY_MM_DD : HH:mm:ss") => { return moment().format(format) },
    expresslogger: (req, res, next) => {
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

struc.save = function(path = struc.vars.properties_path){

    fs.writeFile(path, JSON.stringify(struc.properties), 'utf8', () => {console.log("write success!")});

}

module.exports = struc;