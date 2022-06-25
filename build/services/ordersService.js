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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllOrders = void 0;
const orders_1 = require("../models/orders");
const verificationTokens_1 = require("../security/verificationTokens");
const store = new orders_1.OrdersStore();
const listAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.listAll();
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.listAllOrders = listAllOrders;
const listSpecificOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.listSpecific(+req.params.id);
        if (order) {
            res.json(order);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const insertIntoOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = {
            status: req.body.status,
            userId: req.body.userId,
        };
        const order = yield store.insert(newOrder);
        res.status(201).json(order);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const editOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = {
            status: req.body.status,
            userId: req.body.userId,
        };
        const order = yield store.edit(newOrder.status, +req.params.id);
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const removeFromOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.remove(+req.params.id);
        res.json(order);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, productId } = req.body;
    const orderId = +req.params.id;
    try {
        const newProduct = yield store.addNewProduct(quantity, orderId, productId);
        res.json(newProduct);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const ordersRoutes = (app) => {
    app.get("/orders", verificationTokens_1.verificationToken, exports.listAllOrders);
    app.get("/orders/:id", verificationTokens_1.verificationToken, listSpecificOrder);
    app.post("/orders", verificationTokens_1.verificationToken, insertIntoOrder);
    app.put("/orders/:id", verificationTokens_1.verificationToken, editOrder);
    app.delete("/orders/:id", verificationTokens_1.verificationToken, removeFromOrder);
    app.post("/orders/:id/products", verificationTokens_1.verificationToken, addProduct);
};
exports.default = ordersRoutes;
