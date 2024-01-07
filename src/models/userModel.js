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
exports.getAdminField = exports.disableUser = exports.getUserAllData = exports.getPlayerIdByUsername = exports.updatePlayedGame = exports.deleteUser = exports.createUser = exports.getUserCreate = exports.getUserPrivateData = exports.getUserPublicData = void 0;
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
//-------------Fonctions de traitement-------------
function setPassword(value) {
    var buffer = Buffer.from(value, 'utf-8');
    return bcrypt_1.default.hashSync(buffer, 10);
}
var validateEmail = function (email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
function getUserPublicData(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user, id, username_1, playedGames, userPublicData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { username: username }
                    })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        id = user.id, username_1 = user.username, playedGames = user.playedGames;
                        userPublicData = { id: id, username: username_1, playedGames: playedGames };
                        console.log(userPublicData);
                        return [2 /*return*/, userPublicData];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserPublicData = getUserPublicData;
function getUserPrivateData(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user, id, username_2, playedGames, email, signupDate, disabled, cgu, admin, UserPrivateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { username: username }
                    })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        id = user.id, username_2 = user.username, playedGames = user.playedGames, email = user.email, signupDate = user.signupDate, disabled = user.disabled, cgu = user.cgu, admin = user.admin;
                        UserPrivateData = { id: id, username: username_2, playedGames: playedGames, email: email, signupDate: signupDate, disabled: disabled, cgu: cgu, admin: admin };
                        console.log(UserPrivateData);
                        return [2 /*return*/, UserPrivateData];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserPrivateData = getUserPrivateData;
function getUserCreate(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user, id, username_3, email, password, UserCreate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { username: username }
                    })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        id = user.id, username_3 = user.username, email = user.email, password = user.password;
                        UserCreate = { id: id, username: username_3, email: email, password: password };
                        return [2 /*return*/, UserCreate];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserCreate = getUserCreate;
function createUser(newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var createUser, id, username, email, playedGames, signupDate, disabled, cgu, admin, userPrivateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (validateEmail(newUser.email) == null)
                        return [2 /*return*/, false];
                    newUser.password = setPassword(newUser.password);
                    return [4 /*yield*/, prisma.user.create({
                            data: newUser,
                        })];
                case 1:
                    createUser = _a.sent();
                    if (createUser) {
                        id = createUser.id, username = createUser.username, email = createUser.email, playedGames = createUser.playedGames, signupDate = createUser.signupDate, disabled = createUser.disabled, cgu = createUser.cgu, admin = createUser.admin;
                        userPrivateData = { id: id, username: username, email: email, playedGames: playedGames, signupDate: signupDate, disabled: disabled, cgu: cgu, admin: admin };
                        return [2 /*return*/, userPrivateData];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPlayerIdByUsername(username)];
                case 1:
                    userId = _a.sent();
                    if (!userId) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.game.deleteMany({
                            where: { playerId: userId }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.delete({
                            where: { username: username }
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, true];
            }
        });
    });
}
exports.deleteUser = deleteUser;
function updatePlayedGame(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.update({
                        where: { username: username },
                        data: {
                            playedGames: {
                                increment: 1
                            }
                        }
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.updatePlayedGame = updatePlayedGame;
function getPlayerIdByUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            username: username
                        },
                        select: {
                            id: true
                        }
                    })];
                case 1:
                    user_id = _a.sent();
                    if (user_id)
                        return [2 /*return*/, user_id.id];
                    else
                        return [2 /*return*/, null];
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPlayerIdByUsername = getPlayerIdByUsername;
function getUserAllData(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: id },
                        include: {
                            Games: true,
                            GameMode: true
                        },
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.getUserAllData = getUserAllData;
function disableUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user, newDisabledState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: id },
                        select: { disabled: true }
                    })];
                case 1:
                    user = _a.sent();
                    newDisabledState = !user.disabled;
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: id },
                            data: { disabled: newDisabledState }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, newDisabledState];
            }
        });
    });
}
exports.disableUser = disableUser;
function getAdminField(id) {
    return __awaiter(this, void 0, void 0, function () {
        var userAdmin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: id },
                        select: { admin: true }
                    })];
                case 1:
                    userAdmin = _a.sent();
                    //@ts-ignore
                    return [2 /*return*/, userAdmin.admin];
            }
        });
    });
}
exports.getAdminField = getAdminField;
