"use strict";
//@ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameModeController = exports.updateGameModeController = exports.createGameModeController = exports.getAllImagesController = exports.getGameModeController = void 0;
var gameModeModel_1 = require("../../models/gameModeModel");
var getGameModeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gameMode, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModeModel_1.getGameMode)(parseInt(req.query.id, 10))];
            case 1:
                gameMode = _a.sent();
                if (!gameMode) {
                    res.status(400).json({ error: 'This game mode doesn\'t exist' });
                }
                else {
                    res.status(200).json({
                        gameMode: gameMode,
                        message: "Recovered game mode"
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: "Error during GameMode retrieval : ".concat(error_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGameModeController = getGameModeController;
var getAllImagesController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var images, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModeModel_1.getAllImages)(parseInt(req.query.id, 10))];
            case 1:
                images = _a.sent();
                if (images == null) {
                    res.status(400).json({ error: 'This game mode doesn\'t exist' });
                }
                else {
                    res.status(200).json({
                        images: images,
                        message: "Recovered images from game mode ".concat(req.query.id)
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: "Error during images retrieval : ".concat(error_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllImagesController = getAllImagesController;
var createGameModeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newGameMode, id, name_1, description, authorId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newGameMode = req.body;
                newGameMode.authorId = req.user.id;
                id = newGameMode.id, name_1 = newGameMode.name, description = newGameMode.description, authorId = newGameMode.authorId;
                newGameMode = { id: id, name: name_1, description: description, authorId: authorId };
                return [4 /*yield*/, (0, gameModeModel_1.createGameMode)(newGameMode)];
            case 1:
                _a.sent();
                res.status(201).json({ message: "Game mode created" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: "Error during GameMode creation : ".concat(error_3) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createGameModeController = createGameModeController;
var updateGameModeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var GameModeId, GameModeToUpdate, id, name_2, description, authorId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                GameModeId = parseInt(req.query.id, 10);
                GameModeToUpdate = req.body;
                id = GameModeToUpdate.id, name_2 = GameModeToUpdate.name, description = GameModeToUpdate.description, authorId = GameModeToUpdate.authorId;
                GameModeToUpdate = { id: id, name: name_2, description: description, authorId: authorId };
                return [4 /*yield*/, (0, gameModeModel_1.updateGameMode)(GameModeId, GameModeToUpdate)];
            case 1:
                _a.sent();
                res.status(200).json({ message: "Game mode updated" });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ error: "Error during GameMode update : ".concat(error_4) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateGameModeController = updateGameModeController;
var deleteGameModeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModeModel_1.deleteGameMode)(parseInt(req.query.id, 10))];
            case 1:
                _a.sent();
                res.status(200).json({ message: "Game mode deleted" });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ error: "Error during GameMode delete : ".concat(error_5) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteGameModeController = deleteGameModeController;
