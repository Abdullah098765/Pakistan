import mongoose from 'mongoose'

const adSchema = mongoose.Schema({
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
    default: 0
  },
  creatAt: {
    type: Date,
    default: new Date()
  }
})
const contactsSchema = mongoose.Schema({
  adName: String,
  sellerName: String,
  sellerUid: String,
  adImg: String,
  online: Boolean,
  price: String,
  clientName: String,
  clientId: String,
  ownerId: String,
  ad: { type: mongoose.Types.ObjectId, ref: 'addatas' },
  tage: [String],
  selectFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  creatAt: {
    type: Date,
    default: new Date()
  }
})
const messagesSchema = mongoose.Schema({
  message: String,
  senderName: String,
  senderId: String,
  senderPic: String,
  contactId: String,
  likeCount: {
    type: Number,
    default: 0
  },
  creatAt: {
    type: Date,
    default: new Date()
  }
})

let AdData = mongoose.model('addatas', adSchema)
let ContactWithSeller = mongoose.model('contactwithseller', contactsSchema)
let Messages = mongoose.model('messages', messagesSchema)

export default { AdData, ContactWithSeller, Messages }
