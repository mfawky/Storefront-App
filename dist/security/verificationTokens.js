"use strict";
exports.__esModule = true;
exports.verificationToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var verificationToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, process.env.SECRET_TOKEN);
        next();
        return;
    }
    catch (error) {
        res.sendStatus(401);
    }
};
exports.verificationToken = verificationToken;
