"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _common = require("./lib/common");
var _cors = require("./middleware/cors");
var _route = require("./route");
var _database = require("./config/database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var port = 3030;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors.myCors)());
(0, _route.router)(app);
(0, _database.connectDB)().then(function (result) {
  app.listen(process.env.PORT || port, function () {
    console.log("Example app listening at http://localhost:".concat(process.env.PORT || port));
  });
})["catch"](function (e) {
  console.log(e);
});