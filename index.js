import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import a from './routes/schema.js/adData.js'
import postRouter from './routes/posts.js'
import { Server } from 'socket.io'

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

    console.log('disconnect',socket.handshake.query.name)
    // console.log('disconnect ', socket.handshake.query.name)
  })
})


a.Messages.watch().on('change', change => {
  io.emit('new-message-' + change.fullDocument.contactId, change)
  console.log(change)
})
