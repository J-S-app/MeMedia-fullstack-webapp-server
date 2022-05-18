const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');



//Post behavior
// Create new post
router.post('/posts', (req, res, next) => {
    const { title, postContent, postOwner } = req.body;
    console.log(req.body)


    const newPost = {
        title,
        postContent,
        postOwner,
    }

    Post.create(newPost)
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating post in the DB", err);
            res.status(500).json({
                message: "error creating post in the DB",
                error: err
            });
        })
});

// Get list of posts
router.get("/posts", (req, res, next) => {
    Post.find()
        .populate("postComments")
        .populate("postLikes")
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of posts", err);
            res.status(500).json({
                message: "error getting list of posts",
                error: err
            });
        })
});

// Get a specific post
router.get('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Post.findById(postId)
        .populate("postComments")
        .populate("postLikes")
        .then(post => res.json(post))
        .catch(err => {
            console.log("error getting specific of a post", err);
            res.status(500).json({
                message: "error getting specific of a post",
                error: err
            });
        })
});

// Updates a specific post by id
router.put('/posts/:postId/edit', (req, res, next) => { //isAuthenticated <= need to be secure
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Post.findByIdAndUpdate(postId, req.body, { new: true })
        .then((updatedPost) => res.status(204).json(updatedPost))
        .catch(err => {
            console.log("error updating post", err);
            res.status(500).json({
                message: "error updating post",
                error: err
            });
        })
});

//Likes behavior
router.put("/posts/:postId", (req,res, next) =>{
    const {postId} = req.params
    
    const {userId} = req.body; // <=need to be update with userId accessed

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Post.findById(postId)
        .then(postFound =>{
            console.log(postFound)
            if (!postFound.postLikes.includes(userId)){
                return Post.findByIdAndUpdate(postId, { $push: { postLikes: userId } } , {new: true})
            } else if (postFound.postLikes.includes(userId)){
                return Post.findByIdAndUpdate(postId, { $pull: { postLikes: userId} } ,{new: true})
            }
        })
        .then(updatePost => res.status(201).json(updatePost))
        .catch(err => {
            console.log("error updating likes for post", err);
            res.status(500).json({
                message: "error updating likes for post",
                error: err
            });
        })
})

// Delete a specific post by id
router.delete('/posts/:postId', (req, res, next) => { //isAuthenticated, <= need to be secured
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Post.findByIdAndRemove(postId)
        .then(deteletedPost => {
            return Comment.deleteMany({ _id: { $in: deteletedPost.postComments } });
        })
        .then(() => res.json({ message: `Post with id ${postId} & all associated comments were removed successfully.` }))
        .catch(err => {
            console.log("error deleting post", err);
            res.status(500).json({
                message: "error deleting post",
                error: err
            });
        })
});

//Comments behavior

// Create a Comment
router.post("/posts/:postId", (req, res, next) => {
    const { postId } = req.params

    const { title, commentContent, commentOwner } = req.body;

    const newComment = {
        title,
        commentContent,
        commentOwner
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Comment.create(newComment)
        .then(newComment => {
            return Post.findByIdAndUpdate(postId, { $push: { postComments: newComment._id } } , {new: true})
        })
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating comment in the DB", err);
            res.status(500).json({
                message: "error creating comment in the DB",
                error: err
            });
        })
})




module.exports = router;