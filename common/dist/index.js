"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.udateblog = exports.createblog = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
// signup
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
    aboutuser: zod_1.default.string()
});
// signin
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
// create blog
exports.createblog = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
// update blog
exports.udateblog = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
});
