"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const pg_1 = require("pg");
(0, dotenv_1.config)();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TESTING_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, } = process.env;
let db;
if (ENV === "development") {
    db = {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    };
}
if (ENV === "testing") {
    db = {
        host: POSTGRES_HOST,
        database: POSTGRES_TESTING_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    };
}
const DB_Pool = new pg_1.Pool(db);
exports.default = DB_Pool;
