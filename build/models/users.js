"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const DB_1 = __importDefault(require("../DB"));
const bcrypt_1 = require("bcrypt");
class UsersStore {
    // this method has to be async because all calls to the DB will be promises
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `SELECT * FROM users`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows;
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't get all Users to you : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    listSpecific(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `SELECT id, firstname, lastname FROM users WHERE id = (${id})`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't get this user to you : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    insert(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `INSERT INTO users (firstname, lastname, password) VALUES ('${user.firstname}', '${user.lastname}', $1) RETURNING id, firstname, lastname`; // here we can finally write a sql query inside our ts code
                const passCode = yield (0, bcrypt_1.hashSync)(user.password, +process.env.SALT_ROUNDS);
                const results = yield connection.query(sqlQuery, [passCode]); // all the results of the query shall be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Create user : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    edit(newUser, oldId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `UPDATE users SET firstname = '${newUser.firstname}', lastname = '${newUser.lastname}', password = ($1) WHERE id = '${oldId}' RETURNING id, firstname, lastname`; // here we can finally write a sql query inside our ts code
                const passCode = yield (0, bcrypt_1.hashSync)(newUser.password, +process.env.SALT_ROUNDS);
                const results = yield connection.query(sqlQuery, [passCode]); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Update user : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `DELETE FROM users WHERE id = (${id}) RETURNING id, firstname, lastname`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Delete : ${error}`);
            }
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `TRUNCATE only users RESTART IDENTITY CASCADE`; // here we can finally write a sql query inside our ts code
                yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Delete : ${error}`);
            }
        });
    }
}
exports.UsersStore = UsersStore;
