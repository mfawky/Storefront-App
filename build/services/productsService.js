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
const products_1 = require("../models/products");
const verificationTokens_1 = require("../security/verificationTokens");
const store = new products_1.ProductsStore();
const listAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.listAll();
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const listSpecificProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.listSpecific(+req.params.id);
        if (product) {
            res.json(product);
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
const insertIntoProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
        };
        const product = yield store.insert(newProduct);
        res.status(201).json(product);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
        };
        const product = yield store.edit(newProduct, +req.params.id);
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const removeFromProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.remove(+req.params.id);
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const productsRoutes = (app) => {
    app.get("/products", listAllProducts);
    app.get("/products/:id", listSpecificProduct);
    app.post("/products", verificationTokens_1.verificationToken, insertIntoProduct);
    app.put("/products/:id", verificationTokens_1.verificationToken, editProduct);
    app.delete("/products/:id", verificationTokens_1.verificationToken, removeFromProduct);
};
exports.default = productsRoutes;
