"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersController_1 = require("../../controllers/usersControllers/usersController");
var usersMeRoutes_1 = require("./me/usersMeRoutes");
var loginMiddleware_1 = require("../../middleware/loginMiddleware");
var router = express_1.default.Router();
//Récuération d'un user
router.get('/', usersController_1.getUserController);
//Création d'un user
router.post('/', usersController_1.createUserController);
//Récupération du Bearer token
router.post('/login', usersController_1.loginUserController);
router.use('/me', loginMiddleware_1.ensureAuthenticated, usersMeRoutes_1.default);
exports.default = router;
