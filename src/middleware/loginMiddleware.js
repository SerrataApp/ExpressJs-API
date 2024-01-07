"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var ensureAuthenticated = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        //@ts-ignore
        req.user = decodedToken.user;
        return next();
    }
    catch (error) {
        console.error("Erreur de vérification du jeton :", error.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.ensureAuthenticated = ensureAuthenticated;
