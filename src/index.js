"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var usersRoutes_1 = require("./routes/users/usersRoutes");
var gameRoutes_1 = require("./routes/games/gameRoutes");
var gamesRoutes_1 = require("./routes/games/gamesRoutes");
var adminRoutes_1 = require("./routes/admin/adminRoutes");
var imageRoutes_1 = require("./routes/images/imageRoutes");
var gameModeRoutes_1 = require("./routes/gameModes/gameModeRoutes");
var modesRoutes_1 = require("./routes/modes/modesRoutes");
var loginMiddleware_1 = require("./middleware/loginMiddleware");
var adminMiddleware_1 = require("./middleware/adminMiddleware");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', usersRoutes_1.default);
app.use('/game', gameRoutes_1.default);
app.use('/games', gamesRoutes_1.default);
app.use('/admin', loginMiddleware_1.ensureAuthenticated, adminMiddleware_1.isAdmin, adminRoutes_1.default);
app.use('/image', imageRoutes_1.default);
app.use('/gameMode', gameModeRoutes_1.default);
app.use('/mode', modesRoutes_1.default);
app.get('/', function (req, res) {
    res.status(200).json({
        message: "Hello Wolrd!"
    });
});
app.use(function (req, res, next) {
    res.status(404).json({ error: 'Not Found' });
});
app.use(function (err, req, res) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(port, "0.0.0.0", function () {
    console.log("Server is running on port ".concat(port));
});
