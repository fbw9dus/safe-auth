
/*

  Problem:
    -- Böse Hacker können die Datenbank klauen
    => Passwörter in der Datenbank
    => Hacker kann die Passwörter für andere Seiten benutzen

  Lösung:
    -- Passwörter müssen gehasht werden (quasi verschlüsselt)
    => Hacker kann die Passwörter nicht für andere Server benutzen

  Was ist denn so ein Hash:
    -- Der hash ist das Ergebnis einer Hashfunktion
       z.B.: sha1, sh512, md5, fnv32
       fnv32('hallo') => 12698376921
       fnv32('hallö') => 12938792187
       fnv32('hallo') == fnv32('hallo')

  Aber was kann ich tun damit ich mich jedes mal neu anmelden muss?
    -- Das Backend gibt dem Frontend nach erfolgreicher Anmeldung ein Token
       --> 9876989a8769a876e9a876e.a87e69a87e.ae0897a097ea
       --> Frontend schickt das Token nun für alle Anfragen mit
       --> Backend kann mit [verify] das token checken und daten herauslesen
*/

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
      const token = result ? jwt.sign({name},secret,{expiresIn:'5s'}) : null;
      console.log('login for', name, result, token );
      //
      return res.json({ success:result, token });
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
