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
const cows_model_1 = require("./cows.model");
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const addCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const addNewCow = yield cows_model_1.Cows.create(cow);
    if (!addNewCow) {
        throw new Error("User is not created");
    }
    return addNewCow;
});
const getAllCow = (searchFilter, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.default.paginationOparetion(paginationOption);
    const sortConditions = {};
    const { searchTerm, maxPrice, minPrice } = searchFilter, filterData = __rest(searchFilter, ["searchTerm", "maxPrice", "minPrice"]);
    const searchFields = ['location', 'breed'];
    const andCnd = [];
    if (minPrice !== undefined || maxPrice !== undefined) {
        andCnd.push({
            price: {
                $gte: minPrice || 0,
                $lte: maxPrice || 10000000,
            },
        });
    }
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
    const allCows = yield cows_model_1.Cows.find(checkConditions).sort(sortConditions).skip(skip).limit(limit);
    const total = yield cows_model_1.Cows.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        dataSize: allCows.length,
        data: allCows,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleCow = yield cows_model_1.Cows.findById({ _id: id }).populate('seller');
    return singleCow;
});
const updateCow = (id, newUpdatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cows_model_1.Cows.findByIdAndUpdate({ _id: id }, newUpdatedData, {
        new: true,
    });
    return updatedCow;
});
const deleteSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCow = yield cows_model_1.Cows.findByIdAndDelete(id);
    return deletedCow;
});
exports.default = {
    addCow,
    getAllCow,
    getSingleCow,
    updateCow,
    deleteSingleCow
};
