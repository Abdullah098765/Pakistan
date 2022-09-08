"use strict";

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_nodeSchedule["default"].scheduleJob('30 * * * * *', function () {
  a.AdData.where({
    timestamp: {
      $lt: Date.now() - 180000
    }
  }).find().updateMany({
    expired: false
  }, {
    expired: true
  }).then(function (data) {
    console.log(data);
  });
  console.log('The answer to life, the universe, and everything!');
});