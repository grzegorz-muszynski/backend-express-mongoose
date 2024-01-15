"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// create a server
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!<h1>');
});
// listen to some port
app.listen(8000, () => {
    console.log("listening");
});
