//Requireing http and api key
const http= require("http");
const api= require("./api.json");

//String containig city name and temperature
function printMessage(weather) {
  const string= `It is ${Math.round( weather.list[0].main.temp-272.15 )} degrees in ${weather.city.name}`;
  console.log(string);
};

function printError(error) {
  console.error(error.message);
};

//with this function I am aquireing API, JSON format data and printing it out with printMessage function.
function get(query) {
  //try this chunk of code and if sommethin is wrong print only error message
  try{
    const request= http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=${api.key}`, response=> {
      //if statusCode is not 200, log specific message
      if (response.statusCode=== 200){
        let body= "";
        response.on("data", data=>{
          //read the data
          body+= data;
        });
        response.on("end", ()=> {
          //parse the data
          let weather= JSON.parse(body);
          printMessage(weather);
        });
      } else{
        let error= `Somethin is wrong=> ${http.STATUS_CODES[response.statusCode]}`;
        console.log(error);
      }
    });
  } catch(error) {
    printError(error);
  };
};

//exporting get function
module.exports.get= get;
