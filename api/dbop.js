const cors = require('micro-cors')({ allowMethods: ['GET', 'POST'], origin: '*' });
const bcrypt = require('bcrypt')
const { v4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getDatabase, get, once, increment, remove, query, limitToLast, update, push, set, ref, onValue } = require("firebase/database");


const dreamSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dreamArray: { type: Array, required: true },
  acid: { type: String, required: true },
}, { timestamps: true });

const DreamAtlas = mongoose.model('DreamAtlas', dreamSchema);

var admin = require("firebase-admin");
var serviceAccount = {
  "type": "service_account",
  "project_id": "your project id",
  "private_key_id": "private_key_id",
  "private_key": "your private key",
  "client_email": "client_email",
  "client_id": "client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "client_x509_cert_url"
}// this obj can be copied from your firebase project dashboard
  ;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "db url"
});
const db = admin.database();

function handler(req, res) {
  let queryArr = ['fetchDreams', 'saveDream', 'newAccount']
  mongoose.connect('mongodb+srv://your mongo db access link')
    .then(() => { console.log('Dream Storage Link Established') }).catch(() => console.log('Dream Storage Link Failed'));
  if (req.query['saveDream']) {
    if (req.body && req.query['AT']) {
      const add_token_to_rtdb = ref(db, `authTokens/${req.query['AT']}`);
      get(add_token_to_rtdb).then(snapshot => {
        let data = snapshot.val()
        if (data.ip == req.connection.remoteAddress) {
          DreamAtlas.findOne({ acid: data.acid }).then(user => {
            let updateTemp = user.dreamArray
            user.dreamArray.push(req.body)
            DreamAtlas.findOneAndUpdate({ acid: data.acid }, { dreamArray: updateTemp }, { upsert: true }, (err, doc) => { });
            res.json({ acid: user.acid })
          }).catch(e => res.json({ state: false, error: 'U400' }))
        } else {
          res.json({ state: false, error: 'IMX' })
        }
      })
    } else {
      res.json({ error: 'Failed To Receive Data [15X1]' })
    }
  }

  if (req.query['fetchDreams']) {
    const add_token_to_rtdb = ref(db, `authTokens/${req.query['AT']}`);
    get(add_token_to_rtdb).then(snapshot => {
      let data = snapshot.val()
      if (data.ip == req.connection.remoteAddress) {
        let dreamCount = req.query['fetchDreams']
        DreamAtlas.findOne({ acid: data.acid }).exec().then(user => {
          if (dreamCount <= user.dreamArray.length) {
            res.json({ dreamArray: user.dreamArray.splice(0, dreamCount), state: true })
          } else {
            res.json({ dreamArray: user.dreamArray, state: true })
          }
        }).catch(e => res.json({ state: false, error: 'U400' }))
      } else {
        res.json({ state: false, error: 'IMX' })
      }
    }).catch(e => { res.json({ state: false, error: e }) });
  }

  if (req.query['newAccount']) {
    if (req.body) {
      let newAcid = v4()
      bcrypt.hash(req.body.password, 10).then(pass => {
        let account = new DreamAtlas({
          username: req.body.username,
          email: req.body.email,
          password: pass,
          dreamArray: [],
          acid: newAcid
        })
        account.save().then(() => {
          console.log(`${newAcid} added to DreamStorage [x-2]`)
          res.json({ status: true })
        })
      }).catch(e => console.log(e))
    } else {
      res.json({ error: 'Malformed request [NO-BODY][x-3]' })
    }
  }

  let flag = false
  queryArr.forEach(elm => {
    if (req.query[elm]) {
      flag = true
    }
  })
  if (!flag) {
    res.json({ error: 'Invalid Op [IXQ-433]' })
  }

}

module.exports = cors(handler);