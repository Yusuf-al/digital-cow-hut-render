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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const config_1 = __importDefault(require("./../../../config"));
const users_model_1 = require("./users.model");
const users_utils_1 = require("./users.utils");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUserId = yield (0, users_utils_1.genarateUserId)();
    user.userID = createdUserId.toString().padStart(5, '0');
    if (!user.password) {
        user.password = config_1.default.userPassword;
    }
    const createNewUser = yield users_model_1.User.create(user);
    if (!createNewUser) {
        throw new Error("User is not created");
    }
    return createNewUser;
});
const getAllUser = (searchFilter, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.default.paginationOparetion(paginationOption);
    const sortConditions = {};
    const { searchTerm } = searchFilter, filterData = __rest(searchFilter, ["searchTerm"]);
    const searchFields = ['role', 'name.firstName', 'name.lastName', 'phoneNumber'];
    const andCnd = [];
    if (searchTerm) {
        andCnd.push({
            $or: searchFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            }))
        });
    }
    if (Object.keys(filterData).length) {
        andCnd.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const checkConditions = andCnd.length > 0 ? { $and: andCnd } : {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const allUsers = yield users_model_1.User.find(checkConditions).sort(sortConditions).skip(skip).limit(limit);
    const total = yield users_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        dataSize: allUsers.length,
        data: allUsers,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield users_model_1.User.findById({ _id: id });
    return singleUser;
});
const updateUser = (id, newUpdatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield users_model_1.User.findByIdAndUpdate({ _id: id }, newUpdatedData, {
        new: true,
    });
    return updatedUser;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield users_model_1.User.findByIdAndDelete(id);
    return deleteUser;
});
exports.default = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteSingleUser
};
