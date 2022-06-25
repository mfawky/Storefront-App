"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = require("dotenv");
var usersService_1 = __importDefault(require("./services/usersService"));
var productsService_1 = __importDefault(require("./services/productsService"));
var ordersService_1 = __importDefault(require("./services/ordersService"));
(0, dotenv_1.config)();
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, usersService_1["default"])(app);
(0, productsService_1["default"])(app);
(0, ordersService_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
