const express = require('express')
const cors = require('cors')
const firebaseConfig = require('./firebase/config')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase/ada-project-43530-firebase-adminsdk-nwuic-5ae21611ae.json');
const search = require("./routes/search")
const update = require("./routes/update")
const dbapp = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports.db = db;

const router = express.Router();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});


app.use("/search", search);
app.use("/update", update);
