const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const db = require('../index');
const { FieldValue } = require('firebase-admin/firestore');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());


router.post('/setUsers', async function (req, res) {
    try{
      console.log(req.body);
      await db.db.collection("users").doc(req.body.email).set(req.body);
      //one problem is that email is saved under the email --> needs to be deleted
      res.send(req.body)
    } catch (err){
      res.send(err)
    }
  })




  module.exports = router;