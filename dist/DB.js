"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var pg_1 = require("pg");
(0, dotenv_1.config)();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TESTING_DB = _a.POSTGRES_TESTING_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var db;
console.log("halawa >>> ".concat(ENV));
if (ENV === "development") {
    db = {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    };
}
if (ENV === "testing") {
    db = {
        host: POSTGRES_HOST,
        database: POSTGRES_TESTING_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
var DB_Pool = new pg_1.Pool(db);
exports["default"] = DB_Pool;
