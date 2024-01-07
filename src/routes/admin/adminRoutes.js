"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var adminController_1 = require("../../controllers/adminControllers/adminController");
var router = express_1.default.Router();
router.put('/disable', adminController_1.disableUserController);
router.delete('/game', adminController_1.deleteAnyGameController);
router.delete('/user', adminController_1.deleteAnyUserController);
exports.default = router;
