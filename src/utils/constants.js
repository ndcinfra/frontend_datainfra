
const isProduction = process.env.NODE_ENV === "production";
// Live
var BACKEND_API = ""; 

if (isProduction == true) {
    BACKEND_API = "http://13.124.67.63:3000";
}else{
    BACKEND_API = "http://localhost:8080";
}


//require('dotenv').config();
//const isProduction = process.env.isProduction;
//const BACKEND_API = process.env.BACKEND_API;

export { isProduction, BACKEND_API };
