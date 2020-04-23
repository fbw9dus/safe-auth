
// benutzung mit einem router

const express   = require('express');
const router    = express.Router();
const checkAuth = require('../middleware/auth');

const fakeController = (req,res)=> {
  res.json({success:true,user:req.user});
}

router
  .use(checkAuth)
  .route("/")
  .get(fakeController)
  .post(fakeController);

module.exports = router;
