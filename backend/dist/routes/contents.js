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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Cloud Firestore through Firebase
if (!app_1.default.apps.length) {
    app_1.default.initializeApp({
        apiKey: String(process.env.apikey),
        authDomain: String(process.env.authDomain),
        projectId: String(process.env.projectId),
    });
}
var db = app_1.default.firestore();
var isContent = function (arg) {
    if (typeof arg.title === "string" &&
        typeof arg.url === "string" &&
        typeof arg.category === "string" &&
        typeof arg.description === "string") {
        return true;
    }
    else {
        return false;
    }
};
/* GET users listing. */
router.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, snapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contents = [];
                return [4 /*yield*/, db.collection("contents").get()];
            case 1:
                snapshot = _a.sent();
                snapshot.docs.map(function (content) {
                    var data = content.data();
                    console.log(data);
                    if (isContent(data)) {
                        contents.push(data);
                    }
                });
                res.json(contents);
                return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.collection("contents")];
            case 1:
                snapshot = _a.sent();
                data = {
                    uid: req.body.data.uid,
                    title: req.body.data.title,
                    category: req.body.data.category,
                    url: req.body.data.url,
                    description: req.body.data.description,
                };
                snapshot
                    .doc()
                    .set(data)
                    .then(function (content) {
                    console.log(content);
                    res.json(content);
                })
                    .catch(function (err) {
                    console.error(err);
                });
                return [2 /*return*/];
        }
    });
}); });
router.post("/search", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, snapshot, filtered;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contents = [];
                return [4 /*yield*/, db.collection("contents").get()];
            case 1:
                snapshot = _a.sent();
                return [4 /*yield*/, snapshot.docs.map(function (content) {
                        var data = content.data();
                        if (isContent(data)) {
                            contents.push(data);
                        }
                    })];
            case 2:
                _a.sent();
                filtered = contents.filter(function (content) {
                    return ((content.title.includes(req.body.data.searchWord) ||
                        content.description.includes(req.body.data.searchWord)) &&
                        content.category.includes(req.body.data.searchCategory));
                });
                res.json(filtered);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=contents.js.map