// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
//Require https
const https= require("https");

function printMessage(username, badgecount, points) {
  const message= `${username} has ${badgecount} total badge(s) and ${points} points in Javascript`;
  console.log(message);
}

function getProfile(username){
    try{
//connect to the api url(https://teamtreehouse.com/username.json)
      const request= https.get(`https://teamtreehouse.com/${username}.json`, response=> {
            let body= "";
            //read the data
            response.on('data', data=> {
              body+= data.toString();
            });

            response.on("end", ()=> {
              //Parse the data
              const profile= JSON.parse(body);
              //console.dir(profile);
              //Print out the data
              printMessage(username, profile.badges.length, profile.points.JavaScript);

            });

          });
          request.on("error", error => console.error(`Problem with request: ${error.message}`));

      }catch(error) {
        console.error(error.message);
      }
  };
 //process is a global object, argv is an aray property
const users = process.argv.slice(2);
users.forEach(getProfile);
