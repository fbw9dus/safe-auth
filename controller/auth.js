
const { validationResult } = require('express-validator');

const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const secret = 'a769sd876as97d65as86c576c53a643s264a3';

const User = require('../model/User');

const registerController = async (req,res)=> {
  // validator checken
  const errors = validationResult(req);
  if ( ! errors.isEmpty() ){
    res
      .status(500)
      .json({success:false,errors:errors.array()});
    console.log(errors.array());
    return;
  }

  // name und passwort aus dem anmelde formular
  const { name, pass, email } = req.body;

  // hashe das passwort und lege einen neuen benutzer
  // in der datenbank an
  bcrypt.hash(pass, 5, async (err,hash) => {
    if (err) return res.json({success:false});
    // schreibe den benutzer in die "datenbank"
    let newUser = new User({
      userName: name,
      password: hash,
      email:    email,
    });
    await newUser.save()
    // sage dem benutzer das die registrierung erfolgreich war
    res.json({success:true});
  });

}

const loginController = async (req,res)=> {
  const { name, pass } = req.body;

  // test: gibt es den benutzer mit [name]?
  const user = await User.findOne({userName:name});
  if ( ! user ) return res.json({
    success:false,
    error:{name:['User or Password wrong!']}
  });

  bcrypt.compare(
    pass,          // klartext passwort von benutzer
    user.password, // hashed passwort aus db
    function(err, result) {

      // passwort war falsch
      if ( ! result ) return res.json({
        success:false,
        error:{name:['User or Password wrong!']}
      });

      // erstelle ein data objekt fuer jwt und das frontend
      const data = {
        id:       user.id,
        userName: user.userName,
        email:    user.email
      };

      // erzeuge ein jwt token mit [data] als payload
      const token = jwt.sign(data,secret,{expiresIn:'100s'});

      // schicke dem frontend token und data objekt
      return res.json({ success:result, token, data });

      // meldung in der console
      console.log('login for', name, result, token );
  });
}

module.exports = {
  registerController,
  loginController
}
