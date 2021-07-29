"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = __importDefault(require("./routes/index"));
var contents_1 = __importDefault(require("./routes/contents"));
var users_1 = __importDefault(require("./routes/users"));
var app = express_1.default();
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors_1.default({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
}));
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// urlencodedとjsonは別々に初期化する
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use("/", index_1.default);
app.use("/contents", contents_1.default);
app.use("/users", users_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
console.log("app.ts");
module.exports = app;
//# sourceMappingURL=app.js.map