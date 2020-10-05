'use strict';
let struc = {}

const fs = require("fs");
const moment = require("moment");
const dotenv = require('dotenv');
dotenv.config();

struc.modules ={}
struc.properties ={}
//struc.modules.moment = moment;

struc.vars =
{
    properties_path: __dirname + "/ServerProperties.json",
    allow_save: true
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
    let result = struc;

    if (fs.existsSync(path))
    {
        struc.properties = require(path);
        result = struc;
    }


    if(process.env)
    {
        this.allow_save = false;

        for (const [key, value] of Object.entries(process.env)) {
            struc.properties[key] = value;
          }

        result = struc;
    }

    return result

}

struc.save = function(path = struc.vars.properties_path,allow){

    if(this.allow_save || allow)
    fs.writeFile(path, JSON.stringify(struc.properties), 'utf8', () => {console.log("write success!")});

}

module.exports = struc;