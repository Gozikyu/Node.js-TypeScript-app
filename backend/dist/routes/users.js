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
var firebase_1 = require("../firebase");
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
// 型ガード用の関数。type Userの属性を持っていればtrueを返し、引数の型をUser似設定。
var isUser = function (arg) {
    if (typeof arg.uid == "string" && typeof arg.email == "string") {
        return true;
    }
    else {
        return false;
    }
};
var userCollection = app_1.default.firestore().collection("users");
// firebase Authにログイン状況を問い合わせ、ログインしていれば更にfirestoreから取得したログインユーザーのデータを返す。
router.get("/loginUser", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        firebase_1.auth.onAuthStateChanged(function (user) {
            if (user) {
                userCollection
                    .doc(user.uid)
                    .get()
                    .then(function (user_at_firestore) {
                    res.status(200).json({ user: user_at_firestore.data() });
                });
            }
            else {
                console.log("ログインしてください");
                res.status(500).json({ message: "ログインしてください" });
            }
        });
        return [2 /*return*/];
    });
}); });
// firebase Authでユーザ認証、認証が通れば、そのユーザーの情報をfirestoreから取得し返す。
router.post("/signin", function (req, res, next) {
    firebase_1.auth
        .signInWithEmailAndPassword(req.body.data.email, req.body.data.pass)
        .then(function (result) {
        var user = result.user;
        user &&
            userCollection
                .doc(user.uid)
                .get()
                .then(function (user_at_firestore) {
                return res.status(200).json({ user: user_at_firestore.data() });
            });
    })
        .catch(function (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    });
});
router.post("/", function (req, res, next) {
    firebase_1.auth
        .createUserWithEmailAndPassword(req.body.data.email, req.body.data.pass)
        .then(function (result) {
        var registerdUser = result.user;
        if (registerdUser) {
            var userData = {
                name: req.body.data.name,
                email: req.body.data.email,
                uid: registerdUser.uid,
            };
            userCollection
                .doc(userData.uid)
                .set(userData)
                // setの返り値はPromise<void>
                .then(function () {
                res.status(200).json({ message: "ユーザー登録に成功しました" });
            })
                .catch(function (err) {
                console.log(err);
                res.status(500).json({ message: "ユーザー登録に失敗しました" });
            });
        }
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map