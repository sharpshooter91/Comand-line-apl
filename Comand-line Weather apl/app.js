const weather= require("./weather.js");

const info= process.argv.slice(2).toString();

weather.get(info);
