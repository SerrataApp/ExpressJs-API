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
exports.updateGameStateController = exports.getGamesByGameModeController = exports.getGamesController = exports.getAllUserGamesController = exports.deleteGameController = exports.createGameController = exports.getGameController = void 0;
var gameModel_1 = require("../../models/gameModel");
var userModel_1 = require("../../models/userModel");
var getGameController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var game_id, game, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_id = parseInt(req.query.id, 10);
                return [4 /*yield*/, (0, gameModel_1.getGame)(game_id)];
            case 1:
                game = _a.sent();
                if (!game) {
                    return [2 /*return*/, res.status(404).json({ error: 'Partie introuvable' })];
                }
                res.status(200).json({
                    game: game,
                    message: "Partie récupérée"
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: 'Erreur lors de la récupération de la partie' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGameController = getGameController;
var createGameController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newGame, _a, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                newGame = req.body;
                _a = newGame;
                return [4 /*yield*/, (0, userModel_1.getPlayerIdByUsername)(req.user.username)];
            case 1:
                _a.playerId = (_b.sent());
                return [4 /*yield*/, (0, gameModel_1.createGame)(newGame)];
            case 2:
                _b.sent();
                res.status(201).json({
                    message: "Partie créée"
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ error: 'Erreur lors de la création de la partie' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createGameController = createGameController;
var deleteGameController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                gameId = parseInt(req.query.id, 10);
                return [4 /*yield*/, (0, gameModel_1.deleteGameMe)(gameId, req.user.id)];
            case 1:
                _a.sent();
                res.status(201).json({
                    message: "Partie supprimée"
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: 'Erreur lors de la suppression de la partie' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteGameController = deleteGameController;
var getAllUserGamesController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var games, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModel_1.getAllUserGames)(req.query.username)];
            case 1:
                games = _a.sent();
                res.status(201).json({
                    total: games === null || games === void 0 ? void 0 : games.length,
                    games: games,
                    message: "Parties de l'utilisateur ".concat(req.query.username)
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ error: 'Erreur lors de la récupération des parties de l\'utilisateur' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUserGamesController = getAllUserGamesController;
var getGamesController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var games, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModel_1.getGames)(parseInt(req.query.skip, 10), parseInt(req.query.limit, 10))];
            case 1:
                games = _a.sent();
                res.status(201).json({
                    total: games === null || games === void 0 ? void 0 : games.length,
                    games: games,
                    message: 'Parties récupérées'
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ error: 'Erreur lors de la récupération des parties' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGamesController = getGamesController;
var getGamesByGameModeController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var games, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModel_1.getGamesByGameMode)(parseInt(req.query.gamemode, 10))];
            case 1:
                games = _a.sent();
                res.status(201).json({
                    total: games === null || games === void 0 ? void 0 : games.length,
                    games: games,
                    message: 'Parties récupérées'
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ error: "Erreur lors de la r\u00E9cup\u00E9ration des parties du mode de jeu num\u00E9ro ".concat(req.query.gamemode) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGamesByGameModeController = getGamesByGameModeController;
var updateGameStateController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gameModel_1.updateGameState)(parseInt(req.query.id, 10))];
            case 1:
                _a.sent();
                res.status(201).json({
                    message: 'Partie mise à jour'
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).json({ error: "Erreur lors de la modification de la partie" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateGameStateController = updateGameStateController;
