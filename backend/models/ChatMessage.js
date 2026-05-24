import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'file'],
        required: true
    },
    file: {
        url: String,
        name: String
    },
    timestamp: {
        type: Number,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('ChatMessage', ChatMessageSchema);