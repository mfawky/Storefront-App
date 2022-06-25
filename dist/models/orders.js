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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrdersStore = void 0;
var DB_1 = __importDefault(require("../DB"));
var OrdersStore = /** @class */ (function () {
    function OrdersStore() {
    }
    // this method has to be async because all calls to the DB will be promises
    OrdersStore.prototype.listAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlQuery, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sqlQuery = "SELECT * FROM orders" // here we can finally write a sql query inside our ts code
                        ;
                        return [4 /*yield*/, connection.query(sqlQuery)]; // all the results of the query shal be stored in the results variable
                    case 2:
                        results = _a.sent() // all the results of the query shal be stored in the results variable
                        ;
                        connection.release(); // the release method to cose the connection after we're done here
                        return [2 /*return*/, results.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("SORRY, Couldn't get all orders to you : ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // this method has to be async because all calls to the DB will be promises
    OrdersStore.prototype.listSpecific = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlQuery, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sqlQuery = "SELECT * FROM orders WHERE id= ".concat(id) // here we can finally write a sql query inside our ts code
                        ;
                        return [4 /*yield*/, connection.query(sqlQuery)]; // all the results of the query shal be stored in the results variable
                    case 2:
                        results = _a.sent() // all the results of the query shal be stored in the results variable
                        ;
                        connection.release(); // the release method to cose the connection after we're done here
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("SORRY, Couldn't get this order to you : ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // this method has to be async because all calls to the DB will be promises
    OrdersStore.prototype.insert = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlQuery, results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sqlQuery = "INSERT INTO orders (status, user_id) VALUES ('".concat(order.status, "', ").concat(order.userId, ") RETURNING *") // here we can finally write a sql query inside our ts code
                        ;
                        return [4 /*yield*/, connection.query(sqlQuery)]; // all the results of the query shall be stored in the results variable
                    case 2:
                        results = _a.sent() // all the results of the query shall be stored in the results variable
                        ;
                        connection.release(); // the release method to cose the connection after we're done here
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("SORRY, Couldn't Create order : ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // this method has to be async because all calls to the DB will be promises
    OrdersStore.prototype.edit = function (status, oldId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlQuery, results, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sqlQuery = "UPDATE orders SET status = '".concat(status, "' WHERE id = ").concat(oldId, " RETURNING *") // here we can finally write a sql query inside our ts code
                        ;
                        return [4 /*yield*/, connection.query(sqlQuery)]; // all the results of the query shal be stored in the results variable
                    case 2:
                        results = _a.sent() // all the results of the query shal be stored in the results variable
                        ;
                        connection.release(); // the release method to cose the connection after we're done here
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("SORRY, Couldn't Update order : ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // this method has to be async because all calls to the DB will be promises
    OrdersStore.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlQuery, results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sqlQuery = "DELETE FROM orders WHERE id = (".concat(id, ") RETURNING *") // here we can finally write a sql query inside our ts code
                        ;
                        return [4 /*yield*/, connection.query(sqlQuery)]; // all the results of the query shal be stored in the results variable
                    case 2:
                        results = _a.sent() // all the results of the query shal be stored in the results variable
                        ;
                        connection.release(); // the release method to cose the connection after we're done here
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("SORRY, Couldn't Delete : ".concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrdersStore.prototype.addNewProduct = function (quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlQuery, results, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sqlQuery = "INSERT INTO orders_products (quantity, order_id, product_id) VALUES (".concat(quantity, ", ").concat(orderId, ", ").concat(productId, ") RETURNING *");
                        return [4 /*yield*/, connection.query(sqlQuery)];
                    case 2:
                        results = _a.sent();
                        connection.release();
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Couldn't add new product, ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersStore;
}());
exports.OrdersStore = OrdersStore;
