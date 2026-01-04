// import express from "express"
const express = require("express");
const cors = require("cors");

const memberRoutes = require("./routes/memberRoutes.js")
const connectDB = require("./db.js");
const rateLimiter = require("./middleware/rateLimiter.js");



//app refers to our server controller
// express() initializes the server (API) framework
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173", //frontend origin
}
))

//.use specifies a middleware
//parses json, gives access to req.body
app.use(express.json())

//Does this break if client is not using a trust proxy/NAT
app.set("trust proxy", 1)

//primary middleware:
//1.) When api/member route is hit run the rate Limiter
//2.) If req passes rate limit test run the normal route
app.use("/api/members", rateLimiter, memberRoutes) 


//Sample Middleware:
//For logging method and URL
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} & URL is ${req.url}`);
//     next(); //callback
// });

//Connect DB then listen for reqs
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT);
    });
});



