// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
//Require https
const https= require("https");
const username="chalkers";

function printMessage(username, badgecount, points) {
  const message= `${username} has ${badgecount} total badge(s) and ${points} points in Javascript`;
  console.log(message);
}

//connect to the api url(https://teamtreehouse.com/username.json)
const request= https.get(`https://teamtreehouse.com/${username}.json`, response=> {
  console.dir(response);

  //read the data
  //Parse the data
  //Print out the data

});
