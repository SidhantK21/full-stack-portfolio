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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.post("/sendDet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, emailAddress, details } = req.body;
    try {
        const existsUser = yield db_1.default.findOne({ userName });
        if (existsUser) {
            res.json({ msg: "A project request is alreday been made !" });
        }
        else {
            const newForm = new db_1.default({
                userName,
                emailAddress,
                details
            });
            yield newForm.save();
            res.json({
                msg: "Successfully submitted"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error submitting!"
        });
    }
}));
const port = process.env.portNumber;
app.listen(port, () => {
    console.log("Running on the server");
});
