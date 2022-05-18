const router = require("express").Router();
const authRoutes = require("./auth.routes");

router.get("/", (req, res, next) => {
  res.json("user routes");
});



module.exports = router;
