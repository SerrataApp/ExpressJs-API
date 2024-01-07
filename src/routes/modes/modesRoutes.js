"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var modeControllers_1 = require("../../controllers/modeControllers/modeControllers");
var router = express_1.default.Router();
router.post('/', modeControllers_1.createUpdateModeController);
router.delete('/', modeControllers_1.deleteModeController);
exports.default = router;
