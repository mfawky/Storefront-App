import { config } from "dotenv"
import { Pool } from "pg"

config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TESTING_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let db;

if (ENV === "development") {
  db = {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  }
}

if (ENV === "testing") {
  db = {
    host: POSTGRES_HOST,
    database: POSTGRES_TESTING_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  }
}

const DB_Pool = new Pool(db)

export default DB_Pool;
