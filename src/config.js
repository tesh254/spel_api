import process from "process"
import dotenv from "dotenv"

let env = process.env.ENV

dotenv.config()

const configuration = {
  mongo: {
    uri: process.env.DATABASE_URI
  }
}

export default configuration
