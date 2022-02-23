const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const db = require('../index');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.get('/getUsers', async function (req, res) {
    try{
      let result = []
      const usersSnapshot = await db.db.collection("users").get()
      usersSnapshot.forEach((e)=>{
        result.push(e.data())
      });
      res.send(result)
    } catch (err){
      res.send(err)
    }
  })




  module.exports = router;