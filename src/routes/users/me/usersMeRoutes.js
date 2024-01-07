"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usersMeController_1 = require("../../../controllers/usersControllers/usersMeController");
var router = express_1.default.Router();
router.get('/', usersMeController_1.getUserMeController);
router.delete('/', usersMeController_1.deleteUserMeController);
router.put('/game', usersMeController_1.updatePlayedGameController);
exports.default = router;
