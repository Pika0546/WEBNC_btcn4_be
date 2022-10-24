"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _accountController = require("./accountController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var accountRoute = _express["default"].Router();
accountRoute.post('/login', _accountController.login);
accountRoute.post('/', _accountController.signup);
accountRoute.get('/', _accountController.getAccountList);
var _default = accountRoute;
exports["default"] = _default;