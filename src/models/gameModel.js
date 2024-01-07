"use strict";
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
exports.updateGameState = exports.deleteGame = exports.deleteGameMe = exports.createGame = exports.getGamesByGameMode = exports.getGames = exports.getAllUserGames = exports.getGame = void 0;
//@ts-nocheck
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
//-------------Fonctions de traitement-------------
function getGame(id) {
    return __awaiter(this, void 0, void 0, function () {
        var game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.game.findUnique({
                        where: { id: id }
                    })];
                case 1:
                    game = _a.sent();
                    return [2 /*return*/, game];
            }
        });
    });
}
exports.getGame = getGame;
function getAllUserGames(username) {
    return __awaiter(this, void 0, void 0, function () {
        var games;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findMany({
                        where: { username: username },
                        select: { Games: true }
                    })];
                case 1:
                    games = _a.sent();
                    return [2 /*return*/, games[0].Games];
            }
        });
    });
}
exports.getAllUserGames = getAllUserGames;
function getGames(offSet, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var games;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.game.findMany({
                        skip: offSet,
                        take: limit,
                    })];
                case 1:
                    games = _a.sent();
                    return [2 /*return*/, games];
            }
        });
    });
}
exports.getGames = getGames;
function getGamesByGameMode(gameMode) {
    return __awaiter(this, void 0, void 0, function () {
        var games;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.gameMode.findMany({
                        where: { id: gameMode },
                        select: { Game: true }
                    })];
                case 1:
                    games = _a.sent();
                    return [2 /*return*/, games[0].Game];
            }
        });
    });
}
exports.getGamesByGameMode = getGamesByGameMode;
function createGame(newGame) {
    return __awaiter(this, void 0, void 0, function () {
        var game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.game.create({
                        data: newGame
                    })];
                case 1:
                    game = _a.sent();
                    return [2 /*return*/, game];
            }
        });
    });
}
exports.createGame = createGame;
function deleteGameMe(id, playerId) {
    return __awaiter(this, void 0, void 0, function () {
        var game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.game.delete({
                        where: {
                            id: id,
                            playerId: playerId
                        }
                    })];
                case 1:
                    game = _a.sent();
                    return [2 /*return*/, game];
            }
        });
    });
}
exports.deleteGameMe = deleteGameMe;
function deleteGame(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.game.delete({
                        where: {
                            id: id,
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.deleteGame = deleteGame;
function updateGameState(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.game.updateMany({
                        data: { public: false }
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.game.update({
                            where: { id: id },
                            data: { public: true }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.updateGameState = updateGameState;
// export async function deleteGame(id: number): Promise<GameInDb | null> {
//     const game: GameInDb | null = await prisma.game.delete({
//         where: { id: id }
//     });
//     return game;
// }
