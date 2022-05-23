const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Message = require('../models/Message.model');

//create message
router.post('/' , (req,res,next)=>{
  

  Message.create(req.body)
  .then(response=>res.status(200).json(response))
  .catch(e=>console.log('error create message' , e))
})



// get  message of user

router.get('/:messageId' , (req,res,next)=>{
  const{messageId} = req.params;
  Message.find({messageId :messageId})
.then(messageArr=>res.status(200).json(messageArr))
.catch(e=>console.log('error getting chat of user' , e))

})


module.exports = router;