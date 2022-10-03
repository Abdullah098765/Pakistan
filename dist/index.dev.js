"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _adData = _interopRequireDefault(require("./routes/schema.js/adData.js"));

var _posts = _interopRequireDefault(require("./routes/posts.js"));

var _socket = require("socket.io");

var _request = _interopRequireDefault(require("request"));

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
var io = new _socket.Server(server, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST']
  }
});
io.on('connection', function (socket) {
  console.log('connection', socket.handshake.query.name);

  _adData["default"].User.where({
    uid: socket.handshake.query.name
  }).updateOne({
    isOnline: true
  }).exec();

  socket.on('disconnect', function (reason) {
    _adData["default"].User.where({
      uid: socket.handshake.query.name
    }).updateOne({
      isOnline: false
    }).exec();

    console.log('disconnect', socket.handshake.query.name); // console.log('disconnect ', socket.handshake.query.name)
  });
});

_adData["default"].Messages.watch().on('change', function (change) {
  io.emit('new-message-' + change.fullDocument.contactId, change);
  console.log(change.fullDocument.contactId);
});

setTimeout(function () {
  (0, _request["default"])({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ['key', 'AAAAZCdwdxc:APA91bF02MNYh1riuKcL_MmWEYwrvjOkoPukFIMmVIgJs_aHksWujAkdQSH1d5sdpaxt-oe02uSKLTmk6XGG7vvwHPlHfzjaYZDLKGTI6svL3ufsYsdtQ9x6kKIr7d9nplxka4Rbr0fd'].join('=')
    },
    json: {
      to: 'ei7-c5S853gnqTkpBPMTgk:APA91bH9Bad0mUjCT3htYbScn8Uat2-siH97DKIE9M9ziKsqHn8POjdf0YNp_pYMI5-4oX4pK4dyx7u9NUruUaVbZKhe0nQzJD4c4QbO-QdBHrK3XBiIY82jbLFsQMWUESggivMp_aqb',
      notification: {
        title: 'Notification Title',
        body: 'This is a neat little notification, right ?'
      }
    }
  });
  console.log('odemon');
}, 3000);