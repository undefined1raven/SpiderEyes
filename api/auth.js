const cors = require('micro-cors')({ allowMethods: ['GET', 'POST'], origin: '*' });
const { v4 } = require('uuid');
const { getDatabase, get, once, increment, remove, query, limitToLast, update, push, set, ref, onValue } = require("firebase/database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

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
    mongoose.connect('mongodb+srv://your mongo db access link')
        .then(() => {
            console.log('Dream Storage Link Established')
            if (req.query['login']) {
                if (req.body) {
                    DreamAtlas.findOne({ $or: [{ username: req.body.uid }, { email: req.body.uid }] }).exec().then(user => {
                        bcrypt.compare(req.body.password, user.password).then(r => {
                            let ntid = v4()
                            if (r) {
                                const add_token_to_rtdb = ref(db, `authTokens/${ntid}`);
                                set(add_token_to_rtdb, {
                                    tx: Date.now(),
                                    ip: req.connection.remoteAddress,
                                    acid: user.acid
                                }).then(r => { res.json({ error: null, status: true, AT: ntid, username: user.username }) }).catch(e => { res.json({ status: 'failed', error: e }) });
                            } else {
                                res.json({ error: `Auth Failed`, status: false })
                            }
                        }).catch(e => {
                            console.log('auth failed')
                        })
                    }).catch((e) => {
                        res.json({ error: `Cannot Find User [U404][x-6][${e}]`, status: false })
                    })
                } else {
                    res.json({ error: 'Malformed request [NO-BODY][x-3]', status: false })
                }
            }
        }).catch(() => console.log('Dream Storage Link Failed'));

}

module.exports = cors(handler);