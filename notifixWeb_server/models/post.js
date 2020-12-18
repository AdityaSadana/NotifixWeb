const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    photo: {
        type: String,
    },
    trust: [{
        type: ObjectId,
        ref: "User"
    }],
    untrust: [{
        type: ObjectId,
        ref: "User"
    }],
    timeStamp: {
        type: Number,
    },
    comments: [{
        text: String,
        poster: String,
        postedBy:{type: ObjectId, ref:"User"}
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Post", postSchema)