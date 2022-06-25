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
exports.OrdersStore = void 0;
const DB_1 = __importDefault(require("../DB"));
class OrdersStore {
    // this method has to be async because all calls to the DB will be promises
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `SELECT * FROM orders`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows;
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't get all orders to you : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    listSpecific(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `SELECT * FROM orders WHERE id= ${id}`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't get this order to you : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    insert(order) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `INSERT INTO orders (status, user_id) VALUES ('${order.status}', ${order.userId}) RETURNING *`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shall be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Create order : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    edit(status, oldId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `UPDATE orders SET status = '${status}' WHERE id = ${oldId} RETURNING *`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Update order : ${error}`);
            }
        });
    }
    // this method has to be async because all calls to the DB will be promises
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try and catch here to handle any exception
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `DELETE FROM orders WHERE id = (${id}) RETURNING *`; // here we can finally write a sql query inside our ts code
                const results = yield connection.query(sqlQuery); // all the results of the query shal be stored in the results variable
                connection.release(); // the release method to cose the connection after we're done here
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`SORRY, Couldn't Delete : ${error}`);
            }
        });
    }
    addNewProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield DB_1.default.connect();
                const sqlQuery = `INSERT INTO orders_products (quantity, order_id, product_id) VALUES (${quantity}, ${orderId}, ${productId}) RETURNING *`;
                const results = yield connection.query(sqlQuery);
                connection.release();
                return results.rows[0];
            }
            catch (error) {
                throw new Error(`Couldn't add new product, ${error}`);
            }
        });
    }
}
exports.OrdersStore = OrdersStore;
