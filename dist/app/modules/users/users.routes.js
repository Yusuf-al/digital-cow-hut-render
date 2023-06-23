"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("./users.controller"));
const router = express_1.default.Router();
router.post('/auth/signup', users_controller_1.default.createUserController);
router.get('/users', users_controller_1.default.getAllUserController);
router.get('/users/:id', users_controller_1.default.getSingleUserController);
router.patch('/users/:id', users_controller_1.default.updateUserController);
router.delete('/users/:id', users_controller_1.default.deleteUserController);
exports.default = router;
