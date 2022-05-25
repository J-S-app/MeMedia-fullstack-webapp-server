const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require('../middleware/jwt.middleware')



//Get User Detail
router.get('/:userId', isAuthenticated, (req, res, next) => {
  User.findById(req.params.userId, "-password -isAdmin")
    .then(userDetail => res.status(200).json(userDetail))
    .catch(e => console.log('error finding user', e))
})



//Update User

router.put('/:userId', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  if (req.payload._id == userId) {
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then(response => res.status(200).json("user has been updated"))
      .catch(err => {
        console.log("error updating user in the DB", err);
        res.status(500).json({
          message: "error updating user in the DB",
          error: err
        })
      })
  } else {
    return res.status(403).json("you can't update another users data");
  }
})




///Follow
router.put('/:userId/follow', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  if (req.payload._id != userId) {
    User.findById(userId)
      .then(userDetail => {
        if (!userDetail.followers.includes(req.payload._id)) {
          // follow (add current user to array of followers)
          const P1 = User.findByIdAndUpdate(req.payload._id, { $push: { followings: userId } }, { new: true });
          const P2 = User.findByIdAndUpdate(userId, { $push: { followers: req.payload._id } }, { new: true });
          Promise.all([P1, P2])
            .then(response => {
              return res.status(201).json(response)
            })
        } else {
          // unfollow (remove current user from array of followers)
          const P1 = User.findByIdAndUpdate(userId, { $pull: { followers: req.payload._id } }, { new: true });
          const P2 = User.findByIdAndUpdate(req.payload._id, { $pull: { followings: userId } }, { new: true });
          Promise.all([P1, P2])
            .then(response => {
              return res.status(201).json(response)
            })
        }
      })
      .catch(err => {
        console.log("error following user in the DB", err);
        res.status(500).json({
          message: "error following user in the DB",
          error: err
        })
      })
  } else {
    res.status(400).json("you cannot follow yourself buddy")
  }
})


//get followers list
router.get('/:userId/followers', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate('followers')
    .then(userDetail => {
      if (req.payload._id == userId || userDetail.followers.find(follower => follower._id == req.payload._id)) {
        return res.status(200).json(userDetail.followers)
      } else {
        return res.status(403).json("you need to follow this user to see followers");
      }

    })
    .catch(err => {
      console.log("error getting followers list in the DB", err);
      res.status(500).json({
        message: "error getting followers list in the DB",
        error: err
      })
    })

})



//get followings list
router.get('/:userId/followings', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate('followings')
    .then(userDetail => {
      if (req.payload._id == userId || userDetail.followers.find(follower => follower._id == req.payload._id)) {
        return res.status(200).json(userDetail.followings)
      } else {
        return res.status(403).json("you need to follow this user to see followings");
      }

    })
    .catch(err => {
      console.log("error getting followings list in the DB", err);
      res.status(500).json({
        message: "error getting followings list in the DB",
        error: err
      })
    })

})









module.exports = router;
