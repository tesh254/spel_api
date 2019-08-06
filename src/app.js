import mongoose from "mongoose"
import bodyParser from "body-parser"
import express from "express"
import chalk from "chalk"
import compression from "compression"
import logs from "morgan"
import cors from "cors"
import process from "process"
import dotenv from "dotenv"
import requestIP from "request-ip"

import config from "./config"
import Routes from "./constants/routes"

// API Endpoints
import authAPI from "./api/auth";

const app = express()

// Initialize environment
dotenv.config()

// Define json body reader
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname, { dotfiles: "allow" }))

// Enable proxy x-Forwadded-*
app.enable("trust proxy")

// IP middleware
app.use(requestIP.mw())

// Connect to database
mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true,
  useCreateIndex: true
})

mongoose.connection.on("open", err => {
  if (err) console.log(chalk.red("Error connecting to database"))
  console.log(chalk.green("Connected to database successfully"))
})

// Log server request to console
app.use(logs("dev"))
// Enables CORS
app.use(cors())
app.use(compression())

// API endpoints
app.use(Routes.spel.root, authAPI);

// set the port
app.set("port", process.env.PORT || 3040)

// Run the server
app.listen(app.get("port"), err => {
  if (err) console.log("Server stopped due to " + err.message)
  console.log(chalk.green("Server is running on port " + app.get("port")))
})

export default app
