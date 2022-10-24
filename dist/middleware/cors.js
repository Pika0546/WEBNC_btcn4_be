"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myCors = void 0;
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var myCors = function myCors(arrayOfOrigin) {
  if (!arrayOfOrigin) {
    return (0, _cors["default"])();
  }
  return (0, _cors["default"])({
    origin: arrayOfOrigin || [],
    optionsSuccessStatus: 200
  });
};
exports.myCors = myCors;