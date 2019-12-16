
const isProduction = process.env.NODE_ENV === "production";
console.log("isProduction: ", isProduction);

var BACKEND_API = ""; 

if (isProduction == true) {
    //BACKEND_API = "http://rbt.naddic.com:3000"; // Live
    BACKEND_API = "http://localhost:8080";
}else{
    BACKEND_API = "http://localhost:8080";
}

//var TH_API = "http://3.1.144.241";        //TH-LIVE
var TH_API = "http://52.74.146.93";         //TH-QA

export { isProduction, BACKEND_API, TH_API};
