// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
//Require https
const https= require("https");
//Require http module for status code
const http= require("http");

//print Error messages
function printError(error){
  console.error(error.message);
}

function printMessage(username, badgecount, points) {
  const message= `${username} has ${badgecount} total badge(s) and ${points} points in Javascript`;
  console.log(message);
}

function getProfile(username){
    try{
//connect to the api url(https://teamtreehouse.com/username.json)
      const request= https.get(`https://teamtreehouse.com/${username}.json`, response=> {
            if(response.statusCode=== 200){
              let body= "";
              //read the data
              response.on('data', data=> {
                body+= data.toString();
              });

              response.on("end", ()=> {
                //Parse the data
                try{
                  const profile= JSON.parse(body);
                  //console.dir(profile);
                  //Print out the data
                  printMessage(username, profile.badges.length, profile.points.JavaScript);
                } catch (error){
                  printError(error);
                }
              });
            } else{
              const message= `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`; //http have status code object that return English string from status code.
              const statusCodeError= new Error(message)
              printError(statusCodeError);
            };
          });
          request.on("error", printError);

      }catch(error) {
        printError(error);
      }
  };
const users = process.argv.slice(2);  //process is a global object, argv is an aray property
users.forEach(getProfile);
