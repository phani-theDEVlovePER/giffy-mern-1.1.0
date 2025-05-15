import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import cookieParser from "cookie-parser"
import path from "path"

import { connectDB } from "./db/connectDB.js"
import appRouter from "./routes/app.routes.js"

const app = express()
dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL
app.use(cors({ origin: CLIENT_URL, credentials: true }))

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json()) // allows us to parse incomming requests :req.body
app.use(cookieParser()) // parses cookies in incoming requests

app.use("/api", appRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    // Fallback route for React client-side routing
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
    });
}
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
    console.log(CLIENT_URL)
})