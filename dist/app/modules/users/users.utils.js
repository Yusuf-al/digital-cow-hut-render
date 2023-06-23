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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genarateUserId = exports.findlastId = void 0;
const users_model_1 = require("./users.model");
const findlastId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastId = yield users_model_1.User.findOne({}, { userID: 1 }).sort({
        createdAt: -1
    }).lean();
    return lastId === null || lastId === void 0 ? void 0 : lastId.userID;
});
exports.findlastId = findlastId;
const genarateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUserId = (yield (0, exports.findlastId)()) || (0).toString().padStart(5, '0');
    return parseInt(newUserId) + 1;
});
exports.genarateUserId = genarateUserId;
