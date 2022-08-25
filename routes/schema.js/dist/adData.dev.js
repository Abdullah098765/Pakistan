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
  ownerName: String,
  ownerId: String,
  tage: [String],
  selectFile: String,
  likeCount: {
    type: Number,
    "default": 0
  },
  creatAt: {
    type: Date,
    "default": new Date()
  }
});

var contactsSchema = _mongoose["default"].Schema({
  adName: String,
  sellerName: String,
  sellerUid: String,
  adImg: String,
  online: Boolean,
  price: String,
  clientName: String,
  clientId: String,
  ownerId: String,
  ad: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'addatas'
  },
  tage: [String],
  selectFile: String,
  likeCount: {
    type: Number,
    "default": 0
  },
  creatAt: {
    type: Date,
    "default": new Date()
  }
});

var messagesSchema = _mongoose["default"].Schema({
  message: String,
  senderName: String,
  senderId: String,
  senderPic: String,
  contactId: String,
  likeCount: {
    type: Number,
    "default": 0
  },
  creatAt: {
    type: Date,
    "default": new Date()
  }
});

var AdData = _mongoose["default"].model('addatas', adSchema);

var ContactWithSeller = _mongoose["default"].model('contactwithseller', contactsSchema);

var Messages = _mongoose["default"].model('messages', messagesSchema);

var _default = {
  AdData: AdData,
  ContactWithSeller: ContactWithSeller,
  Messages: Messages
};
exports["default"] = _default;