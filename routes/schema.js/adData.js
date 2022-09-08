import mongoose from 'mongoose'

const adSchema = mongoose.Schema({
  adTitle: String,
  adDiscription: String,
  brand: String,
  condition: String,
  city: String,
  img: String,
  price: String,
  seller: { type: mongoose.Types.ObjectId, ref: 'user' },
  ownerName: String,
  ownerId: String,
  expired: Boolean,
  tage: [String],
  selectFile: String,
  viwesCount: [],
  creatAt: {
    type: Date,
    default: new Date()
  },
  timestamp: Number
})
const contactsSchema = mongoose.Schema({
  adName: String,
  adImg: String,
  online: Boolean,
  price: String,
  ownerId: String,
  sellerUid: String,
  clientId: String,
  ad: { type: mongoose.Types.ObjectId, ref: 'addatas' },
  seller: { type: mongoose.Types.ObjectId, ref: 'user' },
  client: { type: mongoose.Types.ObjectId, ref: 'user' },
  tage: [String],
  selectFile: String,
  viwesCount: [],
  creatAt: {
    type: Date,
    default: new Date()
  }
})
const userSchema = mongoose.Schema({
  displayName: String,
  email: String,
  uid: String,
  photoURL: String,
  isOnline: Boolean
})
const messagesSchema = mongoose.Schema({
  message: String,
  senderName: String,
  senderId: String,
  senderPic: String,
  contactId: String,
  file: { fileURL: String, fileType: String },
  likeCount: {
    type: Number,
    default: 0
  },
  creatAt: {
    type: Date,
    default: new Date()
  }
})

let User = mongoose.model('user', userSchema)
let AdData = mongoose.model('addatas', adSchema)
let ContactWithSeller = mongoose.model('contactwithseller', contactsSchema)
let Messages = mongoose.model('messages', messagesSchema)

export default { AdData, ContactWithSeller, Messages, User }
