"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verificationToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, process.env.SECRET_TOKEN);
        next();
        return;
    }
    catch (error) {
        res.sendStatus(401);
    }
};
exports.verificationToken = verificationToken;
