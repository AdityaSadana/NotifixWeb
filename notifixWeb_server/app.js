const express = require('express')
const app = express()
const {MONGOURI} = require('./keys');
const mongoose = require('mongoose');
const PORT = 5000
const cors = require('cors');

app.use(cors())

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo")
})

mongoose.connection.on('error', (error) => {
    console.log("Error Connecting to mongo", error)
})

require('./models/user')
require('./models/post')

mongoose.model("User")

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, () => {
    console.log("Server running at ", PORT)
})