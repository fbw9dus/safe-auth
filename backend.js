
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

const colors   = require('colors');
const mongoose = require('mongoose');
const express  = require('express');
const app      = express();

app.use( require('body-parser').json() );

// Verbindung mit Datenbank aufbauen
mongoose.connect("mongodb://localhost:27017/safe-auth", {
  useNewUrlParser:    true,
  useCreateIndex:     true,
  useUnifiedTopology: true
}).then( e => console.log( 'db:ready'.red.bold ) );

// routen einrichten

const authRouter  = require('./route/auth');
const checkRouter = require('./route/check');

app.use( '/auth',  authRouter  );
app.use( '/check', checkRouter );

// app starten
app.listen(3001);




















return

// benutzung auf einer einzelnen route

app.get('/check', checkAuth, (req,res)=> {
  res.json({success:true,user:req.user});
});
