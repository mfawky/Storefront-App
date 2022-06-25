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
exports.insertIntoUser1 = exports.insertIntoUser = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = require("jsonwebtoken");
const verificationTokens_1 = require("../security/verificationTokens");
const store = new users_1.UsersStore();
const listAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.listAll();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const listSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.listSpecific(+req.params.id);
        if (user) {
            res.json(user);
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
const insertIntoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            password: req.body.password,
        };
        const user = yield store.insert(newUser);
        const token = (0, jsonwebtoken_1.sign)(user, process.env.SECRET_TOKEN);
        res.status(201).json(token);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.insertIntoUser = insertIntoUser;
const insertIntoUser1 = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.insert(newUser);
        const token = (0, jsonwebtoken_1.sign)(user, process.env.SECRET_TOKEN);
        return token;
    }
    catch (error) {
        console.log(error);
    }
});
exports.insertIntoUser1 = insertIntoUser1;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const user = yield store.edit(newUser, +req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const removeFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.remove(+req.params.id);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const usersRoutes = (app) => {
    app.get("/users", verificationTokens_1.verificationToken, listAllUsers);
    app.get("/users/:id", verificationTokens_1.verificationToken, listSpecificUser);
    app.post("/users", exports.insertIntoUser);
    app.put("/users/:id", verificationTokens_1.verificationToken, editUser);
    app.delete("/users/:id", verificationTokens_1.verificationToken, removeFromUser);
};
exports.default = usersRoutes;
