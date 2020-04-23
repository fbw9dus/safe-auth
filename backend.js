
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
       z.B.: sha1, sha512, md5, fnv32
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

app.get('/register',(req,res)=> {
  // req.query => /register?name=asd&pass=123456
  // name und passwort aus dem anmelde formular
  const { name, pass, email } = req.query;

  // test: gibt es den benutzer mit [name]
  if ( User[name] ) return res.json({
    success:false,
    error:{name:['This user name is taken.']}
  });

  // if ( Object.entries(User).reduce( (a,{idx,user})=>{
  //   return a || user.email === email
  // }, false)) return res.json({
  //   success:false,
  //   error:{email:['This email is already in use.']}
  // });

  // hashe das passwort und lege einen neuen benutzer
  // in der datenbank an
  bcrypt.hash(pass, 5, (err,hash) => {
    if (err) return res.json({success:false});
    // schreibe den benutzer in die "datenbank"
    User[name] = { name, pass:hash }
    // sage dem benutzer das die registrierung erfolgreich war
    res.json({success:true});
  });

});

app.get('/login',(req,res)=> {
  // name und passwort aus dem anmelde formular
  // req.body    => POST/PUT/UPDATE(fetch+json) {id:"123",name:"asd",pass:"213"}
  // req.params  => /login/:name/:pass (/login/asd/123456)
  // req.query   => /login?name=asd&pass=123456
  const { name, pass } = req.query;

  // test: gibt es den benutzer mit [name]
  if ( ! User[name] ) return res.json({
    success:false,
    error:{name:['Username or Password wrong']}
  });

  bcrypt.compare(
    pass,            // klartext passwort von benutzer
    User[name].pass, // hashed passwort aus db
    function(err, result) {
      const token = result ? jwt.sign({name},secret,{expiresIn:'100s'}) : null;
      console.log('login for', name, result, token );
      // schicke dem frontend
      return res.json({ success:result, token });
  });
});

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

// benutzung auf einer einzelnen route

app.get('/check', checkAuth, (req,res)=> {
  res.json({success:true,user:req.user});
});

// benutzung mit einem router

const fakeController = (req,res)=> {
  res.json({success:true,user:req.user});
}

const router = express.Router();

router
  .use(checkAuth)
  .route("/")
  .get(fakeController)
  .post(fakeController);

app.use('/router',router);

// app starten

app.listen(3001);
