const router = require("express").Router();
const User = require("../models/User.model");



//Get User

router.get('/:userId',(req,res,next)=>{
  
  User.findById(req.params.userId)
  .then(userDetail=>res.status(200).json(userDetail))
  .catch(e=>console.log('error finding user',e))
})




///Followers




///following





//Update





module.exports = router;
