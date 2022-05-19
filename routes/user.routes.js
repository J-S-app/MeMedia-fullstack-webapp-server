const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require('../middleware/jwt.middleware')



//Get User Detail
router.get('/:userId', isAuthenticated, (req, res, next) => {
  User.findById(req.params.userId)
    .then(userDetail => res.status(200).json(userDetail))
    .catch(e => console.log('error finding user', e))
})




///Follow
router.put('/:userId/follow', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  if (req.payload._id != userId) {
    return User.findById(userId)
      .then(userDetail => {
        if (!userDetail.followers.includes(req.payload._id)) {
          return User.findByIdAndUpdate(userId, { $push: { followers: req.payload._id } }, { new: true })
          .then(response => {
            return User.findByIdAndUpdate(req.payload._id, { $push: { followings: userId } }, { new: true })
          })
        }else{
          return res.status(403).json("you have this user in your friends list");
        }
      })
      .then(response => res.status(200).json("user has been followed"))
      .catch(err => {
        console.log("error following user in the DB", err);
        res.status(500).json({
          message: "error following user in the DB",
          error: err
        })
      })
  }

})


//Unfollow

router.put('/:userId/unfollow', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  if (req.payload._id != userId) {
    return User.findById(userId)
      .then(userDetail => {
        if (userDetail.followers.includes(req.payload._id)) {
          return User.findByIdAndUpdate(userId, { $pull: { followers: req.payload._id } }, { new: true })
          .then(response => {
            return User.findByIdAndUpdate(req.payload._id, { $pull: { followings: userId } }, { new: true })
          })
        }else{
          return res.status(403).json("you already unfolow this ");
        }
      })
      .then(response => res.status(200).json("user has been unfollowed"))
      .catch(err => {
        console.log("error unfollow in the DB", err);
        res.status(500).json({
          message: "error unfollow user in the DB",
          error: err
        })
      })
  }

})



//get followers list
router.get('/:userId/followers',isAuthenticated,(req,res,next)=>{
  const {userId} = req.params;
  
    User.findById(userId)
    .populate('followers')
    .then(userDetail=>{
      if(req.payload._id == userId  || userDetail.followers.find(follower=>follower._id == req.payload._id)){
        return res.status(200).json(userDetail.followers)
      }else{
        return res.status(403).json("you need to follow this user to see followers");
      }
      
    })

})



//get followings list
router.get('/:userId/followings',isAuthenticated,(req,res,next)=>{
  const {userId} = req.params;
  User.findById(userId)
  .populate('followings')
  .then(userDetail=>{
    if(req.payload._id == userId  || userDetail.followers.find(follower=>follower._id == req.payload._id)){
      return res.status(200).json(userDetail.followings)
    }else{
      return res.status(403).json("you need to follow this user to see followings");
    }
    
  })

})



//Update





module.exports = router;
