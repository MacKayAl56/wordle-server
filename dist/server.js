"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
// Configure CORS options
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    credentials: true,
};
// Enable CORS for all routes using the configured options
app.use((0, cors_1.default)(corsOptions));
let wordList = [];
const wordsFilePath = path_1.default.join(__dirname, "../wordles.txt");
fs_1.default.readFile(wordsFilePath, "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    wordList = data.split("\n");
});
// Define GET endpoint(s)
app.get("/random-word", (req, res) => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];
    const secretWord = { secret: randomWord };
    res.json(secretWord);
});
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
