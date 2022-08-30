"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adData = _interopRequireDefault(require("./schema.js/adData.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var io = new _socket.Server(3001);
io.on('connection', function (socket) {
  // console.log('connected') // false
  // socket.on('new-position', position => {
  //   // socket.emit('text', b)
  //   console.log(position);
  // })
  socket.on('disconnect', function (reason) {// console.log('disconnect ', socket.handshake.query.name)
  });
});

_adData["default"].Messages.watch().on('change', function (change) {
  io.emit('new-message-' + change.fullDocument.contactId, change); // console.log(change)
}); // User


router.post('/user', function (req, res) {
  var user = new _adData["default"].User({
    displayName: req.body.displayName,
    email: req.body.email,
    uid: req.body.uid,
    photoURL: req.body.photoURL
  });
  user.save();

  _adData["default"].User.find().then(function (e) {
    res.send(e); // console.log(e)
  });
});
router.post('/get-user', function (req, res) {
  _adData["default"].User.findOne({
    uid: req.body.uid
  }).then(function (e) {
    res.send(e); // console.log(e)
  });
}); // Ad Routs

router.post('/posts', function (req, res) {
  if (req.body.id !== undefined) {
    _adData["default"].AdData.findOne({
      _id: req.body.id
    }).populate('user').then(function (e) {
      res.send(e);
    })["catch"](function (err) {});
  } else {
    var doc = new _adData["default"].AdData(req.body);
    doc.save();

    _adData["default"].AdData.find().then(function (e) {
      res.send(e);
    });
  }
});
router.get('/get_posts', function (req, res) {
  _adData["default"].AdData.find().then(function (e) {
    res.send(e);
  });
});
router.post('/get_posts', function (req, res) {
  _adData["default"].AdData.find({
    city: req.body.city
  }).then(function (e) {
    res.send(e);
  });
});
router.post('/get_my_ads', function (req, res) {
  _adData["default"].AdData.find({
    ownerId: req.body.myId
  }).then(function (e) {
    res.send(e);
  });
});
router.post('/delete', function (req, res) {
  _adData["default"].AdData.findOneAndDelete({
    _id: req.body.idForDelete
  }).then(function (deleted) {
    res.send('deleted');
  });
}); //Contacts Routs

router.post('/contacts', function (req, res) {
  var contact = new _adData["default"].ContactWithSeller(req.body);
  contact.save();

  _adData["default"].ContactWithSeller.find().then(function (e) {
    res.send(e);
  });
});
router.post('/my_contacts', function (req, res) {
  _adData["default"].ContactWithSeller.where({
    $or: [{
      clientId: req.body.inboxId
    }, {
      sellerUid: req.body.inboxId
    }]
  }).populate('ad').find().then(function (e) {
    res.send(e);
  }); // a.ContactWithSeller.findOneAndDelete({ clientName:'Sabir Ali.'}).then(deleted => {
  // })

});
router.post('/messages', function (req, res) {
  var message = new _adData["default"].Messages(req.body);
  message.save();

  _adData["default"].Messages.find().then(function (e) {
    res.send(e);
  });
});
router.post('/on-focus-on-contact', function (req, res) {
  _adData["default"].Messages.find({
    contactId: req.body.contactId
  }).then(function (e) {
    res.send(e);
  });
});
var _default = router;
exports["default"] = _default;