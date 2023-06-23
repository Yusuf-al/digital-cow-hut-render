"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cows = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['Dhaka', 'Khulna', 'Chattogram', 'Barishal', 'Rajshahi', 'Sylhet', 'Comilla', 'Rangpur', 'Mymensingh']
    },
    breed: {
        type: String,
        required: true,
        enum: ['Brahman', 'Nellore', 'Sahiwal', 'Gir', 'Indigenous', 'Tharparkar', 'Kankrej']
    },
    weight: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true,
        default: 'for sale',
        enum: ['for sale', 'sold Out']
    },
    category: {
        type: String,
        required: true,
        enum: ['Dairy', 'Beef', 'Dual purpose']
    },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Cows = (0, mongoose_1.model)('CowData', cowSchema);
