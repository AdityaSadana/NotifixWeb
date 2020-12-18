const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ45zlRIIK-Y_Wn45jPs4bQJkkPlm384PggaA&usqp=CAU"
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("User", userSchema)