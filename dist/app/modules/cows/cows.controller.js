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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cows_service_1 = __importDefault(require("./cows.service"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const addCowController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow } = req.body;
    const newCowResult = yield cows_service_1.default.addCow(cow);
    res.status(200).json({
        success: true,
        message: "User created succussfully",
        data: newCowResult
    });
}));
const getAllUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOption = (0, pick_1.default)(req.query, ['page', 'limit', 'skip', 'sortBy', 'sortOrder']);
    const searchAndFilter = (0, pick_1.default)(req.query, ['location', 'breed', 'maxPrice', 'minPrice', 'searchTerm']);
    const allUserResult = yield cows_service_1.default.getAllCow(searchAndFilter, paginationOption);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User retrieved successfully",
        meta: allUserResult === null || allUserResult === void 0 ? void 0 : allUserResult.meta,
        data: allUserResult === null || allUserResult === void 0 ? void 0 : allUserResult.data
    });
}));
const getSingleCowController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const singleCowResult = yield cows_service_1.default.getSingleCow(cowId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User retrieved successfully",
        data: singleCowResult
    });
}));
const updateCowController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const updateCowResult = yield cows_service_1.default.updateCow(id, updatedData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cow data updated successfully",
        data: updateCowResult
    });
}));
const deleteUserController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedUserResult = yield cows_service_1.default.deleteSingleCow(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cow deleted successfully",
    });
}));
exports.default = {
    addCowController,
    getAllUserController,
    getSingleCowController,
    updateCowController,
    deleteUserController
};
