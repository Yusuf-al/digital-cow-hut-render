"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./app/modules/users/users.routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cows_route_1 = __importDefault(require("./app/modules/cows/cows.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', users_routes_1.default);
app.use('/api/v1/', cows_route_1.default);
app.use(globalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.status(200).json("App working fine");
});
exports.default = app;
