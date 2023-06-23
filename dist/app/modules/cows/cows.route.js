"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cows_controller_1 = __importDefault(require("./cows.controller"));
const cowRouter = express_1.default.Router();
cowRouter.post('/cows', cows_controller_1.default.addCowController);
cowRouter.get('/cows', cows_controller_1.default.getAllUserController);
cowRouter.patch('/cows/:id', cows_controller_1.default.updateCowController);
cowRouter.get('/cows/:id', cows_controller_1.default.getSingleCowController);
cowRouter.delete('/cows/:id', cows_controller_1.default.deleteUserController);
exports.default = cowRouter;
