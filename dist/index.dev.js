"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _posts = _interopRequireDefault(require("./routes/posts.js"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json({
  limit: '30mb',
  extanded: true
}));
app.use((0, _cors["default"])());
app.use('/', _posts["default"]);
var CONNECTION_URL = 'mongodb+srv://testdb:mern123@testdb.nuqjg.mongodb.net/?retryWrites=true&w=majority';
var PORT = process.env.PORT || 5001;

_mongoose["default"].connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopoLogy: true
}).then(function (e) {
  console.log('connected to MDB');
})["catch"](function (err) {
  console.log(err);
});

var server = app.listen(PORT, function (a) {
  return console.log("Server running on port: ".concat(PORT));
});
var io = new _socket.Server(server, {// cors:{
  //     origin:'http://localhost:3000/',
  //     methods:["GET", 'POST']
  // }
});
io.on('connection', function (socket) {
  console.log('connection', socket.id); // a.User.where({ uid: socket.handshake.query.name })
  //   .updateOne({ isOnline: true })
  //   .exec()

  socket.on('disconnect', function (reason) {
    //   a.User.where({ uid: socket.handshake.query.name })
    //     .updateOne({ isOnline: false })
    //     .exec()
    console.log('disconnect', socket.id); //   // console.log('disconnect ', socket.handshake.query.name)
  });
});