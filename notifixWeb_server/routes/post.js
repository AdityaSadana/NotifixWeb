const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.get('/allposts', requireLogin, (req,res) => {
    Post.find().sort({timeStamp: -1})
    .populate("postedBy", "_id name")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req, res) => {
    const {caption, photo} = req.body
    if(!caption && !photo) {
        return res.status(422).json({error: "Post can't be Empty!!"})
    }
    // console.log(req.user)
    // res.send("ok")
    req.user.password=undefined
    const post = new Post ({
        caption,
        photo,
        postedBy: req.user,
        timeStamp: new Date()
    })
    post.save().then(result => {
        res.json({post: result})
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/myposts',requireLogin,(req,res) => {
    Post.find({postedBy: req.user._id})
    .populate("postedBy","_id name")
    .then(myposts => {
        res.json({myposts})
    })
    .catch(err => {console.log(err)})
})

router.put('/trust', requireLogin, (req,res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {trust: req.user.id},
        $pull: {untrust: req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        } else {
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req,res) => {
    const comment = {
        text: req.body.text,
        poster: req.body.poster,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    })
    // .populate("comments.poster", "_id name")
    .exec((err, result) => {
        if (err) {
            res.status(422).json({error: err})
        } else {
        res.json(result)
        }
    })
})

router.put('/untrust', requireLogin, (req,res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {untrust: req.user.id},
        $pull: {trust:req.user._id}
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        } else {
            res.json(result)
        }
    })
})

module.exports = router