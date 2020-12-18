const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model('User')

router.get('/allusers', (req,res) => {
    User.find()
    .then(result => {
        res.json(result)
    }).catch(err => {console.log(err)})
})

router.post('/mydetails', requireLogin, (req, res) => {
    User.findById(req.body.id, {

    }).exec((err, result) => {
        if (err) {
            return res.status(500).json({error: err})
        } else {
            res.json(result)
        }
    })
})

router.put('/changepic', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.id, {
        $set: {avatar: req.body.avatar}
    }, {
        new: true
    })
    .exec((err, result) => {
        if (err) {
            return res.status(500).json({error: err})
        } else {
            res.json(result)
        }
    })
})

module.exports = router