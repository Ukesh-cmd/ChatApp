const mongoose = require('mongoose');

const chatScema = new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }
}, 
{
    timeStamps:true
}
);

module.exports = mongoose.model('Chat', chatScema);