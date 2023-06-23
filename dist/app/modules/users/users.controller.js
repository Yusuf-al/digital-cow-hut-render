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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("./users.service"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const createUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const newUserResult = yield users_service_1.default.createUser(user);
    res.status(200).json({
        success: true,
        message: "User created succussfully",
        data: newUserResult
    });
}));
const getAllUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOption = (0, pick_1.default)(req.query, ['page', 'limit', 'skip', 'sortBy', 'sortOrder']);
    const searchAndFilter = (0, pick_1.default)(req.query, ['role', 'name', 'budget', 'phoneNumber', 'searchTerm']);
    const allUserResult = yield users_service_1.default.getAllUser(searchAndFilter, paginationOption);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User retrieved successfully",
        meta: allUserResult === null || allUserResult === void 0 ? void 0 : allUserResult.meta,
        data: allUserResult === null || allUserResult === void 0 ? void 0 : allUserResult.data
    });
}));
const getSingleUserController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const singleUserResult = yield users_service_1.default.getSingleUser(userId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User retrieved successfully",
        data: singleUserResult
    });
}));
const updateUserController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updatedData = req.body;
    const updateUserResult = yield users_service_1.default.updateUser(userId, updatedData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: updateUserResult
    });
}));
const deleteUserController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const deletedUserResult = yield users_service_1.default.deleteSingleUser(userId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
    });
}));
exports.default = {
    createUserController,
    getAllUserController,
    getSingleUserController,
    updateUserController,
    deleteUserController
};
