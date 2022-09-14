"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adSchema = _mongoose["default"].Schema({
  adTitle: String,
  adDiscription: String,
  brand: String,
  condition: String,
  city: String,
  img: String,
  price: String,
  seller: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'user'
  },
  ownerName: String,
  ownerId: String,
  expired: Boolean,
  tage: [String],
  selectFile: String,
  viwesCount: [],
  creatAt: {
    type: Date,
    "default": new Date()
  },
  timestamp: Number
});

var contactsSchema = _mongoose["default"].Schema({
  adName: String,
  adImg: String,
  online: Boolean,
  price: String,
  ownerId: String,
  sellerUid: String,
  clientId: String,
  ad: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'addatas'
  },
  seller: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'user'
  },
  client: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'user'
  },
  tage: [String],
  selectFile: String,
  viwesCount: [],
  creatAt: {
    type: Date,
    "default": new Date()
  }
});

var userSchema = _mongoose["default"].Schema({
  displayName: String,
  blocked: Boolean,
  email: String,
  uid: String,
  photoURL: String,
  isOnline: Boolean
});

var messagesSchema = _mongoose["default"].Schema({
  message: String,
  senderName: String,
  senderId: String,
  senderPic: String,
  contactId: String,
  file: {
    fileURL: String,
    fileType: String
  },
  likeCount: {
    type: Number,
    "default": 0
  },
  creatAt: {
    type: Date,
    "default": new Date()
  }
});

var User = _mongoose["default"].model('user', userSchema);

var AdData = _mongoose["default"].model('addatas', adSchema);

var ContactWithSeller = _mongoose["default"].model('contactwithseller', contactsSchema);

var Messages = _mongoose["default"].model('messages', messagesSchema);

var _default = {
  AdData: AdData,
  ContactWithSeller: ContactWithSeller,
  Messages: Messages,
  User: User
};
exports["default"] = _default;