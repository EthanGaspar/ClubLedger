import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser"

import memberRoutes from "./routes/memberRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import settingsRoutes from "./routes/settingsRoutes.js"
import connectDB from "./db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import requestLogger from "./middleware/requestLogger.js"

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//app refers to our server controller
// express() initializes the server (API) framework
const app = express();
const PORT = process.env.PORT || 5001;

// Parse cookies
app.use(cookieParser())

//Enable CORS for local development only
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173", //frontend origin
        credentials: true, // Allow cookies to be sent
    }
    ))
}

//.use specifies a middleware
//parses json, gives access to req.body
app.use(express.json())
app.use(requestLogger)

//Does this break if client is not using a trust proxy/NAT
app.set("trust proxy", 1)

//primary middleware:
//1.) When api/member route is hit run the rate Limiter
//2.) If req passes rate limit test run the normal route
app.use("/api/members", rateLimiter, memberRoutes)
app.use("/api/auth/users", rateLimiter, userRoutes)
app.use("/api/settings", rateLimiter, settingsRoutes)
app.use(express.static(path.join(__dirname, "../../frontend/dist")))

if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
    })
}



//Connect DB then listen for reqs
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT);
    });
});
