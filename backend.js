
const express = require('express');
const app     = express();

const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');

const secret  = 'a769sd876as97d65as86c576c53a643s264a3';

const User = {};

app.get('/login',(req,res)=> {
  // name und passwort aus dem anmelde formular
  const { name, pass } = req.query;

  // test: gibt es den benutzer mit [name]
  if ( ! User[name] ) return res.json({success:false});

  bcrypt.compare(
    pass,            // klartext passwort von benutzer
    User[name].pass, // hashed passwort aus db
    function(err, result) {
      const token = jwt.sign({name},secret,{expiresIn:'5s'});
      console.log('login for', name, result, token );
      return res.json({
        success:result,
        token
      });
  });

});

app.get('/check',(req,res)=> { // /check?token=2131239123...
  try {
    var decoded = jwt.verify(req.query.token, secret);
    res.json({success:true,user:decoded})
  } catch (error){
    res.json({success:false,error})
  }
})

app.get('/register',(req,res)=> {
  // name und passwort aus dem anmelde formular
  const { name, pass } = req.query;

  // test: gibt es den benutzer mit [name]
  if ( User[name] ) return res.json({success:false});

  // hashe das passwort und lege einen neuen benutzer
  // in der datenbank an
  bcrypt.hash(pass, 5, function(err, hash) {
    User[name] = { name, pass:hash }
    return res.json({success:true});
  });

});

app.listen(3001);
