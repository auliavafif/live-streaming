import mongoose from 'mongoose'
// Set Product Schema
const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Name field is required'],
        max: 100
    },
    profilePicture: {
        type: String,
        required: [true, 'Profile picture field is required'],
        max: 100
    },
    text: {
        type: String,
        required: [true, 'Text field is required'],
        max: 100
    },
}),
    Chat = mongoose.model('chat', schema)
export default Chat