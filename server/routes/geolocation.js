const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const db = require('../index');
const { restart } = require('nodemon');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get('/getCurrentLocation/:username', async function (req, res) {
    try{
      const username = req.params.username;
      const usersSnapshot = await db.db.collection("users").doc(username).get();
      let result = usersSnapshot.data().location;
  
      res.send(result);
    } catch (err){
      res.send(err)
    }
});

module.exports = router;



