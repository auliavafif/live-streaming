import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Chat Model
import Chat from './chatModel'
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const data = JSON.parse(event.body),
          name = data.name,
          profilePicture = data.profilePicture,
          text = data.text,
          id = mongoose.Types.ObjectId(),
          chat = {
            _id: id,
            name: name,
            profilePicture: profilePicture,
            text: text,
            __v: 0
          },
          response = {
            msg: "Chat successfully created",
            data: chat
          }

    // Use Chat.Model to create a new product
    await Chat.create(chat)
return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('chat.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}