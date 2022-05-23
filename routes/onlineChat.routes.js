const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const OnlineChat = require('../models/OnlineChat.model');

//create chat
router.post('/', (req, res, next) => {
  const { currentUserId, messageReciverId } = req.body

  OnlineChat.create({ chatPair: [currentUserId, messageReciverId] })
    .then(response => res.status(200).json(response))
    .catch(e => console.log('error create chat', e))
})



// get  a  conversation

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  OnlineChat.find({ chatPair: `${userId}` })
    .then(userDetail => res.status(200).json(userDetail))
    .catch(e => console.log('error getting chat of user', e))

})


// get common chat

router.get('/:senderId/:reciverId', (req, res, next) => {
  const { senderId, reciverId } = req.params;
  OnlineChat.find({ chatPair: { $all: [senderId, reciverId] } })
    .then(userDetail => {
      console.log(userDetail)
      res.status(200).json(userDetail)
    })
    .catch(e => console.log('error getting chat of user', e))

})






module.exports = router;