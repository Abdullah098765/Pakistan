import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import a from './routes/schema.js/adData.js'
import postRouter from './routes/posts.js'
import { Server } from 'socket.io'
import request from 'request'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extanded: true }))
app.use(cors())

app.use('/', postRouter)

const CONNECTION_URL =
  'mongodb+srv://testdb:mern123@testdb.nuqjg.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5001

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopoLogy: true })
  .then(e => {
    console.log('connected to MDB')
  })
  .catch(err => {
    console.log(err)
  })

const server = app.listen(PORT, a =>
  console.log(`Server running on port: ${PORT}`)
)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  console.log('connection', socket.handshake.query.name)

  a.User.where({ uid: socket.handshake.query.name })
    .updateOne({ isOnline: true })
    .exec()

  socket.on('disconnect', reason => {
    a.User.where({ uid: socket.handshake.query.name })
      .updateOne({ isOnline: false })
      .exec()

    console.log('disconnect', socket.handshake.query.name)
    // console.log('disconnect ', socket.handshake.query.name)
  })
})

a.Messages.watch().on('change', change => {
  io.emit('new-message-' + change.fullDocument.contactId, change)
  console.log(change.fullDocument.contactId)
})

setTimeout(() => {
  request({
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
  })
  console.log('odemon')
}, 3000)
