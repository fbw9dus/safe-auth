
const jwt     = require('jsonwebtoken');
const secret = 'a769sd876as97d65as86c576c53a643s264a3';

// Die checkAuth middleware kann bei jeder beliebigen route
// oder mit einem router mittles router.use benutzt werden
// um alle anfragen zu checken

function checkAuth(req,res,next){
  try {
    const token = req.headers['sars-cov-2-covid-19'];
    req.user = jwt.verify(token, secret);
    next();
  }
  catch (error){
    res.json({success:false,error});
  }
}

module.exports = checkAuth;
